import { Link } from "react-router-dom";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

/**
 * Simple header for the site's non-home pages. It echoes the home page's
 * mark and palette but isn't a copy of the artifact's animated nav — only
 * the home page is reproduced exactly from the design.
 */
export default function SiteHeader() {
  return (
    <header
      style={{
        borderBottom: "1px solid #edeff4",
        background: "#fbfbfc",
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
        <Link
          to="/"
          style={{ display: "flex", alignItems: "center", gap: 11 }}
        >
          <svg
            width="32"
            height="27"
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
        <nav
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 30,
            flexWrap: "wrap",
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{ fontSize: 15, fontWeight: 500, color: "#555654" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
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
            }}
          >
            Book a Demo
          </Link>
        </nav>
      </div>
    </header>
  );
}
