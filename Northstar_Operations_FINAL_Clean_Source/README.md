# Northstar Operations — Frontend Concept

A compact, interview-ready frontend concept for a digital infrastructure / connectivity operations workspace.

**Live production demo:** https://northstar-operations-concept.vercel.app

## What it demonstrates

- premium dark responsive interface with restrained white-neon accents
- simulated sign-in and client-side validation
- service-health dashboard and operational status presentation
- service-detail interaction and mocked refresh feedback
- structured support / incident submission flow
- desktop and mobile layouts
- subtle entrance, hover, modal, chart, success, and navigation animations
- `prefers-reduced-motion` accessibility support
- Playwright E2E journey covering the critical demo flow

## Scope

This is intentionally a **frontend concept**, not a representation of an employer's real internal platform. Authentication and service data are mocked so the interface can be demonstrated independently of a backend.

A production implementation would replace the mock adapter with real identity, service-status, and support APIs while preserving the interface contract and interaction patterns.

## Demo account

The login fields are prefilled:

- Email: `demo@northstar.local`
- Password: `Demo2026!`

## Production architecture

The app is ordinary static HTML/CSS/JavaScript. There is:

- **no** `DecompressionStream`
- **no** browser-side gzip/base64 reconstruction
- **no** runtime fetch to another Vercel deployment
- **no** `boot.js` loader

The production files are the root `index.html`, `styles-1.css` through `styles-5.css`, and `app.js`.

## Project structure

```text
.
├── index.html
├── styles-1.css ... styles-5.css
├── app.js
├── docs/
├── tests/
│   └── demo.spec.ts
├── tools/
│   └── server.mjs
├── playwright.config.ts
├── package.json
├── vercel.json
└── README.md
```

## Run locally

```bash
npm run serve
```

Open `http://127.0.0.1:4173`.

## Playwright

Install dependencies once:

```bash
npm install
```

Run locally:

```bash
npm run test:e2e
```

Run against production:

```bash
BASE_URL=https://northstar-operations-concept.vercel.app npm run test:e2e
```

The default Playwright project uses Microsoft Edge; set `PLAYWRIGHT_CHANNEL` if another supported installed channel is preferred.

## Automated journey

The test covers login, dashboard verification, Services navigation, service details, mocked refresh, Support navigation, incident submission, success confirmation, and return to Overview.
