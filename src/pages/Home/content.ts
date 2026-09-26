/**
 * ─────────────────────────────────────────────────────────────
 *  HOME PAGE CONTENT
 *  Every word, number and image on the home page lives here.
 *  Edit this file to change copy — the section components in
 *  ./sections only handle layout and animation.
 * ─────────────────────────────────────────────────────────────
 */

/** Screenshots live in /public/images/xvs. Paths are site-relative. */
export const IMAGES = {
  schoolDashboard: "/images/xvs/school-dashboard.jpg",
  financeDashboard: "/images/xvs/finance-dashboard.jpg",
  studentProfile: "/images/xvs/student-profile.jpg",
  classTimetable: "/images/xvs/class-timetable.jpg",
  approvalInbox: "/images/xvs/approval-inbox.jpg",
  auditTrail: "/images/xvs/audit-trail.jpg",
};

/* ── 1. HERO ─────────────────────────────────────────────── */
export const HERO = {
  eyebrow: "CodeX Technologies · Lagos, Nigeria",
  titleLines: ["Institutions run on records.", "We make them agree."],
  body:
    "CodeX builds the data platforms and organizational systems that schools and institutions run on: one source of truth, permissioned end to end, and designed around how the work actually happens.",
  primaryCta: { label: "Book a demo", href: "#demo" },
  secondaryCta: { label: "Meet XVS", href: "#xvs" },
  image: IMAGES.schoolDashboard,
  imageAlt: "XVS school dashboard showing term progress, students on roll and pending approvals",
  /** Small floating cards around the hero screenshot. */
  chips: [
    { label: "Term progress", value: "45% taught" },
    { label: "Approvals", value: "7 awaiting you" },
    { label: "Audit trail", value: "Every change recorded" },
  ],
};

/** The scrolling band under the hero: who XVS is built for. */
export const AUDIENCE = [
  "Proprietors",
  "Principals",
  "Bursars",
  "Registrars",
  "Branch heads",
  "Teachers",
  "Procurement officers",
  "Auditors",
  "Parents",
];

/* ── 2. THE PROBLEM (chapter 01) ─────────────────────────── */
export const PROBLEM = {
  chapter: "01",
  label: "The problem",
  /** Words light up one by one as the visitor scrolls. */
  statement:
    "Most organizations do not have a data problem. They have a system problem: fees in one spreadsheet, attendance on paper, approvals lost in a group chat, and nobody who can say who changed what, or when.",
  pains: [
    {
      title: "Records that disagree",
      body: "The bursar's number and the registrar's number never match, so every report starts with a reconciliation.",
    },
    {
      title: "Approvals in the chat",
      body: "Spending is approved by voice note. Months later, no one can prove who said yes.",
    },
    {
      title: "Growth that breaks things",
      body: "A second branch doubles the spreadsheets, not the insight. A fifth branch makes them unmanageable.",
    },
  ],
};

/* ── 3. WHAT WE BUILD (chapter 02) ───────────────────────── */
export const DISCIPLINES = {
  chapter: "02",
  label: "What we build",
  title: "Four disciplines, one system of record",
  intro:
    "We don't sell tools that sit beside your spreadsheets. We replace the spreadsheets with a system that everyone in the organization can trust.",
  items: [
    {
      icon: "database",
      title: "Data platforms",
      body: "One record, one source of truth. Systems that hold an organization's core data and keep it consistent across every branch and team.",
    },
    {
      icon: "org",
      title: "Organizational systems",
      body: "Roles, permissions, approvals and reporting lines modelled the way your organization is actually structured.",
    },
    {
      icon: "flow",
      title: "Automation & integration",
      body: "Import, validation and export pipelines that move data at volume, without manual reconciliation at either end.",
    },
    {
      icon: "chart",
      title: "Analytics & reporting",
      body: "Reporting built on live data, with an audit trail attached to every figure you hand to a board or a regulator.",
    },
  ],
} as const;

