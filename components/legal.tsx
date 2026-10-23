import Link from "next/link";
import type { ReactNode } from "react";

/** Version of the privacy notice; forms record it with each consent. Bump when the policy changes. */
export const PRIVACY_VERSION = "2026-10-23";

/** Line appended to each enquiry so we can show when and to which notice the person consented (DPDP Act s.6(10)). */
export const consentRecord = () => `Consent: privacy notice v${PRIVACY_VERSION} accepted on website form, ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST`;

const legalLink = "font-bold text-forest underline decoration-forest/30 underline-offset-2";

/**
 * DPDP notice + consent for forms that collect a name and phone number. The checkbox is
 * unticked and required (clear affirmative action) and covers only data use; terms are a
 * separate line so consent is not bundled.
 */
export function ConsentField({ id }: { id: string }) {
  return (
    <div className="mt-4 rounded-xl border border-line bg-paper p-3.5 text-xs leading-relaxed">
      <p className="text-muted">
        <strong className="text-ink">Privacy notice:</strong> we use your name, phone number and trip details only to reply to this enquiry and arrange your trip. They reach us through WhatsApp when you press send; this website does not store them. You can access, correct or erase your data, or withdraw consent, anytime by messaging us.
      </p>
      <label htmlFor={id} className="mt-3 flex cursor-pointer items-start gap-3 font-semibold text-ink">
        <input id={id} type="checkbox" required className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[#0f5b46]" />
        <span>
          I agree to Shanvi Tours &amp; Travels using my personal data for this enquiry as described in the{" "}
          <Link href="/privacy-policy" target="_blank" rel="noopener" className={legalLink}>
            Privacy Policy
          </Link>
          , and I confirm I am 18 or older.
        </span>
      </label>
      <p className="mt-2 pl-8 text-muted">
        By sending, you agree to our{" "}
        <Link href="/terms-and-conditions" target="_blank" rel="noopener" className={legalLink}>
          Terms &amp; Conditions
        </Link>
        .
      </p>
    </div>
  );
}

export function LegalPage({ title, updated, intro, children }: { title: string; updated: string; intro: ReactNode; children: ReactNode }) {
  return (
    <section className="pb-24 pt-36">
      <div className="wrap max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 id="top" className="display mt-4 text-[clamp(2.4rem,1.6rem+3vw,4rem)]">{title}</h1>
        <p className="mt-3 text-sm font-bold text-muted">Last updated: {updated}</p>
        <div className="mt-6 text-[15.5px] leading-relaxed text-muted">{intro}</div>
        <div className="prose-shanvi mt-10">{children}</div>
        <p className="mt-14 border-t border-line pt-6 text-sm text-muted">
          See also: <Link href="/privacy-policy" className="font-bold text-forest underline underline-offset-4">Privacy Policy</Link> ·{" "}
          <Link href="/terms-and-conditions" className="font-bold text-forest underline underline-offset-4">Terms &amp; Conditions</Link> ·{" "}
          <Link href="/contact" className="font-bold text-forest underline underline-offset-4">Contact</Link>
        </p>
      </div>
    </section>
  );
}
