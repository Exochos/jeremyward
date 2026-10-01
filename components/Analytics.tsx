"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { track } from "@/lib/analytics";

const SCROLL_MARKS = [25, 50, 75, 100];

/**
 * Collects: page views, clicks on [data-track] elements, scroll depth,
 * which [data-section] blocks were seen, and time on page.
 */
export function Analytics() {
  const pathname = usePathname();

  // Per-page tracking: page view, scroll depth, section views
  useEffect(() => {
    track("pageview", {
      path: pathname,
      referrer: document.referrer || undefined,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      language: navigator.language,
    });

    const reached = new Set<number>();
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max <= 0 ? 100 : (window.scrollY / max) * 100;
      for (const mark of SCROLL_MARKS) {
        if (pct >= mark && !reached.has(mark)) {
          reached.add(mark);
          track("scroll_depth", { path: pathname, depth: mark });
        }
      }
    };

    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const section = (entry.target as HTMLElement).dataset.section;
          if (entry.isIntersecting && section && !seen.has(section)) {
            seen.add(section);
            track("section_view", { path: pathname, section });
          }
        }
      },
      { threshold: 0.4 },
    );
    document.querySelectorAll("[data-section]").forEach((el) => observer.observe(el));

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [pathname]);

  // Global tracking: clicks and engagement time
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (el) track("click", { path: location.pathname, target: el.dataset.track });
    };

    let visibleSince = performance.now();
    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        track("engagement", {
          path: location.pathname,
          seconds: Math.round((performance.now() - visibleSince) / 1000),
        });
      } else {
        visibleSince = performance.now();
      }
    };

    document.addEventListener("click", onClick);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return null;
}
