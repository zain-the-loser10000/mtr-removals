# MTR Removals Website

React (frontend) + Node.js (backend) + Postgres (database). Built to deploy on **Vercel** as one project.

Every quote request is saved to the database and emailed to the business, and the customer gets an automatic confirmation email.

```
mtr-removals/
├── frontend/              React website (Vite)
│   ├── src/data/site.js   ← all text, phone, email, photos, suburbs, FAQs (edit content here)
│   ├── src/pages/         Home, Services, About, Contact, 404
│   ├── src/components/    Header, Footer, QuoteForm, call buttons, etc.
│   ├── src/styles/        brand colours (red #E30613, black #0F1012)
│   ├── scripts/prerender.js  builds a real HTML file per page for Google
│   └── public/            logo, own photos, favicon, robots.txt, sitemap.xml
├── backend/               Node.js API logic
│   └── src/
│       ├── handlers/      enquiries (save + email), health check
│       ├── mailer.js      business email + customer auto-reply
│       ├── validate.js    form checks + spam protection
│       ├── db.js          Postgres (table created automatically)
│       └── dev-server.js  local API server for development
├── database/schema.sql    table structure (for reference / manual setup)
├── api/                   Vercel serverless functions (point to backend/)
├── vercel.json            Vercel settings
└── .env.example           all settings you need
```

---

## Deploy on Vercel (step by step)

### 1. Put the code on GitHub
Create a new GitHub repository and upload this whole folder (everything except `node_modules`).

### 2. Import into Vercel
1. Go to vercel.com > **Add New > Project** and pick the repository.
2. Leave **Root Directory** as the project root (`./`). Do not pick `frontend`.
3. Framework preset: **Other**. The build settings are read from `vercel.json`, nothing to type.
4. Click **Deploy**. The website is live after the first build.

### 3. Turn on email (Gmail)
1. Sign in to the business Gmail and turn on **2-Step Verification**.
2. Open https://myaccount.google.com/apppasswords and create an app password named "MTR Website".
3. In Vercel: **Project > Settings > Environment Variables**, add:

| Name | Value |
|---|---|
| `SMTP_USER` | `mtrremovals.au@gmail.com` |
| `SMTP_PASS` | the 16 character app password |
| `MAIL_TO` | `mtrremovals.au@gmail.com` (where leads arrive) |
| `ADMIN_TOKEN` | any long random text (to view leads) |

### 4. Add the database
1. In Vercel: **Project > Storage > Create Database > Neon (Postgres)** and connect it to this project. Vercel adds `DATABASE_URL` for you.
   (A Supabase connection string in `DATABASE_URL` also works.)
2. The `enquiries` table is created automatically on the first form submission.

### 5. Redeploy
**Deployments > ⋯ > Redeploy** so the new variables apply. Then open `https://your-site/api/health`. You should see:
```json
{"ok":true,"database":"connected","email":"configured"}
```
Submit a test quote on the Contact page and check the inbox.

### 6. Connect your domain
**Project > Settings > Domains** > add `mtrremovals.com.au` and `www.mtrremovals.com.au`, then copy the DNS records Vercel shows into your domain registrar.

If no database or email is connected, the form tells the customer to call instead, so a lead is never silently lost.

---

## View and manage leads

```bash
# list latest leads
curl -H "Authorization: Bearer YOUR_ADMIN_TOKEN" https://www.mtrremovals.com.au/api/enquiries

# mark lead 12 as booked   (new | contacted | booked | closed)
curl -X PATCH -H "Authorization: Bearer YOUR_ADMIN_TOKEN" -H "Content-Type: application/json" \
  -d '{"status":"booked"}' "https://www.mtrremovals.com.au/api/enquiries?id=12"
```
You can also browse the `enquiries` table directly in the Neon or Supabase dashboard.

---

## Run on your computer

Requires Node.js 18+.

```bash
npm install                # installs frontend + backend
cp .env.example .env       # fill in Gmail + DATABASE_URL
npm run dev:backend        # API on http://localhost:5000
npm run dev:frontend       # website on http://localhost:5173 (second terminal)
```
Or with the Vercel CLI: `npx vercel dev` from the project root.

---

## SEO built in
- Every page is pre-rendered to real HTML at build time, so Google reads full content without JavaScript.
- Brand-first page titles: `MTR Removals | Home Moves, Office Moves... in Newcastle`.
- One H1 per page, service headings as "Home Moves in Newcastle", "Office Moves in Newcastle", etc.
- MovingCompany, Service list and FAQ structured data (rich results).
- Canonical URLs, sitemap.xml, robots.txt, 30 Hunter suburbs named.
- No duplicate text across pages.

**After launch:**
1. Google Search Console: add the domain and submit `https://www.mtrremovals.com.au/sitemap.xml`.
2. Google Business Profile: create it as a service-area business in Newcastle. This drives most local calls.
3. Ask every happy customer for a Google review.
4. Swap stock photos for real job photos in `frontend/src/data/site.js` (`IMAGES`). Put files in `frontend/public/images/`.
