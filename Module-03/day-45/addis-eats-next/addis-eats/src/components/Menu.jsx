import { useState, useEffect } from "react";
import MenuItem from "./MenuItem";

const API_URL = "https://addis-eats-backend.onrender.com/menu/";

/* ---------------------------------------------------------------
   Dish-specific images. Each slug maps to a photo that represents
   that exact dish. No two dishes share the same image.
   --------------------------------------------------------------- */
const DISH_IMAGES = {
  // ---- Traditional Stews & Wat ----
  "doro-wat":
    "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600", // chicken stew with egg
  "siga-wat":
    "https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=600", // dark beef stew
  "beg-alicha-wat":
    "https://images.unsplash.com/photo-1544025162-d76694265947?w=600", // mild lamb stew
  "shiro-tegamino":
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600", // chickpea stew in clay pot
  "shiro-bozena":
    "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600", // chickpea puree with beef

  // ---- Tibs & Grills ----
  "siga-derek-tibs":
    "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=600", // pan-fried beef chunks
  "awaze-lamb-tibs":
    "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=600", // spicy lamb stir-fry
  "quanta-firfir":
    "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600", // shredded meat with flatbread
  "chornake-fish-tibs":
    "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600", // crispy fried tilapia

  // ---- Raw & Cured Delicacies / Kitfo ----
  "prime-beef-kitfo":
    "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600", // raw minced beef tartare
  "gored-gored":
    "https://images.unsplash.com/photo-1544025162-d76694265947?w=600", // cubed raw beef
  "kitfo-dulet":
    "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600", // minced beef + offal

  // ---- Fasting & Vegan / Tsom ----
  "full-vegan-beyaynetu":
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600", // colorful vegan platter
  "misir-wat":
    "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=600", // red lentil stew
  "kik-alicha-wat":
    "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600", // yellow split peas
  "gomen-collards":
    "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600", // collard greens
  "fresh-timatim-fitfit":
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600", // tomato salad with injera

  // ---- Beverages & Tej ----
  "house-tej-carafe":
    "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600", // honey wine
  "jebena-spiced-coffee":
    "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600", // Ethiopian coffee
  "spiced-habesha-chai":
    "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600", // spiced tea
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1547592180-85f173990554?w=600";

function pickImage(apiItem) {
  return DISH_IMAGES[apiItem.slug] || FALLBACK_IMAGE;
}

function normalizeMenuItem(apiItem) {
  return {
    id: apiItem.id,
    slug: apiItem.slug,
    name: apiItem.nameEn,
    nameAm: apiItem.nameAm,
    category: apiItem.category,
    price: apiItem.priceETB,
    spiceLevel: apiItem.spiceLevel,
    isFasting: apiItem.isFasting,
    isSpecial: apiItem.isSpecial,
    description: apiItem.description,
    ingredients: apiItem.ingredients || [],
    servings: apiItem.servings,
    image: pickImage(apiItem),
  };
}

function Menu() {
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadMenu() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

        const json = await res.json();
        if (json.status !== "ok" || !Array.isArray(json.data)) {
          throw new Error("Unexpected API response shape");
        }

        const normalized = json.data.map(normalizeMenuItem);

        const categoryOrder = [];
        normalized.forEach((item) => {
          if (!categoryOrder.includes(item.category)) {
            categoryOrder.push(item.category);
          }
        });

        const grouped = categoryOrder.map((catName) => ({
          id: catName,
          name: catName,
          items: normalized.filter((i) => i.category === catName),
        }));

        if (!cancelled) {
          setMenuData({ categories: grouped });
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    loadMenu();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <p className="status-message">Loading menu...</p>;
  if (error) return <p className="status-message error">Error: {error}</p>;

  return (
    <div className="menu">
      {menuData.categories.map((category) => (
        <section key={category.id} className="menu-category">
          <h2 className="category-title">{category.name}</h2>
          <div className="menu-grid">
            {category.items.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default Menu;