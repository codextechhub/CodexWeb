/**
 * ─────────────────────────────────────────────────────────────
 *  PRODUCTS PAGE CONTENT
 *  All text, tags and images for /products live here.
 *  Look for ✏️ — those are the spots most likely to change.
 *  The components in ./sections only handle layout and animation.
 * ─────────────────────────────────────────────────────────────
 */

/** Screenshots live in /public/images/xvs. */
const IMG = {
  schoolDashboard: "/images/xvs/school-dashboard.jpg",
  financeDashboard: "/images/xvs/finance-dashboard.jpg",
  procurement: "/images/xvs/procurement.jpg",
  parentPay: "/images/xvs/parent-pay.jpg",
  auditTrail: "/images/xvs/audit-trail.jpg",
  classTimetable: "/images/xvs/class-timetable.jpg",
  notifications: "/images/xvs/notifications.jpg",
};

/* ── 1. HERO ─────────────────────────────────────────────── */
export const HERO = {
  eyebrow: "Our products",
  title: "Few products.",
  titleAccent: "Built deep.",
  body:
    "Each CodeX product takes on a whole operating problem — not a feature of it — and owns the records that problem runs on.",
  // ✏️ Update these counts as products ship.
  status: [
    { label: "live in production", count: 1, live: true },
    { label: "in development", count: 2, live: false },
  ],
};

/* ── 2. FLAGSHIP (XVS) ───────────────────────────────────── */
export const FLAGSHIP = {
  name: "XVS",
  fullName: "CodeX Vision System",
  badge: "Live",
  title: "The complete operating system for schools",
  body:
    "Institutions, branches, staff, students, fees, procurement and timetables in one governed platform. Built for schools that outgrew spreadsheets and never want to reconcile two registers again.",
  tags: ["Multi-branch", "Finance & fees", "Procurement", "Approvals", "Audit trail"],
  primaryCta: "Visit XVS", // opens XVS_URL (src/xvsLink.ts) in a new tab
  secondaryCta: { label: "Book a demo", to: "/contact#form" },
  /** Main screenshot + the smaller card that floats over its corner. */
  image: { src: IMG.schoolDashboard, alt: "XVS school dashboard" },
  floatImage: { src: IMG.parentPay, alt: "XVS parent payment page" },
  // ✏️ Three quick facts along the bottom of the card.
  facts: [
    { value: "24", label: "integrated modules" },
    { value: "1 → 20", label: "campuses, one platform" },
    { value: "100%", label: "of finance changes audited" },
  ],
};

/* ── 3. INSIDE XVS (bento grid) ──────────────────────────── */
/**
 * One card per operating area. The first card is shown large.
 * `icon` must be a name from src/components/shared/icons.tsx.
 * ✏️ `modules` are the chips on each card — add or rename freely.
 */
export const AREAS = {
  label: "Inside XVS",
  title: "Everything a school runs on",
  intro: "Every module reads and writes the same records, so a change in one place is never a reconciliation job in another.",
  items: [
    {
      icon: "school",
      title: "Run the school",
      body: "Branches, students, staff, classes and the timetable — the day-to-day structure of every campus.",
      modules: ["Schools & branches", "Students", "Staff", "Organogram", "Academic structure", "Timetable & calendar"],
      image: IMG.schoolDashboard,
    },
    {
      icon: "wallet",
      title: "Money",
      body: "Billing, collections and a full general ledger, reconciled as payments land.",
      modules: ["Billing & invoicing", "Payments", "Accounting", "Concessions & refunds"],
      image: IMG.financeDashboard,
    },
    {
      icon: "cart",
      title: "Buying & stock",
      body: "From requisition to purchase order to goods received — with stock tracked throughout.",
      modules: ["Vendors", "Requisitions", "Purchase orders", "Inventory"],
      image: IMG.procurement,
    },
    {
      icon: "users",
      title: "Families",
      body: "Parents pay invoices from their inbox and hear about what matters, when it matters.",
      modules: ["Parent portal", "Notifications"],
      image: IMG.notifications,
    },
    {
      icon: "shield",
      title: "Oversight & control",
      body: "Dashboards, approvals, permissions and an audit trail on every change.",
      modules: ["Analytics", "Reports & exports", "Approvals", "Roles & permissions", "Audit log"],
      image: IMG.auditTrail,
    },
  ],
};

/* ── 4. FOUNDATION (governance strip) ────────────────────── */
export const FOUNDATION = {
  title: "Underneath every module",
  items: [
    { icon: "lock", title: "Secure sign-in", body: "Authentication and session control for every user." },
    { icon: "shield", title: "Permissioned to the action", body: "Access by what someone may do, not their job title." },
    { icon: "check", title: "Approvals on record", body: "Spending and changes routed to the right person." },
    { icon: "clock", title: "Full audit trail", body: "Who did what, when, and under whose authority." },
  ],
  link: { label: "Ask about governance", to: "/contact#form" },
};

/* ── 5. ROADMAP ──────────────────────────────────────────── */
export const ROADMAP = {
  label: "What's next",
  title: "In development",
  note: "Named when they ship, not before.",
  // ✏️ Rename these once the products are announced.
  items: [
    {
      stage: "In build",
      title: "Product two",
      body: "A second platform for organizations outside education, on the same governance and reporting foundation as XVS.",
    },
    {
      stage: "In research",
      title: "Product three",
      body: "Early work, shaped with the institutions already running XVS.",
    },
  ],
  invite: {
    title: "Have a problem that belongs here?",
    body: "If your organization is carrying a records problem nobody has solved, tell us about it.",
    cta: { label: "Tell us", to: "/contact#form" },
  },
};

/* ── 6. CLOSING CTA ──────────────────────────────────────── */
export const CTA = {
  title: "See XVS on your own structure",
  body: "Bring your branch list and a sample register. Forty minutes on real workflows, ending with a straight answer on fit.",
  primary: { label: "Book a demo", to: "/contact#form" },
  image: IMG.classTimetable,
};
