import { useRef, useState, type FormEvent } from "react";
import MarketingHeader from "../../components/MarketingHeader";
import MarketingFooter from "../../components/MarketingFooter";
import { useReveal } from "../../hooks/useReveal";
import "../../components/marketing.css";

type Reason = "Demo" | "Question" | "Partnership";

const REASONS: { value: Reason; label: string }[] = [
  { value: "Demo", label: "Book a demo" },
  { value: "Question", label: "General question" },
  { value: "Partnership", label: "Partnership" },
];

const PROMPTS: Record<Reason, string> = {
  Demo: "What you use today, and what is not working",
  Question: "What would you like to know?",
  Partnership: "What you have in mind, and who you are",
};

interface Fields {
  name: string;
  organization: string;
  email: string;
  phone: string;
  scale: string;
  message: string;
}

const EMPTY_FIELDS: Fields = { name: "", organization: "", email: "", phone: "", scale: "", message: "" };

function validate(fields: Fields): Partial<Record<keyof Fields, string>> {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (fields.name.trim().length <= 1) errors.name = "Enter your full name";
  if (fields.organization.trim().length <= 1) errors.organization = "Which organization is this for?";
  if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(fields.email.trim())) errors.email = "Enter a valid work email";
  if (fields.phone.trim() && fields.phone.replace(/\D/g, "").length < 7) errors.phone = "Check the phone number";
  return errors;
}

const inputStyle: React.CSSProperties = {
  height: 47,
  padding: "0 14px",
  border: "1px solid #E3E6ED",
  borderRadius: 10,
  fontSize: 15,
  color: "#212121",
  background: "#FBFBFC",
  outline: "none",
  transition: "border-color 180ms ease, box-shadow 180ms ease",
  width: "100%",
};

const fieldErrorStyle: React.CSSProperties = { margin: 0, fontSize: 12.5, color: "#A81E1E" };

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p style={fieldErrorStyle}>{message}</p>;
}

