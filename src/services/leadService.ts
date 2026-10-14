/**
 * Sri Captures — Google CRM & Multi-Channel Quotation Dispatch Service
 * 
 * Automatically captures leads to Google CRM (Google Sheets Webhook / Apps Script)
 * and dispatches quotation details to:
 * 1. Admin Email (sricapture929@gmail.com)
 * 2. Customer Email (registered email)
 * 3. Admin WhatsApp (+91 81424 90545)
 * 4. Customer WhatsApp (registered phone number)
 */

export interface LeadItemizedService {
  name: string;
  price: number;
}

export interface LeadEventGroup {
  eventName: string;
  services: LeadItemizedService[];
}

export interface LeadPayload {
  ref: string;
  fullName: string;
  email: string;
  whatsapp: string;
  weddingDate: string;
  venue: string;
  selectedStyles: string[];
  events: LeadEventGroup[];
  addons: LeadItemizedService[];
  estimatedTotal: number;
  notes?: string;
  createdAt: string;
  source: "quote_builder" | "contact_page";
}

export const ADMIN_CONFIG = {
  email: "sricapture929@gmail.com",
  phone: "+91 81424 90545",
  cleanPhone: "918142490545",
  brandName: "SRI CAPTURES",
  tagline: "Let's Make Some 'జ్ఞాపకాలు'",
  websiteUrl: "https://sri-captures-delta.vercel.app",
};

export const LIVE_GOOGLE_CRM_URL =
  "https://script.google.com/macros/s/AKfycbzXUTVLaQ4gfvAZKFkb1_BKuh-JvmoUoCl2n4ufRC-7JkRHWSAuZ3xtQRq3U7xj3MUR/exec";

const STORAGE_CRM_KEY = "sricaptures_google_crm_url";
const STORAGE_LEADS_KEY = "sricaptures_leads_archive";

export function getGoogleCrmUrl(): string {
  if (typeof window === "undefined") return LIVE_GOOGLE_CRM_URL;
  return (
    localStorage.getItem(STORAGE_CRM_KEY) ||
    (import.meta.env.VITE_GOOGLE_CRM_WEBHOOK_URL as string) ||
    LIVE_GOOGLE_CRM_URL
  );
}

export function setGoogleCrmUrl(url: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_CRM_KEY, url.trim());
  }
}

export function formatINR(val: number): string {
  return "₹" + val.toLocaleString("en-IN");
}

export function sanitizePhone(phone: string): string {
  let digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    digits = "91" + digits;
  }
  return digits;
}

/**
 * Format quotation summary into a clean, professional text message for WhatsApp & Email
 */
export function buildQuotationMessage(lead: LeadPayload, forCustomer = false): string {
  const eventsList = lead.events.length > 0
    ? lead.events
        .map((evt) => `  • *${evt.eventName}*:\n    ${evt.services.map((s) => s.name + " (" + formatINR(s.price) + ")").join(", ")}`)
        .join("\n")
    : "  • Custom Package Discussion";

  const addonsList = lead.addons && lead.addons.length > 0
    ? `\n*Add-ons:*\n` + lead.addons.map((a) => `  • ${a.name} (${formatINR(a.price)})`).join("\n")
    : "";

  if (forCustomer) {
    return `✨ *SRI CAPTURES — WEDDING QUOTATION ESTIMATE* ✨
_${ADMIN_CONFIG.tagline}_

Dear *${lead.fullName}*,
Thank you for reaching out to Sri Captures! Here is your requested quotation summary:

📋 *Booking Ref:* ${lead.ref}
📅 *Wedding Date:* ${lead.weddingDate || "To be confirmed"}
📍 *Venue / City:* ${lead.venue || "To be confirmed"}
🎨 *Style:* ${lead.selectedStyles.join(", ") || "Candid & Cinematic"}

*Selected Ceremonies & Services:*
${eventsList}${addonsList}

💰 *ESTIMATED INVESTMENT:* *${formatINR(lead.estimatedTotal)}*
_(Standard session: 8 hours per ceremony)_

Our team will review your dates and connect with you shortly to finalize availability and dates.

📞 *Need immediate help?*
Call/WhatsApp: ${ADMIN_CONFIG.phone}
Email: ${ADMIN_CONFIG.email}
Website: ${ADMIN_CONFIG.websiteUrl}`;
  }

  // Admin notification message
  return `🔔 *NEW SRI CAPTURES LEAD / QUOTATION RECEIVED* 🔔

📋 *Reference:* ${lead.ref}
👤 *Client Name:* ${lead.fullName}
📞 *WhatsApp:* ${lead.whatsapp}
📧 *Email:* ${lead.email}
📅 *Wedding Date:* ${lead.weddingDate || "TBD"}
📍 *Venue:* ${lead.venue || "TBD"}
🎨 *Style:* ${lead.selectedStyles.join(", ")}

*Events & Coverage Selected:*
${eventsList}${addonsList}

💰 *TOTAL ESTIMATE:* *${formatINR(lead.estimatedTotal)}*
🕒 *Received At:* ${lead.createdAt}
🌐 *Source:* ${lead.source === "quote_builder" ? "Quote Builder" : "Contact Form"}`;
}

