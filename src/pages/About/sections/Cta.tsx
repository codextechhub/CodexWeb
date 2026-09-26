import { Link } from "react-router-dom";
import { XVS_URL } from "../../../xvsLink";
import { CTA } from "../content";
import { ArrowIcon, Reveal } from "../../../components/shared/ui";

/** Closing call to action. */
export default function Cta() {
  return (
    <section className="about-cta-wrap">
      <div className="container">
        <Reveal className="about-cta">
          <div className="about-cta-glow" aria-hidden="true" />
          <h2>{CTA.title}</h2>
          <p>{CTA.body}</p>
          <div className="about-cta-actions">
            <Link to={CTA.primary.to} className="btn btn-light">
              {CTA.primary.label}
              <ArrowIcon />
            </Link>
            <a href={XVS_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">
              {CTA.secondary.label}
              <ArrowIcon external />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
