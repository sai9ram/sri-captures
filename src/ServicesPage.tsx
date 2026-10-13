import { useEffect } from "react";
import "./services.css";

const img = (id: string, width = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=86`;

const photos = {
  heroMain: img("photo-1573951648026-fa38ff3f6770", 2000),
  heroStrip1: img("photo-1574017121722-2c8ead5a7e90", 600),
  heroStrip2: img("photo-1732130652719-06c976d8153e", 600),
  weddingFeature: img("photo-1707311381855-28f2acd90b50", 2200),
  filmWide: img("photo-1748925702797-12d3a7a9f5fd", 2200),
  filmPortrait: img("photo-1679937698873-6065742c8d32", 900),
  masonry: [
    { src: img("photo-1728348937755-eec5ca52c095", 900), alt: "Guests laughing during wedding celebrations", cap: "THE CELEBRATION" },
    { src: img("photo-1610173827002-62c0f1f05d04", 800), alt: "Couple portrait in golden wedding light", cap: "" },
    { src: img("photo-1581256163941-900dae854787", 800), alt: "Family gathered during wedding rituals", cap: "FAMILY" },
    { src: img("photo-1754782915842-aa4fca6c203a", 1000), alt: "Rose petals during wedding procession", cap: "" },
    { src: img("photo-1574017105512-523ba6fc1697", 700), alt: "Bridal jewelry and silk detail", cap: "A QUIET MOMENT" },
    { src: img("photo-1760080903831-3cfeac3200dc", 900), alt: "Candid coastal wedding celebration", cap: "" },
  ],
  option1: [img("photo-1741201864879-c5e7f81c98b0", 400), img("photo-1698419193331-5b2fb90a6304", 400), img("photo-1735052712464-9d24b69be5f5", 400)],
  option2: img("photo-1630526720753-aa4e71acf67d", 500),
  option3: [img("photo-1726068449701-4e11c5d64b11", 400), img("photo-1754782915524-714d8534a5df", 400), img("photo-1696233410608-d4d9fd7cf3aa", 400)],
  cta: img("photo-1573890697396-eed65fd271cf", 1800),
};

function SvcOrnament() {
  return (
    <div className="svc-ornament" aria-hidden="true">
      <span className="svc-ornament__line" />
      <svg width="32" height="18" viewBox="0 0 32 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16 1C16 1 18 6 22 8C18 8 16 12 16 15C16 12 14 8 10 8C14 6 16 1 16 1Z"
          fill="currentColor"
        />
      </svg>
      <span className="svc-ornament__line" />
    </div>
  );
}

export interface ServicesPageProps {
  onEnquire: (serviceHint?: string) => void;
}

export default function ServicesPage({ onEnquire }: ServicesPageProps) {
  useEffect(() => {
    const reveal = (el: Element) => el.classList.add("is-visible");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveal(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    document.querySelectorAll(".svc-reveal, .svc-clip-reveal").forEach((el) => {
      observer.observe(el);
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) reveal(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToWeddingPhoto = () => {
    document.getElementById("svc-wedding-photography")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="svc-page">
      <main id="services-main">
        {/* SECTION 1 — Introduction */}
        <section className="svc-sec-intro" id="services-intro" aria-labelledby="svc-intro-heading">
          <div className="svc-intro-grid">
            <div className="svc-intro-copy">
              <p className="svc-eyebrow">WHAT WE CAPTURE</p>
              <h1 id="svc-intro-heading" className="svc-intro-headline svc-reveal">
                Every celebration deserves to be remembered{" "}
                <em>differently.</em>
              </h1>
              <p className="svc-intro-desc svc-reveal">
                From the rituals that connect generations to the moments that happen in
                between, we capture your celebration with care, creativity, and an eye
                for the meaningful.
              </p>
              <button type="button" className="svc-text-link svc-reveal" onClick={scrollToWeddingPhoto}>
                EXPLORE OUR SERVICES ↓
              </button>
            </div>

            <div className="svc-intro-visual" aria-hidden="false">
              <div className="svc-intro-strip svc-clip-reveal">
                <figure>
                  <img src={photos.heroStrip1} alt="Bride during quiet morning preparation" loading="eager" />
                </figure>
                <figure>
                  <img src={photos.heroStrip2} alt="Emotional family embrace at a wedding" loading="eager" />
                </figure>
              </div>
              <div className="svc-intro-hero-frame svc-clip-reveal">
                <img
                  src={photos.heroMain}
                  alt="Wedding guests celebrating during an evening reception"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 — Wedding Photography */}
        <section
          className="svc-sec-feature"
          id="svc-wedding-photography"
          aria-labelledby="svc-photo-heading"
        >
          <div className="svc-feature-layout svc-feature-layout--photo">
            <div className="svc-feature-media svc-reveal svc-reveal--from-left">
              <img
                src={photos.weddingFeature}
                alt="Bride and groom in heirloom wedding silks during portraits"
                loading="lazy"
              />
              <span className="svc-service-num" aria-hidden="true">
                01
              </span>
            </div>
            <div className="svc-feature-panel svc-reveal svc-reveal--from-right">
              <h2 id="svc-photo-heading" className="svc-feature-title">
                Wedding Photography
              </h2>
              <p className="svc-feature-desc">
                Honest, expressive photographs that preserve the people, rituals,
                emotions, and details that make your wedding uniquely yours.
              </p>
              <ul className="svc-feature-list">
                <li>Traditional ceremonies and rituals</li>
                <li>Candid moments and family portraits</li>
                <li>Bridal, couple, and celebration photography</li>
              </ul>
              <button
                type="button"
                className="svc-text-link"
                onClick={() => onEnquire("Wedding Photography")}
              >
                DISCUSS YOUR WEDDING →
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 3 — Wedding Films */}
        <section className="svc-sec-cinema" id="svc-wedding-films" aria-labelledby="svc-films-heading">
          <div className="svc-cinema-bg svc-clip-reveal">
            <img src={photos.filmWide} alt="Sacred wedding ceremony during celebration coverage" loading="lazy" />
            <div className="svc-cinema-grain" aria-hidden="true" />
            <div className="svc-cinema-sheen" aria-hidden="true" />
          </div>
          <div className="svc-cinema-content">
            <div className="svc-cinema-portrait svc-reveal">
              <img src={photos.filmPortrait} alt="Editorial couple portrait in soft light" loading="lazy" />
            </div>
            <div className="svc-cinema-copy svc-reveal">
              <span className="svc-service-num svc-service-num--light">02</span>
              <h2 id="svc-films-heading" className="svc-cinema-title">
                Wedding Films
              </h2>
              <p className="svc-cinema-desc">
                Relive the voices, movement, music, and emotion of your celebration
                through a thoughtfully crafted wedding film.
              </p>
              <ul className="svc-feature-list svc-feature-list--light">
                <li>Cinematic wedding films</li>
                <li>Ceremony and celebration coverage</li>
                <li>Emotional highlights and meaningful moments</li>
              </ul>
              <button
                type="button"
                className="svc-text-link svc-text-link--light"
                onClick={() => onEnquire("Wedding Films")}
              >
                PLAN YOUR WEDDING FILM →
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 4 — Candid & Portraits */}
        <section className="svc-sec-masonry" id="svc-candid-portraits" aria-labelledby="svc-moments-heading">
          <div className="svc-masonry-wrap">
            <div className="svc-masonry-intro svc-reveal">
              <span className="svc-service-num">03</span>
              <h2 id="svc-moments-heading" className="svc-masonry-title">
                The Moments Between the Moments
              </h2>
              <p className="svc-masonry-desc">
                The quiet glances, spontaneous laughter, happy tears, and little details
                often become the memories people treasure most.
              </p>
              <ul className="svc-compact-list">
                <li>Candid wedding moments</li>
                <li>Couple portraits</li>
                <li>Bridal and groom portraits</li>
                <li>Family and celebration details</li>
              </ul>
            </div>
            <div className="svc-masonry-grid">
              {photos.masonry.map((item, index) => (
                <figure
                  key={item.src}
                  className={`svc-masonry-item svc-masonry-item--${index + 1} svc-clip-reveal`}
                  style={{ transitionDelay: `${120 + index * 80}ms` }}
                >
                  <img src={item.src} alt={item.alt} loading="lazy" />
                  {item.cap ? <figcaption>{item.cap}</figcaption> : null}
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5 — Coverage Options */}
        <section className="svc-sec-options" id="svc-coverage-options" aria-labelledby="svc-options-heading">
          <div className="svc-options-inner">
            <header className="svc-options-header svc-reveal">
              <p className="svc-eyebrow">HOW WE CAN WORK TOGETHER</p>
              <h2 id="svc-options-heading" className="svc-options-headline">
                Our Wedding Coverage Options
              </h2>
              <p className="svc-options-sub">
                Three ways to begin a conversation — tailored to your celebration, not
                fixed packages.
              </p>
            </header>

            <div className="svc-options-row">
              {[
                {
                  num: "01",
                  title: "The Wedding Day",
                  body: "Focused coverage for a single wedding day, subject to studio availability and the services you need.",
                  thumbs: photos.option1,
                  hint: "The Wedding Day",
                },
                {
                  num: "02",
                  title: "Wedding Celebrations",
                  body: "Coverage planned around multiple wedding events or ceremonies, where offered by Sri Captures.",
                  thumbs: [photos.option2],
                  hint: "Wedding Celebrations",
                },
                {
                  num: "03",
                  title: "A Personalised Collection",
                  body: "A tailored discussion for couples who need a combination of photography, films, portraits, or event coverage.",
                  thumbs: photos.option3,
                  hint: "Personalised Collection",
                },
              ].map((option) => (
                <article key={option.num} className="svc-option svc-reveal">
                  <span className="svc-option-num">{option.num}</span>
                  <h3 className="svc-option-title">{option.title}</h3>
                  <p className="svc-option-body">{option.body}</p>
                  <div className="svc-option-thumbs">
                    {option.thumbs.map((src) => (
                      <img key={src} src={src} alt="" loading="lazy" />
                    ))}
                  </div>
                  <button
                    type="button"
                    className="svc-option-link"
                    onClick={() => onEnquire(option.hint)}
                  >
                    ENQUIRE ABOUT THIS OPTION →
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6 — CTA */}
        <section className="svc-sec-cta" id="svc-enquiry-cta" aria-labelledby="svc-cta-heading">
          <div className="svc-cta-grid">
            <div className="svc-cta-visual svc-clip-reveal">
              <img
                src={photos.cta}
                alt="Tender moment during a traditional wedding ceremony"
                loading="lazy"
              />
            </div>
            <div className="svc-cta-copy svc-reveal">
              <SvcOrnament />
              <h2 id="svc-cta-heading" className="svc-cta-headline">
                Let&apos;s make room for the moments that matter.
              </h2>
              <p className="svc-cta-text">
                Tell us about your celebration, your plans, and the memories you want
                to hold on to.
              </p>
              <button type="button" className="svc-cta-btn" onClick={() => onEnquire("Services page")}>
                GET A QUOTE <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
