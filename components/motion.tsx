"use client";

import { useEffect } from "react";

/**
 * Scroll and load motion for the marketing pages.
 *
 * Every animation here answers a question the visitor already has:
 * what order do I read this in, how big is that number, and how far into the
 * page am I. Nothing animates on repeat, and the whole file is inert when the
 * visitor asks for reduced motion or ships no JavaScript: content is rendered
 * in its final state by the server, and the `.js` class only arrives from the
 * inline head script, so a failed observer leaves the page fully readable.
 */
export function MotionRoot() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduce.matches) {
      root.classList.remove("js");
      return;
    }

    const header = document.querySelector(".site-header");
    const onScroll = () => {
      if (header) header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Counting numbers are announced once, then left alone.
    const countUp = (el: HTMLElement) => {
      const target = Number(el.dataset.count);
      if (!Number.isFinite(target)) return;
      const prefix = el.dataset.prefix ?? "";
      const suffix = el.dataset.suffix ?? "";
      const duration = 850;
      const started = performance.now();
      const frame = (now: number) => {
        const progress = Math.min(1, (now - started) / duration);
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

    if (!("IntersectionObserver" in window)) {
      root.classList.remove("js");
      return;
    }

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

    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));

    const onMotionChange = () => {
      if (reduce.matches) {
        root.classList.remove("js");
        document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-in"));
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
