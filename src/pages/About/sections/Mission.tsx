import { MISSION } from "../content";
import { Reveal } from "../../../components/shared/ui";

/** Mission (light card) and vision (brand-blue card), side by side. */
export default function Mission() {
  return (
    <section className="section about-mission">
      <div className="container about-mission-grid">
        <Reveal className="mission-card">
          <p className="mission-label">{MISSION.mission.label}</p>
          <p className="mission-text">{MISSION.mission.text}</p>
        </Reveal>
        <Reveal delay={120} className="mission-card is-brand">
          <p className="mission-label">{MISSION.vision.label}</p>
          <p className="mission-text">{MISSION.vision.text}</p>
        </Reveal>
      </div>
    </section>
  );
}
