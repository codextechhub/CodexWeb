import { Link } from "react-router-dom";
import { ArrowIcon, DisciplineIcon } from "../../components/shared/ui";
import { formatDate, type Cover, type Post } from "./content";

/** A post's cover: its screenshot, or the drawn blue-grid cover. */
export function PostCover({ cover, eager = false }: { cover: Cover; eager?: boolean }) {
  if (cover.kind === "image") {
    return (
      <div className="post-cover is-image">
        <img src={cover.src} alt={cover.alt} loading={eager ? "eager" : "lazy"} decoding="async" />
      </div>
    );
  }
  return (
    <div className={`post-cover is-pattern tone-${cover.tone}`} aria-hidden="true">
      <span className="post-cover-grid" />
      <span className="post-cover-glow" />
      <span className="post-cover-icon">
        <DisciplineIcon name={cover.icon} />
      </span>
    </div>
  );
}

/** "Governance · 4 September 2026 · 5 min read" */
export function PostMeta({ post, showCategory = true }: { post: Post; showCategory?: boolean }) {
  return (
    <p className="post-meta">
      {showCategory && <span className="post-tag">{post.category}</span>}
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span className="post-meta-dot" aria-hidden="true" />
      <span>{post.readMinutes} min read</span>
    </p>
  );
}

/** The card used in the /blog grid and under each post. */
export function PostCard({ post }: { post: Post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="post-card">
      <PostCover cover={post.cover} />
      <div className="post-card-body">
        <PostMeta post={post} />
        <h3>{post.title}</h3>
        <p className="post-card-excerpt">{post.excerpt}</p>
        <span className="post-card-more">
          Read article
          <ArrowIcon />
        </span>
      </div>
    </Link>
  );
}
