import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getAllOrdersForDashboard } from "@/lib/orders";
import RevenueChart from "./RevenueChart";
import { etb, when } from "@/lib/format";

export default async function DashboardPage() {
  const user = await getSession();

  // 1. If not signed in, redirect to login
  if (!user) redirect("/signin?next=/dashboard");

  // 2. If signed in but NOT staff, show an error message
  if (user.role !== "staff") {
    return (
      <main className="form-page">
        <h1 className="form-title">Not allowed</h1>
        <p className="form-help">
          This area is for staff only. You are signed in as a customer.
        </p>
      </main>
    );
  }

  // 3. If they are staff, show the dashboard
  const { orders, chartData } = getAllOrdersForDashboard();

  return (
    <main className="form-page" style={{ maxWidth: "800px" }}>
      <h1 className="form-title">Staff Dashboard</h1>

      <h2 style={{ color: "#ff6b6b", marginBottom: "16px" }}>
        Revenue by City
      </h2>
      <div style={{ height: "300px", marginBottom: "40px" }}>
        <RevenueChart data={chartData} />
      </div>

      <h2 style={{ color: "#ff6b6b", marginBottom: "16px" }}>All Orders</h2>

      {orders.length === 0 ? (
        <p className="empty-cart">No orders yet.</p>
      ) : (
        <table
          style={{
            width: "100%",
            textAlign: "left",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{ borderBottom: "2px solid #cc0000", color: "#ffd700" }}
            >
              <th style={{ padding: "8px" }}>Order ID</th>
              <th style={{ padding: "8px" }}>Customer</th>
              <th style={{ padding: "8px" }}>Date</th>
              <th style={{ padding: "8px", textAlign: "right" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} style={{ borderBottom: "1px solid #4a0000" }}>
                <td style={{ padding: "8px" }}>{o.id}</td>
                <td style={{ padding: "8px" }}>{o.fullName}</td>
                <td style={{ padding: "8px" }}>
                  {when.format(new Date(o.createdAt))}
                </td>
                <td style={{ padding: "8px", textAlign: "right" }}>
                  {etb.format(100)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}