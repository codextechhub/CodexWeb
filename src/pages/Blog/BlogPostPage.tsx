import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link, useParams } from "react-router-dom";
import MarketingHeader from "../../components/MarketingHeader";
import MarketingFooter from "../../components/MarketingFooter";
import { ArrowIcon, Reveal } from "../../components/shared/ui";
import NotFoundPage from "../NotFound/NotFoundPage";
import { BLOG_CTA, POSTS, getPost, type Block } from "./content";
import { PostCard, PostCover, PostMeta } from "./parts";
import "../../components/shared/shared.css";
import "./blog.css";
import { PAGE_TITLES, usePageTitle } from "../../pageTitles";

/**
 * One blog post at /blog/<slug>: header over the blue grid, cover,
 * the article, then three more posts to read.
 * ✏️ Post text lives in ./content.ts.
 */
export default function BlogPostPage() {
  const { slug = "" } = useParams();
  const post = getPost(slug);
  usePageTitle(post ? `${post.title} — CodeX` : PAGE_TITLES.notFound);

  if (!post) return <NotFoundPage />;

  // Same topic first, then the newest of the rest.
  const more = [
    ...POSTS.filter((p) => p !== post && p.category === post.category),
    ...POSTS.filter((p) => p !== post && p.category !== post.category),
  ].slice(0, 3);

  return (
    <div className="site-page blog">
      <ReadingProgress />
      <MarketingHeader active="/blog" />
      <main>
        <section className="article-hero">
          <div className="blog-hero-glow" aria-hidden="true" />
          <div className="blog-hero-grid" aria-hidden="true" />
          <div className="container article-head">
            <Link to="/blog" className="article-back load-in">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M11 18l-6-6 6-6" />
              </svg>
              All posts
            </Link>
            <div className="load-in" style={{ "--delay": "80ms" } as CSSProperties}>
              <PostMeta post={post} />
            </div>
            <h1 className="load-in" style={{ "--delay": "160ms" } as CSSProperties}>
              {post.title}
            </h1>
            <p className="article-lede load-in" style={{ "--delay": "240ms" } as CSSProperties}>
              {post.excerpt}
            </p>
            <div className="article-byline load-in" style={{ "--delay": "320ms" } as CSSProperties}>
              <span className="article-avatar" aria-hidden="true">
                <svg width="18" height="15" viewBox="0 0 30 25" fill="currentColor">
                  <path d="M13.9493 14.0612C17.6443 8.2554 19.9781 5.27429 24.9001 0.372653C22.2283 -0.771525 20.3744 0.615508 16.5566 5.97844L11.8634 13.4094L6.77909 11.845C4.19062 11.2553 2.74787 10.8566 0 11.4539C4.25594 12.6334 6.59352 13.4114 10.5597 15.3649C7.42046 19.5739 5.37817 21.5893 1.04294 24.2298C3.51963 24.9652 4.89632 24.7958 7.30056 22.9261C9.57745 20.8802 10.8378 19.256 12.9063 16.5382C17.1978 19.0111 19.6243 20.6002 23.8572 22.4047C26.5897 22.9516 27.7376 22.8718 29.0719 21.4921C23.2733 19.015 19.927 17.3396 13.9493 14.0612Z" />
                  <path d="M22.5535 10.1503C19.5947 11.5749 17.9464 12.4495 14.9922 14.322L16.8174 15.3649C21.2796 12.4323 23.8297 11.0245 28.42 8.71626C26.3014 8.75601 25.015 9.05585 22.5535 10.1503Z" />
                </svg>
              </span>
              <span>
                <strong>{post.author}</strong>
                <span className="article-byline-sub">CodeX Technologies</span>
              </span>
              <CopyLinkButton />
            </div>
          </div>
        </section>

        <div className="container article-cover load-in" style={{ "--delay": "400ms" } as CSSProperties}>
          <PostCover cover={post.cover} eager />
        </div>

        <article className="container prose">
          {post.body.map((block, i) => (
            <BlockView key={i} block={block} />
          ))}
          <div className="article-end">
            <span aria-hidden="true" />
            <Link to="/blog" className="article-back">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M11 18l-6-6 6-6" />
              </svg>
              Back to all posts
            </Link>
          </div>
        </article>

        {more.length > 0 && (
          <section className="blog-more">
            <div className="container">
              <Reveal>
                <p className="eyebrow">
                  <span className="eyebrow-line" />
                  Keep reading
                </p>
              </Reveal>
              <div className="post-grid">
                {more.map((p, i) => (
                  <Reveal key={p.slug} delay={i * 90}>
                    <PostCard post={p} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

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

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "quote":
      return (
        <blockquote>
          <p>{block.text}</p>
        </blockquote>
      );
    case "list":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    default:
      return <p>{block.text}</p>;
  }
}

/** Thin brand-blue bar across the top that fills as you read. */
function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      barRef.current?.style.setProperty("transform", `scaleX(${p})`);
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
  }, []);

  return <div ref={barRef} className="reading-progress" aria-hidden="true" />;
}

function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch {
      // Clipboard can be blocked (e.g. insecure origin); nothing else to do.
    }
  };

  return (
    <button type="button" className="article-share" onClick={copy} aria-live="polite">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {copied ? (
          <path d="m5 12.5 4.5 4.5L19 7.5" />
        ) : (
          <>
            <path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1" />
            <path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1" />
          </>
        )}
      </svg>
      {copied ? "Link copied" : "Copy link"}
    </button>
  );
}
