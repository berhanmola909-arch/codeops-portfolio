import { getAllDishes } from "@/lib/dishes";
import DishList from "./DishList";
import SearchBar from "./SearchBar";

export const metadata = {
  title: "Menu",
  description:
    "Browse our full menu of traditional Ethiopian stews, tibs, and kitfo.",
};

export default async function MenuPage() {
  const dishes = await getAllDishes();
  const categories = [...new Set(dishes.map((d) => d.category))];

  return (
    <main className="menu-page">
      <h1 className="menu-title">Menu</h1>
      <SearchBar />
      <DishList dishes={dishes} categories={categories} />
    </main>
  );
}