# NEXORA DIGITAL

Static UX/UI concept for NEXORA DIGITAL — AI, Web, Automation and Digital Transformation.

## Structure

- `index.html` — main page
- `assets/css/style.css` — visual design and responsive layout
- `assets/js/app.js` — navigation, team, pricing, modal, video and form interactions
- `assets/images/` — local image assets
- `assets/icons/` — favicon files
- `assets/video/` — local video and audio assets
- `vercel.json` — optional Vercel configuration

## Run locally

Open `index.html` in a browser, or use a local server:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Production requirements

For a real production platform, connect a secure backend for:
- Stripe Checkout and invoices
- Email delivery
- Authentication and consent records
- GDPR-compliant data storage
- AES-256 encryption at rest
- Multi-tenant sandboxing
- AI APIs and admin dashboard

Never place secret API keys in frontend JavaScript.
