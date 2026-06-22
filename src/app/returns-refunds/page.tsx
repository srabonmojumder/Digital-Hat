import type { Metadata } from "next";
import { StaticPage } from "@/components/layout/StaticPage";
import { Prose } from "@/components/ui/Prose";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Returns & Refunds Policy" };

export default function ReturnsRefundsPage() {
  return (
    <StaticPage title="Returns & Refunds Policy">
      <Prose>
        <p>
          Your satisfaction is our priority. If your order arrives damaged,
          defective or incorrect, {site.name} will make it right.
        </p>

        <h2>Return Eligibility</h2>
        <ul>
          <li>Report any issue within 7 days of delivery.</li>
          <li>Items must be unused and in original packaging with tags.</li>
          <li>Keep your Order ID handy for faster processing.</li>
        </ul>

        <h2>Damaged or Wrong Items</h2>
        <p>
          If you received a damaged or wrong product, contact us immediately with
          a photo. We&apos;ll arrange a replacement or full refund at no extra
          cost to you.
        </p>

        <h2>Refund Process</h2>
        <ul>
          <li>
            Approved refunds are issued to your <strong>bKash / Nagad / Rocket</strong>{" "}
            account or original payment method.
          </li>
          <li>Refunds are typically completed within 5–7 business days.</li>
          <li>Delivery charges are non-refundable unless the error was ours.</li>
        </ul>

        <h2>Non-Returnable Items</h2>
        <ul>
          <li>Opened perfumes and personal-care products.</li>
          <li>Final-sale or clearance items.</li>
          <li>Items damaged by misuse after delivery.</li>
        </ul>

        <h2>Contact</h2>
        <p>
          To start a return or refund, call <strong>{site.hotline}</strong> or
          email <strong>{site.email}</strong>.
        </p>
      </Prose>
    </StaticPage>
  );
}
