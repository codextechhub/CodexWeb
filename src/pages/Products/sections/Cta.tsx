import { Link } from "react-router-dom";
import { XVS_URL } from "../../../xvsLink";
import { CTA } from "../content";
import { ArrowIcon, Reveal } from "../../../components/shared/ui";

/** Closing banner: copy + buttons on the left, a screenshot peeking in on the right. */
export default function Cta() {
  return (
    <section className="prod-cta-wrap">
      <div className="container">
        <Reveal className="prod-cta">
          <div className="prod-cta-copy">
            <h2>{CTA.title}</h2>
            <p>{CTA.body}</p>
            <div className="prod-cta-actions">
              <Link to={CTA.primary.to} className="btn btn-light">
                {CTA.primary.label}
                <ArrowIcon />
              </Link>
              <a href={XVS_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">
                Visit XVS
                <ArrowIcon external />
              </a>
            </div>
          </div>
          <div className="prod-cta-shot" aria-hidden="true">
            <img src={CTA.image} alt="" width={1600} height={1000} loading="lazy" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
