import { Phone } from "lucide-react";
import { announcement, site } from "@/lib/site";

export function AnnouncementBar() {
  return (
    <div className="annc">
      <div className="anncInner">
        {/* Desktop: static offer line */}
        <p className="anncOffer font-bn">{announcement}</p>

        {/* Mobile: seamless marquee */}
        <div className="anncTicker">
          <div className="anncMarquee font-bn">
            <span>{announcement}</span>
            <span>{announcement}</span>
          </div>
        </div>

        <p className="anncHotline">
          <Phone />
          HOTLINE:
          <a href={`tel:${site.hotlineTel}`}>{site.hotline}</a>
        </p>
      </div>
    </div>
  );
}
