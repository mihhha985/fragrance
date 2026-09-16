# Côte Royale

## Getting Started

Install dependencies and run the development server:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The site uses Raleway (Latin and Cyrillic) and the local Gambarino display font. Russian display text uses a serif fallback with Cyrillic support.

## Languages

The App Router follows Next.js's internationalization guide: pages live under `app/[lang]` and support `/en` and `/ru`. `proxy.ts` redirects legacy URLs using the saved language cookie, then the browser's `Accept-Language` preferences, with English as the fallback. Public assets and Next.js internals are excluded.

The menu's language selector preserves the current path, query and fragment and remembers the choice for one year. Both languages share the same cart. Checkout validates and records orders on the server without sending an automatic notification.

English copy is used as translation keys; Russian translations live in `data/ru.json`. Server components use `getTranslator(locale)`, and interactive components read the locale through `useI18n()`. Use `TransitionLink` for internal links and `localizedPath()` for programmatic navigation. Product names and the USD currency remain unchanged.

Run `node --test tests/i18n.test.mjs` to check locale routing, language preferences and translation coverage.

## Production

Build the standalone server and start it through PM2:

```bash
npm run build
npm run start:prod
pm2 save
```

The application listens on port `3003`. Set `SITE_URL` to the public HTTPS origin before building so metadata uses the production domain. Orders are written to `.runtime/orders/orders.jsonl`; set `ORDER_DATA_DIR` in the PM2 environment if the data should live on a persistent mounted volume. Put a reverse proxy in front of the application for HTTPS, request limits and rate limiting.