/* ── 4. XVS SHOWCASE (chapter 03) ────────────────────────── */
export const XVS = {
  chapter: "03",
  label: "Flagship product",
  title: "XVS — the operating system for schools",
  intro:
    "Institutions, branches, people, fees, timetables and records in one governed platform, from a single campus to a group of twenty.",
  cta: "Explore XVS",
  /** Tabs cycle automatically; each one shows its screenshot. */
  tabs: [
    {
      id: "run",
      tab: "Run the school",
      title: "Every branch, at a glance",
      body: "Students on roll, staff, classes and the work waiting for a decision — the morning briefing a proprietor actually needs.",
      image: IMAGES.schoolDashboard,
      alt: "XVS school dashboard",
    },
    {
      id: "people",
      tab: "Know every student",
      title: "One complete profile per learner",
      body: "Admission, class history, guardians, medical notes and documents — with XVS telling you exactly what is still missing.",
      image: IMAGES.studentProfile,
      alt: "XVS student profile",
    },
    {
      id: "money",
      tab: "Collect fees",
      title: "Money you can account for",
      body: "Invoices, receipts, receivables and a full general ledger. Cash position and AR ageing update the moment a payment lands.",
      image: IMAGES.financeDashboard,
      alt: "XVS finance dashboard",
    },
    {
      id: "week",
      tab: "Plan the week",
      title: "Timetables without the clashes",
      body: "Build each class's week against bell schedules, rooms and teacher loads, then publish it to everyone at once.",
      image: IMAGES.classTimetable,
      alt: "XVS class timetable",
    },
    {
      id: "approve",
      tab: "Approve spending",
      title: "Every naira, signed off",
      body: "Requisitions, expense claims and refunds route to the right approver. Nothing moves without a recorded yes.",
      image: IMAGES.approvalInbox,
      alt: "XVS approval inbox",
    },
    {
      id: "audit",
      tab: "Prove it",
      title: "An audit trail that answers back",
      body: "Every finance mutation is recorded immutably — who did it, when, and to which record. Ready for the board or the regulator.",
      image: IMAGES.auditTrail,
      alt: "XVS finance audit trail",
    },
  ],
};

/* ── 5. A DAY ON XVS (chapter 04) ────────────────────────── */
export const DAY = {
  chapter: "04",
  label: "A day on XVS",
  title: "What one source of truth feels like",
  intro: "Follow a single school day. Every step writes to the same record, so nobody re-types anything.",
  moments: [
    { time: "07:45", who: "Registrar", what: "Enrols two new students. Their class, guardians and fees are set in one step." },
    { time: "08:30", who: "Class teachers", what: "Attendance is marked across every branch before first period ends." },
    { time: "11:00", who: "Bursar", what: "Parent payments reconcile against invoices automatically. Receipts go out by email." },
    { time: "14:15", who: "Branch head", what: "Approves a science-lab requisition. The decision and its reason are logged." },
    { time: "17:00", who: "Proprietor", what: "Opens one dashboard and sees the whole group — fees, people and pending decisions." },
  ],
};

/* ── 6. HOW WE WORK (chapter 05) ─────────────────────────── */
export const PRINCIPLES = {
  chapter: "05",
  label: "How we work",
  title: "Three commitments we hold to",
  items: [
    {
      title: "Built to last",
      body: "What we ship stays maintained, documented and versioned. Nothing goes live that we couldn't support in three years.",
    },
    {
      title: "Governance and auditability",
      body: "Access is permissioned down to the action, and every change is recorded. You can always answer who changed what, and under whose authority.",
    },
    {
      title: "Designed for real operations",
      body: "We build alongside the registrar, the bursar and the branch head, because the exceptions they handle daily are what software usually gets wrong.",
    },
  ],
};

/* ── 7. NUMBERS ──────────────────────────────────────────── */
/** Facts about the XVS platform. `value` counts up when scrolled into view. */
export const STATS = [
  { value: 24, suffix: "", label: "integrated modules" },
  { value: 6, suffix: "", label: "operating areas, from admissions to audit" },
  { value: 1, suffix: "", label: "source of truth for every branch" },
  { value: 100, suffix: "%", label: "of finance changes on the audit trail" },
];

/* ── 8. DEMO / CONTACT ───────────────────────────────────── */
export const DEMO = {
  label: "Let's talk",
  title: "Tell us how your records sit today.",
  body:
    "A demo runs about forty minutes, walks through XVS on real workflows, and ends with a straight answer on fit.",
  bullets: [
    "A walkthrough on your own structure",
    "Migration and data-import questions answered",
    "No obligation, no sales script",
  ],
  submitLabel: "Request a demo",
  successMessage: "Request sent. Thanks — we reply within one business day.",
};
