"use client";

import useSWR from "swr";
import CancelButton from "./CancelButton";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function OrderList({ initialOrders }) {
  // Polls every 5 seconds
  const { data, error } = useSWR("/api/orders", fetcher, {
    fallbackData: { data: initialOrders }, // SEEDING: no loading spinner!
    refreshInterval: 5000,
  });

  if (error) return <p className="form-error">Failed to load orders.</p>;

  const orders = data.data;

  if (orders.length === 0) {
    return <p className="empty-cart">No orders yet.</p>;
  }

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
          {order.status === "pending" && <CancelButton orderId={order.id} />}
        </li>
      ))}
    </ul>
  );
}