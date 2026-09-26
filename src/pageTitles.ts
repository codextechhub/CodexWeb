import { useEffect } from "react";

/**
 * ─────────────────────────────────────────────────────────────
 *  BROWSER TAB NAMES
 *  ✏️ Edit the text below to change what shows in the browser tab
 *     (and in Google results / bookmarks) for each page.
 *
 *  Each page picks its title with `usePageTitle(PAGE_TITLES.xxx)`
 *  near the top of its component, e.g. src/pages/About/AboutPage.tsx.
 *  To add a page: add a line here, then call usePageTitle in that page.
 *
 *  The fallback title (before the app loads) is the <title> tag in
 *  /index.html — keep it the same as `home` below.
 * ─────────────────────────────────────────────────────────────
 */
export const PAGE_TITLES = {
  home: "CodeX — Data solutions for organizations",
  products: "Products — CodeX",
  about: "About — CodeX",
  contact: "Contact — CodeX",
  xvs: "XVS — School management platform | CodeX",
  notFound: "Page not found — CodeX",
};

/** Sets the browser tab name while the page is open. */
export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
