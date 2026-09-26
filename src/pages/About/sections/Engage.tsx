import { ENGAGE } from "../content";
import { Reveal, SectionHeading } from "../../../components/shared/ui";

/** "How we engage" — four numbered steps joined by a line on desktop. */
export default function Engage() {
  return (
    <section className="section about-engage">
      <div className="container">
        <SectionHeading chapter={ENGAGE.chapter} label={ENGAGE.label} title={ENGAGE.title} />
        <ol className="engage-grid">
          {ENGAGE.steps.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 100} className="engage-card">
                <span className="engage-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
