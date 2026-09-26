import MarketingHeader from "../../components/MarketingHeader";
import MarketingFooter from "../../components/MarketingFooter";
import Hero from "./sections/Hero";
import Mission from "./sections/Mission";
import Story from "./sections/Story";
import Engage from "./sections/Engage";
import Values from "./sections/Values";
import Team from "./sections/Team";
import Gallery from "./sections/Gallery";
import Cta from "./sections/Cta";
import "../../components/shared/shared.css";
import "./about.css";
import { PAGE_TITLES, usePageTitle } from "../../pageTitles";

/**
 * The CodeX About page, top to bottom:
 *
 *   Hero      – who we are + screenshot fan + quick facts
 *   Mission   – mission & vision cards
 *   Story     – 01 · how we got here (timeline) + manifesto quote
 *   Engage    – 02 · how we work with clients
 *   Values    – 03 · governance principles (dark section)
 *   Team      – 04 · founders (optional) + functional teams
 *   Gallery   – moving strip of XVS screenshots
 *   Cta       – get in touch
 *
 * ✏️ Text & images: ./content.ts
 * ✏️ Styles:        ./about.css (same order as above)
 * ✏️ Reorder/remove a section by moving or deleting its line below.
 */
export default function AboutPage() {
  // ✏️ Browser tab name — edit it in src/pageTitles.ts
  usePageTitle(PAGE_TITLES.about);

  return (
    <div className="site-page about">
      <MarketingHeader active="/about" demoHref="/contact#form" />
      <main>
        <Hero />
        <Mission />
        <Story />
        <Engage />
        <Values />
        <Team />
        <Gallery />
        <Cta />
      </main>
      <MarketingFooter page="about" />
    </div>
  );
}
