# Project Instructions

Personal portfolio site for Seth Metcalf (sethnijsmetcalf.com, later gfxtheory.com).
Personal project, not client work: breaking things is cheap and recoverable.

## Tech Stack

- Vite 7 + React 19, plain JavaScript with JSX (no TypeScript)
- Plain CSS with custom properties (no Tailwind, no CSS modules)
- lucide-react for icons
- No router, no state library, no backend, no tests configured

## Structure

Nearly everything lives in two files:

- `src/App.jsx`: the entire site, one component. Content (experience,
  education, projects, external links) is defined as inline JS arrays at the
  top of the component. Edit those arrays to change site content.
- `src/App.css`: all styling. Design tokens are CSS custom properties in
  `:root` (colors, monospace font stack). Class names are kebab-case.
- `src/index.css`: base/global styles.
- `src/assets/SethM_Resume.pdf`: the resume, imported directly in App.jsx so
  Vite bundles it. Replace this file to update the resume.
- `index.html`: meta tags, title, SEO description.

## Commands

- Dev server: `npm run dev`
- Build: `npm run build` (output in `dist/`, which is gitignored)
- Lint: `npm run lint`
- Preview production build: `npm run preview`

## Conventions

- Single-page scroll navigation: nav buttons scroll to `<section id="...">`
  anchors via `handleNavigation`. External links (resume, linkedin, github)
  are handled through the `externalLinks` map in the same function.
- Sections follow the same shell: `<section id className="section">` >
  `<div className="container">` > `<h2>`.
- Retired content is commented out in place rather than deleted (see the
  Jessica Metcalf project entry).
- Commits go directly to `main`; history uses short lowercase messages.
  Going forward use conventional commit format per global instructions.
- No tests: this is a static portfolio page, do not invent tests for it.
  Verify changes by running the dev server and looking at the page.

## Unknowns

- Deployment method is not detectable from the repo (no CI, no host config).
  Ask before assuming how the site ships.
