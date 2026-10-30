import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import OrderList from "./OrderList";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const user = await getSession();
  if (!user) redirect("/signin?next=/orders");

  return (
    <main className="form-page">
      <h1 className="form-title">Your Orders</h1>
      <OrderList />
    </main>
  );
}