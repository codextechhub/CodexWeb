import { GALLERY } from "../content";
import { Reveal } from "../../../components/shared/ui";

/**
 * "Inside the work" — a slow, endless strip of XVS screenshots.
 * Hovering pauses it. The list is rendered twice for a seamless loop.
 */
export default function Gallery() {
  const loop = [...GALLERY.images, ...GALLERY.images];

  return (
    <section className="section about-gallery">
      <div className="container">
        <Reveal className="gallery-heading">
          <h2>{GALLERY.title}</h2>
          <p>{GALLERY.body}</p>
        </Reveal>
      </div>
      <div className="gallery-strip">
        <div className="gallery-track">
          {loop.map((img, i) => (
            <figure key={i} className="gallery-item" aria-hidden={i >= GALLERY.images.length}>
              <img src={img.src} alt={img.caption} width={1600} height={1000} loading="lazy" decoding="async" />
              <figcaption>{img.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
