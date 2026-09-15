import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

export default function ContactPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100svh" }}>
      <SiteHeader />
      <main style={{ flex: "1 1 auto", padding: "80px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <span
            style={{
              display: "inline-flex",
              padding: "7px 15px",
              borderRadius: 999,
              background: "#fff",
              border: "1px solid #e8eaf0",
              fontSize: 13,
              fontWeight: 500,
              color: "#4A659D",
            }}
          >
            Contact
          </span>
          <h1
            style={{
              margin: "20px 0 12px",
              fontSize: "clamp(32px, 4vw, 48px)",
              letterSpacing: "-0.03em",
              fontWeight: 600,
            }}
          >
            Let's talk
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: "#555654" }}>
            This page is coming soon. In the meantime, use the demo request
            form on the{" "}
            <a href="/#demo" style={{ color: "#4A659D" }}>
              home page
            </a>{" "}
            to get in touch.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
