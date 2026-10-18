import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { formatPrice } from "../utils/currency";

function Cart() {
  const navigate = useNavigate();

  const items = useCartStore((s) => s.items);
  const addToCart = useCartStore((s) => s.addToCart);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const deleteFromCart = useCartStore((s) => s.deleteFromCart);
  const getTotalPrice = useCartStore((s) => s.getTotalPrice);

  const total = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="cart">
        <h2 className="cart-title">Your Cart</h2>
        <p className="empty-cart">Your cart is empty. Add some Habesha food!</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2 className="cart-title">Your Cart</h2>

      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.id} className="cart-item">
            <div className="cart-item-info">
              <span className="cart-item-name">{item.name}</span>
              <span className="cart-item-price">
                {formatPrice(item.price)} each
              </span>
            </div>
            <div className="cart-item-controls">
              <button
                className="qty-btn"
                onClick={() => removeFromCart(item.id)}
              >
                -
              </button>
              <span className="qty-display">{item.quantity}</span>
              <button className="qty-btn" onClick={() => addToCart(item)}>
                +
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteFromCart(item.id)}
              >
                x
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="cart-total">
        <span>Total:</span>
        <span>{formatPrice(total)}</span>
      </div>

      <button
        className="place-order-btn"
        onClick={() => navigate("/checkout")}
      >
        Checkout
      </button>
    </div>
  );
}

export default Cart;