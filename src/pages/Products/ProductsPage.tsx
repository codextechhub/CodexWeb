import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

export default function ProductsPage() {
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
            Products
          </span>
          <h1
            style={{
              margin: "20px 0 12px",
              fontSize: "clamp(32px, 4vw, 48px)",
              letterSpacing: "-0.03em",
              fontWeight: 600,
            }}
          >
            Our product line-up
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: "#555654" }}>
            This page is coming soon. Our flagship product, XVS — CodeX
            Vision System, is the complete operating system for schools.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
