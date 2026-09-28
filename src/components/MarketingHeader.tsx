import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useScrolled } from "../hooks/useScrolled";
import { XVS_CONTACT_URL } from "../xvsLink";
import "./marketing.css";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

const DEMO_LABEL = "Book a demo with XVS";

/*
 * Every page renders its own header, so the header is rebuilt on each
 * navigation. These remember where the active pill was on the previous
 * page, so the new header can start the pill there and slide it across.
 */
type PillBox = { x: number; y: number; w: number; h: number };
let lastPill: PillBox | null = null;
let lastActive: string | undefined;

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

interface MarketingHeaderProps {
  /** Path of the page this header is rendered on, so its own nav link reads as active. */
  active?: "/" | "/products" | "/about" | "/blog" | "/contact";
}

/**
 * Site header modelled on wrkhq.com: a floating bar with the mark on the
 * left, links centred and the CTA on the right. It overlays the top of the
 * page so each hero's grid background runs up behind it; at the top the bar
 * is see-through, and once the page scrolls it turns solid white. Collapses
 * into a panel inside the bar under 860px.
 *
 * The active link sits on a light-blue pill. Moving between pages slides
 * the pill from the old link to the new one (passing over any links in
 * between), while the new link grows slightly and the old one shrinks back.
 */
export default function MarketingHeader({ active }: MarketingHeaderProps) {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(24);

  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  // Read once, when this page's header first renders.
  const [from] = useState(() => (lastActive !== active && !prefersReducedMotion() ? lastPill : null));
  const [wasActive] = useState(() => (from && lastActive !== active ? lastActive : undefined));

  useLayoutEffect(() => {
    const nav = navRef.current;
    const pill = pillRef.current;
    if (!nav || !pill) return;

    const at = (box: PillBox) => ({ transform: `translate(${box.x}px, ${box.y}px)`, width: `${box.w}px` });

    const put = (box: PillBox) => {
      pill.getAnimations().forEach((a) => a.cancel());
      Object.assign(pill.style, at(box), { height: `${box.h}px`, opacity: "1" });
    };

    // The slide: the pill's front edge stretches out to the new link, so for
    // a moment it spans both, then its back edge catches up.
    const slide = (a: PillBox, b: PillBox) => {
      const css = getComputedStyle(document.documentElement);
      // The build may rewrite "850ms" as ".85s", so read either unit.
      const raw = css.getPropertyValue("--mkt-slide-duration").trim();
      const duration = parseFloat(raw) * (raw.endsWith("ms") ? 1 : raw.endsWith("s") ? 1000 : 1) || 850;
      const easing = css.getPropertyValue("--mkt-slide-ease").trim() || "ease-in-out";
      const left = Math.min(a.x, b.x);
      const span = { x: left, y: b.y, w: Math.max(a.x + a.w, b.x + b.w) - left, h: b.h };
      put(b);
      pill.animate([at(a), { ...at(span), offset: 0.5 }, at(b)], { duration, easing });
    };

    const measure = (): PillBox | null => {
      const link = nav.querySelector<HTMLElement>(".mkt-header-link.is-active");
      if (!link) return null;
      return { x: link.offsetLeft, y: link.offsetTop, w: link.offsetWidth, h: link.offsetHeight };
    };

    const place = () => {
      const box = measure();
      if (!box) {
        pill.style.opacity = "0";
        lastPill = null;
        return;
      }
      put(box);
      lastPill = box;
    };

    const target = measure();
    if (from && target) {
      slide(from, target); // from where the previous page left it, to this page's link
      lastPill = target;
    } else {
      place();
    }
    lastActive = active;

    // Re-place (without sliding) only if the links really change size, e.g.
    // once the web font loads; other callbacks would cut the slide short.
    let size = `${nav.offsetWidth}x${nav.offsetHeight}`;
    const ro = new ResizeObserver(() => {
      const next = `${nav.offsetWidth}x${nav.offsetHeight}`;
      if (next === size) return;
      size = next;
      place();
    });
    ro.observe(nav);
    return () => ro.disconnect();
  }, [active, from]);

  const closePanel = () => setOpen(false);

  return (
    <header className="mkt-header">
      <div className={`mkt-header-bar${scrolled ? " is-scrolled" : ""}`}>
        <Link to="/" className="mkt-header-logo" aria-label="Home" onClick={closePanel}>
          <svg
            width="34"
            height="28"
            viewBox="0 0 30 25"
            fill="none"
            aria-hidden="true"
            style={{ display: "block", color: "#4A659D" }}
          >
            <path
              d="M13.9493 14.0612C17.6443 8.2554 19.9781 5.27429 24.9001 0.372653C22.2283 -0.771525 20.3744 0.615508 16.5566 5.97844L11.8634 13.4094L6.77909 11.845C4.19062 11.2553 2.74787 10.8566 0 11.4539C4.25594 12.6334 6.59352 13.4114 10.5597 15.3649C7.42046 19.5739 5.37817 21.5893 1.04294 24.2298C3.51963 24.9652 4.89632 24.7958 7.30056 22.9261C9.57745 20.8802 10.8378 19.256 12.9063 16.5382C17.1978 19.0111 19.6243 20.6002 23.8572 22.4047C26.5897 22.9516 27.7376 22.8718 29.0719 21.4921C23.2733 19.015 19.927 17.3396 13.9493 14.0612Z"
              fill="currentColor"
            />
            <path
              d="M22.5535 10.1503C19.5947 11.5749 17.9464 12.4495 14.9922 14.322L16.8174 15.3649C21.2796 12.4323 23.8297 11.0245 28.42 8.71626C26.3014 8.75601 25.015 9.05585 22.5535 10.1503Z"
              fill="currentColor"
            />
          </svg>
        </Link>

        <nav ref={navRef} className={`mkt-nav-links${from ? " is-sliding" : ""}`} aria-label="Main">
          <span ref={pillRef} className="mkt-nav-pill" aria-hidden="true" />
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`mkt-header-link${active === link.to ? " is-active" : ""}${wasActive === link.to ? " was-active" : ""}`}
              aria-current={active === link.to ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mkt-header-actions">
          <a
            href={XVS_CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mkt-header-cta mkt-nav-desktop"
          >
            {DEMO_LABEL}
          </a>

          <button
            type="button"
            className="mkt-nav-toggle"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>

        <div className={`mkt-nav-panel${open ? " is-open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={closePanel}
              className={`mkt-header-link${active === link.to ? " is-active" : ""}`}
              aria-current={active === link.to ? "page" : undefined}
              style={{ padding: "12px 14px", fontSize: 16 }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={XVS_CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closePanel}
            className="mkt-header-cta"
            style={{ marginTop: 8, justifyContent: "center", minHeight: 48, fontSize: 16 }}
          >
            {DEMO_LABEL}
          </a>
        </div>
      </div>
    </header>
  );
}
