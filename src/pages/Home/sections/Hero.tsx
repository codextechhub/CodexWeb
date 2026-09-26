import { useEffect, useRef } from "react";
import { AUDIENCE, HERO } from "../content";
import { ArrowIcon, BrowserFrame } from "../../../components/shared/ui";
import { prefersReducedMotion } from "../../../components/shared/useScrollEffects";

/**
 * Opening scene. The screenshot starts tilted back in 3D and flattens
 * as the visitor scrolls (driven by the `--hero-scroll` CSS variable).
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || prefersReducedMotion()) {
      node?.style.setProperty("--hero-scroll", "1");
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const p = Math.min(1, window.scrollY / (window.innerHeight * 0.6));
      node.style.setProperty("--hero-scroll", p.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero" id="top">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />

      <div className="container hero-copy">
        {/* <p className="hero-eyebrow load-in" style={{ "--delay": "0ms" } as React.CSSProperties}>
          <span className="pulse-dot" />
          {HERO.eyebrow}
        </p> */}
        <h1>
          {HERO.titleLines.map((line, i) => (
            <span key={line} className="hero-line load-in" style={{ "--delay": `${120 + i * 140}ms` } as React.CSSProperties}>
              {i === HERO.titleLines.length - 1 ? <em>{line}</em> : line}
            </span>
          ))}
        </h1>
        <p className="hero-body load-in" style={{ "--delay": "420ms" } as React.CSSProperties}>
          {HERO.body}
        </p>
        <div className="hero-actions load-in" style={{ "--delay": "540ms" } as React.CSSProperties}>
          <a href={HERO.primaryCta.href} className="btn btn-primary">
            {HERO.primaryCta.label}
            <ArrowIcon />
          </a>
          <a href={HERO.secondaryCta.href} className="btn btn-ghost">
            {HERO.secondaryCta.label}
          </a>
        </div>
      </div>

      <div className="container hero-stage load-in" style={{ "--delay": "700ms" } as React.CSSProperties}>
        <div className="hero-frame">
          <BrowserFrame src={HERO.image} alt={HERO.imageAlt} eager />
        </div>
        {HERO.chips.map((chip, i) => (
          <div key={chip.label} className={`hero-chip hero-chip-${i + 1}`} aria-hidden="true">
            <span className="hero-chip-label">{chip.label}</span>
            <span className="hero-chip-value">{chip.value}</span>
          </div>
        ))}
      </div>

      <div className="audience" aria-label="Built for">
        <p className="audience-title">Built for the people who run institutions</p>
        <div className="marquee">
          {/* The list is rendered twice so the loop is seamless. */}
          <div className="marquee-track">
            {[...AUDIENCE, ...AUDIENCE].map((who, i) => (
              <span key={i} className="marquee-item" aria-hidden={i >= AUDIENCE.length}>
                {who}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
