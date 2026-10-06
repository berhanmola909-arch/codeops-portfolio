import AddToCartButton from "./AddToCartButton";

// Image map — server-side lookup, no client cost
const DISH_IMAGES = {
  "doro-wat": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600",
  "siga-derek-tibs": "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=600",
  "prime-beef-kitfo": "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600",
  "full-vegan-beyaynetu": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600",
  "house-tej-carafe": "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600",
};

const FALLBACK =
  "https://images.unsplash.com/photo-1547592180-85f173990554?w=600";

export default function DishCard({ dish }) {
  const image = DISH_IMAGES[dish.slug] || FALLBACK;

  return (
    <article className="dish-card" data-category={dish.category}>
      <div className="dish-image-wrap">
        <img
          src={image}
          alt={dish.nameEn}
          className="dish-image"
          loading="lazy"
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

          {/* Only this leaf is client — the onClick needs the browser */}
          <AddToCartButton dish={dish} />
        </div>
      </div>
    </article>
  );
}