import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  href?: string;
}

/** Breadcrumb trail (Home is prepended automatically) + a Back To Home link. */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...items];

  return (
    <div className="crumb">
      <nav aria-label="Breadcrumb" className="crumbNav">
        {trail.map((crumb, i) => {
          const isLast = i === trail.length - 1;
          return (
            <span key={`${crumb.label}-${i}`} className="crumbItem">
              {i > 0 && <ChevronRight className="crumbSep" />}
              {crumb.href && !isLast ? (
                <Link href={crumb.href}>{crumb.label}</Link>
              ) : (
                <span className={isLast ? "crumbCurrent" : undefined}>
                  {crumb.label}
                </span>
              )}
            </span>
          );
        })}
      </nav>

      <Link href="/" className="crumbBack">
        ← Back To Home
      </Link>
    </div>
  );
}
