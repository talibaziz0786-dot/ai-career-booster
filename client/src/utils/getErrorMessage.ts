import axios from "axios";

export function isUnauthorized(
  error: unknown
): boolean {
  return (
    axios.isAxiosError(error) &&
    error.response?.status === 401
  );
}

export function getErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again."
): string {
  if (axios.isAxiosError(error)) {
    const message =
      error.response?.data?.message;

    if (typeof message === "string" && message) {
      return message;
    }

    if (error.code === "ERR_NETWORK") {
      return "Network error. Please check your connection.";
    }

    return error.message || fallback;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}
