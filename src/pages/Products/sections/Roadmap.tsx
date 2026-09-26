import { Link } from "react-router-dom";
import { ROADMAP } from "../content";
import { ArrowIcon, Reveal } from "../../../components/shared/ui";
import { Icon } from "../../../components/shared/icons";

/**
 * Products in development. Each card has a slowly rotating gradient
 * border (see `.roadmap-card::before` in products.css); the last card
 * invites visitors to suggest a problem.
 */
export default function Roadmap() {
  return (
    <section className="section prod-roadmap">
      <div className="container">
        <Reveal className="roadmap-head">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-line" />
              {ROADMAP.label}
            </p>
            <h2>{ROADMAP.title}</h2>
          </div>
          <p className="roadmap-note">{ROADMAP.note}</p>
        </Reveal>

        <div className="roadmap-grid">
          {ROADMAP.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 110} className="roadmap-card">
              <div className="roadmap-inner">
                <span className="roadmap-stage">
                  <Icon name={i === 0 ? "lock" : "source"} size={16} />
                  {item.stage}
                </span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <span className="roadmap-shimmer" aria-hidden="true" />
              </div>
            </Reveal>
          ))}

          <Reveal delay={220} className="roadmap-invite">
            <h3>{ROADMAP.invite.title}</h3>
            <p>{ROADMAP.invite.body}</p>
            <Link to={ROADMAP.invite.cta.to} className="btn btn-primary">
              {ROADMAP.invite.cta.label}
              <ArrowIcon />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
