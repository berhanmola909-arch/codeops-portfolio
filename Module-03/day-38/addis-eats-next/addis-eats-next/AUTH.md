# AUTH.md

## Route Protection Matrix

| Route | Who | Protected By | What that proves |
|---|---|---|---|
| `/menu` | Everyone | Nothing | Public, indexable. |
| `/orders` | Owner | Middleware + Page + Scoped Query | Cookie exists -> Session valid -> Query uses `session.id`. |
| `/checkout` | Signed In | Middleware + Page + Action | Cookie exists -> Session valid -> Action re-checks. |
| `/kitchen` | Staff Only | Page + Role Check | Session valid -> `user.role === "staff"`. |

## The Three Attacks

1. **Call an action signed out:** `placeOrder` inside `app/actions.js` calls `getSession()`. If null, it redirects. *Stopped by `if (!user) redirect(...)`.*
2. **Cancel someone else's order:** `cancelOrder` fetches the order and checks `if (order.userId !== user.id)`. *Stopped by the ownership check.*
3. **Open Redirect:** `/signin?next=https://evil.com`. *Stopped by `safeNext()` which forces the URL to start with a single `/`.*