import { useState, type FormEvent } from "react";
import { EMAIL_ERROR, sendEnquiry } from "../../lib/emailjs";
import { Icon } from "../../components/shared/icons";
import { ArrowIcon } from "../../components/shared/ui";
import { FORM, REASONS, type Reason } from "./content";

/* ── Fields & validation ───────────────────────────────────── */

interface Fields {
  name: string;
  organization: string;
  email: string;
  phone: string;
  scale: string;
  message: string;
}

const EMPTY: Fields = { name: "", organization: "", email: "", phone: "", scale: "", message: "" };

/** ✏️ Validation rules. Return an error message, or nothing when valid. */
function validate(f: Fields): Partial<Record<keyof Fields, string>> {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (f.name.trim().length <= 1) errors.name = "Enter your full name";
  if (f.organization.trim().length <= 1) errors.organization = "Which organization is this for?";
  if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(f.email.trim())) errors.email = "Enter a valid work email";
  if (f.phone.trim() && f.phone.replace(/\D/g, "").length < 7) errors.phone = "Check the phone number";
  return errors;
}

/** ✏️ The text inputs, in display order (two per row on wider screens). */
const INPUTS: { name: keyof Fields; label: string; type: string; placeholder: string; autoComplete: string }[] = [
  { name: "name", label: "Full name", type: "text", placeholder: "Adaeze Okonkwo", autoComplete: "name" },
  { name: "organization", label: "Organization", type: "text", placeholder: "School, group or company", autoComplete: "organization" },
  { name: "email", label: "Work email", type: "email", placeholder: "you@organization.com", autoComplete: "email" },
  { name: "phone", label: "Phone (optional)", type: "tel", placeholder: "+234 …", autoComplete: "tel" },
];

/* ── Component ─────────────────────────────────────────────── */

export default function ContactForm() {
  const [reason, setReason] = useState<Reason>("Demo");
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState("");

  const errors = validate(fields);
  const errorFor = (name: keyof Fields) => (submitAttempted || touched[name] ? errors[name] : undefined);
  const activeReason = REASONS.find((r) => r.value === reason)!;

  const set = (name: keyof Fields, value: string) => setFields((f) => ({ ...f, [name]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSubmitAttempted(true);
    if (Object.keys(errors).length > 0) return;

    setSending(true);
    setSendError("");
    try {
      await sendEnquiry({ ...fields, reason, form_name: "Contact form" });
      setFields(EMPTY);
      setTouched({});
      setSubmitAttempted(false);
      setSent(true);
    } catch (err) {
      console.error("[contact form] send failed", err);
      setSendError(EMAIL_ERROR);
    } finally {
      setSending(false);
    }
  };

  /* Success state — replaces the form after a message is sent */
  if (sent) {
    return (
      <div className="contact-success" role="status">
        <span className="contact-success-icon">
          <Icon name="check" size={30} strokeWidth={2.2} />
        </span>
        <h2>{FORM.success.title}</h2>
        <p>{FORM.success.body}</p>
        <button type="button" className="btn btn-ghost" onClick={() => setSent(false)}>
          {FORM.success.again}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-busy={sending} className="contact-form">
      <h2 className="contact-form-title">{FORM.title}</h2>

      {/* What is this about? — works like radio buttons */}
      <fieldset className="reason-group">
        <legend>What is this about?</legend>
        <div className="reason-options" role="radiogroup">
          {REASONS.map((r) => (
            <button
              key={r.value}
              type="button"
              role="radio"
              aria-checked={reason === r.value}
              className={`reason-option ${reason === r.value ? "is-active" : ""}`}
              onClick={() => setReason(r.value)}
            >
              <span className="reason-icon">
                <Icon name={r.icon} size={20} />
              </span>
              <span className="reason-text">
                <strong>{r.label}</strong>
                <small>{r.hint}</small>
              </span>
            </button>
          ))}
        </div>
      </fieldset>

      <div className="contact-fields">
        {INPUTS.map((input) => {
          const error = errorFor(input.name);
          const valid = !error && touched[input.name] && fields[input.name].trim();
          return (
            <div key={input.name} className="contact-field">
              <label htmlFor={`ct-${input.name}`}>{input.label}</label>
              <input
                id={`ct-${input.name}`}
                name={input.name}
                type={input.type}
                placeholder={input.placeholder}
                autoComplete={input.autoComplete}
                value={fields[input.name]}
                aria-invalid={!!error}
                className={error ? "has-error" : valid ? "is-valid" : ""}
                onChange={(e) => set(input.name, e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, [input.name]: true }))}
              />
              {error && <p className="contact-error">{error}</p>}
            </div>
          );
        })}

        {/* Only asked when booking a demo */}
        {reason === "Demo" && (
          <div className="contact-field is-wide">
            <label htmlFor="ct-scale">How big is the operation? (optional)</label>
            <input
              id="ct-scale"
              name="scale"
              type="text"
              placeholder="e.g. 3 campuses, 1,400 students"
              value={fields.scale}
              onChange={(e) => set("scale", e.target.value)}
            />
          </div>
        )}

        <div className="contact-field is-wide">
          <div className="contact-label-row">
            <label htmlFor="ct-message">Message</label>
            <span className={`contact-count ${fields.message.length > FORM.messageLimit * 0.9 ? "is-near" : ""}`}>
              {fields.message.length} / {FORM.messageLimit}
            </span>
          </div>
          <textarea
            id="ct-message"
            name="message"
            rows={5}
            maxLength={FORM.messageLimit}
            placeholder={activeReason.prompt}
            value={fields.message}
            onChange={(e) => set("message", e.target.value)}
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary btn-block contact-submit" disabled={sending}>
        {sending ? "Sending…" : FORM.submitLabel}
        {!sending && <ArrowIcon />}
      </button>

      {sendError ? (
        <p className="contact-error is-center" role="alert">
          {sendError}
        </p>
      ) : (
        <p className="contact-privacy">{FORM.privacyNote}</p>
      )}
    </form>
  );
}
