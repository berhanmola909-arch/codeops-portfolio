# BOUNDARY.md

Every component in Addis Eats, which side it runs on, and why.

| Component                     | Runs on | Why                                                     |
|-------------------------------|---------|---------------------------------------------------------|
| `app/layout.js`               | Server  | Renders markup, passes children into Providers.          |
| `app/page.js`                 | Server  | Static home page, no interactivity.                      |
| `app/providers.jsx`           | Client  | Context requires state; isolated so layout stays server. |
| `app/context/CartContext.jsx` | Client  | `useState`, `useCallback`, `createContext`.              |
| `app/menu/page.js`            | Server  | Async fetch of dishes. No hooks.                         |
| `app/menu/DishList.jsx`       | Server  | Pure markup from data. Ships zero JS.                    |
| `app/menu/DishCard.jsx`       | Server  | Pure markup. Imports one client leaf.                    |
| `app/menu/FilterShell.jsx`    | Client  | Holds `useState` for selected category.                  |
| `app/menu/AddToCartButton.jsx`| Client  | `onClick`, `useContext`. Smallest interactive leaf.      |

**Client components: 3.** Everything else stays on the server.

## Boundary rules demonstrated

1. **Server is the default.** Only three files carry `"use client"`.
2. **The directive spreads down.** `FilterShell` and `AddToCartButton` are the only entry points; nothing else joins the bundle.
3. **Pass, do not import.** `DishList` (server) reaches `FilterShell` (client) as `children`, not as an import.
4. **Data on the server.** The menu fetch runs once, on the server, before the HTML leaves. No `useEffect`, no loading flag, no `/api` route.
5. **Serialisable props only.** The only props crossing to client leaves are plain strings, numbers, and arrays — no functions.