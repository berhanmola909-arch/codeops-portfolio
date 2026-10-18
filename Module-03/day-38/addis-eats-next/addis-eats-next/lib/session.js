import { cookies } from "next/headers";
import { findUserById } from "./users";

export async function getSession() {
  const store = await cookies();
  const userId = store.get("session")?.value;
  if (!userId) return null;

  const user = findUserById(userId);
  if (!user) return null;

  return { id: user.id, name: user.name, role: user.role, email: user.email };
}

export async function setSessionCookie(userId) {
  const store = await cookies();
  store.set("session", userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.delete("session");
}