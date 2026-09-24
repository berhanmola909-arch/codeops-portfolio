# Mesob House / Habesha Restaurant

Mesob House is a mobile-first Ethiopian restaurant ordering interface built with React and Vite. The visual direction is inspired by the supplied Figma design: warm terracotta, coffee brown, cream, leafy green, editorial serif headings, food photography, and a persistent mobile navigation bar.

The project is also a beginner React exercise. It demonstrates components, props, state, events, effects, custom hooks, derived values, controlled inputs, JSON data, and React Router v6.

## 1. What The App Does

The application supports these customer flows:

- Visit the restaurant landing page at `/home`.
- Browse every dish at `/`.
- Search dishes by English or Amharic name.
- Filter dishes by their JSON category.
- Open a dish detail page at `/dish/:id`.
- View spice information and dish servings.
- Add dishes to the basket.
- Increase or decrease quantities.
- Remove basket items.
- See subtotal, delivery fee, and total.
- Continue to checkout at `/checkout`.
- Choose delivery or pick-up.
- Enter recipient information.
- Open the simple account screen at `/login`.

The application does not connect to a real payment service or restaurant backend. Checkout is intentionally a front-end learning flow.

## 2. Technology Choices

### React

React divides the interface into components. Each component owns a small visual or behavioral responsibility. This makes the application easier to understand than placing every element in one large file.

### Vite

Vite provides the development server and production build process. It gives fast browser updates while developing and bundles the application for deployment.

### React Router v6

`react-router-dom` v6 provides client-side navigation. The browser can move between menu, home, dish, cart, checkout, and login screens without a full page reload.

### Tailwind CSS Vite plugin

Tailwind is installed through the Vite plugin. The project currently uses a custom CSS file for the visual system, while Tailwind remains available for utility classes and future exercises.

### Local JSON data

The menu and specials are local JSON files. This keeps the exercise simple: the UI can render realistic restaurant data without requiring an API, database, or asynchronous data library.

## 3. Folder Structure

```text
src/
  App.jsx
  App.css
  index.css
  main.jsx
  components/
    BottomNav.jsx
    DishCard.jsx
    EmptyPage.jsx
    FloatingCartBar.jsx
    Header.jsx
    OptionGroup.jsx
  data/
    dishImages.js
    menu.json
    specials.json
  hooks/
    useCart.js
  pages/
    AuthPage.jsx
    CartPage.jsx
    CheckoutPage.jsx
    DishDetailPage.jsx
    LandingPage.jsx
    MenuPage.jsx
```

### Why this structure exists

- `App.jsx` is the composition root. It connects routing, layout, and the cart hook.
- `components/` contains reusable interface pieces that appear in more than one place.
- `pages/` contains complete route-level screens.
- `hooks/` contains reusable stateful logic.
- `data/` contains content and data-specific helpers.
- `App.css` contains the visual design rules.
- `index.css` contains global browser and font setup.
- `main.jsx` is the React entry point.

This separation follows a useful beginner rule: a file should have one main reason to change.

## 4. Application Startup

The browser starts at `src/main.jsx`:

```jsx
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(<App />);
```

### Why `main.jsx` is small

The entry file should only start React and render the top-level component. Keeping it small means application behavior stays in `App.jsx` and its child modules rather than being mixed with bootstrapping code.

`index.css` is imported here because global styles must be loaded before the application is displayed.

## 5. The Application Shell

`src/App.jsx` owns the application frame:

```jsx
function App() {
  const { cart, itemCount, cartTotal, addToCart, updateQuantity, removeItem } =
    useCart();

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Header itemCount={itemCount} />
        <main className="page-content">
          <Routes>{/* route declarations */}</Routes>
        </main>
        {cart.length > 0 && (
          <FloatingCartBar itemCount={itemCount} total={cartTotal} />
        )}
        <BottomNav itemCount={itemCount} />
      </div>
    </BrowserRouter>
  );
}
```

### Why the shell owns the cart hook

The header, bottom navigation, floating cart bar, menu page, detail page, and cart page all need cart information. The cart state is therefore created at their nearest common parent: `App`.

The pages do not create separate carts. Instead, `App` passes the relevant functions down as props. This keeps one source of truth:

```text
App
  ├── Header receives itemCount
  ├── MenuPage receives addToCart
  ├── DishDetailPage receives addToCart
  ├── CartPage receives cart, updateQuantity, removeItem
  ├── FloatingCartBar receives itemCount and cartTotal
  └── BottomNav receives itemCount
```

