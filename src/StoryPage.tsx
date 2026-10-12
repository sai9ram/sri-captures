import { useEffect, useState } from "react"

// Curated high-fidelity photographs fitting authentic Indian wedding narratives
const img = (id: string, width = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=86`

const storyImages = {
  // Section 01: Introduction
  introMain: img("photo-1707311381855-28f2acd90b50", 1600),
  introInset: img("photo-1574017105512-523ba6fc1697", 1200),
  introAccentTop: img("photo-1741201864879-c5e7f81c98b0", 900),
  introFilm1: img("photo-1610173827002-62c0f1f05d04", 800),
  introFilm2: img("photo-1581256163941-900dae854787", 800),
  introFilm3: img("photo-1698419193331-5b2fb90a6304", 800),
  introPolaroid: img("photo-1760080903831-3cfeac3200dc", 700),

  // Section 02: The Story Behind SRI CAPTURES
  btsMain: img("photo-1537633552985-df8429e8048b", 1600),
  btsSub: img("photo-1607604276583-eef5d076aa5f", 1200),

  // Section 03: Our Philosophy
  philosophyMoment: img("photo-1573890697396-eed65fd271cf", 1400),
  philosophyObserve: img("photo-1726068449701-4e11c5d64b11", 900),
  philosophyFeel: img("photo-1732130652719-06c976d8153e", 900),
  philosophyPreserve: img("photo-1754782915524-714d8534a5df", 900),
  philosophyWide: img("photo-1573951648026-fa38ff3f6770", 1600),
  philosophyDetail: img("photo-1679937698873-6065742c8d32", 1000),

  // Section 04: Our Approach
  approachListen: img("photo-1726068449701-4e11c5d64b11", 1400),
  approachObserve: img("photo-1748925702797-12d3a7a9f5fd", 1400),
  approachPreserve: img("photo-1732130652719-06c976d8153e", 1400),

  beginningInline1: img("photo-1754782915842-aa4fca6c203a", 1100),
  beginningInline2: img("photo-1748925702797-12d3a7a9f5fd", 1100),

  // Section 05: The Stories We Carry
  archive1: img("photo-1679937698873-6065742c8d32", 1600),
  archive2: img("photo-1574017121722-2c8ead5a7e90", 1200),
  archive3: img("photo-1754782915842-aa4fca6c203a", 1400),
  archive4: img("photo-1728348937755-eec5ca52c095", 1400),
  archive5: img("photo-1754782915524-714d8534a5df", 1400),
  archive6: img("photo-1537633552985-df8429e8048b", 1200),
  archive7: img("photo-1607604276583-eef5d076aa5f", 1200),
  archive8: img("photo-1696233410608-d4d9fd7cf3aa", 1200),

  // Section 06: Final CTA
  ctaWide: img("photo-1696233410608-d4d9fd7cf3aa", 2200),
  ctaStack1: img("photo-1707311381855-28f2acd90b50", 900),
  ctaStack2: img("photo-1573890697396-eed65fd271cf", 900),
}

/* Traditional Indian Invitation Ornamental Divider SVG */
function TraditionalInvitationDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`story-divider-wrap ${className}`} aria-hidden="true">
      <div className="story-divider-line" />
      <div className="story-divider-motif">
        <svg
          width="44"
          height="24"
          viewBox="0 0 44 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Central Indian Lotus & Filigree */}
          <path
            d="M22 2C22 2 24 8 28 10C24 10 22 15 22 19C22 15 20 10 16 10C20 8 22 2 22 2Z"
            fill="currentColor"
            fillOpacity="0.8"
          />
          <path
            d="M22 6C25 9 32 10 37 9C34 12 30 14 26 13C24 16 22 21 22 21C22 21 20 16 18 13C14 14 10 12 7 9C12 10 19 9 22 6Z"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          <circle cx="22" cy="11" r="1.5" fill="currentColor" />
          <circle cx="10" cy="12" r="1" fill="currentColor" fillOpacity="0.7" />
          <circle cx="34" cy="12" r="1" fill="currentColor" fillOpacity="0.7" />
          <circle cx="3" cy="12" r="0.7" fill="currentColor" fillOpacity="0.5" />
          <circle cx="41" cy="12" r="0.7" fill="currentColor" fillOpacity="0.5" />
        </svg>
      </div>
      <div className="story-divider-line" />
    </div>
  )
}

/* Subtle Traditional Kolam Watermark Motif */
function KolamMotif({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
      <circle cx="50" cy="50" r="36" stroke="currentColor" strokeWidth="0.6" />
      <path
        d="M50 4C50 30 70 50 96 50C70 50 50 70 50 96C50 70 30 50 4 50C30 50 50 30 50 4Z"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <path
        d="M17.5 17.5C36 36 64 36 82.5 17.5C64 36 64 64 82.5 82.5C64 64 36 64 17.5 82.5C36 64 36 36 17.5 17.5Z"
        stroke="currentColor"
        strokeWidth="0.6"
      />
      <circle cx="50" cy="50" r="6" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="50" cy="50" r="2" fill="currentColor" />
    </svg>
  )
}

interface StoryPageProps {
  inquiryRequestKey?: number
}

export default function StoryPage({ inquiryRequestKey = 0 }: StoryPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    names: "",
    date: "",
    city: "",
    email: "",
    phone: "",
    notes: "",
  })

  // Intersection observer for lightweight, graceful editorial animations
  useEffect(() => {
    const reveal = (el: Element) => {
      el.classList.add("revealed")
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    )

    const elementsToReveal = document.querySelectorAll(
      ".story-reveal, .story-clip-reveal",
    )
    elementsToReveal.forEach((el) => {
      observer.observe(el)
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        reveal(el)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (inquiryRequestKey > 0) {
      setIsModalOpen(true)
    }
  }, [inquiryRequestKey])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      // Auto reset after 4s
      setFormSubmitted(false)
      setIsModalOpen(false)
      setFormData({
        names: "",
        date: "",
        city: "",
        email: "",
        phone: "",
        notes: "",
      })
    }, 3500)
  }

  return (
    <div className="story-paper-bg min-h-screen text-[#221915]">
      {/* ====================================================================
          MAIN EDITORIAL STORY (EXACTLY 6 SECTIONS)
          ==================================================================== */}
      <main id="story-main" className="story-page-flow">
        {/* ==================================================================
            SECTION 01 — THE INTRODUCTION
            Concept: A story begins behind every photograph.
            ================================================================== */}
        <section
          id="introduction"
          className="story-sec-intro"
          aria-labelledby="intro-heading"
        >
          <KolamMotif className="story-intro-watermark" />

          <div className="story-intro-container">
            {/* Left Column: Expressive Serif Headline & Introduction Copy */}
            <div className="story-intro-content story-reveal">
              <div className="story-eyebrow">OUR STORY · SRI CAPTURES</div>

              <h1 id="intro-heading" className="story-intro-headline">
                Every photograph has a story. Ours begins with{" "}
                <em>people.</em>
              </h1>

              <p className="story-intro-copy">
                We believe the most meaningful photographs are more than
                beautiful frames. They hold the emotions, traditions,
                relationships, and little moments that make every wedding
                unforgettable.
              </p>

              <div
                className="story-intro-filmstrip story-reveal"
                style={{ transitionDelay: "200ms" }}
                aria-label="Moments from Sri Captures weddings"
              >
                {[
                  {
                    src: storyImages.introFilm1,
                    alt: "Couple portrait in golden wedding light",
                    cap: "Portraits",
                  },
                  {
                    src: storyImages.introFilm2,
                    alt: "Family gathered during intimate wedding rituals",
                    cap: "Rituals",
                  },
                  {
                    src: storyImages.introFilm3,
                    alt: "Celebration at a destination wedding venue",
                    cap: "Celebration",
                  },
                ].map((item, index) => (
                  <figure
                    key={item.cap}
                    className="story-intro-film-item"
                    style={{ transitionDelay: `${240 + index * 90}ms` }}
                  >
                    <div className="story-intro-film-frame">
                      <img src={item.src} alt={item.alt} loading="eager" />
                    </div>
                    <figcaption>{item.cap}</figcaption>
                  </figure>
                ))}
              </div>
            </div>

            {/* Right Column: Asymmetrical Editorial Photographic Spread */}
            <div className="story-intro-visual">
              <div
                className="story-intro-accent-frame story-reveal"
                style={{ transitionDelay: "180ms" }}
              >
                <img
                  src={storyImages.introAccentTop}
                  alt="Bride and groom in an editorial wedding portrait"
                  loading="eager"
                />
              </div>

              {/* Main Vertical Photograph with Editorial Mat Crop */}
              <div className="story-intro-main-frame story-clip-reveal">
                <img
                  src={storyImages.introMain}
                  alt="A bride and groom in heirloom wedding silks sharing an intimate gaze"
                  loading="eager"
                />
              </div>

              {/* Smaller Overlapping Photo Resembling Printed Album Print */}
              <div
                className="story-intro-overlap-frame story-reveal"
                style={{ transitionDelay: "320ms" }}
              >
                <img
                  src={storyImages.introInset}
                  alt="Intimate detail of traditional gold wedding jewelry and silk touch"
                  loading="eager"
                />
              </div>

              <div
                className="story-intro-polaroid story-reveal"
                style={{ transitionDelay: "400ms" }}
              >
                <img
                  src={storyImages.introPolaroid}
                  alt="Candid laughter during a coastal wedding celebration"
                  loading="lazy"
                />
                <span>Behind the frame</span>
              </div>

              {/* Delicate Editorial Caption */}
              <div className="story-intro-caption story-reveal" style={{ transitionDelay: "450ms" }}>
                “Stories worth returning to.”
              </div>
            </div>
          </div>

          {/* Thin Ornamental Divider Inspired by Indian Invitation Borders */}
          <TraditionalInvitationDivider className="story-reveal" />
        </section>

        {/* ==================================================================
            SECTION 02 — THE STORY BEHIND SRI CAPTURES
            Concept: The people behind the lens.
            ================================================================== */}
        <section
          id="story-behind"
          className="story-sec-beginning story-paper-deep-bg"
          aria-labelledby="beginning-heading"
        >
          <div className="story-beginning-container">
            {/* Left Column: Behind-the-scenes photograph & Journal details */}
            <div className="story-bts-visual story-reveal">
              <div className="story-bts-main-frame story-reveal">
                <div className="story-photo-tape" aria-hidden="true" />
                <img
                  src={storyImages.btsMain}
                  alt="Sri Captures photographer thoughtfully framing authentic moments during a traditional wedding"
                  loading="lazy"
                />
              </div>

              {/* Smaller supporting photograph partially overlapping */}
              <div
                className="story-bts-sub-frame story-reveal"
                style={{ transitionDelay: "280ms" }}
              >
                <img
                  src={storyImages.btsSub}
                  alt="Close documentary view of the camera lens observing sacred rituals"
                  loading="lazy"
                />
              </div>

              {/* Handwritten-style personal journal annotations */}
              <div className="story-handwritten-note">
                “Hyderabad · watching the light settle before the ceremony”
              </div>
            </div>

            {/* Right Column: Storytelling editorial content */}
            <div
              className="story-beginning-content story-reveal"
              style={{ transitionDelay: "180ms" }}
            >
              <div className="story-eyebrow">OUR BEGINNING</div>

              {/* Oversized editorial quotation mark */}
              <div className="story-quote-mark" aria-hidden="true">
                “
              </div>

              <h2 id="beginning-heading" className="story-beginning-headline">
                We came to capture weddings. We stayed for the stories.
              </h2>

              <div className="story-maroon-rule" />

              <p className="story-beginning-text">
                SRI CAPTURES is built around the belief that every wedding has
                its own rhythm, its own traditions, and its own emotions. Beyond
                the ceremonies and celebrations, we look for the moments that
                reveal what the day truly means to the people living it.
              </p>

              <p className="story-beginning-text">
                From the quiet anticipation before a ceremony to the laughter
                shared between families, we approach every wedding with
                curiosity, patience, and an eye for the moments that cannot be
                recreated.
              </p>

              <div
                className="story-beginning-inline-gallery story-reveal"
                style={{ transitionDelay: "320ms" }}
              >
                <figure className="story-beginning-inline-item">
                  <div className="story-beginning-inline-frame">
                    <img
                      src={storyImages.beginningInline1}
                      alt="Joyful rose petal moment during the wedding procession"
                      loading="lazy"
                    />
                  </div>
                  <figcaption>Celebration in motion</figcaption>
                </figure>
                <figure className="story-beginning-inline-item">
                  <div className="story-beginning-inline-frame">
                    <img
                      src={storyImages.beginningInline2}
                      alt="Documentary view of sacred wedding ceremony details"
                      loading="lazy"
                    />
                  </div>
                  <figcaption>Sacred details</figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            SECTION 03 — OUR PHILOSOPHY
            Concept: What we believe about wedding photography.
            (Deep Maroon Background with Warm Ivory Typography & Antique Gold)
            ================================================================== */}
        <section
          id="philosophy"
          className="story-sec-philosophy"
          aria-labelledby="philosophy-heading"
        >
          {/* Subtle Indian Kolam Arch Watermark */}
          <KolamMotif className="story-philosophy-watermark" />

          <div className="story-philosophy-container">
            {/* Header: Expressive Headline */}
            <div className="story-philosophy-header story-reveal">
              <div className="story-philosophy-eyebrow">BEHIND EVERY FRAME</div>

              <h2 id="philosophy-heading" className="story-philosophy-headline">
                We don't just document a wedding. We{" "}
                <em>preserve how it felt.</em>
              </h2>
            </div>

            {/* Three Principles in 3-Column Desktop / Vertical Mobile */}
            <div className="story-principles-grid">
              {/* Principle 01 — OBSERVE */}
              <div
                className="story-principle-card story-reveal"
                style={{ transitionDelay: "150ms" }}
              >
                <div className="story-principle-photo">
                  <img
                    src={storyImages.philosophyObserve}
                    alt="Quiet conversation between the couple before the ceremony"
                    loading="lazy"
                  />
                </div>
                <span className="story-principle-number">01</span>
                <h3 className="story-principle-title">OBSERVE</h3>
                <p className="story-principle-desc">
                  We pay attention to the moments that unfold naturally, even
                  when nobody is looking at the camera.
                </p>
              </div>

              {/* Principle 02 — FEEL */}
              <div
                className="story-principle-card story-reveal"
                style={{ transitionDelay: "300ms" }}
              >
                <div className="story-principle-photo">
                  <img
                    src={storyImages.philosophyFeel}
                    alt="Emotional embrace shared between family members"
                    loading="lazy"
                  />
                </div>
                <span className="story-principle-number">02</span>
                <h3 className="story-principle-title">FEEL</h3>
                <p className="story-principle-desc">
                  We look beyond appearances to understand the relationships,
                  emotions, and traditions that make each celebration personal.
                </p>
              </div>

              {/* Principle 03 — PRESERVE */}
              <div
                className="story-principle-card story-reveal"
                style={{ transitionDelay: "450ms" }}
              >
                <div className="story-principle-photo">
                  <img
                    src={storyImages.philosophyPreserve}
                    alt="Couple sharing a sacred vow during the wedding ceremony"
                    loading="lazy"
                  />
                </div>
                <span className="story-principle-number">03</span>
                <h3 className="story-principle-title">PRESERVE</h3>
                <p className="story-principle-desc">
                  We create photographs that bring you back to the people, the
                  atmosphere, and the feelings of your wedding day.
                </p>
              </div>
            </div>

            <div
              className="story-philosophy-mosaic story-reveal"
              style={{ transitionDelay: "220ms" }}
            >
              <div className="story-philosophy-mosaic-wide story-clip-reveal">
                <img
                  src={storyImages.philosophyWide}
                  alt="Wedding guests celebrating during an evening reception"
                  loading="lazy"
                />
              </div>
              <div className="story-philosophy-mosaic-stack">
                <div className="story-philosophy-mosaic-tall">
                  <img
                    src={storyImages.philosophyDetail}
                    alt="Editorial couple portrait in soft morning light"
                    loading="lazy"
                  />
                </div>
                <div className="story-philosophy-mosaic-note">
                  “Light, colour, and the people you love — preserved as you felt
                  them.”
                </div>
              </div>
            </div>

            {/* Bottom Row: Supporting Quote and Emotional Moment Photograph */}
            <div className="story-philosophy-bottom-row story-reveal">
              <p className="story-philosophy-quote-sub">
                “Because a true photograph lives in memory, not on paper alone.”
              </p>

              <div>
                <div className="story-philosophy-photo-frame">
                  <img
                    src={storyImages.philosophyMoment}
                    alt="Tender hands held during the sacred ceremony, transitioning to natural color"
                    loading="lazy"
                  />
                </div>
                <div className="story-philosophy-photo-caption">
                  A sacred touch · Agni Sakshi
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            SECTION 04 — OUR APPROACH
            Concept: How we become part of your story.
            (Photographic Journal Spread: We Listen, We Observe, We Preserve)
            ================================================================== */}
        <section
          id="approach"
          className="story-sec-approach"
          aria-labelledby="approach-heading"
        >
          <div className="story-approach-container">
            {/* Section Eyebrow & Headline */}
            <div className="story-approach-top story-reveal">
              <div className="story-eyebrow">OUR APPROACH</div>
              <h2 id="approach-heading" className="story-approach-headline">
                Every story deserves to be understood before it is captured.
              </h2>
            </div>

            {/* Asymmetrical 3-Photo Collage Spread */}
            <div className="story-approach-collage">
              {/* Card 1: WE LISTEN */}
              <div
                className="story-approach-card story-reveal"
                style={{ transitionDelay: "120ms" }}
              >
                <div className="story-approach-frame">
                  <img
                    src={storyImages.approachListen}
                    alt="Couple enjoying an intimate, relaxed conversation together"
                    loading="lazy"
                  />
                </div>
                <div className="story-approach-text">
                  <h3 className="story-step-label">WE LISTEN</h3>
                  <p className="story-step-desc">
                    We learn about your celebration, your expectations, and the
                    traditions that matter to you.
                  </p>
                </div>
              </div>

              {/* Card 2: WE OBSERVE */}
              <div
                className="story-approach-card story-reveal"
                style={{ transitionDelay: "260ms" }}
              >
                <div className="story-approach-frame">
                  <img
                    src={storyImages.approachObserve}
                    alt="Observing sacred ceremonial rites and rituals with quiet reverence"
                    loading="lazy"
                  />
                </div>
                <div className="story-approach-text">
                  <h3 className="story-step-label">WE OBSERVE</h3>
                  <p className="story-step-desc">
                    We pay attention to the details, the people, and the moments
                    unfolding naturally around us.
                  </p>
                </div>
              </div>

              {/* Card 3: WE PRESERVE */}
              <div
                className="story-approach-card story-reveal"
                style={{ transitionDelay: "400ms" }}
              >
                <div className="story-approach-frame">
                  <img
                    src={storyImages.approachPreserve}
                    alt="Emotional candid embrace shared between family members"
                    loading="lazy"
                  />
                </div>
                <div className="story-approach-text">
                  <h3 className="story-step-label">WE PRESERVE</h3>
                  <p className="story-step-desc">
                    We bring those moments together into a collection of
                    memories that feels true to your wedding.
                  </p>
                </div>
              </div>
            </div>

            {/* Handwritten Connecting Annotation */}
            <div className="story-approach-annotation story-reveal">
              <p>
                “Note: Present for every blessing, yet never in the way of the
                moment.”
              </p>
            </div>
          </div>
        </section>

        {/* ==================================================================
            SECTION 05 — THE STORIES WE CARRY
            Concept: Our story lives in the people we photograph.
            (Editorial Archival Image Gallery)
            ================================================================== */}
        <section
          id="stories-we-carry"
          className="story-sec-archive"
          aria-labelledby="archive-heading"
        >
          <div className="story-archive-container">
            {/* Central Editorial Statement */}
            <div className="story-archive-statement-wrap story-reveal">
              <div className="story-eyebrow">THE ARCHIVE</div>
              <h2 id="archive-heading" className="story-archive-headline">
                “The photographs we treasure most are often the moments nobody
                planned.”
              </h2>
              <p className="story-archive-sub">
                Every couple brings a different story. Every family adds
                another layer. We are here to honour what makes each
                celebration uniquely yours.
              </p>
            </div>

            {/* Asymmetrical Gallery Composition with Archival Details */}
            <div className="story-archive-gallery">
              {/* Photo 1: Emotional Couple Portrait (Wide) */}
              <div
                className="story-archive-item story-archive-item-1 story-reveal"
                style={{ transitionDelay: "100ms" }}
              >
                <div className="story-archive-frame">
                  <div className="story-album-corner tl" />
                  <div className="story-album-corner br" />
                  <img
                    src={storyImages.archive1}
                    alt="An editorial couple portrait bathed in golden morning light"
                    loading="lazy"
                  />
                </div>
                <div className="story-archive-caption">
                  A timeless beginning · The grand celebration
                </div>
              </div>

              {/* Photo 2: Intimate Preparation Moment */}
              <div
                className="story-archive-item story-archive-item-2 story-reveal"
                style={{ transitionDelay: "220ms" }}
              >
                <div className="story-archive-frame">
                  <img
                    src={storyImages.archive2}
                    alt="Bride in bridal silk saree during quiet morning preparation"
                    loading="lazy"
                  />
                </div>
                <div className="story-archive-caption">
                  Amma's blessings · The hours before
                </div>
              </div>

              {/* Photo 3: Traditional Ritual / Rose Petal Shower */}
              <div
                className="story-archive-item story-archive-item-3 story-reveal"
                style={{ transitionDelay: "340ms" }}
              >
                <div className="story-archive-frame">
                  <img
                    src={storyImages.archive3}
                    alt="Rose petal shower during joyous wedding celebration"
                    loading="lazy"
                  />
                </div>
                <div className="story-archive-caption">
                  Petals &amp; prayers · Joy in full colour
                </div>
              </div>

              {/* Photo 4: Candid Laughter & Family Interaction */}
              <div
                className="story-archive-item story-archive-item-4 story-reveal"
                style={{ transitionDelay: "460ms" }}
              >
                <div className="story-archive-frame">
                  <img
                    src={storyImages.archive4}
                    alt="Heartfelt unscripted laughter among family and friends"
                    loading="lazy"
                  />
                </div>
                <div className="story-archive-caption">
                  Unscripted laughter · The people you cherish
                </div>
              </div>

              {/* Photo 5: Intimate Sacred Vows */}
              <div
                className="story-archive-item story-archive-item-5 story-reveal"
                style={{ transitionDelay: "580ms" }}
              >
                <div className="story-archive-frame">
                  <div className="story-album-corner tl" />
                  <div className="story-album-corner br" />
                  <img
                    src={storyImages.archive5}
                    alt="Deep emotional embrace and connection during the wedding vows"
                    loading="lazy"
                  />
                </div>
                <div className="story-archive-caption">
                  The sacred vow · Held for a lifetime
                </div>
              </div>

              <div
                className="story-archive-item story-archive-item-6 story-reveal"
                style={{ transitionDelay: "640ms" }}
              >
                <div className="story-archive-frame">
                  <img
                    src={storyImages.archive6}
                    alt="Photographer documenting authentic wedding moments"
                    loading="lazy"
                  />
                </div>
                <div className="story-archive-caption">
                  On assignment · Always watching the light
                </div>
              </div>

              <div
                className="story-archive-item story-archive-item-7 story-reveal"
                style={{ transitionDelay: "700ms" }}
              >
                <div className="story-archive-frame">
                  <img
                    src={storyImages.archive7}
                    alt="Close detail of camera and ceremony framing"
                    loading="lazy"
                  />
                </div>
                <div className="story-archive-caption">
                  Through the lens · Documentary craft
                </div>
              </div>

              <div
                className="story-archive-item story-archive-item-8 story-reveal"
                style={{ transitionDelay: "760ms" }}
              >
                <div className="story-archive-frame">
                  <div className="story-album-corner tl" />
                  <div className="story-album-corner br" />
                  <img
                    src={storyImages.archive8}
                    alt="Twilight portrait of newlyweds walking together"
                    loading="lazy"
                  />
                </div>
                <div className="story-archive-caption">
                  Twilight walk · Where the day softens
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            SECTION 06 — FINAL CTA: GET A QUOTE
            Concept: Your story could be next.
            (Emotional, Timeless Invitation with Wide Wedding Photograph)
            ================================================================== */}
        <section
          id="get-a-quote"
          className="story-sec-cta"
          aria-labelledby="cta-heading"
        >
          {/* Wide Wedding Photograph Background with Soft Artistic Overlay */}
          <div
            className="story-cta-bg-image"
            style={{ backgroundImage: `url(${storyImages.ctaWide})` }}
            aria-hidden="true"
          />
          <div className="story-cta-overlay" aria-hidden="true" />

          <div className="story-cta-container story-cta-layout">
            <div className="story-cta-content story-reveal">
              <div className="story-cta-label">YOUR STORY STARTS HERE</div>

              <h2 id="cta-heading" className="story-cta-headline">
                We would love to be part of <em>your story.</em>
              </h2>

              <p className="story-cta-text">
                Tell us about your wedding, the people who matter to you, and
                the moments you want to remember. Let's begin with a
                conversation.
              </p>

              <button
                onClick={() => setIsModalOpen(true)}
                className="story-cta-btn"
                aria-label="Open wedding quote request form"
              >
                GET A QUOTE <span>→</span>
              </button>
            </div>

            <div
              className="story-cta-visual story-reveal"
              style={{ transitionDelay: "240ms" }}
              aria-hidden="true"
            >
              <div className="story-cta-stack-main">
                <img
                  src={storyImages.ctaStack1}
                  alt=""
                  loading="lazy"
                />
              </div>
              <div className="story-cta-stack-overlap">
                <img
                  src={storyImages.ctaStack2}
                  alt=""
                  loading="lazy"
                />
              </div>
              <p className="story-cta-stack-caption">
                Your chapter · Our honour to capture
              </p>
            </div>

            {/* Final Heritage-inspired Ornamental Divider Leading into Footer */}
            <div className="story-final-divider story-reveal">
              <div className="story-final-divider-line" />
              <svg
                width="28"
                height="16"
                viewBox="0 0 28 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 1C14 1 16 6 20 8C16 8 14 12 14 15C14 12 12 8 8 8C12 6 14 1 14 1Z"
                  fill="currentColor"
                />
              </svg>
              <div className="story-final-divider-line" />
            </div>
          </div>
        </section>
      </main>

      {/* ====================================================================
          ENQUIRY / GET A QUOTE MODAL (TRIGGERED BY CTA & HEADER)
          ==================================================================== */}
      {isModalOpen && (
        <div
          className="story-modal-backdrop"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="story-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="story-modal-close"
              aria-label="Close quote modal"
            >
              ✕
            </button>

            {formSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#f4ecd8] border border-[#b38b4d] flex items-center justify-center text-[#581619] text-2xl font-serif">
                  ✓
                </div>
                <h3 className="font-editorial-serif text-3xl text-[#581619] mb-3">
                  Thank You for Reaching Out
                </h3>
                <p className="font-editorial-sans text-sm text-[#52443d] max-w-md mx-auto leading-relaxed">
                  We have received your celebration details. Our team will
                  personally review your story and contact you within 24 hours.
                </p>
              </div>
            ) : (
              <div>
                <div className="story-eyebrow">BEGIN A CONVERSATION</div>
                <h3 id="modal-title" className="story-modal-title">
                  Tell Us About Your Wedding
                </h3>
                <p className="story-modal-sub">
                  Every celebration is personal. Share a few details, and let us
                  craft a customized photography experience for you.
                </p>

                <form onSubmit={handleFormSubmit}>
                  <div className="story-form-group">
                    <label className="story-form-label" htmlFor="couple-names">
                      Couple / Family Names *
                    </label>
                    <input
                      id="couple-names"
                      type="text"
                      required
                      placeholder="e.g. Radhika &amp; Vikram"
                      className="story-form-input"
                      value={formData.names}
                      onChange={(e) =>
                        setFormData({ ...formData, names: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="story-form-group">
                      <label className="story-form-label" htmlFor="wedding-date">
                        Wedding Dates / Month *
                      </label>
                      <input
                        id="wedding-date"
                        type="text"
                        required
                        placeholder="e.g. November 2026"
                        className="story-form-input"
                        value={formData.date}
                        onChange={(e) =>
                          setFormData({ ...formData, date: e.target.value })
                        }
                      />
                    </div>

                    <div className="story-form-group">
                      <label className="story-form-label" htmlFor="wedding-city">
                        City / Venue *
                      </label>
                      <input
                        id="wedding-city"
                        type="text"
                        required
                        placeholder="e.g. Hyderabad / Udaipur"
                        className="story-form-input"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="story-form-group">
                      <label className="story-form-label" htmlFor="contact-email">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="yourname@email.com"
                        className="story-form-input"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>

                    <div className="story-form-group">
                      <label className="story-form-label" htmlFor="contact-phone">
                        Phone / WhatsApp *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        className="story-form-input"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="story-form-group">
                    <label className="story-form-label" htmlFor="wedding-notes">
                      Tell us about your celebration &amp; what matters most
                    </label>
                    <textarea
                      id="wedding-notes"
                      rows={3}
                      placeholder="Traditions, special moments, ceremonies planned..."
                      className="story-form-textarea"
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                    />
                  </div>

                  <button type="submit" className="story-form-submit">
                    Send Wedding Enquiry →
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
