import { orders } from "./orders.js";
import format, { withVat, total } from "./pricing.js";

const ordersWithTotal = orders.map(order => {
  const gross = total(order.items);
  const net = withVat(gross);
  return {
    ...order,
    total: net
  };
});

const highValueOrders = ordersWithTotal.filter(order => order.total > 500);

console.log("High Value Orders (> 500 ETB):");
highValueOrders.forEach(({ id, customer, total }) => {
  console.log(`Order #${id} - ${customer}: ${format(total)}`);
});

const grandTotal = ordersWithTotal.reduce((sum, order) => sum + order.total, 0);
console.log(`Grand Total: ${format(grandTotal)}`);