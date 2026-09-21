// @ts-nocheck
import { EMAIL_ERROR, sendEnquiry } from "../../lib/emailjs";
/**
 * Ported (near-verbatim) from the CodeX home page's original imperative
 * behavior script authored in Claude Design. It drives the static markup
 * in `homeMarkup.ts` directly via the DOM: sticky-nav shadow, the hero
 * "arc" layout + its six live side cards, the auto-drifting capability
 * marquee, scroll reveals, cursor parallax, the audit-trail ticker, icon
 * draw-in on hover, the XVS console counters, and demo-form validation.
 * Left untyped on purpose (@ts-nocheck) to keep it a faithful, low-risk
 * port of the original vanilla logic rather than a rewrite.
 */

const DOTS = [[14, 22], [30, 58], [46, 30], [58, 72], [22, 78], [70, 46], [82, 24], [38, 12], [66, 88], [88, 66], [50, 48], [26, 40]];

const LOCK_STATES = [
  { mode: "open", key: "payments.release · Finance lead" },
  { mode: "blocked", key: "payroll.view · Regional manager" },
  { mode: "open", key: "records.update · Operations" },
];

const LOG = [
  "role.assign · Finance lead → A. Okonkwo",
  "import.batch.publish · accounts-q2.csv",
  "branch.create · Ikeja depot",
  "export.run · Receivables register",
  "permission.deny · payroll.view",
  "workflow.approve · REQ-1042",
  "records.validate · 1,248 rows · 2 flagged",
  "auth.login · 2 new devices",
  "payment.receipt · ₦180,000 · Northgate",
];

const MBARS = [
  [34, 52, 44, 68, 58, 82, 49],
  [48, 39, 61, 55, 76, 63, 80],
];

const PERMS = [
  { result: "Granted", granted: true },
  { result: "Blocked", granted: false },
  { result: "Granted", granted: true },
];

const DAYS = [88, 94, 91, 97, 96];

// Fan offsets per arc column: [x, rotation] for each of the three cards.
const FAN_LEFT = [[0, "-1.8deg"], [44, "1.2deg"], [12, "-0.9deg"]];
const FAN_RIGHT = [[-6, "1.6deg"], [-46, "-1.1deg"], [-12, "0.9deg"]];

class HomeBehavior {
  root: HTMLElement;
  state = { submitted: false };
  props = { showTrustStrip: true, ambientMotion: true, sequencePace: "Calm" as "Calm" | "Brisk", navOnScroll: "Blur" as "Blur" | "Solid" };
  constructor(root: HTMLElement) {
    this.root = root;
  }

  componentDidMount() {
    this._timers = [];
    this._reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this._ambient = this.props.ambientMotion ?? true;
    this._pace = (this.props.sequencePace ?? "Calm") === "Brisk" ? 0.72 : 1;

    if (!this._ambient) {
      this.root.querySelectorAll("[data-float],[data-drift]").forEach((n) => { n.style.animation = "none"; });
    }

    this._initNav();
    this._initArc();
    this._initSides();
    this._initMarquee();
    this._initReveals();
    this._initParallax();
    this._initLog();
    this._initCaps();
    this._initXvs();
    this._initForm();
  }

  // ── helpers ────────────────────────────────────────────────────
  /**
   * Timers land in whichever pool is currently active. The side cards and the
   * marquee stop independently — they are in view at different scroll positions —
   * so they must never be able to clear each other's chains.
   */
  _at(ms, fn) {
    const key = this._pool || "_timers";
    const t = setTimeout(fn, ms);
    (this[key] = this[key] || []).push(t);
    return t;
  }
  _clearTimers() { (this._timers || []).forEach(clearTimeout); this._timers = []; }
  _clearMarquee() { (this._marqueeTimers || []).forEach(clearTimeout); this._marqueeTimers = []; }

  /** Run fn with its timers booked to the marquee's pool. */
  _asMarquee(fn) {
    const prev = this._pool;
    this._pool = "_marqueeTimers";
    try { fn(); } finally { this._pool = prev; }
  }

  _snap(el, apply) {
    if (!el) return;
    const prev = el.style.transition;
    el.style.transition = "none";
    apply(el);
    void el.offsetWidth;
    el.style.transition = prev;
  }

  _fmt(kind, v) {
    if (kind === "pct") return Math.round(v) + "%";
    return Math.round(v).toLocaleString("en-US");
  }

