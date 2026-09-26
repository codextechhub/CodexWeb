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
  title: "Tell us what your records are doing to you.",
  body:
    "Whether you want a walkthrough of XVS or you're weighing up whether a platform is the answer at all, start here. We read every message ourselves.",
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
    body: "Thanks for reaching out — we reply within one business day. Keep an eye on your inbox (and spam folder, just in case).",
    again: "Send another message",
  },
};

/* ── 4. WHAT HAPPENS NEXT (steps beside the form) ────────── */
export const NEXT_STEPS = {
  title: "What happens next",
  steps: [
    { title: "We read it", body: "A real person on the team reads your message — no bots, no sales script." },
    { title: "We reply within a day", body: "With answers, or a few times that suit you for a call." },
    { title: "A 40-minute walkthrough", body: "XVS on your own structure, ending with a straight answer on fit." },
  ],
};

/* ── 5. FAQ ──────────────────────────────────────────────── */
// ✏️ Add, remove or reword questions freely.
export const FAQ = {
  title: "Questions we hear a lot",
  items: [
    {
      q: "How long does a demo take?",
      a: "About forty minutes. We walk through XVS on real workflows — ideally your own branch list and a sample register — and end with a straight answer on whether it's a fit.",
    },
    {
      q: "Can you move our existing records across?",
      a: "Yes. Your existing records go in first, validated row by row, so you can see what's wrong with the data you already have before anything goes live.",
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
