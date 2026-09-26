import { AREAS } from "../content";
import { Reveal } from "../../../components/shared/ui";
import { Icon } from "../../../components/shared/icons";

/**
 * "Inside XVS" — a bento grid with one card per operating area.
 * The first card spans two columns (see `.area-card:first-child` in
 * products.css). Each card's screenshot slides up a little on hover.
 */
export default function Areas() {
  return (
    <section className="section prod-areas" id="inside-xvs">
      <div className="container">
        <Reveal className="section-heading is-center">
          <p className="eyebrow">
            <span className="eyebrow-line" />
            {AREAS.label}
            <span className="eyebrow-line" />
          </p>
          <h2>{AREAS.title}</h2>
          <p className="section-intro">{AREAS.intro}</p>
        </Reveal>

        <div className="area-grid">
          {AREAS.items.map((area, i) => (
            <Reveal key={area.title} delay={(i % 3) * 90} className="area-card">
              <div className="area-top">
                <span className="area-icon">
                  <Icon name={area.icon} />
                </span>
                <h3>{area.title}</h3>
                <p>{area.body}</p>
                <ul className="area-modules">
                  {area.modules.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
              <div className="area-shot" aria-hidden="true">
                <img src={area.image} alt="" width={1600} height={1000} loading="lazy" decoding="async" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
