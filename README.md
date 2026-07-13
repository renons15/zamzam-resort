# Zangiota Zam-Zam (Static Site)

This repository is now a plain static website with no framework build step.

## Project structure

- Root HTML files - canonical Russian pages (`index.html` is the main page)
- `uz/` - Uzbek pages
- `kk/` - Kazakh pages
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

The static server is enough to review the layout, but booking and contact submissions require the Netlify functions. To test the complete flow locally, install the Netlify CLI and run `netlify dev`.

## Telegram form setup

Booking requests are sent by `netlify/functions/booking.js`, and contact-page questions are sent by `netlify/functions/general-question.js`. Both use the same Telegram bot and destination chat. The browser never receives the Telegram bot token.

1. Create a bot with [@BotFather](https://t.me/BotFather) and copy its token.
2. Add the bot to the destination group. Sending messages does not require administrator access.
3. Send a message that mentions the bot in the group, then call `https://api.telegram.org/bot<TOKEN>/getUpdates`. Copy the group's `chat.id`; supergroup IDs normally start with `-100`.
4. In Netlify, open **Site configuration → Environment variables** and add:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
   - `TELEGRAM_MESSAGE_THREAD_ID` only when requests should go to one topic in a forum group
   - `BOOKING_ALLOWED_ORIGINS` with the production site origin, for example `https://zamzam.example`
5. Deploy the repository through Netlify. The included `netlify.toml` publishes the static site and deploys both functions together.

Use `.env.example` as the local template. Never commit a real bot token. GitHub Pages can still host the static pages, but it cannot run these server-side functions; use Netlify (or an equivalent serverless host) for working form submissions.

## Deploy

Deploy on Netlify with the publish directory set to the repository root. The functions are discovered from `netlify/functions`.
