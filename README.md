# Zangiota Zam-Zam (Static Site)

This repository is now a plain static website with no framework build step.

## Project structure

- Root HTML files - canonical Russian pages (`index.html` is the main page)
- `uz/` - Uzbek pages
- `kk/` - Kazakh pages
- `ru/` - legacy Russian URLs that redirect to the root pages
- `assets/css/styles.css` - site styles
- `assets/js/main.js` - UI interactions

## Run locally

Use any static file server. Example:

```bash
python3 -m http.server 3000
```

Then open `http://localhost:3000`.

## Deploy

Deploy as a static site (for example on Netlify) with publish directory set to the repository root.
