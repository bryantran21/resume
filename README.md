# Bryan Tran — Portfolio & Resume

![Live](https://img.shields.io/badge/Live-bhtran.com-brightgreen)
![Astro](https://img.shields.io/badge/Astro-5-ff5d01)
![React](https://img.shields.io/badge/React-19-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000)

My personal site at **[bhtran.com](https://bhtran.com)** — a single-page portfolio/resume plus a small blog. Built with **Astro** and hand-written CSS (no UI framework), with a few **React islands** for the interactive pieces. The whole thing builds to static files and deploys on Vercel.

---

## ✨ Highlights

A single page (`/`) with a sticky nav across **About · Resume · Projects**, plus a separate **Blog**. Light/dark theming throughout via CSS custom properties.

**About** is a "bento" grid of live, interactive cards:
- 🌍 **Travel Globe** — an interactive 3D globe of places I've been (`react-globe.gl` / three.js)
- 🎵 **Top 50** — cues a *random, shuffled* video from a YouTube playlist on every visit (YouTube IFrame API)
- ⚔️ **TFT Ranked Overview** — a rank card styled after tracker.gg
- 🎮 **Game ranks** — Valorant, Apex, and Marvel Rivals, framed by character splash art
- 🎬 **Recently Watched** — my latest films, pulled from the **Letterboxd public RSS feed at build time**, with a committed snapshot fallback so the build never breaks if Letterboxd blocks the fetch

**Projects** is a grid where each card has its own **custom-drawn animated preview tile** (a heatmap, a spaced-repetition box row, a sequence solver, a relevance feed) instead of a generic screenshot.

**Resume** covers experience, education, certifications, and a scrolling skills marquee.

**Blog** posts are Markdown, managed with Astro content collections.

---

## 🧱 Tech Stack

| Area | Choice |
|------|--------|
| Framework | Astro 5 (static output, islands architecture) |
| Interactive UI | React 19 islands, Framer Motion |
| 3D | react-globe.gl + three.js |
| Language | TypeScript |
| Styling | Hand-written scoped CSS with design tokens — **no CSS framework** |
| Hosting | Vercel (`bhtran.com`) |

---

## 🔌 Data & Integrations

- **Letterboxd** — recent films are fetched from the public RSS feed during the build (with a browser user-agent); if that request is blocked, it falls back to `src/data/letterboxd-snapshot.json`. Refresh the snapshot occasionally to keep the offline fallback current.
- **Game ranks** (TFT, Valorant, Apex, Marvel Rivals) — static; edit the `tft` / `games` arrays near the top of `src/pages/index.astro` when they change.
- **YouTube Top 50** — a random video is cued client-side from a public playlist via the IFrame Player API.

---

## ☁️ Deployment

Static build hosted on **Vercel**; production lives at **[bhtran.com](https://bhtran.com)**. Pushes to `main` trigger a production deploy automatically.

---

## 📫 Contact

- **Email:** bryantran21@gmail.com
- **LinkedIn:** [linkedin.com/in/bryan-huy-tran](https://linkedin.com/in/bryan-huy-tran)
- **GitHub:** [github.com/bryantran21](https://github.com/bryantran21)
