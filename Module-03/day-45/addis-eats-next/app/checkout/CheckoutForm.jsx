"use client";

import { useActionState, useEffect } from "react";
import { placeOrder } from "@/app/actions";
import { useCart } from "@/app/context/CartContext";

export default function CheckoutForm() {
  const [state, formAction, pending] = useActionState(placeOrder, null);
  const { clearCart } = useCart();

  useEffect(() => {
    if (state?.ok && state.orderData) {
      const existing = JSON.parse(localStorage.getItem("my_orders") || "[]");
      localStorage.setItem(
        "my_orders",
        JSON.stringify([state.orderData, ...existing])
      );
      clearCart();
    }
  }, [state, clearCart]);

  return (
    <form action={formAction} className="auth-form" noValidate>
      <div className="form-group">
        <label>Full Name</label>
        <input name="fullName" type="text" />
        {state?.fieldErrors?.fullName && (
          <span className="form-error">{state.fieldErrors.fullName[0]}</span>
        )}
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input name="phone" type="tel" placeholder="0912345678" />
        {state?.fieldErrors?.phone && (
          <span className="form-error" role="alert">
            {state.fieldErrors.phone[0]}
          </span>
        )}
      </div>

      <div className="form-group">
        <label>Address</label>
        <input name="address" type="text" />
        {state?.fieldErrors?.address && (
          <span className="form-error">{state.fieldErrors.address[0]}</span>
        )}
      </div>

      <div className="form-group">
        <label>City</label>
        <input name="city" type="text" />
        {state?.fieldErrors?.city && (
          <span className="form-error">{state.fieldErrors.city[0]}</span>
        )}
      </div>

      <div className="form-group">
        <label>Notes (optional)</label>
        <textarea name="notes" rows="3" />
      </div>

      <button type="submit" disabled={pending} className="form-submit">
        {pending ? "Placing order..." : "Place Order"}
      </button>

      {state?.ok && (
        <p className="form-success">
          Order placed! Reference: <strong>{state.orderId}</strong>. Go to
          Orders to track it.
        </p>
      )}
    </form>
  );
}