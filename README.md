# Giselle Salloum Swanson — Personal Portfolio

A clean, modern, responsive single-page portfolio built with vanilla HTML, CSS, and JavaScript — no frameworks, no build step. Inspired by the structure of tinatsou.me (hero → about → work → experience → contact).

## Features

- **Dark / light mode toggle** — defaults to the visitor's system preference, remembers their choice, and follows live system changes.
- **Interactive project showcase** — filterable category chips and accessible detail dialogs (click, Enter/Space, or Tab + Escape to close).
- **Experience timeline** — vertical career timeline with roles, periods, and outcomes.
- **Integrated contact form** — client-side validation, pending/success/error states, and a configurable delivery endpoint (Formspree, Getform, etc.).
- **Responsive** — mobile-first layout with a slide-down navigation drawer; tested from 375px to desktop.
- **Accessible** — semantic HTML, skip link, focus traps in the modal, `prefers-reduced-motion` support, and AA-contrast in both themes.

## Project structure

```
giselle-portfolio/
├── index.html          # All content — edit your copy here
├── css/
│   └── styles.css      # Design tokens (both themes) + component styles
├── js/
│   └── main.js         # Theme, nav, filters, modal, form logic
└── assets/
    ├── favicon.svg
    ├── hero-infra.webp
    └── about-network.webp
```

## Run locally

Any static file server works:

```bash
# with Python
python3 -m http.server 8000

# or with npx
npx serve .
```

Then open http://localhost:8000. (Opening `index.html` directly also works for a quick look, but a server matches production behavior.)

## Make it yours

- **Copy**: all text lives in `index.html`. Project detail content is in the `PROJECTS` object at the top of `js/main.js`.
- **Email**: the site shows gisellemack888@gmail.com — to change it, search for that address in `index.html` (2 places).
- **Links**: social links are commented out in the Contact section of `index.html` — add them back with your real profile URLs.
- **Photos**: `assets/hero-infra.webp` and `assets/about-network.webp` are AI-generated placeholders sized 1536×1024 and 1024×768. Swap in your own photos or artwork with the same filenames (or update the paths).
- **Colors / fonts**: everything is driven by CSS custom properties at the top of `css/styles.css` (`--color-primary`, etc., for both `[data-theme="light"]` and `[data-theme="dark"]`). Fonts are Cabinet Grotesk + Satoshi, loaded from Fontshare.

## Enable the contact form

The form validates input but **will not send** until you connect a delivery endpoint. In `js/main.js`, find:

```js
var FORM_ENDPOINT = "";
```

and set it to your form service URL, for example with Formspree:

1. Create a free account at [formspree.io](https://formspree.io) and a new form.
2. Set `FORM_ENDPOINT` to your form's endpoint, e.g. `"https://formspree.io/f/abcdwxyz"`.
3. Redeploy — submissions now arrive in your inbox, and the form shows real success/error states.

Only Formspree's setup is documented here; other form services that accept JSON POST submissions may work similarly, but test them before relying on them. This approach keeps the site fully static — no backend required.

## Deploy

### Vercel

1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Framework preset: **Other** (static site — no build command, output directory is the repo root).
4. Deploy. Every push to the main branch redeploys automatically.

Or from the terminal:

```bash
npm i -g vercel
vercel          # preview deploy
vercel --prod   # production
```

### GitHub Pages

1. Push this folder to a GitHub repository.
2. Repo → **Settings** → **Pages** → Source: **Deploy from a branch**.
3. Branch: `main`, folder: `/ (root)`, Save.
4. Your site is published at `https://<username>.github.io/<repo>/`.

Because all asset paths are relative (`css/…`, `js/…`, `assets/…`), the site works from a GitHub Pages subdirectory without any configuration.

## Notes

- Project descriptions are based on verified career facts (Supermicro, 8x8, GSCS Gulf figures). Review them before publishing and adjust as you prefer.
- The form never fakes a success message: without a configured endpoint it clearly tells visitors to email you instead.
