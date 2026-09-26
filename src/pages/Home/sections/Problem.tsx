import type { CSSProperties } from "react";
import { PROBLEM } from "../content";
import { Reveal } from "../../../components/shared/ui";
import { useScrollProgress } from "../../../components/shared/useScrollEffects";

/**
 * Chapter 01. The statement is pinned (sticky) while its words light up
 * one by one as the visitor scrolls; the pain points follow underneath.
 */
export default function Problem() {
  const stickyRef = useScrollProgress<HTMLDivElement>("sticky");
  const words = PROBLEM.statement.split(" ");

  return (
    <section className="problem" id="story">
      <div ref={stickyRef} className="problem-scroll" style={{ "--n": words.length } as CSSProperties}>
        <div className="problem-sticky">
          <div className="container">
            <p className="eyebrow">
              <span className="eyebrow-num">{PROBLEM.chapter}</span>
              <span className="eyebrow-line" />
              {PROBLEM.label}
            </p>
            <p className="problem-statement">
              {words.map((word, i) => (
                <span key={i} className="word" style={{ "--i": i } as CSSProperties}>
                  {word}{" "}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>

      <div className="container problem-pains">
        {PROBLEM.pains.map((pain, i) => (
          <Reveal key={pain.title} delay={i * 110} className="pain-card">
            <span className="pain-index">{String(i + 1).padStart(2, "0")}</span>
            <h3>{pain.title}</h3>
            <p>{pain.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
