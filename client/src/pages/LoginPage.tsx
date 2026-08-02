import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import Input from "../components/ui/Input";

import {
  loginSchema,
 type LoginInput,
} from "../validations/auth.schema";

import {
  loginUser,
} from "../services/auth.service";

import { useAuthSubmit } from "../hooks/useAuthSubmit";

import AuthLayout from "../components/auth/AuthLayout";
import { Link } from "react-router-dom";



export default function LoginPage() {
  const { loading, onSubmit } =
    useAuthSubmit<LoginInput>({
      request: loginUser,
      successMessage: "Login successful",
      errorMessage: "Login failed",
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver:
      zodResolver(
        loginSchema
      ),
  });

  return (
 <AuthLayout
  title="Welcome Back"
  subtitle="Continue building your career"
>

   <form
  onSubmit={handleSubmit(onSubmit)}
  className="mt-8 space-y-4"
>
  <Input
    placeholder="Email Address"
    {...register("email")}
    error={errors.email?.message}
  />

  <Input
    type="password"
    placeholder="Password"
    {...register("password")}
    error={errors.password?.message}
  />

  <button
    type="submit"
    disabled={loading}
    className="
    w-full
    rounded-xl
    bg-cyan-500
    py-3
    font-semibold
    text-white
    hover:bg-cyan-400
    transition
    "
  >
    {loading ? "Signing In..." : "Login"}
  </button>
</form>

    <div className="mt-5 flex justify-between">
      <Link
        to="/register"
        className="text-cyan-500"
      >
        Create account
      </Link>

      <button
        type="button"
        className="text-cyan-500"
      >
        Forgot Password?
      </button>
    </div>

  </AuthLayout>
);
}