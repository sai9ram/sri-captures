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
var LOGO_URL = "https://sri-captures-delta.vercel.app/images/Sricaptures%20Logo%20.jpg";

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
    + "<div style='font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; border: 1px solid #e0d5c1; border-radius: 8px; overflow: hidden;'>"
    + "  <div style='background: #181210; color: #f1eadc; padding: 28px 24px; text-align: center; border-bottom: 3px solid #c4a05a;'>"
    + "    <h1 style='margin: 0; font-size: 26px; letter-spacing: 2px; color: #f1eadc;'>SRI CAPTURES</h1>"
    + "    <p style='margin: 6px 0 0; font-style: italic; font-size: 14px; color: #c4a05a;'>Let's Make Some \"జ్ఞాపకాలు\"</p>"
    + "  </div>"
    + "  <div style='padding: 30px 24px; background: #faf8f5; color: #221915;'>"
    + "    <p style='font-size: 16px; margin-top: 0;'>Dear <strong>" + lead.fullName + "</strong>,</p>"
    + "    <p style='font-size: 14px; color: #444; line-height: 1.6;'>Thank you for choosing <strong>Sri Captures</strong>. We have received your celebration details and prepared your customized quotation estimate below.</p>"
    + "    <div style='background: #fff; border: 1px solid #ebdcc5; border-radius: 6px; padding: 18px; margin: 20px 0; font-size: 14px;'>"
    + "      <div style='margin-bottom: 6px;'><strong>Reference ID:</strong> " + lead.ref + "</div>"
    + "      <div style='margin-bottom: 6px;'><strong>Wedding Date:</strong> " + (lead.weddingDate || "To be confirmed") + "</div>"
    + "      <div style='margin-bottom: 6px;'><strong>Venue / City:</strong> " + (lead.venue || "To be confirmed") + "</div>"
    + "      <div><strong>Contact Number:</strong> " + lead.whatsapp + "</div>"
    + "    </div>"
    + "    <table style='width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px;'>"
    + "      <thead><tr style='background: #5a1a1c; color: #fff;'><th style='padding: 10px 14px; text-align: left;'>CEREMONY / SERVICE</th><th style='padding: 10px 14px; text-align: right;'>INVESTMENT</th></tr></thead>"
    + "      <tbody>" + itemsHtml + "</tbody>"
    + "    </table>"
    + "    <div style='background: #5a1a1c; color: #fff; padding: 14px 20px; font-size: 18px; font-weight: bold; text-align: right; margin-top: 15px; border-radius: 4px;'>"
    + "      ESTIMATED TOTAL: " + formatCurrency(lead.estimatedTotal)
    + "    </div>"
    + "    <div style='margin-top: 30px; padding: 18px; background: #f3ede2; border-left: 4px solid #c4a05a; font-size: 13px; color: #555;'>"
    + "      <p style='margin: 0 0 6px;'><strong>Working Hours:</strong> 8 Hours (1 Session per ceremony).</p>"
    + "      <p style='margin: 0;'>This document is an estimate based on your selected coverage. Our team will contact you directly to confirm availability and schedule.</p>"
    + "    </div>"
    + "    <div style='margin-top: 30px; text-align: center;'>"
    + "      <a href='https://wa.me/918142490545' style='background: #25D366; color: #fff; text-decoration: none; padding: 12px 26px; border-radius: 30px; font-weight: bold; display: inline-block; font-size: 14px;'>Connect on WhatsApp (+91 81424 90545)</a>"
    + "    </div>"
    + "  </div>"
    + "</div>";

  MailApp.sendEmail({
    to: lead.email,
    subject: subject,
    htmlBody: htmlBody
  });
}
