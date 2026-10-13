import { useEffect, useRef, useState } from "react";
import StoryPage from "./StoryPage";
import ServicesPage from "./ServicesPage";
import GalleryPage from "./GalleryPage";
import ContactPage from "./ContactPage";
import QuotePage from "./QuotePage";
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
  { src: "/images/725006129_18003973493930397_482581032589192039_n.jpg", couple: "Ananya × Karthik", place: "Tirupati · 2026" },
  { src: "/images/726231339_18003973520930397_5044683501249128658_n.jpg", couple: "Vedic Traditions", place: "Hyderabad · 2026" },
  { src: "/images/773866782_18012659870930397_1053337824181013945_n.jpg", couple: "Mira × Dev", place: "Bengaluru · 2025" },
  { src: "/images/enquiry_shoot.jpg", couple: "The Royal Bride", place: "Heritage Palace · 2026" },
  { src: "/images/774099434_18012847730930397_7780476466062797139_n.jpg", couple: "Pheras & Blessings", place: "Chennai · 2025" },
  { src: "/images/two_hearts.jpg", couple: "Two Hearts One Soul", place: "Pre-Wedding · 2026" },
  { src: "/images/IMG_8249.JPG", couple: "Unfiltered Bliss", place: "Vijayawada · 2026" },
];

const services = [
  { name: "Wedding photography", meta: "Candid · Traditional · Editorial", image: "/images/IMG_8235.JPG" },
  { name: "Pre-wedding stories", meta: "Portraits · Places · People", image: "/images/IMG_8239.JPG" },
  { name: "Wedding films", meta: "Highlights · Feature films · Reels", image: "/images/IMG_8238.JPG" },
  { name: "Destination weddings", meta: "India · Worldwide", image: "/images/IMG_8236.JPG" },
  { name: "Intimate celebrations", meta: "Families · Rituals · Togetherness", image: "/images/IMG_8244.JPG" },
];

