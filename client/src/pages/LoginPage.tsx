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

import {
  loginSchema,
  type LoginInput,
} from "../validations/auth.schema";

import {
  getAccessToken,
  loginUser,
} from "../services/auth.service";

import {
  useAuthStore,
} from "../store/auth-store";

import AuthLayout from "../components/auth/AuthLayout";

/* ==========================================================
   Component
========================================================== */

export default function LoginPage() {
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
    useForm<LoginInput>({
      resolver:
        zodResolver(
          loginSchema
        ),

      mode: "onTouched",
    });

  /* ========================================================
     Submit
  ======================================================== */

  const onSubmit = async (
    data: LoginInput
  ) => {
    if (loading) {
      return;
    }

    try {
      setLoading(true);

      const response =
        await loginUser(
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
          "Login succeeded but no access token was returned."
        );
      }

      if (!response.user) {
        throw new Error(
          "Login succeeded but user information was not returned."
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
        "Login successful."
      );

      navigate(
        "/dashboard",
        {
          replace: true,
        }
      );
    } catch (error: unknown) {
      let message =
        "Login failed. Please try again.";

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
      title="Welcome Back"
      subtitle="Continue building your career"
    >
      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
        noValidate
        className="mt-8 space-y-4"
      >
        <Input
          type="email"
          placeholder="Email Address"
          autoComplete="email"
          {...register("email")}
          error={
            errors.email?.message
          }
        />

        <Input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
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
            ? "Signing In..."
            : "Login"}
        </button>
      </form>

      <div
        className="
          mt-5
          flex
          flex-col
          gap-3
          text-sm
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <Link
          to="/register"
          className="
            font-medium
            text-cyan-500
            transition
            hover:text-cyan-400
          "
        >
          Create account
        </Link>

        <button
          type="button"
          className="
            text-left
            font-medium
            text-cyan-500
            transition
            hover:text-cyan-400
            sm:text-right
          "
          onClick={() => {
            toast(
              "Password recovery will be available soon."
            );
          }}
        >
          Forgot Password?
        </button>
      </div>
    </AuthLayout>
  );
}