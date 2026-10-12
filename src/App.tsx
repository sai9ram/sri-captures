import { useEffect, useRef, useState } from "react";
import StoryPage from "./StoryPage";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

type Scene = {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  credit: string;
  align?: "left" | "right" | "center";
};

type GalleryImage = {
  src: string;
  couple: string;
  place: string;
};

const imageUrl = (id: string, width = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=86`;

const galleryImages: GalleryImage[] = [
  { src: imageUrl("photo-1741201864879-c5e7f81c98b0"), couple: "Priya × Arjun", place: "Tirupati · 2026" },
  { src: imageUrl("photo-1610173827002-62c0f1f05d04"), couple: "Mira × Dev", place: "Jaipur · 2025" },
  { src: imageUrl("photo-1754782915842-aa4fca6c203a"), couple: "Ananya × Karthik", place: "Chennai · 2026" },
  { src: imageUrl("photo-1679937698873-6065742c8d32"), couple: "Ishita × Rohan", place: "Bengaluru · 2025" },
  { src: imageUrl("photo-1698419193331-5b2fb90a6304"), couple: "Nila × Adi", place: "Udaipur · 2025" },
  { src: imageUrl("photo-1573951648026-fa38ff3f6770"), couple: "Leela × Vikram", place: "Hyderabad · 2024" },
  { src: imageUrl("photo-1760080903831-3cfeac3200dc"), couple: "Tara × Neel", place: "Goa · 2026" },
];

const services = [
  { name: "Wedding photography", meta: "Candid · Traditional · Editorial", image: galleryImages[0].src },
  { name: "Pre-wedding stories", meta: "Portraits · Places · People", image: imageUrl("photo-1735052712464-9d24b69be5f5") },
  { name: "Wedding films", meta: "Highlights · Feature films · Reels", image: galleryImages[2].src },
  { name: "Destination weddings", meta: "India · Worldwide", image: imageUrl("photo-1630526720753-aa4e71acf67d") },
  { name: "Intimate celebrations", meta: "Families · Rituals · Togetherness", image: imageUrl("photo-1581256163941-900dae854787") },
];

const testimonials = [
  {
    quote: "You captured moments we didn't even know were happening.",
    names: "Ananya & Karthik",
    image: galleryImages[2].src,
  },
  {
    quote: "Every photograph feels exactly like the day did—full, warm and alive.",
    names: "Priya & Arjun",
    image: galleryImages[0].src,
  },
  {
    quote: "Our families cried, laughed, and then watched it all over again.",
    names: "Mira & Dev",
    image: galleryImages[1].src,
  },
];

const processSteps = [
  ["Meet", "We begin with a conversation."],
  ["Understand", "We learn what makes your celebration yours."],
  ["Plan", "We prepare without taking away the spontaneity."],
  ["Capture", "We photograph what happens naturally."],
  ["Relive", "You receive memories you can return to."],
];

const scenes: Scene[] = [
  {
    eyebrow: "The beginning",
    title: "Stories of love,\nfamily & everything\nin between.",
    body: "Wedding stories, held with honesty and heart.",
    image:
      "https://images.unsplash.com/photo-1630526720753-aa4e71acf67d?auto=format&fit=crop&w=2200&q=88",
    credit: "Sean Williams",
    align: "center",
  },
  {
    eyebrow: "We begin with you",
    title: "Before the rituals,\nthere are two people.",
    body: "We listen first—so every frame feels unmistakably yours.",
    image:
      "https://images.unsplash.com/photo-1735052712464-9d24b69be5f5?auto=format&fit=crop&w=2200&q=88",
    credit: "iKshana Productions",
    align: "left",
  },
  {
    eyebrow: "The little things",
    title: "The moments you\nalmost miss.",
    body: "A glance across the room. A steadying hand. The quiet before everything begins.",
    image:
      "https://images.unsplash.com/photo-1611106211090-8f3c79eb8552?auto=format&fit=crop&w=2200&q=88",
    credit: "Aastha Bansal",
    align: "right",
  },
  {
    eyebrow: "When families become one",
    title: "A thousand histories,\nin a single room.",
    body: "The embraces, blessings and beautiful chaos that make a celebration feel like home.",
    image:
      "https://images.unsplash.com/photo-1665960213508-48f07086d49c?auto=format&fit=crop&w=2200&q=88",
    credit: "Arto Suraj",
    align: "left",
  },
  {
    eyebrow: "The moment",
    title: "And then,\neverything changes.",
    body: "Sacred traditions unfold. Time softens. Two lives become one.",
    image:
      "https://images.unsplash.com/photo-1599462616558-2b75fd26a283?auto=format&fit=crop&w=2200&q=88",
    credit: "Mohit Maru",
    align: "right",
  },
  {
    eyebrow: "The celebration",
    title: "Joy, in\nfull colour.",
    body: "Unscripted, unrestrained and alive—the part where everyone forgets the camera.",
    image:
      "https://images.unsplash.com/photo-1665960213530-3fb10da1f25e?auto=format&fit=crop&w=2200&q=88",
    credit: "Arto Suraj",
    align: "left",
  },
  {
    eyebrow: "Why we capture",
    title: "Because memory\nmoves quickly.",
    body: "We make photographs for the people you are today—and the family you will become.",
    image:
      "https://images.unsplash.com/photo-1587271339318-2e78fdf79586?auto=format&fit=crop&w=2200&q=88",
    credit: "Amish Thakkar",
    align: "right",
  },
  {
    eyebrow: "Your story",
    title: "Your story hasn't\nbeen written yet.",
    body: "Let's capture it together.",
    image:
      "https://images.unsplash.com/photo-1735052712489-f45220126a0c?auto=format&fit=crop&w=2200&q=88",
    credit: "iKshana Productions",
    align: "center",
  },
];

const pad = (value: number) => String(value).padStart(2, "0");

function Ornament() {
  return (
    <div className="ornament" aria-hidden="true">
      <span />
      <i>◆</i>
      <span />
    </div>
  );
}

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <p className="section-label">
      <span>{number}</span>
      {children}
    </p>
  );
}

type Page = "home" | "story";

const getPageFromHash = (): Page => {
  if (typeof window === "undefined") return "home";
  const hash = window.location.hash.toLowerCase();
  return hash === "#story" || hash.startsWith("#story/") ? "story" : "home";
};

function HomePage({ onNavigateStory }: { onNavigateStory: () => void }) {
  const sceneRefs = useRef<(HTMLElement | null)[]>([]);
  const testimonialsRef = useRef<HTMLElement | null>(null);
  const [activeScene, setActiveScene] = useState(0);
  const [showChapter, setShowChapter] = useState(true);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [filmIndex, setFilmIndex] = useState<number | null>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const viewport = window.innerHeight;

      sceneRefs.current.forEach((scene) => {
        if (!scene) return;
        const rect = scene.getBoundingClientRect();
        const entering = Math.max(0, Math.min(1, 1 - rect.top / viewport));
        scene.style.setProperty("--reveal", entering.toFixed(3));
      });

      const chapter = Math.max(
        0,
        Math.min(
          scenes.length - 1,
          Math.floor((window.scrollY + viewport * 0.55) / viewport),
        ),
      );
      setActiveScene(chapter);
      setShowChapter(window.scrollY < viewport * (scenes.length - 0.15));

      if (testimonialsRef.current) {
        const rect = testimonialsRef.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(0.999, -rect.top / (rect.height - viewport)));
        setActiveTestimonial(Math.floor(progress * testimonials.length));
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.15 },
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const open = lightboxIndex !== null || filmIndex !== null;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, filmIndex]);

  const scrollToNext = () => {
    sceneRefs.current[1]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      <div className="story" aria-label="Our approach to wedding photography">
        {scenes.map((scene, index) => (
          <section
            className={`scene scene--${scene.align ?? "left"}${index === 0 ? " scene--hero" : ""}`}
            key={scene.eyebrow}
            ref={(element) => {
              sceneRefs.current[index] = element;
            }}
            aria-labelledby={`scene-title-${index}`}
          >
            <div
              className="scene__image"
              style={{ backgroundImage: `url("${scene.image}")` }}
              role="img"
              aria-label={`${scene.eyebrow} — Indian wedding photography`}
            />
            <div className="scene__wash" />
            <div className="heritage-frame" aria-hidden="true">
              <span className="heritage-frame__corner heritage-frame__corner--tl" />
              <span className="heritage-frame__corner heritage-frame__corner--tr" />
              <span className="heritage-frame__corner heritage-frame__corner--bl" />
              <span className="heritage-frame__corner heritage-frame__corner--br" />
            </div>

            <div className="scene__content">
              {index === 0 && <p className="hero-brand">SRI CAPTURES</p>}
              <p className="scene__eyebrow">
                <span>{pad(index + 1)}</span>
                {scene.eyebrow}
              </p>
              <h1 id={`scene-title-${index}`} className="scene__title">
                {scene.title.split("\n").map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h1>
              <Ornament />
              <p className="scene__body">{scene.body}</p>
              {index === scenes.length - 1 && (
                <a className="story-cta" href="#contact">
                  Start your story <span aria-hidden="true">→</span>
                </a>
              )}
            </div>

            <p className="photo-credit">Photo · {scene.credit} / Unsplash</p>

            {index === 0 && (
              <button className="scroll-cue" onClick={scrollToNext}>
                <span>Scroll to begin</span>
                <i aria-hidden="true">↓</i>
              </button>
            )}
          </section>
        ))}
      </div>

      <aside className={`chapter-indicator${showChapter ? "" : " chapter-indicator--hidden"}`} aria-live="polite">
        <div className="chapter-indicator__line" />
        <div>
          <p>
            {pad(activeScene + 1)} <span>/ {pad(scenes.length)}</span>
          </p>
          <span>{scenes[activeScene].eyebrow}</span>
        </div>
      </aside>

      <div className="act-divider">
        <span>Act II</span>
        <p>The world of Sri Captures</p>
      </div>

      <section className="about-editorial" id="about">
        <SectionLabel number="09">The story behind Sri Captures</SectionLabel>
        <div className="about-editorial__canvas">
          <figure className="archive-photo archive-photo--main reveal">
            <img src={imageUrl("photo-1519689950823-0a2251441815")} alt="Photographer looking through a camera" />
            <figcaption>Watching. Waiting. Never interrupting.</figcaption>
          </figure>
          <div className="about-editorial__copy reveal">
            <p className="script-note">The quiet is where the story lives.</p>
            <h2>
              <span>We don't chase</span>
              <span>moments.</span>
              <em>We wait for them.</em>
            </h2>
            <p>
              Sri Captures began with a simple instinct: the most meaningful photographs are rarely
              arranged. They are noticed. We stay close enough to feel the moment and far enough to
              let it remain yours.
            </p>
            <button
              className="about-editorial__action"
              onClick={onNavigateStory}
            >
              Read Our Full Storybook <span>→</span>
            </button>
          </div>
          <figure className="archive-photo archive-photo--small reveal">
            <img src={galleryImages[3].src} alt="Bride and groom preparing for their ceremony" />
            <figcaption>Before the ceremony · Chennai</figcaption>
          </figure>
        </div>
      </section>

      <section className="philosophy">
        <p className="philosophy__statement reveal">
          “Every wedding deserves to be remembered <em>as it felt.</em>”
        </p>
        <div className="philosophy__principles">
          {[
            ["Observe", "We notice the moments before they happen.", galleryImages[1].src],
            ["Feel", "We understand the emotions behind the frame.", galleryImages[4].src],
            ["Preserve", "We turn fleeting moments into memories.", galleryImages[5].src],
          ].map(([title, body, image], index) => (
            <article className="principle reveal" key={title}>
              <img src={image} alt="" />
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="services" id="services">
        <div className="editorial-heading reveal">
          <SectionLabel number="10">Our practice</SectionLabel>
          <h2>How we tell<br /><em>your story.</em></h2>
        </div>
        <div className="service-list">
          {services.map((service, index) => (
            <a className="service-row" href="#contact" key={service.name}>
              <div className="service-row__image">
                <img src={service.image} alt="" />
              </div>
              <span className="service-row__number">{pad(index + 1)}</span>
              <div>
                <h3>{service.name}</h3>
                <p>{service.meta}</p>
              </div>
              <i aria-hidden="true">↗</i>
            </a>
          ))}
        </div>
      </section>

      <section className="gallery" id="gallery">
        <div className="gallery__intro reveal">
          <SectionLabel number="11">The archive</SectionLabel>
          <h2>The stories<br />we've captured.</h2>
          <p>A collection of moments, people, places and celebrations.</p>
        </div>
        <div className="gallery-field">
          {galleryImages.map((image, index) => (
            <button
              className={`gallery-image gallery-image--${index + 1} reveal`}
              key={image.src}
              onClick={() => setLightboxIndex(index)}
              aria-label={`View ${image.couple}'s story`}
            >
              <img src={image.src} alt={`${image.couple} wedding in ${image.place.split(" · ")[0]}`} />
              <span className="gallery-image__caption">
                <b>{image.couple}</b>
                <small>{image.place}</small>
                <i>View story →</i>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="testimonials" ref={testimonialsRef}>
        <div className="testimonials__sticky">
          {testimonials.map((testimonial, index) => (
            <div
              className={`testimonial-bg${activeTestimonial === index ? " is-active" : ""}`}
              key={testimonial.names}
              style={{ backgroundImage: `url("${testimonial.image}")` }}
            />
          ))}
          <div className="testimonial-shade" />
          <SectionLabel number="12">The words after the wedding</SectionLabel>
          <div className="testimonial-copy">
            {testimonials.map((testimonial, index) => (
              <blockquote className={activeTestimonial === index ? "is-active" : ""} key={testimonial.names}>
                <p>“{testimonial.quote}”</p>
                <cite>— {testimonial.names}</cite>
              </blockquote>
            ))}
          </div>
          <p className="testimonial-count">{pad(activeTestimonial + 1)} / {pad(testimonials.length)}</p>
        </div>
      </section>

      <section className="cinema" id="films">
        <div className="cinema__heading reveal">
          <SectionLabel number="13">Sri Captures cinema</SectionLabel>
          <h2>Moving memories.</h2>
          <p>Some stories deserve to move.</p>
        </div>
        <div className="film-list">
          {[
            ["Ananya & Karthik", "The wedding film", galleryImages[2].src],
            ["Priya & Arjun", "A celebration in Tirupati", galleryImages[0].src],
            ["Mira & Dev", "Two families, one story", galleryImages[1].src],
          ].map(([couple, title, image], index) => (
            <button className="film-preview reveal" onClick={() => setFilmIndex(index)} key={couple}>
              <span className="film-preview__image">
                <img src={image} alt="" />
                <i aria-hidden="true">Play</i>
              </span>
              <span className="film-preview__meta">
                <b>{couple}</b>
                <small>{title}</small>
                <em>0{index + 1}</em>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="behind">
        <div className="behind__heading reveal">
          <SectionLabel number="14">Behind the lens</SectionLabel>
          <h2>Behind every frame.</h2>
          <p>There is someone watching, waiting and feeling the moment with you.</p>
        </div>
        <div className="film-strip">
          {[...[
            "photo-1623783356340-95375aac85ce",
            "photo-1629756048377-09540f52caa1",
            "photo-1756143058493-2d14887e41e6",
            "photo-1622550105129-02c04a85a5f3",
            "photo-1611550287705-7ff8b459c8eb",
          ], ...[
            "photo-1623783356340-95375aac85ce",
            "photo-1629756048377-09540f52caa1",
            "photo-1756143058493-2d14887e41e6",
          ]].map((id, index) => (
            <figure key={`${id}-${index}`}>
              <img src={imageUrl(id, 1000)} alt="Sri Captures working behind the scenes" />
              <figcaption>Frame {pad(index + 1)}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="experience">
        <div className="experience__heading reveal">
          <SectionLabel number="15">The Sri Captures experience</SectionLabel>
          <h2>From hello<br /><em>to forever.</em></h2>
        </div>
        <div className="process">
          {processSteps.map(([title, body], index) => (
            <article className="process-step reveal" key={title}>
              <span>{pad(index + 1)}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
        <figure className="experience__image reveal">
          <img src={imageUrl("photo-1726068449701-4e11c5d64b11")} alt="A newly married couple reflected in a mirror" />
          <figcaption>From the first conversation to the photographs you keep.</figcaption>
        </figure>
      </section>

      <section className="final-cta">
        <img src={imageUrl("photo-1754782915842-aa4fca6c203a", 2200)} alt="Couple surrounded by flower petals during their wedding ceremony" />
        <div className="final-cta__shade" />
        <div className="final-cta__content reveal">
          <SectionLabel number="16">The invitation</SectionLabel>
          <h2>Your story is waiting<br />to be captured.</h2>
          <p>Let's make something you'll want to remember forever.</p>
          <div>
            <a className="primary-cta" href="#contact">Begin your story <span>→</span></a>
            <a className="secondary-cta" href="#gallery">View our work</a>
          </div>
        </div>
      </section>

      <section className="invitation" id="contact">
        <div className="invitation__image">
          <img src={imageUrl("photo-1760080903705-7e8f5442fbbe")} alt="Bride and groom in traditional Indian wedding attire" />
          <p>Tell us everything.<br /><em>We are listening.</em></p>
        </div>
        <form className="enquiry" onSubmit={(event) => event.preventDefault()}>
          <SectionLabel number="17">Begin a conversation</SectionLabel>
          <h2>Let's talk about<br /><em>your day.</em></h2>
          <div className="form-grid">
            {["Your name", "Partner's name", "Wedding date", "Wedding location", "Email", "Phone"].map((field) => (
              <label key={field}>
                <span>{field}</span>
                <input type={field === "Email" ? "email" : field === "Wedding date" ? "date" : "text"} name={field.toLowerCase().replaceAll(" ", "-")} />
              </label>
            ))}
            <label className="form-grid__wide">
              <span>Tell us about your story</span>
              <textarea name="story" rows={3} />
            </label>
          </div>
          <button className="form-submit" type="submit">Send our story <span>→</span></button>
        </form>
      </section>

      {lightboxIndex !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Wedding story viewer">
          <button className="modal-close" onClick={() => setLightboxIndex(null)}>Close</button>
          <button
            className="lightbox__previous"
            onClick={() => setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length)}
          >
            ← Previous
          </button>
          <figure>
            <img src={galleryImages[lightboxIndex].src} alt={galleryImages[lightboxIndex].couple} />
            <figcaption>
              <span>{galleryImages[lightboxIndex].couple}</span>
              <small>{galleryImages[lightboxIndex].place} · A Sri Captures story</small>
            </figcaption>
          </figure>
          <button
            className="lightbox__next"
            onClick={() => setLightboxIndex((lightboxIndex + 1) % galleryImages.length)}
          >
            Next →
          </button>
        </div>
      )}

      {filmIndex !== null && (
        <div className="film-modal" role="dialog" aria-modal="true" aria-label="Wedding film player">
          <button className="modal-close" onClick={() => setFilmIndex(null)}>Close</button>
          <div className="film-modal__screen">
            <img src={[galleryImages[2].src, galleryImages[0].src, galleryImages[1].src][filmIndex]} alt="" />
            <button aria-label="Play wedding film">▶</button>
          </div>
          <p>A story by Sri Captures</p>
          <span>Film preview · Sound available on play</span>
        </div>
      )}
    </main>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(getPageFromHash);
  const [storyInquiryRequestKey, setStoryInquiryRequestKey] = useState(0);

  useEffect(() => {
    const handleHashChange = () => {
      const page = getPageFromHash();
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("is-story-page", currentPage === "story");
  }, [currentPage]);

  const navigateTo = (page: Page) => {
    if (page === "story") {
      if (window.location.hash !== "#story") {
        window.location.hash = "#story";
      }
    } else {
      if (window.location.hash === "#story") {
        window.history.pushState(null, "", window.location.pathname + window.location.search);
      }
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToSection = (sectionId: string) => {
    const shouldChangePage = currentPage !== "home";
    if (shouldChangePage) {
      navigateTo("home");
    }

    window.setTimeout(
      () => document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" }),
      shouldChangePage ? 90 : 0,
    );
  };

  const openInquiry = () => {
    if (currentPage === "story") {
      setStoryInquiryRequestKey((key) => key + 1);
      return;
    }

    navigateToSection("contact");
  };

  return (
    <>
      <SiteHeader
        currentPage={currentPage}
        onNavigateHome={() => navigateTo("home")}
        onNavigateStory={() => navigateTo("story")}
        onNavigateSection={navigateToSection}
        onOpenInquire={openInquiry}
      />
      {currentPage === "story" ? (
        <StoryPage inquiryRequestKey={storyInquiryRequestKey} />
      ) : (
        <HomePage onNavigateStory={() => navigateTo("story")} />
      )}
      <SiteFooter
        currentPage={currentPage}
        onNavigateHome={() => navigateTo("home")}
        onNavigateStory={() => navigateTo("story")}
        onNavigateSection={navigateToSection}
      />
    </>
  );
}
