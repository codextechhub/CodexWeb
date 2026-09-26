import { useEffect, useRef, useState } from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Returns `[ref, inView]`. `inView` flips to true the first time the element
 * scrolls into view and stays true (used for reveals and count-ups).
 */
export function useInView<T extends HTMLElement>(rootMargin = "0px 0px -12% 0px") {
  const ref = useRef<T | null>(null);
  // With reduced motion, everything counts as already visible.
  const [inView, setInView] = useState(prefersReducedMotion);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [rootMargin, inView]);

  return [ref, inView] as const;
}

/**
 * Writes how far the whole page has scrolled (0 → 1 over `distance` px)
 * to the CSS variable `--page-scroll` on the element. Handy for hero
 * effects that should play out during the first screenful of scrolling.
 */
export function usePageScroll<T extends HTMLElement>(distance = 600) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (prefersReducedMotion()) {
      node.style.setProperty("--page-scroll", "0");
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      node.style.setProperty("--page-scroll", Math.min(1, window.scrollY / distance).toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [distance]);

  return ref;
}

/**
 * Writes the element's scroll progress (0 → 1) to the CSS variable
 * `--progress` on that element. Writing a CSS variable (instead of React
 * state) keeps scrolling smooth.
 *
 * mode "through": 0 = element top reaches the bottom of the viewport,
 *                 1 = element bottom reaches `endAt` of the viewport height.
 * mode "sticky":  0 = element top reaches the top of the viewport,
 *                 1 = element bottom reaches the bottom of the viewport
 *                 (use on a tall wrapper around a position:sticky child).
 */
export function useScrollProgress<T extends HTMLElement>(mode: "through" | "sticky" = "through", endAt = 0.5) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (prefersReducedMotion()) {
      node.style.setProperty("--progress", "1");
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = mode === "sticky" ? 0 : vh;
      const end = mode === "sticky" ? vh - rect.height : vh * endAt - rect.height;
      const p = start === end ? 1 : (start - rect.top) / (start - end);
      node.style.setProperty("--progress", Math.min(1, Math.max(0, p)).toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [mode, endAt]);

  return ref;
}
