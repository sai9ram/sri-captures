import { useEffect, useState } from "react";
import "./services.css";

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

/* ── Curated high-res photographs ─────────────────────────────── */
const HERO_MAIN = img("photo-1599462616558-2b75fd26a283", 2000);
const HERO_STRIP1 = img("photo-1611106211090-8f3c79eb8552", 800);
const HERO_STRIP2 = img("photo-1665960213530-3fb10da1f25e", 800);

// 1. Wedding Photography
const WED_PHOTO_MAIN = img("photo-1630526720753-aa4e71acf67d", 2000);
const WED_PHOTO_INSET = img("photo-1587271339318-2e78fdf79586", 800);

// 2. Pre Wedding Photography
const PREWED_MAIN = img("photo-1610173827002-62c0f1f05d04", 1800);
const PREWED_INSET = img("photo-1735052712464-9d24b69be5f5", 800);

// 3. Wedding Films
const FILM_BG = img("photo-1665960213508-48f07086d49c", 2000);
const FILM_PORT = img("photo-1754782915842-aa4fca6c203a", 800);

// 4. Destination Weddings
const DEST_MAIN = img("photo-1741201864879-c5e7f81c98b0", 2000);
const DEST_INSET = img("photo-1573951648026-fa38ff3f6770", 800);

// 5. Intimate Celebrations
const INTIMATE_MAIN = img("photo-1698419193331-5b2fb90a6304", 1800);
const INTIMATE_INSET = img("photo-1679937698873-6065742c8d32", 800);

const CTA_IMG = img("photo-1587271339318-2e78fdf79586", 2200);

interface ServicesPageProps {
  onOpenInquiry: () => void;
}

