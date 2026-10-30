# FUTURE.md

## What we cut and why
* **WebSockets:** We chose Server-Sent Events (via interval simulation) or Polling for the tracking page because it's lighter weight. WebSockets would require a separate server setup not supported by Vercel's default serverless functions.
* **CSV Export:** Deferred to Module 4. The priority was security and authentication.
* **Infinite Scroll:** We used pagination for the Order History because it keeps the URL shareable and the back button working correctly (as taught in Day 46).

## Known Limitations
* Leaflet map uses a hardcoded Addis Ababa coordinate instead of live GPS data from a courier app.
* The Dashboard revenue is mocked with an arbitrary number (`100`) because we don't have a payment gateway connected yet.