/**
 * ─────────────────────────────────────────────────────────────
 *  ABOUT PAGE CONTENT
 *  All text, numbers and images for /about live here.
 *  Look for ✏️ — those are the spots most likely to need your input.
 *  The components in ./sections only handle layout and animation.
 * ─────────────────────────────────────────────────────────────
 */

/** Screenshots are reused from the home page (/public/images/xvs). */
const IMG = {
  schoolDashboard: "/images/xvs/school-dashboard.jpg",
  financeDashboard: "/images/xvs/finance-dashboard.jpg",
  studentProfile: "/images/xvs/student-profile.jpg",
  classTimetable: "/images/xvs/class-timetable.jpg",
  approvalInbox: "/images/xvs/approval-inbox.jpg",
  auditTrail: "/images/xvs/audit-trail.jpg",
};

/* ── 1. HERO ─────────────────────────────────────────────── */
export const HERO = {
  eyebrow: "About CodeX",
  title: "We build the systems",
  titleAccent: "organizations run on.",
  body:
    "CodeX is a software company working on one problem: institutions whose records live in too many places to trust. We build the platforms that hold those records, and the systems that govern who may touch them.",
  /** Three screenshots fanned out on the right. First one sits on top. */
  images: [
    { src: IMG.schoolDashboard, alt: "XVS school dashboard" },
    { src: IMG.financeDashboard, alt: "XVS finance dashboard" },
    { src: IMG.auditTrail, alt: "XVS audit trail" },
  ],
  /** ✏️ Quick facts under the hero. Add e.g. { label: "Founded", value: "2024" }. */
  facts: [
    { label: "Headquarters", value: "Lagos, Nigeria" },
    { label: "Flagship", value: "XVS for schools" },
    { label: "Focus", value: "Data & org systems" },
    { label: "Working with", value: "Institutions anywhere" },
  ],
};

/* ── 2. MISSION & VISION ─────────────────────────────────── */
export const MISSION = {
  // ✏️ Your mission and vision statements.
  mission: {
    label: "Our mission",
    text: "Give every institution one record it can trust — permissioned, auditable, and built around how the work actually happens.",
  },
  vision: {
    label: "Our vision",
    text: "Institutions that run on systems, not spreadsheets — where any figure can be traced back to the record it came from.",
  },
};

/* ── 3. OUR STORY (timeline) ─────────────────────────────── */
export const STORY = {
  chapter: "01",
  label: "Our story",
  title: "How we got here",
  intro: "Nobody sets out to run an organization on scattered spreadsheets. It accumulates. This is the problem we kept finding, and what we decided to do about it.",
  /**
   * ✏️ Each step of the story. `year` is optional — add real dates
   * (e.g. year: "2023") and they will appear as a badge on the step.
   */
  steps: [
    {
      year: "",
      title: "The problem we kept finding",
      body: "An organization grows, and its records grow with it — into a finance spreadsheet, a shared drive, a register in a drawer, and three tools that were never designed to agree.",
    },
    {
      year: "",
      title: "The cost shows up later",
      body: "A figure that can't be reconciled before a board meeting. A permission nobody can explain. A term of data that took two weeks to assemble by hand. That is not a reporting problem — it's a system problem.",
    },
    {
      year: "",
      title: "Few products, built deep",
      body: "So we chose to build few products and build them deep. Each one takes on a whole operating problem rather than a feature of it, and owns the records that problem runs on.",
    },
    {
      year: "",
      title: "XVS ships",
      body: "XVS, our school operating system, is the first: admissions, people, timetables, fees, procurement and audit in one governed platform, from a single campus to a group of twenty.",
    },
    {
      year: "",
      title: "What comes next",
      body: "The same approach, applied to the next institution that is carrying a records problem it has stopped expecting anyone to fix.",
    },
  ],
};

/* ── 4. MANIFESTO QUOTE ──────────────────────────────────── */
export const QUOTE = {
  // ✏️ Swap `by` for a founder's name and role if you'd like it attributed.
  text: "Most organizations don't have a data problem. They have a system problem — and that's the one we work on.",
  by: "The CodeX team",
};

