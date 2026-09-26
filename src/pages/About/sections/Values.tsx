import { VALUES } from "../content";
import { Reveal, SectionHeading } from "../../../components/shared/ui";
import { Icon } from "../../../components/shared/icons";

/** "What we hold to" — the three governance rules on a dark background. */
export default function Values() {
  return (
    <section className="section about-values">
      <div className="about-values-glow" aria-hidden="true" />
      <div className="container">
        <SectionHeading dark chapter={VALUES.chapter} label={VALUES.label} title={VALUES.title} intro={VALUES.intro} />
        <div className="values-grid">
          {VALUES.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 110} className="value-card">
              <span className="value-icon">
                <Icon name={item.icon} size={24} />
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
