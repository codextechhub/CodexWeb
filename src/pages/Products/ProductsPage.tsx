import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import MarketingHeader from "../../components/MarketingHeader";
import MarketingFooter from "../../components/MarketingFooter";
import { initProductsBehavior } from "./productsBehavior";
import "../../components/marketing.css";
import "./products.css";

const MODULES = [
  { num: "01", title: "Institution & branches", desc: "Onboard a school, add branches under it, and keep the group structure explicit rather than implied." },
  { num: "02", title: "Roles & permissions", desc: "Named roles built from individual permission keys, so access is granted by the action, not the job title." },
  { num: "03", title: "Data import & validation", desc: "Upload a term's records in bulk. Every row is validated and flagged before anything is published." },
  { num: "04", title: "Reporting & export", desc: "Build a report once, run it on demand, and take the file away with a record of who exported what." },
  { num: "05", title: "Fees & billing", desc: "Bill a term, track what has been collected against it, and see the gap per branch without a spreadsheet." },
  { num: "06", title: "Attendance", desc: "Marked where it happens, visible the same morning, and summarised by class, branch and term." },
  { num: "07", title: "Timetabling", desc: "Periods, classes and staff assignments in one place, with the clashes surfaced before the term starts." },
  { num: "08", title: "Parent & student portal", desc: "The parts of the record a family should see, and nothing else — scoped by the same permission system." },
];

const SCHOOLS = [
  { code: "GA", name: "Grace Academy · Ikeja", meta: "4 branches · 3,180 students", status: "Active", tone: "green" },
  { code: "NG", name: "Northgate Group · Abuja", meta: "7 branches · 5,240 students", status: "Active", tone: "green" },
  { code: "PV", name: "Palm Valley Schools · Ibadan", meta: "2 branches · 1,120 students", status: "Pending", tone: "amber" },
  { code: "CC", name: "Crest College · Enugu", meta: "1 branch · 860 students", status: "Inactive", tone: "blue" },
] as const;

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  green: { bg: "rgba(22,163,74,.12)", color: "#0F6B32" },
  amber: { bg: "rgba(245,158,11,.14)", color: "#8A5A08" },
  blue: { bg: "rgba(74,101,157,.12)", color: "#4A659D" },
};

const XVS_LOGO = (
  <svg width="24" height="20" viewBox="0 0 30 25" fill="none" aria-hidden="true" style={{ color: "#fff" }}>
    <path d="M13.9493 14.0612C17.6443 8.2554 19.9781 5.27429 24.9001 0.372653C22.2283 -0.771525 20.3744 0.615508 16.5566 5.97844L11.8634 13.4094L6.77909 11.845C4.19062 11.2553 2.74787 10.8566 0 11.4539C4.25594 12.6334 6.59352 13.4114 10.5597 15.3649C7.42046 19.5739 5.37817 21.5893 1.04294 24.2298C3.51963 24.9652 4.89632 24.7958 7.30056 22.9261C9.57745 20.8802 10.8378 19.256 12.9063 16.5382C17.1978 19.0111 19.6243 20.6002 23.8572 22.4047C26.5897 22.9516 27.7376 22.8718 29.0719 21.4921C23.2733 19.015 19.927 17.3396 13.9493 14.0612Z" fill="currentColor" />
    <path d="M22.5535 10.1503C19.5947 11.5749 17.9464 12.4495 14.9922 14.322L16.8174 15.3649C21.2796 12.4323 23.8297 11.0245 28.42 8.71626C26.3014 8.75601 25.015 9.05585 22.5535 10.1503Z" fill="currentColor" />
  </svg>
);

