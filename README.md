# DMR Artworks — Production Website Package

This package contains a full production-ready website for **DMR Artworks**, including:
- `index.html` — customer-facing site (order form, idea generator, gallery, subscribe)
- `admin.html` — admin dashboard (Firebase Auth sign-in + orders viewer)
- `functions/index.js` — Firebase Cloud Function to send email notifications (Mailgun)
- `logo.svg` — graffiti-style logo (you asked for B + graffiti)
- `README.md` — this file
- `LICENSE.txt` — MIT license

Your provided payment handles:
- Cash App: **$QuanRogers8**
- Chime: **$daquan-rogers-10**

Your contact info included:
- Email: daquanrogers235@gmail.com
- Instagram: @dark.strokes
- Phone: 704-756-6478

---

## Quick setup (step-by-step)

### 1) Create Firebase project
1. Go to https://console.firebase.google.com → Create Project.
2. Enable **Firestore** (native mode).
3. Enable **Authentication** → Email/Password sign-in.
4. In **Project settings** → Add web app and copy Firebase config; paste into `index.html` and `admin.html` firebaseConfig.

### 2) Deploy Cloud Function (Mailgun)
1. Install Firebase CLI: `npm install -g firebase-tools`
2. `firebase login`
3. `firebase init` → select Functions and Firestore.
4. Replace `functions/index.js` contents with provided file.
5. In functions environment, set env vars:
   - `firebase functions:config:set mailgun.key="YOUR_MAILGUN_API_KEY" mailgun.domain="YOUR_MAILGUN_DOMAIN"`
   - Alternatively set process.env vars in your deployment.
6. `cd functions && npm install mailgun.js form-data`
7. `firebase deploy --only functions`

> IMPORTANT: Put your Mailgun API key and domain in environment; never put Mailgun keys in client-side code.

### 3) Firestore rules (starter)
Use these rules during development:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /orders/{orderId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```
After testing, tighten rules so only admin accounts can read/update/delete.

### 4) Create Admin User
In Firebase Console → Authentication → Users → Add user (email + password). Use that account to sign in on `admin.html`.

### 5) Hosting (static files)
You can host `index.html`, `admin.html`, `logo.svg`, and your images on:
- **Netlify** (drag-and-drop) — recommended
- **GitHub Pages**
- **Replit** (create static repl)
Follow their docs to upload files and go live.

### 6) Formspree (subscribe form)
1. Create Formspree account → create form → get form id (`f/xxxx`).
2. Replace the `action` in `index.html` subscribe form:
   `action="https://formspree.io/f/YOUR_FORMSPREE_ID"`

### 7) Testing
- Place a test order on the site; check Firestore `orders` collection.
- Sign in to `admin.html` with admin user to view and manage orders.
- After creating an order, Cloud Function (if deployed) will email you.

---

## Files included
- index.html
- admin.html
- functions/index.js      
- logo.svg
- README.md
- LICENSE.txt

---

If you want, I can:
- Push these files to a GitHub repository and give you exact Netlify steps (I can provide commands).
- Replace sample gallery images with your real artwork — upload them and I’ll update the code in the package.
- Tighten Firestore rules and provide an admin-only rules snippet with instructions to set custom claims.

