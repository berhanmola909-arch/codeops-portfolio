"use client";

import { useCart } from "../context/CartContext";

export default function AddToCartButton({ dish }) {
  const { addToCart, totalItems } = useCart();

  return (
    <div className="cart-actions">
      <button className="add-btn" onClick={() => addToCart(dish)}>
        Add to Cart
      </button>
      <span className="cart-count">Cart: {totalItems}</span>
    </div>
  );
}