export default function ServicesPage({ onOpenInquiry }: ServicesPageProps) {
  const [activeTab, setActiveTab] = useState<string>("service-wedding");

  /* Scroll-reveal observer */
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

  const scrollToId = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90; // offset for fixed header & jump nav
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <main className="services-page" aria-label="SRI CAPTURES - Wedding Photography Services">
      {/* ── SECTION 1 · HERO & QUICK NAV ─────────────────────── */}
      <section className="srv-hero" id="srv-s1" aria-labelledby="srv-hero-heading">
        <div className="srv-hero__layout">
          {/* Left column: text + strip */}
          <div className="srv-hero__left">
            <div className="srv-hero__text srv-reveal">
              <p className="srv-eyebrow">OUR 5 PHOTOGRAPHY & FILM SERVICES</p>
              <h1 id="srv-hero-heading" className="srv-hero__headline">
                Clear services.<br />
                Simple packages.<br />
                <em>Memories that last forever.</em>
              </h1>
              <p className="srv-hero__body">
                We believe wedding photography should be simple and stress-free to understand.
                Below are our <strong>5 core services</strong> explained in plain, easy English —
                what is included, what you receive, and who each service is best for.
              </p>

              <div className="srv-hero__cta-group">
                <button
                  className="srv-hero__btn-primary"
                  onClick={() => scrollToId("service-wedding")}
                  aria-label="View all 5 services"
                >
                  VIEW ALL 5 SERVICES &#8595;
                </button>
                <button
                  className="srv-hero__btn-secondary"
                  onClick={onOpenInquiry}
                  aria-label="Build your customized price quote"
                >
                  BUILD YOUR QUOTE &#8594;
                </button>
              </div>
            </div>

            <div className="srv-hero__strip srv-reveal">
              <figure className="srv-strip-photo">
                <img src={HERO_STRIP1} alt="Traditional Haldi ceremony laughter" loading="lazy" />
              </figure>
              <figure className="srv-strip-photo">
                <img src={HERO_STRIP2} alt="Joyful couple wedding celebration" loading="lazy" />
              </figure>
            </div>
          </div>

          {/* Right column: main hero photo */}
          <div className="srv-hero__photo-wrap srv-reveal">
            <figure className="srv-hero__main-photo">
              <img
                src={HERO_MAIN}
                alt="Traditional Indian wedding ceremony moments captured by SRI CAPTURES"
              />
              <div className="srv-hero__photo-border" aria-hidden="true" />
            </figure>
          </div>
        </div>

        {/* ── QUICK JUMP NAVIGATION BAR ─────────────────────────── */}
        <div className="srv-quick-nav srv-reveal" aria-label="Quick jump to services">
          <div className="srv-quick-nav__inner">
            <span className="srv-quick-nav__label">JUMP TO SERVICE:</span>
            <div className="srv-quick-nav__pills">
              <button
                className={`srv-nav-pill ${activeTab === "service-wedding" ? "is-active" : ""}`}
                onClick={() => scrollToId("service-wedding")}
              >
                <span className="srv-pill-num">01</span> Wedding Photography
              </button>
              <button
                className={`srv-nav-pill ${activeTab === "service-prewedding" ? "is-active" : ""}`}
                onClick={() => scrollToId("service-prewedding")}
              >
                <span className="srv-pill-num">02</span> Pre Wedding Photography
              </button>
              <button
                className={`srv-nav-pill ${activeTab === "service-films" ? "is-active" : ""}`}
                onClick={() => scrollToId("service-films")}
              >
                <span className="srv-pill-num">03</span> Wedding Films
              </button>
              <button
                className={`srv-nav-pill ${activeTab === "service-destination" ? "is-active" : ""}`}
                onClick={() => scrollToId("service-destination")}
              >
                <span className="srv-pill-num">04</span> Destination Weddings
              </button>
              <button
                className={`srv-nav-pill ${activeTab === "service-intimate" ? "is-active" : ""}`}
                onClick={() => scrollToId("service-intimate")}
              >
                <span className="srv-pill-num">05</span> Intimate Celebrations
              </button>
            </div>
          </div>
        </div>

        {/* Ornamental divider */}
        <div className="srv-ornament" aria-hidden="true">
          <span /><i>&#9670;</i><span />
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SERVICE 1 · WEDDING PHOTOGRAPHY
         ─────────────────────────────────────────────────────────── */}
      <section
        className="srv-service-section srv-service-section--ivory"
        id="service-wedding"
        aria-labelledby="srv-wedding-title"
      >
        <div className="srv-container">
          <div className="srv-card-split">
            {/* Visual Side */}
            <div className="srv-card-split__visual srv-reveal">
              <figure className="srv-card-photo srv-card-photo--main">
                <img
                  src={WED_PHOTO_MAIN}
                  alt="Bride and groom at a traditional Indian wedding ceremony"
                  loading="lazy"
                />
                <span className="srv-card-number" aria-hidden="true">01</span>
              </figure>
              <figure className="srv-card-photo srv-card-photo--floating">
                <img
                  src={WED_PHOTO_INSET}
                  alt="Emotional wedding ritual with family"
                  loading="lazy"
                />
              </figure>
            </div>

            {/* Content Side */}
            <div className="srv-card-split__content srv-reveal">
              <div className="srv-badge-wrap">
                <span className="srv-badge srv-badge--primary">SERVICE 01</span>
                <span className="srv-badge srv-badge--outline">MOST POPULAR</span>
              </div>

              <h2 id="srv-wedding-title" className="srv-section-title">
                Wedding Photography
              </h2>
              <p className="srv-simple-tagline">
                Complete photo coverage of your main wedding ceremony, rituals, and family.
              </p>

              <div className="srv-explainer-box">
                <h3 className="srv-explainer-heading">What is this service in simple words?</h3>
                <p className="srv-explainer-text">
                  We stay with you throughout the wedding day to capture everything that happens.
                  From the morning preparation, the sacred rituals, and family blessings, to the
                  joyful reception party with your friends. We take both <strong>natural candid photos</strong>
                  (real laughs and tears) and <strong>traditional portraits</strong> with every family member.
                </p>
              </div>

              <div className="srv-details-grid">
                <div className="srv-details-col">
                  <h4 className="srv-col-title">What is included:</h4>
                  <ul className="srv-check-list">
                    <li>Full coverage of traditional wedding ceremonies & rituals</li>
                    <li>Candid photos of you, your parents, and wedding guests</li>
                    <li>Dedicated couple & bridal portrait sessions</li>
                    <li>Complete family stage group photographs</li>
                  </ul>
                </div>

                <div className="srv-details-col">
                  <h4 className="srv-col-title">What you receive:</h4>
                  <ul className="srv-deliver-list">
                    <li><strong>All original photos</strong> in full high resolution</li>
                    <li><strong>Professionally color-graded & edited</strong> signature images</li>
                    <li><strong>Private online digital gallery</strong> easy to share with family</li>
                    <li><strong>Premium handcrafted wedding photo album</strong> (available)</li>
                  </ul>
                </div>
              </div>

              <div className="srv-best-for">
                <strong>Best suited for:</strong> Couples planning traditional, temple, or modern
                hotel weddings who want every important ritual and loved one photographed with care.
              </div>

              <div className="srv-card-action">
                <button
                  className="srv-btn-gold"
                  onClick={onOpenInquiry}
                  aria-label="Inquire about Wedding Photography"
                >
                  BOOK WEDDING PHOTOGRAPHY <span aria-hidden="true">&#8594;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SERVICE 2 · PRE WEDDING PHOTOGRAPHY
         ─────────────────────────────────────────────────────────── */}
      <section
        className="srv-service-section srv-service-section--warm"
        id="service-prewedding"
        aria-labelledby="srv-prewed-title"
      >
        <div className="srv-container">
          <div className="srv-card-split srv-card-split--reverse">
            {/* Visual Side */}
            <div className="srv-card-split__visual srv-reveal">
              <figure className="srv-card-photo srv-card-photo--main">
                <img
                  src={PREWED_MAIN}
                  alt="Romantic outdoor pre-wedding couple photoshoot at sunset"
                  loading="lazy"
                />
                <span className="srv-card-number" aria-hidden="true">02</span>
              </figure>
              <figure className="srv-card-photo srv-card-photo--floating srv-card-photo--floating-left">
                <img
                  src={PREWED_INSET}
                  alt="Couple candid laugh during pre-wedding shoot"
                  loading="lazy"
                />
              </figure>
            </div>

            {/* Content Side */}
            <div className="srv-card-split__content srv-reveal">
              <div className="srv-badge-wrap">
                <span className="srv-badge srv-badge--terracotta">SERVICE 02</span>
                <span className="srv-badge srv-badge--outline">COUPLE SPECIAL</span>
              </div>

              <h2 id="srv-prewed-title" className="srv-section-title">
                Pre Wedding Photography
              </h2>
              <p className="srv-simple-tagline">
                A relaxed, romantic photoshoot for just the two of you before the wedding rush.
              </p>

              <div className="srv-explainer-box">
                <h3 className="srv-explainer-heading">What is this service in simple words?</h3>
                <p className="srv-explainer-text">
                  Before the wedding ceremonies begin, you and your partner spend half a day at a
                  scenic location taking romantic photos. You do not have to worry about looking stiff —
                  we guide you with easy, comfortable poses that look natural, happy, and effortless.
                </p>
              </div>

              <div className="srv-details-grid">
                <div className="srv-details-col">
                  <h4 className="srv-col-title">What is included:</h4>
                  <ul className="srv-check-list">
                    <li>3 to 5 hours relaxed shoot at your chosen location or resort</li>
                    <li>Support for 2 to 3 outfit changes (traditional, formal, or casual)</li>
                    <li>Friendly posing guidance so you both look your best</li>
                    <li>Fun, romantic, and candid shots celebrating your relationship</li>
                  </ul>
                </div>

                <div className="srv-details-col">
                  <h4 className="srv-col-title">What you receive:</h4>
                  <ul className="srv-deliver-list">
                    <li><strong>30 to 50 retouched signature photos</strong> delivered quickly</li>
                    <li><strong>Save-the-Date graphics & photos</strong> for invitations</li>
                    <li><strong>Ready-to-print images</strong> for your wedding reception entrance display</li>
                    <li><strong>Online download link</strong> for instant social media sharing</li>
                  </ul>
                </div>
              </div>

              <div className="srv-best-for">
                <strong>Best suited for:</strong> Couples who want romantic couple pictures without
                time pressure, and who want to get comfortable with the camera before the big day.
              </div>

              <div className="srv-card-action">
                <button
                  className="srv-btn-gold"
                  onClick={onOpenInquiry}
                  aria-label="Inquire about Pre Wedding Photography"
                >
                  PLAN YOUR PRE-WEDDING SHOOT <span aria-hidden="true">&#8594;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SERVICE 3 · WEDDING FILMS
         ─────────────────────────────────────────────────────────── */}
      <section
        className="srv-service-section srv-service-section--dark"
        id="service-films"
        aria-labelledby="srv-films-title"
      >
        <div
          className="srv-dark-bg"
          style={{ backgroundImage: `url("${FILM_BG}")` }}
          aria-hidden="true"
        >
          <div className="srv-dark-overlay" />
        </div>

        <div className="srv-container srv-dark-content">
          <div className="srv-card-split">
            {/* Visual Side */}
            <div className="srv-card-split__visual srv-reveal">
              <figure className="srv-card-photo srv-card-photo--cinema">
                <img
                  src={FILM_PORT}
                  alt="Cinematic still from a luxury Indian wedding film"
                  loading="lazy"
                />
                <div className="srv-cinema-badge">
                  <span className="srv-cinema-dot" /> 4K CINEMATIC FILM
                </div>
                <span className="srv-card-number srv-card-number--dark" aria-hidden="true">03</span>
              </figure>
            </div>

            {/* Content Side */}
            <div className="srv-card-split__content srv-reveal">
              <div className="srv-badge-wrap">
                <span className="srv-badge srv-badge--gold">SERVICE 03</span>
                <span className="srv-badge srv-badge--gold-outline">MOVIE-STYLE VIDEO</span>
              </div>

              <h2 id="srv-films-title" className="srv-section-title srv-section-title--light">
                Wedding Films
              </h2>
              <p className="srv-simple-tagline srv-simple-tagline--light">
                Watch and hear your wedding day come alive like a movie.
              </p>

              <div className="srv-explainer-box srv-explainer-box--dark">
                <h3 className="srv-explainer-heading srv-explainer-heading--gold">
                  What is this service in simple words?
                </h3>
                <p className="srv-explainer-text srv-explainer-text--light">
                  Photos capture moments, but films let you hear the actual voices, laughter, wedding vows,
                  and music. We shoot using professional cinema cameras and microphones so you can
                  rewatch your love story anytime with family for years to come.
                </p>
              </div>

              <div className="srv-details-grid srv-details-grid--dark">
                <div className="srv-details-col">
                  <h4 className="srv-col-title srv-col-title--light">What is included:</h4>
                  <ul className="srv-check-list srv-check-list--light">
                    <li>3 to 5-minute musical <strong>Highlight Teaser</strong> (easy to share on WhatsApp & Instagram)</li>
                    <li>Full-length <strong>Documentary Film</strong> (20 to 45 mins) covering all ceremonies</li>
                    <li>Crystal-clear audio recording of sacred vows, speeches & blessings</li>
                    <li>Aerial drone shots showing the grand venue, lighting, and entry</li>
                  </ul>
                </div>

                <div className="srv-details-col">
                  <h4 className="srv-col-title srv-col-title--light">What you receive:</h4>
                  <ul className="srv-deliver-list srv-deliver-list--light">
                    <li><strong>Ultra-HD 4K digital video files</strong></li>
                    <li><strong>Social media teaser cut</strong> in vertical format for reels</li>
                    <li><strong>Archival pendrive & online streaming link</strong></li>
                    <li><strong>Licensed background music</strong> chosen with your taste</li>
                  </ul>
                </div>
              </div>

              <div className="srv-best-for srv-best-for--dark">
                <strong>Best suited for:</strong> Couples and families who want to relive the energy,
                laughter, music, and emotional voice clips of the day forever.
              </div>

              <div className="srv-card-action">
                <button
                  className="srv-btn-gold"
                  onClick={onOpenInquiry}
                  aria-label="Inquire about Wedding Films"
                >
                  BOOK WEDDING FILMS <span aria-hidden="true">&#8594;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SERVICE 4 · DESTINATION WEDDINGS
         ─────────────────────────────────────────────────────────── */}
      <section
        className="srv-service-section srv-service-section--ivory"
        id="service-destination"
        aria-labelledby="srv-dest-title"
      >
        <div className="srv-container">
          <div className="srv-card-split srv-card-split--reverse">
            {/* Visual Side */}
            <div className="srv-card-split__visual srv-reveal">
              <figure className="srv-card-photo srv-card-photo--main">
                <img
                  src={DEST_MAIN}
                  alt="Grand outdoor destination wedding celebration with flower petals"
                  loading="lazy"
                />
                <span className="srv-card-number" aria-hidden="true">04</span>
              </figure>
              <figure className="srv-card-photo srv-card-photo--floating srv-card-photo--floating-left">
                <img
                  src={DEST_INSET}
                  alt="Scenic heritage palace destination wedding setup"
                  loading="lazy"
                />
              </figure>
            </div>

            {/* Content Side */}
            <div className="srv-card-split__content srv-reveal">
              <div className="srv-badge-wrap">
                <span className="srv-badge srv-badge--primary">SERVICE 04</span>
                <span className="srv-badge srv-badge--outline">MULTI-DAY COVERAGE</span>
              </div>

              <h2 id="srv-dest-title" className="srv-section-title">
                Destination Weddings
              </h2>
              <p className="srv-simple-tagline">
                Our photography crew travels with you anywhere across India or abroad.
              </p>

              <div className="srv-explainer-box">
                <h3 className="srv-explainer-heading">What is this service in simple words?</h3>
                <p className="srv-explainer-text">
                  If you are hosting your wedding at a palace in Rajasthan, a beach resort in Goa,
                  backwaters in Kerala, or an international location, we bring our full team to stay
                  on-site. We cover the entire 2 to 3 days of celebrations — from the welcome dinner,
                  Haldi, Mehendi, Sangeet party, to the wedding rituals and late-night reception.
                </p>
              </div>

              <div className="srv-details-grid">
                <div className="srv-details-col">
                  <h4 className="srv-col-title">What is included:</h4>
                  <ul className="srv-check-list">
                    <li>Dedicated team of photographers and cinematographers on-site</li>
                    <li>Full coverage across all 2 to 3 days of events and celebrations</li>
                    <li>Scenic couple portraits using the architecture & natural landscape</li>
                    <li>Guest arrival, pool parties, cocktail nights, and sangeet dances</li>
                  </ul>
                </div>

                <div className="srv-details-col">
                  <h4 className="srv-col-title">What you receive:</h4>
                  <ul className="srv-deliver-list">
                    <li><strong>Complete photo & video documentary</strong> of all events</li>
                    <li><strong>Same-day or next-day preview photos</strong> to share with guests</li>
                    <li><strong>Grand destination wedding film & teaser</strong></li>
                    <li><strong>Custom luxury photo albums</strong> for both families</li>
                  </ul>
                </div>
              </div>

              <div className="srv-best-for">
                <strong>Best suited for:</strong> Couples hosting a 2 to 3-day wedding celebration
                at a resort, palace, or holiday destination who need a reliable, fully prepared team.
              </div>

              <div className="srv-card-action">
                <button
                  className="srv-btn-gold"
                  onClick={onOpenInquiry}
                  aria-label="Inquire about Destination Weddings"
                >
                  DISCUSS DESTINATION WEDDING <span aria-hidden="true">&#8594;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SERVICE 5 · INTIMATE CELEBRATIONS
         ─────────────────────────────────────────────────────────── */}
      <section
        className="srv-service-section srv-service-section--warm"
        id="service-intimate"
        aria-labelledby="srv-intimate-title"
      >
        <div className="srv-container">
          <div className="srv-card-split">
            {/* Visual Side */}
            <div className="srv-card-split__visual srv-reveal">
              <figure className="srv-card-photo srv-card-photo--main">
                <img
                  src={INTIMATE_MAIN}
                  alt="Heartfelt candid smile between bride and family at home ceremony"
                  loading="lazy"
                />
                <span className="srv-card-number" aria-hidden="true">05</span>
              </figure>
              <figure className="srv-card-photo srv-card-photo--floating">
                <img
                  src={INTIMATE_INSET}
                  alt="Traditional close-knit ritual details"
                  loading="lazy"
                />
              </figure>
            </div>

            {/* Content Side */}
            <div className="srv-card-split__content srv-reveal">
              <div className="srv-badge-wrap">
                <span className="srv-badge srv-badge--terracotta">SERVICE 05</span>
                <span className="srv-badge srv-badge--outline">WARM & PERSONAL</span>
              </div>

              <h2 id="srv-intimate-title" className="srv-section-title">
                Intimate Celebrations
              </h2>
              <p className="srv-simple-tagline">
                Thoughtful, quiet coverage for small weddings, temple unions, and home events.
              </p>

              <div className="srv-explainer-box">
                <h3 className="srv-explainer-heading">What is this service in simple words?</h3>
                <p className="srv-explainer-text">
                  Not all weddings need a huge team of 10 people. If you are having a cozy gathering
                  of 20 to 100 close guests, an engagement, a temple ceremony, or a home ritual, we send
                  a small, gentle team that blends in naturally without getting in anyone’s way.
                </p>
              </div>

              <div className="srv-details-grid">
                <div className="srv-details-col">
                  <h4 className="srv-col-title">What is included:</h4>
                  <ul className="srv-check-list">
                    <li>Flexible half-day or 1-day photography coverage</li>
                    <li>Unobtrusive, polite photographers who respect temple & home etiquette</li>
                    <li>Individual photos with every single close family member & guest</li>
                    <li>Focus on quiet emotions, authentic hugs, and family connections</li>
                  </ul>
                </div>

                <div className="srv-details-col">
                  <h4 className="srv-col-title">What you receive:</h4>
                  <ul className="srv-deliver-list">
                    <li><strong>Full gallery of edited high-resolution images</strong></li>
                    <li><strong>Faster delivery turnaround</strong> within 2 to 3 weeks</li>
                    <li><strong>Private web gallery link</strong> for easy family viewing</li>
                    <li><strong>Compact, elegant heirloom coffee table photo book</strong></li>
                  </ul>
                </div>
              </div>

              <div className="srv-best-for">
                <strong>Best suited for:</strong> Temple weddings, home ceremonies, court marriages,
                engagements (Roka/Sagai), and intimate celebrations with 20 to 120 guests.
              </div>

              <div className="srv-card-action">
                <button
                  className="srv-btn-gold"
                  onClick={onOpenInquiry}
                  aria-label="Inquire about Intimate Celebrations"
                >
                  BOOK INTIMATE CELEBRATION <span aria-hidden="true">&#8594;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 7 · SIMPLE COMPARISON TABLE
         ─────────────────────────────────────────────────────────── */}
      <section className="srv-compare-section" aria-labelledby="srv-compare-title">
        <div className="srv-container">
          <div className="srv-compare-header srv-reveal">
            <p className="srv-eyebrow">QUICK COMPARISON GUIDE</p>
            <h2 id="srv-compare-title" className="srv-compare-title">
              Which service is <em>right for you?</em>
            </h2>
            <p className="srv-compare-sub">
              Here is an easy side-by-side summary to help you and your family pick the right coverage.
            </p>
          </div>

          <div className="srv-table-wrap srv-reveal">
            <table className="srv-compare-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Ideal For</th>
                  <th>Team Size</th>
                  <th>Key Highlight</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="srv-tbl-service">
                    <span className="srv-tbl-num">01</span>
                    <strong>Wedding Photography</strong>
                  </td>
                  <td>Traditional or modern full-day weddings</td>
                  <td>2 to 4 Photographers</td>
                  <td>All rituals, candid guest moments & family stage portraits</td>
                  <td>
                    <button className="srv-tbl-btn" onClick={onOpenInquiry}>Enquire &#8594;</button>
                  </td>
                </tr>
                <tr>
                  <td className="srv-tbl-service">
                    <span className="srv-tbl-num">02</span>
                    <strong>Pre Wedding Photography</strong>
                  </td>
                  <td>Couple romantic portraits before wedding</td>
                  <td>1 to 2 Photographers</td>
                  <td>Multiple outfits, relaxed poses & save-the-date photos</td>
                  <td>
                    <button className="srv-tbl-btn" onClick={onOpenInquiry}>Enquire &#8594;</button>
                  </td>
                </tr>
                <tr>
                  <td className="srv-tbl-service">
                    <span className="srv-tbl-num">03</span>
                    <strong>Wedding Films</strong>
                  </td>
                  <td>Couples wanting full cinema & real audio</td>
                  <td>2 to 3 Cinematographers</td>
                  <td>3-5 min highlight teaser + full ceremony documentary + drone</td>
                  <td>
                    <button className="srv-tbl-btn" onClick={onOpenInquiry}>Enquire &#8594;</button>
                  </td>
                </tr>
                <tr>
                  <td className="srv-tbl-service">
                    <span className="srv-tbl-num">04</span>
                    <strong>Destination Weddings</strong>
                  </td>
                  <td>2 to 3 days celebrations at resorts/palaces</td>
                  <td>Full Custom Crew</td>
                  <td>Covers all events from Welcome dinner to Sangeet & Reception</td>
                  <td>
                    <button className="srv-tbl-btn" onClick={onOpenInquiry}>Enquire &#8594;</button>
                  </td>
                </tr>
                <tr>
                  <td className="srv-tbl-service">
                    <span className="srv-tbl-num">05</span>
                    <strong>Intimate Celebrations</strong>
                  </td>
                  <td>Small gatherings, temples, engagements (20–100 guests)</td>
                  <td>1 to 2 Photographers</td>
                  <td>Gentle, quiet coverage focused on close family connection</td>
                  <td>
                    <button className="srv-tbl-btn" onClick={onOpenInquiry}>Enquire &#8594;</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 8 · HOW WE WORK (3 SIMPLE STEPS)
         ─────────────────────────────────────────────────────────── */}
      <section className="srv-steps-section" aria-labelledby="srv-steps-title">
        <div className="srv-container">
          <div className="srv-steps-header srv-reveal">
            <p className="srv-eyebrow">HOW BOOKING WORKS</p>
            <h2 id="srv-steps-title" className="srv-steps-title">
              Working with us is <em>simple & transparent</em>
            </h2>
          </div>

          <div className="srv-steps-grid">
            <div className="srv-step-card srv-reveal">
              <span className="srv-step-number">Step 01</span>
              <h3 className="srv-step-card-title">Share Your Dates</h3>
              <p className="srv-step-card-desc">
                Tell us your wedding date, location, and which of the 5 services you are interested in.
                You can also combine multiple services into one package.
              </p>
            </div>

            <div className="srv-step-card srv-reveal" style={{ transitionDelay: "0.1s" }}>
              <span className="srv-step-number">Step 02</span>
              <h3 className="srv-step-card-title">Get a Clear Quote</h3>
              <p className="srv-step-card-desc">
                We share a clear, transparent quote with no hidden charges. We discuss your schedule
                and customize the team size to fit your exact budget.
              </p>
            </div>

            <div className="srv-step-card srv-reveal" style={{ transitionDelay: "0.2s" }}>
              <span className="srv-step-number">Step 03</span>
              <h3 className="srv-step-card-title">Relax & Enjoy Your Day</h3>
              <p className="srv-step-card-desc">
                Once booked, your dates are locked. Our team arrives on time and takes care of
                everything, so you and your family can simply enjoy your wedding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 9 · FINAL CTA
         ─────────────────────────────────────────────────────────── */}
      <section className="srv-cta" id="srv-s6" aria-labelledby="srv-cta-heading">
        <div className="srv-cta__photo-side">
          <figure className="srv-cta__photo srv-reveal">
            <img
              src={CTA_IMG}
              alt="Couple sharing a quiet moment during their wedding ceremony"
              loading="lazy"
            />
          </figure>
        </div>

        <div className="srv-cta__content srv-reveal">
          <div className="srv-cta__ornament" aria-hidden="true">
            <svg viewBox="0 0 240 24" fill="none">
              <line x1="0" y1="12" x2="96" y2="12" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.45" />
              <path d="M120 4 L128 12 L120 20 L112 12Z" fill="currentColor" fillOpacity="0.7" />
              <line x1="144" y1="12" x2="240" y2="12" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.45" />
            </svg>
          </div>

          <p className="srv-eyebrow srv-eyebrow--light">HAVE QUESTIONS OR NEED A CUSTOM BUNDLE?</p>
          <h2 id="srv-cta-heading" className="srv-cta__headline">
            Not sure which services you need?<br />
            <em>We are here to help you choose.</em>
          </h2>
          <p className="srv-cta__body">
            Every wedding is different. Send us a message with your dates and city,
            and we will guide you with a simple, friendly quote tailored to your family's plans.
          </p>

          <button
            className="srv-cta__btn"
            onClick={onOpenInquiry}
            aria-label="Build your custom quote with SRI CAPTURES"
          >
            BUILD YOUR QUOTE
            <span className="srv-cta__btn-arrow" aria-hidden="true">&#8594;</span>
          </button>
        </div>
      </section>
    </main>
  );
}