/**
 * WhatsApp link to send quotation to Admin WhatsApp (+91 81424 90545)
 */
export function getAdminWhatsAppUrl(lead: LeadPayload): string {
  const text = buildQuotationMessage(lead, false);
  return `https://wa.me/${ADMIN_CONFIG.cleanPhone}?text=${encodeURIComponent(text)}`;
}

/**
 * WhatsApp link to send quotation copy directly to the Customer's registered WhatsApp
 */
export function getCustomerWhatsAppUrl(lead: LeadPayload): string {
  const text = buildQuotationMessage(lead, true);
  const cleanNumber = sanitizePhone(lead.whatsapp);
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
}

/**
 * Fallback Mailto link for Admin Email
 */
export function getAdminEmailUrl(lead: LeadPayload): string {
  const subject = `[Sri Captures Lead] Quotation ${lead.ref} — ${lead.fullName} (${lead.weddingDate || "Date TBD"})`;
  const body = buildQuotationMessage(lead, false);
  return `mailto:${ADMIN_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Fallback Mailto link for Customer Email
 */
export function getCustomerEmailUrl(lead: LeadPayload): string {
  const subject = `Your Sri Captures Wedding Quotation Estimate [Ref: ${lead.ref}]`;
  const body = buildQuotationMessage(lead, true);
  return `mailto:${lead.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Save lead locally in browser localStorage as an unlosable offline backup
 */
export function saveLeadLocally(lead: LeadPayload): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_LEADS_KEY);
    const existing: LeadPayload[] = raw ? JSON.parse(raw) : [];
    existing.unshift(lead);
    localStorage.setItem(STORAGE_LEADS_KEY, JSON.stringify(existing.slice(0, 50)));
  } catch (err) {
    console.warn("Could not save lead to local storage", err);
  }
}

export function getSavedLeads(): LeadPayload[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_LEADS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Dispatches lead to Google CRM (Google Sheets Webhook / Apps Script Web App)
 * Also triggers automated Email sending from Apps Script to BOTH Admin & Customer.
 */
export async function submitLeadToGoogleCRM(lead: LeadPayload): Promise<{
  success: boolean;
  message: string;
  crmConfigured: boolean;
}> {
  saveLeadLocally(lead);

  const crmUrl = getGoogleCrmUrl();

  if (!crmUrl) {
    return {
      success: true,
      crmConfigured: false,
      message:
        "Quotation saved and ready. To enable automated Google Sheets CRM sync, paste your Google Web App URL.",
    };
  }

  try {
    await fetch(crmUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "new_lead",
        lead: lead,
        adminEmail: ADMIN_CONFIG.email,
        adminPhone: ADMIN_CONFIG.phone,
        timestamp: new Date().toISOString(),
      }),
    });

    return {
      success: true,
      crmConfigured: true,
      message: "Quotation successfully captured into Google CRM and scheduled for email delivery to both admin and customer.",
    };
  } catch (err) {
    console.error("Google CRM Webhook error:", err);
    return {
      success: false,
      crmConfigured: true,
      message: "Lead recorded locally, but failed to reach Google CRM Webhook. Please verify network or webhook URL.",
    };
  }
}