/* ── 5. HOW WE ENGAGE ────────────────────────────────────── */
export const ENGAGE = {
  chapter: "02",
  label: "How we engage",
  title: "Four things we do on every engagement",
  steps: [
    { title: "Start with the operator", body: "We sit with the registrar, the bursar, the branch head. The exceptions they handle every day are what software usually gets wrong — and where we start." },
    { title: "Model the structure honestly", body: "Branches, roles and approvals go into the model as they actually are, not flattened to fit a schema that was convenient to build." },
    { title: "Migrate before you commit", body: "Your existing records go in first, validated row by row, so you see what's wrong with the data you already have before anything goes live." },
    { title: "Stay after launch", body: "What we ship stays maintained, documented and versioned. Nothing goes live that we couldn't support in three years." },
  ],
};

/* ── 6. VALUES (dark section) ────────────────────────────── */
export const VALUES = {
  chapter: "03",
  label: "What we hold to",
  title: "Governance is not a feature we added",
  intro: "It's the foundation everything else sits on. Three rules shape every product we ship.",
  /** `icon` must be one of: shield, clock, source (see sections/Values.tsx). */
  items: [
    { icon: "shield", title: "Permissioned to the action", body: "Access is granted by what someone may do, not by the title on their contract. Every check is enforced server-side." },
    { icon: "clock", title: "Answerable after the fact", body: "Who changed what, when, and under whose authority — recorded for every action, and exportable when someone asks." },
    { icon: "source", title: "One number, one source", body: "A figure on a report traces back to the record it came from. No parallel version assembled for the meeting." },
  ],
} as const;

/* ── 7. TEAM ─────────────────────────────────────────────── */
export const TEAM = {
  chapter: "04",
  label: "The team",
  title: "The people behind the platform",
  intro: "A small team based in Lagos, organised around the work — not around departments.",
  /**
   * ✏️ FOUNDERS / LEADERSHIP — empty for now, so the block is hidden.
   * Add people and it appears automatically above the team cards:
   *   { name: "Jane Doe", role: "Co-founder & CEO", photo: "/images/team/jane.jpg", linkedin: "https://linkedin.com/in/..." }
   * `photo` and `linkedin` are optional; without a photo, initials are shown.
   * Put photos in /public/images/team/.
   */
  people: [] as { name: string; role: string; photo?: string; linkedin?: string }[],
  /** The functional teams. `icon` must be one of: code, design, rocket, support. */
  groups: [
    { icon: "code", title: "Engineering", body: "Builds and runs the platform — data model, permissions, integrations and everything that keeps records consistent." },
    { icon: "design", title: "Product & design", body: "Spends time in schools and offices, turning how the work really happens into screens people don't need training for." },
    { icon: "rocket", title: "Implementation", body: "Moves your existing records in, sets up your structure, and gets every branch live." },
    { icon: "support", title: "Support", body: "Answers within one business day and stays with you long after launch." },
  ],
} as const;

/* ── 8. INSIDE THE WORK (screenshot strip) ───────────────── */
export const GALLERY = {
  title: "Inside the work",
  body: "A look at what we've built so far. Every screen writes to the same record.",
  images: [
    { src: IMG.schoolDashboard, caption: "School dashboard" },
    { src: IMG.studentProfile, caption: "Student profile" },
    { src: IMG.financeDashboard, caption: "Finance overview" },
    { src: IMG.classTimetable, caption: "Class timetables" },
    { src: IMG.approvalInbox, caption: "Approvals" },
    { src: IMG.auditTrail, caption: "Audit trail" },
  ],
};

/* ── 9. CLOSING CALL TO ACTION ───────────────────────────── */
export const CTA = {
  title: "Based in Lagos, working with institutions anywhere",
  body: "If you're carrying a records problem you've stopped expecting anyone to fix, we'd like to hear about it.",
  primary: { label: "Get in touch", to: "/contact#form" }, // "#form" = land on the form
  secondary: { label: "See XVS" }, // links to XVS_URL (src/xvsLink.ts)
};
