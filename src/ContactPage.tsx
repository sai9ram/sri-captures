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
                        placeholder="+91 81424 90545"
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
              <a href="tel:+918142490545" className="cnt-channel-link">
                <div className="cnt-channel-icon cnt-channel-icon--phone" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
                <div className="cnt-channel-info">
                  <span className="cnt-channel-label">PHONE CALL</span>
                  <span className="cnt-channel-value">+91 81424 90545</span>
                </div>
              </a>

              <a
                href="https://wa.me/918142490545?text=Hello%20SRI%20CAPTURES%2C%20I%20would%20like%20to%20enquire%20about%20wedding%20photography"
                target="_blank"
                rel="noreferrer"
                className="cnt-channel-link"
              >
                <div className="cnt-channel-icon cnt-channel-icon--whatsapp" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 1.892.525 3.663 1.438 5.176L2.1 21.9l4.87-1.308A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.635 0-3.167-.487-4.453-1.328l-.32-.208-2.91.782.78-2.84-.226-.339A8.17 8.17 0 013.8 12c0-4.529 3.671-8.2 8.2-8.2s8.2 3.671 8.2 8.2-3.671 8.2-8.2 8.2z" />
                    <path d="M17.507 14.307l-.009.075c-.244.757-.96 1.34-1.782 1.453-.787.108-1.558.005-2.298-.225-1.428-.444-2.738-1.25-3.882-2.327-1.143-1.077-2.023-2.333-2.585-3.738-.285-.715-.436-1.472-.375-2.261.06-.799.58-1.523 1.309-1.838.225-.097.472-.146.721-.146.188 0 .375.028.555.084.285.089.518.291.645.563.263.563.563 1.106.885 1.631.18.292.195.66.037.968-.112.217-.262.405-.442.562-.18.158-.337.338-.457.54-.038.067-.038.15 0 .218.428.847.982 1.613 1.65 2.28.667.668 1.433 1.223 2.28 1.65.068.038.15.038.218 0 .202-.12.382-.277.54-.457.157-.18.345-.33.562-.442.308-.158.676-.143.968.037.525.322 1.068.622 1.631.885.272.127.474.36.563.645.056.18.084.367.084.555 0 .249-.049.496-.146.721z" />
                  </svg>
                </div>
                <div className="cnt-channel-info">
                  <span className="cnt-channel-label">WHATSAPP</span>
                  <span className="cnt-channel-value">+91 81424 90545</span>
                </div>
              </a>

              <a href="mailto:sricapture929@gmail.com" className="cnt-channel-link">
                <div className="cnt-channel-icon cnt-channel-icon--email" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <div className="cnt-channel-info">
                  <span className="cnt-channel-label">EMAIL US</span>
                  <span className="cnt-channel-value">sricapture929@gmail.com</span>
                </div>
              </a>

              <a
                href="https://instagram.com/sri_capture9?srtk=MW5ndWRmeDF5dW85bw%3D%3D&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                className="cnt-channel-link"
              >
                <div className="cnt-channel-icon cnt-channel-icon--instagram" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <div className="cnt-channel-info">
                  <span className="cnt-channel-label">INSTAGRAM</span>
                  <span className="cnt-channel-value">@sri_capture9</span>
                </div>
              </a>
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
