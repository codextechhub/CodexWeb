export interface Enquiry {
  name: string;
  organization: string;
  email: string;
  phone: string;
  message: string;
  scale?: string;
  reason: string;
  form_name: string;
}

export const EMAIL_ERROR = "We couldn't send your message. Please try again, or email sales@codexng.com.";

/**
 * Setup: see docs/emailjs-setup.md and docs/emailjs-template.html.
 * EmailJS dashboard > Email Templates > your template:
 *   To Email: sales@codex.com (fixed in the dashboard)
 *   Reply To: {{email}}
 *   Subject: CodeX enquiry: {{reason}} from {{name}}
 * Paste docs/emailjs-template.html into the template's HTML code editor.
 * Copy the service ID, template ID and PUBLIC key into .env.local;
 * .env.example explains where to find each value. Restart Vite afterwards.
 */
export async function sendEnquiry(enquiry: Enquiry): Promise<void> {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();
  if (!serviceId || !templateId || !publicKey ||
      serviceId === "service_your_service_id" ||
      templateId === "template_contact_notification" ||
      publicKey === "your_emailjs_public_key") {
    throw new Error("EmailJS is not configured. Follow docs/emailjs-setup.md.");
  }

  // Send every field, including optional values and the contact reason buttons.
  // Double-brace variables in the template escape user-supplied HTML.
  console.log("[emailjs] sending", { serviceId, templateId, form_name: enquiry.form_name });
  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal: AbortSignal.timeout(20000),
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        ...enquiry,
        email: enquiry.email.trim(),
        phone: enquiry.phone.trim() || "Not provided",
        scale: enquiry.scale?.trim() || "Not provided / not applicable",
        message: enquiry.message || "Not provided",
        page_url: window.location.href,
      },
    }),
  });
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    console.error("[emailjs] request failed", response.status, body);
    throw new Error(`EmailJS request failed (${response.status}): ${body}`);
  }
  console.log("[emailjs] form sent");
}
