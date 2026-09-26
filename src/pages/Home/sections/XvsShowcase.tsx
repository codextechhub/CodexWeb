import { useEffect, useRef, useState, type CSSProperties } from "react";
import { XVS_URL } from "../../../xvsLink";
import { XVS } from "../content";
import { ArrowIcon, BrowserFrame, Reveal, SectionHeading } from "../../../components/shared/ui";
import { prefersReducedMotion, useInView } from "../../../components/shared/useScrollEffects";

/** How long each tab stays on screen before auto-advancing (ms). */
const TAB_DURATION = 6500;

/**
 * Chapter 03 — the flagship product. Tabs auto-advance while the section
 * is on screen; clicking a tab stops the auto-play.
 */
export default function XvsShowcase() {
  const [active, setActive] = useState(0);
  const [autoPlay, setAutoPlay] = useState(!prefersReducedMotion());
  const [ref, inView] = useInView<HTMLDivElement>("0px 0px -30% 0px");
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoPlay || !inView) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % XVS.tabs.length), TAB_DURATION);
    return () => window.clearTimeout(id);
  }, [active, autoPlay, inView]);

  // On phones/tablets the tabs are a horizontal pill row: keep the active
  // pill visible (scrolls only the row, never the page).
  useEffect(() => {
    const row = tabsRef.current;
    const pill = row?.children[active] as HTMLElement | undefined;
    if (!row || !pill || row.scrollWidth <= row.clientWidth) return;
    const offset = pill.getBoundingClientRect().left - row.getBoundingClientRect().left;
    row.scrollBy({ left: offset - 16, behavior: "smooth" });
  }, [active]);

  const choose = (i: number) => {
    setAutoPlay(false);
    setActive(i);
  };

  const current = XVS.tabs[active];

  return (
    <section className="section xvs" id="xvs">
      <div className="xvs-glow" aria-hidden="true" />
      <div className="container">
        <SectionHeading dark chapter={XVS.chapter} label={XVS.label} title={XVS.title} intro={XVS.intro} />

        <div ref={ref} className="xvs-layout">
          <div ref={tabsRef} className="xvs-tabs" role="tablist" aria-label="XVS features">
            {XVS.tabs.map((tab, i) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`xvs-tab-${tab.id}`}
                aria-selected={i === active}
                aria-controls="xvs-panel"
                className={`xvs-tab ${i === active ? "is-active" : ""}`}
                onClick={() => choose(i)}
              >
                <span className="xvs-tab-name">{tab.tab}</span>
                <span className="xvs-tab-detail">
                  <strong>{tab.title}</strong>
                  {tab.body}
                </span>
                {i === active && autoPlay && inView && (
                  <span className="xvs-tab-timer" style={{ "--duration": `${TAB_DURATION}ms` } as CSSProperties} />
                )}
              </button>
            ))}
          </div>

          <div className="xvs-stage" id="xvs-panel" role="tabpanel" aria-labelledby={`xvs-tab-${current.id}`}>
            {XVS.tabs.map((tab, i) => (
              <div key={tab.id} className={`xvs-shot ${i === active ? "is-active" : ""}`} aria-hidden={i !== active}>
                <BrowserFrame src={tab.image} alt={tab.alt} />
              </div>
            ))}
            {/* Shown on mobile, where the tab list collapses to names only. */}
            <div className="xvs-caption">
              <strong>{current.title}</strong>
              <p>{current.body}</p>
            </div>
          </div>
        </div>

        <Reveal className="xvs-cta">
          <a href={XVS_URL} target="_blank" rel="noopener noreferrer" className="btn btn-light">
            {XVS.cta}
            <ArrowIcon external />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
