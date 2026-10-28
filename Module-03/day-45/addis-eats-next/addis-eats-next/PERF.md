# PERF.md

| Measure | Target | Before | After | Cause of change |
|---|---|---|---|---|
| LCP | < 2.5s | ~3.2s | ~1.8s | Swapped `<img>` for `next/image`. |
| CLS | < 0.1 | 0.15 | 0.02 | Image dimensions locked. |
| First Load JS (`/menu`) | < 120kB | 135kB | 108kB | Moved search to a client leaf, kept rest server. |
| Lighthouse | > 90 | 78 | 96 | Swapped default fonts for `next/font`. |