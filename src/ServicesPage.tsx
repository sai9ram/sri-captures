import { useEffect } from "react";
import "./services.css";

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

/* ── curated photograph IDs ─────────────────────────────────── */
const HERO_MAIN   = img("photo-1599462616558-2b75fd26a283", 2000);
const HERO_STRIP1 = img("photo-1611106211090-8f3c79eb8552", 800);
const HERO_STRIP2 = img("photo-1665960213530-3fb10da1f25e", 800);

const WED_MAIN    = img("photo-1630526720753-aa4e71acf67d", 2000);

const FILM_BG     = img("photo-1665960213508-48f07086d49c", 2000);
const FILM_PORT   = img("photo-1754782915842-aa4fca6c203a", 800);

const CANDID = [
  { id: img("photo-1741201864879-c5e7f81c98b0", 1000), caption: "THE CELEBRATION",  span: "tall"   },
  { id: img("photo-1679937698873-6065742c8d32", 1000), caption: "A QUIET MOMENT",   span: "wide"   },
  { id: img("photo-1698419193331-5b2fb90a6304", 1000), caption: "FAMILY",           span: "square" },
  { id: img("photo-1610173827002-62c0f1f05d04", 1000), caption: "THE COUPLE",       span: "square" },
  { id: img("photo-1760080903831-3cfeac3200dc", 1000), caption: "JOY",              span: "wide"   },
];

const OPT_IMGS = [
  img("photo-1573951648026-fa38ff3f6770", 600),
  img("photo-1735052712464-9d24b69be5f5", 600),
  img("photo-1726068449701-4e11c5d64b11", 600),
];

const CTA_IMG = img("photo-1587271339318-2e78fdf79586", 2200);

interface ServicesPageProps {
  onOpenInquiry: () => void;
}

