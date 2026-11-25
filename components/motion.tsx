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

    // Figures count up when their figure arrives. The server renders the final
    // value, so no JS, no observer, or reduced motion all show the true number.
    const countUp = (el: HTMLElement) => {
      const target = Number(el.dataset.count);
      if (!Number.isFinite(target)) return;
      const prefix = el.dataset.prefix ?? "";
      const suffix = el.dataset.suffix ?? "";
      const started = performance.now();
      const frame = (now: number) => {
        const progress = Math.min(1, (now - started) / 850);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = prefix + Math.round(target * eased).toLocaleString("en-US") + suffix;
        if (progress < 1) requestAnimationFrame(frame);
        else el.textContent = prefix + target.toLocaleString("en-US") + suffix;
      };
      requestAnimationFrame(frame);
    };

    const reveal = (el: Element) => {
      el.classList.add("is-in");
      el.querySelectorAll<HTMLElement>("[data-count]").forEach((node, index) => {
        window.setTimeout(() => countUp(node), index * 90);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );

    document.querySelectorAll(".data-reveal, [data-bar]").forEach((el) => observer.observe(el));

    const onMotionChange = () => {
      if (reduce.matches) {
        root.classList.remove("js");
        document.querySelectorAll(".data-reveal, [data-bar]").forEach((el) => el.classList.add("is-in"));
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
