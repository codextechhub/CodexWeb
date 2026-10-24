/**
 * ─────────────────────────────────────────────────────────────
 *  CONTACT PAGE CONTENT
 *  All text for /contact lives here. Look for ✏️ for the spots
 *  most likely to change (email address, office, FAQs).
 *  The form logic lives in ./ContactForm.tsx.
 * ─────────────────────────────────────────────────────────────
 */

/* ── 1. HERO ─────────────────────────────────────────────── */
export const HERO = {
  eyebrow: "Contact",
  title: "Tell us about your records challenge.",
  body:
    "Whether you would like a walkthrough of XVS or want to assess whether a platform is the right solution, start here. Every message is read by a member of our team.",
};

/* ── 2. CONTACT DETAILS (cards under the hero) ───────────── */
/** `icon` must be a name from src/components/shared/icons.tsx. */
export const DETAILS = [
  // ✏️ Your public email address (used for the mailto: link too)
  { icon: "mail", label: "Email", value: "info@codexng.com", href: "mailto:info@codexng.com" },
  // ✏️ Office / city
  { icon: "pin", label: "Where we are", value: "Lagos, Nigeria", note: "Working with institutions anywhere" },
  { icon: "clock", label: "Response time", value: "Within one business day" },
];

/* ── 3. FORM ─────────────────────────────────────────────── */
/**
 * The "What is this about?" choices. `value` is what gets emailed to you
 * as the enquiry reason — keep it short. `prompt` is the placeholder
 * shown in the message box when that option is selected.
 */
export const REASONS = [
  { value: "Demo", label: "Book a demo", hint: "See XVS on your own workflows", icon: "calendar", prompt: "What you use today, and what isn't working" },
  { value: "Question", label: "General question", hint: "Anything about CodeX or XVS", icon: "chat", prompt: "What would you like to know?" },
  { value: "Partnership", label: "Partnership", hint: "Resellers, integrators, investors", icon: "handshake", prompt: "What you have in mind, and who you are" },
] as const;

export type Reason = (typeof REASONS)[number]["value"];

export const FORM = {
  title: "Send us a message",
  messageLimit: 600,
  submitLabel: "Send message",
  privacyNote: "We use these details only to reply to you.",
  success: {
    title: "Message sent",
    body: "Thank you for contacting us. We will reply within one business day. Please check your inbox, including your spam folder.",
    again: "Send another message",
  },
};

/* ── 4. WHAT HAPPENS NEXT (steps beside the form) ────────── */
export const NEXT_STEPS = {
  title: "What happens next",
  steps: [
    { title: "We read it", body: "A member of our team reads your message personally." },
    { title: "We reply within a day", body: "With answers, or proposed times for a call." },
    { title: "A 40-minute walkthrough", body: "XVS shown against your own structure, ending with a clear assessment of fit." },
  ],
};

/* ── 5. FAQ ──────────────────────────────────────────────── */
// ✏️ Add, remove or reword questions freely.
export const FAQ = {
  title: "Frequently asked questions",
  items: [
    {
      q: "How long does a demo take?",
      a: "About forty minutes. We walk through XVS using real workflows, ideally your own branch list and a sample register, and conclude with a clear assessment of fit.",
    },
    {
      q: "Can you move our existing records across?",
      a: "Yes. Your existing records go in first, validated row by row, so any issues in your existing data are identified before anything goes live.",
    },
    {
      q: "Is XVS only for large school groups?",
      a: "No. XVS runs a single campus just as well as a group of twenty. Branches, roles and approvals are modelled to match how you're actually structured.",
    },
    {
      q: "Do you work with organizations outside Lagos?",
      a: "Yes. We're based in Lagos and work with institutions anywhere.",
    },
    {
      q: "What happens after we go live?",
      a: "We stay. What we ship stays maintained, documented and versioned, and support replies within one business day.",
    },
  ],
};
