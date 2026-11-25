"use client";

import { useEffect } from "react";

/**
 * Minimal motion system.
 *
 * - Header gets a subtle shadow after 12px scroll.
 * - Chart bars animate in when their figure enters view.
 *
 * No per-section fade-in. A single page-load entrance (hero),
 * one data-driven reveal (bars), and one UI indicator (progress).
 */
export function MotionRoot() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduce.matches) {
      root.classList.remove("js");
      return;
    }

    // Header shadow on scroll
    const header = document.querySelector(".site-header");
    const onScroll = () => {
      if (header) header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Skip work without an observer
    if (!("IntersectionObserver" in window)) {
      root.classList.remove("js");
      return;
    }

    const observed = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observed.add(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );

    document.querySelectorAll("[data-bar], [data-reveal]").forEach((el) => observer.observe(el));

    const onMotionChange = () => {
      if (reduce.matches) {
        root.classList.remove("js");
        document.querySelectorAll("[data-reveal], [data-bar]").forEach((el) => el.classList.add("is-in"));
        observer.disconnect();
      }
    };
    reduce.addEventListener("change", onMotionChange);

    return () => {
      window.removeEventListener("scroll", onScroll);
      reduce.removeEventListener("change", onMotionChange);
      observer.disconnect();
    };
  }, []);

  return null;
}
