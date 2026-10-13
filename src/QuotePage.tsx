import { useState, useMemo, useEffect } from "react";
import "./quote.css";

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=86`;

/* ── Authentic Indian Wedding Visuals ─────────────────────────────── */
const HERO_PHOTO = img("photo-1630526720753-aa4e71acf67d", 1800);
const CANDID_STYLE_IMG = img("photo-1611106211090-8f3c79eb8552", 1200);
const TRAD_STYLE_IMG = img("photo-1599462616558-2b75fd26a283", 1200);
const LED_WALL_IMG = img("photo-1741201864879-c5e7f81c98b0", 1200);
const LIVESTREAM_IMG = img("photo-1665960213508-48f07086d49c", 1200);

export interface ServiceOption {
  id: string;
  name: string;
  price: number;
  category: "photo" | "video" | "drone";
}

export interface WeddingEvent {
  id: string;
  name: string;
  subtitle: string;
  services: ServiceOption[];
}

/* ── Centralized Pricing & Event Configuration ───────────────────── */
export const WEDDING_EVENTS: WeddingEvent[] = [
  {
    id: "engagement",
    name: "Engagement",
    subtitle: "Roka, Ring Ceremony & Blessings",
    services: [
      { id: "eng_trad_photo", name: "Traditional Photo", price: 10000, category: "photo" },
      { id: "eng_trad_video", name: "Traditional Video", price: 10000, category: "video" },
      { id: "eng_candid_photo", name: "Candid Photo", price: 15000, category: "photo" },
      { id: "eng_candid_video", name: "Candid Video", price: 15000, category: "video" },
      { id: "eng_drone", name: "Drone Coverage", price: 12000, category: "drone" },
    ],
  },
  {
    id: "pelli_koduku_haldi",
    name: "Pelli Koduku & Haldi",
    subtitle: "Groom Haldi & Auspicious Rituals",
    services: [
      { id: "pkh_trad_photo", name: "Traditional Photo", price: 10000, category: "photo" },
      { id: "pkh_trad_video", name: "Traditional Video", price: 10000, category: "video" },
      { id: "pkh_candid_photo", name: "Candid Photo", price: 15000, category: "photo" },
      { id: "pkh_candid_video", name: "Candid Video", price: 15000, category: "video" },
    ],
  },
  {
    id: "pelli_kuthuru_haldi",
    name: "Pelli Kuthuru & Haldi",
    subtitle: "Bride Haldi & Mangala Snanam",
    services: [
      { id: "pku_trad_photo", name: "Traditional Photo", price: 10000, category: "photo" },
      { id: "pku_trad_video", name: "Traditional Video", price: 10000, category: "video" },
      { id: "pku_candid_photo", name: "Candid Photo", price: 15000, category: "photo" },
      { id: "pku_candid_video", name: "Candid Video", price: 15000, category: "video" },
    ],
  },
  {
    id: "mehandi",
    name: "Mehandi",
    subtitle: "Henna, Folk Songs & Festivities",
    services: [
      { id: "meh_trad_photo", name: "Traditional Photo", price: 10000, category: "photo" },
      { id: "meh_trad_video", name: "Traditional Video", price: 10000, category: "video" },
      { id: "meh_candid_photo", name: "Candid Photo", price: 15000, category: "photo" },
      { id: "meh_candid_video", name: "Candid Video", price: 15000, category: "video" },
    ],
  },
  {
    id: "reception",
    name: "Reception",
    subtitle: "Evening Celebration & Grand Welcome",
    services: [
      { id: "rec_trad_photo", name: "Traditional Photo", price: 10000, category: "photo" },
      { id: "rec_trad_video", name: "Traditional Video", price: 10000, category: "video" },
      { id: "rec_candid_photo", name: "Candid Photo", price: 15000, category: "photo" },
      { id: "rec_candid_video", name: "Candid Video", price: 15000, category: "video" },
    ],
  },
  {
    id: "grand_wedding",
    name: "Grand Wedding",
    subtitle: "Muhurtham, Pheras & Main Ceremony",
    services: [
      { id: "gw_trad_photo", name: "Traditional Photo", price: 15000, category: "photo" },
      { id: "gw_trad_video", name: "Traditional Video", price: 15000, category: "video" },
      { id: "gw_candid_photo", name: "Candid Photo", price: 20000, category: "photo" },
      { id: "gw_candid_video", name: "Candid Video", price: 20000, category: "video" },
      { id: "gw_drone", name: "Drone Coverage", price: 12000, category: "drone" },
    ],
  },
  {
    id: "vratham",
    name: "Vratham",
    subtitle: "Gauri / Satyanarayana Puja",
    services: [
      { id: "vra_trad_photo", name: "Traditional Photo", price: 8000, category: "photo" },
      { id: "vra_trad_video", name: "Traditional Video", price: 8000, category: "video" },
    ],
  },
  {
    id: "sangeeth",
    name: "Sangeeth",
    subtitle: "Music, Dance & Family Performances",
    services: [
      { id: "san_candid_photo", name: "Candid Photo", price: 15000, category: "photo" },
      { id: "san_candid_video", name: "Candid Video", price: 15000, category: "video" },
      { id: "san_trad_photo", name: "Traditional Photo", price: 10000, category: "photo" },
      { id: "san_trad_video", name: "Traditional Video", price: 10000, category: "video" },
    ],
  },
  {
    id: "pre_wedding",
    name: "Pre-wedding",
    subtitle: "Scenic Couple Portrait Session",
    services: [
      { id: "pw_candid_photo", name: "Candid Photo", price: 15000, category: "photo" },
      { id: "pw_candid_video", name: "Candid Video", price: 15000, category: "video" },
      { id: "pw_drone", name: "Drone Coverage", price: 12000, category: "drone" },
    ],
  },
];

export const OPTIONAL_SERVICES = [
  {
    id: "addon_led_wall",
    name: "LED Wall (Optional)",
    description: "High-definition backdrop LED screens for stage and live feeds",
    price: 15000,
    img: LED_WALL_IMG,
  },
  {
    id: "addon_livestream",
    name: "Live Streaming (Optional)",
    description: "Multi-camera YouTube / private HD broadcast for guests worldwide",
    price: 8000,
    img: LIVESTREAM_IMG,
  },
];

const STEPS = [
  { num: 1, label: "Start" },
  { num: 2, label: "Style" },
  { num: 3, label: "Events & Coverage" },
  { num: 4, label: "Add-ons" },
  { num: 5, label: "Your Details" },
  { num: 6, label: "Your Quote" },
];

export const formatINR = (val: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val);
};

interface QuotePageProps {
  onNavigateHome?: () => void;
}

export default function QuotePage({ onNavigateHome }: QuotePageProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Selections
  const [selectedStyles, setSelectedStyles] = useState<string[]>(["candid"]);
  const [selectedServices, setSelectedServices] = useState<Record<string, boolean>>({});
  const [selectedAddons, setSelectedAddons] = useState<Record<string, boolean>>({});
  const [expandedEvents, setExpandedEvents] = useState<Record<string, boolean>>({
    engagement: true,
    grand_wedding: true,
  });

  // Contact form details
  const [details, setDetails] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    venue: "",
    weddingDate: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [quoteReference, setQuoteReference] = useState<string>("");
  const [emailStatus, setEmailStatus] = useState<string>("");
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState<boolean>(false);

  // Scroll to top of quote builder when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  // Toggle service selection
  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) => ({
      ...prev,
      [serviceId]: !prev[serviceId],
    }));
  };

  // Toggle addon selection
  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) => ({
      ...prev,
      [addonId]: !prev[addonId],
    }));
  };

  // Toggle photography style
  const toggleStyle = (styleId: string) => {
    setSelectedStyles((prev) =>
      prev.includes(styleId)
        ? prev.length > 1
          ? prev.filter((s) => s !== styleId)
          : prev
        : [...prev, styleId]
    );
  };

  // Toggle event collapse
  const toggleEventCollapse = (eventId: string) => {
    setExpandedEvents((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  // Calculate live itemized selections and total
  const { itemizedByEvent, selectedAddonsList, estimatedTotal, totalItemsCount } = useMemo(() => {
    let total = 0;
    let count = 0;
    const itemsMap: Record<string, { eventName: string; services: ServiceOption[] }> = {};

    WEDDING_EVENTS.forEach((event) => {
      const chosenServices: ServiceOption[] = [];
      event.services.forEach((srv) => {
        if (selectedServices[srv.id]) {
          chosenServices.push(srv);
          total += srv.price;
          count += 1;
        }
      });
      if (chosenServices.length > 0) {
        itemsMap[event.id] = {
          eventName: event.name,
          services: chosenServices,
        };
      }
    });

    const chosenAddons: typeof OPTIONAL_SERVICES = [];
    OPTIONAL_SERVICES.forEach((addon) => {
      if (selectedAddons[addon.id]) {
        chosenAddons.push(addon);
        total += addon.price;
        count += 1;
      }
    });

    return {
      itemizedByEvent: itemsMap,
      selectedAddonsList: chosenAddons,
      estimatedTotal: total,
      totalItemsCount: count,
    };
  }, [selectedServices, selectedAddons]);

  // Form submission / Quote Generation
  const handleGenerateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!details.fullName.trim()) errors.fullName = "Please enter your full name";
    if (!details.email.trim()) errors.email = "Please enter your email address";
    else if (!/\S+@\S+\.\S+/.test(details.email)) errors.email = "Please enter a valid email address";

    if (!details.whatsapp.trim()) errors.whatsapp = "Please enter your WhatsApp number";
    if (!details.venue.trim()) errors.venue = "Please enter the wedding venue or city";
    if (!details.weddingDate) errors.weddingDate = "Please pick your wedding date";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    const randomRef = `SRI-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setQuoteReference(randomRef);
    setCurrentStep(6);
  };

  // Download printable PDF Quote
  const handleDownloadPDF = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow popups to download your quotation PDF.");
      return;
    }

    const itemsRows = Object.values(itemizedByEvent)
      .map(
        (group) => `
        <tr style="background:#f7f2ea;">
          <td colspan="2" style="padding:10px 14px;font-weight:700;color:#5a1a1c;font-size:14px;border-top:1px solid #d4b47c;">
            ${group.eventName}
          </td>
        </tr>
        ${group.services
          .map(
            (srv) => `
          <tr>
            <td style="padding:8px 14px 8px 24px;border-bottom:1px solid #eee;color:#333;">${srv.name}</td>
            <td style="padding:8px 14px;text-align:right;border-bottom:1px solid #eee;font-weight:600;color:#111;">${formatINR(
              srv.price
            )}</td>
          </tr>`
          )
          .join("")}
      `
      )
      .join("");

    const addonRows =
      selectedAddonsList.length > 0
        ? `
        <tr style="background:#f7f2ea;">
          <td colspan="2" style="padding:10px 14px;font-weight:700;color:#5a1a1c;font-size:14px;border-top:1px solid #d4b47c;">
            Optional Add-ons
          </td>
        </tr>
        ${selectedAddonsList
          .map(
            (addon) => `
          <tr>
            <td style="padding:8px 14px 8px 24px;border-bottom:1px solid #eee;color:#333;">${addon.name}</td>
            <td style="padding:8px 14px;text-align:right;border-bottom:1px solid #eee;font-weight:600;color:#111;">${formatINR(
              addon.price
            )}</td>
          </tr>`
          )
          .join("")}
      `
        : "";

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>SRI CAPTURES Quotation — ${quoteReference}</title>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px; color: #221915; line-height: 1.5; }
            .header { border-bottom: 2px solid #5a1a1c; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-start; }
            .brand { font-size: 26px; font-weight: 700; letter-spacing: 0.1em; color: #5a1a1c; margin: 0; }
            .brand-sub { font-size: 11px; letter-spacing: 0.2em; color: #c4a05a; text-transform: uppercase; }
            .ref-box { text-align: right; font-size: 13px; color: #666; }
            .client-card { background: #faf6f0; border: 1px solid #e5d7c3; border-radius: 4px; padding: 16px 20px; margin-bottom: 28px; }
            .client-card table { width: 100%; font-size: 14px; }
            .items-table { width: 100%; border-collapse: collapse; margin-bottom: 28px; font-size: 14px; }
            .items-table th { background: #5a1a1c; color: #fff; padding: 10px 14px; text-align: left; font-size: 12px; letter-spacing: 0.1em; }
            .total-box { text-align: right; font-size: 20px; font-weight: 700; color: #5a1a1c; padding: 16px 0; border-top: 2px solid #5a1a1c; }
            .note { font-size: 12px; color: #777; margin-top: 32px; border-top: 1px solid #ddd; padding-top: 12px; }
            @media print {
              body { padding: 15mm; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1 class="brand">SRI CAPTURES</h1>
              <span class="brand-sub">PREMIUM WEDDING PHOTOGRAPHY & FILMS</span>
              <p style="margin:4px 0 0;font-size:12px;color:#666;">Phone: +91 81424 90545 &bull; Email: sricapture929@gmail.com</p>
            </div>
            <div class="ref-box">
              <strong style="color:#5a1a1c;font-size:15px;">ESTIMATED QUOTATION</strong><br />
              Ref: <strong>${quoteReference}</strong><br />
              Date: ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </div>
          </div>

          <div class="client-card">
            <table>
              <tr>
                <td style="width:50%;"><strong>Client:</strong> ${details.fullName}</td>
                <td><strong>Wedding Date:</strong> ${details.weddingDate}</td>
              </tr>
              <tr>
                <td><strong>WhatsApp:</strong> ${details.whatsapp}</td>
                <td><strong>Venue / City:</strong> ${details.venue}</td>
              </tr>
              <tr>
                <td><strong>Email:</strong> ${details.email}</td>
                <td><strong>Style:</strong> ${selectedStyles.map((s) => (s === "candid" ? "Candid" : "Traditional")).join(" & ")}</td>
              </tr>
            </table>
          </div>

          <table class="items-table">
            <thead>
              <tr>
                <th>SERVICE / CEREMONY</th>
                <th style="text-align:right;">INVESTMENT</th>
              </tr>
            </thead>
            <tbody>
              ${itemsRows}
              ${addonRows}
            </tbody>
          </table>

          <div class="total-box">
            ESTIMATED TOTAL: ${formatINR(estimatedTotal)}
          </div>

          <div class="note">
            <p><strong>Working Hours:</strong> 8 Hours (1 Session per event).</p>
            <p><strong>Note:</strong> This document represents an estimated quotation based on your selected coverage. Final availability, travel arrangements, and dates are confirmed directly with SRI CAPTURES.</p>
          </div>

          <div class="no-print" style="text-align:center;margin-top:30px;">
            <button onclick="window.print()" style="background:#5a1a1c;color:#fff;border:none;padding:12px 28px;font-size:14px;border-radius:4px;cursor:pointer;font-weight:700;">PRINT / SAVE AS PDF</button>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // WhatsApp Contact Link pre-filled with quotation
  const whatsappQuoteUrl = useMemo(() => {
    const summaryLines = Object.values(itemizedByEvent)
      .map((g) => `${g.eventName}: ${g.services.map((s) => s.name).join(", ")}`)
      .join("\n- ");

    const text = `Hello SRI CAPTURES!
I built an estimated quote on your website:
• Ref: ${quoteReference || "NEW"}
• Name: ${details.fullName || "Prospective Client"}
• Date: ${details.weddingDate || "TBD"}
• Venue: ${details.venue || "TBD"}
• Selected Events:
- ${summaryLines || "Custom Selection"}
• Estimated Total: ${formatINR(estimatedTotal)}

Please check availability and connect with me.`;

    return `https://wa.me/918142490545?text=${encodeURIComponent(text)}`;
  }, [quoteReference, details, itemizedByEvent, estimatedTotal]);

  const handleSendEmail = () => {
    setEmailStatus("A copy of this quotation has been scheduled to " + (details.email || "your email"));
    setTimeout(() => setEmailStatus(""), 6000);
  };

  return (
    <main className="quote-page" aria-label="SRI CAPTURES - Interactive Wedding Quote Builder">
      {/* ── STEP PROGRESS BAR ─────────────────────────────────────── */}
      <nav className="quote-progress" aria-label="Quotation steps progress">
        <div className="quote-progress__inner">
          {STEPS.map((step) => {
            const isCompleted = currentStep > step.num;
            const isActive = currentStep === step.num;
            return (
              <button
                key={step.num}
                type="button"
                className={`quote-progress__item ${
                  isActive ? "is-active" : isCompleted ? "is-completed" : ""
                }`}
                onClick={() => {
                  // Only allow jumping back or to reachable step
                  if (step.num < currentStep || (step.num <= 5 && currentStep <= 5)) {
                    setCurrentStep(step.num);
                  }
                }}
                disabled={step.num > currentStep && currentStep === 6}
                aria-current={isActive ? "step" : undefined}
              >
                <span className="quote-progress__dot">
                  {isCompleted ? "✓" : step.num}
                </span>
                <span className="quote-progress__label">{step.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="quote-container">
        <div className="quote-layout">
          {/* Main Interactive Workflow Area */}
          <div className="quote-main">
            {/* ───────────────────────────────────────────────────────────
                STEP 1 — BEGIN YOUR WEDDING QUOTE
               ─────────────────────────────────────────────────────────── */}
            {currentStep === 1 && (
              <section className="quote-step quote-step--1" aria-labelledby="step1-heading">
                <div className="quote-hero-card">
                  <div className="quote-hero-card__content">
                    <span className="quote-eyebrow">
                      SRI CAPTURES • YOUR WEDDING, YOUR WAY
                    </span>
                    <h1 id="step1-heading" className="quote-headline">
                      Let's create your<br />
                      <em>wedding photography collection.</em>
                    </h1>
                    <p className="quote-subhead">
                      Choose the moments you want us to capture, build your coverage,
                      and receive an estimated quotation tailored to your celebration.
                    </p>

                    <div className="quote-hero-features">
                      <div className="quote-hero-feat">
                        <span className="quote-feat-icon">✦</span>
                        <span>Transparent, exact event-wise pricing</span>
                      </div>
                      <div className="quote-hero-feat">
                        <span className="quote-feat-icon">✦</span>
                        <span>Full candid &amp; traditional coverage options</span>
                      </div>
                      <div className="quote-hero-feat">
                        <span className="quote-feat-icon">✦</span>
                        <span>Instant itemized PDF quotation</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="quote-primary-btn"
                      onClick={() => setCurrentStep(2)}
                    >
                      START BUILDING MY QUOTE →
                    </button>
                  </div>

                  <div className="quote-hero-card__visual">
                    <figure className="quote-hero-frame">
                      <img
                        src={HERO_PHOTO}
                        alt="Indian bride and groom in traditional wedding attire"
                      />
                      <div className="quote-hero-frame__border" aria-hidden="true" />
                      <figcaption className="quote-hero-frame__tag">
                        HONEST EMOTIONS &bull; TIMELESS FRAMES
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </section>
            )}

            {/* ───────────────────────────────────────────────────────────
                STEP 2 — CHOOSE YOUR PHOTOGRAPHY STYLE
               ─────────────────────────────────────────────────────────── */}
            {currentStep === 2 && (
              <section className="quote-step quote-step--2" aria-labelledby="step2-heading">
                <div className="quote-step__header">
                  <span className="quote-eyebrow">STEP 01 OF 05</span>
                  <h2 id="step2-heading" className="quote-section-title">
                    What type of photography do you want?
                  </h2>
                  <p className="quote-section-desc">
                    Select your primary style preference. You can choose either or both.
                  </p>
                </div>

                <div className="quote-styles-grid">
                  {/* Style A: Candid */}
                  <div
                    className={`quote-style-card ${
                      selectedStyles.includes("candid") ? "is-selected" : ""
                    }`}
                    onClick={() => toggleStyle("candid")}
                    role="checkbox"
                    aria-checked={selectedStyles.includes("candid")}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleStyle("candid");
                      }
                    }}
                  >
                    <div className="quote-style-card__img">
                      <img src={CANDID_STYLE_IMG} alt="Candid wedding emotions" />
                      <div className="quote-style-card__badge">
                        {selectedStyles.includes("candid") ? "✓ SELECTED" : "SELECT"}
                      </div>
                    </div>
                    <div className="quote-style-card__body">
                      <h3 className="quote-style-card__name">Candid Photography</h3>
                      <p className="quote-style-card__desc">Storytelling &amp; emotions.</p>
                      <span className="quote-style-card__tag">
                        Natural laughs &bull; Unrehearsed tears &bull; Authentic moments
                      </span>
                    </div>
                  </div>

                  {/* Style B: Traditional */}
                  <div
                    className={`quote-style-card ${
                      selectedStyles.includes("traditional") ? "is-selected" : ""
                    }`}
                    onClick={() => toggleStyle("traditional")}
                    role="checkbox"
                    aria-checked={selectedStyles.includes("traditional")}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleStyle("traditional");
                      }
                    }}
                  >
                    <div className="quote-style-card__img">
                      <img src={TRAD_STYLE_IMG} alt="Traditional wedding portraits and rituals" />
                      <div className="quote-style-card__badge">
                        {selectedStyles.includes("traditional") ? "✓ SELECTED" : "SELECT"}
                      </div>
                    </div>
                    <div className="quote-style-card__body">
                      <h3 className="quote-style-card__name">Traditional Photography</h3>
                      <p className="quote-style-card__desc">Classic poses &amp; family.</p>
                      <span className="quote-style-card__tag">
                        Family stage portraits &bull; Complete ritual archives
                      </span>
                    </div>
                  </div>
                </div>

                <div className="quote-nav-actions">
                  <button
                    type="button"
                    className="quote-back-btn"
                    onClick={() => setCurrentStep(1)}
                  >
                    ← BACK
                  </button>
                  <button
                    type="button"
                    className="quote-primary-btn"
                    onClick={() => setCurrentStep(3)}
                  >
                    CONTINUE TO EVENTS →
                  </button>
                </div>
              </section>
            )}

            {/* ───────────────────────────────────────────────────────────
                STEP 3 — SELECT YOUR WEDDING EVENTS AND COVERAGE
               ─────────────────────────────────────────────────────────── */}
            {currentStep === 3 && (
              <section className="quote-step quote-step--3" aria-labelledby="step3-heading">
                <div className="quote-step__header">
                  <span className="quote-eyebrow">STEP 02 OF 05</span>
                  <h2 id="step3-heading" className="quote-section-title">
                    Choose the moments you want us to capture.
                  </h2>
                  <p className="quote-section-desc">
                    Select your ceremonies and add the photography or video coverage you need for each event.
                  </p>
                  <div className="quote-hours-notice">
                    <span className="quote-hours-icon">ℹ</span>
                    <strong>Working Hours:</strong> 8 Hours (1 Session per ceremony).
                  </div>
                </div>

                <div className="quote-events-list">
                  {WEDDING_EVENTS.map((event, idx) => {
                    const isExpanded = !!expandedEvents[event.id];
                    const selectedCount = event.services.filter((s) => selectedServices[s.id]).length;

                    return (
                      <div
                        key={event.id}
                        className={`quote-event-card ${
                          selectedCount > 0 ? "has-selections" : ""
                        }`}
                      >
                        {/* Event Header bar */}
                        <div
                          className="quote-event-card__header"
                          onClick={() => toggleEventCollapse(event.id)}
                          role="button"
                          tabIndex={0}
                          aria-expanded={isExpanded}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              toggleEventCollapse(event.id);
                            }
                          }}
                        >
                          <div className="quote-event-card__title-grp">
                            <span className="quote-event-card__num">0{idx + 1}</span>
                            <div>
                              <h3 className="quote-event-card__name">{event.name}</h3>
                              <p className="quote-event-card__subtitle">{event.subtitle}</p>
                            </div>
                          </div>

                          <div className="quote-event-card__meta">
                            {selectedCount > 0 && (
                              <span className="quote-selected-pill">
                                {selectedCount} service{selectedCount > 1 ? "s" : ""} selected
                              </span>
                            )}
                            <span className="quote-collapse-icon" aria-hidden="true">
                              {isExpanded ? "▲" : "▼"}
                            </span>
                          </div>
                        </div>

                        {/* Collapsible Services Grid */}
                        {isExpanded && (
                          <div className="quote-event-card__body">
                            <div className="quote-services-grid">
                              {event.services.map((srv) => {
                                const isChecked = !!selectedServices[srv.id];
                                return (
                                  <label
                                    key={srv.id}
                                    className={`quote-service-tile ${
                                      isChecked ? "is-checked" : ""
                                    }`}
                                  >
                                    <input
                                      type="checkbox"
                                      className="sr-only"
                                      checked={isChecked}
                                      onChange={() => toggleService(srv.id)}
                                    />
                                    <div className="quote-service-tile__check" aria-hidden="true">
                                      {isChecked ? "✓" : "+"}
                                    </div>
                                    <div className="quote-service-tile__info">
                                      <span className="quote-service-tile__category">
                                        {srv.category.toUpperCase()}
                                      </span>
                                      <h4 className="quote-service-tile__name">{srv.name}</h4>
                                      <span className="quote-service-tile__price">
                                        {formatINR(srv.price)}
                                      </span>
                                    </div>
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="quote-nav-actions">
                  <button
                    type="button"
                    className="quote-back-btn"
                    onClick={() => setCurrentStep(2)}
                  >
                    ← BACK
                  </button>
                  <button
                    type="button"
                    className="quote-primary-btn"
                    onClick={() => setCurrentStep(4)}
                  >
                    CONTINUE TO ADD-ONS →
                  </button>
                </div>
              </section>
            )}

            {/* ───────────────────────────────────────────────────────────
                STEP 4 — ADD OPTIONAL SERVICES
               ─────────────────────────────────────────────────────────── */}
            {currentStep === 4 && (
              <section className="quote-step quote-step--4" aria-labelledby="step4-heading">
                <div className="quote-step__header">
                  <span className="quote-eyebrow">STEP 03 OF 05</span>
                  <h2 id="step4-heading" className="quote-section-title">
                    Add a little more to your celebration.
                  </h2>
                  <p className="quote-section-desc">
                    Explore optional enhancements for your wedding coverage.
                  </p>
                </div>

                <div className="quote-addons-grid">
                  {OPTIONAL_SERVICES.map((addon) => {
                    const isChecked = !!selectedAddons[addon.id];
                    return (
                      <div
                        key={addon.id}
                        className={`quote-addon-card ${isChecked ? "is-checked" : ""}`}
                        onClick={() => toggleAddon(addon.id)}
                        role="checkbox"
                        aria-checked={isChecked}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            toggleAddon(addon.id);
                          }
                        }}
                      >
                        <div className="quote-addon-card__img">
                          <img src={addon.img} alt={addon.name} />
                          <span className="quote-addon-card__label">OPTIONAL ADD-ON</span>
                        </div>
                        <div className="quote-addon-card__content">
                          <div className="quote-addon-card__top">
                            <div>
                              <h3 className="quote-addon-card__title">{addon.name}</h3>
                              <p className="quote-addon-card__desc">{addon.description}</p>
                            </div>
                            <span className="quote-addon-card__price">
                              {formatINR(addon.price)}
                            </span>
                          </div>
                          <div className="quote-addon-card__toggle">
                            <span className={`quote-toggle-box ${isChecked ? "is-on" : ""}`}>
                              {isChecked ? "✓ ADDED TO QUOTE" : "+ ADD THIS SERVICE"}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="quote-nav-actions">
                  <button
                    type="button"
                    className="quote-back-btn"
                    onClick={() => setCurrentStep(3)}
                  >
                    ← BACK
                  </button>
                  <button
                    type="button"
                    className="quote-primary-btn"
                    onClick={() => setCurrentStep(5)}
                  >
                    REVIEW MY QUOTE →
                  </button>
                </div>
              </section>
            )}

            {/* ───────────────────────────────────────────────────────────
                STEP 5 — YOUR DETAILS AND ESTIMATED QUOTE
               ─────────────────────────────────────────────────────────── */}
            {currentStep === 5 && (
              <section className="quote-step quote-step--5" aria-labelledby="step5-heading">
                <div className="quote-step__header">
                  <span className="quote-eyebrow">STEP 04 OF 05</span>
                  <h2 id="step5-heading" className="quote-section-title">
                    We just need a few details to finalize your quote.
                  </h2>
                  <p className="quote-section-desc">
                    Enter your wedding information to view your personalized quotation summary.
                  </p>
                </div>

                <div className="quote-details-layout">
                  {/* Form fields */}
                  <form className="quote-form-card" onSubmit={handleGenerateQuote} noValidate>
                    <h3 className="quote-card-subheading">Your Contact Information</h3>

                    <div className="quote-field">
                      <label htmlFor="qf-name" className="quote-label">
                        Full Name <span className="req">*</span>
                      </label>
                      <input
                        id="qf-name"
                        type="text"
                        className={`quote-input ${formErrors.fullName ? "is-invalid" : ""}`}
                        placeholder="e.g. Rahul Sharma"
                        value={details.fullName}
                        onChange={(e) => setDetails({ ...details, fullName: e.target.value })}
                      />
                      {formErrors.fullName && (
                        <span className="quote-error">{formErrors.fullName}</span>
                      )}
                    </div>

                    <div className="quote-field-row">
                      <div className="quote-field">
                        <label htmlFor="qf-email" className="quote-label">
                          Email Address <span className="req">*</span>
                        </label>
                        <input
                          id="qf-email"
                          type="email"
                          className={`quote-input ${formErrors.email ? "is-invalid" : ""}`}
                          placeholder="e.g. rahul@example.com"
                          value={details.email}
                          onChange={(e) => setDetails({ ...details, email: e.target.value })}
                        />
                        {formErrors.email && (
                          <span className="quote-error">{formErrors.email}</span>
                        )}
                      </div>

                      <div className="quote-field">
                        <label htmlFor="qf-phone" className="quote-label">
                          WhatsApp Number <span className="req">*</span>
                        </label>
                        <input
                          id="qf-phone"
                          type="tel"
                          className={`quote-input ${formErrors.whatsapp ? "is-invalid" : ""}`}
                          placeholder="e.g. 9876543210"
                          value={details.whatsapp}
                          onChange={(e) => setDetails({ ...details, whatsapp: e.target.value })}
                        />
                        {formErrors.whatsapp && (
                          <span className="quote-error">{formErrors.whatsapp}</span>
                        )}
                      </div>
                    </div>

                    <div className="quote-field-row">
                      <div className="quote-field">
                        <label htmlFor="qf-venue" className="quote-label">
                          Venue / City <span className="req">*</span>
                        </label>
                        <input
                          id="qf-venue"
                          type="text"
                          className={`quote-input ${formErrors.venue ? "is-invalid" : ""}`}
                          placeholder="e.g. Taj Mahal Hotel, Mumbai"
                          value={details.venue}
                          onChange={(e) => setDetails({ ...details, venue: e.target.value })}
                        />
                        {formErrors.venue && (
                          <span className="quote-error">{formErrors.venue}</span>
                        )}
                      </div>

                      <div className="quote-field">
                        <label htmlFor="qf-date" className="quote-label">
                          Wedding Date <span className="req">*</span>
                        </label>
                        <input
                          id="qf-date"
                          type="date"
                          className={`quote-input ${formErrors.weddingDate ? "is-invalid" : ""}`}
                          value={details.weddingDate}
                          onChange={(e) => setDetails({ ...details, weddingDate: e.target.value })}
                        />
                        {formErrors.weddingDate && (
                          <span className="quote-error">{formErrors.weddingDate}</span>
                        )}
                      </div>
                    </div>

                    <div className="quote-guarantee-note">
                      <p>
                        Your quotation is based on the services selected above.
                        Final arrangements and availability can be confirmed with the SRI CAPTURES team.
                      </p>
                    </div>

                    <div className="quote-nav-actions" style={{ marginTop: "24px" }}>
                      <button
                        type="button"
                        className="quote-back-btn"
                        onClick={() => setCurrentStep(4)}
                      >
                        ← BACK TO ADD-ONS
                      </button>
                      <button type="submit" className="quote-primary-btn">
                        GENERATE MY QUOTE →
                      </button>
                    </div>
                  </form>

                  {/* Summary of selections */}
                  <div className="quote-summary-review">
                    <h3 className="quote-card-subheading">Selected Coverage Review</h3>

                    {totalItemsCount === 0 ? (
                      <p className="quote-empty-msg">
                        No services selected yet. Go back to Step 3 to pick your ceremonies.
                      </p>
                    ) : (
                      <div className="quote-review-groups">
                        {Object.entries(itemizedByEvent).map(([evtId, group]) => (
                          <div key={evtId} className="quote-review-group">
                            <h4 className="quote-review-event-title">{group.eventName}</h4>
                            <ul className="quote-review-list">
                              {group.services.map((srv) => (
                                <li key={srv.id} className="quote-review-item">
                                  <span>{srv.name}</span>
                                  <strong>{formatINR(srv.price)}</strong>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}

                        {selectedAddonsList.length > 0 && (
                          <div className="quote-review-group">
                            <h4 className="quote-review-event-title">Optional Services</h4>
                            <ul className="quote-review-list">
                              {selectedAddonsList.map((addon) => (
                                <li key={addon.id} className="quote-review-item">
                                  <span>{addon.name}</span>
                                  <strong>{formatINR(addon.price)}</strong>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="quote-review-total">
                      <span>ESTIMATED TOTAL</span>
                      <span className="quote-grand-total">{formatINR(estimatedTotal)}</span>
                    </div>

                    <button
                      type="button"
                      className="quote-modify-link"
                      onClick={() => setCurrentStep(3)}
                    >
                      ✎ Change ceremonies or services
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* ───────────────────────────────────────────────────────────
                STEP 6 — QUOTE CONFIRMATION & PERSONALIZED QUOTATION
               ─────────────────────────────────────────────────────────── */}
            {currentStep === 6 && (
              <section className="quote-step quote-step--6" aria-labelledby="step6-heading">
                <div className="quote-confirmation-card">
                  <div className="quote-confirmation__header">
                    <span className="quote-eyebrow quote-eyebrow--gold">QUOTATION READY</span>
                    <h2 id="step6-heading" className="quote-conf-title">
                      Thank you for sharing your story with us.
                    </h2>
                    <p className="quote-conf-sub">
                      We've received your wedding coverage request. Your selected services and
                      estimated quotation are ready for review.
                    </p>
                  </div>

                  <div className="quote-invoice-sheet">
                    <div className="quote-invoice-header">
                      <div>
                        <h3 className="quote-invoice-brand">SRI CAPTURES</h3>
                        <p className="quote-invoice-meta">
                          Phone: +91 81424 90545 &bull; sricapture929@gmail.com
                        </p>
                      </div>
                      <div className="quote-invoice-ref-box">
                        <span className="quote-ref-badge">REF: {quoteReference}</span>
                        <span className="quote-invoice-date">
                          {new Date().toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="quote-client-summary">
                      <div className="quote-client-col">
                        <span>Prepared For:</span>
                        <strong>{details.fullName}</strong>
                        <p>{details.email}</p>
                        <p>WhatsApp: {details.whatsapp}</p>
                      </div>
                      <div className="quote-client-col">
                        <span>Celebration Details:</span>
                        <strong>{details.venue}</strong>
                        <p>Date: {details.weddingDate}</p>
                        <p>
                          Style:{" "}
                          {selectedStyles
                            .map((s) => (s === "candid" ? "Candid" : "Traditional"))
                            .join(" & ")}
                        </p>
                      </div>
                    </div>

                    {/* Itemized Table */}
                    <div className="quote-table-wrap">
                      <table className="quote-table">
                        <thead>
                          <tr>
                            <th>Ceremony / Service</th>
                            <th style={{ textAlign: "right" }}>Investment</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(itemizedByEvent).map(([evtId, group]) => (
                            <tbody key={evtId}>
                              <tr className="quote-table-event-row">
                                <td colSpan={2}>{group.eventName}</td>
                              </tr>
                              {group.services.map((srv) => (
                                <tr key={srv.id} className="quote-table-item-row">
                                  <td>&bull; {srv.name}</td>
                                  <td style={{ textAlign: "right" }}>{formatINR(srv.price)}</td>
                                </tr>
                              ))}
                            </tbody>
                          ))}

                          {selectedAddonsList.length > 0 && (
                            <tbody>
                              <tr className="quote-table-event-row">
                                <td colSpan={2}>Optional Add-ons</td>
                              </tr>
                              {selectedAddonsList.map((addon) => (
                                <tr key={addon.id} className="quote-table-item-row">
                                  <td>&bull; {addon.name}</td>
                                  <td style={{ textAlign: "right" }}>{formatINR(addon.price)}</td>
                                </tr>
                              ))}
                            </tbody>
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div className="quote-invoice-footer">
                      <div className="quote-footer-terms">
                        <p><strong>Working Hours:</strong> 8 Hours (1 Session per ceremony).</p>
                        <p>Final arrangements and dates are confirmed with the SRI CAPTURES team.</p>
                      </div>
                      <div className="quote-footer-total">
                        <span>ESTIMATED TOTAL</span>
                        <strong>{formatINR(estimatedTotal)}</strong>
                      </div>
                    </div>
                  </div>

                  {emailStatus && (
                    <div className="quote-email-alert" role="status">
                      ✓ {emailStatus}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="quote-final-actions">
                    <button
                      type="button"
                      className="quote-action-btn quote-action-btn--gold"
                      onClick={handleDownloadPDF}
                    >
                      DOWNLOAD QUOTE PDF
                    </button>

                    <a
                      href={whatsappQuoteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="quote-action-btn quote-action-btn--wa"
                    >
                      CONTACT US ON WHATSAPP
                    </a>

                    <button
                      type="button"
                      className="quote-action-btn quote-action-btn--outline"
                      onClick={handleSendEmail}
                    >
                      SEND TO MY EMAIL
                    </button>

                    {onNavigateHome && (
                      <button
                        type="button"
                        className="quote-action-btn quote-action-btn--text"
                        onClick={onNavigateHome}
                      >
                        BACK TO HOME
                      </button>
                    )}
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* ── STICKY ESTIMATED TOTAL SUMMARY SIDEBAR (DESKTOP) ─── */}
          {currentStep > 1 && currentStep < 6 && (
            <aside className="quote-sidebar" aria-label="Live quote calculation summary">
              <div className="quote-sticky-card">
                <div className="quote-sticky-card__header">
                  <span className="quote-sticky-label">YOUR ESTIMATE</span>
                  <span className="quote-sticky-counter">{totalItemsCount} selected</span>
                </div>

                <div className="quote-sticky-price">
                  <span className="quote-sticky-curr">INR</span>
                  <span className="quote-sticky-amount">{formatINR(estimatedTotal)}</span>
                </div>

                {totalItemsCount === 0 ? (
                  <p className="quote-sticky-hint">
                    Choose events and services to see your estimate update live.
                  </p>
                ) : (
                  <div className="quote-sticky-preview">
                    {Object.values(itemizedByEvent).map((group) => (
                      <div key={group.eventName} className="quote-sticky-item">
                        <span>{group.eventName} ({group.services.length})</span>
                      </div>
                    ))}
                    {selectedAddonsList.length > 0 && (
                      <div className="quote-sticky-item">
                        <span>Add-ons ({selectedAddonsList.length})</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="quote-sticky-hours">
                  <span>Working Hours: 8 Hours (1 Session)</span>
                </div>

                <div className="quote-sticky-actions">
                  {currentStep < 5 ? (
                    <button
                      type="button"
                      className="quote-sticky-btn"
                      onClick={() => setCurrentStep(currentStep + 1)}
                    >
                      NEXT STEP →
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="quote-sticky-btn"
                      onClick={handleGenerateQuote}
                    >
                      GENERATE QUOTE →
                    </button>
                  )}
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>

      {/* ── MOBILE COLLAPSIBLE BOTTOM BAR ───────────────────────── */}
      {currentStep > 1 && currentStep < 6 && (
        <div className="quote-mobile-bar" aria-label="Mobile estimate summary">
          <div className="quote-mobile-bar__inner">
            <div
              className="quote-mobile-bar__summary"
              onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
            >
              <span className="quote-mobile-bar__label">ESTIMATE ({totalItemsCount})</span>
              <strong className="quote-mobile-bar__price">{formatINR(estimatedTotal)}</strong>
            </div>

            <button
              type="button"
              className="quote-mobile-bar__action"
              onClick={() => {
                if (currentStep < 5) setCurrentStep(currentStep + 1);
                else {
                  document.querySelector(".quote-form-card")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              {currentStep < 5 ? "NEXT →" : "FINALIZE"}
            </button>
          </div>

          {mobileSummaryOpen && (
            <div className="quote-mobile-drawer">
              <div className="quote-mobile-drawer__header">
                <strong>Selected Services ({totalItemsCount})</strong>
                <button
                  type="button"
                  className="quote-drawer-close"
                  onClick={() => setMobileSummaryOpen(false)}
                >
                  ✕
                </button>
              </div>
              <div className="quote-mobile-drawer__body">
                {Object.values(itemizedByEvent).map((grp) => (
                  <div key={grp.eventName} style={{ marginBottom: "8px" }}>
                    <small style={{ fontWeight: 700, color: "var(--q-maroon)" }}>
                      {grp.eventName}
                    </small>
                    {grp.services.map((s) => (
                      <div
                        key={s.id}
                        style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}
                      >
                        <span>{s.name}</span>
                        <span>{formatINR(s.price)}</span>
                      </div>
                    ))}
                  </div>
                ))}
                {selectedAddonsList.map((a) => (
                  <div
                    key={a.id}
                    style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}
                  >
                    <span>{a.name}</span>
                    <span>{formatINR(a.price)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
