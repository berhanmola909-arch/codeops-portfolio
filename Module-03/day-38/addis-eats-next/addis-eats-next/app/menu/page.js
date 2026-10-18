import { getAllDishes } from "@/lib/dishes";
import DishList from "./DishList";
import FilterShell from "./FilterShell";

export default async function MenuPage() {
  const dishes = await getAllDishes();
  const categories = [...new Set(dishes.map((d) => d.category))];

  return (
    <main className="menu-page">
      <h1 className="menu-title">Menu</h1>
      <FilterShell categories={categories}>
        <DishList dishes={dishes} />
      </FilterShell>
    </main>
  );
}