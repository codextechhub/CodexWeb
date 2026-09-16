import { useEffect, useRef } from "react";

/**
 * Fades + lifts an element in the first time it scrolls into view, matching
 * the CodeX design's `data-reveal` sections. No-ops for elements already in
 * the initial viewport, and is skipped entirely under reduced-motion.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.08) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (node.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    node.style.opacity = "0";
    node.style.transform = "translateY(22px)";
    node.style.transition =
      "opacity 520ms cubic-bezier(.16,1,.3,1), transform 560ms cubic-bezier(.16,1,.3,1)";

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          node.style.opacity = "1";
          node.style.transform = "none";
          io.unobserve(node);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [threshold]);

  return ref;
}
