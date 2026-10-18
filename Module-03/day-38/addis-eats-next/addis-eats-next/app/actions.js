"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { orderSchema } from "@/lib/schema";
import { createOrder, getOrder, markCancelled } from "@/lib/orders";
import {
  getSession,
  setSessionCookie,
  clearSessionCookie,
} from "@/lib/session";
import { findUserByEmail } from "@/lib/users";

function safeNext(raw) {
  if (typeof raw !== "string") return "/";
  if (!raw.startsWith("/")) return "/";
  if (raw.startsWith("//")) return "/";
  return raw;
}

export async function signIn(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const next = safeNext(formData.get("next"));

  const user = findUserByEmail(email);

  if (!user || user.password !== password) {
    return { ok: false, error: "Invalid email or password" };
  }

  await setSessionCookie(user.id);
  redirect(next);
}

export async function signOut() {
  await clearSessionCookie();
  redirect("/");
}

export async function placeOrder(prevState, formData) {
  const user = await getSession();
  if (!user) redirect("/signin?next=/checkout");

  const raw = {
    fullName: formData.get("fullName"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    city: formData.get("city"),
    notes: formData.get("notes") || undefined,
  };

  const parsed = orderSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const order = createOrder(parsed.data, user.id);
  revalidatePath("/orders");
  revalidatePath("/kitchen");

  return { ok: true, orderId: order.id };
}

export async function cancelOrder(orderId) {
  const user = await getSession();
  if (!user) throw new Error("Not signed in");

  const order = getOrder(orderId);
  if (!order) throw new Error("No such order");
  if (order.userId !== user.id) throw new Error("Not yours");

  markCancelled(orderId);
  revalidatePath("/orders");
  revalidatePath("/kitchen");

  return { ok: true };
}