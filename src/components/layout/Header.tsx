"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, ShoppingCart, User } from "lucide-react";
import { Logo } from "./Logo";
import { SearchBar } from "./SearchBar";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";
import { LoginDropdown } from "./LoginDropdown";
import { useCart } from "@/lib/cart-context";
import { site } from "@/lib/site";

export function Header() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const loginRef = useRef<HTMLDivElement>(null);
  const { count, hydrated } = useCart();
  const pathname = usePathname();

  // Close the login panel when clicking outside it.
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (loginRef.current && !loginRef.current.contains(e.target as Node)) {
        setLoginOpen(false);
      }
    }
    if (loginOpen) document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [loginOpen]);

  // Close menus on navigation (adjust state during render — no effect needed).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setLoginOpen(false);
    setMobileOpen(false);
  }

  return (
    <header className="hdr">
      <div className="hdrTop">
        <div className="hdrBar">
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="hdrMenuBtn"
          >
            <Menu />
          </button>

          <Logo />

          <div className="hdrSearch">
            <SearchBar />
          </div>

          <div className="hdrActions">
            <a href={`tel:${site.hotlineTel}`} className="hdrAction hdrHotline">
              <span className="hdrActionIcon hdrActionIcon--brand">
                <Phone />
              </span>
              <span className="hdrActionMeta">
                <span className="hdrActionLabel">Hotline</span>
                <span className="hdrActionValue">{site.hotline}</span>
              </span>
            </a>

            <div className="hdrAccount" ref={loginRef}>
              <button
                onClick={() => setLoginOpen((v) => !v)}
                aria-haspopup="dialog"
                aria-expanded={loginOpen}
                className="hdrAction"
              >
                <span className="hdrActionIcon hdrActionIcon--muted">
                  <User />
                </span>
                <span className="hdrActionMeta">
                  <span className="hdrActionLabel">Account</span>
                  <span className="hdrActionValue">Login / Sign Up</span>
                </span>
              </button>
              {loginOpen && (
                <div className="hdrAccountPanel">
                  <LoginDropdown onClose={() => setLoginOpen(false)} />
                </div>
              )}
            </div>

            <Link
              href="/checkout"
              aria-label="Cart — go to checkout"
              className="hdrCart"
            >
              <ShoppingCart />
              {hydrated && count > 0 && (
                <span className="hdrCartBadge">{count}</span>
              )}
            </Link>
          </div>
        </div>

        <div className="hdrSearchRow">
          <SearchBar />
        </div>
      </div>

      <MegaMenu />
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
