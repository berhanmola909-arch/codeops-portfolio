import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { useAuthStore } from "../store/useAuthStore";
import Cart from "./Cart";

function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  // Subscribe directly to items so this component re-renders when the cart changes
  const totalItems = useCartStore((s) =>
    s.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <header className="app-header">
        <Link to="/" className="app-title">
          Habesha Eats
        </Link>

        <nav className="app-nav">
          {isAuthenticated ? (
            <>
              <span className="nav-user">Hi, {user?.name}</span>
              <button className="nav-link" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          )}

          <button
            className="cart-toggle-btn"
            onClick={() => setCartOpen(true)}
          >
            Cart ({totalItems})
          </button>
        </nav>
      </header>

      {cartOpen && (
        <div
          className="cart-drawer-overlay"
          onClick={() => setCartOpen(false)}
        >
          <aside
            className="cart-sidebar"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-cart-btn"
              onClick={() => setCartOpen(false)}
            >
              Close
            </button>
            <Cart />
          </aside>
        </div>
      )}
    </>
  );
}

export default Navbar;