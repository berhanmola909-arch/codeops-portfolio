import DishList from "./DishList";
import FilterShell from "./FilterShell";

const API_URL = "https://addis-eats-backend.onrender.com/menu/";

// Fetch runs on the server. No useState, no useEffect, no /api route.
async function getDishes() {
  const res = await fetch(API_URL, {
    next: { revalidate: 3600 }, // cache for 1 hour
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

  const json = await res.json();
  if (json.status !== "ok" || !Array.isArray(json.data)) {
    throw new Error("Unexpected API response");
  }
  return json.data;
}

export default async function MenuPage() {
  const dishes = await getDishes();

  // Unique categories in order of first appearance
  const categories = [...new Set(dishes.map((d) => d.category))];

  return (
    <main className="menu-page">
      <h1 className="menu-title">Menu</h1>

      {/* Client shell wraps server content passed as children */}
      <FilterShell categories={categories}>
        <DishList dishes={dishes} />
      </FilterShell>
    </main>
  );
}