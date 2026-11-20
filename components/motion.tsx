"use client";

import { useEffect } from "react";

/**
 * Minimal motion system.
 *
 * - Header gets a subtle shadow after 12px scroll.
 * - Data chart bars animate scale when they enter view.
 * - Reading progress shows position on article pages.
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

    // Only animate structural elements that answer a real question.
    const revealOnce = new Set<Element>();
    const onReveal = (entry: IntersectionObserverEntry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      revealOnce.add(entry.target);
    };

    const observer = new IntersectionObserver(
      (entries) => entries.forEach(onReveal),
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );

    document.querySelectorAll("[data-bar]").forEach((el) => observer.observe(el));

    const onMotionChange = () => {
      if (reduce.matches) {
        root.classList.remove("js");
        document.querySelectorAll("[data-bar]").forEach((el) => el.classList.add("is-in"));
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
