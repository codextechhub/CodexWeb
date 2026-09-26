import MarketingHeader from "../../components/MarketingHeader";
import MarketingFooter from "../../components/MarketingFooter";
import Hero from "./sections/Hero";
import Problem from "./sections/Problem";
import Disciplines from "./sections/Disciplines";
import XvsShowcase from "./sections/XvsShowcase";
import DayTimeline from "./sections/DayTimeline";
import Principles from "./sections/Principles";
import DemoForm from "./sections/DemoForm";
import "../../components/shared/shared.css";
import "./home.css";
import { PAGE_TITLES, usePageTitle } from "../../pageTitles";

/**
 * The CodeX home page, told as a story in chapters:
 *
 *   Hero          – who we are, with the XVS dashboard
 *   Problem       – 01 · the system problem institutions live with
 *   Disciplines   – 02 · what CodeX builds
 *   XvsShowcase   – 03 · the flagship product, feature by feature
 *   DayTimeline   – 04 · a school day on XVS
 *   Principles    – 05 · how we work + platform numbers
 *   DemoForm      – the call to action
 *
 * To change any text or image, edit ./content.ts.
 * To restyle, edit ./home.css (organised by section, same order as above).
 * To reorder or remove a chapter, move or delete its line below.
 */
export default function HomePage() {
  // ✏️ Browser tab name — edit it in src/pageTitles.ts
  usePageTitle(PAGE_TITLES.home);

  const scrollToDemo = () => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="site-page home">
      <MarketingHeader active="/" demoHref="#demo" onDemoClick={scrollToDemo} />
      <main>
        <Hero />
        <Problem />
        <Disciplines />
        <XvsShowcase />
        <DayTimeline />
        <Principles />
        <DemoForm />
      </main>
      <MarketingFooter page="home" />
    </div>
  );
}
