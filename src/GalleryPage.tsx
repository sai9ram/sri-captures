import { useState, useEffect, useCallback } from "react";
import "./gallery.css";


export type GalleryCategory =
  | "all"
  | "weddings"
  | "candid"
  | "couples"
  | "bridal"
  | "rituals";

export interface GalleryItem {
  id: string;
  src: string;
  fullSrc: string;
  category: GalleryCategory;
  archiveNo: string;
  title: string;
  subtitle: string;
  orientation: "landscape" | "portrait" | "square";
  featured?: boolean;
}

/* ── Section 1 Hero Photos ────────────────────────────────────────── */
const HERO_HERO = "/images/IMG_8236.JPG";
const HERO_THUMB_1 = "/images/IMG_8246.JPG";
const HERO_THUMB_2 = "/images/IMG_8241.JPG";

/* ── Section 3 Archive Collection ─────────────────────────────────── */
export const ARCHIVE_COLLECTION: GalleryItem[] = [
  {
    id: "arch-01",
    src: "/images/IMG_8274.JPG",
    fullSrc: "/images/IMG_8274.JPG",
    category: "weddings",
    archiveNo: "ARCHIVE 001",
    title: "Vedic Union",
    subtitle: "Floral Garlands & Traditional Splendour",
    orientation: "portrait",
    featured: true,
  },
  {
    id: "arch-02",
    src: "/images/IMG_8246.JPG",
    fullSrc: "/images/IMG_8246.JPG",
    category: "bridal",
    archiveNo: "ARCHIVE 002",
    title: "The Regal Bride",
    subtitle: "Heritage Silk & Temple Gold Jewels",
    orientation: "portrait",
    featured: true,
  },
  {
    id: "arch-03",
    src: "/images/IMG_8258.JPG",
    fullSrc: "/images/IMG_8258.JPG",
    category: "couples",
    archiveNo: "ARCHIVE 003",
    title: "Quiet Reverie",
    subtitle: "Forehead to Forehead, Timeless Bond",
    orientation: "portrait",
  },
  {
    id: "arch-04",
    src: "/images/IMG_8235.JPG",
    fullSrc: "/images/IMG_8235.JPG",
    category: "weddings",
    archiveNo: "ARCHIVE 004",
    title: "Mandap Chronicles",
    subtitle: "Grandeur of Telugu Wedding Ceremonies",
    orientation: "square",
    featured: true,
  },
  {
    id: "arch-05",
    src: "/images/IMG_8241.JPG",
    fullSrc: "/images/IMG_8241.JPG",
    category: "couples",
    archiveNo: "ARCHIVE 005",
    title: "Temple Steps & Warm Sunlight",
    subtitle: "Srikanth & Nikitha Pre-Wedding Chapter",
    orientation: "landscape",
  },
  {
    id: "arch-06",
    src: "/images/IMG_8253.JPG",
    fullSrc: "/images/IMG_8253.JPG",
    category: "candid",
    archiveNo: "ARCHIVE 006",
    title: "Haldi Celebrations",
    subtitle: "Pure Spontaneous Joy & Yellow Petals",
    orientation: "square",
  },
  {
    id: "arch-07",
    src: "/images/241512d0-4bb2-4d3f-bc6a-e6a7ddb2e983.JPG",
    fullSrc: "/images/241512d0-4bb2-4d3f-bc6a-e6a7ddb2e983.JPG",
    category: "rituals",
    archiveNo: "ARCHIVE 007",
    title: "Henna & Solitaire",
    subtitle: "Intricate Mehndi Patterns & The Promise Ring",
    orientation: "portrait",
  },
  {
    id: "arch-08",
    src: "/images/IMG_8234.JPG",
    fullSrc: "/images/IMG_8234.JPG",
    category: "couples",
    archiveNo: "ARCHIVE 008",
    title: "Crimson Twilight",
    subtitle: "Warm Bokeh & Cinematic Emotion",
    orientation: "portrait",
    featured: true,
  },
  {
    id: "arch-09",
    src: "/images/IMG_8247.JPG",
    fullSrc: "/images/IMG_8247.JPG",
    category: "bridal",
    archiveNo: "ARCHIVE 009",
    title: "The Radiant Smile",
    subtitle: "The Unmatched Charm of the South Indian Bride",
    orientation: "portrait",
  },
  {
    id: "arch-10",
    src: "/images/IMG_8260.JPG",
    fullSrc: "/images/IMG_8260.JPG",
    category: "rituals",
    archiveNo: "ARCHIVE 010",
    title: "Silhouette Exchange",
    subtitle: "Illuminated Ring Moment in Dusk Shadows",
    orientation: "square",
  },
  {
    id: "arch-11",
    src: "/images/IMG_8238.JPG",
    fullSrc: "/images/IMG_8238.JPG",
    category: "couples",
    archiveNo: "ARCHIVE 011",
    title: "Eternal Monolith",
    subtitle: "Fine-Art Monochrome Pre-Wedding Story",
    orientation: "portrait",
  },
  {
    id: "arch-12",
    src: "/images/IMG_8249.JPG",
    fullSrc: "/images/IMG_8249.JPG",
    category: "candid",
    archiveNo: "ARCHIVE 012",
    title: "Unfiltered Bliss",
    subtitle: "Shared Whispers and Authentic Laughter",
    orientation: "landscape",
  },
  {
    id: "arch-13",
    src: "/images/IMG_8273.WEBP",
    fullSrc: "/images/IMG_8273.WEBP",
    category: "bridal",
    archiveNo: "ARCHIVE 013",
    title: "Archana — Editorial Portrait",
    subtitle: "Timeless Bridal Grace in Black & White",
    orientation: "portrait",
  },
  {
    id: "arch-14",
    src: "/images/IMG_8254.JPG",
    fullSrc: "/images/IMG_8254.JPG",
    category: "candid",
    archiveNo: "ARCHIVE 014",
    title: "Tender Glances",
    subtitle: "Heartwarming Moments with Close Ones",
    orientation: "square",
  },
  {
    id: "arch-15",
    src: "/images/IMG_8239.JPG",
    fullSrc: "/images/IMG_8239.JPG",
    category: "couples",
    archiveNo: "ARCHIVE 015",
    title: "Modern Day Romance",
    subtitle: "Urban Lifestyle & Candid Chemistry",
    orientation: "square",
  },
  {
    id: "arch-16",
    src: "/images/IMG_8236.JPG",
    fullSrc: "/images/IMG_8236.JPG",
    category: "weddings",
    archiveNo: "ARCHIVE 016",
    title: "The Royal Entrance",
    subtitle: "Spectacular Arrival Under the Chhatri",
    orientation: "portrait",
  },
  {
    id: "arch-17",
    src: "/images/IMG_8244.JPG",
    fullSrc: "/images/IMG_8244.JPG",
    category: "rituals",
    archiveNo: "ARCHIVE 017",
    title: "Sacred Jeelakarra Bellam",
    subtitle: "The Auspicious First Glimpse of Eternity",
    orientation: "landscape",
  },
];

