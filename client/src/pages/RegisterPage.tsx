import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import toast from "react-hot-toast";

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

import {
  useAuthStore,
} from "../store/auth-store";

export default function RegisterPage() {
  const navigate = useNavigate();

  const login =
    useAuthStore(
      (state) => state.login
    );

  const [loading, setLoading] =
    useState(false);

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

  const onSubmit = async (
    data: RegisterInput
  ) => {
    try {
      setLoading(true);

      const response =
        await registerUser(
          data
        );

      login(
        response.user,
        response.token
      );

      toast.success(
        "Account created"
      );

      navigate(
        "/dashboard"
      );
    } catch (error: any) {
      toast.error(
        error?.response?.data
          ?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

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