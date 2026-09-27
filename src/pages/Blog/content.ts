/**
 * ─────────────────────────────────────────────────────────────
 *  BLOG CONTENT
 *  Every post on /blog lives in POSTS below. Each post gets its
 *  own page at /blog/<slug>.
 *
 *  ✏️ To add a post: copy one of the objects in POSTS, give it a
 *     new unique `slug`, and put it at the top (newest first).
 *  ✏️ To remove a post: delete its object.
 *  ✏️ `featured: true` puts a post in the big card at the top of
 *     /blog. If none is featured, the newest post is used.
 *
 *  These are starter posts written from the site's own message —
 *  review the wording and dates before publishing.
 * ─────────────────────────────────────────────────────────────
 */

/** The filter chips on /blog, in order. "All" is added automatically. */
export const CATEGORIES = ["Perspective", "Governance", "Operations", "Data platforms", "Product", "Engineering"] as const;
export type Category = (typeof CATEGORIES)[number];

/**
 * A post's cover: a screenshot from /public/images, or a drawn cover
 * (the blue grid with one of the icons from src/components/shared/ui.tsx:
 * "database", "org", "flow" or "chart").
 */
export type Cover =
  | { kind: "image"; src: string; alt: string }
  | { kind: "pattern"; icon: "database" | "org" | "flow" | "chart"; tone: "blue" | "night" | "soft" };

/** The body of a post, one block at a time. */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  /** ISO date, YYYY-MM-DD */
  date: string;
  readMinutes: number;
  author: string;
  cover: Cover;
  featured?: boolean;
  body: Block[];
}

/* ── Page text ───────────────────────────────────────────── */
export const BLOG_HERO = {
  eyebrow: "The CodeX blog",
  title: "Notes on data,",
  titleAccent: "systems and trust.",
  body:
    "How organizations keep their records in agreement — lessons from the platforms we build, the teams we build them with, and the problems we keep seeing.",
};

export const BLOG_CTA = {
  title: "Have a data problem you'd like us to write about?",
  body: "Tell us what's slowing your organization down. The best questions become posts — and conversations.",
  label: "Contact CodeX",
  href: "/contact#form",
};

