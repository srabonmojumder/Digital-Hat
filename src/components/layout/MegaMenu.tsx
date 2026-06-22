"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import { navItems } from "@/lib/data";

/** Desktop mega-menu: hover dropdowns with second-level fly-out submenus. */
export function MegaMenu() {
  const pathname = usePathname();

  return (
    <nav className="mega">
      <div className="megaInner">
        <ul className="megaList">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const hasMenu = Boolean(item.items?.length);
            const linkCls = [
              "megaLink",
              item.accent && "megaLink--accent",
              active && "megaLink--active",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <li key={item.label} className="megaItem">
                <Link href={item.href} className={linkCls}>
                  {item.label}
                  {hasMenu && <ChevronDown />}
                </Link>

                {hasMenu && (
                  <div className="megaPanel">
                    <ul className="megaDropdown">
                      {item.items!.map((sub) => {
                        const hasChildren = Boolean(sub.children?.length);
                        return (
                          <li key={sub.label} className="megaSub">
                            <Link href={sub.href} className="megaSubLink">
                              {sub.label}
                              {hasChildren && <ChevronRight />}
                            </Link>

                            {hasChildren && (
                              <div className="megaFlyout">
                                <ul className="megaDropdown">
                                  {sub.children!.map((leaf) => (
                                    <li key={`${leaf.label}-${leaf.href}`}>
                                      <Link href={leaf.href} className="megaLeaf">
                                        {leaf.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
