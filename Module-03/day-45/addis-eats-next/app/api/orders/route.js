import { NextResponse } from "next/server";
import { orderSchema } from "@/lib/schema";
import { createOrder, getOrdersFor } from "@/lib/orders";
import { getSession } from "@/lib/session";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed JSON" }, { status: 400 });
  }

  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  const order = createOrder(parsed.data, user.id);
  return NextResponse.json(
    { id: order.id, status: order.status },
    { status: 201 }
  );
}

export async function GET() {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = getOrdersFor(user.id);
  return NextResponse.json({ status: "ok", data: orders });
}