If every page created its own cart state, adding an item on the menu would not update the cart screen. Lifting the state to `App` prevents that problem.

## 6. Routing

The router is configured in `App.jsx`:

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<MenuPage onAdd={addToCart} />} />
    <Route path="/home" element={<LandingPage />} />
    <Route path="/dish/:id" element={<DishDetailPage onAdd={addToCart} />} />
    <Route path="/cart" element={<CartPage ... />} />
    <Route path="/checkout" element={<CheckoutPage />} />
    <Route path="/login" element={<AuthPage />} />
  </Routes>
</BrowserRouter>
```

### Why `BrowserRouter` is used

`BrowserRouter` watches the browser URL and lets React choose which page to render. It provides normal-looking URLs rather than requiring hash URLs such as `/#/cart`.

### Why `Routes` and `Route` are used

`Routes` contains the route table. Each `Route` maps a URL pattern to a React element.

### Why `/dish/:id` has a parameter

There are many dishes but only one detail page component. The `:id` part makes the route dynamic:

```text
/dish/menu-1
/dish/menu-6
/dish/menu-18
```

`DishDetailPage` reads that value with `useParams()` and finds the matching menu item.

## 7. The Custom Cart Hook

The main cart logic is in `src/hooks/useCart.js`.

A custom hook is a function that begins with `use` and packages reusable React logic. The hook is useful here because cart behavior includes state, local storage, event functions, and derived calculations. Putting all of that in `App.jsx` would make the application shell harder to read.

### Cart state

```jsx
const [cart, setCart] = useState(
  () => JSON.parse(localStorage.getItem("mesob-cart")) || [],
);
```

`useState` stores the current basket. The function passed to `useState` is a lazy initializer. It reads local storage only during initial setup instead of reading it on every render.

### Why local storage is used

Without local storage, refreshing the browser would erase the basket. The basket is a small JSON-compatible array, so local storage is a suitable beginner solution.

This is not a replacement for a server cart. It only stores data in the current browser.

### Synchronizing local storage

```jsx
useEffect(() => {
  localStorage.setItem("mesob-cart", JSON.stringify(cart));
}, [cart]);
```

`useEffect` runs after React renders when `cart` changes. `JSON.stringify` converts the JavaScript array into text because local storage stores strings.

The dependency array `[cart]` means the effect runs when the cart changes, not on every unrelated render.

### Adding a dish

`addToCart` creates a basket item from a menu record. It adds a `cartId` so customized versions can be identified.

```jsx
const item = {
  ...dish,
  cartId: `${dish.id}-${options.spice || ""}`,
  ...options,
  quantity: 1,
};
```

The spread operator copies the dish fields. This avoids manually copying every ingredient, name, price, and description.

If the same `cartId` is already in the cart, the quantity increases. Otherwise, a new item is appended.

### Updating quantity

`updateQuantity` receives an item ID and an amount:

- `-1` decreases the quantity.
- `1` increases the quantity.

After changing quantities, items with zero quantity are filtered out. This means the minus button can remove the last copy naturally.

### Removing an item

`removeItem` filters out the matching `cartId`. `filter` returns a new array, which is important because React state should be updated immutably rather than modified directly.

### Derived values

```jsx
const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
const cartTotal = cart.reduce(
  (total, item) => total + (item.priceETB || item.price || 0) * item.quantity,
  0,
);
```

`itemCount` and `cartTotal` are derived from the cart. They are not stored as separate state because they can always be calculated from the current items.

This avoids duplicated state becoming inconsistent. For example, if an item is removed, a separate total state could accidentally remain unchanged. Recalculating from the source data avoids that class of bug.

The `item.price` fallback keeps older local storage entries readable after the menu schema changed to `priceETB`.

## 8. JSON Data Model

The attached menu data uses records such as:

```json
{
  "id": "menu-1",
  "slug": "doro-wat",
  "nameEn": "Classic Doro Wat",
  "nameAm": "የዶሮ ወጥ",
  "category": "Traditional Stews & Wat",
  "priceETB": 650,
  "spiceLevel": "Fiery Berbere (3/3)",
  "isFasting": false,
  "isSpecial": true,
  "description": "...",
  "ingredients": ["Free-range chicken", "Berbere"],
  "servings": "Serves 1-2 generously"
}
```

### Meaning of the important fields

