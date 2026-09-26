import { QUOTE, STORY } from "../content";
import { Reveal, SectionHeading } from "../../../components/shared/ui";
import { useScrollProgress } from "../../../components/shared/useScrollEffects";

/**
 * "Our story" — heading stays pinned on the left (desktop) while the
 * steps scroll by on the right and a line fills in beside them.
 * Ends with a large manifesto quote.
 */
export default function Story() {
  const lineRef = useScrollProgress<HTMLDivElement>("through", 0.55);

  return (
    <section className="section about-story">
      <div className="container about-story-grid">
        <div className="about-story-heading">
          <SectionHeading chapter={STORY.chapter} label={STORY.label} title={STORY.title} intro={STORY.intro} />
        </div>

        <div ref={lineRef} className="story-steps">
          <span className="story-track" aria-hidden="true">
            <span className="story-fill" />
          </span>
          <ol>
            {STORY.steps.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 50} className="story-step">
                  <span className="story-dot" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* Only shown when a year is filled in (content.ts) */}
                  {step.year && <span className="story-year">{step.year}</span>}
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="container">
        <Reveal className="about-quote">
          <svg className="about-quote-mark" width="44" height="34" viewBox="0 0 44 34" fill="currentColor" aria-hidden="true">
            <path d="M0 34V20C0 8.7 5.6 2 16.9 0l2 4.6C12.6 6.4 9.6 10 9.3 15.4H18V34H0Zm25 0V20C25 8.7 30.6 2 41.9 0l2 4.6c-6.3 1.8-9.3 5.4-9.6 10.8H43V34H25Z" />
          </svg>
          <blockquote>{QUOTE.text}</blockquote>
          <p className="about-quote-by">— {QUOTE.by}</p>
        </Reveal>
      </div>
    </section>
  );
}
