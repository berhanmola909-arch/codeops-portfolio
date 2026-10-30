if (!globalThis._ordersStore) {
  globalThis._ordersStore = new Map();
}

const orders = globalThis._ordersStore;

export function createOrder(data, userId) {
  const id = "ord_" + Math.random().toString(36).slice(2, 8);
  const order = {
    id,
    userId,
    ...data,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  orders.set(id, order);
  return order;
}

export function getOrder(id) {
  return orders.get(id) || null;
}

export function getOrdersFor(userId) {
  return [...orders.values()]
    .filter((o) => o.userId === userId)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function getAllOrders() {
  return [...orders.values()].sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1
  );
}

export function markCancelled(id) {
  const o = orders.get(id);
  if (!o) return null;
  o.status = "cancelled";
  orders.set(id, o);
  return o;
}

export function getAllOrdersForDashboard() {
  const all = [...orders.values()];

  const byCity = {};
  all.forEach((o) => {
    byCity[o.city] = (byCity[o.city] || 0) + 100;
  });

  const chartData = Object.keys(byCity).map((city) => ({
    city,
    revenue: byCity[city],
  }));

  return { orders: all, chartData };
}