import { NextResponse } from "next/server";
import { getAllDishes } from "@/lib/dishes";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.toLowerCase();

    let dishes = await getAllDishes();

    if (q) {
      dishes = dishes.filter(
        (d) =>
          d.nameEn.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({ status: "ok", data: dishes });
  } catch (err) {
    return NextResponse.json(
      { error: "Could not load dishes" },
      { status: 500 }
    );
  }
}