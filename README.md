# Perfect Home — المساكن المتقنة

Website for Perfect Home, a design & build contractor in Riyadh. Built with Next.js (App Router) and React.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Add `?lang=en` or `?theme=dark` / `?theme=light` to the URL to preview a language or theme.

## Deploy

Import the repo in Vercel. The framework is detected as Next.js; no settings or environment variables are needed.

## Structure

- `app/` — layout, page and global styles (fonts, animations, responsive rules).
- `components/Site.jsx` — hosts the page logic and re-renders on state changes.
- `components/SiteView.jsx` — the page, section by section.
- `components/sections/` — one file per section: loader, header, menu, film, about, services, home life, sectors, album, clients, contact & footer.
- `lib/site-logic.js` — state and behaviour: scroll-driven film, theme, language, album lightbox, clients stage, form.
- `lib/site-config.js` — default language, default theme, film length and logo flight.
- `public/media/` — videos, images, fonts and logo.

## Media

- `public/media/video/` — the scroll film, 22 parts of 3–4 seconds. `-d` files are 1280×720 for laptops and desktops, `-m` files are 540×960 for phones. The page picks one set on load, downloads each clip whole in the background and keeps it in the browser's Cache Storage, so repeat visits load the film from disk.
- `public/media/img/` and `public/media/album/` — WebP images in several widths, served with `srcset`.
- `public/media/logo/` — SVG mark, wordmark and lockup.

## Caching

Everything under `public/media/` is served with `Cache-Control: public, max-age=31536000, immutable` (see `next.config.mjs`), and every media URL carries `?v=2`. When you replace a file in `public/media/`, bump the version number in all media URLs (search for `?v=2`) so browsers fetch the new file.