/* ── Posts (newest first) ────────────────────────────────── */
export const POSTS: Post[] = [
  {
    slug: "system-problem-not-data-problem",
    title: "Most organizations don't have a data problem. They have a system problem.",
    excerpt:
      "The data is usually there. It's just spread across spreadsheets, paper and group chats that were never designed to agree with each other.",
    category: "Perspective",
    date: "2026-09-18",
    readMinutes: 6,
    author: "CodeX Team",
    cover: { kind: "pattern", icon: "database", tone: "blue" },
    featured: true,
    body: [
      { type: "p", text: "When an organization tells us it has a data problem, we usually find something else. The data exists — sales are recorded, stock is counted, payments are logged. The trouble is where it lives: one spreadsheet for finance, another for operations, a notebook at the branch, and a group chat where the real decisions happen." },
      { type: "p", text: "None of those places were designed to agree with one another. So every month-end starts with a reconciliation, every report comes with a caveat, and every question about who approved what ends with someone scrolling through messages." },
      { type: "h2", text: "More data doesn't fix it" },
      { type: "p", text: "The instinct is to add a dashboard or a reporting tool on top. But a dashboard over disagreeing records only shows the disagreement faster. The fix sits one layer down: a single system of record that every team writes to, with rules about who may change what." },
      { type: "quote", text: "A dashboard over disagreeing records only shows the disagreement faster." },
      { type: "h2", text: "What a system of record changes" },
      { type: "list", items: [
        "Each fact is entered once, by the person responsible for it, and everyone else reads the same value.",
        "Permissions reflect how the organization is actually structured — branches, roles and reporting lines.",
        "Every change carries a name and a timestamp, so questions have answers instead of arguments.",
      ] },
      { type: "p", text: "That is the work CodeX does. We don't sell tools that sit beside your spreadsheets; we replace the spreadsheets with a system everyone in the organization can trust." },
    ],
  },
  {
    slug: "audit-trail-for-every-figure",
    title: "Every figure you hand a board should come with an audit trail",
    excerpt:
      "If a number can't tell you who changed it and when, it's an opinion. Here's how we design reporting that answers back.",
    category: "Governance",
    date: "2026-09-04",
    readMinutes: 5,
    author: "CodeX Team",
    cover: { kind: "image", src: "/images/xvs/audit-trail.jpg", alt: "An audit trail listing who changed which record and when" },
    body: [
      { type: "p", text: "Boards, investors and regulators ask the same question in different words: how do you know this number is right? For most organizations the honest answer is \"because someone checked it\" — which holds only as long as that person is in the room." },
      { type: "h2", text: "Numbers need a history" },
      { type: "p", text: "A figure is only as trustworthy as the changes behind it. When every edit to a financial record is stored — who made it, when, and to which record — a report stops being a snapshot and becomes something you can trace back to its source." },
      { type: "list", items: [
        "Record changes immutably, instead of overwriting the old value.",
        "Tie every change to a named user, never to a shared login.",
        "Let reviewers move from a total on a report to the entries that make it up.",
      ] },
      { type: "quote", text: "If a number can't tell you who changed it and when, it's an opinion." },
      { type: "p", text: "We build this into every platform from the first release, because adding governance later means asking people to trust history that was never recorded." },
    ],
  },
  {
    slug: "approvals-by-voice-note",
    title: "Approvals by voice note: the hidden cost of informal sign-off",
    excerpt:
      "Spending approved in a chat feels fast — until months later, when nobody can prove who said yes.",
    category: "Operations",
    date: "2026-08-21",
    readMinutes: 4,
    author: "CodeX Team",
    cover: { kind: "image", src: "/images/xvs/approval-inbox.jpg", alt: "An approval inbox with requests waiting for a decision" },
    body: [
      { type: "p", text: "In many organizations the approval process is a message: a photo of an invoice, a voice note saying \"go ahead\", a thumbs-up in a group chat. It's quick, and it works — right up until someone needs to know what was approved, by whom, and against which budget." },
      { type: "h2", text: "Where it breaks" },
      { type: "list", items: [
        "The approver leaves, and their phone takes the history with them.",
        "Two people approve the same request in two different chats.",
        "An auditor asks for evidence, and the team spends a week scrolling.",
      ] },
      { type: "h2", text: "Fast and recorded aren't opposites" },
      { type: "p", text: "A good approval flow is as quick as a message. Requests route to the right person based on amount and department, the decision is one tap, and the reason is stored with the record. Nothing moves without a recorded yes — and nobody has to chase anyone to get one." },
    ],
  },
  {
    slug: "one-source-of-truth-across-branches",
    title: "One source of truth across branches: what it actually takes",
    excerpt:
      "A second branch shouldn't double the spreadsheets. The structure, permissions and reporting you need to grow without losing the picture.",
    category: "Data platforms",
    date: "2026-08-07",
    readMinutes: 7,
    author: "CodeX Team",
    cover: { kind: "pattern", icon: "org", tone: "night" },
    body: [
      { type: "p", text: "Growth is where informal systems fail first. One location can run on a well-kept spreadsheet. Two locations run on two spreadsheets and a monthly phone call. By the fifth, nobody can say with confidence what the whole organization looks like today." },
      { type: "h2", text: "Model the organization, not the files" },
      { type: "p", text: "The first step is describing the organization as it really is: the head office, each branch, the teams inside them, and who reports to whom. Data then belongs to a place in that structure instead of to whoever saved the file last." },
      { type: "h2", text: "Permissions follow the structure" },
      { type: "p", text: "A branch head sees their branch. Finance sees every branch's ledger but can't edit operations records. Leadership sees the whole group. When permissions follow the structure, adding a branch is configuration — not a new set of files." },
      { type: "quote", text: "Adding a branch should be configuration, not a new set of files." },
      { type: "h2", text: "Reporting rolls up by itself" },
      { type: "p", text: "Once every branch writes to the same record, group-level reporting is a view rather than a project. The number leadership sees on Monday is the sum of what each branch entered — not a figure someone assembled by hand on Sunday night." },
    ],
  },
  {
    slug: "why-xvs-started-with-schools",
    title: "Introducing XVS — and why our first product is for schools",
    excerpt:
      "Schools run on records: people, fees, timetables and approvals across branches. That made them the right place to start.",
    category: "Product",
    date: "2026-07-24",
    readMinutes: 5,
    author: "CodeX Team",
    cover: { kind: "image", src: "/images/xvs/school-dashboard.jpg", alt: "The XVS school dashboard" },
    body: [
      { type: "p", text: "XVS is CodeX's flagship product: one governed platform for institutions, branches, people, fees, timetables and records — from a single campus to a group of twenty." },
      { type: "h2", text: "Why schools first" },
      { type: "p", text: "Schools concentrate every problem we care about. Admissions, finance, timetabling, procurement and parent communication all touch the same records, often across several branches, and every one of them has an approval step that matters." },
      { type: "list", items: [
        "Records that must agree across registrar, bursar and branch head.",
        "Money that has to be accounted for, down to each receipt.",
        "Leadership that needs the whole group at a glance.",
      ] },
      { type: "h2", text: "What it means for everyone else" },
      { type: "p", text: "The foundations under XVS — the system of record, permissions, approvals and the audit trail — are the same foundations every organization needs. Schools are our first product, not our only market." },
    ],
  },
  {
    slug: "leaving-spreadsheets-without-stopping",
    title: "Leaving spreadsheets behind without stopping the business",
    excerpt:
      "Migration is where most system changes stall. How we import, validate and cut over while the organization keeps running.",
    category: "Engineering",
    date: "2026-07-10",
    readMinutes: 6,
    author: "CodeX Team",
    cover: { kind: "pattern", icon: "flow", tone: "soft" },
    body: [
      { type: "p", text: "The spreadsheets an organization wants to leave are also the ones it depends on every day. A migration plan that asks everyone to stop working for a week is a plan that doesn't happen." },
      { type: "h2", text: "Import, then validate" },
      { type: "p", text: "We start by importing existing data as it is, then running it through validation that flags duplicates, gaps and contradictions. The people who own each record resolve those flags — the system shows them exactly what's missing instead of guessing." },
      { type: "h2", text: "Run in parallel, then cut over" },
      { type: "list", items: [
        "Bring one team or branch across first, while the rest continue as before.",
        "Compare the new system's figures with the old ones until they match.",
        "Cut over once the numbers agree — and keep the old files read-only for reference.",
      ] },
      { type: "quote", text: "Cut over once the numbers agree, not on a date picked in advance." },
      { type: "p", text: "Pipelines for import and export stay in place afterwards, so data can move at volume without anyone reconciling it by hand at either end." },
    ],
  },
];

/* ── Helpers ─────────────────────────────────────────────── */
export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
