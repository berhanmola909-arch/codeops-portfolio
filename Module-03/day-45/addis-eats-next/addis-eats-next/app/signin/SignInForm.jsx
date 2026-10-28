"use client";

import { useActionState } from "react";
import { signIn } from "@/app/actions";

export default function SignInForm({ next }) {
  const [state, formAction, pending] = useActionState(signIn, null);

  return (
    <form action={formAction} className="auth-form">
      <input type="hidden" name="next" value={next} />

      <div className="form-group">
        <label>Email</label>
        <input name="email" type="email" required />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input name="password" type="password" required />
      </div>

      {state?.error && (
        <p className="form-error" role="alert">
          {state.error}
        </p>
      )}

      <button type="submit" disabled={pending} className="form-submit">
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}