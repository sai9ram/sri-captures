# 📋 Sri Captures — Google CRM & Automated Quotation Guide

This project includes a built-in integration to capture every wedding enquiry and quotation directly into a **Google Sheets CRM**, and automatically send branded emails and WhatsApp links to **both Admin and Customer**.

---

## 🎯 How It Works

1. **Website Quotation Builder**:
   - When a client builds an estimate and enters their Name, Email, WhatsApp number, Date, and Venue, the system creates a unique Reference ID (e.g. `SRI-2026-4821`).
2. **Google CRM (Google Sheets)**:
   - Every lead is automatically appended as a new row in your Google Sheet with Timestamp, Reference, Client Details, Selected Ceremonies, Equipment, Add-ons, and Total Investment.
3. **Automated Emails**:
   - **Customer Email**: Automatically sends a luxury HTML quotation estimate directly to the client's registered email.
   - **Admin Email (`sricapture929@gmail.com`)**: Automatically sends an alert to Sri Captures with client contact details, phone, and direct WhatsApp click-to-chat link.
4. **WhatsApp Dispatch**:
   - **Admin WhatsApp (`+91 81424 90545`)**: 1-click button sends formatted quotation to Sri Captures.
   - **Customer WhatsApp (`details.whatsapp`)**: 1-click button sends formatted quotation copy directly to the customer's phone number.
5. **Offline & Zero-Loss Guarantee**:
   - All generated leads are also archived in browser `localStorage` as a fail-safe backup.

---

## 🚀 3-Minute Setup: Connect Your Google Sheet

### Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com) and create a new blank spreadsheet.
2. Name it: **`Sri Captures CRM Leads`**.

### Step 2: Add the Apps Script Code
1. In the Google Sheets menu, click: **Extensions** > **Apps Script**.
2. Delete any existing code in the editor (`Code.gs`).
3. Open [`google-apps-script-crm.js`](file:///c:/Users/SAIRAM/Downloads/Cinematic%20Sticky%20Scroll%20Design/google-apps-script-crm.js) in this project, copy the entire file contents, and paste it into the editor.
4. Click the 💾 **Save** icon (or press Ctrl+S).

### Step 3: Deploy as a Web App
1. Click the blue **Deploy** button (top right) > **New deployment**.
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**.
3. Fill in the deployment settings:
   - **Description**: `Sri Captures CRM Webhook`
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone` *(IMPORTANT: Must be "Anyone" so the website can submit leads without authentication)*
4. Click **Deploy**.
5. Grant permissions if prompted by Google (click "Advanced" > "Go to Sri Captures CRM (unsafe)").
6. Copy the **Web app URL** (it ends with `/exec`).

### Step 4: Link URL to Sri Captures Website
You have two easy ways:

- **Option A (Via Website UI - Recommended)**:
  1. Open the Sri Captures website and go to **Get a Quote** page.
  2. On the final step, click **"⚙️ Google CRM Settings"**.
  3. Paste your Web App URL into the input field and click **"Save & Connect"**.

- **Option B (Via Environment Variable)**:
  1. Add to your `.env` or Vercel Environment Variables:
     ```env
     VITE_GOOGLE_CRM_WEBHOOK_URL="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
     ```
  2. Redeploy the website.

---

## 📱 Contact Information Pre-configured
- **Admin Email**: `sricapture929@gmail.com`
- **Admin WhatsApp / Phone**: `+91 81424 90545`
- **Brand**: `SRI CAPTURES`
- **Tagline**: `Let's Make Some "జ్ఞాపకాలు"`
