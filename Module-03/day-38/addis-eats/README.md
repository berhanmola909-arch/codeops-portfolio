# Addis Eats

A red-themed Ethiopian food ordering web app built with React and Vite.
Users can browse a live menu of Habesha dishes, filter by category, add
items to a cart, log in, and place an order.

Live menu API: https://addis-eats-backend.onrender.com/menu/

---

## The Brief

**Problem:** Ordering Ethiopian food online is hard because most restaurant
sites are static, don't show what's actually available, and can't handle a
cart or user account.

**User:** Anyone in Addis Ababa (or abroad) who wants to order traditional
Habesha dishes from a phone or laptop in under a minute.

**Five main screens:**
1. Home — menu grouped by category, live from the API
2. Login — email + password, validated
3. Register — name, email, password, confirm password
4. Checkout — customer details, protected route (requires login)
5. Success — order confirmation after placing an order

**Data used per screen:**

| Screen   | Data                                                        |
|----------|-------------------------------------------------------------|
| Home     | menu items (id, name, nameAm, price, category, ingredients) |
| Login    | email, password                                             |
| Register | name, email, password, confirmPassword                      |
| Checkout | fullName, phone, address, city, notes                       |
| Success  | none (reads cart total before clearing)                     |

---

## Tech Stack

- React 18 + Vite
- React Router (routing + lazy loading)
- Zustand (Cart and Auth state, persisted)
- react-hook-form + Zod (form handling and validation)
- Error Boundary (catches render errors)
- Plain CSS (no framework)

---

## Component Tree

App
├── Navbar
│ ├── Cart badge (reads cart item count)
│ └── Cart drawer
│ └── Cart
│ └── Cart item rows
├── ErrorBoundary
│ └── Suspense (page loader fallback)
│ └── Routes
│ ├── HomePage
│ │ └── Menu
│ │ └── MenuItem
│ ├── LoginPage
│ ├── RegisterPage
│ ├── CheckoutPage (protected)
│ ├── SuccessPage
│ └── NotFoundPage


**Ownership:**

| Component      | Owns                                                      |
|----------------|-----------------------------------------------------------|
| App            | Routes, lazy imports, top-level layout                    |
| Navbar         | Cart drawer open/close, auth links                        |
| Menu           | Fetches menu, groups by category                          |
| MenuItem       | Renders one dish, "Add to Cart" action                    |
| Cart           | Cart list, quantity controls, checkout button             |
| LoginPage      | Login form and submission                                 |
| RegisterPage   | Register form and submission                              |
| CheckoutPage   | Checkout form, places order, clears cart                  |
| SuccessPage    | Confirmation message                                      |
| NotFoundPage   | Fallback for unknown routes                               |
| ErrorBoundary  | Catches render errors below it                            |
| ProtectedRoute | Redirects to /login if not authenticated                  |

---

## State Placement

| State            | Where it lives        | Why                                        |
|------------------|-----------------------|--------------------------------------------|
| Cart items       | Zustand `useCartStore`| Shared across Navbar, Cart, Checkout       |
| Cart persistence | Zustand `persist`     | Survives page refresh                      |
| Auth user        | Zustand `useAuthStore`| Needed by Navbar and ProtectedRoute        |
| Auth persistence | Zustand `persist`     | Keeps user logged in on refresh            |
| Menu data        | Local state in `Menu` | Only used in that one component            |
| Cart drawer open | Local state in Navbar | Only Navbar cares                          |
| Form input       | react-hook-form       | Local to each form                         |

No `useState` is used for cart or auth — that's the whole point of Zustand.

---

## Route Map

| Path        | Screen        | Access     | Lazy |
|-------------|---------------|------------|------|
| /           | HomePage      | Public     | Yes  |
| /login      | LoginPage     | Public     | Yes  |
| /register   | RegisterPage  | Public     | Yes  |
| /checkout   | CheckoutPage  | Protected  | Yes  |
| /success    | SuccessPage   | Public     | Yes  |
| *           | NotFoundPage  | Public     | Yes  |

"Protected" means the route is wrapped in `ProtectedRoute`. If the user is
not logged in, they are redirected to `/login`.

---

## Setup

# 1. Install dependencies
#npm install

# 2. Run the dev server
 npm run dev

## Required Packages
npm install zustand react-hook-form @hookform/resolvers zod react-router-dom

# Project Structure
addis-eats/
├── index.html
├── vite.config.js
├── package.json
├── README.md
└── src/
    ├── main.jsx
    ├── index.css
    ├── App.jsx
    ├── App.css
    ├── components/
    │   ├── ErrorBoundary.jsx
    │   ├── ProtectedRoute.jsx
    │   ├── Navbar.jsx
    │   ├── Menu.jsx
    │   ├── MenuItem.jsx
    │   └── Cart.jsx
    ├── pages/
    │   ├── HomePage.jsx
    │   ├── LoginPage.jsx
    │   ├── RegisterPage.jsx
    │   ├── CheckoutPage.jsx
    │   ├── SuccessPage.jsx
    │   └── NotFoundPage.jsx
    ├── schemas/
    │   ├── authSchemas.js
    │   └── checkoutSchema.js
    ├── store/
    │   ├── useCartStore.js
    │   └── useAuthStore.js
    └── utils/
        └── currency.js

