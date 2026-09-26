import MarketingHeader from "../../components/MarketingHeader";
import MarketingFooter from "../../components/MarketingFooter";
import { PAGE_TITLES, usePageTitle } from "../../pageTitles";
import Hero from "./sections/Hero";
import Flagship from "./sections/Flagship";
import Areas from "./sections/Areas";
import Foundation from "./sections/Foundation";
import Roadmap from "./sections/Roadmap";
import Cta from "./sections/Cta";
import "../../components/shared/shared.css";
import "./products.css";

/**
 * The CodeX Products page, top to bottom:
 *
 *   Hero        – "Few products. Built deep." + live / in-development counts
 *   Flagship    – the XVS showcase card (dark, with screenshots)
 *   Areas       – "Inside XVS" bento grid, one card per operating area
 *   Foundation  – the governance layer under every module
 *   Roadmap     – products in development + "tell us" card
 *   Cta         – book a demo
 *
 * ✏️ Text, tags & images: ./content.ts
 * ✏️ Styles:              ./products.css (same order as above)
 * ✏️ Reorder/remove a section by moving or deleting its line below.
 */
export default function ProductsPage() {
  // ✏️ Browser tab name — edit it in src/pageTitles.ts
  usePageTitle(PAGE_TITLES.products);

  return (
    <div className="site-page products">
      <MarketingHeader active="/products" />
      <main>
        <Hero />
        <Flagship />
        <Areas />
        <Foundation />
        <Roadmap />
        <Cta />
      </main>
      <MarketingFooter page="products" />
    </div>
  );
}
