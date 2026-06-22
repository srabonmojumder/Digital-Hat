import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import {
  FacebookIcon,
  InstagramIcon,
  WhatsappIcon,
  YoutubeIcon,
} from "@/components/ui/BrandIcons";
import { site } from "@/lib/site";

const PAYMENTS: { label: string; color: string }[] = [
  { label: "VISA", color: "#1A1F71" },
  { label: "Mastercard", color: "#EB001B" },
  { label: "AMEX", color: "#2E77BC" },
  { label: "bKash", color: "#E2136E" },
  { label: "Nagad", color: "#EC1C24" },
  { label: "Rocket", color: "#8C3494" },
  { label: "Upay", color: "#E8A200" },
  { label: "DBBL Nexus", color: "#00563F" },
  { label: "Internet Banking", color: "#475569" },
];

const ACCOUNT_LINKS = [
  { label: "Sign In", href: "#" },
  { label: "Create New Account", href: "#" },
  { label: "My Shopping Cart", href: "/cart" },
  { label: "My Orders", href: "#" },
  { label: "User Dashboard", href: "#" },
];

const RELATED_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Exchange Policy", href: "/exchange-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Returns & Refunds Policy", href: "/returns-refunds" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="ft">
      <div className="ftInner">
        {/* Col 1 — brand + help */}
        <div>
          <Logo />
          <p className="ftTagline">{site.tagline}</p>
          <h4 className="ftHeading">Need Help?</h4>
          <div className="ftContact">
            <a href={`tel:${site.hotlineTel}`}>
              <Phone />
              {site.hotline}
            </a>
            <a href={`mailto:${site.email}`}>
              <Mail />
              {site.email}
            </a>
            <div className="ftAddress">
              <MapPin />
              <span>{site.address}</span>
            </div>
          </div>
          <div className="ftSocial">
            <a href={site.facebook} aria-label="Facebook" className="ftSocialLink">
              <FacebookIcon />
            </a>
            <a href={site.youtube} aria-label="YouTube" className="ftSocialLink">
              <YoutubeIcon />
            </a>
            <a href={site.instagram} aria-label="Instagram" className="ftSocialLink">
              <InstagramIcon />
            </a>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              aria-label="WhatsApp"
              className="ftSocialLink"
            >
              <WhatsappIcon />
            </a>
          </div>
        </div>

        {/* Col 2 — we accept */}
        <div>
          <h3 className="ftTitle">
            We Accept<span />
          </h3>
          <div className="ftPay">
            {PAYMENTS.map((p) => (
              <span key={p.label} className="ftPayChip" style={{ color: p.color }}>
                {p.label}
              </span>
            ))}
          </div>
          <p className="ftNote">
            All payments are processed securely via{" "}
            <strong>SSLCommerz</strong>.
          </p>
        </div>

        {/* Col 3 — account */}
        <div>
          <h3 className="ftTitle">
            Customers Account<span />
          </h3>
          <ul className="ftList">
            {ACCOUNT_LINKS.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="ftLink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — related pages */}
        <div>
          <h3 className="ftTitle">
            Related Pages<span />
          </h3>
          <ul className="ftList">
            {RELATED_LINKS.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="ftLink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="ftBottom">
        <div className="ftBottomInner">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>
            Powered by <strong>{site.name}</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
