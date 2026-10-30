"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

export default function CartPage() {
  // FIX: Added addToCart to the destructuring here
  const { items, addToCart, removeFromCart, deleteFromCart, totalItems } = useCart();

  // Calculate total price
  const totalPrice = items.reduce(
    (sum, item) => sum + item.priceETB * item.quantity,
    0
  );

  return (
    <main className="form-page">
      <h1 className="form-title">Your Cart ({totalItems})</h1>

      {items.length === 0 ? (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <p className="empty-cart">Your cart is empty.</p>
          <Link href="/menu" className="cta" style={{ marginTop: "16px", display: "inline-block" }}>
            Browse Menu
          </Link>
        </div>
      ) : (
        <>
          <ul className="cart-list">
            {items.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <span className="cart-item-name">{item.nameEn}</span>
                  <span className="cart-item-price">
                    Br {item.priceETB.toFixed(2)} each
                  </span>
                </div>
                <div className="cart-item-controls">
                  <button className="qty-btn" onClick={() => removeFromCart(item.id)}>
                    -
                  </button>
                  <span className="qty-display">{item.quantity}</span>
                 <button className="qty-btn" onClick={() => addToCart(item)}type="button"> +
                  
                 </button>
                  <button className="delete-btn" onClick={() => deleteFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <span>Total:</span>
            <span>Br {totalPrice.toFixed(2)}</span>
          </div>

          <Link
            href="/checkout"
            className="form-submit"
            style={{ display: "block", textAlign: "center", textDecoration: "none" }}
          >
            Proceed to Checkout
          </Link>
        </>
      )}
    </main>
  );
}