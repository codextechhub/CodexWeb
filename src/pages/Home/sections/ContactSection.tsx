import { useState, type FormEvent } from "react";
import { EMAIL_ERROR, sendEnquiry } from "../../../lib/emailjs";
import { DEMO } from "../content";
import { ArrowIcon, Reveal } from "../../../components/shared/ui";

type Field = "name" | "organization" | "email" | "phone" | "message";
type Values = Record<Field, string>;

const EMPTY: Values = { name: "", organization: "", email: "", phone: "", message: "" };

/** Returns an error message, or "" when the value is fine. */
const RULES: Partial<Record<Field, (v: string) => string>> = {
  name: (v) => (v.trim().length > 1 ? "" : "Enter your full name"),
  organization: (v) => (v.trim().length > 1 ? "" : "Which organization is this for?"),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim()) ? "" : "Enter a valid work email"),
  phone: (v) => (!v.trim() || v.replace(/\D/g, "").length >= 7 ? "" : "Check the phone number"),
};

const FIELDS: { name: Field; label: string; type?: string; placeholder: string; autoComplete?: string; wide?: boolean }[] = [
  { name: "name", label: "Full name", placeholder: "Adaeze Okafor", autoComplete: "name" },
  { name: "organization", label: "Organization", placeholder: "Bright Star Schools", autoComplete: "organization" },
  { name: "email", label: "Work email", type: "email", placeholder: "you@school.org", autoComplete: "email" },
  { name: "phone", label: "Phone (optional)", type: "tel", placeholder: "+234 …", autoComplete: "tel" },
];

type Status = { kind: "idle" | "sending" | "sent" | "error"; message: string };

/** Closing chapter — the demo request form (sends through EmailJS). */
export default function DemoForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle", message: "" });

  const errorFor = (field: Field) => (touched[field] ? RULES[field]?.(values[field]) ?? "" : "");

  const update = (field: Field, value: string) => setValues((v) => ({ ...v, [field]: value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status.kind === "sending") return;

    setTouched({ name: true, organization: true, email: true, phone: true });
    const invalid = (Object.keys(RULES) as Field[]).some((f) => RULES[f]!(values[f]));
    if (invalid) return;

    setStatus({ kind: "sending", message: "Sending your request…" });
    try {
      await sendEnquiry({ ...values, reason: "Demo", form_name: "Homepage demo form" });
      setValues(EMPTY);
      setTouched({});
      setStatus({ kind: "sent", message: DEMO.successMessage });
    } catch (err) {
      console.error("[home demo form] send failed", err);
      setStatus({ kind: "error", message: EMAIL_ERROR });
    }
  };

  return (
    <section className="section demo" id="demo">
      <div className="container demo-layout">
        <Reveal className="demo-copy">
          <p className="eyebrow is-light">
            <span className="eyebrow-line" />
            {DEMO.label}
          </p>
          <h2>{DEMO.title}</h2>
          <p className="demo-body">{DEMO.body}</p>
          <ul className="demo-bullets">
            {DEMO.bullets.map((b) => (
              <li key={b}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
                {b}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120} className="demo-card">
          <form onSubmit={onSubmit} noValidate aria-busy={status.kind === "sending"}>
            <div className="form-grid">
              {FIELDS.map((f) => {
                const error = errorFor(f.name);
                return (
                  <label key={f.name} className="field">
                    <span>{f.label}</span>
                    <input
                      name={f.name}
                      type={f.type ?? "text"}
                      placeholder={f.placeholder}
                      autoComplete={f.autoComplete}
                      value={values[f.name]}
                      aria-invalid={!!error}
                      className={error ? "has-error" : ""}
                      onChange={(e) => update(f.name, e.target.value)}
                      onBlur={() => values[f.name].trim() && setTouched((t) => ({ ...t, [f.name]: true }))}
                    />
                    {error && <em className="field-error">{error}</em>}
                  </label>
                );
              })}
              <label className="field field-wide">
                <span>What should we know? (optional)</span>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Number of branches, the systems you use today, what's not working…"
                  value={values.message}
                  onChange={(e) => update("message", e.target.value)}
                />
              </label>
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={status.kind === "sending"}>
              {status.kind === "sending" ? "Sending…" : DEMO.submitLabel}
              <ArrowIcon />
            </button>

            {status.message && (
              <p className={`form-note is-${status.kind}`} role={status.kind === "error" ? "alert" : "status"}>
                {status.message}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
