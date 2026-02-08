## Freelancing Portfolio – Web Development & Data Analytics

This is a minimalist but production-ready portfolio for offering paid services
while using free hosting and serverless tooling.

### Stack

- **Frontend**: React, Vite, TypeScript (strict), React Router (`HashRouter`)
- **SEO**: `react-helmet-async`, semantic HTML, `robots.txt`, `sitemap.xml`
- **Forms**: Formspree (`https://formspree.io/f/xgozgbal`)
- **Hosting**: GitHub Pages (via GitHub Actions workflow)

### Development

- Install dependencies: `npm install`
- Run dev server: `npm run dev`
- Build: `npm run build`
- Preview build: `npm run preview`

### GitHub Pages

This repo is intended for `https://github.com/Risha-v/PORTFOLIO`:

- `vite.config.ts` uses `base: '/PORTFOLIO/'` for correct asset URLs.
- `robots.txt` and `sitemap.xml` point to `https://risha-v.github.io/PORTFOLIO`.
- Routing uses `HashRouter`, so GitHub Pages refreshes work without a custom 404.

### Placeholders

- **Projects** and **feedback** are honest placeholders with no fake clients.
- The **contact form** uses a real Formspree endpoint; no payments are taken here.
- **Legal pages** are generic placeholders; update them based on your jurisdiction.

### Future integrations

- Add a small backend or serverless function to read real feedback from Google Sheets.
- Add payment links or integrations (Stripe / Razorpay) after defining your process.

