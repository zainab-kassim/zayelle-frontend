# Zayelle — Frontend

The customer-facing storefront for [Zayelle](https://byzayelle.com), a fashion e-commerce site with multi-currency checkout, custom-order booking, and order tracking. Built with Next.js (App Router) and TypeScript.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS |
| State | Zustand (with `persist` for checkout/session-scoped state) |
| Forms & validation | TanStack Form, Zod |
| HTTP | Axios |
| Animation | Framer Motion |
| Notifications | Sonner |

## Features

- **Storefront** — product catalog, collections, product detail pages with size/quantity selection
- **Cart & checkout** — persistent cart, multi-step checkout with address form, live currency ↔ shipping-country sync, order review with real subtotal/shipping breakdown
- **Multi-currency** — a currency toggle that stays in sync with the shipping destination; final price/currency is always confirmed server-side
- **Payments** — Stripe and Paystack, with a hydration-safe checkout-confirmation flow (no false "order not found" on refresh)
- **Auth** — email/password and Google sign-in, forgot/reset password
- **Orders** — paginated order history and order detail views, race-safe against rapid filter changes
- **Custom orders** — a from-scratch calendar/time-picker booking flow for design consultations, with live conflict detection
- **SEO** — dynamic `sitemap.xml` and `robots.txt`, Open Graph and Twitter card metadata with a branded social-preview image
- **Branded error states** — custom 404 and error-boundary pages matching the site's design system

## Project structure

```
app/
  (main)/            Storefront routes — home, products, cart, checkout, orders, custom-order
  auth/               Login, signup, forgot/reset password
  layout.tsx          Root layout, metadata (SEO/Open Graph)
  not-found.tsx        Branded 404 page
  sitemap.ts / robots.ts
components/
  shared/             Page-level composed components (Navbar, Footer, checkout flow, order views)
  ui/                 Reusable UI primitives (cards, skeletons, selectors)
  forms/              Auth forms
hooks/                Data-fetching and form hooks
lib/                  Axios instance, currency helpers, session helpers, Zod schemas
services/             API-calling functions, one per resource (auth, cart, order, payment, product...)
store/                Zustand stores (checkout, currency, orders)
types/                Shared TypeScript types
public/               Static assets (favicon, OG image, product images)
```

## Getting started

### Prerequisites

- Node.js 20+
- The [backend API](https://github.com/zainab-kassim/zayelle-Backend) running locally or a deployed instance to point at

### Install

```bash
npm install
```

### Environment variables

Create a `.env.local` file in the project root:

```bash
BACKEND_API_URL=http://localhost:4000
LOCAL_URL=http://localhost:3000
NODE_ENV=development
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
```

### Run

```bash
npm run dev      # start the dev server at http://localhost:3000
npm run build    # production build
npm start        # run the production build
npm run lint     # ESLint
```

## Routes

| Path | Description |
|---|---|
| `/` | Home |
| `/products`, `/products/[slug]` | Catalog and product detail |
| `/cart` | Cart |
| `/checkout` | Multi-step checkout |
| `/orders`, `/orders/[id]` | Order history and detail (auth required) |
| `/custom-order/book` | Custom-order consultation booking |
| `/auth/login`, `/auth/signup`, `/auth/forgot-password`, `/auth/reset-password` | Auth |

## Key decisions

- **Backend is the source of truth for price and currency.** The currency toggle is a UI convenience; the shipping country submitted at checkout is what the backend uses to derive the actual currency and rate, so the displayed total can never drift from what's charged.
- **Hydration-gated checkout confirmation.** Checkout state persists via Zustand's `persist` middleware; the confirmation screen waits for rehydration to finish before deciding an order is "not found," avoiding a false negative on page refresh.
- **Race-safe data fetching.** Order history uses a request-id counter so a slow, stale response can never overwrite a newer one.

## Deployment

Deployed on Vercel at [byzayelle.com](https://byzayelle.com). Set the environment variables above in the Vercel project settings rather than committing `.env.local`.
