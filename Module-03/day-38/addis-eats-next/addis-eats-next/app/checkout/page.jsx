import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import CheckoutForm from "./CheckoutForm";

export default async function CheckoutPage() {
  const user = await getSession();
  if (!user) redirect("/signin?next=/checkout");

  return (
    <main className="form-page">
      <h1 className="form-title">Checkout</h1>
      <p className="form-help">Signed in as {user.name}</p>
      <CheckoutForm />
    </main>
  );
}