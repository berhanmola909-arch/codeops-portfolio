import { getAllDishes } from "@/lib/dishes";

export default async function sitemap() {
  const baseUrl = "https://addis-eats-demo.vercel.app"; // Update with your Vercel URL later
  
  const routes = ["", "/menu", "/signin"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily",
    priority: route === "" ? 1 : 0.8,
  }));

  // Optional: If you want dynamic dish pages in the sitemap later
  // const dishes = await getAllDishes();
  // const dishRoutes = dishes.map((dish) => ({
  //   url: `${baseUrl}/menu/${dish.slug}`,
  //   lastModified: new Date().toISOString(),
  // }));

  return [...routes];
}