/* ── Section 4 Contact Sheet Photos ───────────────────────────────── */
const CONTACT_SHEET_PHOTOS = [
  {
    src: "/images/IMG_8274.JPG",
    fullSrc: "/images/IMG_8274.JPG",
    caption: "Green mandap, garlands & joy",
    tag: "UNPLANNED #01",
  },
  {
    src: "/images/IMG_8258.JPG",
    fullSrc: "/images/IMG_8258.JPG",
    caption: "Foreheads together, forever",
    tag: "UNPLANNED #02",
  },
  {
    src: "/images/241512d0-4bb2-4d3f-bc6a-e6a7ddb2e983.JPG",
    fullSrc: "/images/241512d0-4bb2-4d3f-bc6a-e6a7ddb2e983.JPG",
    caption: "Mehndi hands & the ring of love",
    tag: "UNPLANNED #03",
  },
  {
    src: "/images/IMG_8260.JPG",
    fullSrc: "/images/IMG_8260.JPG",
    caption: "Ring exchange · silhouette magic",
    tag: "UNPLANNED #04",
  },
];

/* ── Section 5 Featured Stories ───────────────────────────────────── */
const FEATURED_STORIES = [
  {
    id: "story-traditional",
    title: "A Traditional Telugu Wedding",
    categoryKey: "weddings" as GalleryCategory,
    label: "Floral Mandap · Sacred Vedic Rituals · Silk & Gold",
    coverImg: "/images/IMG_8235.JPG",
    aspect: "tall",
  },
  {
    id: "story-intimate",
    title: "Bridal Portraits",
    categoryKey: "bridal" as GalleryCategory,
    label: "Heritage Venue · Golden Jewellery & Mehndi",
    coverImg: "/images/IMG_8246.JPG",
    aspect: "wide",
  },
  {
    id: "story-destination",
    title: "Pre-Wedding Stories",
    categoryKey: "couples" as GalleryCategory,
    label: "Open Skies · Temple Steps & City Cafés",
    coverImg: "/images/IMG_8241.JPG",
    aspect: "tall",
  },
];