export default function ContactPage() {
  const formSectionRef = useRef<HTMLElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const revealRef = useReveal<HTMLElement>();

  const [reason, setReason] = useState<Reason>("Demo");
  const [fields, setFields] = useState<Fields>(EMPTY_FIELDS);
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const errors = validate(fields);
  const shown = (name: keyof Fields) => (submitAttempted || touched[name] ? errors[name] : undefined);

  const setField = (name: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((f) => ({ ...f, [name]: e.target.value }));
  };
  const markTouched = (name: keyof Fields) => () => setTouched((t) => ({ ...t, [name]: true }));

  const scrollToForm = () => {
    const node = formSectionRef.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = node.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    setTimeout(() => firstInputRef.current?.focus({ preventScroll: true }), reduce ? 0 : 520);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    if (Object.keys(validate(fields)).length > 0) return;
    setSubmitted(true);
  };

  return (
    <div style={{ background: "#FBFBFC", color: "#212121", overflow: "clip" }} id="top">
      <MarketingHeader active="/contact" demoHref="#form" onDemoClick={scrollToForm} />

      {/* Hero */}
      <section style={{ position: "relative", padding: "clamp(44px,6vw,84px) 24px clamp(28px,3.5vw,44px)" }}>
        <div
          className="mkt-drift"
          style={{
            position: "absolute",
            top: -200,
            right: "6%",
            width: 460,
            height: 460,
            borderRadius: "50%",
            background: "radial-gradient(circle,rgba(74,101,157,.09),transparent 68%)",
            filter: "blur(12px)",
            pointerEvents: "none",
            animation: "cx-drift 19s ease-in-out infinite",
          }}
        />
        <div style={{ position: "relative", maxWidth: 1160, margin: "0 auto", display: "flex", flexDirection: "column", gap: 18 }}>
          <span style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(74,101,157,.8)" }}>Contact</span>
          <h1 style={{ margin: 0, maxWidth: "18ch", fontSize: "clamp(36px,5vw,60px)", lineHeight: 1.04, letterSpacing: "-.035em", fontWeight: 600 }}>
            Tell us what your records are doing to you
          </h1>
          <p style={{ margin: 0, maxWidth: 560, fontSize: "clamp(16px,1.4vw,18.5px)", lineHeight: 1.62, color: "#555654" }}>
            Whether you want a walkthrough of XVS or you are weighing up whether a platform is the answer at all, start here. We read every message ourselves.
          </p>
        </div>
      </section>

      {/* Form */}
      <section
        id="form"
        ref={(node) => {
          formSectionRef.current = node;
          revealRef.current = node;
        }}
        style={{ padding: "0 24px clamp(56px,7vw,96px)" }}
      >
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "clamp(24px,3.5vw,48px)" }}>
          {/* Left column */}
          <div style={{ flex: "1 1 300px", minWidth: 0, display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: "#303A51", borderRadius: 18, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
              <h2 style={{ margin: 0, fontSize: 19, fontWeight: 600, letterSpacing: "-.02em", color: "#fff" }}>Book a demo</h2>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "rgba(255,255,255,.7)" }}>
                Forty minutes on your own workflows. Bring your branch list and a sample register.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {["Your structure, set up live", "Migration questions answered", "A straight answer on fit"].map((line) => (
                  <span key={line} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 14, color: "rgba(255,255,255,.82)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7FE3AE" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                    {line}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ background: "#fff", border: "1px solid #EDEFF4", borderRadius: 18, padding: 22, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", gap: 12 }}>
                <span style={{ display: "grid", placeItems: "center", width: 34, height: 34, borderRadius: 11, background: "rgba(74,101,157,.09)", color: "#4A659D", flex: "none" }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2.5" /><path d="m3 7 9 6 9-6" /></svg>
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "#8F918F" }}>Email</span>
                  <a href="mailto:hello@codextechhub.com" style={{ fontSize: 14.5, fontWeight: 500, wordBreak: "break-word" }}>hello@codextechhub.com</a>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, paddingTop: 16, borderTop: "1px solid #F7F7F7" }}>
                <span style={{ display: "grid", placeItems: "center", width: 34, height: 34, borderRadius: 11, background: "rgba(74,101,157,.09)", color: "#4A659D", flex: "none" }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "#8F918F" }}>Where we are</span>
                  <span style={{ fontSize: 14.5, fontWeight: 500, color: "#212121" }}>Lagos, Nigeria</span>
                  <span style={{ fontSize: 13, color: "#8F918F" }}>Working with institutions anywhere</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, paddingTop: 16, borderTop: "1px solid #F7F7F7" }}>
                <span style={{ display: "grid", placeItems: "center", width: 34, height: 34, borderRadius: 11, background: "rgba(74,101,157,.09)", color: "#4A659D", flex: "none" }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 8v4l3 2" /><circle cx="12" cy="12" r="9" /></svg>
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "#8F918F" }}>Response time</span>
                  <span style={{ fontSize: 14.5, fontWeight: 500, color: "#212121" }}>Within one business day</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{
              flex: "1 1 460px",
              minWidth: 0,
              background: "#fff",
              border: "1px solid #EDEFF4",
              borderRadius: 18,
              padding: "clamp(20px,3vw,34px)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              boxShadow: "0 24px 60px rgba(48,58,81,.07)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#555654" }}>What is this about?</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {REASONS.map((r) => {
                  const active = reason === r.value;
                  return (
                    <button
                      key={r.value}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setReason(r.value)}
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        padding: "10px 16px",
                        borderRadius: 10,
                        border: `1px solid ${active ? "#4A659D" : "#E3E6ED"}`,
                        background: active ? "rgba(74,101,157,.09)" : "#fff",
                        color: active ? "#3B5482" : "#555654",
                        cursor: "pointer",
                        transition: "background 200ms ease, border-color 200ms ease, color 200ms ease",
                      }}
                    >
                      {r.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label htmlFor="ct-name" style={{ fontSize: 13, fontWeight: 500, color: "#555654" }}>Full name</label>
                <input
                  ref={firstInputRef}
                  id="ct-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Adaeze Okonkwo"
                  value={fields.name}
                  onChange={setField("name")}
                  onBlur={markTouched("name")}
                  style={{ ...inputStyle, borderColor: shown("name") ? "#E33131" : touched.name || submitAttempted ? (fields.name ? "#16A34A" : "#E3E6ED") : "#E3E6ED" }}
                />
                <FieldError message={shown("name")} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label htmlFor="ct-org" style={{ fontSize: 13, fontWeight: 500, color: "#555654" }}>Organization</label>
                <input
                  id="ct-org"
                  name="organization"
                  type="text"
                  required
                  placeholder="School, group or company"
                  value={fields.organization}
                  onChange={setField("organization")}
                  onBlur={markTouched("organization")}
                  style={{ ...inputStyle, borderColor: shown("organization") ? "#E33131" : touched.organization || submitAttempted ? (fields.organization ? "#16A34A" : "#E3E6ED") : "#E3E6ED" }}
                />
                <FieldError message={shown("organization")} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label htmlFor="ct-email" style={{ fontSize: 13, fontWeight: 500, color: "#555654" }}>Work email</label>
                <input
                  id="ct-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@organization.com"
                  value={fields.email}
                  onChange={setField("email")}
                  onBlur={markTouched("email")}
                  style={{ ...inputStyle, borderColor: shown("email") ? "#E33131" : touched.email || submitAttempted ? (fields.email ? "#16A34A" : "#E3E6ED") : "#E3E6ED" }}
                />
                <FieldError message={shown("email")} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label htmlFor="ct-phone" style={{ fontSize: 13, fontWeight: 500, color: "#555654" }}>Phone</label>
                <input
                  id="ct-phone"
                  name="phone"
                  type="tel"
                  placeholder="Optional"
                  value={fields.phone}
                  onChange={setField("phone")}
                  onBlur={markTouched("phone")}
                  style={{ ...inputStyle, borderColor: shown("phone") ? "#E33131" : touched.phone && fields.phone ? "#16A34A" : "#E3E6ED" }}
                />
                <FieldError message={shown("phone")} />
              </div>
            </div>

            {reason === "Demo" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label htmlFor="ct-scale" style={{ fontSize: 13, fontWeight: 500, color: "#555654" }}>How big is the operation?</label>
                <input
                  id="ct-scale"
                  name="scale"
                  type="text"
                  placeholder="e.g. 3 campuses, 1,400 students"
                  value={fields.scale}
                  onChange={setField("scale")}
                  style={inputStyle}
                />
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10 }}>
                <label htmlFor="ct-msg" style={{ fontSize: 13, fontWeight: 500, color: "#555654" }}>Message</label>
                <span style={{ fontSize: 12, color: fields.message.length > 540 ? "#8A5A08" : "#8F918F", fontVariantNumeric: "tabular-nums" }}>
                  {fields.message.length} / 600
                </span>
              </div>
              <textarea
                id="ct-msg"
                name="message"
                rows={5}
                maxLength={600}
                placeholder={PROMPTS[reason]}
                value={fields.message}
                onChange={setField("message")}
                style={{ padding: "12px 14px", border: "1px solid #E3E6ED", borderRadius: 10, fontSize: 15, lineHeight: 1.55, color: "#212121", background: "#FBFBFC", outline: "none", resize: "vertical", transition: "border-color 180ms ease, box-shadow 180ms ease" }}
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="mkt-cta-primary"
              style={{
                height: 52,
                border: 0,
                borderRadius: 11,
                background: "#4A659D",
                color: "#fff",
                fontSize: 16,
                fontWeight: 500,
                cursor: submitted ? "default" : "pointer",
                opacity: submitted ? 0.75 : 1,
                transition: "transform 200ms ease, box-shadow 200ms ease, background 200ms ease",
              }}
            >
              {submitted ? "Message sent" : "Send message"}
            </button>
            <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.5, color: "#8F918F" }}>
              {submitted ? "Thanks — we reply within one business day." : "We use these details only to reply to you."}
            </p>
          </form>
        </div>
      </section>

      <MarketingFooter page="contact" />
    </div>
  );
}