- `id`: unique identifier used by the route and cart.
- `slug`: readable URL-friendly name for future URLs or SEO.
- `nameEn`: English display name.
- `nameAm`: Amharic display name.
- `category`: category used by the menu filter.
- `priceETB`: numeric price in Ethiopian birr.
- `spiceLevel`: descriptive spice information shown on the detail screen.
- `isFasting`: controls the vegan / fasting badge.
- `isSpecial`: controls the special badge.
- `description`: dish explanation shown in cards and details.
- `ingredients`: useful data for a future ingredients section.
- `servings`: portion information shown on the detail screen.

### Why the data stays outside components

Menu content changes more often than layout code. Keeping it in JSON lets someone update prices or dish descriptions without editing JSX.

It also allows the same data to be reused by the menu page, landing page, detail page, and future search features.

## 9. Image Fallback Strategy

The new JSON records do not contain image URLs. The app therefore uses `src/data/dishImages.js`:

```jsx
export function getDishImage(dish) {
  const imageIndex = Number.parseInt(dish.id.replace("menu-", ""), 10) - 1;
  return dish.image || dishImages[imageIndex % dishImages.length];
}
```

### Why a helper is used

The fallback decision belongs to one helper rather than being repeated in every component. If image handling changes later, only this file needs to change.

The function first checks `dish.image`, which means future data can provide a specific image. If there is no image, it selects one of the available fallback images based on the numeric menu ID.

The modulo operator makes the image list repeat safely when there are more dishes than fallback images.

## 10. Reusable Components

### `Header.jsx`

The header displays the Mesob House brand, account link, and basket count. It receives `itemCount` as a prop because the hook belongs to `App`, not to the header.

### `BottomNav.jsx`

The bottom navigation keeps the main mobile actions visible. `NavLink` is used instead of `Link` because it can detect the active URL and apply the `active` class.

### `FloatingCartBar.jsx`

This component appears only when `cart.length > 0`. Conditional rendering keeps the interface quiet when there is nothing to order.

### `DishCard.jsx`

This component renders one dish summary. It receives a `dish` object and an `onAdd` function. The parent decides what happens when the user adds the item; the card only reports the event.

This is a good example of parent-to-child data flow:

```jsx
<DishCard dish={dish} onAdd={onAdd} />
```

### `OptionGroup.jsx`

This component renders a title and a group of selectable options. The current project uses it for the dish spice profile. It is reusable because it does not know anything about a particular dish.

### `EmptyPage.jsx`

This provides one consistent empty state for an unknown dish and an empty basket.

## 11. Page Components

### `MenuPage.jsx`

The menu page owns two local UI states:

```jsx
const [search, setSearch] = useState("");
const [category, setCategory] = useState("All");
```

These states belong here because they affect only menu browsing. They do not need to be lifted to `App`.

The page builds categories dynamically:

```jsx
const categories = ["All", ...new Set(menu.map((dish) => dish.category))];
```

This is better than hard-coding category buttons because the attached JSON can gain a new category without requiring a code change.

The filtered menu is derived with `filter`. A dish must satisfy both conditions:

1. It belongs to the selected category, or the selected category is `All`.
2. Its English or Amharic name contains the search text.

The input is controlled because its displayed value comes from React state and its `onChange` handler updates that state.

### `LandingPage.jsx`

The landing page presents the hero message, the cultural story block, and highlighted dishes.

The special records are connected to menu records by ID:

```jsx
const highlights = specials
  .slice(0, 3)
  .map((special) => menu.find((dish) => dish.id === special.id))
  .filter(Boolean);
```

`find` selects the full dish record so the existing `DishCard` can render it. `filter(Boolean)` protects the UI if a special record references a menu item that no longer exists.

### `DishDetailPage.jsx`

This page uses `useParams()` to read the dynamic ID. It finds the matching dish and shows:

- Image
- Category
- English name
- Amharic name
- Description
- Servings
- Price
- Spice profile
- Add-to-basket action

`useNavigate()` redirects the user to `/cart` after adding the dish. This gives immediate feedback that the item was accepted.

### `CartPage.jsx`

This page receives the cart and mutation functions as props. It does not own the cart state.

The subtotal is derived with `reduce`. A fixed delivery fee of 80 ETB is added when the cart is not empty. This fee is currently a front-end exercise value and could later be replaced by delivery-zone logic.

Quantity buttons call the hook functions through props:

```jsx
<button onClick={() => onUpdate(item.cartId, -1)}>-</button>
<button onClick={() => onUpdate(item.cartId, 1)}>+</button>
```

### `CheckoutPage.jsx`

Checkout owns the delivery method toggle because that selection only affects checkout. It uses controlled React state:

```jsx
const [method, setMethod] = useState("Delivery");
```

