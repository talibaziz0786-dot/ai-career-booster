import { Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import Input from "../components/ui/Input";

import {
  registerSchema,
type  RegisterInput,
} from "../validations/auth.schema";

import {
  registerUser,
} from "../services/auth.service";

import { useAuthSubmit } from "../hooks/useAuthSubmit";

export default function RegisterPage() {
  const { loading, onSubmit } =
    useAuthSubmit<RegisterInput>({
      request: registerUser,
      successMessage: "Account created",
      errorMessage: "Registration failed",
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver:
      zodResolver(
        registerSchema
      ),
  });

  return (
      <AuthLayout
  title="Create Account"
  subtitle="Start your career journey"
>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="mt-8 space-y-4"
        >
          <Input
            placeholder="Full Name"
            {...register("name")}
            error={
              errors.name
                ?.message
            }
          />

          <Input
            placeholder="Email"
            {...register("email")}
            error={
              errors.email
                ?.message
            }
          />

          <Input
            type="password"
            placeholder="Password"
            {...register(
              "password"
            )}
            error={
              errors.password
                ?.message
            }
          />

          <button
            type="submit"
            disabled={
              loading
            }
            className="w-full rounded-xl bg-cyan-500 py-3 text-white"
          >
            {loading
              ? "Creating..."
              : "Create Account"}
          </button>
        </form>
        <div className="mt-6 text-center">
  <span className="text-slate-500">
    Already have an account?
  </span>

  <Link
    to="/login"
    className="ml-2 text-cyan-500"
  >
    Login
  </Link>
</div>
</AuthLayout>
    
  );
}