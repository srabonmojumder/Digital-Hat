import type { Metadata } from "next";
import { StaticPage } from "@/components/layout/StaticPage";
import { Prose } from "@/components/ui/Prose";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <StaticPage title="Privacy Policy">
      <Prose>
        <p>
          At {site.name}, your privacy matters to us. This policy explains what
          information we collect, how we use it, and the choices you have. By
          using our website, you agree to the practices described here.
        </p>

        <h2>Information We Collect</h2>
        <ul>
          <li>
            <strong>Contact details</strong> — name, mobile number, delivery
            address and (optionally) email, collected when you place an order.
          </li>
          <li>
            <strong>Order information</strong> — the products you buy, quantity,
            size and your chosen delivery area.
          </li>
          <li>
            <strong>Usage data</strong> — basic, non-identifying analytics that
            help us improve the store.
          </li>
        </ul>

        <h2>How We Use Your Information</h2>
        <ul>
          <li>To process, confirm and deliver your orders.</li>
          <li>To contact you about your order via call, SMS or WhatsApp.</li>
          <li>To provide customer support and handle exchanges or returns.</li>
          <li>To send offers and updates — only if you opt in.</li>
        </ul>

        <h2>Payment Security</h2>
        <p>
          Online payments are processed securely through{" "}
          <strong>SSLCommerz</strong>. We never store your full card or mobile
          banking credentials on our servers.
        </p>

        <h2>Data Sharing</h2>
        <p>
          We share your information only with delivery partners and payment
          gateways to fulfil your order. We do not sell your personal data to
          third parties.
        </p>

        <h2>Your Rights</h2>
        <p>
          You may request access to, correction of, or deletion of your personal
          data at any time by contacting us.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy? Call{" "}
          <strong>{site.hotline}</strong> or email{" "}
          <strong>{site.email}</strong>.
        </p>
      </Prose>
    </StaticPage>
  );
}
