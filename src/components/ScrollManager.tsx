import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * Controls where the page is scrolled after every link click.
 *
 *  - Link to a page            (e.g. "/products")     → starts at the top
 *  - Link to a spot on a page  (e.g. "/contact#form") → jumps to the element
 *                                                        with that id
 *  - Browser Back / Forward                            → left to the browser
 *
 * Without this, a single-page app keeps the old scroll position, so a
 * footer link would open the next page already scrolled to the bottom.
 *
 * ✏️ To link straight to a section, give the section an `id` and link to
 *    "/page#that-id". Use CSS `scroll-margin-top` on the target so it
 *    isn't hidden under the sticky header.
 */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const navigationType = useNavigationType();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    const isFirstLoad = lastPath.current === null;
    const samePage = lastPath.current === pathname;
    lastPath.current = pathname;

    // Back/Forward: let the browser restore where the visitor was.
    if (navigationType === "POP" && !isFirstLoad) return;

    if (!hash) {
      if (!isFirstLoad) window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    // Wait one frame so the new page has rendered before looking for the id.
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) {
        window.scrollTo({ top: 0, behavior: "instant" });
        return;
      }
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // Glide when moving within the same page; jump when arriving from another page.
      target.scrollIntoView({ behavior: samePage && !reduceMotion ? "smooth" : "instant", block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key, navigationType]);

  return null;
}