const ARROW_RIGHT = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h13" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export default function ProductsPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    return initProductsBehavior(rootRef.current);
  }, []);

  return (
    <div style={{ background: "#FBFBFC", color: "#212121", overflow: "clip" }} id="top">
      <MarketingHeader active="/products" demoHref="/contact" />

      <div ref={rootRef}>
        {/* Hero */}
        <section style={{ position: "relative", padding: "clamp(44px,6vw,86px) 24px clamp(28px,3.5vw,44px)" }}>
          <div
            className="mkt-drift"
            style={{
              position: "absolute",
              top: -200,
              right: "6%",
              width: 460,
              height: 460,
              borderRadius: "50%",
              background: "radial-gradient(circle,rgba(74,101,157,.09),transparent 68%)",
              filter: "blur(12px)",
              pointerEvents: "none",
              animation: "cx-drift 19s ease-in-out infinite",
            }}
          />
          <div style={{ position: "relative", maxWidth: 1160, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 28 }}>
            <div style={{ flex: "1 1 480px", minWidth: 0, display: "flex", flexDirection: "column", gap: 18 }}>
              <span style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(74,101,157,.8)" }}>Portfolio</span>
              <h1 style={{ margin: 0, maxWidth: "14ch", fontSize: "clamp(38px,5.4vw,66px)", lineHeight: 1.03, letterSpacing: "-.035em", fontWeight: 600 }}>Our Products</h1>
              <p style={{ margin: 0, maxWidth: 520, fontSize: "clamp(16px,1.4vw,18.5px)", lineHeight: 1.62, color: "#555654" }}>
                We ship few products and we ship them deep. Each one takes on a whole operating problem — not a feature — and owns the records that problem runs on.
              </p>
            </div>
            <div style={{ flex: "0 1 260px", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="mkt-pulse" style={{ width: 7, height: 7, borderRadius: "50%", background: "#16A34A", animation: "cx-pulse 2.6s ease-in-out infinite" }} />
                <span style={{ fontSize: 14, color: "#555654" }}><strong style={{ fontWeight: 600, color: "#212121" }}>1</strong> live in production</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#C9D0DF" }} />
                <span style={{ fontSize: 14, color: "#555654" }}><strong style={{ fontWeight: 600, color: "#212121" }}>2</strong> in development</span>
              </div>
            </div>
          </div>
        </section>

        {/* Flagship XVS card */}
        <section data-reveal="" style={{ padding: "0 24px clamp(28px,3.5vw,44px)" }}>
          <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", background: "#fff", border: "1px solid #EAECF2", borderRadius: "clamp(20px,2.4vw,26px)", boxShadow: "0 30px 70px rgba(48,58,81,.09),0 2px 8px rgba(48,58,81,.04)", overflow: "hidden" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(26px,3.5vw,52px)", padding: "clamp(24px,4vw,52px) clamp(24px,4vw,52px) 0" }}>
              <div style={{ flex: "1 1 400px", minWidth: 0, display: "flex", flexDirection: "column", gap: 22, paddingBottom: "clamp(28px,4vw,52px)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
                  <span style={{ display: "grid", placeItems: "center", width: 48, height: 48, borderRadius: 14, background: "#303A51", flex: "none" }}>
                    {XVS_LOGO}
                  </span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-.025em" }}>XVS</span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 600, padding: "4px 9px", borderRadius: 999, background: "rgba(22,163,74,.12)", color: "#0F6B32" }}>Live</span>
                    </div>
                    <span style={{ fontSize: 13, color: "#5C5D5C" }}>CodeX Vision System</span>
                  </div>
                </div>

                <h2 style={{ margin: 0, maxWidth: "15ch", fontSize: "clamp(27px,3.1vw,40px)", lineHeight: 1.1, letterSpacing: "-.03em", fontWeight: 600 }}>The complete operating system for schools</h2>
                <p style={{ margin: 0, maxWidth: 430, fontSize: 16, lineHeight: 1.65, color: "#555654" }}>
                  Institutions, branches, staff, students, fees and timetables in one governed platform. Built for school groups that outgrew spreadsheets and never want to reconcile two registers again.
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Multi-branch management", "Attendance", "Data import & reporting"].map((tag) => (
                    <span key={tag} style={{ fontSize: 13, fontWeight: 500, padding: "8px 14px", borderRadius: 999, background: "#F7F7F7", color: "#555654", border: "1px solid #EDEFF4" }}>{tag}</span>
                  ))}
                </div>

                <Link
                  to="/xvs"
                  className="mkt-cta-primary"
                  style={{
                    display: "inline-flex",
                    alignSelf: "flex-start",
                    alignItems: "center",
                    gap: 9,
                    background: "#4A659D",
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: 500,
                    padding: "15px 26px",
                    borderRadius: 12,
                    boxShadow: "0 2px 4px rgba(48,58,81,.14)",
                    transition: "transform 220ms ease, box-shadow 220ms ease, background 220ms ease",
                  }}
                >
                  View XVS
                  {ARROW_RIGHT}
                </Link>
              </div>

              <div data-console-holder="" style={{ flex: "1 1 420px", minWidth: 0, position: "relative", alignSelf: "stretch" }}>
                <div
                  data-xvs-console=""
                  className="mkt-float"
                  style={{
                    animation: "cx-float-c 13s ease-in-out infinite",
                    position: "absolute",
                    left: 0,
                    top: "clamp(0px,2vw,18px)",
                    width: "min(560px,124%)",
                    background: "#fff",
                    border: "1px solid #EAECF2",
                    borderRadius: "16px 0 0 0",
                    boxShadow: "0 30px 70px rgba(48,58,81,.14)",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "12px 16px", background: "#F7F7F7", borderBottom: "1px solid #EDEFF4" }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#DBE0EB" }} />
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#DBE0EB" }} />
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#DBE0EB" }} />
                    <span style={{ marginLeft: 8, fontSize: 11.5, fontWeight: 500, color: "#5C5D5C" }}>XVS · School register</span>
                  </div>
                  <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 13 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(104px,1fr))", gap: 9 }}>
                      {[
                        { label: "Schools", value: 21 },
                        { label: "Branches", value: 46, accent: true },
                        { label: "Students", value: 15800 },
                        { label: "Staff", value: 1180 },
                      ].map((stat) => (
                        <div key={stat.label} style={{ border: "1px solid #F1F2F5", borderRadius: 11, padding: "9px 11px", display: "flex", flexDirection: "column", gap: 3 }}>
                          <span style={{ fontSize: 10, fontWeight: 500, color: "#5C5D5C" }}>{stat.label}</span>
                          <span
                            data-x-count={stat.value}
                            style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-.02em", color: stat.accent ? "#4A659D" : undefined, fontVariantNumeric: "tabular-nums" }}
                          >
                            0
                          </span>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {SCHOOLS.map((s) => {
                        const tone = STATUS_STYLES[s.tone];
                        return (
                          <div key={s.code} data-x-row="" style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 10, background: "#FBFBFC", transition: "background 420ms ease, transform 420ms ease" }}>
                            <span style={{ display: "grid", placeItems: "center", width: 24, height: 24, borderRadius: 8, background: "#F1F2F5", fontSize: 9, fontWeight: 600, color: "#5C5D5C", flex: "none" }}>{s.code}</span>
                            <span style={{ display: "flex", flexDirection: "column", gap: 3, flex: 1, minWidth: 0 }}>
                              <span style={{ fontSize: 12, fontWeight: 500, color: "#212121" }}>{s.name}</span>
                              <span style={{ fontSize: 10.5, color: "#5C5D5C" }}>{s.meta}</span>
                            </span>
                            <span style={{ fontSize: 10, fontWeight: 600, padding: "4px 8px", borderRadius: 999, background: tone.bg, color: tone.color, flex: "none" }}>{s.status}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section id="capabilities" data-reveal="" style={{ padding: "clamp(44px,5.5vw,84px) 24px" }}>
          <div style={{ maxWidth: 1160, margin: "0 auto", display: "flex", flexDirection: "column", gap: "clamp(28px,3.5vw,44px)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 22 }}>
              <div style={{ maxWidth: 560, display: "flex", flexDirection: "column", gap: 12 }}>
                <span style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(74,101,157,.8)" }}>Inside XVS</span>
                <h2 style={{ margin: 0, fontSize: "clamp(26px,3vw,38px)", lineHeight: 1.12, letterSpacing: "-.03em", fontWeight: 600 }}>Eight modules, one register</h2>
              </div>
              <p style={{ margin: 0, maxWidth: 340, fontSize: 15.5, lineHeight: 1.6, color: "#555654" }}>
                Everything below reads and writes the same records, so a change in one place is not a reconciliation job in another.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(238px,1fr))", gap: 14 }}>
              {MODULES.map((mod) => (
                <div key={mod.num} className="prod-mod" style={{ background: "#fff", border: "1px solid #EDEFF4", borderRadius: 14, padding: "18px 18px 20px", display: "flex", flexDirection: "column", gap: 9 }}>
                  <span className="prod-mod-num" style={{ fontSize: 11, fontWeight: 600, color: "#4A659D", fontVariantNumeric: "tabular-nums" }}>{mod.num}</span>
                  <h3 style={{ margin: 0, fontSize: 16.5, fontWeight: 600, letterSpacing: "-.015em" }}>{mod.title}</h3>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "#555654" }}>{mod.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14, padding: "18px 20px", borderRadius: 16, background: "#F7F7F7", border: "1px solid #EDEFF4" }}>
              <span style={{ display: "grid", placeItems: "center", width: 36, height: 36, borderRadius: 11, background: "rgba(74,101,157,.10)", color: "#4A659D", flex: "none" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </span>
              <p style={{ margin: 0, flex: "1 1 320px", minWidth: 0, fontSize: 15, lineHeight: 1.55, color: "#555654" }}>
                Underneath all eight: secure authentication, session control and an audit trail that records every action against the person who took it.
              </p>
              <Link to="/contact" style={{ fontSize: 15, fontWeight: 500, color: "#4A659D" }}>Ask about governance →</Link>
            </div>
          </div>
        </section>

        {/* In development */}
        <section data-reveal="" style={{ padding: "0 24px clamp(56px,6.5vw,96px)" }}>
          <div style={{ maxWidth: 1160, margin: "0 auto", display: "flex", flexDirection: "column", gap: "clamp(22px,2.5vw,32px)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: 16 }}>
              <h2 style={{ margin: 0, fontSize: "clamp(22px,2.4vw,30px)", lineHeight: 1.15, letterSpacing: "-.025em", fontWeight: 600 }}>In development</h2>
              <p style={{ margin: 0, fontSize: 14.5, color: "#5C5D5C" }}>Named when they ship, not before.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16 }}>
              <div style={{ position: "relative", overflow: "hidden", background: "#fff", border: "1px dashed #DDE2EC", borderRadius: 18, padding: "26px 24px 28px", display: "flex", flexDirection: "column", gap: 14 }}>
                <div
                  className="mkt-sweep"
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    width: "40%",
                    background: "linear-gradient(90deg,transparent,rgba(74,101,157,.05),transparent)",
                    animation: "cx-sweep 4.6s cubic-bezier(.45,0,.55,1) infinite",
                    pointerEvents: "none",
                  }}
                />
                <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                  <span style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 12, background: "#F7F7F7", color: "#B8BAB7", flex: "none" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="8" width="18" height="13" rx="2.5" />
                      <path d="M8 8V6a4 4 0 0 1 8 0v2" />
                    </svg>
                  </span>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#5C5D5C" }}>In build</span>
                </div>
                <h3 style={{ margin: 0, fontSize: 19, fontWeight: 600, letterSpacing: "-.02em", color: "#555654" }}>Product two</h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#555654" }}>A second platform for organizations outside education, on the same governance and reporting foundation as XVS.</p>
              </div>
              <div style={{ position: "relative", overflow: "hidden", background: "#fff", border: "1px dashed #DDE2EC", borderRadius: 18, padding: "26px 24px 28px", display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                  <span style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 12, background: "#F7F7F7", color: "#B8BAB7", flex: "none" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="11" cy="11" r="7" />
                      <path d="m20 20-3.5-3.5" />
                    </svg>
                  </span>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#5C5D5C" }}>In research</span>
                </div>
                <h3 style={{ margin: 0, fontSize: 19, fontWeight: 600, letterSpacing: "-.02em", color: "#555654" }}>Product three</h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#555654" }}>Early work, shaped with the institutions already running XVS. If you have a problem you think belongs here, tell us.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section data-reveal="" style={{ padding: "0 24px clamp(72px,8vw,112px)" }}>
          <div style={{ maxWidth: 1160, margin: "0 auto", background: "#303A51", borderRadius: "clamp(20px,2.5vw,28px)", padding: "clamp(28px,5vw,64px)", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "clamp(24px,3.5vw,48px)" }}>
            <div style={{ flex: "1 1 380px", minWidth: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              <h2 style={{ margin: 0, fontSize: "clamp(26px,3.2vw,40px)", lineHeight: 1.1, letterSpacing: "-.03em", fontWeight: 600, color: "#fff" }}>See XVS on your own structure</h2>
              <p style={{ margin: 0, maxWidth: 460, fontSize: 16, lineHeight: 1.62, color: "rgba(255,255,255,.68)" }}>
                Bring your branch list and a sample register. Forty minutes, walked through on real workflows, ending with a straight answer on fit.
              </p>
            </div>
            <Link
              to="/contact"
              className="mkt-cta-light"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                background: "#fff",
                color: "#303A51",
                fontSize: 16,
                fontWeight: 500,
                padding: "15px 26px",
                borderRadius: 12,
                flex: "none",
                transition: "transform 220ms ease, box-shadow 220ms ease",
              }}
            >
              Book a Demo
              {ARROW_RIGHT}
            </Link>
          </div>
        </section>
      </div>

      <MarketingFooter page="products" />
    </div>
  );
}
