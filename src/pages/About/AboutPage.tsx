import { Link } from "react-router-dom";
import MarketingHeader from "../../components/MarketingHeader";
import MarketingFooter from "../../components/MarketingFooter";
import { useReveal } from "../../hooks/useReveal";
import "../../components/marketing.css";

const WHAT_WE_BUILD = [
  {
    label: "Data platforms",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v5c0 1.657 3.582 3 8 3s8-1.343 8-3V5" />
        <path d="M4 10v5c0 1.657 3.582 3 8 3s8-1.343 8-3v-5" />
      </svg>
    ),
  },
  {
    label: "Organizational systems",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-3.9 3.6-7 8-7s8 3.1 8 7" />
      </svg>
    ),
  },
  {
    label: "Automation & integration",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v5c0 1.657 3.582 3 8 3s8-1.343 8-3V5" />
        <path d="M12 16v5M9.5 18.5 12 21l2.5-2.5" />
      </svg>
    ),
  },
  {
    label: "Analytics & reporting",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 3v18h18" />
        <path d="m7 15 4-5 3 3 5-7" />
      </svg>
    ),
  },
];

const ENGAGEMENT_STEPS = [
  { num: "01", accent: true, title: "Start with the operator", desc: "We sit with the registrar, the bursar, the branch head. The exceptions they handle every day are what software usually gets wrong, and they are where we start." },
  { num: "02", accent: false, title: "Model the structure honestly", desc: "Branches, roles and approvals go into the model as they actually are, not flattened to fit a schema that was convenient to build." },
  { num: "03", accent: false, title: "Migrate before you commit", desc: "Your existing records go in first, validated row by row, so you see what is wrong with the data you already have before anything goes live." },
  { num: "04", accent: false, title: "Stay after launch", desc: "What we ship stays maintained, documented and versioned. Nothing goes live that we would not be able to support in three years." },
];

const GOVERNANCE_ITEMS = [
  {
    title: "Permissioned to the action",
    desc: "Access is granted by what someone may do, not by the title on their contract. Every check is enforced server-side.",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Answerable after the fact",
    desc: "Who changed what, when, and under whose authority — recorded for every action, and exportable when someone asks.",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 8v4l3 2" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    title: "One number, one source",
    desc: "A figure on a report traces back to the record it came from. No parallel version assembled for the meeting.",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 20V8M10 20V4M16 20v-8M22 20h-20" />
      </svg>
    ),
  },
];