const testimonials = [
  {
    quote: "You captured moments we didn't even know were happening.",
    names: "Ananya & Karthik",
    image: "/images/779084741_18013551242930397_5876533121056492846_n.jpg",
  },
  {
    quote: "Every photograph feels exactly like the day did—full, warm and alive.",
    names: "Priya & Arjun",
    image: "/images/780087469_18013768625930397_4315927215550079478_n.jpg",
  },
  {
    quote: "Our families cried, laughed, and then watched it all over again.",
    names: "Mira & Dev",
    image: "/images/IMG_8260.JPG",
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
    image: "/images/IMG_8274.JPG",
    credit: "Sri Captures",
    align: "center",
  },
  {
    eyebrow: "We begin with you",
    title: "Before the rituals,\nthere are two people.",
    body: "We listen first—so every frame feels unmistakably yours.",
    image: "/images/IMG_8241.JPG",
    credit: "Sri Captures",
    align: "left",
  },
  {
    eyebrow: "The little things",
    title: "The moments you\nalmost miss.",
    body: "A glance across the room. A steadying hand. The quiet before everything begins.",
    image: "/images/241512d0-4bb2-4d3f-bc6a-e6a7ddb2e983.JPG",
    credit: "Sri Captures",
    align: "right",
  },
  {
    eyebrow: "When families become one",
    title: "A thousand histories,\nin a single room.",
    body: "The embraces, blessings and beautiful chaos that make a celebration feel like home.",
    image: "/images/IMG_8254.JPG",
    credit: "Sri Captures",
    align: "left",
  },
  {
    eyebrow: "The moment",
    title: "And then,\neverything changes.",
    body: "Sacred traditions unfold. Time softens. Two lives become one.",
    image: "/images/IMG_8246.JPG",
    credit: "Sri Captures",
    align: "right",
  },
  {
    eyebrow: "The celebration",
    title: "Joy, in\nfull colour.",
    body: "Unscripted, unrestrained and alive—the part where everyone forgets the camera.",
    image: "/images/IMG_8253.JPG",
    credit: "Sri Captures",
    align: "left",
  },
  {
    eyebrow: "Why we capture",
    title: "Because memory\nmoves quickly.",
    body: "We make photographs for the people you are today—and the family you will become.",
    image: "/images/IMG_8234.JPG",
    credit: "Sri Captures",
    align: "right",
  },
  {
    eyebrow: "Your story",
    title: "Your story hasn't\nbeen written yet.",
    body: "Let's capture it together.",
    image: "/images/IMG_8258.JPG",
    credit: "Sri Captures",
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

type Page = "home" | "story" | "services" | "gallery" | "contact" | "quote";

const getPageFromHash = (): Page => {
  if (typeof window === "undefined") return "home";
  const hash = window.location.hash.toLowerCase();
  if (hash === "#story" || hash.startsWith("#story/")) return "story";
  if (hash === "#services" || hash.startsWith("#services/")) return "services";
  if (hash === "#gallery" || hash.startsWith("#gallery/")) return "gallery";
  if (hash === "#contact" || hash.startsWith("#contact/")) return "contact";
  if (hash === "#quote" || hash.startsWith("#quote/")) return "quote";
  return "home";
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

            <p className="photo-credit">Photo · {scene.credit}</p>

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
            <img src="/images/IMG_8247.JPG" alt="Bride smiling during wedding moments" />
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
            <img src="/images/774075669_18012659861930397_4795189325462169110_n.jpg" alt="Bride preparing for ceremony" />
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
            ["Observe", "We notice the moments before they happen.", "/images/775243859_18012847721930397_5187543316986712747_n.jpg"],
            ["Feel", "We understand the emotions behind the frame.", "/images/779001092_18013551263930397_7122338112566484731_n.jpg"],
            ["Preserve", "We turn fleeting moments into memories.", "/images/780157309_18013768634930397_4829872854217952865_n.jpg"],
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
            ["Ananya & Karthik", "The wedding film", "/images/IMG_8273.WEBP"],
            ["Priya & Arjun", "A celebration in Tirupati", "/images/two_hearts.jpg"],
            ["Mira & Dev", "Two families, one story", "/images/IMG_8238.JPG"],
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
          {[
            "/images/780087469_18013768625930397_4315927215550079478_n.jpg",
            "/images/780157309_18013768634930397_4829872854217952865_n.jpg",
            "/images/775243859_18012847721930397_5187543316986712747_n.jpg",
            "/images/779001092_18013551263930397_7122338112566484731_n.jpg",
            "/images/779084741_18013551242930397_5876533121056492846_n.jpg",
            "/images/774075669_18012659861930397_4795189325462169110_n.jpg",
            "/images/773866782_18012659870930397_1053337824181013945_n.jpg",
            "/images/726231339_18003973520930397_5044683501249128658_n.jpg",
          ].map((src, index) => (
            <figure key={`${src}-${index}`}>
              <img src={src} alt="Sri Captures working behind the scenes" />
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
          <img src="/images/enquiry_shoot.jpg" alt="A newly married couple in traditional attire" />
          <figcaption>From the first conversation to the photographs you keep.</figcaption>
        </figure>
      </section>

      <section className="final-cta">
        <img src="/images/IMG_8235.JPG" alt="Couple celebrating their wedding ceremony" />
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
    document.body.classList.toggle("is-services-page", currentPage === "services");
    document.body.classList.toggle("is-quote-page", currentPage === "quote");
  }, [currentPage]);

  const navigateTo = (page: Page) => {
    if (page === "story") {
      if (window.location.hash !== "#story") {
        window.location.hash = "#story";
      }
    } else if (page === "services") {
      if (window.location.hash !== "#services") {
        window.location.hash = "#services";
      }
    } else if (page === "gallery") {
      if (window.location.hash !== "#gallery") {
        window.location.hash = "#gallery";
      }
    } else if (page === "contact") {
      if (window.location.hash !== "#contact") {
        window.location.hash = "#contact";
      }
    } else if (page === "quote") {
      if (window.location.hash !== "#quote") {
        window.location.hash = "#quote";
      }
    } else {
      const h = window.location.hash;
      if (h === "#story" || h === "#services" || h === "#gallery" || h === "#contact" || h === "#quote") {
        window.history.pushState(null, "", window.location.pathname + window.location.search);
      }
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToSection = (sectionId: string) => {
    if (sectionId === "contact") {
      navigateTo("contact");
      return;
    }

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
    navigateTo("quote");
  };

  return (
    <>
      <SiteHeader
        currentPage={currentPage}
        onNavigateHome={() => navigateTo("home")}
        onNavigateStory={() => navigateTo("story")}
        onNavigateServices={() => navigateTo("services")}
        onNavigateGallery={() => navigateTo("gallery")}
        onNavigateContact={() => navigateTo("contact")}
        onNavigateQuote={() => navigateTo("quote")}
        onNavigateSection={navigateToSection}
        onOpenInquire={openInquiry}
      />
      {currentPage === "story" ? (
        <StoryPage inquiryRequestKey={storyInquiryRequestKey} />
      ) : currentPage === "services" ? (
        <ServicesPage onOpenInquiry={openInquiry} />
      ) : currentPage === "gallery" ? (
        <GalleryPage onOpenInquiry={openInquiry} />
      ) : currentPage === "contact" ? (
        <ContactPage />
      ) : currentPage === "quote" ? (
        <QuotePage onNavigateHome={() => navigateTo("home")} />
      ) : (
        <HomePage onNavigateStory={() => navigateTo("story")} />
      )}
      {currentPage !== "quote" && (
        <SiteFooter
          currentPage={currentPage}
          onNavigateHome={() => navigateTo("home")}
          onNavigateStory={() => navigateTo("story")}
          onNavigateServices={() => navigateTo("services")}
          onNavigateGallery={() => navigateTo("gallery")}
          onNavigateContact={() => navigateTo("contact")}
          onNavigateQuote={() => navigateTo("quote")}
          onNavigateSection={navigateToSection}
        />
      )}
    </>
  );
}
