import { useState } from "react";
import { Link } from "react-router-dom";
import { useScrolled } from "../hooks/useScrolled";
import { XVS_CONTACT_URL } from "../xvsLink";
import "./marketing.css";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

const DEMO_LABEL = "Book a demo with XVS";

interface MarketingHeaderProps {
  /** Path of the page this header is rendered on, so its own nav link reads as active. */
  active?: "/" | "/products" | "/about" | "/blog" | "/contact";
}

/**
 * Site header modelled on wrkhq.com: a floating bar with the mark on the
 * left, links centred and the CTA on the right. It overlays the top of the
 * page so each hero's grid background runs up behind it; at the top the bar
 * is see-through, and once the page scrolls it turns solid white. Collapses
 * into a panel inside the bar under 860px.
 */
export default function MarketingHeader({ active }: MarketingHeaderProps) {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(24);

  const closePanel = () => setOpen(false);

  return (
    <header className="mkt-header">
      <div className={`mkt-header-bar${scrolled ? " is-scrolled" : ""}`}>
        <Link to="/" className="mkt-header-logo" aria-label="Home" onClick={closePanel}>
          <svg
            width="34"
            height="28"
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

        <nav className="mkt-nav-links" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`mkt-header-link${active === link.to ? " is-active" : ""}`}
              aria-current={active === link.to ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mkt-header-actions">
          <a
            href={XVS_CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mkt-header-cta mkt-nav-desktop"
          >
            {DEMO_LABEL}
          </a>

          <button
            type="button"
            className="mkt-nav-toggle"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>

        <div className={`mkt-nav-panel${open ? " is-open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={closePanel}
              className={`mkt-header-link${active === link.to ? " is-active" : ""}`}
              aria-current={active === link.to ? "page" : undefined}
              style={{ padding: "12px 14px", fontSize: 16 }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={XVS_CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closePanel}
            className="mkt-header-cta"
            style={{ marginTop: 8, justifyContent: "center", minHeight: 48, fontSize: 16 }}
          >
            {DEMO_LABEL}
          </a>
        </div>
      </div>
    </header>
  );
}
