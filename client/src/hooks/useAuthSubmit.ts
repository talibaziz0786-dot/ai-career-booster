import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuthStore } from "../store/auth-store";

interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };

  token: string;
}

interface Options<TInput> {
  request: (
    data: TInput
  ) => Promise<AuthResponse>;

  successMessage: string;

  errorMessage: string;

  redirectTo?: string;
}

/**
 * Shared submit flow for the login and register forms:
 * calls the auth endpoint, stores the session and reports the outcome.
 */
export function useAuthSubmit<TInput>({
  request,
  successMessage,
  errorMessage,
  redirectTo = "/dashboard",
}: Options<TInput>) {
  const navigate = useNavigate();

  const login = useAuthStore(
    (state) => state.login
  );

  const [loading, setLoading] =
    useState(false);

  const onSubmit = async (data: TInput) => {
    try {
      setLoading(true);

      const response = await request(data);

      login(response.user, response.token);

      toast.success(successMessage);

      navigate(redirectTo);
    } catch (error) {
      const message = (
        error as {
          response?: {
            data?: { message?: string };
          };
        }
      )?.response?.data?.message;

      toast.error(message || errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    onSubmit,
  };
}
