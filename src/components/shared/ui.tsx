import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { prefersReducedMotion, useInView } from "./useScrollEffects";

/* ── Reveal ────────────────────────────────────────────────
 * Fades + lifts its children in the first time they scroll into view.
 * `delay` (ms) lets you stagger items in a list.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "is-visible" : ""} ${className}`}
      style={{ "--delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

/* ── SectionHeading ────────────────────────────────────────
 * The "chapter" header used at the top of each story section.
 */
export function SectionHeading({
  chapter,
  label,
  title,
  intro,
  dark = false,
  center = false,
}: {
  chapter: string;
  label: string;
  title: string;
  intro?: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal className={`section-heading ${dark ? "is-dark" : ""} ${center ? "is-center" : ""}`}>
      <p className="eyebrow">
        <span className="eyebrow-num">{chapter}</span>
        <span className="eyebrow-line" />
        {label}
      </p>
      <h2>{title}</h2>
      {intro && <p className="section-intro">{intro}</p>}
    </Reveal>
  );
}

/* ── BrowserFrame ──────────────────────────────────────────
 * Wraps a product screenshot in a simple app window.
 */
export function BrowserFrame({
  src,
  alt,
  url = "app.xvs.codexng.com",
  eager = false,
}: {
  src: string;
  alt: string;
  url?: string;
  eager?: boolean;
}) {
  return (
    <div className="browser">
      <div className="browser-bar" aria-hidden="true">
        <span className="browser-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="browser-url">{url}</span>
      </div>
      <img
        src={src}
        alt={alt}
        width={1600}
        height={1000}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  );
}

/* ── CountUp ───────────────────────────────────────────────
 * Animates a number from 0 to `value` once it scrolls into view.
 */
export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [ref, inView] = useInView<HTMLSpanElement>();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView || prefersReducedMotion()) return;
    const duration = 1400;
    const t0 = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(value * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {(prefersReducedMotion() ? value : shown).toLocaleString()}
      {suffix}
    </span>
  );
}

/* ── ArrowIcon ─────────────────────────────────────────── */
export function ArrowIcon({ external = false }: { external?: boolean }) {
  return (
    <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {external ? <path d="M7 17 17 7M8 7h9v9" /> : <path d="M5 12h14M13 6l6 6-6 6" />}
    </svg>
  );
}

/* ── DisciplineIcon ──────────────────────────────────────
 * Line icons for the "What we build" cards. Add a new key here
 * and reference it from content.ts to use a new icon.
 */
const ICON_PATHS: Record<string, ReactNode> = {
  database: (
    <>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="3" />
      <path d="M4.5 5.5v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6" />
      <path d="M4.5 11.5v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6" />
    </>
  ),
  org: (
    <>
      <rect x="9" y="3" width="6" height="5" rx="1.2" />
      <rect x="3" y="16" width="6" height="5" rx="1.2" />
      <rect x="15" y="16" width="6" height="5" rx="1.2" />
      <path d="M12 8v4M6 16v-2h12v2" />
    </>
  ),
  flow: (
    <>
      <path d="M4 7h11l-3-3M20 17H9l3 3" />
      <circle cx="19" cy="7" r="1.6" />
      <circle cx="5" cy="17" r="1.6" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V4M4 20h16" />
      <path d="m7.5 15 3.5-4 3 2.5 5-6.5" />
    </>
  ),
};

export function DisciplineIcon({ name }: { name: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICON_PATHS[name]}
    </svg>
  );
}
