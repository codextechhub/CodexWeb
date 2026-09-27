import { useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import MarketingHeader from "../../components/MarketingHeader";
import MarketingFooter from "../../components/MarketingFooter";
import { ArrowIcon, Reveal } from "../../components/shared/ui";
import { BLOG_CTA, BLOG_HERO, CATEGORIES, POSTS, type Category } from "./content";
import { PostCard, PostCover, PostMeta } from "./parts";
import "../../components/shared/shared.css";
import "./blog.css";
import { PAGE_TITLES, usePageTitle } from "../../pageTitles";

/**
 * The CodeX blog index, top to bottom:
 *
 *   Hero      – title over the blue grid
 *   Filters   – category chips
 *   Featured  – the big card (only when "All" is selected)
 *   Grid      – every other post
 *   Cta       – contact CodeX
 *
 * ✏️ Posts and page text: ./content.ts
 * ✏️ Styles:              ./blog.css
 */
export default function BlogPage() {
  // ✏️ Browser tab name — edit it in src/pageTitles.ts
  usePageTitle(PAGE_TITLES.blog);

  const [filter, setFilter] = useState<Category | "All">("All");

  const featured = POSTS.find((p) => p.featured) ?? POSTS[0];
  const showFeatured = filter === "All" && !!featured;
  const posts = POSTS.filter((p) => (filter === "All" ? p !== featured : p.category === filter));

  // Only offer the categories that actually have posts.
  const categories = CATEGORIES.filter((c) => POSTS.some((p) => p.category === c));

  return (
    <div className="site-page blog">
      <MarketingHeader active="/blog" />
      <main>
        <section className="blog-hero">
          <div className="blog-hero-glow" aria-hidden="true" />
          <div className="blog-hero-grid" aria-hidden="true" />
          <div className="container blog-hero-inner">
            <p className="eyebrow load-in">
              <span className="eyebrow-line" />
              {BLOG_HERO.eyebrow}
              <span className="eyebrow-line" />
            </p>
            <h1>
              <span className="load-in" style={{ "--delay": "100ms" } as CSSProperties}>
                {BLOG_HERO.title}
              </span>{" "}
              <em className="load-in" style={{ "--delay": "220ms" } as CSSProperties}>
                {BLOG_HERO.titleAccent}
              </em>
            </h1>
            <p className="blog-hero-body load-in" style={{ "--delay": "340ms" } as CSSProperties}>
              {BLOG_HERO.body}
            </p>

            <div className="blog-filters load-in" role="group" aria-label="Filter posts by topic" style={{ "--delay": "440ms" } as CSSProperties}>
              {(["All", ...categories] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`blog-filter${filter === c ? " is-active" : ""}`}
                  aria-pressed={filter === c}
                  onClick={() => setFilter(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="blog-list">
          <div className="container">
            {showFeatured && (
              <Reveal>
                <Link to={`/blog/${featured.slug}`} className="post-featured">
                  <PostCover cover={featured.cover} eager />
                  <div className="post-featured-body">
                    <span className="post-featured-label">Featured</span>
                    <PostMeta post={featured} />
                    <h2>{featured.title}</h2>
                    <p className="post-featured-excerpt">{featured.excerpt}</p>
                    <span className="post-card-more">
                      Read article
                      <ArrowIcon />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )}

            {posts.length > 0 ? (
              <div className="post-grid" key={filter}>
                {posts.map((post, i) => (
                  <Reveal key={post.slug} delay={(i % 3) * 90}>
                    <PostCard post={post} />
                  </Reveal>
                ))}
              </div>
            ) : (
              !showFeatured && <p className="blog-empty">No posts in this topic yet — check back soon.</p>
            )}
          </div>
        </section>

        <section className="blog-cta-wrap">
          <div className="container">
            <Reveal className="blog-cta">
              <div className="blog-cta-grid" aria-hidden="true" />
              <h2>{BLOG_CTA.title}</h2>
              <p>{BLOG_CTA.body}</p>
              <Link to={BLOG_CTA.href} className="btn btn-light">
                {BLOG_CTA.label}
                <ArrowIcon />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <MarketingFooter page="blog" />
    </div>
  );
}
