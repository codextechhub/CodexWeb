// @ts-nocheck
/**
 * Imperative behavior for the Products page's flagship XVS console: the
 * card's live-updating counters/row rotation, its scroll reveals, and the
 * layout switch that moves the console mockup from an absolutely-positioned
 * "peek past the card edge" treatment (wide screens) to a normal stacked
 * block once the two-column row wraps (tablet/mobile). Ported from the
 * original design's own vanilla script so the behavior matches exactly.
 */
export class ProductsBehavior {
  root: HTMLElement;
  constructor(root: HTMLElement) {
    this.root = root;
  }

  componentDidMount() {
    this._reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (this._reduce) {
      this.root.querySelectorAll("[data-float],[data-drift],[data-pulse],[data-sweep]").forEach((n) => {
        n.style.animation = "none";
      });
    }
    this._initReveals();
    this._initFlagship();
    this._initConsole();
  }

  _count(el, to, dur) {
    if (!el) return;
    if (el._raf) cancelAnimationFrame(el._raf);
    if (this._reduce) {
      el.textContent = Math.round(to).toLocaleString("en-US");
      return;
    }
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(to * e).toLocaleString("en-US");
      if (p < 1) el._raf = requestAnimationFrame(step);
    };
    el._raf = requestAnimationFrame(step);
  }

  _initReveals() {
    if (this._reduce) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.style.opacity = "1";
          entry.target.style.transform = "none";
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    this.root.querySelectorAll("[data-reveal]").forEach((n) => {
      if (n.getBoundingClientRect().top < window.innerHeight * 0.9) return;
      n.style.opacity = "0";
      n.style.transform = "translateY(22px)";
      n.style.transition = "opacity 520ms cubic-bezier(.16,1,.3,1), transform 560ms cubic-bezier(.16,1,.3,1)";
      io.observe(n);
    });
    this._revealIo = io;
  }

  _initFlagship() {
    const box = this.root.querySelector("[data-xvs-console]");
    if (!box) return;
    const holder = this.root.querySelector("[data-console-holder]");
    const apply = () => {
      const prev = holder && holder.previousElementSibling;
      const narrow = !holder || !prev || holder.offsetTop > prev.offsetTop;
      box.style.position = narrow ? "static" : "absolute";
      box.style.width = narrow ? "100%" : "min(560px,124%)";
      box.style.borderRadius = narrow ? "14px" : "16px 0 0 0";
      box.style.boxShadow = narrow ? "0 18px 44px rgba(48,58,81,.10)" : "0 30px 70px rgba(48,58,81,.14)";
      if (!holder) return;
      if (narrow) {
        holder.style.minHeight = "0px";
        holder.style.paddingBottom = "clamp(24px,4vw,40px)";
      } else {
        const top = parseFloat(getComputedStyle(box).top) || 0;
        holder.style.minHeight = Math.ceil(box.offsetHeight + top) + "px";
        holder.style.paddingBottom = "0px";
      }
    };
    apply();
    window.addEventListener("resize", apply);
    this._offFlagship = () => window.removeEventListener("resize", apply);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(apply);
    if (window.ResizeObserver) {
      this._flagshipRo = new ResizeObserver(() => apply());
      this._flagshipRo.observe(box);
    }
  }

  _initConsole() {
    const box = this.root.querySelector("[data-xvs-console]");
    if (!box) return;
    const counts = Array.from(box.querySelectorAll("[data-x-count]"));
    const rows = Array.from(box.querySelectorAll("[data-x-row]"));
    if (this._reduce) {
      counts.forEach((el) => {
        el.textContent = parseFloat(el.dataset.xCount).toLocaleString("en-US");
      });
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            counts.forEach((el, i) => setTimeout(() => this._count(el, parseFloat(el.dataset.xCount), 1800), i * 140));
            if (!this._rowTimer) {
              let k = 0;
              const tick = () => {
                rows.forEach((r, i) => {
                  const on = i === k;
                  r.style.background = on ? "rgba(74,101,157,.08)" : "#FBFBFC";
                  r.style.transform = on ? "translateX(3px)" : "none";
                });
                k = (k + 1) % rows.length;
              };
              tick();
              this._rowTimer = setInterval(tick, 1600);
            }
          } else if (this._rowTimer) {
            clearInterval(this._rowTimer);
            this._rowTimer = null;
            rows.forEach((r) => {
              r.style.background = "#FBFBFC";
              r.style.transform = "none";
            });
            counts.forEach((el) => {
              if (el._raf) cancelAnimationFrame(el._raf);
              el.textContent = "0";
            });
          }
        });
      },
      { threshold: 0.2 },
    );
    io.observe(box);
    this._consoleIo = io;
  }

  componentWillUnmount() {
    if (this._offFlagship) this._offFlagship();
    if (this._flagshipRo) this._flagshipRo.disconnect();
    if (this._revealIo) this._revealIo.disconnect();
    if (this._consoleIo) this._consoleIo.disconnect();
    if (this._rowTimer) clearInterval(this._rowTimer);
  }
}

export function initProductsBehavior(root: HTMLElement): () => void {
  const instance = new ProductsBehavior(root);
  instance.componentDidMount();
  return () => instance.componentWillUnmount();
}
