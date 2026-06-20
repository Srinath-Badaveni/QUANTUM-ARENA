# Quantum Arena — Hackathon Website

A React + Vite site for the **Quantum Arena 36hr Hackathon** (Dept. of CSE, TKR College of
Engineering and Technology), built to match the event poster's hacker-terminal /
circuit-board visual language: black background, red/white accents, monospace
terminal text, and an Orbitron display face for headings.

## Stack

- **React 19** + **Vite** — app shell and dev server
- **Tailwind CSS** — via CDN `<script>` in `index.html` (no PostCSS build step required)
- **Bootstrap CSS (CDN)** — grid utilities only, included per project spec
- **Google Fonts** — Orbitron (display), JetBrains Mono / Share Tech Mono (terminal/body)
- Zero extra runtime dependencies (icons are hand-rolled inline SVG)

## Project structure

```
quantum-arena/
├── index.html              # Tailwind CDN config, Google Fonts, Bootstrap grid CDN
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx             # React entry point
│   ├── App.jsx              # Page layout — assembles all sections
│   ├── index.css            # Circuit background, scanlines, glow, glitch effects
│   ├── data/
│   │   └── event.js         # ALL editable event content (dates, fee, names, links)
│   └── components/
│       ├── Icon.jsx         # Inline SVG icon set
│       ├── Navbar.jsx       # Sticky nav + mobile menu
│       ├── Hero.jsx         # Terminal boot animation, big title, date ribbon
│       ├── About.jsx        # About copy + system status panel
│       ├── TechStack.jsx    # Tech stack grid
│       ├── Timeline.jsx     # 3-day schedule + game-loop code panel
│       ├── Prizes.jsx       # Tracks / "winners take all" section
│       ├── Register.jsx     # Fee, QR placeholder, query contacts
│       ├── Team.jsx         # Patrons / convenor / coordinators
│       └── Footer.jsx       # College branding strip
├── package.json
└── vite.config.js
```

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

Build for production:

```bash
npm run build       # outputs to dist/
npm run preview      # preview the production build locally
```

## Customizing content

Almost everything on the page — event dates, registration fee, phone numbers,
coordinator names, register link, tech stack labels — lives in one file:

```
src/data/event.js
```

Edit the values there and the whole site updates. No need to touch JSX in the
component files unless you're changing layout or styling.

### Things you'll likely want to update before launch

1. **`EVENT.registerLink`** in `src/data/event.js` — point this at your real
   Google Form / registration portal. It's used by the navbar, hero, and
   register-section buttons.
2. **QR code** — `src/components/Register.jsx` currently renders a placeholder
   QR icon. Drop your real QR image at `public/qr-code.png` and replace the
   placeholder `<div>` with:
   ```jsx
   <img src="/qr-code.png" alt="Scan to register" className="w-32 h-32" />
   ```
3. **College logo / NAAC badge** — add image files to `public/` and reference
   them with `<img src="/your-logo.png" />` in `Navbar.jsx` or `Footer.jsx` if
   you want the literal crests from the poster on the site.
4. **Favicon** — `public/favicon.svg` is a simple placeholder mark; swap it for
   your own.

## Design notes

- Color tokens (`redline`, `redglow`, `void`, `panel`, `ash`) and fonts
  (`font-display`, `font-mono`, `font-term`) are defined in the Tailwind config
  block inside `index.html`.
- `.bracket-panel`, `.circuit-bg`, `.scanlines`, `.text-glow-red`, and
  `.glitch-title` (defined in `src/index.css`) are the reusable visual motifs
  that recreate the poster's bordered terminal boxes, circuit backdrop, and
  neon glow.
- The hero's boot sequence (`> sudo ideas --build`, etc.) is driven by
  `EVENT.bootLines` and typed out with a small custom hook in `Hero.jsx` — no
  animation library needed.

## Deployment

This is a static Vite build — deploy `dist/` to any static host (Netlify,
Vercel, GitHub Pages, Cloudflare Pages, or your college server).
