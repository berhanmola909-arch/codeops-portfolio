"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

export default function CartBadge() {
  const { totalItems } = useCart();

  return (
    <Link href="/cart" className="site-link">
      Cart ({totalItems})
    </Link>
  );
}