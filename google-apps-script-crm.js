/**
 * ============================================================================
 * SRI CAPTURES — GOOGLE CRM & AUTOMATED QUOTATION DISPATCH SCRIPT
 * ============================================================================
 * 
 * INSTRUCTIONS:
 * 1. Open Google Sheets (create a new blank spreadsheet, e.g., "Sri Captures CRM Leads").
 * 2. In Google Sheets menu, click: Extensions > Apps Script.
 * 3. Delete any default code in Code.gs and PASTE ALL OF THIS SCRIPT.
 * 4. Click "Deploy" > "New deployment".
 *    - Select type: "Web app"
 *    - Description: "Sri Captures Lead Webhook"
 *    - Execute as: "Me" (your Google account)
 *    - Who has access: "Anyone" (CRITICAL: this allows the website to send leads)
 * 5. Click "Deploy", review permissions, and copy the Web App URL (ends in /exec).
 * 6. Paste that URL into the Sri Captures website (in the CRM settings popup or VITE_GOOGLE_CRM_WEBHOOK_URL).
 * ============================================================================
 */

var ADMIN_EMAIL = "sricapture929@gmail.com";
var ADMIN_PHONE = "+91 81424 90545";
var BRAND_NAME = "SRI CAPTURES";
var LOGO_URL = "https://www.sricaptures.com/images/Sricaptures%20Logo%20.jpg";

