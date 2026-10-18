# DATA.md

| Data | Location | Key / Refresh Rule | Reasoning |
|---|---|---|---|
| Menu | Server | `revalidate: 3600` | Public, cacheable, indexable. |
| Search | Client | Debounced (SWR) | Triggered by the user typing. Seeded by server data. |
| Order History | Server | Dynamic (Cookies) | Private, specific to the session. |
| Order Status | Client | Polled (SWR `refreshInterval`) | Needs to update automatically. Seeded by server. |
| Cart | Client Store | Zustand/Context | Temporary, never needs to hit the database until checkout. |