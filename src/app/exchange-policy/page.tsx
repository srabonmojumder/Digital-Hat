import type { Metadata } from "next";
import { StaticPage } from "@/components/layout/StaticPage";
import { Prose } from "@/components/ui/Prose";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Exchange Policy" };

export default function ExchangePolicyPage() {
  return (
    <StaticPage title="Exchange Policy">
      <Prose>
        <p>
          We want you to love what you ordered. If something isn&apos;t quite
          right, {site.name} offers a simple <strong>7-day exchange</strong> on
          eligible products.
        </p>

        <h2>Eligibility</h2>
        <ul>
          <li>Exchange requests must be made within 7 days of delivery.</li>
          <li>
            The item must be unused, unwashed and in its original condition with
            all tags and packaging intact.
          </li>
          <li>Proof of purchase (Order ID) is required.</li>
        </ul>

        <h2>How to Request an Exchange</h2>
        <ul>
          <li>
            Call our hotline at <strong>{site.hotline}</strong> or message us on
            WhatsApp with your Order ID.
          </li>
          <li>Tell us the item and the reason for the exchange.</li>
          <li>Our team will guide you through the next steps.</li>
        </ul>

        <h2>Size &amp; Variant Exchange</h2>
        <p>
          Wrong size? We&apos;ll happily exchange for another size subject to
          availability. If your preferred size is unavailable, you may choose a
          different product of equal value or receive store credit.
        </p>

        <h2>Non-Exchangeable Items</h2>
        <ul>
          <li>Perfumes and personal-care items once opened.</li>
          <li>Items damaged due to misuse after delivery.</li>
          <li>Products bought under clearance / final-sale tags.</li>
        </ul>

        <h2>Need Help?</h2>
        <p>
          Reach us at <strong>{site.hotline}</strong> or{" "}
          <strong>{site.email}</strong>.
        </p>
      </Prose>
    </StaticPage>
  );
}
