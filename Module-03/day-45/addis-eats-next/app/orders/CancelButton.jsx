"use client";

import { useTransition } from "react";
import { cancelOrder } from "@/app/actions";

export default function CancelButton({ orderId }) {
  const [pending, start] = useTransition();

  const handleClick = () => {
    start(async () => {
      try {
        await cancelOrder(orderId);
      } catch (err) {
        alert(err.message);
      }
    });
  };

  return (
    <button className="delete-btn" onClick={handleClick} disabled={pending}>
      {pending ? "Cancelling..." : "Cancel"}
    </button>
  );
}