"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import { navItems } from "@/lib/data";
import { Logo } from "./Logo";

/** Slide-in navigation drawer for mobile / tablet (accordion submenus). */
export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const toggle = (key: string) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <>
      <div
        onClick={onClose}
        className={`mnavOverlay ${open ? "mnavOverlay--open" : "mnavOverlay--closed"}`}
      />
      <div
        className={`mnavPanel ${open ? "mnavPanel--open" : "mnavPanel--closed"}`}
        aria-hidden={!open}
      >
        <div className="mnavHeader">
          <Logo />
          <button onClick={onClose} aria-label="Close menu" className="mnavClose">
            <X />
          </button>
        </div>

        <nav className="mnavBody">
          <ul className="mnavList">
            {navItems.map((item) => {
              const hasMenu = Boolean(item.items?.length);
              if (!hasMenu) {
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`mnavLink mnavLink--top${item.accent ? " mnavLink--accent" : ""}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }
              const isOpen = expanded[item.label];
              return (
                <li key={item.label}>
                  <button
                    onClick={() => toggle(item.label)}
                    className="mnavToggle"
                    aria-expanded={isOpen}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={isOpen ? "mnavChevron--open" : undefined} />
                  </button>
                  {isOpen && (
                    <ul className="mnavSubmenu">
                      {item.items!.map((sub) => {
                        const hasChildren = Boolean(sub.children?.length);
                        if (!hasChildren) {
                          return (
                            <li key={sub.label}>
                              <Link
                                href={sub.href}
                                onClick={onClose}
                                className="mnavLink"
                              >
                                {sub.label}
                              </Link>
                            </li>
                          );
                        }
                        const subKey = `${item.label}/${sub.label}`;
                        const subOpen = expanded[subKey];
                        return (
                          <li key={sub.label}>
                            <button
                              onClick={() => toggle(subKey)}
                              className="mnavToggle mnavToggle--sub"
                              aria-expanded={subOpen}
                            >
                              <span>{sub.label}</span>
                              <ChevronDown
                                className={subOpen ? "mnavChevron--open" : undefined}
                              />
                            </button>
                            {subOpen && (
                              <ul className="mnavSubmenu">
                                {sub.children!.map((leaf) => (
                                  <li key={`${leaf.label}-${leaf.href}`}>
                                    <Link
                                      href={leaf.href}
                                      onClick={onClose}
                                      className="mnavLink"
                                    >
                                      {leaf.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
