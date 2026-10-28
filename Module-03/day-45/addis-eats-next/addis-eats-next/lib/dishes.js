const API_URL = "https://addis-eats-backend.onrender.com/menu/";

export async function getAllDishes() {
  const res = await fetch(API_URL, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Upstream ${res.status}: ${res.statusText}`);

  const json = await res.json();
  if (json.status !== "ok" || !Array.isArray(json.data)) {
    throw new Error("Unexpected API response shape");
  }
  return json.data;
}

export async function getDishById(id) {
  const dishes = await getAllDishes();
  return dishes.find((d) => d.id === id) || null;
}