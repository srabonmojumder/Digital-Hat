import type { Metadata } from "next";
import { BadgeCheck, Mail, MapPin, Phone } from "lucide-react";
import { StaticPage } from "@/components/layout/StaticPage";
import { FacebookIcon } from "@/components/ui/BrandIcons";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "About Us" };

const COMPANY_INFO: { label: string; value: string }[] = [
  { label: "Business Name", value: site.name },
  { label: "Trade License No", value: site.tradeLicense },
  { label: "License Authority", value: site.licenseAuthority },
  { label: "Founded", value: String(site.foundedYear) },
  { label: "Business Type", value: site.businessType },
];

const TEAM: { name: string; role: string }[] = [
  { name: "Md. Karim Ahmed", role: "Founder & CEO" },
  { name: "Sadia Rahman", role: "Head of Operations" },
  { name: "Tanvir Hasan", role: "Head of Customer Care" },
];

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function AboutPage() {
  return (
    <StaticPage title="About Us">
      <div className="about">
        <p className="aboutIntro">
          {site.name} is a trusted Bangladeshi fashion &amp; leather brand,
          founded in {site.foundedYear}. We craft premium Panjabi, 100% genuine
          leather wallets, belts and accessories — combining timeless design
          with everyday durability. From Eid collections to everyday essentials,
          we serve thousands of happy customers across Bangladesh with{" "}
          <span>Cash on Delivery</span> and fast, reliable shipping.
        </p>

        {/* Company info + trust badge */}
        <section className="aboutCard">
          <div className="aboutCardHead">
            <h2 className="aboutCardTitle">Company Information</h2>
            <span className="aboutBadge">
              <BadgeCheck />
              Verified Trade License
            </span>
          </div>
          <dl className="aboutDl">
            {COMPANY_INFO.map((row) => (
              <div key={row.label} className="aboutRow">
                <dt className="aboutRowLabel">{row.label}</dt>
                <dd className="aboutRowValue">{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Management team */}
        <section>
          <h2 className="aboutSectionTitle">Management Team</h2>
          <div className="aboutTeam">
            {TEAM.map((member) => (
              <div key={member.name} className="aboutMember">
                <span className="aboutMemberAvatar">{initials(member.name)}</span>
                <div>
                  <p className="aboutMemberName">{member.name}</p>
                  <p className="aboutMemberRole">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Address + contact */}
        <section className="aboutGrid2">
          <div className="aboutBox">
            <h3 className="aboutBoxTitle">Business Address</h3>
            <p className="aboutAddress">
              <MapPin />
              {site.address}
            </p>
          </div>
          <div className="aboutBox">
            <h3 className="aboutBoxTitle">Contact</h3>
            <div className="aboutContact">
              <a href={`tel:${site.hotlineTel}`}>
                <Phone />
                {site.hotline}
              </a>
              <a href={`mailto:${site.email}`}>
                <Mail />
                {site.email}
              </a>
              <a href={site.facebook}>
                <FacebookIcon />
                Facebook Page
              </a>
            </div>
          </div>
        </section>
      </div>
    </StaticPage>
  );
}