The address field is conditionally rendered only for delivery. Pick-up does not need a delivery address.

The form is intentionally visual. It does not submit to a server.

### `AuthPage.jsx`

The auth page is a presentation screen for the account flow. It includes controlled-looking fields but does not authenticate a user because there is no backend in this exercise.

## 12. Props And Data Flow

Props are values passed from a parent component to a child component.

Example:

```jsx
<Header itemCount={itemCount} />
```

The parent owns the value. The child receives it and displays it.

The cart mutation flow is:

```text
User clicks Add
  -> DishCard calls onAdd(dish)
  -> MenuPage passes the function from App
  -> useCart adds the item
  -> App re-renders
  -> Header, bottom nav, and floating bar receive new totals
```

This is predictable because data flows downward and events travel upward through callback props.

## 13. Styling And Visual Design

The visual system is defined with CSS variables:

- `--ink`: dark text and navigation background.
- `--muted`: secondary copy.
- `--cream`: page background.
- `--paper`: light content surfaces.
- `--terracotta`: primary action and Ethiopian-inspired accent.
- `--green`: cultural story section.
- `--line`: subtle borders.

### Why CSS variables are used

A color variable makes the design consistent. Changing `--terracotta` updates every accent button, price, badge, and heading that uses it.

### Typography

The interface uses `Playfair Display` for expressive restaurant headings and `DM Sans` for readable controls and body content. The contrast creates a more editorial restaurant identity than a default browser font.

### Responsive behavior

The layout uses CSS media queries:

- Desktop displays three menu columns.
- Tablet and mobile reduce the grid to two columns.
- Very narrow screens use one column.
- The bottom navigation remains fixed for thumb-friendly mobile access.
- The floating cart bar stays above the bottom navigation.

## 14. Why Context Is Not Used

This project keeps the cart in `App` and passes it through props. That is intentional for the learning scope.

Context could reduce prop passing in a larger application, but it would hide the data flow from a beginner. The current approach makes ownership visible:

```text
App owns cart
Pages receive cart props
Components receive display props
```

The custom `useCart` hook organizes the logic without changing that ownership model. It does not create a global state store.

## 15. Running The Project

From the project folder:

```bash
npm install
npm run dev
```

Vite will print a local URL, usually:

```text
http://localhost:5173
```

To create a production build:

```bash
npm run build
```

To run lint:

```bash
npm run lint
```

To preview the production build:

```bash
npm run preview
```

## 16. Validation Checklist

After changing the code, verify:

- The menu loads at `/`.
- The home page loads at `/home`.
- A menu card opens `/dish/menu-1` or another real ID.
- Search matches English and Amharic names.
- Category buttons are generated from the JSON data.
- Special dishes show the `SPECIAL` badge.
- Fasting dishes show the `VEGAN / ጾም` badge.
- Adding an item updates the header count.
- Adding an item displays the floating cart bar.
- The cart persists after refreshing the page.
- Plus and minus buttons update totals.
- Removing the final item hides the floating cart bar.
- Delivery and pick-up toggle correctly.
- `npm run lint` passes.
- `npm run build` passes.

## 17. Known Limits

This is a front-end learning application, not a production ordering system.

- There is no real login.
- There is no real payment processing.
- Checkout does not send an order to a server.
- Local storage is browser-specific and not secure for sensitive data.
- Image URLs are remote Unsplash URLs and require network access.
- The specials page uses special IDs to look up full menu records.
- The delivery fee is currently fixed at 80 ETB.

## 18. Suggested Beginner Extensions

Good next exercises are:

1. Add an ingredients section to `DishDetailPage` using `dish.ingredients.map(...)`.
2. Add a fasting-only filter.
3. Add a quantity selector before adding a dish.
4. Add form validation to checkout.
5. Add a confirmation page after checkout.
6. Replace the fixed delivery fee with a selected neighborhood fee.
7. Add a favorites state to `useState`.
8. Add a `NotFoundPage` route for unknown URLs.
9. Add image fields to the JSON and remove the fallback mapping.
10. Create tests for `useCart` behavior.

Each extension should preserve the existing ownership rule: keep state as close as possible to the components that need it, and lift it only when multiple parts of the application need to share it.

## 19. Summary

The application is organized around a simple architecture:

```text
JSON data
  -> page filters or looks up records
  -> reusable components render records
  -> user events call callback props
  -> useCart updates one shared cart
  -> derived totals update navigation and checkout UI
```

The most important design decision is keeping the cart state in one place while separating the code that displays it. That gives the project both beginner-readable data flow and reusable React components.
