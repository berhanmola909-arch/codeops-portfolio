import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { registerSchema } from "../schemas/authSchemas";
import { useAuthStore } from "../store/useAuthStore";

function RegisterPage() {
  const navigate = useNavigate();
  const registerUser = useAuthStore((s) => s.register);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 400));
    registerUser({ email: data.email, name: data.name });
    navigate("/");
  };

  return (
    <div className="form-page">
      <h2 className="form-title">Create Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form" noValidate>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" {...register("name")} />
          {errors.name && (
            <span className="form-error">{errors.name.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" {...register("email")} />
          {errors.email && (
            <span className="form-error">{errors.email.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" {...register("password")} />
          {errors.password && (
            <span className="form-error">{errors.password.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" {...register("confirmPassword")} />
          {errors.confirmPassword && (
            <span className="form-error">{errors.confirmPassword.message}</span>
          )}
        </div>

        <button type="submit" disabled={isSubmitting} className="form-submit">
          {isSubmitting ? "Creating..." : "Create Account"}
        </button>

        <p className="form-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;