export default function ServicesPage({ onOpenInquiry }: ServicesPageProps) {
  /* intersection-based reveal */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("srv-visible");
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll(".srv-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToServices = () => {
    document.getElementById("srv-s2")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="services-page" aria-label="SRI CAPTURES - Wedding Photography Services">

      {/* ── SECTION 1 · HERO ─────────────────────────────────── */}
      <section className="srv-hero" id="srv-s1" aria-labelledby="srv-hero-heading">
        <div className="srv-hero__layout">

          {/* Left column: text + strip */}
          <div className="srv-hero__left">
            <div className="srv-hero__text srv-reveal">
              <p className="srv-eyebrow">WHAT WE CAPTURE</p>
              <h1 id="srv-hero-heading" className="srv-hero__headline">
                Every celebration<br />
                deserves to be<br />
                <em>remembered differently.</em>
              </h1>
              <p className="srv-hero__body">
                From the rituals that connect generations to the moments that happen in
                between, we capture your celebration with care, creativity, and an eye
                for the meaningful.
              </p>
              <button
                className="srv-scroll-link"
                onClick={scrollToServices}
                aria-label="Scroll to our services"
              >
                EXPLORE OUR SERVICES &#8595;
              </button>
            </div>

            <div className="srv-hero__strip srv-reveal">
              <figure className="srv-strip-photo">
                <img src={HERO_STRIP1} alt="Candid wedding ceremony moment" loading="lazy" />
              </figure>
              <figure className="srv-strip-photo">
                <img src={HERO_STRIP2} alt="Couple celebrating their wedding" loading="lazy" />
              </figure>
            </div>
          </div>

          {/* Right column: main photo */}
          <div className="srv-hero__photo-wrap srv-reveal">
            <figure className="srv-hero__main-photo">
              <img
                src={HERO_MAIN}
                alt="Traditional Indian wedding ceremony captured by SRI CAPTURES"
              />
              <div className="srv-hero__photo-border" aria-hidden="true" />
            </figure>
          </div>
        </div>

        {/* Ornamental divider */}
        <div className="srv-ornament" aria-hidden="true">
          <span /><i>&#9670;</i><span />
        </div>
      </section>

      {/* ── SECTION 2 · WEDDING PHOTOGRAPHY ─────────────────── */}
      <section className="srv-feature" id="srv-s2" aria-labelledby="srv-wed-heading">
        <div className="srv-feature__photo-side srv-reveal">
          <figure className="srv-feature__photo">
            <img
              src={WED_MAIN}
              alt="Bride and groom in traditional Indian wedding attire"
            />
            <div className="srv-feature__number" aria-hidden="true">01</div>
          </figure>
        </div>

        <div className="srv-feature__panel srv-reveal">
          <div className="srv-panel-border" aria-hidden="true" />
          <p className="srv-service-tag">Wedding Photography</p>
          <h2 id="srv-wed-heading" className="srv-feature__title">
            Stories held<br /><em>with honesty.</em>
          </h2>
          <p className="srv-feature__desc">
            Honest, expressive photographs that preserve the people, rituals, emotions,
            and details that make your wedding uniquely yours.
          </p>
          <ul className="srv-points" aria-label="Wedding photography includes">
            <li>Traditional ceremonies and rituals</li>
            <li>Candid moments and family portraits</li>
            <li>Bridal, couple, and celebration photography</li>
          </ul>
          <button className="srv-text-link" onClick={onOpenInquiry}>
            DISCUSS YOUR WEDDING <span aria-hidden="true">&#8594;</span>
          </button>
        </div>
      </section>

      {/* ── SECTION 3 · WEDDING FILMS ────────────────────────── */}
      <section className="srv-cinema" id="srv-s3" aria-labelledby="srv-film-heading">
        <div
          className="srv-cinema__bg srv-reveal"
          role="img"
          aria-label="Cinematic wedding film still"
          style={{ backgroundImage: `url("${FILM_BG}")` }}
        >
          <div className="srv-cinema__grain" aria-hidden="true" />
          <div className="srv-cinema__veil" aria-hidden="true" />
        </div>

        <figure className="srv-cinema__portrait srv-reveal">
          <img
            src={FILM_PORT}
            alt="Bride in a quiet moment before the ceremony"
            loading="lazy"
          />
        </figure>

        <div className="srv-cinema__content srv-reveal">
          <p className="srv-service-tag srv-service-tag--light">02</p>
          <h2 id="srv-film-heading" className="srv-cinema__title">
            Wedding Films
          </h2>
          <p className="srv-cinema__desc">
            Relive the voices, movement, music, and emotion of your celebration through
            a thoughtfully crafted wedding film.
          </p>
          <ul className="srv-points srv-points--light" aria-label="Wedding films include">
            <li>Cinematic wedding films</li>
            <li>Ceremony and celebration coverage</li>
            <li>Emotional highlights and meaningful moments</li>
          </ul>
          <button
            className="srv-text-link srv-text-link--light"
            onClick={onOpenInquiry}
          >
            PLAN YOUR WEDDING FILM <span aria-hidden="true">&#8594;</span>
          </button>
        </div>
      </section>

      {/* ── SECTION 4 · CANDID STORIES ───────────────────────── */}
      <section className="srv-candid" id="srv-s4" aria-labelledby="srv-candid-heading">
        <div className="srv-candid__layout">

          {/* Masonry grid */}
          <div className="srv-candid__grid" aria-label="Candid wedding photography examples">
            {CANDID.map((photo, i) => (
              <figure
                key={photo.id}
                className={`srv-candid__photo srv-candid__photo--${photo.span} srv-reveal`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <img
                  src={photo.id}
                  alt={`Candid wedding photography - ${photo.caption.toLowerCase()}`}
                  loading="lazy"
                />
                <figcaption className="srv-candid__caption">{photo.caption}</figcaption>
              </figure>
            ))}
          </div>

          {/* Text panel woven into grid */}
          <div className="srv-candid__text srv-reveal">
            <p className="srv-service-tag">03</p>
            <h2 id="srv-candid-heading" className="srv-candid__title">
              The Moments<br /><em>Between the Moments</em>
            </h2>
            <p className="srv-candid__desc">
              The quiet glances, spontaneous laughter, happy tears, and little details
              often become the memories people treasure most.
            </p>
            <ul className="srv-points" aria-label="Candid photography includes">
              <li>Candid wedding moments</li>
              <li>Couple portraits</li>
              <li>Bridal and groom portraits</li>
              <li>Family and celebration details</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── SECTION 5 · COVERAGE OPTIONS ─────────────────────── */}
      <section className="srv-options" id="srv-s5" aria-labelledby="srv-options-heading">
        <div className="srv-options__intro srv-reveal">
          <p className="srv-eyebrow">HOW WE WORK</p>
          <h2 id="srv-options-heading" className="srv-options__title">
            Our Wedding<br /><em>Coverage Options</em>
          </h2>
          <p className="srv-options__sub">
            Every celebration is unique. Here are three ways we commonly work with couples.
          </p>
        </div>

        <div className="srv-options__grid">
          {[
            {
              num: "01",
              title: "The Wedding Day",
              desc: "A focused coverage option built around your wedding day. We work closely with you to understand what matters most and plan accordingly.",
              img: OPT_IMGS[0],
              alt: "Traditional wedding ceremony photography",
            },
            {
              num: "02",
              title: "Wedding Celebrations",
              desc: "Coverage planned across multiple events or ceremonies, capturing each occasion as part of your wider celebration story.",
              img: OPT_IMGS[1],
              alt: "Couple portrait at pre-wedding shoot",
            },
            {
              num: "03",
              title: "A Personalised Collection",
              desc: "A tailored discussion for couples who want a specific combination of photography, films, portraits, or event coverage.",
              img: OPT_IMGS[2],
              alt: "Intimate wedding portrait",
            },
          ].map((opt, i) => (
            <article
              key={opt.num}
              className="srv-option srv-reveal"
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="srv-option__number" aria-hidden="true">{opt.num}</div>
              <div className="srv-option__photo-wrap">
                <figure className="srv-option__photo">
                  <img src={opt.img} alt={opt.alt} loading="lazy" />
                </figure>
              </div>
              <div className="srv-option__body">
                <h3 className="srv-option__title">{opt.title}</h3>
                <p className="srv-option__desc">{opt.desc}</p>
                <button className="srv-text-link" onClick={onOpenInquiry}>
                  ENQUIRE ABOUT THIS OPTION <span aria-hidden="true">&#8594;</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── SECTION 6 · FINAL CTA ─────────────────────────────── */}
      <section className="srv-cta" id="srv-s6" aria-labelledby="srv-cta-heading">
        <div className="srv-cta__photo-side">
          <figure className="srv-cta__photo srv-reveal">
            <img
              src={CTA_IMG}
              alt="Couple in a heartfelt moment during their wedding ceremony"
            />
          </figure>
        </div>

        <div className="srv-cta__content srv-reveal">
          {/* Ornamental SVG line */}
          <div className="srv-cta__ornament" aria-hidden="true">
            <svg viewBox="0 0 240 24" fill="none">
              <line x1="0" y1="12" x2="96" y2="12" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.45" />
              <path d="M120 4 L128 12 L120 20 L112 12Z" fill="currentColor" fillOpacity="0.7" />
              <line x1="144" y1="12" x2="240" y2="12" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.45" />
            </svg>
          </div>

          <p className="srv-eyebrow srv-eyebrow--light">BEGIN YOUR STORY</p>
          <h2 id="srv-cta-heading" className="srv-cta__headline">
            Let's make room<br />for <em>the moments that matter.</em>
          </h2>
          <p className="srv-cta__body">
            Tell us about your celebration, your plans, and the memories you want to hold on to.
          </p>
          <button
            className="srv-cta__btn"
            onClick={onOpenInquiry}
            aria-label="Get a quote from SRI CAPTURES"
          >
            GET A QUOTE
            <span className="srv-cta__btn-arrow" aria-hidden="true">&#8594;</span>
          </button>
        </div>
      </section>

    </main>
  );
}
