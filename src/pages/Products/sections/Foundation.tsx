import { Link } from "react-router-dom";
import { FOUNDATION } from "../content";
import { Reveal } from "../../../components/shared/ui";
import { Icon } from "../../../components/shared/icons";

/** The governance layer shared by every module — a single wide strip. */
export default function Foundation() {
  return (
    <section className="prod-foundation">
      <div className="container">
        <Reveal className="foundation-card">
          <div className="foundation-head">
            <h2>{FOUNDATION.title}</h2>
            <Link to={FOUNDATION.link.to} className="foundation-link">
              {FOUNDATION.link.label} →
            </Link>
          </div>
          <ul className="foundation-list">
            {FOUNDATION.items.map((item) => (
              <li key={item.title}>
                <span className="foundation-icon">
                  <Icon name={item.icon} size={20} />
                </span>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
