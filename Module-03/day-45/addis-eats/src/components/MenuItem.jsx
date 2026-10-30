import { useCartStore } from "../store/useCartStore";
import { formatPrice } from "../utils/currency";

function MenuItem({ item }) {
  const addToCart = useCartStore((s) => s.addToCart);

  return (
    <div className="menu-item">
      <div className="menu-item-image-wrapper">
        <img
          src={item.image}
          alt={item.name}
          className="menu-item-image"
          loading="lazy"
        />
        <div className="menu-item-badges">
          {item.isSpecial && <span className="badge badge-special">Special</span>}
          {item.isFasting && (
            <span className="badge badge-fasting">Fasting / Vegan</span>
          )}
        </div>
      </div>

      <div className="menu-item-body">
        <div className="menu-item-names">
          <h3 className="menu-item-name">{item.name}</h3>
          {item.nameAm && (
            <span className="menu-item-name-am">{item.nameAm}</span>
          )}
        </div>

        <p className="menu-item-description">{item.description}</p>

        <div className="menu-item-meta">
          {item.spiceLevel && (
            <span className="meta-chip meta-spice">{item.spiceLevel}</span>
          )}
          {item.servings && (
            <span className="meta-chip meta-servings">{item.servings}</span>
          )}
        </div>

        {item.ingredients?.length > 0 && (
          <p className="menu-item-ingredients">
            <strong>Ingredients:</strong> {item.ingredients.join(", ")}
          </p>
        )}

        <div className="menu-item-footer">
          <span className="menu-item-price">{formatPrice(item.price)}</span>
          <button className="add-to-cart-btn" onClick={() => addToCart(item)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuItem;