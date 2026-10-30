import axios from "axios";

import type {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

/* ==========================================================
   API Configuration
========================================================== */

const API_URL =
  import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.warn(
    "VITE_API_URL is not configured."
  );
}

/* ==========================================================
   Axios Instance
========================================================== */

export const api = axios.create({
  baseURL: API_URL,

  /**
   * Required for HTTP-only refresh cookies.
   */
  withCredentials: true,

  timeout: 30_000,
});

/* ==========================================================
   Extended Request Config
========================================================== */

interface RetryRequestConfig
  extends AxiosRequestConfig {
  _retry?: boolean;
}

/* ==========================================================
   Stored Auth Shape
========================================================== */

interface StoredAuth {
  state?: {
    token?: unknown;
  };
}

/* ==========================================================
   Auth Storage Helpers
========================================================== */

function getStoredAuth(): StoredAuth | null {
  try {
    const stored =
      localStorage.getItem(
        "careerboost-auth"
      );

    if (!stored) {
      return null;
    }

    const parsed: unknown =
      JSON.parse(stored);

    if (
      !parsed ||
      typeof parsed !== "object"
    ) {
      return null;
    }

    return parsed as StoredAuth;
  } catch {
    return null;
  }
}

/* ==========================================================
   Access Token
========================================================== */

function getAccessToken(): string | null {
  const auth =
    getStoredAuth();

  const token =
    auth?.state?.token;

  if (
    typeof token !== "string" ||
    token.trim().length === 0
  ) {
    return null;
  }

  return token.trim();
}

/* ==========================================================
   Save Access Token
========================================================== */

function saveAccessToken(
  token: string
): void {
  if (
    typeof token !== "string" ||
    token.trim().length === 0
  ) {
    return;
  }

  try {
    const auth =
      getStoredAuth();

    if (!auth) {
      return;
    }

    if (
      !auth.state ||
      typeof auth.state !== "object"
    ) {
      auth.state = {};
    }

    auth.state.token =
      token.trim();

    localStorage.setItem(
      "careerboost-auth",
      JSON.stringify(auth)
    );
  } catch {
    /**
     * Storage failure should not
     * crash the application.
     */
  }
}

/* ==========================================================
   Clear Local Auth
========================================================== */

function clearAuth(): void {
  try {
    localStorage.removeItem(
      "careerboost-auth"
    );
  } catch {
    // Ignore storage errors.
  }
}

/* ==========================================================
   Request Interceptor
========================================================== */

api.interceptors.request.use(
  (
    config: InternalAxiosRequestConfig
  ) => {
    const token =
      getAccessToken();

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) =>
    Promise.reject(error)
);

/* ==========================================================
   Refresh Queue
========================================================== */

interface QueueItem {
  resolve: (
    token: string
  ) => void;

  reject: (
    error: unknown
  ) => void;
}

let isRefreshing = false;

let waitingQueue: QueueItem[] = [];

/* ==========================================================
   Process Queue
========================================================== */

function processQueue(
  error: unknown,
  token: string | null
): void {
  waitingQueue.forEach(
    ({
      resolve,
      reject,
    }) => {
      if (error) {
        reject(error);
        return;
      }

      if (!token) {
        reject(
          new Error(
            "Authentication refresh failed."
          )
        );

        return;
      }

      resolve(token);
    }
  );

  waitingQueue = [];
}

/* ==========================================================
   Refresh Access Token
========================================================== */

async function refreshAccessToken(): Promise<string> {
  if (!API_URL) {
    throw new Error(
      "VITE_API_URL is not configured."
    );
  }

  const response =
    await axios.post<{
      success: boolean;

      message?: string;

      token?: string;

      accessToken?: string;
    }>(
      `${API_URL}/api/auth/refresh`,
      {},
      {
        withCredentials: true,

        timeout: 30_000,
      }
    );

  const token =
    response.data.token ??
    response.data.accessToken;

  if (
    typeof token !== "string" ||
    token.trim().length === 0
  ) {
    throw new Error(
      response.data.message ??
        "Refresh response did not contain an access token."
    );
  }

  return token.trim();
}

/* ==========================================================
   Response Interceptor
========================================================== */

api.interceptors.response.use(
  (response) =>
    response,

  async (
    error: AxiosError
  ) => {
    const originalRequest =
      error.config as
        | RetryRequestConfig
        | undefined;

    /* ======================================================
       No Request Config
    ====================================================== */

    if (!originalRequest) {
      return Promise.reject(error);
    }

    /* ======================================================
       Only Handle 401
    ====================================================== */

    if (
      error.response?.status !== 401
    ) {
      return Promise.reject(error);
    }

    /* ======================================================
       Prevent Infinite Retry
    ====================================================== */

    if (
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    /* ======================================================
       Never Refresh Refresh Endpoint
    ====================================================== */

    const requestUrl =
      originalRequest.url ?? "";

    if (
      requestUrl.includes(
        "/api/auth/refresh"
      )
    ) {
      return Promise.reject(error);
    }

    /* ======================================================
       Mark Request As Retried
    ====================================================== */

    originalRequest._retry = true;

    /* ======================================================
       Another Refresh Is Already Running
    ====================================================== */

    if (isRefreshing) {
      return new Promise(
        (
          resolve,
          reject
        ) => {
          waitingQueue.push({
            resolve: (
              token
            ) => {
              originalRequest.headers = {
                ...originalRequest.headers,

                Authorization:
                  `Bearer ${token}`,
              };

              resolve(
                api(originalRequest)
              );
            },

            reject,
          });
        }
      );
    }

    /* ======================================================
       Start Refresh
    ====================================================== */

    isRefreshing = true;

    try {
      const newToken =
        await refreshAccessToken();

      /* ====================================================
         Save New Access Token
      ==================================================== */

      saveAccessToken(
        newToken
      );

      /* ====================================================
         Resolve Waiting Requests
      ==================================================== */

      processQueue(
        null,
        newToken
      );

      /* ====================================================
         Retry Original Request
      ==================================================== */

      originalRequest.headers = {
        ...originalRequest.headers,

        Authorization:
          `Bearer ${newToken}`,
      };

      return api(
        originalRequest
      );
    } catch (refreshError) {
      /* ====================================================
         Reject Waiting Requests
      ==================================================== */

      processQueue(
        refreshError,
        null
      );

      /* ====================================================
         Clear Authentication
      ==================================================== */

      clearAuth();

      /* ====================================================
         Redirect To Login
      ==================================================== */

      if (
        typeof window !==
          "undefined" &&
        window.location.pathname !==
          "/login"
      ) {
        window.location.replace(
          "/login"
        );
      }

      return Promise.reject(
        refreshError
      );
    } finally {
      isRefreshing = false;
    }
  }
);