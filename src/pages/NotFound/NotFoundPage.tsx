import { Link } from "react-router-dom";
import "../../components/marketing.css";
import "./notFound.css";

const LINKS = [
  { to: "/products", title: "Products", desc: "The CodeX portfolio" },
  { to: "/xvs", title: "XVS", desc: "School management platform" },
  { to: "/about", title: "About", desc: "How we work" },
];

export default function NotFoundPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", overflow: "clip", background: "#FBFBFC", color: "#212121" }}>
      <header style={{ flex: "none", borderBottom: "1px solid #EDEFF4", background: "#fff" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", gap: 16 }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 11, flex: "none" }}>
            <svg width="36" height="30" viewBox="0 0 30 25" fill="none" aria-hidden="true" style={{ display: "block", color: "#4A659D" }}>
              <path
                d="M13.9493 14.0612C17.6443 8.2554 19.9781 5.27429 24.9001 0.372653C22.2283 -0.771525 20.3744 0.615508 16.5566 5.97844L11.8634 13.4094L6.77909 11.845C4.19062 11.2553 2.74787 10.8566 0 11.4539C4.25594 12.6334 6.59352 13.4114 10.5597 15.3649C7.42046 19.5739 5.37817 21.5893 1.04294 24.2298C3.51963 24.9652 4.89632 24.7958 7.30056 22.9261C9.57745 20.8802 10.8378 19.256 12.9063 16.5382C17.1978 19.0111 19.6243 20.6002 23.8572 22.4047C26.5897 22.9516 27.7376 22.8718 29.0719 21.4921C23.2733 19.015 19.927 17.3396 13.9493 14.0612Z"
                fill="currentColor"
              />
              <path
                d="M22.5535 10.1503C19.5947 11.5749 17.9464 12.4495 14.9922 14.322L16.8174 15.3649C21.2796 12.4323 23.8297 11.0245 28.42 8.71626C26.3014 8.75601 25.015 9.05585 22.5535 10.1503Z"
                fill="currentColor"
              />
            </svg>
          </Link>
          <Link to="/contact" className="mkt-link" style={{ marginLeft: "auto", fontSize: 15, fontWeight: 500, color: "#555654" }}>
            Contact
          </Link>
        </div>
      </header>

      <main style={{ position: "relative", flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(48px,7vw,96px) 24px" }}>
        <div
          className="nf-drift"
          style={{
            position: "absolute",
            top: -140,
            left: "50%",
            width: 560,
            height: 560,
            marginLeft: -280,
            borderRadius: "50%",
            background: "radial-gradient(circle,rgba(74,101,157,.09),transparent 68%)",
            filter: "blur(12px)",
            pointerEvents: "none",
            animation: "cx-drift 20s ease-in-out infinite",
          }}
        />

        <div style={{ position: "relative", maxWidth: 660, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 16px", borderRadius: 999, background: "#fff", border: "1px solid #E8EAF0", boxShadow: "0 1px 2px rgba(48,58,81,.04)" }}>
            <span className="nf-blip" style={{ width: 7, height: 7, borderRadius: "50%", background: "#E33131", animation: "cx-blip 2.4s ease-in-out infinite" }} />
            <span style={{ fontSize: 13, fontWeight: 500, color: "#555654", fontVariantNumeric: "tabular-nums" }}>404 · record not found</span>
          </div>

          <h1 style={{ margin: 0, fontSize: "clamp(38px,6vw,72px)", lineHeight: 1.02, letterSpacing: "-.04em", fontWeight: 600 }}>This page is not in the register</h1>

          <p style={{ margin: 0, maxWidth: 480, fontSize: "clamp(16px,1.5vw,18.5px)", lineHeight: 1.62, color: "#555654" }}>
            The link may be out of date, or the page may have moved. Nothing has been lost — try one of these instead.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 2 }}>
            <Link
              to="/"
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
                boxShadow: "0 2px 4px rgba(48,58,81,.14)",
                transition: "transform 220ms ease, box-shadow 220ms ease, background 220ms ease",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H6" />
                <path d="m12 19-7-7 7-7" />
              </svg>
              Back to home
            </Link>
            <Link
              to="/contact"
              className="nf-secondary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "#fff",
                color: "#212121",
                fontSize: 16,
                fontWeight: 500,
                padding: "15px 26px",
                borderRadius: 12,
                border: "1px solid #E3E6ED",
                transition: "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease",
              }}
            >
              Report a broken link
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12, width: "100%", marginTop: "clamp(16px,3vw,32px)" }}>
            {LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="nf-link-card"
                style={{ display: "flex", flexDirection: "column", gap: 5, textAlign: "left", background: "#fff", border: "1px solid #EDEFF4", borderRadius: 14, padding: "16px 18px" }}
              >
                <span style={{ fontSize: 15, fontWeight: 600, color: "#212121", letterSpacing: "-.015em" }}>{link.title}</span>
                <span style={{ fontSize: 13.5, lineHeight: 1.5, color: "#8F918F" }}>{link.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <footer style={{ flex: "none", background: "#fff", borderTop: "1px solid #EDEFF4", padding: 24 }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ margin: 0, fontSize: 13.5, color: "#8F918F" }}>© 2026 CodeX Technologies</p>
          <p style={{ margin: 0, fontSize: 13.5, color: "#8F918F" }}>Lagos, Nigeria</p>
        </div>
      </footer>
    </div>
  );
}
