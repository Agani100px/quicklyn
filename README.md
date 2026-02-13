# Quicklyn Headless (Next.js)

Mobile-first headless WordPress frontend for Quicklyn cleaning services. Built with Next.js 15, TypeScript, Tailwind CSS, Shadcn-style components, and GSAP.

## Stack

- **Next.js** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS** + **tailwindcss-animate**
- **Shadcn-style** (CVA, Radix Slot, `cn` utility)
- **GSAP** (ScrollTrigger for hero background animation)
- **pnpm**

## Setup

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Configure WordPress**

   Copy `.env.local.example` to `.env.local` and set your WordPress URL:

   ```bash
   cp .env.local.example .env.local
   ```

   In `.env.local`:

   ```env
   WORDPRESS_URL=http://quicklyn-headless.local
   ```

   (No trailing slash. Use your real WordPress base URL if different.)

3. **Run dev server**

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Home page

- Data is loaded from the WordPress REST API: `GET /wp-json/wp/v2/pages?slug=home&acf_format=standard`.
- If the API is unavailable (e.g. WordPress not running), the app uses built-in fallback ACF data so the home page still renders.
- **Mobile-first hero**: promo banner, logo, hamburger, heading, App Store / Google Play buttons, description, “Get an Estimate” CTA.
- **Scroll animation**: On scroll, the dark teal overlay over the hero background fades out (GSAP ScrollTrigger), so the background image becomes more visible.

## Scripts

- `pnpm dev` — start dev server (Turbopack)
- `pnpm build` — production build
- `pnpm start` — start production server
- `pnpm lint` — run ESLint
# quicklyn
