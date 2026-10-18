import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getAllOrders } from "@/lib/orders";

export const dynamic = "force-dynamic";

export default async function KitchenPage() {
  const user = await getSession();
  if (!user) redirect("/signin?next=/kitchen");
  if (user.role !== "staff") {
    return (
      <main className="form-page">
        <h1 className="form-title">Not allowed</h1>
        <p className="form-help">
          This area is for staff only. You are signed in as {user.role}.
        </p>
      </main>
    );
  }

  const orders = getAllOrders();

  return (
    <main className="form-page">
      <h1 className="form-title">Kitchen</h1>
      <p className="form-help">{orders.length} order(s) in the queue</p>

      {orders.length === 0 ? (
        <p className="empty-cart">No orders yet.</p>
      ) : (
        <ul className="cart-list">
          {orders.map((order) => (
            <li key={order.id} className="cart-item">
              <div className="cart-item-info">
                <span className="cart-item-name">
                  {order.id} — {order.status}
                </span>
                <span className="cart-item-price">
                  {order.fullName} | {order.phone} | {order.address},{" "}
                  {order.city}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}