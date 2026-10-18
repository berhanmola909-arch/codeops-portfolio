import { useCart } from "../context/CartContext";

function OrderSuccess() {
  const { dismissSuccess } = useCart();

  return (
    <div className="success-overlay">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <h2 className="success-title">Order Placed Successfully!</h2>
        <p className="success-message">
          Thank you for your order. Your Habesha food is being prepared with
          love and will be ready shortly.
        </p>
        <button className="continue-btn" onClick={dismissSuccess}>
          Continue Ordering
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;