import { useState, useEffect } from "react";
import "./contact.css";

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=86`;

/* ── Curated Authentic Indian Wedding Photos ─────────────────────── */
const HERO_PHOTO = img("photo-1599462616558-2b75fd26a283", 1600);
const FORM_PHOTO = img("photo-1630526720753-aa4e71acf67d", 1200);
const CLOSING_PHOTO = img("photo-1587271339318-2e78fdf79586", 1800);

const AVAILABLE_SERVICES = [
  "Wedding Photography",
  "Wedding Films",
  "Candid Photography",
  "Couple or Bridal Portraits",
  "Multiple Events",
  "Not Sure Yet",
];

const FAQ_ITEMS = [
  {
    q: "When should we enquire about our wedding date?",
    a: "We recommend reaching out 3 to 9 months in advance, especially for popular auspicious wedding dates, to ensure our crew is reserved exclusively for your celebration.",
  },
  {
    q: "Can we discuss photography and films together?",
    a: "Yes, absolutely. The majority of couples choose our combined photography and cinematic film team. Having a single coordinated team guarantees a harmonious aesthetic and a smooth, unobtrusive presence on your big day.",
  },
  {
    q: "Can you cover multiple wedding events?",
    a: "Yes. From single-day ceremonies to 3-day festivities—including Haldi, Mehendi, Sangeet, traditional wedding muhurtham, and reception—we customize our team and schedule to cover every ritual.",
  },
  {
    q: "What happens after we send an enquiry?",
    a: "We review your dates, location, and celebration scale. Within 24 to 48 hours, we connect with you to share our availability, answer questions, and provide a clear, transparent quote.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    weddingDate: "",
    location: "",
    selectedServices: [] as string[],
    notes: "",
  });

  const [errors, setErrors] = useState<{ fullName?: string; email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  /* Scroll reveal observer */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("cnt-visible");
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll(".cnt-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToForm = () => {
    document.getElementById("contact-form-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => {
      const exists = prev.selectedServices.includes(service);
      return {
        ...prev,
        selectedServices: exists
          ? prev.selectedServices.filter((s) => s !== service)
          : [...prev.selectedServices, service],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { fullName?: string; email?: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate reliable dispatch & feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  return (
    <main className="contact-page" aria-label="SRI CAPTURES - Wedding Photography Contact & Enquiry">
      {/* ───────────────────────────────────────────────────────────
          SECTION 1 — A WARM WELCOME
         ─────────────────────────────────────────────────────────── */}
      <section className="cnt-hero" id="contact-welcome" aria-labelledby="cnt-hero-heading">
        <div className="cnt-container">
          <div className="cnt-hero__layout">
            {/* Left text column */}
            <div className="cnt-hero__content cnt-reveal">
              <span className="cnt-eyebrow">LET'S BEGIN</span>
              <h1 id="cnt-hero-heading" className="cnt-hero__title">
                Tell us about the celebration<br />
                <em>you’re dreaming of.</em>
              </h1>
              <p className="cnt-hero__body">
                Every wedding is different. Share a little about your plans, and let’s explore
                how SRI CAPTURES can help preserve your story.
              </p>

              <button
                className="cnt-scroll-link"
                onClick={scrollToForm}
                aria-label="Scroll to enquiry form"
              >
                START YOUR ENQUIRY <span aria-hidden="true">↓</span>
              </button>
            </div>

            {/* Right photo with subtle invitation-style border */}
            <div className="cnt-hero__visual cnt-reveal">
              <div className="cnt-invitation-frame">
                <div className="cnt-invitation-border-inner" aria-hidden="true" />
                <img
                  src={HERO_PHOTO}
                  alt="Traditional Indian wedding ceremony moments"
                  loading="eager"
                />
                <span className="cnt-frame-caption">SRI CAPTURES · WEDDING INQUIRY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Traditional Indian invitation linework divider */}
        <div className="cnt-ornament" aria-hidden="true">
          <span /><i>&#9670;</i><span />
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 2 — A FEW WORDS BEFORE WE BEGIN
         ─────────────────────────────────────────────────────────── */}
      <section className="cnt-expectations" aria-labelledby="cnt-expect-heading">
        <div className="cnt-container">
          <div className="cnt-expectations__header cnt-reveal">
            <span className="cnt-eyebrow">OUR PROCESS</span>
            <h2 id="cnt-expect-heading" className="cnt-expectations__title">
              Every beautiful collaboration<br />
              <em>starts with a conversation.</em>
            </h2>
            <p className="cnt-expectations__sub">
              Tell us about your wedding dates, the celebrations you’re planning, and what matters
              most to you. We’ll review your enquiry and get back to you to discuss the next steps.
            </p>
          </div>

          <div className="cnt-steps-row cnt-reveal">
            <div className="cnt-step-item">
              <span className="cnt-step-num">01</span>
              <h3 className="cnt-step-title">Share your plans</h3>
              <p className="cnt-step-desc">Tell us about your celebration, dates, and locations.</p>
            </div>
            <div className="cnt-step-divider" aria-hidden="true" />

            <div className="cnt-step-item">
              <span className="cnt-step-num">02</span>
              <h3 className="cnt-step-title">Let's connect</h3>
              <p className="cnt-step-desc">Discuss your photography or film requirements with our team.</p>
            </div>
            <div className="cnt-step-divider" aria-hidden="true" />

            <div className="cnt-step-item">
              <span className="cnt-step-num">03</span>
              <h3 className="cnt-step-title">Plan together</h3>
              <p className="cnt-step-desc">Explore a suitable approach and clear package for your wedding.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 3 — YOUR WEDDING ENQUIRY (Enquiry Form)
         ─────────────────────────────────────────────────────────── */}
      <section
        className="cnt-enquiry-section"
        id="contact-form-section"
        aria-labelledby="cnt-form-heading"
      >
        <div className="cnt-container">
          <div className="cnt-form-layout">
            {/* Left Column: Invitation Message & Portrait */}
            <div className="cnt-form-side cnt-reveal">
              <div className="cnt-form-side__card">
                <span className="cnt-eyebrow">A NOTE FOR COUPLES</span>
                <h3 className="cnt-form-side__title">
                  We look forward to hearing your story.
                </h3>
                <p className="cnt-form-side__text">
                  To ensure that every celebration receives our complete devotion and artistry,
                  we take on a limited number of weddings each year.
                </p>
                <p className="cnt-form-side__text">
                  Please share as many details as you are comfortable with—your date, venue,
                  and ceremonies—so we can provide a tailored response.
                </p>

                <figure className="cnt-form-side__photo">
                  <img
                    src={FORM_PHOTO}
                    alt="Bride and groom at a temple wedding ceremony"
                    loading="lazy"
                  />
                  <figcaption>Moments preserved with honesty & heart</figcaption>
                </figure>
              </div>
            </div>

            {/* Right Column: Clean, Accessible Enquiry Form */}
            <div className="cnt-form-main cnt-reveal">
              <div className="cnt-form-card">
                <div className="cnt-card-header">
                  <span className="cnt-eyebrow">ENQUIRY FORM</span>
                  <h2 id="cnt-form-heading" className="cnt-form-title">
                    Let’s talk about your wedding.
                  </h2>
                  <p className="cnt-form-intro">
                    Fields marked with <span className="cnt-req">*</span> are required.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="cnt-success-panel" role="alert">
                    <div className="cnt-success-icon" aria-hidden="true">✓</div>
                    <h3 className="cnt-success-title">Thank you, {formData.fullName}!</h3>
                    <p className="cnt-success-text">
                      Your wedding enquiry has been safely received. We will review your celebration details
                      and reply to <strong>{formData.email}</strong> shortly.
                    </p>
                    <button
                      className="cnt-reset-btn"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          fullName: "",
                          email: "",
                          phone: "",
                          weddingDate: "",
                          location: "",
                          selectedServices: [],
                          notes: "",
                        });
                      }}
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form className="cnt-form" onSubmit={handleSubmit} noValidate>
                    {/* Full Name */}
                    <div className="cnt-field">
                      <label htmlFor="cnt-fullname" className="cnt-label">
                        Full Name <span className="cnt-req">*</span>
                      </label>
                      <input
                        id="cnt-fullname"
                        type="text"
                        name="fullName"
                        className={`cnt-input ${errors.fullName ? "is-invalid" : ""}`}
                        placeholder="e.g. Priya Sharma & Arjun Reddy"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        aria-required="true"
                        aria-invalid={!!errors.fullName}
                      />
                      {errors.fullName && (
                        <span className="cnt-error-msg">{errors.fullName}</span>
                      )}
                    </div>

                    {/* Email Address */}
                    <div className="cnt-field">
                      <label htmlFor="cnt-email" className="cnt-label">
                        Email Address <span className="cnt-req">*</span>
                      </label>
                      <input
                        id="cnt-email"
                        type="email"
                        name="email"
                        className={`cnt-input ${errors.email ? "is-invalid" : ""}`}
                        placeholder="yourname@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        aria-required="true"
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <span className="cnt-error-msg">{errors.email}</span>
                      )}
                    </div>

                    {/* Phone / WhatsApp */}
                    <div className="cnt-field">
                      <label htmlFor="cnt-phone" className="cnt-label">
                        Phone / WhatsApp Number <span className="cnt-opt">(Optional)</span>
                      </label>
                      <input
                        id="cnt-phone"
                        type="tel"
                        name="phone"
                        className="cnt-input"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>

                    {/* Wedding Date & Location (Two columns on tablet/desktop) */}
                    <div className="cnt-field-row">
                      <div className="cnt-field">
                        <label htmlFor="cnt-date" className="cnt-label">
                          Wedding Date <span className="cnt-opt">(If decided)</span>
                        </label>
                        <input
                          id="cnt-date"
                          type="date"
                          name="weddingDate"
                          className="cnt-input"
                          value={formData.weddingDate}
                          onChange={(e) =>
                            setFormData({ ...formData, weddingDate: e.target.value })
                          }
                        />
                      </div>

                      <div className="cnt-field">
                        <label htmlFor="cnt-location" className="cnt-label">
                          Wedding Location <span className="cnt-opt">(City / Venue)</span>
                        </label>
                        <input
                          id="cnt-location"
                          type="text"
                          name="location"
                          className="cnt-input"
                          placeholder="e.g. Hyderabad, Udaipur, Goa"
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({ ...formData, location: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    {/* Services Interested In */}
                    <div className="cnt-field">
                      <span className="cnt-label">
                        Services Interested In <span className="cnt-opt">(Select any)</span>
                      </span>
                      <div className="cnt-services-grid" role="group" aria-label="Select services">
                        {AVAILABLE_SERVICES.map((srv) => {
                          const isChecked = formData.selectedServices.includes(srv);
                          return (
                            <button
                              key={srv}
                              type="button"
                              className={`cnt-service-chip ${isChecked ? "is-selected" : ""}`}
                              onClick={() => handleServiceToggle(srv)}
                              aria-pressed={isChecked}
                            >
                              <span className="cnt-chip-check">{isChecked ? "✓" : "+"}</span>
                              <span>{srv}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Message / Tell us about your plans */}
                    <div className="cnt-field">
                      <label htmlFor="cnt-notes" className="cnt-label">
                        Tell Us About Your Plans <span className="cnt-opt">(Optional)</span>
                      </label>
                      <textarea
                        id="cnt-notes"
                        name="notes"
                        rows={4}
                        className="cnt-textarea"
                        placeholder="Tell us about the ceremonies (e.g. Haldi, Sangeet, Muhurtham), expected guest size, or any specific vision you have in mind..."
                        value={formData.notes}
                        onChange={(e) =>
                          setFormData({ ...formData, notes: e.target.value })
                        }
                      />
                    </div>

                    <button
                      type="submit"
                      className="cnt-submit-btn"
                      disabled={isSubmitting}
                      aria-busy={isSubmitting}
                    >
                      {isSubmitting ? "SENDING ENQUIRY..." : "SEND ENQUIRY →"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 4 — PREFER A DIRECT CONVERSATION?
         ─────────────────────────────────────────────────────────── */}
      <section className="cnt-direct" aria-labelledby="cnt-direct-heading">
        <div className="cnt-container">
          <div className="cnt-direct__card cnt-reveal">
            <div className="cnt-direct__text">
              <span className="cnt-eyebrow">DIRECT CONTACT</span>
              <h2 id="cnt-direct-heading" className="cnt-direct__title">
                Sometimes, a conversation is easier.
              </h2>
              <p className="cnt-direct__desc">
                If you prefer speaking directly or sending a quick message on WhatsApp,
                feel free to reach out through any of our channels below.
              </p>
            </div>

            <div className="cnt-direct__channels">
              <a href="tel:+919849012345" className="cnt-channel-link">
                <div className="cnt-channel-icon" aria-hidden="true">📞</div>
                <div className="cnt-channel-info">
                  <span className="cnt-channel-label">PHONE CALL</span>
                  <span className="cnt-channel-value">+91 98490 12345</span>
                </div>
              </a>

              <a
                href="https://wa.me/919849012345?text=Hello%20SRI%20CAPTURES%2C%20I%20would%20like%20to%20enquire%20about%20wedding%20photography"
                target="_blank"
                rel="noreferrer"
                className="cnt-channel-link"
              >
                <div className="cnt-channel-icon" aria-hidden="true">💬</div>
                <div className="cnt-channel-info">
                  <span className="cnt-channel-label">WHATSAPP</span>
                  <span className="cnt-channel-value">Chat on WhatsApp</span>
                </div>
              </a>

              <a href="mailto:hello@sricaptures.com" className="cnt-channel-link">
                <div className="cnt-channel-icon" aria-hidden="true">✉️</div>
                <div className="cnt-channel-info">
                  <span className="cnt-channel-label">EMAIL US</span>
                  <span className="cnt-channel-value">hello@sricaptures.com</span>
                </div>
              </a>

              <div className="cnt-channel-link cnt-channel-link--static">
                <div className="cnt-channel-icon" aria-hidden="true">📍</div>
                <div className="cnt-channel-info">
                  <span className="cnt-channel-label">STUDIO BASE</span>
                  <span className="cnt-channel-value">Hyderabad & Bengaluru · Pan-India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 5 — A FEW THINGS YOU MAY BE WONDERING (FAQ)
         ─────────────────────────────────────────────────────────── */}
      <section className="cnt-faq" aria-labelledby="cnt-faq-heading">
        <div className="cnt-container">
          <div className="cnt-faq__header cnt-reveal">
            <span className="cnt-eyebrow">COMMON QUESTIONS</span>
            <h2 id="cnt-faq-heading" className="cnt-faq__title">
              A few things you may be wondering.
            </h2>
          </div>

          <div className="cnt-accordion cnt-reveal">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={item.q} className={`cnt-accordion-item ${isOpen ? "is-open" : ""}`}>
                  <button
                    className="cnt-accordion-trigger"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="cnt-accordion-q">{item.q}</span>
                    <span className="cnt-accordion-indicator" aria-hidden="true">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      id={`faq-answer-${index}`}
                      className="cnt-accordion-content"
                      role="region"
                    >
                      <p className="cnt-accordion-a">{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 6 — WE'D LOVE TO HEAR YOUR STORY (Deep Maroon Closing)
         ─────────────────────────────────────────────────────────── */}
      <section className="cnt-closing" aria-labelledby="cnt-closing-heading">
        <div className="cnt-closing__bg" style={{ backgroundImage: `url("${CLOSING_PHOTO}")` }} />
        <div className="cnt-closing__veil" aria-hidden="true" />

        <div className="cnt-container cnt-closing__content cnt-reveal">
          <div className="cnt-closing__ornament" aria-hidden="true">
            <svg viewBox="0 0 240 24" fill="none">
              <line x1="0" y1="12" x2="96" y2="12" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.45" />
              <path d="M120 4 L128 12 L120 20 L112 12Z" fill="currentColor" fillOpacity="0.7" />
              <line x1="144" y1="12" x2="240" y2="12" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.45" />
            </svg>
          </div>

          <span className="cnt-eyebrow cnt-eyebrow--light">THE NEXT STEP</span>
          <h2 id="cnt-closing-heading" className="cnt-closing__title">
            The first step is simply<br />
            <em>saying hello.</em>
          </h2>
          <p className="cnt-closing__desc">
            Tell us a little about your plans. We’ll take it from there, one conversation at a time.
          </p>

          <button
            className="cnt-closing-cta-btn"
            onClick={scrollToForm}
            aria-label="Get a quote by completing the enquiry form"
          >
            <span>GET A QUOTE</span>
            <span className="cnt-cta-arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </section>
    </main>
  );
}
