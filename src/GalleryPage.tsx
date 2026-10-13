import { useState, useEffect, useCallback } from "react";
import "./gallery.css";

const img = (id: string, w = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=86`;

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
const HERO_HERO = img("photo-1630526720753-aa4e71acf67d", 2200);
const HERO_THUMB_1 = img("photo-1611106211090-8f3c79eb8552", 900);
const HERO_THUMB_2 = img("photo-1754782915842-aa4fca6c203a", 900);

/* ── Section 3 Archive Collection ─────────────────────────────────── */
export const ARCHIVE_COLLECTION: GalleryItem[] = [
  {
    id: "arch-01",
    src: img("photo-1630526720753-aa4e71acf67d", 1400),
    fullSrc: img("photo-1630526720753-aa4e71acf67d", 2400),
    category: "weddings",
    archiveNo: "ARCHIVE 001",
    title: "The Ceremony",
    subtitle: "Sacred Mantras & Eternal Vows",
    orientation: "portrait",
    featured: true,
  },
  {
    id: "arch-02",
    src: img("photo-1610173827002-62c0f1f05d04", 1400),
    fullSrc: img("photo-1610173827002-62c0f1f05d04", 2400),
    category: "couples",
    archiveNo: "ARCHIVE 002",
    title: "A Quiet Promise",
    subtitle: "Golden Hour in the Courtyard",
    orientation: "landscape",
  },
  {
    id: "arch-03",
    src: img("photo-1754782915842-aa4fca6c203a", 1400),
    fullSrc: img("photo-1754782915842-aa4fca6c203a", 2400),
    category: "bridal",
    archiveNo: "ARCHIVE 003",
    title: "The Solitary Gaze",
    subtitle: "Silk, Gold & Quiet Reflection",
    orientation: "portrait",
  },
  {
    id: "arch-04",
    src: img("photo-1665960213530-3fb10da1f25e", 1400),
    fullSrc: img("photo-1665960213530-3fb10da1f25e", 2400),
    category: "candid",
    archiveNo: "ARCHIVE 004",
    title: "Joy in Full Colour",
    subtitle: "Haldi Celebrations with Family",
    orientation: "square",
  },
  {
    id: "arch-05",
    src: img("photo-1599462616558-2b75fd26a283", 1400),
    fullSrc: img("photo-1599462616558-2b75fd26a283", 2400),
    category: "weddings",
    archiveNo: "ARCHIVE 005",
    title: "Tradition & Blessings",
    subtitle: "The Sacred Walk of the Pheras",
    orientation: "landscape",
    featured: true,
  },
  {
    id: "arch-06",
    src: img("photo-1679937698873-6065742c8d32", 1400),
    fullSrc: img("photo-1679937698873-6065742c8d32", 2400),
    category: "rituals",
    archiveNo: "ARCHIVE 006",
    title: "Sacred Offerings",
    subtitle: "Ancient Vedic Rituals at Sunrise",
    orientation: "portrait",
  },
  {
    id: "arch-07",
    src: img("photo-1611106211090-8f3c79eb8552", 1400),
    fullSrc: img("photo-1611106211090-8f3c79eb8552", 2400),
    category: "candid",
    archiveNo: "ARCHIVE 007",
    title: "Laughter in Harmony",
    subtitle: "Unrehearsed Shared Glee",
    orientation: "square",
  },
  {
    id: "arch-08",
    src: img("photo-1735052712464-9d24b69be5f5", 1400),
    fullSrc: img("photo-1735052712464-9d24b69be5f5", 2400),
    category: "couples",
    archiveNo: "ARCHIVE 008",
    title: "Together at Dusk",
    subtitle: "Whispers Before the Big Day",
    orientation: "landscape",
  },
  {
    id: "arch-09",
    src: img("photo-1698419193331-5b2fb90a6304", 1400),
    fullSrc: img("photo-1698419193331-5b2fb90a6304", 2400),
    category: "candid",
    archiveNo: "ARCHIVE 009",
    title: "Generations Entwined",
    subtitle: "Parents’ Warm Embrace & Blessings",
    orientation: "portrait",
  },
  {
    id: "arch-10",
    src: img("photo-1665960213508-48f07086d49c", 1400),
    fullSrc: img("photo-1665960213508-48f07086d49c", 2400),
    category: "rituals",
    archiveNo: "ARCHIVE 010",
    title: "The Holy Flame",
    subtitle: "Warm Glow of the Havan Kunda",
    orientation: "landscape",
  },
  {
    id: "arch-11",
    src: img("photo-1587271339318-2e78fdf79586", 1400),
    fullSrc: img("photo-1587271339318-2e78fdf79586", 2400),
    category: "weddings",
    archiveNo: "ARCHIVE 011",
    title: "The Eternal Tie",
    subtitle: "Sindoor & Sacred Mangalsutra",
    orientation: "portrait",
  },
  {
    id: "arch-12",
    src: img("photo-1741201864879-c5e7f81c98b0", 1400),
    fullSrc: img("photo-1741201864879-c5e7f81c98b0", 2400),
    category: "candid",
    archiveNo: "ARCHIVE 012",
    title: "Shower of Petals",
    subtitle: "Euphoria as the Knot is Tied",
    orientation: "landscape",
  },
];

/* ── Section 4 Contact Sheet Photos ───────────────────────────────── */
const CONTACT_SHEET_PHOTOS = [
  {
    src: img("photo-1698419193331-5b2fb90a6304", 1200),
    fullSrc: img("photo-1698419193331-5b2fb90a6304", 2200),
    caption: "A father's heartfelt embrace",
    tag: "UNPLANNED #01",
  },
  {
    src: img("photo-1611106211090-8f3c79eb8552", 1200),
    fullSrc: img("photo-1611106211090-8f3c79eb8552", 2200),
    caption: "Spontaneous laughter during pheras",
    tag: "UNPLANNED #02",
  },
  {
    src: img("photo-1679937698873-6065742c8d32", 1200),
    fullSrc: img("photo-1679937698873-6065742c8d32", 2200),
    caption: "Tender hands holding auspicious rice",
    tag: "UNPLANNED #03",
  },
  {
    src: img("photo-1741201864879-c5e7f81c98b0", 1200),
    fullSrc: img("photo-1741201864879-c5e7f81c98b0", 2200),
    caption: "Marigold petals dancing in the air",
    tag: "UNPLANNED #04",
  },
];

/* ── Section 5 Featured Stories ───────────────────────────────────── */
const FEATURED_STORIES = [
  {
    id: "story-traditional",
    title: "A Traditional Celebration",
    categoryKey: "weddings" as GalleryCategory,
    label: "Temple Architecture · Sacred Vedic Rituals",
    coverImg: img("photo-1630526720753-aa4e71acf67d", 1600),
    aspect: "tall",
  },
  {
    id: "story-intimate",
    title: "An Intimate Celebration",
    categoryKey: "candid" as GalleryCategory,
    label: "Heritage Courtyard · Close Family & Warmth",
    coverImg: img("photo-1698419193331-5b2fb90a6304", 1600),
    aspect: "wide",
  },
  {
    id: "story-destination",
    title: "A Coastal Union",
    categoryKey: "couples" as GalleryCategory,
    label: "Sunset Mandap · Ocean Breeze & Festivities",
    coverImg: img("photo-1610173827002-62c0f1f05d04", 1600),
    aspect: "tall",
  },
];

/* ── Section 6 Closing Photo ──────────────────────────────────────── */
const CTA_CLOSING_PHOTO = img("photo-1587271339318-2e78fdf79586", 2000);

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
