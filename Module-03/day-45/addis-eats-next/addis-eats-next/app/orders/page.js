import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getOrdersFor } from "@/lib/orders";
import OrderList from "./OrderList";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const user = await getSession();
  if (!user) redirect("/signin?next=/orders");

  // 1. Fetch initial data on the server (Seeding)
  const initialOrders = getOrdersFor(user.id);

  return (
    <main className="form-page">
      <h1 className="form-title">Your Orders</h1>
      {/* 2. Pass to client component to handle polling */}
      <OrderList initialOrders={initialOrders} />
    </main>
  );
}