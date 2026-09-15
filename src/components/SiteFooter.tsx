import { Link } from "react-router-dom";

export default function SiteFooter() {
  return (
    <footer
      style={{
        background: "#fff",
        borderTop: "1px solid #edeff4",
        padding: "40px 24px 32px",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
        <p style={{ margin: 0, fontSize: 13.5, color: "#5C5D5C" }}>
          © 2026 CodeX Technologies
        </p>
        <Link to="/" style={{ fontSize: 13.5, color: "#5C5D5C" }}>
          Back to home
        </Link>
      </div>
    </footer>
  );
}
