# sethnijsmetcalf.com

Personal site and portfolio for Seth Metcalf. Live at
[sethnijsmetcalf.com](https://sethnijsmetcalf.com) and
[gfxtheory.com](https://gfxtheory.com).

Single-page React app: no router, no backend, no state library. Content lives
in plain arrays at the top of `src/App.jsx`; everything is styled with plain
CSS custom properties in `src/App.css`.

## Stack

- Vite 7 + React 19 (JavaScript with JSX, no TypeScript)
- Plain CSS with custom properties, light and dark themes
- lucide-react for icons

## Features

- Command palette (`cmd/ctrl + K`, or `/`) for keyboard navigation
- Scroll-synced section highlighting via `IntersectionObserver`
- Light and dark themes driven by `prefers-color-scheme`
- 100 across accessibility, best practices, SEO, and agentic browsing in Lighthouse

## Development

```bash
npm install
npm run dev      # dev server on :5173
npm run build    # production build into dist/
npm run preview  # serve the production build on :4173
npm run lint
```

## Structure

- `src/App.jsx`: the entire site, one component. Edit the content arrays to
  change what the page says.
- `src/App.css`: design tokens (`:root`) and all styling.
- `src/index.css`: base and global styles.
- `src/assets/SethM_Resume.pdf`: resume, imported so Vite bundles it. Replace
  this file to update it.
- `public/`: favicon, `robots.txt`, `llms.txt`.
