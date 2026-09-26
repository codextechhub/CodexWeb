import type { CSSProperties } from "react";
import { HERO } from "../content";

/** Opening headline + live / in-development counters. */
export default function Hero() {
  return (
    <section className="prod-hero">
      <div className="prod-hero-glow" aria-hidden="true" />
      <div className="prod-hero-grid" aria-hidden="true" />
      <div className="container prod-hero-inner">
        <p className="eyebrow load-in">
          <span className="eyebrow-line" />
          {HERO.eyebrow}
          <span className="eyebrow-line" />
        </p>
        <h1>
          <span className="load-in" style={{ "--delay": "100ms" } as CSSProperties}>
            {HERO.title}
          </span>{" "}
          <em className="load-in" style={{ "--delay": "220ms" } as CSSProperties}>
            {HERO.titleAccent}
          </em>
        </h1>
        <p className="prod-hero-body load-in" style={{ "--delay": "340ms" } as CSSProperties}>
          {HERO.body}
        </p>
        <ul className="prod-status load-in" style={{ "--delay": "440ms" } as CSSProperties}>
          {HERO.status.map((s) => (
            <li key={s.label} className={s.live ? "is-live" : ""}>
              <span className="prod-status-dot" aria-hidden="true" />
              <strong>{s.count}</strong> {s.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
