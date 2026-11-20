"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const links = [
  ["Level-Funded", "/level-funded"],
  ["Benefits", "/benefits"],
  ["Buy-Sell", "/buy-sell-1"],
  ["Insights", "/blog"],
  ["About", "/about"],
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="mobile-nav">
      <button
        ref={toggle}
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="menu-bars" aria-hidden="true" data-open={open} />
      </button>
      <div
        id="mobile-menu"
        ref={panel}
        className="menu-panel"
        data-open={open}
        hidden={!open}
      >
        <nav aria-label="Mobile navigation">
          {links.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              {label}
              <span aria-hidden="true">→</span>
            </Link>
          ))}
        </nav>
        <Link className="button" href="/#review" onClick={() => setOpen(false)}>
          Get a review
        </Link>
      </div>
    </div>
  );
}