/* ── Section 6 Closing Photo ──────────────────────────────────────── */
const CTA_CLOSING_PHOTO = "/images/IMG_8244.JPG";

interface GalleryPageProps {
  onOpenInquiry: () => void;
}

export default function GalleryPage({ onOpenInquiry }: GalleryPageProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  /* Scroll reveal observer */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("gal-visible");
          }
        });
      },
      { threshold: 0.08 }
    );

    document.querySelectorAll(".gal-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeCategory]);

  /* Filtered items */
  const visibleItems =
    activeCategory === "all"
      ? ARCHIVE_COLLECTION
      : ARCHIVE_COLLECTION.filter((item) => item.category === activeCategory);

  /* Lightbox keyboard navigation */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % visibleItems.length : 0
        );
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + visibleItems.length) % visibleItems.length : 0
        );
      }
    },
    [lightboxIndex, visibleItems.length]
  );

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, handleKeyDown]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = () => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % visibleItems.length : 0
    );
  };

  const prevLightbox = () => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + visibleItems.length) % visibleItems.length : 0
    );
  };

  const scrollToGallery = () => {
    document.getElementById("gal-collection-anchor")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleStoryClick = (categoryKey: GalleryCategory) => {
    setActiveCategory(categoryKey);
    scrollToGallery();
  };

  return (
    <main className="gallery-page" aria-label="SRI CAPTURES - Wedding Photography Archive">
      {/* ───────────────────────────────────────────────────────────
          SECTION 1 — THE WEDDING ARCHIVE
         ─────────────────────────────────────────────────────────── */}
      <section className="gal-hero" id="gal-archive" aria-labelledby="gal-hero-title">
        <div className="gal-container">
          <div className="gal-hero__top gal-reveal">
            <span className="gal-eyebrow">THE SRI CAPTURES ARCHIVE</span>
            <h1 id="gal-hero-title" className="gal-hero__heading">
              A thousand feelings.<br />
              <em>A lifetime of frames.</em>
            </h1>
            <p className="gal-hero__sub">
              Every celebration leaves behind moments worth returning to.
            </p>
          </div>

          <div className="gal-hero__journal gal-reveal">
            {/* Main large offset photograph */}
            <figure className="gal-hero__feature">
              <div className="gal-hero__mask">
                <img
                  src={HERO_HERO}
                  alt="Bride and groom at a traditional Indian wedding ceremony"
                />
              </div>
              <figcaption className="gal-hero__caption">
                <span className="gal-caption-dot" aria-hidden="true" />
                <span>WEDDINGS • PEOPLE • MOMENTS</span>
              </figcaption>
            </figure>

            {/* Two supporting journal prints along the edge */}
            <aside className="gal-hero__journal-edge">
              <figure className="gal-hero__thumb">
                <div className="gal-hero__thumb-mask">
                  <img
                    src={HERO_THUMB_1}
                    alt="Spontaneous couple laugh during traditional ceremony"
                    loading="lazy"
                  />
                </div>
                <figcaption className="gal-hero__thumb-label">
                  ARCHIVE ENTRY · I
                </figcaption>
              </figure>

              <figure className="gal-hero__thumb">
                <div className="gal-hero__thumb-mask">
                  <img
                    src={HERO_THUMB_2}
                    alt="Serene bridal portrait in gold and silk"
                    loading="lazy"
                  />
                </div>
                <figcaption className="gal-hero__thumb-label">
                  ARCHIVE ENTRY · II
                </figcaption>
              </figure>
            </aside>
          </div>
        </div>

        {/* Archival ornamental divider */}
        <div className="gal-ornament" aria-hidden="true">
          <span /><i>&#9670;</i><span />
        </div>
      </section>

      {/* Anchor for smooth scroll */}
      <div id="gal-collection-anchor" />

      {/* ───────────────────────────────────────────────────────────
          SECTION 2 — EXPLORE BY COLLECTION
         ─────────────────────────────────────────────────────────── */}
      <section className="gal-selector" aria-labelledby="gal-filter-heading">
        <div className="gal-container">
          <div className="gal-selector__inner gal-reveal">
            <h2 id="gal-filter-heading" className="sr-only">
              Filter Wedding Photography Collections
            </h2>

            <nav className="gal-tabs" aria-label="Collections filter">
              {[
                { key: "all", label: "All Stories" },
                { key: "weddings", label: "Weddings" },
                { key: "candid", label: "Candid Moments" },
                { key: "couples", label: "Couple Portraits" },
                { key: "bridal", label: "Bridal Portraits" },
                { key: "rituals", label: "Rituals & Details" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  className={`gal-tab-btn ${
                    activeCategory === tab.key ? "is-active" : ""
                  }`}
                  onClick={() => setActiveCategory(tab.key as GalleryCategory)}
                  aria-pressed={activeCategory === tab.key}
                >
                  <span className="gal-tab-text">{tab.label}</span>
                  {activeCategory === tab.key && (
                    <span className="gal-tab-underline" aria-hidden="true" />
                  )}
                </button>
              ))}
            </nav>

            <div className="gal-counter" aria-live="polite">
              <span>{visibleItems.length} FRAMES</span>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 3 — THE WEDDING COLLECTION (Asymmetric Editorial Grid)
         ─────────────────────────────────────────────────────────── */}
      <section className="gal-collection" aria-label="Curated Wedding Photography Archive">
        <div className="gal-container">
          <div className="gal-masonry">
            {visibleItems.map((item, idx) => (
              <article
                key={item.id}
                className={`gal-card gal-card--${item.orientation} ${
                  item.featured ? "gal-card--featured" : ""
                } gal-reveal`}
                style={{ transitionDelay: `${(idx % 6) * 0.08}s` }}
                onClick={() => openLightbox(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openLightbox(idx);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Open photo ${item.title} in lightbox`}
              >
                <div className="gal-card__img-wrap">
                  <img
                    src={item.src}
                    alt={`${item.title} - ${item.subtitle}`}
                    loading="lazy"
                  />
                  <div className="gal-card__overlay" aria-hidden="true">
                    <span className="gal-card__zoom-hint">VIEW FRAME ↗</span>
                  </div>
                </div>

                <div className="gal-card__meta">
                  <span className="gal-card__num">{item.archiveNo}</span>
                  <h3 className="gal-card__title">{item.title}</h3>
                  <p className="gal-card__subtitle">{item.subtitle}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 4 — THE MOMENTS BETWEEN
         ─────────────────────────────────────────────────────────── */}
      <section className="gal-moments" aria-labelledby="gal-moments-title">
        <div className="gal-container">
          <div className="gal-moments__header gal-reveal">
            <span className="gal-eyebrow">UNSCRIPTED & REAL</span>
            <h2 id="gal-moments-title" className="gal-moments__title">
              Not every unforgettable moment is planned.
            </h2>
            <p className="gal-moments__desc">
              The little expressions, unexpected laughter, and quiet glances often become
              the photographs families treasure most.
            </p>
          </div>

          {/* Contact-sheet sequence with generous negative space */}
          <div className="gal-sheet-grid">
            {CONTACT_SHEET_PHOTOS.map((photo, i) => (
              <figure
                key={photo.tag}
                className="gal-sheet-frame gal-reveal"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="gal-sheet-tag">
                  <span>{photo.tag}</span>
                  <span className="gal-sheet-perforations" aria-hidden="true" />
                </div>
                <div className="gal-sheet-img-wrap">
                  <img src={photo.src} alt={photo.caption} loading="lazy" />
                </div>
                <figcaption className="gal-sheet-caption">{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 5 — FEATURED WEDDING STORIES
         ─────────────────────────────────────────────────────────── */}
      <section className="gal-stories" aria-labelledby="gal-stories-title">
        <div className="gal-container">
          <div className="gal-stories__header gal-reveal">
            <span className="gal-eyebrow">CURATED CHAPTERS</span>
            <h2 id="gal-stories-title" className="gal-stories__title">
              Featured Wedding Stories
            </h2>
            <p className="gal-stories__sub">
              Explore weddings as complete, holistic celebrations held across historic temples,
              coastal shores, and heritage courtyards.
            </p>
          </div>

          <div className="gal-stories__grid">
            {FEATURED_STORIES.map((story, i) => (
              <article
                key={story.id}
                className={`gal-story-panel gal-story-panel--${story.aspect} gal-reveal`}
                style={{ transitionDelay: `${i * 0.12}s` }}
                onClick={() => handleStoryClick(story.categoryKey)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleStoryClick(story.categoryKey);
                  }
                }}
              >
                <div className="gal-story-panel__img-wrap">
                  <img src={story.coverImg} alt={story.title} loading="lazy" />
                  <div className="gal-story-panel__scrim" aria-hidden="true" />
                </div>

                <div className="gal-story-panel__info">
                  <span className="gal-story-panel__label">{story.label}</span>
                  <h3 className="gal-story-panel__title">{story.title}</h3>
                  <span className="gal-story-panel__link">
                    VIEW STORY <span aria-hidden="true">→</span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 6 — YOUR STORY BELONGS HERE
         ─────────────────────────────────────────────────────────── */}
      <section className="gal-closing" aria-labelledby="gal-closing-title">
        <div className="gal-container">
          <div className="gal-closing__layout gal-reveal">
            <div className="gal-closing__photo-wrap">
              <figure className="gal-closing__photo">
                <img
                  src={CTA_CLOSING_PHOTO}
                  alt="A couple sharing an intimate moment in wedding attires"
                  loading="lazy"
                />
                <div className="gal-closing__photo-border" aria-hidden="true" />
              </figure>
            </div>

            <div className="gal-closing__content">
              <span className="gal-eyebrow">THE NEXT STORY</span>
              <h2 id="gal-closing-title" className="gal-closing__heading">
                Perhaps your story<br />
                <em>is next.</em>
              </h2>
              <p className="gal-closing__body">
                We would love to hear about your celebration and the moments you want to remember.
                Reach out to discuss your dates and vision.
              </p>

              <button
                className="gal-cta-btn"
                onClick={onOpenInquiry}
                aria-label="Get a quote from SRI CAPTURES"
              >
                <span>GET A QUOTE</span>
                <span className="gal-cta-arrow" aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          LIGHTBOX MODAL
         ─────────────────────────────────────────────────────────── */}
      {lightboxIndex !== null && visibleItems[lightboxIndex] && (
        <div
          className="gal-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Viewing ${visibleItems[lightboxIndex].title}`}
        >
          {/* Backdrop */}
          <div className="gal-lightbox__backdrop" onClick={closeLightbox} />

          {/* Controls */}
          <div className="gal-lightbox__top-bar">
            <div className="gal-lightbox__info">
              <span className="gal-lightbox__num">
                {visibleItems[lightboxIndex].archiveNo}
              </span>
              <span className="gal-lightbox__sep">/</span>
              <span className="gal-lightbox__title">
                {visibleItems[lightboxIndex].title}
              </span>
            </div>

            <button
              className="gal-lightbox__close"
              onClick={closeLightbox}
              aria-label="Close lightbox (Esc)"
            >
              ✕
            </button>
          </div>

          {/* Previous Button */}
          <button
            className="gal-lightbox__nav-btn gal-lightbox__nav-btn--prev"
            onClick={prevLightbox}
            aria-label="Previous image (Left arrow)"
          >
            ←
          </button>

          {/* Image Display */}
          <div className="gal-lightbox__stage" onClick={closeLightbox}>
            <div
              className="gal-lightbox__img-container"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={visibleItems[lightboxIndex].fullSrc}
                alt={`${visibleItems[lightboxIndex].title} - ${visibleItems[lightboxIndex].subtitle}`}
              />
              <div className="gal-lightbox__caption">
                <p className="gal-lightbox__caption-sub">
                  {visibleItems[lightboxIndex].subtitle}
                </p>
                <span className="gal-lightbox__counter">
                  {lightboxIndex + 1} of {visibleItems.length}
                </span>
              </div>
            </div>
          </div>

          {/* Next Button */}
          <button
            className="gal-lightbox__nav-btn gal-lightbox__nav-btn--next"
            onClick={nextLightbox}
            aria-label="Next image (Right arrow)"
          >
            →
          </button>
        </div>
      )}
    </main>
  );
}
