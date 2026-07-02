# PlanAgent Landing Page

[![Live Site](https://img.shields.io/static/v1?label=Live%20Site&message=Demo&color=blue)](https://example.com)

This project is a static marketing and documentation website for **PlanAgent**, an AI-powered planning and productivity platform built for students, professionals, freelancers, and businesses.

> Note: The live site link in the badge is a placeholder. Replace `https://example.com` with your deployed URL.

## Overview

The site uses plain HTML, CSS, and JavaScript to deliver a modern landing page experience with:

- Hero marketing section
- Features grid
- Pricing section
- Testimonials and FAQ interactions
- Responsive mobile navigation
- Animations and reveal effects

## Files and structure

- `index.html` — main landing page
- `style.css` — core styling for the page layout and UI
- `script.js` — interactive behavior for mobile menu, reveal animations, testimonial slider, FAQ, and waitlist form
- `docs.html` — documentation page
- `contact.html` — contact page
- `privacy.html` — privacy policy content
- `terms.html` — terms and conditions
- `package.json` — project metadata with `vite` dependency
- `css/`, `js/`, `img/` — supporting asset directories
- `404.html` — custom not-found page for missing routes
- `robots.txt` — crawler rules for search engines
- `sitemap.xml` — sitemap for SEO and indexing

## Installation

This project is primarily static, but includes a `package.json` dependency on Vite.

1. Install Node.js if needed.
2. Open a terminal in the project root.
3. Run:

```bash
npm install
```

## Usage

### Option 1: Open directly

Open `index.html` in your browser.

### Option 2: Run with Vite

If you want to use Vite for local development, install dependencies and start a local server:

```bash
npm install
npm run dev
```

Then visit the address shown in the terminal (typically `http://localhost:5173`).

### Static build

Build the site for deployment with:

```bash
npm run build
npm run preview
```

## Customize

- Update content directly in `index.html` and the other HTML files.
- Modify styles in `style.css` or add new styles in the `css/` folder.
- Add or update interactions in `script.js`.

## Notes

- No test suite is configured.
- The project uses Vite for local development and static site builds.
- Google Analytics markup is included as a placeholder on every page; replace `G-XXXXXXXXXX` with your own measurement ID.
- The site is built as a marketing landing page and does not include a backend.
- Replace `https://example.com` in the live badge and `sitemap.xml` with your production URL.

## License

MIT License. Created by PlanAgent Team.
