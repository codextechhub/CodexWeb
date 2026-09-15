import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HOME_MARKUP } from "./homeMarkup";
import { initHomeBehavior } from "./homeBehavior";
import "./home.css";

/**
 * The CodeX home page, reproduced exactly from the Claude Design artifact:
 * https://claude.ai/artifact/3NLBofAbxzwKMX8Za3z5r9
 *
 * The markup is rendered verbatim (captured from the artifact's live DOM)
 * rather than hand-converted to JSX, so the design matches pixel-for-pixel.
 * `homeBehavior.ts` is a scoped port of the artifact's own interaction
 * script and drives the sticky nav, animated stat cards, capability
 * marquee, scroll reveals, and demo-form validation.
 */
export default function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!rootRef.current) return;
    return initHomeBehavior(rootRef.current);
  }, []);

  // The markup's internal nav/footer links point at site-relative paths
  // (e.g. "/products"). Intercept those so navigation stays client-side
  // instead of doing a full page reload; same-page "#" anchors and
  // external links pass through untouched.
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (e.target as HTMLElement).closest("a");
    if (!anchor) return;
    const href = anchor.getAttribute("href") || "";
    if (href.startsWith("/")) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <div
      ref={rootRef}
      onClick={handleClick}
      dangerouslySetInnerHTML={{ __html: HOME_MARKUP }}
    />
  );
}
