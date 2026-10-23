import type { Metadata } from "next";
import { LegalPage } from "@/components/legal";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy | Shanvi Tours & Travels",
  description: "How Shanvi Tours & Travels collects, uses and protects your personal data under the Digital Personal Data Protection Act, 2023, and how to use your rights.",
  alternates: { canonical: "/privacy-policy" },
};

const data = [
  ["Name and phone number", "Enquiry popup, contact form, phone or WhatsApp", "To reply to your enquiry, send a quote and confirm your booking"],
  ["Email address", "Contact form (optional elsewhere)", "To send quotes, booking confirmations and invoices"],
  ["Trip details: travel date, number of travellers, trip type, pickup and destination, your message", "Enquiry popup, contact form, booking widget, fare calculator", "To recommend the right vehicle, price the trip and plan the route"],
  ["Pickup address and lead passenger's contact for the trip", "Shared by you when a booking is confirmed", "To dispatch the vehicle and let the driver reach you"],
  ["Billing details: company name, GSTIN, billing address", "Shared by corporate customers who need a GST invoice", "To issue GST-compliant tax invoices"],
  ["Payment records: amount, date, UPI or bank reference", "When you pay by UPI, bank transfer, card or cash", "Accounting and tax compliance. Card payments are handled by the bank or payment terminal; we never ask for card numbers, PINs or UPI passwords over the phone or WhatsApp"],
  ["Technical data: IP address, browser type, pages requested, time of request", "Automatically, by our website host's server logs", "To keep the website secure and running. We use no cookies, analytics or advertising trackers"],
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="23 October 2026"
      intro={
        <p>
          This notice explains what personal data <strong className="text-ink">Shanvi Tours &amp; Travels</strong> collects, why, and the rights you have under India&apos;s <strong className="text-ink">Digital Personal Data Protection Act, 2023</strong> (&ldquo;DPDP Act&rdquo;), the Digital Personal Data Protection Rules, 2025, and the Information Technology Act, 2000 and its rules. We collect only what we need to answer your enquiry and run your trip.
        </p>
      }
    >
      <h2 id="who-we-are">1. Who we are</h2>
      <p>
        Shanvi Tours &amp; Travels (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is a commercial passenger transport operator in Bangalore and is the <strong>Data Fiduciary</strong> for the personal data described here. Address: {site.address}, Karnataka, India. Email: <a href={`mailto:${site.email}`}>{site.email}</a>. Phone / WhatsApp: <a href={`tel:${site.phoneIntl}`}>+91 {site.phone}</a>.
      </p>

      <h2 id="what-we-collect">2. Personal data we collect and why</h2>
      <p>You do not need to share any personal data to browse this website. We collect the following only when you contact us or book a trip:</p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Personal data</th>
              <th>How we get it</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            {data.map(([d, how, why]) => (
              <tr key={d}>
                <td>{d}</td>
                <td>{how}</td>
                <td>{why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>We do not use your data for automated decision-making, profiling or advertising, and we never sell it.</p>

      <h2 id="how-forms-work">3. How our enquiry forms work</h2>
      <p>
        Our website forms do not store your details on our servers. When you press send, the form opens <strong>WhatsApp</strong> with your message pre-filled, and the details reach us only when you send that message from your own WhatsApp account. WhatsApp is operated by WhatsApp LLC (Meta Platforms) and handles the message under its own terms and privacy policy. We then keep the conversation on our business WhatsApp to serve your booking.
      </p>

      <h2 id="legal-basis">4. Consent and other lawful grounds</h2>
      <ul>
        <li>
          <strong>Consent:</strong> our enquiry forms ask you to tick a box agreeing to this notice before you send. Each WhatsApp enquiry from our forms records that consent with the date, time and the version of this notice.
        </li>
        <li>
          <strong>Data you share voluntarily for a specific purpose</strong> (for example, calling or messaging us for a quote) is used for that purpose, as allowed by Section 7 of the DPDP Act.
        </li>
        <li>
          <strong>Legal obligations and safety:</strong> we may process or disclose data where the law requires it (for example GST records, permit checks or police requests) or to respond to a medical emergency or safety incident during a trip.
        </li>
      </ul>

      <h2 id="sharing">5. Who we share it with</h2>
      <ul>
        <li>
          <strong>The driver assigned to your trip</strong>: the lead passenger&apos;s name, phone number, pickup point and itinerary.
        </li>
        <li>
          <strong>Service providers</strong> that help us operate: our website host (Vercel Inc.), WhatsApp (Meta Platforms) for messages, and our telecom provider for calls. They process data only to provide their service.
        </li>
        <li>
          <strong>Government authorities</strong> (such as transport, tax or police authorities) when required by law.
        </li>
      </ul>
      <p>Some of these providers may process data outside India. We do so only as permitted under the DPDP Act and any restrictions notified by the Government of India.</p>

      <h2 id="retention">6. How long we keep it</h2>
      <ul>
        <li>
          <strong>Enquiries that do not become bookings:</strong> deleted within 12 months of our last conversation.
        </li>
        <li>
          <strong>Booking, invoice and payment records:</strong> kept for as long as tax law requires (under GST law, up to 72 months from the due date of the annual return), then deleted.
        </li>
        <li>
          <strong>Server logs:</strong> kept by our website host for a limited period for security and troubleshooting.
        </li>
      </ul>
      <p>If you withdraw consent or ask us to erase your data, we delete it unless the law requires us to keep it.</p>

      <h2 id="security">7. How we protect it</h2>
      <p>
        We take reasonable security safeguards: access to customer data is limited to our booking staff and the assigned driver, business phones and accounts are protected by screen locks and passwords, and this website is served only over encrypted HTTPS. If a personal data breach occurs, we will inform the Data Protection Board of India and the affected people as the DPDP Act and Rules require, including a detailed report to the Board within 72 hours of becoming aware of it.
      </p>

      <h2 id="your-rights">8. Your rights</h2>
      <p>Under the DPDP Act you can:</p>
      <ul>
        <li><strong>Access</strong> a summary of the personal data we hold about you and how we use it, and the identity of those we have shared it with.</li>
        <li><strong>Correct, complete or update</strong> inaccurate or incomplete data.</li>
        <li><strong>Erase</strong> data we no longer need, unless the law requires us to keep it.</li>
        <li><strong>Withdraw consent</strong> at any time, as easily as you gave it, by messaging or emailing us. Withdrawal does not affect processing already done, but we may not be able to complete an ongoing booking without the necessary details.</li>
        <li><strong>Nominate</strong> a person to exercise your rights in case of your death or incapacity.</li>
        <li><strong>Seek grievance redressal</strong> from us, and then complain to the Data Protection Board of India.</li>
      </ul>
      <p>
        To use any of these rights, email <a href={`mailto:${site.email}`}>{site.email}</a> or WhatsApp <a href={`tel:${site.phoneIntl}`}>+91 {site.phone}</a>. We may ask you to confirm your identity, and we will respond within 30 days.
      </p>

      <h2 id="your-duties">9. Your duties</h2>
      <p>As the DPDP Act requires, please give accurate information, do not impersonate anyone, share another person&apos;s details (such as fellow passengers) only with their permission, and do not file false or frivolous complaints.</p>

      <h2 id="children">10. Children</h2>
      <p>
        Our enquiry forms are meant for adults aged 18 or over. We do not knowingly collect personal data from children. Bookings for school or college trips should be made by the institution or a parent or guardian, who provides any details needed with the guardian&apos;s consent.
      </p>

      <h2 id="grievance-officer">11. Grievance Officer</h2>
      <p>
        For any question, complaint or request about your personal data, contact our Grievance Officer:
        <br />
        <strong>Pradeep H.B.</strong>, Founder, Shanvi Tours &amp; Travels
        <br />
        Email: <a href={`mailto:${site.email}`}>{site.email}</a> · Phone: <a href={`tel:${site.phoneIntl}`}>+91 {site.phone}</a>
        <br />
        Address: {site.address}
      </p>
      <p>
        We acknowledge grievances promptly and resolve them within 30 days. If you are not satisfied with our response, you may file a complaint with the <strong>Data Protection Board of India</strong> under the DPDP Act.
      </p>

      <h2 id="language-and-changes">12. Language and changes to this notice</h2>
      <p>
        On request, we will provide this notice in Kannada or Hindi. We may update this notice when our practices or the law change; the &ldquo;Last updated&rdquo; date above shows the current version, and significant changes will be highlighted on this page.
      </p>
    </LegalPage>
  );
}
