import { PRINCIPLES, STATS } from "../content";
import { CountUp, Reveal, SectionHeading } from "../../../components/shared/ui";

/** Chapter 05 — how CodeX works, followed by the platform numbers. */
export default function Principles() {
  return (
    <section className="section principles">
      <div className="container">
        <SectionHeading chapter={PRINCIPLES.chapter} label={PRINCIPLES.label} title={PRINCIPLES.title} />

        <div className="principle-grid">
          {PRINCIPLES.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 110} className="principle">
              <span className="principle-num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </Reveal>
          ))}
        </div>

        <div className="stats">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 90} className="stat">
              <span className="stat-value">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="stat-label">{stat.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
