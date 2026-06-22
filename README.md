# Digital Hat — Bangladeshi Fashion & Leather E-commerce

A modern, mobile-first, conversion-focused storefront for the Bangladesh market
(Panjabi, 100% leather goods, clothing & more). Built with Bangladesh shopping
norms in mind: Cash on Delivery, mobile-number login, Inside/Outside Dhaka
delivery, and WhatsApp / Messenger / Call ordering. Supports mixed Bangla +
English text.

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **SCSS / Sass** (7-1 architecture; design tokens as CSS custom properties — no Tailwind)
- **Poppins** (Latin) + **Hind Siliguri** (Bangla) via `next/font/google`
- **embla-carousel-react** (hero + related-product carousels)
- **sonner** (toasts) · **lucide-react** (icons)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (type-check + prerender)
npm run lint     # ESLint
```

## Project structure

```
src/
  app/
    layout.tsx              # fonts, announcement bar, header, footer, toaster
    page.tsx                # homepage (hero + category sections)
    category/[slug]/        # listing pages (real categories + virtual tag groups)
    product/[slug]/         # product detail
    search/                 # search results (?q=)
    cart/  checkout/        # cart + Bangla COD/online checkout
    about/ privacy-policy/ exchange-policy/ terms/ returns-refunds/
  components/
    layout/                 # AnnouncementBar, Header, MegaMenu, MobileNav, Footer, Logo, StaticPage
    sections/HeroCarousel.tsx
    product/                # ProductCard, Grid, CategorySection, Gallery, Detail, Carousel
    cart/CartLine.tsx
    ui/                     # Price, Breadcrumb, QuantityStepper, ProductImage, EmptyState, BrandIcons, Prose
  lib/                      # types, data (catalog/nav), cart-context, format, site
  styles/                   # SCSS (7-1): abstracts, base, layout, components, modules + globals.scss
```

## Styling (SCSS, no Tailwind)

Semantic, camelCase, prefixed classes (`.pcCard`, `.hdrCart`, `.btn--primary`,
`.priceNow--sale`) authored in `src/styles/` using the 7-1 Sass pattern.
Design tokens (colours, radii, shadows, fonts) are CSS custom properties in
`globals.scss` `:root`; breakpoints/mixins live in `abstracts/`.

## Milestone status

This is **Milestone 1 — Storefront UI** (fully built & verified): every
customer-facing page, a working client-side cart/checkout flow with
area-based delivery charges, search, mega-menu, toasts, and Bangla rendering.

**Mocked for now** (wired in later milestones):

- Product catalog is seeded in `lib/data.ts`; product imagery uses on-brand
  generated placeholders (`ProductImage`) — swap for real images / CMS.
- Login, "Track Order", and order confirmation are front-end only (no backend).
  Auth is designed around **mobile number** (BD standard).
- Online payment shows the **SSLCommerz** flow but isn't integrated.
- No admin panel yet.

**Next milestones:** real auth (mobile OTP), database + orders, SSLCommerz
integration, admin panel (products / stock / banners / orders / delivery
charges), user dashboard & order tracking.

## Brand / config

Contact details, hotline, social links, and trade-license info live in
`src/lib/site.ts` (placeholders). The strict colour palette is defined as CSS
custom properties in `src/styles/globals.scss` (`:root`).
