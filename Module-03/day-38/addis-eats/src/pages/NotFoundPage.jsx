import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="form-page">
      <h2 className="form-title">Page Not Found</h2>
      <p className="empty-cart">
        The page you are looking for does not exist.
      </p>
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        <Link to="/" className="continue-btn">
          Back to Menu
        </Link>
      </p>
    </div>
  );
}

export default NotFoundPage;