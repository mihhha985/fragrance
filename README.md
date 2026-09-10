This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/[lang]/page.tsx`. The page auto-updates as you edit the file.

The site uses Raleway (Latin and Cyrillic) and the local Gambarino display font. Russian display text uses a serif fallback with Cyrillic support.

## Languages

The App Router follows Next.js's internationalization guide: pages live under `app/[lang]` and support `/en` and `/ru`. `proxy.ts` redirects legacy URLs using the saved language cookie, then the browser's `Accept-Language` preferences, with English as the fallback. Public assets and Next.js internals are excluded.

The menu's language selector preserves the current path, query and fragment and remembers the choice for one year. Both languages share the same cart. Checkout remains a local demo with no notifications or payment.

English copy is used as translation keys; Russian translations live in `data/ru.json`. Server components use `getTranslator(locale)`, and interactive components read the locale through `useI18n()`. Use `TransitionLink` for internal links and `localizedPath()` for programmatic navigation. Product names and the USD currency remain unchanged.

Run `node --test tests/i18n.test.mjs` to check locale routing, language preferences and translation coverage.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