  _count(el, to, dur) {
    if (!el) return;
    const kind = el.dataset.countKind || "int";
    if (el._raf) cancelAnimationFrame(el._raf);
    if (this._reduce) { el.textContent = this._fmt(kind, to); return; }
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = this._fmt(kind, to * e);
      if (p < 1) el._raf = requestAnimationFrame(step);
    };
    el._raf = requestAnimationFrame(step);
  }

  /** Self-rescheduling loop that respects the stage's play/pause state. */
  _loop(key, period, fn) {
    const run = () => {
      if (!this._sidesOn) return;
      fn();
      this[key] = this._at(period, run);
    };
    run();
  }

  // ── the arc: three layout modes, no media queries available ────
  _initArc() {
    const arc = this.root.querySelector("[data-arc]");
    if (!arc) return;
    const center = arc.querySelector("[data-arc-center]");
    const left = arc.querySelector("[data-arc-left]");
    const right = arc.querySelector("[data-arc-right]");
    if (!center || !left || !right) return;

    const fan = (col, spec) => {
      Array.from(col.children).forEach((card, i) => {
        const s = spec && spec[i];
        card.style.transform = s ? "translateX(" + s[0] + "px) rotate(" + s[1] + ")" : "none";
      });
    };

    const apply = () => {
      const w = window.innerWidth;
      const wide = w >= 1140;
      const mid = !wide && w >= 800;

      if (wide) {
        arc.style.display = "block";
        center.style.maxWidth = "660px";
        center.style.margin = "0 auto";
        center.style.padding = "0";
        [left, right].forEach((col) => {
          col.style.position = "absolute";
          col.style.width = "254px";
          col.style.zIndex = "2";
        });
        left.style.left = "0"; left.style.right = "auto"; left.style.top = "16px";
        right.style.right = "0"; right.style.left = "auto"; right.style.top = "58px";
        left.style.flexDirection = "column"; right.style.flexDirection = "column";
        left.style.flexWrap = "nowrap"; right.style.flexWrap = "nowrap";
        fan(left, FAN_LEFT);
        fan(right, FAN_RIGHT);
        // The columns are out of flow, so the container needs their height.
        arc.style.minHeight = Math.max(center.offsetHeight, left.offsetHeight + 16, right.offsetHeight + 58) + "px";
      } else if (mid) {
        arc.style.display = "flex";
        arc.style.flexDirection = "row";
        arc.style.alignItems = "flex-start";
        arc.style.gap = "18px";
        arc.style.minHeight = "";
        center.style.maxWidth = "none";
        center.style.margin = "0";
        center.style.padding = "8px 0 0";
        center.style.flex = "1 1 auto";
        center.style.order = "0";
        [left, right].forEach((col) => {
          col.style.position = "static";
          col.style.width = "204px";
          col.style.flex = "0 0 204px";
          col.style.flexDirection = "column";
          col.style.flexWrap = "nowrap";
        });
        left.style.order = "-1";
        right.style.order = "1";
        fan(left, null);
        fan(right, null);
      } else {
        arc.style.display = "flex";
        arc.style.flexDirection = "column";
        arc.style.gap = "18px";
        arc.style.minHeight = "";
        center.style.maxWidth = "none";
        center.style.margin = "0";
        center.style.padding = "0";
        center.style.flex = "";
        center.style.order = "";
        [left, right].forEach((col) => {
          col.style.position = "static";
          col.style.width = "auto";
          col.style.flex = "";
          col.style.order = "";
          col.style.flexDirection = "row";
          col.style.flexWrap = "wrap";
          Array.from(col.children).forEach((card) => { card.style.flex = "1 1 158px"; card.style.minWidth = "0"; });
        });
        fan(left, null);
        fan(right, null);
      }

      if (!(w < 800)) {
        [left, right].forEach((col) => Array.from(col.children).forEach((card) => { card.style.flex = ""; }));
      }
    };

    apply();
    this._applyArc = apply;
    window.addEventListener("resize", apply);
    this._offArc = () => window.removeEventListener("resize", apply);
    // Fonts landing changes the headline height, which the wide mode measures.
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => apply());
  }

  // ── the six side cards, each on its own clock ──────────────────
  _initSides() {
    const arc = this.root.querySelector("[data-arc]");
    if (!arc) return;
    this._arc = arc;
    this._sq = (sel) => Array.from(arc.querySelectorAll(sel));

    this._sq("[data-campus]").forEach((d, i) => {
      const p = DOTS[i % DOTS.length];
      d.style.left = p[0] + "%";
      d.style.top = p[1] + "%";
    });

    if (this._reduce) { this._sidesSettle(); return; }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? this._sidesStart() : this._sidesStop()));
    }, { threshold: 0, rootMargin: "0px 0px -5% 0px" });
    io.observe(arc);
    this._sidesIo = io;

    if (arc.getBoundingClientRect().top < window.innerHeight * 1.4) this._sidesStart();
  }

  _sidesStart() {
    if (this._sidesOn) return;
    this._sidesOn = true;
    const p = this._pace;

    this._loop("_tCampus", 13000 * p, () => {
      this._sq("[data-campus]").forEach((d) => this._snap(d, (el) => { el.style.background = "#C9D0DF"; el.style.opacity = ".5"; el.style.boxShadow = "none"; el.style.animation = "none"; }));
      this._sq("[data-campus]").forEach((d, i) => {
        this._at(220 + i * 170 * p, () => {
          d.style.background = "#4A659D";
          d.style.opacity = "1";
          d.style.boxShadow = "0 0 0 4px rgba(74,101,157,.14)";
          d.style.animation = "cx-blip 2.6s ease-in-out " + (i * 0.18).toFixed(2) + "s infinite";
        });
      });
      const branches = this._arc.querySelector("[data-arc-left] [data-count-to]");
      if (branches) this._count(branches, parseFloat(branches.dataset.countTo), 1700);
    });

    this._loop("_tAtt", 8200 * p, () => {
      const cells = this._sq("[data-cell]");
      cells.forEach((c) => this._snap(c, (el) => { el.style.background = "#F1F2F5"; }));
      const pct = this._arc.querySelector("[data-att-pct]");
      if (pct) { pct.textContent = "0%"; this._at(180, () => this._count(pct, 96, 2400)); }
      cells.forEach((c, i) => {
        const tone = i % 17 === 7 ? "#E33131" : (i % 9 === 4 ? "#F59E0B" : "#16A34A");
        this._at(160 + i * 58 * p, () => { c.style.background = tone; });
      });
    });

    this._loop("_tFees", 8200 * p, () => {
      const ring = this._arc.querySelector("[data-ring]");
      const pct = this._arc.querySelector("[data-ring-pct]");
      this._snap(ring, (el) => { el.style.strokeDashoffset = "289"; });
      if (pct) pct.textContent = "0%";
      this._at(600, () => {
        if (ring) ring.style.strokeDashoffset = String(289 * (1 - 0.78));
        if (pct) this._count(pct, 78, 2600);
      });
    });

    let lockIdx = -1;
    this._loop("_tLock", 3400 * p, () => {
      lockIdx = (lockIdx + 1) % LOCK_STATES.length;
      const s = LOCK_STATES[lockIdx];
      this._setLock(s.mode, s.key);
    });

    this._loop("_tKeys", 9000 * p, () => {
      this._sq("[data-arc-right] [data-count-to]").forEach((el, i) => {
        el.textContent = "0";
        this._at(120 + i * 140, () => this._count(el, parseFloat(el.dataset.countTo), 1500));
      });
    });

    this._loop("_tRecords", 9600 * p, () => {
      const el = this._arc.querySelector("[data-arc-right] [data-count-to='12400']");
      const delta = this._arc.querySelector("[data-delta]");
      if (delta) delta.style.opacity = "0";
      if (el) { el.textContent = "0"; this._count(el, 12400, 2000); }
      if (delta) this._at(2200, () => { delta.style.opacity = "1"; });
    });
  }

  _sidesStop() {
    this._sidesOn = false;
    this._clearTimers();
    this._sq("[data-campus]").forEach((d) => this._snap(d, (el) => { el.style.background = "#C9D0DF"; el.style.opacity = ".5"; el.style.boxShadow = "none"; el.style.animation = "none"; }));
    this._sq("[data-cell]").forEach((c) => this._snap(c, (el) => { el.style.background = "#F1F2F5"; }));
    this._snap(this._arc.querySelector("[data-ring]"), (el) => { el.style.strokeDashoffset = "289"; });
    this._sq("[data-count-to]").forEach((el) => { if (el._raf) cancelAnimationFrame(el._raf); el.textContent = "0"; });
    const ap = this._arc.querySelector("[data-att-pct]");
    if (ap) ap.textContent = "0%";
    const rp = this._arc.querySelector("[data-ring-pct]");
    if (rp) rp.textContent = "0%";
    const delta = this._arc.querySelector("[data-delta]");
    if (delta) delta.style.opacity = "0";
    this._setLock("idle");
  }

  _sidesSettle() {
    this._sq("[data-count-to]").forEach((el) => { el.textContent = this._fmt(el.dataset.countKind || "int", parseFloat(el.dataset.countTo)); });
    this._sq("[data-campus]").forEach((d) => { d.style.background = "#4A659D"; d.style.opacity = "1"; });
    this._sq("[data-cell]").forEach((c, i) => { c.style.background = i % 17 === 7 ? "#E33131" : (i % 9 === 4 ? "#F59E0B" : "#16A34A"); });
    const ring = this._arc.querySelector("[data-ring]");
    if (ring) ring.style.strokeDashoffset = String(289 * (1 - 0.78));
    const rp = this._arc.querySelector("[data-ring-pct]");
    if (rp) rp.textContent = "78%";
    const ap = this._arc.querySelector("[data-att-pct]");
    if (ap) ap.textContent = "96%";
    const delta = this._arc.querySelector("[data-delta]");
    if (delta) delta.style.opacity = "1";
    this._setLock("open", "fees.collect · Bursar");
  }

  _setLock(mode, key) {
    const card = this._arc && this._arc.querySelector("[data-lock-card]");
    const shackle = this._arc && this._arc.querySelector("[data-lock-shackle]");
    if (!card || !shackle) return;
    const body = this._arc.querySelector("[data-lock-body]");
    const stroke = this._arc.querySelector("[data-lock-stroke]");
    const title = this._arc.querySelector("[data-lock-title]");
    const sub = this._arc.querySelector("[data-lock-sub]");
    if (mode === "open") {
      shackle.style.transform = "translate(4px,-4px) rotate(14deg)";
      card.style.background = "rgba(22,163,74,.09)";
      if (body) body.setAttribute("fill", "#16A34A");
      if (stroke) stroke.setAttribute("stroke", "#16A34A");
      if (title) { title.textContent = "Access granted"; title.style.color = "#0F6B32"; }
      if (sub) sub.textContent = key || "";
    } else if (mode === "blocked") {
      shackle.style.transform = "none";
      card.style.background = "rgba(227,49,49,.09)";
      card.style.animation = "cx-shake 420ms ease-in-out";
      this._at(520, () => { card.style.animation = "none"; });
      if (body) body.setAttribute("fill", "#E33131");
      if (stroke) stroke.setAttribute("stroke", "#E33131");
      if (title) { title.textContent = "Permission denied"; title.style.color = "#A81E1E"; }
      if (sub) sub.textContent = key || "";
    } else {
      shackle.style.transform = "none";
      card.style.background = "rgba(74,101,157,.07)";
      card.style.animation = "none";
      if (body) body.setAttribute("fill", "#4A659D");
      if (stroke) stroke.setAttribute("stroke", "#4A659D");
      if (title) { title.textContent = "Locked by default"; title.style.color = "#212121"; }
      if (sub) sub.textContent = "every action needs a key";
    }
  }

  // ── the marquee: drifts across, spotlights one chapter at a time ──
  _initMarquee() {
    const wrap = this.root.querySelector("[data-marquee-wrap]");
    const track = this.root.querySelector("[data-track]");
    if (!wrap || !track) return;
    this._track = track;

    // A second set of the same cards makes the drift seamless.
    this._originals = Array.from(track.children);
    this._originals.forEach((c) => {
      const clone = c.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.dataset.clone = "1";
      track.appendChild(clone);
    });

    const chapterEls = (i) => Array.from(track.querySelectorAll('[data-chapter="' + i + '"]'));
    this._chapterEls = chapterEls;

    if (this._reduce) { this._spot(0); this._mrun(0); return; }

    let x = 0, last = null, paused = false, half = 0;
    const measure = () => { half = track.scrollWidth / 2; };
    measure();
    window.addEventListener("resize", measure);
    this._offMeasure = () => window.removeEventListener("resize", measure);

    const frame = (now) => {
      if (last === null) last = now;
      const dt = Math.min(64, now - last);
      last = now;
      if (!paused && this._marqueeOn) {
        x -= (16 / 1000) * dt;
        if (half && -x >= half) x += half;
        track.style.transform = "translate3d(" + x.toFixed(2) + "px,0,0)";
      }
      this._mraf = requestAnimationFrame(frame);
    };
    this._mraf = requestAnimationFrame(frame);

    wrap.addEventListener("mouseenter", () => { paused = true; });
    wrap.addEventListener("mouseleave", () => { paused = false; });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          if (this._marqueeOn) return;
          this._marqueeOn = true;
          let i = -1;
          const step = () => {
            if (!this._marqueeOn) return;
            i = (i + 1) % 5;
            this._asMarquee(() => {
              this._spot(i);
              this._mreset(i);
              this._mrun(i);
              this._tSpot = this._at(6800 * this._pace, step);
            });
          };
          step();
        } else {
          this._marqueeOn = false;
          this._clearMarquee();
          for (let i = 0; i < 5; i++) this._mreset(i);
        }
      });
    }, { threshold: 0, rootMargin: "0px 0px -4% 0px" });
    io.observe(wrap);
    this._marqueeIo = io;
  }

  _spot(active) {
    for (let i = 0; i < 5; i++) {
      this._chapterEls(i).forEach((card) => {
        const on = i === active;
        card.style.opacity = on ? "1" : ".48";
        card.style.borderColor = on ? "#C9D0DF" : "#EDEFF4";
        card.style.boxShadow = on ? "0 22px 46px rgba(48,58,81,.12)" : "0 10px 28px rgba(48,58,81,.06)";
        card.style.transform = on ? "translateY(-6px)" : "none";
      });
    }
  }

  _mreset(i) {
    this._chapterEls(i).forEach((card) => {
      card.querySelectorAll("[data-mcount]").forEach((el) => {
        if (el._raf) cancelAnimationFrame(el._raf);
        el.textContent = el.dataset.countKind === "pct" ? "0%" : "0";
      });
      card.querySelectorAll("[data-mbar]").forEach((b, k) => this._snap(b, (el) => { el.style.height = MBARS[0][k] + "%"; el.style.background = k === 5 ? "#4A659D" : "#DBE0EB"; }));
      card.querySelectorAll("[data-perm]").forEach((r) => this._snap(r, (el) => { el.style.opacity = "0"; el.style.transform = "translateX(-10px)"; el.style.borderColor = "#F1F2F5"; }));
      card.querySelectorAll("[data-perm-pill]").forEach((p) => this._snap(p, (el) => { el.textContent = "Checking"; el.style.background = "#F1F2F5"; el.style.color = "#8F918F"; }));
      const bar = card.querySelector("[data-import-bar]");
      this._snap(bar, (el) => { el.style.width = "0%"; });
      const ip = card.querySelector("[data-import-pct]");
      if (ip) { if (ip._raf) cancelAnimationFrame(ip._raf); ip.textContent = "0%"; }
      card.querySelectorAll("[data-imp]").forEach((row) => {
        row.style.background = "#FBFBFC";
        const dot = row.querySelector("[data-imp-dot]");
        const label = row.querySelector("[data-imp-label]");
        if (dot) { dot.style.background = "#E8EAF0"; dot.innerHTML = ""; }
        if (label) { label.textContent = "Queued"; label.style.color = "#8F918F"; }
      });
      this._snap(card.querySelector("[data-imp-summary]"), (el) => { el.style.opacity = "0"; el.style.transform = "translateY(8px)"; });
      this._snap(card.querySelector("[data-step-fill]"), (el) => { el.style.width = "0%"; });
      this._snap(card.querySelector("[data-step-token]"), (el) => { el.style.left = "0%"; });
      card.querySelectorAll("[data-step]").forEach((s) => this._snap(s, (el) => { el.style.opacity = ".4"; }));
      card.querySelectorAll("[data-step-node]").forEach((n) => this._snap(n, (el) => { el.style.background = "#F1F2F5"; el.style.color = "#8F918F"; }));
      this._snap(card.querySelector("[data-step-note]"), (el) => { el.style.opacity = "0"; el.style.transform = "translateY(8px)"; });
      card.querySelectorAll("[data-dbar]").forEach((b) => this._snap(b, (el) => { el.style.height = "6%"; el.style.background = "#DBE0EB"; }));
    });
  }

  _mrun(i) {
    const p = this._pace;
    const cards = this._chapterEls(i);
    if (i === 0) {
      cards.forEach((card) => {
        card.querySelectorAll("[data-mcount]").forEach((el, k) => this._at(180 + k * 140, () => this._count(el, parseFloat(el.dataset.mcount), 1700)));
        const bars = card.querySelectorAll("[data-mbar]");
        MBARS.forEach((state, s) => {
          this._at((900 + s * 2000) * p, () => {
            state.forEach((h, k) => { bars[k].style.height = h + "%"; bars[k].style.background = h >= 76 ? "#4A659D" : "#DBE0EB"; });
          });
        });
      });
    } else if (i === 1) {
      cards.forEach((card) => {
        const rows = card.querySelectorAll("[data-perm]");
        PERMS.forEach((perm, k) => {
          const row = rows[k];
          if (!row) return;
          this._at((240 + k * 1500) * p, () => { row.style.opacity = "1"; row.style.transform = "none"; });
          this._at((900 + k * 1500) * p, () => {
            const pill = row.querySelector("[data-perm-pill]");
            if (pill) {
              pill.textContent = perm.result;
              pill.style.background = perm.granted ? "rgba(22,163,74,.12)" : "rgba(227,49,49,.12)";
              pill.style.color = perm.granted ? "#0F6B32" : "#A81E1E";
            }
            row.style.borderColor = perm.granted ? "rgba(22,163,74,.28)" : "rgba(227,49,49,.30)";
          });
        });
      });
    } else if (i === 2) {
      cards.forEach((card) => {
        const bar = card.querySelector("[data-import-bar]");
        const pct = card.querySelector("[data-import-pct]");
        if (bar) this._at(80, () => { bar.style.transition = "width " + 4200 * p + "ms cubic-bezier(.4,0,.5,1)"; bar.style.width = "100%"; });
        if (pct) this._at(100, () => this._count(pct, 100, 4200 * p));
        const rows = card.querySelectorAll("[data-imp]");
        const OUT = [
          { label: "Valid", color: "#0F6B32", bg: "rgba(22,163,74,.08)", dot: "#16A34A" },
          { label: "2 flagged", color: "#8A5A08", bg: "rgba(245,158,11,.10)", dot: "#F59E0B" },
        ];
        rows.forEach((row, k) => {
          const dot = row.querySelector("[data-imp-dot]");
          const label = row.querySelector("[data-imp-label]");
          this._at((420 + k * 1700) * p, () => {
            if (dot) dot.style.background = "#DBE0EB";
            if (label) { label.textContent = "Validating"; label.style.color = "#4A659D"; }
          });
          this._at((1500 + k * 1700) * p, () => {
            const o = OUT[k];
            row.style.background = o.bg;
            if (dot) { dot.style.background = o.dot; dot.innerHTML = '<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.6" stroke-linecap="round"><path d="M20 6 9 17l-5-5"/></svg>'; }
            if (label) { label.textContent = o.label; label.style.color = o.color; }
          });
        });
        const sum = card.querySelector("[data-imp-summary]");
        if (sum) this._at(4400 * p, () => { sum.style.opacity = "1"; sum.style.transform = "none"; });
      });
    } else if (i === 3) {
      cards.forEach((card) => {
        const fill = card.querySelector("[data-step-fill]");
        const token = card.querySelector("[data-step-token]");
        const steps = card.querySelectorAll("[data-step]");
        const nodes = card.querySelectorAll("[data-step-node]");
        [0, 1, 2, 3].forEach((k) => {
          this._at((400 + k * 1300) * p, () => {
            const pos = (k / 3) * 100;
            if (fill) fill.style.width = pos + "%";
            if (token) token.style.left = pos + "%";
            if (steps[k]) steps[k].style.opacity = "1";
            if (nodes[k]) { nodes[k].style.background = k === 3 ? "#16A34A" : "#4A659D"; nodes[k].style.color = "#fff"; }
          });
        });
        const note = card.querySelector("[data-step-note]");
        if (note) this._at(4500 * p, () => { note.style.opacity = "1"; note.style.transform = "none"; });
      });
    } else {
      cards.forEach((card) => {
        const el = card.querySelector("[data-mcount]");
        if (el) this._at(200, () => this._count(el, 96, 2000));
        const bars = card.querySelectorAll("[data-dbar]");
        DAYS.forEach((h, k) => {
          this._at((300 + k * 420) * p, () => { bars[k].style.height = h + "%"; bars[k].style.background = h >= 95 ? "#4A659D" : "#DBE0EB"; });
        });
      });
    }
  }

  // ── nav ────────────────────────────────────────────────────────
  _initNav() {
    const links = this.root.querySelector("[data-nav-links]");
    const toggle = this.root.querySelector("[data-nav-toggle]");
    const panel = this.root.querySelector("[data-nav-panel]");
    let open = false;
    const paint = () => {
      if (!panel || !toggle) return;
      panel.style.display = open ? "flex" : "none";
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    };
    const apply = () => {
      const narrow = window.innerWidth < 760;
      if (links) links.style.display = narrow ? "none" : "flex";
      if (toggle) toggle.style.display = narrow ? "flex" : "none";
      if (!narrow) open = false;
      paint();
    };
    if (toggle) toggle.addEventListener("click", () => { open = !open; paint(); });
    if (panel) panel.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => { open = false; paint(); }));
    apply();
    window.addEventListener("resize", apply);
    this._offResize = () => window.removeEventListener("resize", apply);

    const nav = this.root.querySelector("[data-nav]");
    const solid = (this.props.navOnScroll ?? "Blur") === "Solid";
    const onScroll = () => {
      if (!nav) return;
      const on = window.scrollY > 24;
      nav.style.background = on ? (solid ? "#FBFBFC" : "rgba(251,251,252,.78)") : "rgba(251,251,252,0)";
      nav.style.backdropFilter = on && !solid ? "blur(14px)" : "none";
      nav.style.borderBottomColor = on ? "#EDEFF4" : "rgba(33,33,33,0)";
      nav.style.boxShadow = on ? "0 1px 3px rgba(48,58,81,.05)" : "none";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    this._offScroll = () => window.removeEventListener("scroll", onScroll);
  }

  _initReveals() {
    if (this._reduce) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.style.opacity = "1";
        entry.target.style.transform = "none";
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    this.root.querySelectorAll("[data-reveal]").forEach((n) => {
      if (n.getBoundingClientRect().top < window.innerHeight * 0.9) return;
      n.style.opacity = "0";
      n.style.transform = "translateY(22px)";
      n.style.transition = "opacity 520ms cubic-bezier(.16,1,.3,1), transform 560ms cubic-bezier(.16,1,.3,1)";
      n.style.transitionDelay = (n.dataset.revealDelay || 0) + "ms";
      io.observe(n);
    });
    this._revealIo = io;
  }

  _initParallax() {
    if (this._reduce || !this._ambient) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const nodes = Array.from(this.root.querySelectorAll("[data-parallax]"));
    let raf = null, tx = 0, ty = 0;
    const onMove = (e) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        nodes.forEach((n) => {
          const d = parseFloat(n.dataset.parallax) || 1;
          n.style.transform = "translate3d(" + (tx * -11 * d).toFixed(2) + "px," + (ty * -7 * d).toFixed(2) + "px,0)";
        });
      });
    };
    nodes.forEach((n) => { n.style.transition = "transform 600ms cubic-bezier(.16,1,.3,1)"; n.style.willChange = "transform"; });
    window.addEventListener("mousemove", onMove, { passive: true });
    this._offMove = () => window.removeEventListener("mousemove", onMove);
  }

  _initLog() {
    const lines = Array.from(this.root.querySelectorAll("[data-log-line]"));
    if (!lines.length || this._reduce) return;
    const fades = [".9", ".62", ".42", ".26"];
    let idx = 0;
    this._logTimer = setInterval(() => {
      idx = (idx + 1) % LOG.length;
      lines.forEach((el, j) => {
        el.textContent = LOG[(idx + j) % LOG.length];
        el.style.color = "rgba(255,255,255," + fades[j] + ")";
      });
      lines[0].style.opacity = "0";
      lines[0].style.transform = "translateY(-6px)";
      setTimeout(() => { lines[0].style.opacity = "1"; lines[0].style.transform = "none"; }, 60);
    }, 2600);
  }

  _initCaps() {
    this.root.querySelectorAll("[data-cap]").forEach((card) => {
      const box = card.querySelector("[data-cap-icon]");
      if (!box) return;
      const shapes = Array.from(box.querySelectorAll("path,ellipse,rect,circle"));
      card.addEventListener("mouseenter", () => {
        box.style.background = "rgba(74,101,157,.16)";
        box.style.transform = "scale(1.06)";
        if (this._reduce) return;
        shapes.forEach((s, i) => {
          let L = 100;
          try { L = s.getTotalLength(); } catch (err) { L = 100; }
          s.style.transition = "none";
          s.style.strokeDasharray = L;
          s.style.strokeDashoffset = L;
          requestAnimationFrame(() => {
            s.style.transition = "stroke-dashoffset 640ms cubic-bezier(.16,1,.3,1) " + i * 90 + "ms";
            s.style.strokeDashoffset = 0;
          });
        });
      });
      card.addEventListener("mouseleave", () => {
        box.style.background = "rgba(74,101,157,.09)";
        box.style.transform = "none";
      });
    });
  }

  _initXvs() {
    const box = this.root.querySelector("[data-xvs-console]");
    if (!box) return;
    const counts = Array.from(box.querySelectorAll("[data-x-count]"));
    const rows = Array.from(box.querySelectorAll("[data-x-row]"));
    if (this._reduce) {
      counts.forEach((el) => { el.textContent = parseFloat(el.dataset.xCount).toLocaleString("en-US"); });
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          counts.forEach((el, i) => setTimeout(() => this._count(el, parseFloat(el.dataset.xCount), 1800), i * 150));
          if (!this._xvsTimer) {
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
            this._xvsTimer = setInterval(tick, 1500);
          }
        } else if (this._xvsTimer) {
          clearInterval(this._xvsTimer);
          this._xvsTimer = null;
          rows.forEach((r) => { r.style.background = "#FBFBFC"; r.style.transform = "none"; });
          counts.forEach((el) => { if (el._raf) cancelAnimationFrame(el._raf); el.textContent = "0"; });
        }
      });
    }, { threshold: 0.35 });
    io.observe(box);
    this._xvsIo = io;
  }

  _initForm() {
    const form = this.root.querySelector("[data-demo-form]");
    if (!form) return;
    this._form = form;
    this._bindSubmit();
    const rules = {
      name: (v) => (v.trim().length > 1 ? "" : "Enter your full name"),
      organization: (v) => (v.trim().length > 1 ? "" : "Which organization is this for?"),
      email: (v) => (/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim()) ? "" : "Enter a valid work email"),
      phone: (v) => (!v.trim() || v.replace(/\D/g, "").length >= 7 ? "" : "Check the phone number"),
    };
    this._rules = rules;
    Object.keys(rules).forEach((name) => {
      const input = form.querySelector('[name="' + name + '"]');
      const err = form.querySelector('[data-err="' + name + '"]');
      if (!input) return;
      const check = (force) => {
        const msg = rules[name](input.value);
        const touched = force || input.value.trim().length > 0;
        if (err) {
          err.textContent = touched ? msg : "";
          err.style.display = touched && msg ? "block" : "none";
        }
        input.style.borderColor = !touched ? "#E3E6ED" : (msg ? "#E33131" : "#16A34A");
        return !msg;
      };
      input.addEventListener("input", () => check(false));
      input.addEventListener("blur", () => check(input.value.trim().length > 0));
      input._check = check;
    });
  }

  _bindSubmit() {
    if (!this._form) return;
    const onSubmit = async (e: Event) => {
      e.preventDefault();
      if (this._sending || this.state.submitted) return;
      if (!this._validateAll()) return;
      const label = this._form!.querySelector("[data-submit-label]");
      const note = this.root.querySelector("[data-form-note]");
      const btn = this._form!.querySelector('button[type="submit"]') as HTMLButtonElement | null;
      const data = new FormData(this._form);
      this._sending = true;
      this._form.setAttribute("aria-busy", "true");
      if (btn) btn.disabled = true;
      if (label) label.textContent = "Sending...";
      if (note) {
        note.setAttribute("role", "status");
        note.textContent = "Sending your request...";
      }
      try {
        await sendEnquiry({
          name: String(data.get("name") || ""),
          organization: String(data.get("organization") || ""),
          email: String(data.get("email") || ""),
          phone: String(data.get("phone") || ""),
          message: String(data.get("message") || ""),
          reason: "Demo",
          form_name: "Homepage demo form",
        });
        this.state.submitted = true;
        if (label) label.textContent = "Request received";
        if (note) note.textContent = "Thanks — we reply within one business day.";
      } catch (err) {
        console.error("[home demo form] send failed", err);
        if (label) label.textContent = "Request a demo";
        if (note) {
          note.setAttribute("role", "alert");
          note.textContent = EMAIL_ERROR;
        }
      } finally {
        this._sending = false;
        this._form.setAttribute("aria-busy", "false");
        if (btn) btn.disabled = this.state.submitted;
      }
    };
    this._form.addEventListener("submit", onSubmit);
    this._offSubmit = () => this._form.removeEventListener("submit", onSubmit);
  }

  _validateAll() {
    if (!this._form || !this._rules) return true;
    let ok = true;
    Object.keys(this._rules).forEach((name) => {
      const input = this._form.querySelector('[name="' + name + '"]');
      if (input && input._check && !input._check(true)) ok = false;
    });
    return ok;
  }

  componentWillUnmount() {
    if (this._offSubmit) this._offSubmit();
    this.root.querySelectorAll('[data-clone="1"]').forEach((n) => n.remove());
    this._clearTimers();
    this._clearMarquee();
    if (this._mraf) cancelAnimationFrame(this._mraf);
    if (this._offScroll) this._offScroll();
    if (this._offResize) this._offResize();
    if (this._offArc) this._offArc();
    if (this._offMeasure) this._offMeasure();
    if (this._offMove) this._offMove();
    if (this._revealIo) this._revealIo.disconnect();
    if (this._sidesIo) this._sidesIo.disconnect();
    if (this._marqueeIo) this._marqueeIo.disconnect();
    if (this._xvsIo) this._xvsIo.disconnect();
    if (this._logTimer) clearInterval(this._logTimer);
    if (this._xvsTimer) clearInterval(this._xvsTimer);
  }
}

export function initHomeBehavior(root: HTMLElement): () => void {
  const instance = new HomeBehavior(root);
  instance.componentDidMount();
  return () => instance.componentWillUnmount();
}
