import type { CSSProperties } from "react";
import { HERO } from "../content";
import { Reveal } from "../../../components/shared/ui";
import { usePageScroll } from "../../../components/shared/useScrollEffects";

/**
 * Opening scene: headline on the left, three XVS screenshots fanned out
 * on the right. As you scroll, the fan spreads apart (driven by the
 * `--page-scroll` CSS variable — see `.about-fan` in about.css).
 */
export default function Hero() {
  const heroRef = usePageScroll<HTMLElement>(700);

  return (
    <section ref={heroRef} className="about-hero">
      <div className="about-hero-glow" aria-hidden="true" />

      <div className="container about-hero-grid">
        <div className="about-hero-copy">
          <p className="eyebrow load-in">
            <span className="eyebrow-line" />
            {HERO.eyebrow}
          </p>
          <h1>
            <span className="load-in" style={{ "--delay": "100ms" } as CSSProperties}>
              {HERO.title}{" "}
            </span>
            <em className="load-in" style={{ "--delay": "220ms" } as CSSProperties}>
              {HERO.titleAccent}
            </em>
          </h1>
          <p className="about-hero-body load-in" style={{ "--delay": "360ms" } as CSSProperties}>
            {HERO.body}
          </p>
        </div>

        {/* Screenshot fan. Order in content.ts = front to back. */}
        <div className="about-fan load-in" style={{ "--delay": "450ms" } as CSSProperties} aria-hidden="true">
          {HERO.images.map((img, i) => (
            <figure key={img.src} className={`about-fan-card about-fan-card-${i + 1}`}>
              <img src={img.src} alt={img.alt} width={1600} height={1000} loading="eager" decoding="async" />
            </figure>
          ))}
        </div>
      </div>

      {/* Quick facts strip */}
      <div className="container">
        <dl className="about-facts">
          {HERO.facts.map((fact, i) => (
            <Reveal key={fact.label} delay={i * 80} className="about-fact">
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