const ARROW_RIGHT = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h13" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export default function AboutPage() {
  const problemRef = useReveal<HTMLElement>(0.06);
  const engageRef = useReveal<HTMLElement>(0.06);
  const governanceRef = useReveal<HTMLElement>(0.06);
  const ctaRef = useReveal<HTMLElement>(0.06);

  return (
    <div style={{ background: "#FBFBFC", color: "#212121", overflow: "clip" }} id="top">
      <MarketingHeader active="/about" demoHref="/contact" />

      {/* Hero */}
      <section style={{ position: "relative", padding: "clamp(44px,6vw,88px) 24px clamp(36px,4.5vw,60px)" }}>
        <div
          className="mkt-drift"
          style={{
            position: "absolute",
            top: -200,
            left: "6%",
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle,rgba(74,101,157,.09),transparent 68%)",
            filter: "blur(12px)",
            pointerEvents: "none",
            animation: "cx-drift 18s ease-in-out infinite",
          }}
        />
        <div style={{ position: "relative", maxWidth: 1160, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 28 }}>
          <div style={{ flex: "1 1 520px", minWidth: 0, display: "flex", flexDirection: "column", gap: 18 }}>
            <span style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(74,101,157,.8)" }}>About</span>
            <h1 style={{ margin: 0, maxWidth: "19ch", fontSize: "clamp(36px,5vw,62px)", lineHeight: 1.04, letterSpacing: "-.035em", fontWeight: 600 }}>
              We build the systems organizations run on
            </h1>
          </div>
          <p style={{ margin: 0, flex: "0 1 380px", fontSize: "clamp(16px,1.4vw,18.5px)", lineHeight: 1.62, color: "#555654" }}>
            CodeX is a software company working on one problem: institutions whose records live in too many places to trust. We build the platforms that hold those records and the systems that govern who may touch them.
          </p>
        </div>
      </section>

      {/* The problem */}
      <section ref={problemRef} style={{ padding: "0 24px clamp(56px,7vw,96px)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "clamp(28px,4vw,64px)" }}>
          <div style={{ flex: "1 1 420px", minWidth: 0, display: "flex", flexDirection: "column", gap: 20 }}>
            <h2 style={{ margin: 0, fontSize: "clamp(24px,2.8vw,34px)", lineHeight: 1.14, letterSpacing: "-.03em", fontWeight: 600 }}>The problem we kept finding</h2>
            <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.68, color: "#555654" }}>
              An organization grows, and its records grow with it — into a finance spreadsheet, a shared drive, a register in a drawer, and three tools that were never designed to agree. Nobody set out to build it that way. It accumulates.
            </p>
            <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.68, color: "#555654" }}>
              The cost shows up later: a figure that cannot be reconciled before a board meeting, a permission nobody can explain, a term of data that took two weeks to assemble by hand. That is not a reporting problem. It is a system problem, and it is the one we work on.
            </p>
            <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.68, color: "#555654" }}>
              So we build few products and build them deep. Each one takes on a whole operating problem rather than a feature of it, and owns the records that problem runs on. XVS, our school management platform, is the first.
            </p>
          </div>
          <div style={{ flex: "1 1 320px", minWidth: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ background: "#fff", border: "1px solid #EDEFF4", borderRadius: 16, padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#8F918F" }}>What we build</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {WHAT_WE_BUILD.map((item, i) => (
                  <div
                    key={item.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 11,
                      paddingBottom: i < WHAT_WE_BUILD.length - 1 ? 11 : 0,
                      borderBottom: i < WHAT_WE_BUILD.length - 1 ? "1px solid #F7F7F7" : "none",
                    }}
                  >
                    <span style={{ display: "grid", placeItems: "center", width: 32, height: 32, borderRadius: 10, background: "rgba(74,101,157,.09)", color: "#4A659D", flex: "none" }}>
                      {item.icon}
                    </span>
                    <span style={{ fontSize: 14.5, fontWeight: 500, color: "#212121" }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "#303A51", borderRadius: 16, padding: 20, display: "flex", flexDirection: "column", gap: 9 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="mkt-pulse" style={{ width: 7, height: 7, borderRadius: "50%", background: "#7FE3AE", animation: "cx-pulse 2.6s ease-in-out infinite" }} />
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.55)" }}>Shipping now</span>
              </div>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,.78)" }}>XVS — the complete operating system for schools.</p>
              <Link to="/xvs" className="mkt-link" style={{ fontSize: 14.5, fontWeight: 500, color: "#DBE0EB" }}>See the platform →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* How we engage */}
      <section ref={engageRef} style={{ background: "#F7F7F7", padding: "clamp(56px,7vw,100px) 24px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "flex", flexDirection: "column", gap: "clamp(30px,4vw,48px)" }}>
          <div style={{ maxWidth: 620, display: "flex", flexDirection: "column", gap: 13 }}>
            <span style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(74,101,157,.8)" }}>How we engage</span>
            <h2 style={{ margin: 0, fontSize: "clamp(26px,3vw,40px)", lineHeight: 1.12, letterSpacing: "-.03em", fontWeight: 600 }}>Four things we do on every engagement</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(248px,1fr))", gap: "clamp(18px,3vw,32px)" }}>
            {ENGAGEMENT_STEPS.map((step) => (
              <div key={step.num} style={{ display: "flex", flexDirection: "column", gap: 11, paddingTop: 20, borderTop: `2px solid ${step.accent ? "#4A659D" : "#DBE0EB"}` }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#4A659D", fontVariantNumeric: "tabular-nums" }}>{step.num}</span>
                <h3 style={{ margin: 0, fontSize: 19, fontWeight: 600, letterSpacing: "-.02em" }}>{step.title}</h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.62, color: "#555654" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance */}
      <section ref={governanceRef} style={{ padding: "clamp(56px,7vw,100px) 24px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "clamp(28px,4vw,56px)" }}>
          <div style={{ flex: "1 1 340px", minWidth: 0, display: "flex", flexDirection: "column", gap: 13 }}>
            <span style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(74,101,157,.8)" }}>What we hold to</span>
            <h2 style={{ margin: 0, maxWidth: "16ch", fontSize: "clamp(26px,3vw,40px)", lineHeight: 1.12, letterSpacing: "-.03em", fontWeight: 600 }}>Governance is not a feature we added</h2>
          </div>
          <div style={{ flex: "1 1 420px", minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>
            {GOVERNANCE_ITEMS.map((item) => (
              <div key={item.title} style={{ display: "flex", gap: 14, background: "#fff", border: "1px solid #EDEFF4", borderRadius: 16, padding: 20 }}>
                <span style={{ display: "grid", placeItems: "center", width: 38, height: 38, borderRadius: 12, background: "rgba(74,101,157,.09)", color: "#4A659D", flex: "none" }}>
                  {item.icon}
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
                  <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600, letterSpacing: "-.02em" }}>{item.title}</h3>
                  <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "#555654" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section ref={ctaRef} style={{ padding: "0 24px clamp(72px,8vw,112px)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", background: "#DBE0EB", borderRadius: "clamp(20px,2.5vw,28px)", padding: "clamp(26px,4.5vw,60px)", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "clamp(24px,3.5vw,48px)" }}>
          <div style={{ flex: "1 1 380px", minWidth: 0, display: "flex", flexDirection: "column", gap: 14 }}>
            <h2 style={{ margin: 0, maxWidth: "18ch", fontSize: "clamp(26px,3.2vw,40px)", lineHeight: 1.1, letterSpacing: "-.03em", fontWeight: 600 }}>
              Based in Lagos, working with institutions anywhere
            </h2>
            <p style={{ margin: 0, maxWidth: 440, fontSize: 16, lineHeight: 1.62, color: "#3E4657" }}>
              If you are carrying a records problem you have stopped expecting anyone to fix, we would like to hear about it.
            </p>
          </div>
          <Link
            to="/contact"
            className="mkt-cta-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              background: "#4A659D",
              color: "#fff",
              fontSize: 16,
              fontWeight: 500,
              padding: "15px 26px",
              borderRadius: 12,
              flex: "none",
              boxShadow: "0 2px 4px rgba(48,58,81,.14)",
              transition: "transform 220ms ease, box-shadow 220ms ease, background 220ms ease",
            }}
          >
            Get in touch
            {ARROW_RIGHT}
          </Link>
        </div>
      </section>

      <MarketingFooter page="about" />
    </div>
  );
}
