# Zangiota Zam-Zam (Static Site)

This repository is now a plain static website with no framework build step.

## Project structure

- `index.html` - main page
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
