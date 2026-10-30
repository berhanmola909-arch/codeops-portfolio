import Image from "next/image";
import AddToCartButton from "./AddToCartButton";

// One unique photo per dish, matched to what each dish actually is
const DISH_IMAGES = {
  // Traditional Stews & Wat
  "doro-wat": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600",
  "siga-wat": "https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=600",
  "beg-alicha-wat": "https://images.unsplash.com/photo-1544025162-d76694265947?w=600",
  "shiro-tegamino": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600",
  "shiro-bozena": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600",

  // Tibs & Grills
  "siga-derek-tibs": "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=600",
  "awaze-lamb-tibs": "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600",
  "quanta-firfir": "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600",
  "chornake-fish-tibs": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600",

  // Raw & Cured Delicacies / Kitfo
  "prime-beef-kitfo": "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600",
  "gored-gored": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600",
  "kitfo-dulet": "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600",

  // Fasting & Vegan / Tsom
  "full-vegan-beyaynetu": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600",
  "misir-wat": "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=600",
  "kik-alicha-wat": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600",
  "gomen-collards": "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600",
  "fresh-timatim-fitfit": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600",

  // Beverages & Tej
  "house-tej-carafe": "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600",
  "jebena-spiced-coffee": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600",
  "spiced-habesha-chai": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600",
};

const FALLBACK =
  "https://images.unsplash.com/photo-1547592180-85f173990554?w=600";

export default function DishCard({ dish }) {
  const image = DISH_IMAGES[dish.slug] || FALLBACK;

  return (
    <article className="dish-card" data-category={dish.category}>
      <div className="dish-image-wrap">
        <Image
          src={image}
          alt={dish.nameEn}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="dish-image"
        />
        {dish.isSpecial && <span className="badge badge-special">Special</span>}
        {dish.isFasting && <span className="badge badge-fasting">Fasting</span>}
      </div>

      <div className="dish-body">
        <h3 className="dish-name">{dish.nameEn}</h3>
        <p className="dish-name-am">{dish.nameAm}</p>
        <p className="dish-description">{dish.description}</p>

        <div className="dish-meta">
          <span className="chip">{dish.spiceLevel}</span>
          <span className="chip">{dish.servings}</span>
        </div>

        <div className="dish-footer">
          <span className="dish-price">Br {dish.priceETB.toFixed(2)}</span>
          <AddToCartButton dish={dish} />
        </div>
      </div>
    </article>
  );
}