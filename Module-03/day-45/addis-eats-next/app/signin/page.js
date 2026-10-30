import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import SignInForm from "./SignInForm";

function safeNext(raw) {
  if (typeof raw !== "string") return "/";
  if (!raw.startsWith("/")) return "/";
  if (raw.startsWith("//")) return "/";
  return raw;
}

export default async function SignInPage({ searchParams }) {
  const params = await searchParams;
  const next = safeNext(params?.next);

  const user = await getSession();
  if (user) redirect(next);

  return (
    <main className="form-page">
      <h1 className="form-title">Sign in</h1>
      <p className="form-help">
        Try <strong>almaz@example.com</strong> (staff) or{" "}
        <strong>addis@example.com</strong> (customer). Password for both:{" "}
        <strong>password123</strong>.
      </p>
      <SignInForm next={next} />
    </main>
  );
}