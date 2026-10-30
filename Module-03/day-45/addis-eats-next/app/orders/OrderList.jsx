"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("my_orders") || "[]");
    setOrders(saved);
    setLoading(false);

    const handleStorage = () => {
      setOrders(JSON.parse(localStorage.getItem("my_orders") || "[]"));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  if (loading) return <p className="form-help">Loading orders...</p>;

  if (orders.length === 0) {
    return <p className="empty-cart">No orders yet.</p>;
  }

  const cancelOrder = (id) => {
    const updated = orders.map((o) =>
      o.id === id ? { ...o, status: "cancelled" } : o
    );
    setOrders(updated);
    localStorage.setItem("my_orders", JSON.stringify(updated));
  };

  return (
    <ul className="cart-list">
      {orders.map((order) => (
        <li key={order.id} className="cart-item">
          <div className="cart-item-info">
            <span className="cart-item-name">
              {order.id} — <strong>{order.status.toUpperCase()}</strong>
            </span>
            <span className="cart-item-price">
              {order.fullName}, {order.city}
            </span>
          </div>

          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <Link
              href={`/track/${order.id}`}
              className="delete-btn"
              style={{
                color: "#ffd700",
                borderColor: "#ffd700",
                textDecoration: "none",
              }}
            >
              Track
            </Link>
            {order.status === "pending" && (
              <button
                className="delete-btn"
                onClick={() => cancelOrder(order.id)}
              >
                Cancel
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}