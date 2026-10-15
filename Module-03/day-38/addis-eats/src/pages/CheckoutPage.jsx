import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { checkoutSchema } from "../schemas/checkoutSchema";
import { useCartStore } from "../store/useCartStore";
import { formatPrice } from "../utils/currency";

function CheckoutPage() {
  const navigate = useNavigate();

  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const getTotalPrice = useCartStore((s) => s.getTotalPrice);

  const total = getTotalPrice();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 500));
    console.log("Order placed:", { customer: data, items, total });
    clearCart();
    navigate("/success");
  };

  if (items.length === 0) {
    return (
      <div className="form-page">
        <h2 className="form-title">Your cart is empty</h2>
        <p className="empty-cart">
          Add some Habesha food before checking out.
        </p>
      </div>
    );
  }

  return (
    <div className="form-page">
      <h2 className="form-title">Checkout</h2>
      <p className="checkout-total">
        Total: <strong>{formatPrice(total)}</strong>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="auth-form" noValidate>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" {...register("fullName")} />
          {errors.fullName && (
            <span className="form-error">{errors.fullName.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input type="tel" placeholder="0912345678" {...register("phone")} />
          {errors.phone && (
            <span className="form-error">{errors.phone.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>Address</label>
          <input type="text" {...register("address")} />
          {errors.address && (
            <span className="form-error">{errors.address.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>City</label>
          <input type="text" {...register("city")} />
          {errors.city && (
            <span className="form-error">{errors.city.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>Notes (optional)</label>
          <textarea rows="3" {...register("notes")} />
        </div>

        <button type="submit" disabled={isSubmitting} className="form-submit">
          {isSubmitting ? "Placing order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}

export default CheckoutPage;