import { DISCIPLINES } from "../content";
import { DisciplineIcon, Reveal, SectionHeading } from "../../../components/shared/ui";

/** Chapter 02 — the four things CodeX builds. */
export default function Disciplines() {
  return (
    <section className="section disciplines">
      <div className="container">
        <SectionHeading
          chapter={DISCIPLINES.chapter}
          label={DISCIPLINES.label}
          title={DISCIPLINES.title}
          intro={DISCIPLINES.intro}
        />
        <div className="discipline-grid">
          {DISCIPLINES.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 90} className="discipline-card">
              <span className="discipline-icon">
                <DisciplineIcon name={item.icon} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
