# Send website enquiries to sales@codex.com

Both the homepage demo form and the contact form use the same EmailJS template through your existing Gmail service. They send the full name, organization, work email, phone and message. The contact form also sends the selected enquiry type and operation size, including any size entered before switching enquiry types. The email identifies the form and page URL. Empty optional fields are labelled as not provided; the homepage has no operation-size input.

## 1. Create your template

1. Sign in at https://dashboard.emailjs.com/.
2. Open **Email Templates**, select **Create New Template**, and open the template editor.
3. Set the following fields (these are dashboard settings, separate from the email body):

| Dashboard field | Value to enter |
| --- | --- |
| To Email | `sales@codex.com` |
| Subject | `CodeX enquiry: {{reason}} from {{name}}` |
| From Name | `CodeX Website` |
| From Email | Use the default email address of your connected Gmail service |
| Reply To | `{{email}}` |
| CC / BCC | Leave empty unless you want additional recipients |

Keep **To Email** fixed as `sales@codex.com`. Gmail is the sender; sales@codex.com is the recipient. Put the visitor's address in **Reply To**, so replying to the notification addresses the visitor.

4. In **Content**, open the HTML editing option (**Code Editor**, rather than pasting HTML into the visual text editor).
5. Open [emailjs-template.html](emailjs-template.html), copy its entire contents, paste them into that editor, and save. The comments at the top repeat the dashboard settings for reference; they are not displayed in the email.
6. Open the template's **Settings** and copy its **Template ID** for the next step.

The `{{name}}` style placeholders must remain exactly as written. The website supplies these values automatically. Use double braces, which escape submitted HTML; do not change them to triple braces.

## 2. Connect the website

Copy `.env.example` to a new file named `.env.local` in the project root (next to `package.json`). Replace the example values:

```dotenv
VITE_EMAILJS_SERVICE_ID=your_actual_service_id
VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

- **Service ID:** EmailJS → **Email Services** → your existing Gmail service. No second Gmail service is needed.
- **Template ID:** EmailJS → **Email Templates** → the template you just saved → **Settings**.
- **Public Key:** EmailJS → **Account** → **API Keys** → **Public Key**. Do not use your private key or Gmail password in this project.

Stop and restart `npm run dev` after saving `.env.local`. For the deployed website, add the same three environment variables in your hosting provider's project settings, then rebuild/redeploy. Vite reads these values at build time. The public key is intended for browser use.

## 3. Check the delivery

1. Use the template's **Test It** action with your Gmail service and sample values for the placeholders, then check sales@codex.com (including spam).
2. On the running website, fill every homepage demo field and submit once. Check that each value appears in the email.
3. Repeat on `/contact`, including operation size under **Book a demo**, then check **General question** and **Partnership** submissions.
4. Click Reply on a received notification: it should address the visitor's work email.

The forms display **Sending...** while waiting and show success only after EmailJS accepts the request. On failure, entered details remain available and the submit button allows another attempt. Acceptance does not guarantee inbox delivery; check EmailJS **Email History** and the receiving inbox if an email is missing. A network timeout can occur after a message was accepted, so check before retrying in that case.

If sending fails, verify all three environment values, save the template, check the Gmail service connection and your EmailJS quota. If you configured an EmailJS domain allowlist, include your production origin and the localhost origin used for development.

## Implementation and references

`src/lib/emailjs.ts` sends through the EmailJS REST API using browser `fetch`; no additional package is needed. The recipient is configured in the dashboard template, not controlled by a form field.

- [EmailJS send endpoint](https://www.emailjs.com/docs/rest-api/send/)
- [Create an email template](https://www.emailjs.com/docs/tutorial/creating-email-template/)
- [Template variables](https://www.emailjs.com/docs/user-guide/dynamic-variables-templates/)
