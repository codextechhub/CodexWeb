import { Link } from "react-router-dom";
import { XVS_URL } from "../xvsLink";
import "./marketing.css";

interface MarketingFooterProps {
  page: "products" | "contact" | "about";
}

const FOOTER_CONFIG = {
  products: { muted: "#5C5D5C", aboutHref: "/about", contactHref: "/contact", showAllProducts: false },
  contact: { muted: "#8F918F", aboutHref: "/about", contactHref: "#top", showAllProducts: true },
  about: { muted: "#8F918F", aboutHref: "#top", contactHref: "/contact", showAllProducts: true },
} as const;

const LOGO = (
  <svg width="32" height="27" viewBox="0 0 30 25" fill="none" aria-hidden="true" style={{ color: "#4A659D" }}>
    <path
      d="M13.9493 14.0612C17.6443 8.2554 19.9781 5.27429 24.9001 0.372653C22.2283 -0.771525 20.3744 0.615508 16.5566 5.97844L11.8634 13.4094L6.77909 11.845C4.19062 11.2553 2.74787 10.8566 0 11.4539C4.25594 12.6334 6.59352 13.4114 10.5597 15.3649C7.42046 19.5739 5.37817 21.5893 1.04294 24.2298C3.51963 24.9652 4.89632 24.7958 7.30056 22.9261C9.57745 20.8802 10.8378 19.256 12.9063 16.5382C17.1978 19.0111 19.6243 20.6002 23.8572 22.4047C26.5897 22.9516 27.7376 22.8718 29.0719 21.4921C23.2733 19.015 19.927 17.3396 13.9493 14.0612Z"
      fill="currentColor"
    />
    <path
      d="M22.5535 10.1503C19.5947 11.5749 17.9464 12.4495 14.9922 14.322L16.8174 15.3649C21.2796 12.4323 23.8297 11.0245 28.42 8.71626C26.3014 8.75601 25.015 9.05585 22.5535 10.1503Z"
      fill="currentColor"
    />
  </svg>
);

const label = (color: string): React.CSSProperties => ({
  margin: 0,
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color,
});

export default function MarketingFooter({ page }: MarketingFooterProps) {
  const { muted, aboutHref, contactHref, showAllProducts } = FOOTER_CONFIG[page];

  return (
    <footer style={{ background: "#fff", borderTop: "1px solid #EDEFF4", padding: "clamp(48px,6vw,72px) 24px 32px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", display: "flex", flexDirection: "column", gap: 44 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(32px,5vw,72px)" }}>
          <div style={{ flex: "1 1 300px", minWidth: 0, display: "flex", flexDirection: "column", gap: 14 }}>
            <Link to="/" style={{ display: "flex", alignItems: "center", gap: 11, alignSelf: "flex-start" }}>
              {LOGO}
            </Link>
            <p style={{ margin: 0, maxWidth: 300, fontSize: 15, lineHeight: 1.6, color: "#555654" }}>
              Data platforms and organizational systems for institutions that need their records to agree.
            </p>
          </div>

          <div style={{ flex: "0 1 160px", minWidth: 140, display: "flex", flexDirection: "column", gap: 13 }}>
            <p style={label(muted)}>Company</p>
            <Link to={aboutHref} className="mkt-link" style={{ fontSize: 15, color: "#555654" }}>About</Link>
            <Link to={contactHref} className="mkt-link" style={{ fontSize: 15, color: "#555654" }}>Contact</Link>
          </div>

          <div style={{ flex: "0 1 160px", minWidth: 140, display: "flex", flexDirection: "column", gap: 13 }}>
            <p style={label(muted)}>Products</p>
            {showAllProducts && (
              <Link to="/products" className="mkt-link" style={{ fontSize: 15, color: "#555654" }}>All products</Link>
            )}
            {/* XVS lives on its own domain — link goes there, not to an internal route */}
            <a href={XVS_URL} target="_blank" rel="noopener noreferrer" className="mkt-link" style={{ fontSize: 15, color: "#555654" }}>XVS</a>
          </div>

          <div style={{ flex: "0 1 160px", minWidth: 140, display: "flex", flexDirection: "column", gap: 13 }}>
            <p style={label(muted)}>Legal</p>
            <a href="#top" className="mkt-link" style={{ fontSize: 15, color: "#555654" }}>Privacy</a>
            <a href="#top" className="mkt-link" style={{ fontSize: 15, color: "#555654" }}>Terms</a>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between", alignItems: "center", paddingTop: 24, borderTop: "1px solid #F1F2F5" }}>
          <p style={{ margin: 0, fontSize: 13.5, color: muted }}>© 2026 CodeX Technologies</p>
          <p style={{ margin: 0, fontSize: 13.5, color: muted }}>Lagos, Nigeria</p>
        </div>
      </div>
    </footer>
  );
}
