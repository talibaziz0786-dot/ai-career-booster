import { AxiosError } from "axios";
import toast from "react-hot-toast";

export interface InterviewError {
  title: string;
  message: string;
}

export function getInterviewError(
  error: unknown
): InterviewError {
  if (error instanceof AxiosError) {
    const status =
      error.response?.status;

    switch (status) {
      case 400:
        return {
          title: "Invalid Request",
          message:
            "Please check the interview data.",
        };

      case 401:
        return {
          title: "Session Expired",
          message:
            "Please login again.",
        };

      case 403:
        return {
          title: "Upgrade Required",
          message:
            "This feature requires Pro.",
        };

      case 404:
        return {
          title: "Not Found",
          message:
            "Requested interview resource not found.",
        };

      case 429:
        return {
          title: "Too Many Requests",
          message:
            "Please wait before generating another question.",
        };

      case 500:
        return {
          title: "Server Error",
          message:
            "AI service is temporarily unavailable.",
        };

      default:
        return {
          title: "Request Failed",
          message:
            error.message,
        };
    }
  }

  if (error instanceof Error) {
    return {
      title: "Unexpected Error",
      message: error.message,
    };
  }

  return {
    title: "Unknown Error",
    message:
      "Something went wrong.",
  };
}

export function showInterviewError(
  error: unknown
) {
  const parsed =
    getInterviewError(error);

  toast.error(
    `${parsed.title}\n${parsed.message}`
  );

  console.error(parsed);
}