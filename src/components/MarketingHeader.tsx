import { useState } from "react";
import { Link } from "react-router-dom";
import { useScrolled } from "../hooks/useScrolled";
import "./marketing.css";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

interface MarketingHeaderProps {
  /** Path of the page this header is rendered on, so its own nav link reads as active. */
  active: "/" | "/products" | "/about" | "/contact";
  /** Where the "Book a Demo" pill goes. Defaults to the contact page. */
  demoHref?: string;
  onDemoClick?: () => void;
}

/**
 * Full-fidelity header shared by the Products and Contact pages: sticky,
 * blurs in a background once the page scrolls, and collapses into a slide
 * panel under 760px.
 */
export default function MarketingHeader({
  active,
  demoHref = "/contact",
  onDemoClick,
}: MarketingHeaderProps) {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(24);

  const closePanel = () => setOpen(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 60,
        transition:
          "background 320ms ease, backdrop-filter 320ms ease, border-color 320ms ease, box-shadow 320ms ease",
        background: scrolled ? "rgba(251,251,252,.78)" : "rgba(251,251,252,0)",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: `1px solid ${scrolled ? "#EDEFF4" : "rgba(33,33,33,0)"}`,
        boxShadow: scrolled ? "0 1px 3px rgba(48,58,81,.05)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "16px 24px",
        }}
      >
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 11, flex: "none" }}>
          <svg
            width="36"
            height="30"
            viewBox="0 0 30 25"
            fill="none"
            aria-hidden="true"
            style={{ display: "block", color: "#4A659D" }}
          >
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

        <button
          type="button"
          className="mkt-nav-toggle"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          style={{
            marginLeft: "auto",
            alignItems: "center",
            justifyContent: "center",
            width: 44,
            height: 44,
            border: "1px solid #E3E6ED",
            borderRadius: 11,
            background: "#fff",
            color: "#212121",
            cursor: "pointer",
            flex: "none",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>

        <nav className="mkt-nav-links" style={{ marginLeft: "auto", alignItems: "center", gap: 30 }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="mkt-link"
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: active === link.to ? "#212121" : "#555654",
              }}
            >
              {link.label}
            </Link>
          ))}
          {onDemoClick ? (
            <a
              href={demoHref}
              className="mkt-cta-pill"
              onClick={(e) => {
                e.preventDefault();
                onDemoClick();
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#4A659D",
                color: "#fff",
                fontSize: 15,
                fontWeight: 500,
                padding: "11px 20px",
                borderRadius: 10,
                boxShadow: "0 1px 2px rgba(48,58,81,.16)",
                transition: "transform 200ms ease, box-shadow 200ms ease, background 200ms ease",
              }}
            >
              Book a Demo
            </a>
          ) : (
            <Link
              to={demoHref}
              className="mkt-cta-pill"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#4A659D",
                color: "#fff",
                fontSize: 15,
                fontWeight: 500,
                padding: "11px 20px",
                borderRadius: 10,
                boxShadow: "0 1px 2px rgba(48,58,81,.16)",
                transition: "transform 200ms ease, box-shadow 200ms ease, background 200ms ease",
              }}
            >
              Book a Demo
            </Link>
          )}
        </nav>

        <div
          className={`mkt-nav-panel${open ? " is-open" : ""}`}
          style={{
            width: "100%",
            flexDirection: "column",
            gap: 2,
            paddingTop: 10,
            borderTop: "1px solid #EDEFF4",
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={closePanel}
              style={{
                padding: "13px 4px",
                fontSize: 16,
                fontWeight: 500,
                color: active === link.to ? "#212121" : "#555654",
              }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={demoHref}
            onClick={(e) => {
              closePanel();
              if (onDemoClick) {
                e.preventDefault();
                onDemoClick();
              }
            }}
            style={{
              marginTop: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 50,
              background: "#4A659D",
              color: "#fff",
              fontSize: 16,
              fontWeight: 500,
              borderRadius: 11,
            }}
          >
            Book a Demo
          </a>
        </div>
      </div>
    </header>
  );
}
