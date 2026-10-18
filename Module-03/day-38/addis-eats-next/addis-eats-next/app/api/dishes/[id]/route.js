import { NextResponse } from "next/server";
import { getDishById } from "@/lib/dishes";

export async function GET(request, { params }) {
  const { id } = await params;
  const dish = await getDishById(id);

  if (!dish) {
    return NextResponse.json({ error: "No such dish" }, { status: 404 });
  }

  return NextResponse.json({ status: "ok", data: dish });
}