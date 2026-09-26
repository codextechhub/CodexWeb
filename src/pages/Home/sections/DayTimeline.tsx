import { DAY } from "../content";
import { Reveal, SectionHeading } from "../../../components/shared/ui";
import { useScrollProgress } from "../../../components/shared/useScrollEffects";

/**
 * Chapter 04 — a school day told as a timeline. The vertical line fills
 * in as the visitor scrolls through it.
 */
export default function DayTimeline() {
  const lineRef = useScrollProgress<HTMLDivElement>("through", 0.55);

  return (
    <section className="section day">
      <div className="container day-layout">
        <div className="day-heading">
          <SectionHeading chapter={DAY.chapter} label={DAY.label} title={DAY.title} intro={DAY.intro} />
        </div>

        <div ref={lineRef} className="timeline">
          <span className="timeline-track" aria-hidden="true">
            <span className="timeline-fill" />
          </span>
          <ol>
          {DAY.moments.map((m, i) => (
            <li key={m.time}>
              <Reveal delay={i * 60} className="moment">
                <span className="moment-dot" aria-hidden="true" />
                <time className="moment-time">{m.time}</time>
                <div>
                  <p className="moment-who">{m.who}</p>
                  <p className="moment-what">{m.what}</p>
                </div>
              </Reveal>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
