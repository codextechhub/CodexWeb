import type { CSSProperties } from "react";
import MarketingHeader from "../../components/MarketingHeader";
import MarketingFooter from "../../components/MarketingFooter";
import { Reveal } from "../../components/shared/ui";
import { Icon } from "../../components/shared/icons";
import ContactForm from "./ContactForm";
import { DETAILS, FAQ, HERO, NEXT_STEPS } from "./content";
import "../../components/shared/shared.css";
import "./contact.css";
import { PAGE_TITLES, usePageTitle } from "../../pageTitles";

/**
 * The CodeX Contact page, top to bottom:
 *
 *   Hero     – brand-blue banner with the headline + contact detail cards
 *   Main     – the form (floats up over the banner) + "what happens next"
 *   FAQ      – common questions (native <details>, no JS needed)
 *
 * ✏️ Text, email address, FAQs: ./content.ts
 * ✏️ Form fields & validation:  ./ContactForm.tsx
 * ✏️ Styles:                    ./contact.css
 */
export default function ContactPage() {
  // ✏️ Browser tab name — edit it in src/pageTitles.ts
  usePageTitle(PAGE_TITLES.contact);

  // "Book a Demo" in the header scrolls to the form and focuses the first field.
  const scrollToForm = () => {
    const form = document.getElementById("form");
    if (!form) return;
    form.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => document.getElementById("ct-name")?.focus({ preventScroll: true }), 500);
  };

  return (
    <div className="site-page contact">
      <MarketingHeader active="/contact" demoHref="#form" onDemoClick={scrollToForm} />

      <main>
        {/* ── Hero ── */}
        <section className="contact-hero">
          <div className="contact-hero-glow" aria-hidden="true" />
          <div className="contact-hero-grid" aria-hidden="true" />
          <div className="container contact-hero-inner">
            <p className="eyebrow is-light load-in">
              <span className="eyebrow-line" />
              {HERO.eyebrow}
            </p>
            <h1 className="load-in" style={{ "--delay": "100ms" } as CSSProperties}>
              {HERO.title}
            </h1>
            <p className="contact-hero-body load-in" style={{ "--delay": "220ms" } as CSSProperties}>
              {HERO.body}
            </p>
          </div>
        </section>

        {/* ── Form + sidebar ── */}
        <section className="contact-main">
          <div className="container contact-layout">
            {/* id="form" is what links like "/contact#form" jump to */}
            <div id="form" className="contact-card">
              {/* the fade-in sits on the contents so the #form jump target never moves */}
              <div className="load-in" style={{ "--delay": "300ms" } as CSSProperties}>
                <ContactForm />
              </div>
            </div>

            <aside className="contact-aside">
              {/* Contact details */}
              <div className="detail-list">
                {DETAILS.map((d, i) => (
                  <Reveal key={d.label} delay={i * 80} className="detail-card">
                    <span className="detail-icon">
                      <Icon name={d.icon} size={20} />
                    </span>
                    <div>
                      <p className="detail-label">{d.label}</p>
                      {d.href ? (
                        <a className="detail-value" href={d.href}>
                          {d.value}
                        </a>
                      ) : (
                        <p className="detail-value">{d.value}</p>
                      )}
                      {d.note && <p className="detail-note">{d.note}</p>}
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* What happens next */}
              <Reveal className="next-card">
                <h2>{NEXT_STEPS.title}</h2>
                <ol>
                  {NEXT_STEPS.steps.map((step, i) => (
                    <li key={step.title}>
                      <span className="next-num">{i + 1}</span>
                      <div>
                        <strong>{step.title}</strong>
                        <p>{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </aside>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="section contact-faq">
          <div className="container contact-faq-inner">
            <Reveal>
              <h2 className="contact-faq-title">{FAQ.title}</h2>
            </Reveal>
            <div className="faq-list">
              {FAQ.items.map((item, i) => (
                <Reveal key={item.q} delay={i * 60}>
                  <details className="faq-item">
                    <summary>
                      {item.q}
                      <span className="faq-toggle" aria-hidden="true">
                        <Icon name="plus" size={18} strokeWidth={2} />
                      </span>
                    </summary>
                    <p>{item.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter page="contact" />
    </div>
  );
}
