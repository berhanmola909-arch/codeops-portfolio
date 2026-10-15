import { Link } from "react-router-dom";

function SuccessPage() {
  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon">OK</div>
        <h2 className="success-title">Order Placed Successfully!</h2>
        <p className="success-message">
          Thank you for your order. Your Habesha food is being prepared and
          will be ready shortly.
        </p>
        <Link to="/" className="continue-btn">
          Continue Ordering
        </Link>
      </div>
    </div>
  );
}

export default SuccessPage;