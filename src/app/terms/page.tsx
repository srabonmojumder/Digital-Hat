import type { Metadata } from "next";
import { StaticPage } from "@/components/layout/StaticPage";
import { Prose } from "@/components/ui/Prose";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <StaticPage title="Terms & Conditions">
      <Prose>
        <p>
          Welcome to {site.name}. By accessing our website and placing an order,
          you agree to the following terms and conditions.
        </p>

        <h2>Orders &amp; Pricing</h2>
        <ul>
          <li>All prices are listed in Bangladeshi Taka (৳) and include applicable charges unless stated otherwise.</li>
          <li>We reserve the right to accept or decline any order.</li>
          <li>Prices and offers may change without prior notice.</li>
        </ul>

        <h2>Payment</h2>
        <p>
          We accept <strong>Cash on Delivery (COD)</strong> across Bangladesh and
          online payments (card, bKash, Nagad, Rocket and more) processed
          securely via <strong>SSLCommerz</strong>.
        </p>

        <h2>Delivery</h2>
        <ul>
          <li>Inside Dhaka: typically 24–48 hours after order confirmation.</li>
          <li>Outside Dhaka: typically 2–4 business days.</li>
          <li>Delivery charges vary by area and are shown at checkout.</li>
        </ul>

        <h2>Product Information</h2>
        <p>
          We make every effort to display products accurately. Slight variations
          in colour or texture may occur due to screen settings and the natural
          characteristics of genuine leather.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          {site.name} is not liable for delays caused by circumstances beyond our
          control, including courier disruptions or natural events.
        </p>

        <h2>Governing Law</h2>
        <p>
          These terms are governed by the laws of the People&apos;s Republic of
          Bangladesh.
        </p>

        <h2>Contact</h2>
        <p>
          For any questions, call <strong>{site.hotline}</strong> or email{" "}
          <strong>{site.email}</strong>.
        </p>
      </Prose>
    </StaticPage>
  );
}
