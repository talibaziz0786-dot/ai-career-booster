import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import Input from "../components/ui/Input";

import AuthLayout from "../components/auth/AuthLayout";

import {
  registerSchema,
  type RegisterInput,
} from "../validations/auth.schema";

import {
  getAccessToken,
  registerUser,
} from "../services/auth.service";

import {
  useAuthStore,
} from "../store/auth-store";

/* ==========================================================
   Component
========================================================== */

export default function RegisterPage() {
  const navigate =
    useNavigate();

  const login =
    useAuthStore(
      (state) => state.login
    );

  const [loading, setLoading] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } =
    useForm<RegisterInput>({
      resolver:
        zodResolver(
          registerSchema
        ),

      mode: "onTouched",
    });

  /* ========================================================
     Submit
  ======================================================== */

  const onSubmit = async (
    data: RegisterInput
  ) => {
    if (loading) {
      return;
    }

    try {
      setLoading(true);

      const response =
        await registerUser(
          data
        );

      /* ====================================================
         Validate Authentication Response
      ==================================================== */

      const token =
        getAccessToken(
          response
        );

      if (!token) {
        throw new Error(
          "Registration succeeded but no access token was returned."
        );
      }

      if (!response.user) {
        throw new Error(
          "Registration succeeded but user information was not returned."
        );
      }

      /* ====================================================
         Update Auth Store
      ==================================================== */

      login(
        response.user,
        token
      );

      /* ====================================================
         Success
      ==================================================== */

      toast.success(
        "Account created successfully."
      );

      navigate(
        "/dashboard",
        {
          replace: true,
        }
      );
    } catch (error: unknown) {
      let message =
        "Registration failed. Please try again.";

      if (
        error &&
        typeof error === "object" &&
        "response" in error
      ) {
        const response =
          (
            error as {
              response?: {
                data?: {
                  message?: unknown;
                };
              };
            }
          ).response;

        const serverMessage =
          response?.data?.message;

        if (
          typeof serverMessage ===
          "string" &&
          serverMessage.trim()
        ) {
          message =
            serverMessage;
        }
      } else if (
        error instanceof Error &&
        error.message.trim()
      ) {
        message =
          error.message;
      }

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  /* ========================================================
     Render
  ======================================================== */

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start your career journey"
    >
      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
        noValidate
        className="mt-8 space-y-4"
      >
        <Input
          type="text"
          placeholder="Full Name"
          autoComplete="name"
          {...register("name")}
          error={
            errors.name?.message
          }
        />

        <Input
          type="email"
          placeholder="Email"
          autoComplete="email"
          {...register("email")}
          error={
            errors.email?.message
          }
        />

        <Input
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          {...register("password")}
          error={
            errors.password?.message
          }
        />

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            min-h-12
            rounded-xl
            bg-cyan-500
            px-4
            py-3
            font-semibold
            text-white
            transition
            hover:bg-cyan-400
            focus:outline-none
            focus:ring-2
            focus:ring-cyan-500
            focus:ring-offset-2
            disabled:cursor-not-allowed
            disabled:opacity-60
            dark:focus:ring-offset-slate-950
          "
        >
          {loading
            ? "Creating..."
            : "Create Account"}
        </button>
      </form>

      <div
        className="
          mt-6
          text-center
          text-sm
        "
      >
        <span className="text-slate-500 dark:text-slate-400">
          Already have an account?
        </span>

        <Link
          to="/login"
          className="
            ml-2
            font-medium
            text-cyan-500
            transition
            hover:text-cyan-400
          "
        >
          Login
        </Link>
      </div>
    </AuthLayout>
  );
}