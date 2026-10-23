import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms & Conditions | Shanvi Tours & Travels",
  description: "Booking, fare, payment, cancellation and travel terms for bus, mini bus and tempo traveller rentals with Shanvi Tours & Travels in Bangalore.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="23 October 2026"
      intro={
        <p>
          These terms apply to enquiries, bookings and trips with <strong className="text-ink">Shanvi Tours &amp; Travels</strong>, Bangalore, and to use of this website. By sending an enquiry or confirming a booking you agree to them. Where your written quotation says something different, the quotation applies.
        </p>
      }
    >
      <h2 id="enquiries-and-quotes">1. Enquiries and quotations</h2>
      <ul>
        <li>Enquiries sent from this website open WhatsApp with your details pre-filled; nothing is booked until we reply.</li>
        <li>We send a written quotation by WhatsApp or email. It states the vehicle, dates, package, fare and any advance payment, and is valid for the period it mentions.</li>
        <li>A booking is confirmed only when we confirm it in writing and any advance stated in the quotation is received.</li>
      </ul>

      <h2 id="fares">2. Fares and what they include</h2>
      <ul>
        <li><strong>Local packages</strong> are billed per 8 hours / 80 km (or as quoted). Extra kilometres and hours are charged at the published per-km and per-hour rates for the vehicle.</li>
        <li><strong>Outstation trips</strong> are billed per kilometre, garage-to-garage from our Nagadevanahalli base, with a minimum of 300 km per calendar day, plus a driver allowance (bata) per day.</li>
        <li>Toll charges, parking fees, state entry taxes and interstate permit fees are charged at actuals. GST is charged as applicable, and we issue a GST invoice.</li>
        <li>Prices on this website are indicative and may change; the fare in your confirmed quotation is the fare you pay.</li>
      </ul>

      <h2 id="payment">3. Payment</h2>
      <p>Payment is accepted by UPI, bank transfer (NEFT/RTGS), credit or debit card, cash or corporate purchase order, as agreed in the quotation. Any balance, including actual tolls and extra usage, is payable at the end of the trip unless agreed otherwise. We never ask for card numbers, PINs or UPI passwords over the phone or WhatsApp.</p>

      <h2 id="cancellation">4. Cancellations and changes</h2>
      <ul>
        <li>Cancellations made at least 24 hours before the scheduled pickup are free of charge, and any advance is refunded.</li>
        <li>Cancellations within 24 hours of pickup, or no-shows, may be charged as stated in your quotation.</li>
        <li>Changes to dates, timings or routes depend on vehicle availability and permits. Extra distance or hours are billed at the published rates.</li>
        <li>If we must cancel because of a vehicle breakdown or a reason within our control, we will offer a replacement vehicle of the same or higher capacity or refund all payments received for that trip.</li>
      </ul>

      <h2 id="during-the-trip">5. During the trip</h2>
      <ul>
        <li>The number of passengers must not exceed the vehicle&apos;s registered seating capacity.</li>
        <li>Smoking, alcohol, illegal substances and hazardous goods are not allowed in the vehicle.</li>
        <li>Our vehicles run with speed governors limited to 80 km/h. The driver will follow traffic law and safe driving hours and may refuse instructions that are unsafe or illegal; reasonable rest stops are part of every trip.</li>
        <li>Damage to the vehicle caused by passengers, beyond normal wear, will be charged at the actual repair cost.</li>
        <li>Luggage and personal belongings are carried at the passengers&apos; own risk. Please check the vehicle before leaving; we will help trace items left behind but are not liable for their loss unless caused by our negligence.</li>
      </ul>

      <h2 id="delays">6. Delays and events beyond our control</h2>
      <p>Travel times are estimates. We are not responsible for delays or changes caused by traffic, weather, road or border closures, strikes, government orders, accidents involving others or other events beyond our reasonable control. If a vehicle breaks down, we will arrange a repair or a replacement as quickly as we reasonably can.</p>

      <h2 id="liability">7. Liability</h2>
      <p>Our vehicles carry the commercial insurance required by law. Apart from liability that cannot be excluded by law, our total liability for any booking is limited to the fare paid for that booking, and we are not liable for indirect losses such as missed events or onward connections.</p>

      <h2 id="website">8. Use of this website</h2>
      <ul>
        <li>We try to keep vehicle details, photographs and prices accurate, but information on this website may change without notice.</li>
        <li>Vehicle photographs show our own fleet. Some destination photographs are used under Creative Commons licences and are credited on our <Link href="/photo-credits">photo credits</Link> page.</li>
        <li>Content, design and our name and logo belong to Shanvi Tours &amp; Travels and may not be copied for commercial use without permission.</li>
      </ul>

      <h2 id="privacy">9. Privacy</h2>
      <p>
        How we handle personal data is explained in our <Link href="/privacy-policy">Privacy Policy</Link>, written under the Digital Personal Data Protection Act, 2023.
      </p>

      <h2 id="law">10. Governing law and disputes</h2>
      <p>These terms are governed by the laws of India. Please contact us first so we can try to resolve any concern. Any dispute that cannot be settled will be subject to the exclusive jurisdiction of the courts at Bengaluru, Karnataka.</p>

      <h2 id="contact">11. Contact</h2>
      <p>
        Shanvi Tours &amp; Travels, {site.address}. Email: <a href={`mailto:${site.email}`}>{site.email}</a>. Phone / WhatsApp: <a href={`tel:${site.phoneIntl}`}>+91 {site.phone}</a>.
      </p>
    </LegalPage>
  );
}