function doPost(e) {
  try {
    var rawData = e.postData ? e.postData.contents : null;
    if (!rawData) {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "No data received" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var payload = JSON.parse(rawData);
    var lead = payload.lead || payload;

    // 1. Record lead in Google Sheet CRM
    var sheet = getOrCreateLeadSheet();
    var eventsSummary = "";
    if (lead.events && lead.events.length > 0) {
      eventsSummary = lead.events.map(function(ev) {
        var srvNames = (ev.services || []).map(function(s) { return s.name + " (" + formatCurrency(s.price) + ")"; }).join(", ");
        return ev.eventName + ": " + srvNames;
      }).join("\n");
    }

    var addonsSummary = "";
    if (lead.addons && lead.addons.length > 0) {
      addonsSummary = lead.addons.map(function(a) { return a.name + " (" + formatCurrency(a.price) + ")"; }).join(", ");
    }

    sheet.appendRow([
      new Date(),
      lead.ref || ("SRI-" + new Date().getTime()),
      lead.fullName || "",
      lead.email || "",
      lead.whatsapp || "",
      lead.weddingDate || "",
      lead.venue || "",
      (lead.selectedStyles || []).join(", "),
      eventsSummary,
      addonsSummary,
      lead.estimatedTotal || 0,
      lead.source || "Website",
      "New Lead",
      lead.notes || ""
    ]);

    // 2. Send Automated Email to Admin
    sendAdminEmailNotification(lead, eventsSummary, addonsSummary);

    // 3. Send Automated Quotation Email to Customer
    if (lead.email && lead.email.indexOf("@") !== -1) {
      sendCustomerQuotationEmail(lead);
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "success", ref: lead.ref }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("Error processing lead: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Sri Captures Google CRM Webhook is active and running!")
    .setMimeType(ContentService.MimeType.TEXT);
}

function getOrCreateLeadSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Leads");
  if (!sheet) {
    sheet = ss.insertSheet("Leads");
    sheet.appendRow([
      "Timestamp",
      "Reference ID",
      "Customer Name",
      "Email Address",
      "WhatsApp Number",
      "Wedding Date",
      "Venue / City",
      "Selected Styles",
      "Events & Services",
      "Add-ons",
      "Estimated Total (INR)",
      "Source",
      "Status",
      "Client Notes"
    ]);
    sheet.getRange(1, 1, 1, 14).setBackground("#5a1a1c").setFontColor("#ffffff").setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function formatCurrency(val) {
  return "₹" + Number(val || 0).toLocaleString("en-IN");
}

function sendAdminEmailNotification(lead, eventsSummary, addonsSummary) {
  var subject = "🔔 New Wedding Lead: " + (lead.fullName || "Prospective Client") + " [Ref: " + lead.ref + "]";
  var cleanWa = String(lead.whatsapp || "").replace(/\D/g, "");
  if (cleanWa.length === 10) cleanWa = "91" + cleanWa;
  var waLink = "https://wa.me/" + cleanWa;

  var htmlBody = ""
    + "<div style='font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; border: 1px solid #e0d5c1; border-radius: 8px; overflow: hidden;'>"
    + "  <div style='background: #5a1a1c; color: #f8f4ed; padding: 24px; text-align: center;'>"
    + "    <h1 style='margin: 0; font-size: 22px; letter-spacing: 2px;'>SRI CAPTURES — NEW LEAD</h1>"
    + "    <p style='margin: 4px 0 0; font-size: 13px; opacity: 0.9;'>Quotation Reference: " + lead.ref + "</p>"
    + "  </div>"
    + "  <div style='padding: 24px; background: #faf8f5; color: #221915;'>"
    + "    <h2 style='margin-top: 0; color: #5a1a1c; font-size: 18px;'>Client Information</h2>"
    + "    <table style='width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;'>"
    + "      <tr><td style='padding: 8px 0; font-weight: bold; width: 140px;'>Name:</td><td>" + lead.fullName + "</td></tr>"
    + "      <tr><td style='padding: 8px 0; font-weight: bold;'>Phone / WhatsApp:</td><td><a href='" + waLink + "' style='color: #25D366; font-weight: bold; text-decoration: none;'>💬 " + lead.whatsapp + " (Open WhatsApp Chat)</a></td></tr>"
    + "      <tr><td style='padding: 8px 0; font-weight: bold;'>Email:</td><td><a href='mailto:" + lead.email + "' style='color: #5a1a1c;'>" + lead.email + "</a></td></tr>"
    + "      <tr><td style='padding: 8px 0; font-weight: bold;'>Wedding Date:</td><td>" + (lead.weddingDate || "TBD") + "</td></tr>"
    + "      <tr><td style='padding: 8px 0; font-weight: bold;'>Venue / City:</td><td>" + (lead.venue || "TBD") + "</td></tr>"
    + "    </table>"
    + "    <h2 style='color: #5a1a1c; font-size: 18px;'>Selected Events & Coverage</h2>"
    + "    <div style='background: #fff; padding: 16px; border: 1px solid #ebdcc5; border-radius: 6px; white-space: pre-line; font-size: 14px; margin-bottom: 20px;'>"
    +        (eventsSummary || "Custom Inquiry")
    +        (addonsSummary ? "\n\nAddons: " + addonsSummary : "")
    + "    </div>"
    + "    <div style='background: #f0e6d6; padding: 16px; border-radius: 6px; text-align: right;'>"
    + "      <span style='font-size: 14px; color: #666;'>Estimated Total: </span>"
    + "      <strong style='font-size: 24px; color: #5a1a1c;'>" + formatCurrency(lead.estimatedTotal) + "</strong>"
    + "    </div>"
    + "  </div>"
    + "</div>";

  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    subject: subject,
    htmlBody: htmlBody
  });
}

function sendCustomerQuotationEmail(lead) {
  var subject = "Your Sri Captures Wedding Quotation Estimate [Ref: " + lead.ref + "]";

  var itemsHtml = "";
  if (lead.events && lead.events.length > 0) {
    lead.events.forEach(function(ev) {
      itemsHtml += "<tr style='background: #f7f2ea;'><td colspan='2' style='padding: 10px 14px; font-weight: bold; color: #5a1a1c; font-size: 14px; border-top: 1px solid #d4b47c;'>" + ev.eventName + "</td></tr>";
      (ev.services || []).forEach(function(s) {
        itemsHtml += "<tr><td style='padding: 8px 14px 8px 24px; border-bottom: 1px solid #eee; color: #333;'>• " + s.name + "</td><td style='padding: 8px 14px; text-align: right; border-bottom: 1px solid #eee; font-weight: 600; color: #111;'>" + formatCurrency(s.price) + "</td></tr>";
      });
    });
  }

  if (lead.addons && lead.addons.length > 0) {
    itemsHtml += "<tr style='background: #f7f2ea;'><td colspan='2' style='padding: 10px 14px; font-weight: bold; color: #5a1a1c; font-size: 14px; border-top: 1px solid #d4b47c;'>Optional Add-ons</td></tr>";
    lead.addons.forEach(function(a) {
      itemsHtml += "<tr><td style='padding: 8px 14px 8px 24px; border-bottom: 1px solid #eee; color: #333;'>• " + a.name + "</td><td style='padding: 8px 14px; text-align: right; border-bottom: 1px solid #eee; font-weight: 600; color: #111;'>" + formatCurrency(a.price) + "</td></tr>";
    });
  }

  var htmlBody = ""
    + "<div style='font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif; max-width: 680px; margin: 0 auto; border: 2px solid #5a1a1c; border-radius: 8px; overflow: hidden; background: #ffffff;'>"
    + "  <div style='background: #5a1a1c; padding: 12px 20px; text-align: center; color: #e9d5aa; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; font-weight: bold;'>"
    + "    ✦ &nbsp; SRI CAPTURES ATELIER &bull; BESPOKE WEDDING CINEMA &nbsp; ✦"
    + "  </div>"
    + "  <div style='background: #181210; color: #f1eadc; padding: 32px 24px; text-align: center; border-bottom: 2px solid #c4a05a;'>"
    + "    <img src='https://www.sricaptures.com/images/Sricaptures%20Logo%20.jpg' alt='Sri Captures' style='height: 58px; max-width: 160px; object-fit: contain; margin-bottom: 12px;' />"
    + "    <h1 style='margin: 0; font-size: 26px; letter-spacing: 3px; color: #fdfaf5; font-family: Georgia, serif;'>SRI CAPTURES</h1>"
    + "    <p style='margin: 4px 0 0; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #c4a05a;'>LUXURY WEDDING PHOTOGRAPHY & FILMS</p>"
    + "    <p style='margin: 6px 0 0; font-style: italic; font-size: 14px; color: #e5b974; font-family: Georgia, serif;'>\"Let's Make Some జ్ఞాపకాలు\"</p>"
    + "  </div>"
    + "  <div style='padding: 32px 28px; background: #faf7f2; color: #221915;'>"
    + "    <div style='display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2d2bd; padding-bottom: 12px; margin-bottom: 20px;'>"
    + "      <span style='background: #faf4e8; border: 1px solid #d4b47c; color: #5a1a1c; font-size: 11px; font-weight: bold; padding: 4px 12px; border-radius: 20px; letter-spacing: 1px;'>REF: " + lead.ref + "</span>"
    + "      <span style='font-size: 12px; color: #7a6e67;'>Date: " + new Date().toLocaleDateString("en-IN") + "</span>"
    + "    </div>"
    + "    <p style='font-size: 17px; margin-top: 0; font-family: Georgia, serif; color: #181210;'>Dear <strong>" + lead.fullName + "</strong>,</p>"
    + "    <p style='font-size: 13.5px; color: #524741; line-height: 1.6;'>Thank you for inviting <strong>SRI CAPTURES</strong> to be part of your wedding story. We have received your celebration details and prepared your official quotation estimate below.</p>"
    + "    <div style='background: #fff; border: 1px solid #e7dcce; border-radius: 6px; padding: 18px 20px; margin: 20px 0; font-size: 13.5px; line-height: 1.5;'>"
    + "      <div style='margin-bottom: 6px;'><strong style='color: #8c4228; text-transform: uppercase; font-size: 10px; letter-spacing: 1px;'>Celebration Venue:</strong> <span style='font-size: 14px; color: #111; font-weight: bold;'>" + (lead.venue || "To be confirmed") + "</span></div>"
    + "      <div style='margin-bottom: 6px;'><strong style='color: #8c4228; text-transform: uppercase; font-size: 10px; letter-spacing: 1px;'>Auspicious Date:</strong> <span style='font-size: 14px; color: #111; font-weight: bold;'>" + (lead.weddingDate || "To be confirmed") + "</span></div>"
    + "      <div><strong style='color: #8c4228; text-transform: uppercase; font-size: 10px; letter-spacing: 1px;'>Contact WhatsApp:</strong> <span style='font-size: 13px; color: #333;'>" + lead.whatsapp + "</span></div>"
    + "    </div>"
    + "    <table style='width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 13.5px;'>"
    + "      <thead><tr style='background: #5a1a1c; color: #fff;'><th style='padding: 12px 16px; text-align: left; font-size: 11px; letter-spacing: 1px;'>CEREMONY / SERVICE SCHEDULE</th><th style='padding: 12px 16px; text-align: right; font-size: 11px; letter-spacing: 1px;'>INVESTMENT</th></tr></thead>"
    + "      <tbody>" + itemsHtml + "</tbody>"
    + "    </table>"
    + "    <div style='background: #faf5ed; border: 1.5px solid #c4a05a; border-radius: 4px; padding: 18px 20px; margin-top: 20px; display: flex; justify-content: space-between; align-items: center;'>"
    + "      <div><span style='font-size: 11px; font-weight: bold; letter-spacing: 1px; color: #5a1a1c; text-transform: uppercase; display: block;'>TOTAL ESTIMATED INVESTMENT</span><span style='font-size: 11.5px; color: #776a63;'>Includes cinematic color grading & dual-cam coverage</span></div>"
    + "      <div style='font-family: Georgia, serif; font-size: 26px; font-weight: bold; color: #5a1a1c;'>" + formatCurrency(lead.estimatedTotal) + "</div>"
    + "    </div>"
    + "    <div style='margin-top: 24px; padding: 16px 20px; background: #ffffff; border: 1px dashed #d8c7b0; border-radius: 4px; font-size: 12px; color: #695b54; line-height: 1.5;'>"
    + "      <p style='margin: 0 0 6px;'><strong>⏱️ Standard Working Hours:</strong> 8 Hours comprehensive coverage per ceremony session.</p>"
    + "      <p style='margin: 0;'>This document is an estimate based on your selected coverage. Our creative directors will connect with you directly to finalize your dates and creative vision.</p>"
    + "    </div>"
    + "    <div style='margin-top: 28px; text-align: center;'>"
    + "      <a href='https://wa.me/918142490545' style='background: #25D366; color: #ffffff; text-decoration: none; padding: 14px 30px; border-radius: 30px; font-weight: bold; display: inline-block; font-size: 13px; letter-spacing: 1px; box-shadow: 0 4px 12px rgba(37,211,102,0.3);'>💬 CHAT DIRECTLY ON WHATSAPP (+91 81424 90545)</a>"
    + "    </div>"
    + "    <div style='margin-top: 32px; border-top: 1px solid #ebd9c2; padding-top: 16px; text-align: center; font-size: 11px; color: #94867e;'>"
    + "      <p style='margin: 0 0 4px;'><strong>SRI CAPTURES ATELIER</strong> &bull; Hyderabad & Worldwide Destinations</p>"
    + "      <p style='margin: 0;'>Phone: +91 81424 90545 &bull; Email: sricapture929@gmail.com &bull; Instagram: @sri_capture9</p>"
    + "    </div>"
    + "  </div>"
    + "</div>";

  MailApp.sendEmail({
    to: lead.email,
    subject: subject,
    htmlBody: htmlBody
  });
}
