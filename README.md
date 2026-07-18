# ముహూర్తం · muhurtham.app

A rich, fully-responsive **“coming soon” landing page** for **muhurtham.app** —
a Telugu event-management app for Andhra Pradesh (muhurtham / kalyanam bookings).

Telugu is the visual hero of the design; English is the secondary register. Three
kalyanam services are showcased with distinct ceremonial motifs:

| Telugu | English | Motif | Accent |
| --- | --- | --- | --- |
| శివ కళ్యాణం | Siva Kalyanam | crescent · trishula · damaru | indigo → gold |
| రామ కళ్యాణం | Rama Kalyanam | kodanda bow · lotus · petals | green → gold |
| వేంకటేశ కళ్యాణం | Venkatesha Kalyanam | tirunamam · conch · chakra · lamp | maroon → gold |

## Stack

- **Next.js 16** (App Router) + **TypeScript** + **Tailwind CSS v4**
- **Framer Motion** — entrance, scroll reveals, hover micro-interactions
- **@lottiefiles/dotlottie-react** — optional per-card Lottie (lazy-loaded)
- **next/font** — Noto Sans Telugu (hero) + Fraunces (Latin display serif)
- No backend yet.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build (must pass clean)
npm run start    # serve the production build
npm run lint     # eslint
```

## Editing content

All events live in **one array** — [`app/data/events.ts`](app/data/events.ts).
Edit the Telugu/English titles, descriptions, per-card accent gradients, or the
brand strings there. Nothing else needs to change.

### Adding a Lottie animation per card

1. Drop a `.lottie` or `.json` file into [`public/lottie/`](public/lottie/)
   (e.g. `public/lottie/siva.lottie`).
2. Uncomment / set `lottieSrc` on that entry in `app/data/events.ts`:

   ```ts
   lottieSrc: "/lottie/siva.lottie",
   ```

The Lottie is **lazy-loaded** — its chunk and JSON are only fetched when the card
scrolls into view (via `IntersectionObserver`), and never under
`prefers-reduced-motion`. If a file is missing, fails to load, or `lottieSrc` is
omitted, the card gracefully renders its **static SVG motif** instead — no layout
shift. Keep JSON weight sane to protect the Lighthouse score.

## Responsiveness & accessibility

- **Fluid typography** via `clamp()` only — no fixed px on headings. Scales from
  360px phones to 1440px+ desktops and large screens.
- Layout is **single column on mobile**, auto-fit **3-up grid** on tablet/desktop
  (`repeat(auto-fit, minmax(280px, 1fr))`). No horizontal scroll at 360 / 390 /
  768 / 1024 / 1440.
- Honors `env(safe-area-inset-*)` for notched phones (`viewport-fit=cover`).
- Tap targets ≥ 44px; in-brand `:focus-visible` rings.
- **`prefers-reduced-motion`**: all Framer Motion, the torana draw-in, the petal
  rain, and Lottie playback are replaced with static states (enforced in both CSS
  and component logic).

## Signature motion

- A soft **gold torana** (garland arch) draws itself across the hero on load,
  with staggered mango-leaf garlands and gently swinging bells — SVG + Framer
  Motion (lighter than Lottie).
- A quiet **petal rain** drifts through the hero (SVG + Framer Motion).
- Everything else is kept calm and ceremonial.

## Design tokens

Palette (see [`app/globals.css`](app/globals.css)): deep maroon `#7A1F2B`,
saffron-gold `#D99A2B`, warm cream `#FBF6EC`, gold accent `#C99A3B`, ink `#3A1E12`.

## Deploy

Zero-config on **Vercel**:

```bash
npm i -g vercel
vercel            # preview
vercel --prod     # production
```

Or connect the GitHub repo at [vercel.com/new](https://vercel.com/new) and point
the `muhurtham.app` domain at the project. Any Node host that runs
`npm run build && npm run start` works too.

---

శుభమస్తు · Made for Andhra Pradesh.
