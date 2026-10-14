import React, { useState, useMemo, useEffect } from "react";
import "./quote.css";
import {
  LeadPayload,
  ADMIN_CONFIG,
  submitLeadToGoogleCRM,
  getAdminWhatsAppUrl,
  getCustomerWhatsAppUrl,
  getAdminEmailUrl,
  getCustomerEmailUrl,
  getGoogleCrmUrl,
  setGoogleCrmUrl,
  getSavedLeads,
} from "./services/leadService";

/* ── Sleek Favicon SVGs ─────────────────────────────────────────────── */
const SvgWhatsApp = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.41a8.19 8.19 0 012.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.42 0-2.82-.37-4.05-1.07l-.29-.17-3.12.82.83-3.04-.19-.3a8.16 8.16 0 01-1.25-4.47c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.12-1.47-.72-1.7-.8-.23-.08-.39-.12-.56.12-.17.25-.64.8-.79.97-.15.17-.29.19-.54.07-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.32-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.78 2.72 4.31 3.81.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29z"/>
  </svg>
);

const SvgMail = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const SvgCalendar = ({ size = 14 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const SvgMapPin = ({ size = 14 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const SvgDownload = ({ size = 15 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const SvgArrowUpRight = ({ size = 14 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="7" y1="17" x2="17" y2="7"/>
    <polyline points="7 7 17 7 17 17"/>
  </svg>
);

const SvgCheck = ({ size = 13 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const SvgSparkle = ({ size = 12 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
  </svg>
);

const SvgArrowRight = ({ size = 14 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const SvgArrowLeft = ({ size = 14 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);

const SvgPencil = ({ size = 13 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
  </svg>
);

const SvgUser = ({ size = 14 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=86`;

/* ── Authentic Indian Wedding Visuals ─────────────────────────────── */
const HERO_PHOTO = img("photo-1630526720753-aa4e71acf67d", 1800);
const CANDID_STYLE_IMG = "/images/Candid Camera.webp";
const TRAD_STYLE_IMG = "/images/Traditional camera.jpg";
const LED_WALL_IMG = "/images/LED wall.webp";
const LIVESTREAM_IMG = "/images/live Stream.avif";

/* ── Service image map (name → local thumbnail) ────────────────────── */
const SERVICE_IMG_MAP: Record<string, string> = {
  "Traditional Photo": "/images/Traditional camera.jpg",
  "Traditional Video": "/images/Traditional Video.webp",
  "Candid Photo":      "/images/Candid Camera.webp",
  "Candid Video":      "/images/Candid Video.avif",
  "Drone Coverage":    "/images/Drone camera.webp",
  "Drone Camera":      "/images/Drone camera.webp",
  "LED Wall":          "/images/LED wall.webp",
  "Live Stream":       "/images/live Stream.avif",
  "Live Streaming":    "/images/live Stream.avif",
};

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
      { id: "rec_drone", name: "Drone Coverage", price: 12000, category: "drone" },
      { id: "rec_led_wall", name: "LED Wall", price: 15000, category: "video" },
      { id: "rec_livestream", name: "Live Stream", price: 8000, category: "video" },
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
      { id: "gw_led_wall", name: "LED Wall", price: 15000, category: "video" },
      { id: "gw_livestream", name: "Live Stream", price: 8000, category: "video" },
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

export interface StyleOption {
  id: string;
  alias?: string;
  name: string;
  subtitle: string;
  tag: string;
  img: string;
  badge: string;
}

export const STYLE_OPTIONS: StyleOption[] = [
  {
    id: "candid",
    alias: "candid_photo",
    name: "Candid Photography",
    subtitle: "Storytelling & authentic emotions",
    tag: "Natural laughs • Emotional tears • Unrehearsed moments",
    img: "/images/Candid Camera.webp",
    badge: "CANDID CAMERA",
  },
  {
    id: "candid_video",
    name: "Candid Video / Cinema",
    subtitle: "Cinematic story & emotional highlights",
    tag: "4K cinematic teaser • Couple romance • Storytelling",
    img: "/images/Candid Video.avif",
    badge: "CANDID VIDEO",
  },
  {
    id: "traditional",
    alias: "trad_photo",
    name: "Traditional Photography",
    subtitle: "Classic stage poses & full family portraits",
    tag: "Stage portraits • Formal groups • Complete ritual archives",
    img: "/images/Traditional camera.jpg",
    badge: "TRADITIONAL CAMERA",
  },
  {
    id: "trad_video",
    name: "Traditional Video",
    subtitle: "Full ceremony archival coverage",
    tag: "Full ritual recording • Auspicious proceedings • Crystal audio",
    img: "/images/Traditional Video.webp",
    badge: "TRADITIONAL VIDEO",
  },
  {
    id: "drone_aerial",
    name: "Drone Cinematography",
    subtitle: "Epic aerial perspectives & grand scale",
    tag: "Breathtaking 4K aerial sweeps • Baraat & venue scale",
    img: "/images/Drone camera.webp",
    badge: "DRONE CAMERA",
  },
];

export const getStyleLabel = (styleId: string): string => {
  const map: Record<string, string> = {
    candid: "Candid Photography",
    candid_photo: "Candid Photography",
    candid_video: "Candid Video",
    traditional: "Traditional Photography",
    trad_photo: "Traditional Photography",
    trad_video: "Traditional Video",
    drone_aerial: "Drone Cinematography",
  };
  return map[styleId] || styleId;
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
  const [crmStatus, setCrmStatus] = useState<{
    status: "idle" | "submitting" | "success" | "warning" | "error";
    message: string;
  }>({ status: "idle", message: "" });
  const [showCrmModal, setShowCrmModal] = useState<boolean>(false);
  const [crmUrlInput, setCrmUrlInput] = useState<string>(getGoogleCrmUrl());
  const [crmTestStatus, setCrmTestStatus] = useState<string>("");
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
  // Form submission / Quote Generation & Google CRM Lead Capture
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

    const leadPayload: LeadPayload = {
      ref: randomRef,
      fullName: details.fullName.trim(),
      email: details.email.trim(),
      whatsapp: details.whatsapp.trim(),
      weddingDate: details.weddingDate,
      venue: details.venue.trim(),
      selectedStyles: selectedStyles.map(getStyleLabel),
      events: Object.values(itemizedByEvent).map((g) => ({
        eventName: g.eventName,
        services: g.services.map((s) => ({ name: s.name, price: s.price })),
      })),
      addons: selectedAddonsList.map((a) => ({ name: a.name, price: a.price })),
      estimatedTotal: estimatedTotal,
      createdAt: new Date().toLocaleString("en-IN"),
      source: "quote_builder",
    };

    setCrmStatus({
      status: "submitting",
      message: "Syncing quotation with Google CRM & scheduling notifications...",
    });

    submitLeadToGoogleCRM(leadPayload).then((res) => {
      setCrmStatus({
        status: res.crmConfigured ? (res.success ? "success" : "error") : "warning",
        message: res.message,
      });
    });
  };

  // Download printable PDF Quote
  // Download luxury printable PDF Quote
  const handleDownloadPDF = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow popups to download your quotation PDF.");
      return;
    }

    const itemsRows = Object.values(itemizedByEvent)
      .map(
        (group) => `
        <tr style="background:#faf6ee;border-top:1.5px solid #c4a05a;">
          <td colspan="2" style="padding:10px 18px;font-family:'Cormorant Garamond',serif;font-weight:700;color:#5a1a1c;font-size:16px;letter-spacing:0.04em;">
            ✦ ${group.eventName.toUpperCase()} <span style="font-family:'Manrope',sans-serif;font-size:11px;font-weight:500;color:#8a6d3b;margin-left:8px;">(8-Hour Comprehensive Coverage)</span>
          </td>
        </tr>
        ${group.services
          .map(
            (srv) => `
          <tr style="border-bottom:1px solid #eee6d8;">
            <td style="padding:10px 18px;color:#2c2420;font-size:13.5px;text-align:left;">
              <span style="color:#c4a05a;margin-right:8px;">•</span> ${srv.name}
            </td>
            <td style="padding:10px 18px;text-align:right;font-weight:700;color:#181210;font-size:14px;letter-spacing:0.02em;">
              ${formatINR(srv.price)}
            </td>
          </tr>`
          )
          .join("")}
      `
      )
      .join("");

    const addonRows =
      selectedAddonsList.length > 0
        ? `
        <tr style="background:#faf6ee;border-top:1.5px solid #c4a05a;">
          <td colspan="2" style="padding:10px 18px;font-family:'Cormorant Garamond',serif;font-weight:700;color:#5a1a1c;font-size:16px;letter-spacing:0.04em;">
            ✦ OPTIONAL ADD-ONS & EXPERIENCES
          </td>
        </tr>
        ${selectedAddonsList
          .map(
            (addon) => `
          <tr style="border-bottom:1px solid #eee6d8;">
            <td style="padding:10px 18px;color:#2c2420;font-size:13.5px;text-align:left;">
              <span style="color:#c4a05a;margin-right:8px;">•</span> ${addon.name}
            </td>
            <td style="padding:10px 18px;text-align:right;font-weight:700;color:#181210;font-size:14px;">
              ${formatINR(addon.price)}
            </td>
          </tr>`
          )
          .join("")}
      `
        : "";

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>SRI CAPTURES — Wedding Quotation (${quoteReference})</title>
          <meta charset="utf-8" />
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
          <style>
            @page {
              size: A4;
              margin: 12mm 15mm;
            }
            * { box-sizing: border-box; }
            body {
              font-family: 'Manrope', -apple-system, sans-serif;
              padding: 24px;
              color: #221915;
              line-height: 1.5;
              background: #f7f4ed;
            }
            .document-sheet {
              background: #ffffff;
              max-width: 860px;
              margin: 0 auto;
              padding: 40px 44px;
              border: 1px solid rgba(196, 160, 90, 0.4);
              box-shadow: 0 12px 40px rgba(0,0,0,0.06);
              border-radius: 4px;
            }
            .header-grid {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 2px solid #5a1a1c;
              padding-bottom: 18px;
              margin-bottom: 24px;
            }
            .brand-logo {
              height: 52px;
              max-width: 160px;
              object-fit: contain;
              display: block;
            }
            .meta-block {
              text-align: right;
            }
            .ref-pill {
              background: #faf4e8;
              border: 1px solid #d4b47c;
              color: #5a1a1c;
              font-size: 11.5px;
              font-weight: 800;
              letter-spacing: 0.1em;
              padding: 4px 12px;
              border-radius: 20px;
              display: inline-block;
              margin-bottom: 4px;
            }
            .date-label {
              font-size: 12px;
              color: #665952;
              display: block;
            }
            .dossier-card {
              background: #faf7f2;
              border: 1px solid #e7dcce;
              border-radius: 4px;
              padding: 18px 22px;
              margin-bottom: 24px;
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
            }
            .dossier-col span {
              font-size: 9.5px;
              font-weight: 800;
              letter-spacing: 0.16em;
              color: #a85432;
              text-transform: uppercase;
              display: block;
              margin-bottom: 4px;
            }
            .dossier-col strong {
              font-family: 'Cormorant Garamond', Georgia, serif;
              font-size: 20px;
              font-weight: 700;
              color: #1f1614;
              display: block;
              margin-bottom: 4px;
              line-height: 1.2;
            }
            .dossier-col p {
              font-size: 12.5px;
              color: #574b45;
              margin: 2px 0;
            }
            .items-table {
              width: 100%;
              border-collapse: collapse;
              table-layout: fixed;
              margin-bottom: 24px;
              border: 1px solid #e8dec8;
              border-radius: 4px;
              overflow: hidden;
            }
            .items-table thead tr {
              background: #5a1a1c;
            }
            .items-table th {
              color: #ffffff;
              padding: 12px 18px;
              font-size: 11px;
              font-weight: 800;
              letter-spacing: 0.12em;
              text-transform: uppercase;
            }
            .items-table th:first-child {
              text-align: left;
            }
            .items-table th:last-child {
              text-align: right;
            }
            .total-panel {
              background: #faf5ed;
              border: 1.5px solid #c4a05a;
              border-radius: 4px;
              padding: 18px 22px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 24px;
            }
            .total-label {
              font-size: 11px;
              font-weight: 800;
              letter-spacing: 0.14em;
              color: #5a1a1c;
              text-transform: uppercase;
              display: block;
              margin-bottom: 2px;
            }
            .total-sub {
              font-size: 11.5px;
              color: #7a6e67;
              margin: 0;
            }
            .total-figure {
              font-family: 'Cormorant Garamond', Georgia, serif;
              font-size: 30px;
              font-weight: 700;
              color: #5a1a1c;
              letter-spacing: 0.02em;
            }
            .footer-strip {
              border-top: 1px solid #e7dcce;
              padding-top: 14px;
              text-align: center;
              font-size: 11px;
              color: #8c7d74;
            }
            .footer-strip p {
              margin: 3px 0;
            }
            .no-print {
              text-align: center;
              margin-top: 24px;
            }
            .print-btn {
              background: #5a1a1c;
              color: #ffffff;
              border: none;
              padding: 12px 28px;
              font-size: 12px;
              font-weight: 800;
              letter-spacing: 0.14em;
              border-radius: 9999px;
              cursor: pointer;
              box-shadow: 0 4px 14px rgba(90, 26, 28, 0.2);
            }
            @media print {
              body { background: #fff; padding: 0; }
              .document-sheet { border: none; box-shadow: none; padding: 0; }
              .no-print { display: none !important; }
            }
          </style>
        </head>
        <body>
          <div class="document-sheet">
            <div class="header-grid">
              <div>
                <img src="/images/Sricaptures Logo .jpg" class="brand-logo" alt="Sri Captures" />
              </div>
              <div class="meta-block">
                <span class="ref-pill">REF: ${quoteReference}</span>
                <span class="date-label">Issue Date: <strong>${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</strong></span>
              </div>
            </div>

            <div class="dossier-card">
              <div class="dossier-col">
                <span>CLIENT / BRIDE & GROOM</span>
                <strong>${details.fullName}</strong>
                <p>Email: ${details.email}</p>
                <p>WhatsApp: ${details.whatsapp}</p>
              </div>
              <div class="dossier-col">
                <span>CELEBRATION DETAILS</span>
                <strong>${details.venue}</strong>
                <p>Wedding Date: <strong>${details.weddingDate}</strong></p>
                <p>Style: <strong>${selectedStyles.map(getStyleLabel).join(" & ")}</strong></p>
              </div>
            </div>

            <table class="items-table">
              <colgroup>
                <col style="width: 70%;" />
                <col style="width: 30%;" />
              </colgroup>
              <thead>
                <tr>
                  <th>CEREMONY / SERVICE SCHEDULE</th>
                  <th>INVESTMENT (INR)</th>
                </tr>
              </thead>
              <tbody>
                ${itemsRows}
                ${addonRows}
              </tbody>
            </table>

            <div class="total-panel">
              <div>
                <span class="total-label">TOTAL ESTIMATED INVESTMENT</span>
                <p class="total-sub">Includes dual-camera coverage, ceremony preservation & color grading.</p>
              </div>
              <div class="total-figure">${formatINR(estimatedTotal)}</div>
            </div>

            <div class="footer-strip">
              <p><strong>SRI CAPTURES</strong> &bull; Phone: +91 81424 90545 &bull; Email: sricapture929@gmail.com</p>
            </div>

            <div class="no-print">
              <button onclick="window.print()" class="print-btn">PRINT / DOWNLOAD PDF</button>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Multi-channel dispatch payload & links
  const currentLead: LeadPayload = useMemo(() => {
    return {
      ref: quoteReference || "SRI-QUOTE",
      fullName: details.fullName.trim() || "Prospective Client",
      email: details.email.trim(),
      whatsapp: details.whatsapp.trim(),
      weddingDate: details.weddingDate,
      venue: details.venue.trim(),
      selectedStyles: selectedStyles.map(getStyleLabel),
      events: Object.values(itemizedByEvent).map((g) => ({
        eventName: g.eventName,
        services: g.services.map((s) => ({ name: s.name, price: s.price })),
      })),
      addons: selectedAddonsList.map((a) => ({ name: a.name, price: a.price })),
      estimatedTotal: estimatedTotal,
      createdAt: new Date().toLocaleString("en-IN"),
      source: "quote_builder",
    };
  }, [quoteReference, details, selectedStyles, itemizedByEvent, selectedAddonsList, estimatedTotal]);

  const adminWhatsAppUrl = useMemo(() => getAdminWhatsAppUrl(currentLead), [currentLead]);
  const customerWhatsAppUrl = useMemo(() => getCustomerWhatsAppUrl(currentLead), [currentLead]);
  const adminEmailUrl = useMemo(() => getAdminEmailUrl(currentLead), [currentLead]);
  const customerEmailUrl = useMemo(() => getCustomerEmailUrl(currentLead), [currentLead]);

  const handleSendCustomerEmail = () => {
    setEmailStatus(`Quotation scheduled to your registered email (${details.email || "client email"}). Opening email client as backup.`);
    window.open(customerEmailUrl, "_blank");
    setTimeout(() => setEmailStatus(""), 8000);
  };

  const handleSendAdminEmail = () => {
    setEmailStatus(`Opening lead notification email for Sri Captures Admin (${ADMIN_CONFIG.email}).`);
    window.open(adminEmailUrl, "_blank");
    setTimeout(() => setEmailStatus(""), 8000);
  };

  const handleSaveCrmUrl = () => {
    setGoogleCrmUrl(crmUrlInput);
    setCrmTestStatus("✓ Google CRM Webhook URL saved successfully!");
    setTimeout(() => setCrmTestStatus(""), 4000);
  };

  const handleTestCrm = async () => {
    if (!crmUrlInput.trim()) {
      setCrmTestStatus("⚠️ Please enter your Google Apps Script Web App URL first.");
      return;
    }
    setCrmTestStatus("Testing connection to Google CRM...");
    setGoogleCrmUrl(crmUrlInput);
    const testLead: LeadPayload = {
      ...currentLead,
      ref: `TEST-${Date.now().toString().slice(-4)}`,
      notes: "Test ping from Sri Captures website",
    };
    const res = await submitLeadToGoogleCRM(testLead);
    if (res.success) {
      setCrmTestStatus("✓ Connection successful! Lead appended to Google Sheets.");
    } else {
      setCrmTestStatus("❌ Test failed: " + res.message);
    }
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
                  {isCompleted ? <SvgCheck size={11} /> : step.num}
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
                        <span className="quote-feat-icon"><SvgSparkle size={12} /></span>
                        <span>Transparent, exact event-wise pricing</span>
                      </div>
                      <div className="quote-hero-feat">
                        <span className="quote-feat-icon"><SvgSparkle size={12} /></span>
                        <span>Full candid &amp; traditional coverage options</span>
                      </div>
                      <div className="quote-hero-feat">
                        <span className="quote-feat-icon"><SvgSparkle size={12} /></span>
                        <span>Instant itemized PDF quotation</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="quote-primary-btn"
                      onClick={() => setCurrentStep(2)}
                    >
                      <span>START BUILDING MY QUOTE</span>
                      <SvgArrowRight size={14} />
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
                    What style of photography &amp; video do you want?
                  </h2>
                  <p className="quote-section-desc">
                    Select your preferred coverage styles. You can choose any combination.
                  </p>
                </div>

                <div className="quote-styles-grid">
                  {STYLE_OPTIONS.map((style) => {
                    const isSelected =
                      selectedStyles.includes(style.id) ||
                      (style.alias && selectedStyles.includes(style.alias));

                    return (
                      <div
                        key={style.id}
                        className={`quote-style-card ${isSelected ? "is-selected" : ""}`}
                        onClick={() => toggleStyle(style.id)}
                        role="checkbox"
                        aria-checked={!!isSelected}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            toggleStyle(style.id);
                          }
                        }}
                      >
                        <div className="quote-style-card__img">
                          <img src={style.img} alt={style.name} />
                          <div className="quote-style-card__badge">
                            {isSelected ? (
                              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                                <SvgCheck size={11} /> SELECTED
                              </span>
                            ) : (
                              "SELECT"
                            )}
                          </div>
                          <span className="quote-style-card__type-tag">{style.badge}</span>
                        </div>
                        <div className="quote-style-card__body">
                          <h3 className="quote-style-card__name">{style.name}</h3>
                          <p className="quote-style-card__desc">{style.subtitle}</p>
                          <span className="quote-style-card__tag">{style.tag}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="quote-nav-actions">
                  <button
                    type="button"
                    className="quote-back-btn"
                    onClick={() => setCurrentStep(1)}
                  >
                    <SvgArrowLeft size={14} />
                    <span>BACK</span>
                  </button>
                  <button
                    type="button"
                    className="quote-primary-btn"
                    onClick={() => setCurrentStep(3)}
                  >
                    <span>CONTINUE TO EVENTS</span>
                    <SvgArrowRight size={14} />
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
                                const srvImg = SERVICE_IMG_MAP[srv.name];
                                return (
                                  <label
                                    key={srv.id}
                                    className={`quote-service-tile ${
                                      isChecked ? "is-checked" : ""
                                    } ${srvImg ? "has-thumb" : ""}`}
                                  >
                                    <input
                                      type="checkbox"
                                      className="sr-only"
                                      checked={isChecked}
                                      onChange={() => toggleService(srv.id)}
                                    />
                                    <div className="quote-service-tile__check" aria-hidden="true">
                                      {isChecked ? <SvgCheck size={11} /> : "+"}
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
                                    {srvImg && (
                                      <div className="quote-service-tile__thumb" aria-hidden="true">
                                        <img src={srvImg} alt={srv.name} />
                                      </div>
                                    )}
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
                    <SvgArrowLeft size={14} />
                    <span>BACK</span>
                  </button>
                  <button
                    type="button"
                    className="quote-primary-btn"
                    onClick={() => setCurrentStep(4)}
                  >
                    <span>CONTINUE TO ADD-ONS</span>
                    <SvgArrowRight size={14} />
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
                              {isChecked ? (
                                <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                                  <SvgCheck size={11} /> ADDED TO QUOTE
                                </span>
                              ) : (
                                "+ ADD THIS SERVICE"
                              )}
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
                    <SvgArrowLeft size={14} />
                    <span>BACK</span>
                  </button>
                  <button
                    type="button"
                    className="quote-primary-btn"
                    onClick={() => setCurrentStep(5)}
                  >
                    <span>REVIEW MY QUOTE</span>
                    <SvgArrowRight size={14} />
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
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                          <SvgUser size={13} />
                          <span>Full Name</span>
                        </span>
                        <span className="req">*</span>
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
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                            <SvgMail size={13} />
                            <span>Email Address</span>
                          </span>
                          <span className="req">*</span>
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
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                            <SvgWhatsApp size={13} />
                            <span>WhatsApp Number</span>
                          </span>
                          <span className="req">*</span>
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
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                            <SvgMapPin size={13} />
                            <span>Venue / City</span>
                          </span>
                          <span className="req">*</span>
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
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                            <SvgCalendar size={13} />
                            <span>Wedding Date</span>
                          </span>
                          <span className="req">*</span>
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
                        <SvgArrowLeft size={14} />
                        <span>BACK TO ADD-ONS</span>
                      </button>
                      <button type="submit" className="quote-primary-btn">
                        <span>GENERATE MY QUOTE</span>
                        <SvgArrowRight size={14} />
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
                      <SvgPencil size={12} />
                      <span>Change ceremonies or services</span>
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

                  <div className="quote-invoice-sheet quote-invoice-sheet--elevated">
                    {/* Brand Header: Clean & Minimal - Only the Logo and Ref badge */}
                    <div className="quote-invoice-header quote-invoice-header--minimal">
                      <div className="quote-invoice-brand-block">
                        <img
                          src="/images/Sricaptures Logo .jpg"
                          alt="Sri Captures"
                          className="quote-invoice-logo"
                        />
                      </div>

                      <div className="quote-invoice-ref-box">
                        <span className="quote-ref-badge">REF: {quoteReference}</span>
                        <span className="quote-invoice-date">
                          Issue Date: <strong>{new Date().toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Client Celebration Dossier */}
                    <div className="quote-client-summary">
                      <div className="quote-client-col">
                        <span className="quote-dossier-eyebrow">CLIENT / BRIDE & GROOM</span>
                        <strong className="quote-dossier-name">{details.fullName}</strong>
                        <p className="quote-dossier-info">
                          <span className="quote-dossier-icon"><SvgMail /></span>
                          <span>{details.email}</span>
                        </p>
                        <p className="quote-dossier-info">
                          <span className="quote-dossier-icon"><SvgWhatsApp /></span>
                          <span>{details.whatsapp}</span>
                        </p>
                      </div>

                      <div className="quote-client-col">
                        <span className="quote-dossier-eyebrow">CELEBRATION DETAILS</span>
                        <strong className="quote-dossier-name">{details.venue}</strong>
                        <p className="quote-dossier-info">
                          <span className="quote-dossier-icon"><SvgCalendar size={15} /></span>
                          <span>Wedding Date: <strong>{details.weddingDate}</strong></span>
                        </p>
                        <div className="quote-dossier-styles">
                          {selectedStyles.map((s) => (
                            <span key={s} className="quote-style-pill">
                              {getStyleLabel(s)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Itemized Table — Strictly Aligned with colgroup & single tbody */}
                    <div className="quote-table-wrap">
                      <table className="quote-table">
                        <colgroup>
                          <col style={{ width: "70%" }} />
                          <col style={{ width: "30%" }} />
                        </colgroup>
                        <thead>
                          <tr>
                            <th>CEREMONY / SERVICE SCHEDULE</th>
                            <th>INVESTMENT (INR)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(itemizedByEvent).map(([evtId, group]) => (
                            <React.Fragment key={evtId}>
                              <tr className="quote-table-event-row">
                                <td colSpan={2}>
                                  <div className="quote-event-row-flex">
                                    <span className="quote-event-row-title">
                                      <span className="quote-diamond-icon"><SvgSparkle size={10} /></span>
                                      {group.eventName.toUpperCase()}
                                    </span>
                                    <span className="quote-event-row-badge">8-Hour Comprehensive Coverage</span>
                                  </div>
                                </td>
                              </tr>
                              {group.services.map((srv) => (
                                <tr key={srv.id} className="quote-table-item-row">
                                  <td className="quote-item-name-cell">
                                    <span className="quote-item-dot">•</span> {srv.name}
                                  </td>
                                  <td className="quote-item-price-cell">
                                    {formatINR(srv.price)}
                                  </td>
                                </tr>
                              ))}
                            </React.Fragment>
                          ))}

                          {selectedAddonsList.length > 0 && (
                            <React.Fragment key="addons">
                              <tr className="quote-table-event-row">
                                <td colSpan={2}>
                                  <div className="quote-event-row-flex">
                                    <span className="quote-event-row-title">
                                      <span className="quote-diamond-icon"><SvgSparkle size={10} /></span>
                                      OPTIONAL ADD-ONS &amp; EXPERIENCES
                                    </span>
                                  </div>
                                </td>
                              </tr>
                              {selectedAddonsList.map((addon) => (
                                <tr key={addon.id} className="quote-table-item-row">
                                  <td className="quote-item-name-cell">
                                    <span className="quote-item-dot">•</span> {addon.name}
                                  </td>
                                  <td className="quote-item-price-cell">
                                    {formatINR(addon.price)}
                                  </td>
                                </tr>
                              ))}
                            </React.Fragment>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Total Panel */}
                    <div className="quote-total-panel">
                      <div className="quote-total-panel__meta">
                        <span className="quote-total-panel__eyebrow">TOTAL ESTIMATED INVESTMENT</span>
                        <p className="quote-total-panel__desc">
                          Includes dual-camera coverage, ceremony preservation & color grading.
                        </p>
                      </div>
                      <div className="quote-total-panel__figure">
                        {formatINR(estimatedTotal)}
                      </div>
                    </div>

                    {/* Studio Footer Sign-off */}
                    <div className="quote-invoice-seal-footer">
                      <p className="quote-seal-brand">
                        <strong>SRI CAPTURES</strong> &bull; Phone: +91 81424 90545 &bull; Email: sricapture929@gmail.com
                      </p>
                    </div>
                  </div>

                  {emailStatus && (
                    <div className="quote-email-alert" role="status">
                      ✓ {emailStatus}
                    </div>
                  )}

                  {/* Multi-Channel Quotation Dispatch Hub */}
                  <div className="quote-dispatch-section">
                    <div className="quote-dispatch-header">
                      <span className="quote-eyebrow quote-eyebrow--gold">MULTI-CHANNEL DISPATCH</span>
                      <h3 className="quote-dispatch-heading">Send Quotation via WhatsApp & Email</h3>
                      <p className="quote-dispatch-sub">
                        Direct 1-click delivery to both client and Sri Captures studio:
                      </p>
                    </div>

                    <div className="quote-dispatch-grid">
                      {/* 1. Admin WhatsApp */}
                      <a
                        href={adminWhatsAppUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="quote-dispatch-card quote-dispatch-card--wa-admin"
                      >
                        <div className="quote-dispatch-card__icon"><SvgWhatsApp /></div>
                        <div className="quote-dispatch-card__info">
                          <span className="quote-dispatch-badge">STUDIO WHATSAPP</span>
                          <strong>Send to Sri Captures</strong>
                          <small>{ADMIN_CONFIG.phone}</small>
                        </div>
                        <span className="quote-dispatch-card__arrow"><SvgArrowUpRight /></span>
                      </a>

                      {/* 2. Customer WhatsApp */}
                      <a
                        href={customerWhatsAppUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="quote-dispatch-card quote-dispatch-card--wa-client"
                      >
                        <div className="quote-dispatch-card__icon"><SvgWhatsApp /></div>
                        <div className="quote-dispatch-card__info">
                          <span className="quote-dispatch-badge quote-dispatch-badge--client">REGISTERED CLIENT</span>
                          <strong>Send Copy to My WhatsApp</strong>
                          <small>{details.whatsapp || "Your registered number"}</small>
                        </div>
                        <span className="quote-dispatch-card__arrow"><SvgArrowUpRight /></span>
                      </a>

                      {/* 3. Customer Email */}
                      <button
                        type="button"
                        onClick={handleSendCustomerEmail}
                        className="quote-dispatch-card quote-dispatch-card--email-client"
                      >
                        <div className="quote-dispatch-card__icon"><SvgMail /></div>
                        <div className="quote-dispatch-card__info">
                          <span className="quote-dispatch-badge quote-dispatch-badge--client">CLIENT INBOX</span>
                          <strong>Send to My Email</strong>
                          <small>{details.email || "Your registered email"}</small>
                        </div>
                        <span className="quote-dispatch-card__arrow"><SvgArrowUpRight /></span>
                      </button>

                      {/* 4. Admin Email */}
                      <button
                        type="button"
                        onClick={handleSendAdminEmail}
                        className="quote-dispatch-card quote-dispatch-card--email-admin"
                      >
                        <div className="quote-dispatch-card__icon"><SvgMail /></div>
                        <div className="quote-dispatch-card__info">
                          <span className="quote-dispatch-badge">STUDIO BACKEND</span>
                          <strong>Send Copy to Admin Email</strong>
                          <small>{ADMIN_CONFIG.email}</small>
                        </div>
                        <span className="quote-dispatch-card__arrow"><SvgArrowUpRight /></span>
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="quote-final-actions">
                    <button
                      type="button"
                      className="quote-action-btn quote-action-btn--gold"
                      onClick={handleDownloadPDF}
                    >
                      <SvgDownload />
                      <span>DOWNLOAD QUOTE PDF</span>
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

                {/* ── GOOGLE CRM SETTINGS & LEADS ARCHIVE MODAL ── */}
                {showCrmModal && (
                  <div className="quote-crm-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="crm-modal-title">
                    <div className="quote-crm-modal">
                      <div className="quote-crm-modal__header">
                        <div>
                          <span className="quote-eyebrow quote-eyebrow--gold">GOOGLE WORKSPACE INTEGRATION</span>
                          <h3 id="crm-modal-title" style={{ margin: "4px 0 0", color: "#f1eadc", fontSize: "20px" }}>
                            Google Sheets CRM & Lead Sync
                          </h3>
                        </div>
                        <button
                          type="button"
                          className="quote-crm-modal__close"
                          onClick={() => setShowCrmModal(false)}
                          aria-label="Close modal"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="quote-crm-modal__body">
                        <p style={{ color: "rgba(241, 234, 220, 0.8)", fontSize: "13px", lineHeight: "1.6", margin: "0 0 16px" }}>
                          Connect your Google Sheet CRM using the Google Apps Script Web App. Every quotation generated on this website will automatically append to your Google Sheet and send emails to both admin (<strong>{ADMIN_CONFIG.email}</strong>) and the customer.
                        </p>

                        <div style={{ marginBottom: "16px" }}>
                          <label style={{ display: "block", fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#c4a05a", marginBottom: "6px" }}>
                            Google Apps Script Web App URL:
                          </label>
                          <input
                            type="url"
                            value={crmUrlInput}
                            onChange={(e) => setCrmUrlInput(e.target.value)}
                            placeholder="https://script.google.com/macros/s/.../exec"
                            style={{
                              width: "100%",
                              padding: "10px 14px",
                              background: "rgba(0,0,0,0.4)",
                              border: "1px solid rgba(196, 160, 90, 0.35)",
                              borderRadius: "4px",
                              color: "#fff",
                              fontSize: "13px",
                              boxSizing: "border-box",
                            }}
                          />
                        </div>

                        {crmTestStatus && (
                          <div style={{ padding: "8px 12px", borderRadius: "4px", background: "rgba(196, 160, 90, 0.15)", border: "1px solid rgba(196, 160, 90, 0.4)", color: "#f1eadc", fontSize: "12px", marginBottom: "16px" }}>
                            {crmTestStatus}
                          </div>
                        )}

                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
                          <button
                            type="button"
                            onClick={handleSaveCrmUrl}
                            style={{ background: "#c4a05a", color: "#181210", border: "none", padding: "10px 18px", borderRadius: "4px", fontWeight: "700", fontSize: "12px", cursor: "pointer" }}
                          >
                            Save Webhook URL
                          </button>
                          <button
                            type="button"
                            onClick={handleTestCrm}
                            style={{ background: "transparent", color: "#c4a05a", border: "1px solid #c4a05a", padding: "10px 18px", borderRadius: "4px", fontWeight: "700", fontSize: "12px", cursor: "pointer" }}
                          >
                            Test Connection Ping
                          </button>
                        </div>

                        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "14px" }}>
                          <h4 style={{ margin: "0 0 8px", color: "#c4a05a", fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                            Quick Setup Instructions:
                          </h4>
                          <ol style={{ margin: 0, paddingLeft: "18px", color: "rgba(241, 234, 220, 0.75)", fontSize: "12px", lineHeight: "1.7" }}>
                            <li>Create a Google Sheet (e.g. <em>Sri Captures CRM Leads</em>).</li>
                            <li>Click <strong>Extensions &gt; Apps Script</strong> and paste the contents of <code>google-apps-script-crm.js</code>.</li>
                            <li>Click <strong>Deploy &gt; New deployment &gt; Web app</strong>. Set access to <strong>"Anyone"</strong>.</li>
                            <li>Copy the resulting Web App URL and paste it above!</li>
                          </ol>
                        </div>

                        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "14px", marginTop: "16px" }}>
                          <h4 style={{ margin: "0 0 8px", color: "#c4a05a", fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                            Locally Archived Leads ({getSavedLeads().length}):
                          </h4>
                          <div style={{ maxHeight: "120px", overflowY: "auto", fontSize: "12px", color: "rgba(241, 234, 220, 0.75)" }}>
                            {getSavedLeads().map((lead) => (
                              <div key={lead.ref} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                <span><strong>{lead.ref}</strong> — {lead.fullName} ({lead.whatsapp})</span>
                                <span style={{ color: "#c4a05a" }}>{formatINR(lead.estimatedTotal)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
