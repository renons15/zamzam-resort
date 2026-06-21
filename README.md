# Zangiota Zam-Zam (Static Site)

This repository is now a plain static website with no framework build step.

## Project structure

- Root HTML files - canonical Russian pages (`index.html` is the main page)
- `uz/` - Uzbek pages
- `kk/` - Kazakh pages
- `ru/` - legacy Russian URLs that redirect to the root pages
- `assets/css/styles.css` - site styles
- `assets/js/main.js` - UI interactions
- `scripts/sync-localized-layouts.js` - keeps Uzbek and Kazakh markup synchronized with the Russian pages

## Localized pages

The Russian root pages are the layout source of truth. After changing their markup or visible copy, run:

```bash
npm run sync:locales
```

Previously translated strings are read from `locales/translation-cache.json`; only new Russian copy requires a translation request.

## Run locally

Use any static file server. Example:

```bash
python3 -m http.server 3000
```

Then open `http://localhost:3000`.

## Deploy

Deploy as a static site (for example on Netlify) with publish directory set to the repository root.
