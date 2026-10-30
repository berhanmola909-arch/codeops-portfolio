"use client";

import { useState } from "react";
import { useCart } from "@/app/context/CartContext";

export default function AddToCartButton({ dish }) {
  const { addToCart } = useCart();
  const [pending, setPending] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPending(true);
    addToCart(dish);
    setTimeout(() => setPending(false), 400);
  };

  return (
    <button
      className="add-btn"
      onClick={handleAdd}
      disabled={pending}
      style={{ opacity: pending ? 0.5 : 1 }}
    >
      {pending ? "Added!" : "Add to Cart"}
    </button>
  );
}