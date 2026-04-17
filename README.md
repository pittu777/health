# Health Shop

A polished **Next.js** storefront demo with product listing, filtering, cart experience, and auth flows.

## Completed Features

- **Home / Product Listing**
  - Responsive header with logo, search bar, cart badge, and avatar
  - Sidebar filters for categories, brands, and price range
  - Responsive product grid: 3 columns desktop, 2 columns tablet, 1 column mobile
  - Product cards with cover image, title, price, rating, and Add to Cart button
  - URL query-based filters and search state
  - Empty state when no products are found
- **Product Detail Page**
  - Large product image layout
  - Product title, price, description, category badge, rating, and quantity selector
  - Add to Cart action from the detail page
  - Reviews summary section
- **Cart Page**
  - Cart item list with quantity update controls
  - Remove item action
  - Price summary, subtotal, shipping, and total
  - LocalStorage persistence for cart state
- **Authentication**
  - Login and register pages with improved auth UI
  - Auth API routes for `/api/auth/login`, `/api/auth/register`, `/api/auth/logout`, and `/api/auth/refresh`
  - Redux user slice for authenticated user state
  - Session bootstrap and refresh support via the Redux provider

## Architecture

- `src/app/page.tsx` — Home / product listing route
- `src/app/product/[id]/page.tsx` — Product detail route
- `src/app/cart/page.tsx` — Cart route
- `src/app/(auth)/login/page.tsx` — Login page
- `src/app/(auth)/register/page.tsx` — Registration page
- `src/app/api/auth` — Auth backend API routes
- `src/feature/products` — Product-related UI components
- `src/feature/cart` — Cart page components
- `src/feature/auth` — Auth forms, hooks, and session management
- `src/store/cartSlice.ts` — Cart Redux slice
- `src/store/userSlice.ts` — Auth user Redux slice
- `src/lib/products.ts` — Faker-generated product dataset
- `src/components/ReduxProvider.tsx` — Redux provider, session bootstrap, and cart persistence
- `src/components/layout` — store layout shell and footer components

## Additional Files Added

- `src/store/userSlice.ts`
- `src/store/cartSlice.ts`
- `src/store/store.ts`
- `src/components/ReduxProvider.tsx`
- `src/lib/products.ts`
- `src/feature/auth/AuthForm.tsx`
- `src/feature/hooks/useAuth.ts`
- `src/feature/auth/Login.tsx`
- `src/feature/auth/Register.tsx`
- `src/feature/auth/Logout.tsx`
- `src/feature/auth/SessionRefresh.tsx`
- `src/app/api/auth/login/route.ts`
- `src/app/api/auth/register/route.ts`
- `src/app/api/auth/logout/route.ts`
- `src/app/api/auth/refresh/route.ts`
- `src/feature/products/components/ProductListingClient.tsx`
- `src/feature/products/components/ProductDetailClient.tsx`
- `src/feature/cart/components/CartPageClient.tsx`
- `src/components/layout/StoreLayoutShell.tsx`
- `src/components/layout/StoreLayoutFooter.tsx`

## Tech Stack

- Next.js 16
- React 19
- Tailwind CSS
- Redux Toolkit
- Faker.js for demo product data
- Lucide React icons
- MongoDB / Mongoose for auth backend

## Development

# Install dependencies and run locally:

- env example :

- dev = "development";

- MONGO_URI = url here

- JWT_EXPIRES_IN = "30d"
- JWT_SECRET = ""
- REFRESH_TOKEN_SECRET = ""

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Notes

- Cart state is persisted to `localStorage`.
- Auth session state is managed via Redux and auth API routes.
- Product data is generated using Faker for demo purposes.

## Deployment

This project is ready for deployment on Vercel. Add the Vercel deployment URL here once available.
