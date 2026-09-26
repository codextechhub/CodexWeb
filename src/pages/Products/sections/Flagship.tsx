import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { XVS_URL } from "../../../xvsLink";
import { FLAGSHIP } from "../content";
import { ArrowIcon, BrowserFrame } from "../../../components/shared/ui";
import { useScrollProgress } from "../../../components/shared/useScrollEffects";

/**
 * The XVS showcase card: copy on the left, screenshot on the right with
 * a smaller card floating over it. The floating card drifts as you scroll
 * (driven by `--progress`, see `.flagship-float` in products.css).
 */
export default function Flagship() {
  const cardRef = useScrollProgress<HTMLDivElement>("through", 0.3);

  return (
    <section className="prod-flagship">
      <div className="container">
        <div ref={cardRef} className="flagship-card load-in" style={{ "--delay": "520ms" } as CSSProperties}>
          <div className="flagship-glow" aria-hidden="true" />

          <div className="flagship-copy">
            <div className="flagship-brand">
              <span className="flagship-logo" aria-hidden="true">
                {/* CodeX mark */}
                <svg width="26" height="22" viewBox="0 0 30 25" fill="currentColor">
                  <path d="M13.9493 14.0612C17.6443 8.2554 19.9781 5.27429 24.9001 0.372653C22.2283 -0.771525 20.3744 0.615508 16.5566 5.97844L11.8634 13.4094L6.77909 11.845C4.19062 11.2553 2.74787 10.8566 0 11.4539C4.25594 12.6334 6.59352 13.4114 10.5597 15.3649C7.42046 19.5739 5.37817 21.5893 1.04294 24.2298C3.51963 24.9652 4.89632 24.7958 7.30056 22.9261C9.57745 20.8802 10.8378 19.256 12.9063 16.5382C17.1978 19.0111 19.6243 20.6002 23.8572 22.4047C26.5897 22.9516 27.7376 22.8718 29.0719 21.4921C23.2733 19.015 19.927 17.3396 13.9493 14.0612Z" />
                  <path d="M22.5535 10.1503C19.5947 11.5749 17.9464 12.4495 14.9922 14.322L16.8174 15.3649C21.2796 12.4323 23.8297 11.0245 28.42 8.71626C26.3014 8.75601 25.015 9.05585 22.5535 10.1503Z" />
                </svg>
              </span>
              <div>
                <p className="flagship-name">
                  {FLAGSHIP.name}
                  <span className="flagship-badge">
                    <span className="pulse" aria-hidden="true" />
                    {FLAGSHIP.badge}
                  </span>
                </p>
                <p className="flagship-fullname">{FLAGSHIP.fullName}</p>
              </div>
            </div>

            <h2>{FLAGSHIP.title}</h2>
            <p className="flagship-body">{FLAGSHIP.body}</p>

            <ul className="flagship-tags">
              {FLAGSHIP.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>

            <div className="flagship-actions">
              {/* XVS lives on its own domain — opens in a new tab */}
              <a href={XVS_URL} target="_blank" rel="noopener noreferrer" className="btn btn-light">
                {FLAGSHIP.primaryCta}
                <ArrowIcon external />
              </a>
              <Link to={FLAGSHIP.secondaryCta.to} className="btn btn-outline-light">
                {FLAGSHIP.secondaryCta.label}
              </Link>
            </div>
          </div>

          <div className="flagship-visual">
            <div className="flagship-shot">
              <BrowserFrame src={FLAGSHIP.image.src} alt={FLAGSHIP.image.alt} eager />
            </div>
            <figure className="flagship-float" aria-hidden="true">
              <img src={FLAGSHIP.floatImage.src} alt="" width={1600} height={1000} loading="lazy" />
            </figure>
          </div>

          <dl className="flagship-facts">
            {FLAGSHIP.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
