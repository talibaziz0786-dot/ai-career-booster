import axios, {
  type CreateAxiosDefaults,
} from "axios";

const AUTH_STORAGE_KEY = "careerboost-auth";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL ??
  "http://localhost:5000";

/**
 * Reads the bearer token from the persisted auth store,
 * falling back to a standalone `token` entry.
 */
export function getAuthToken() {
  const authData = localStorage.getItem(
    AUTH_STORAGE_KEY
  );

  if (authData) {
    try {
      const parsed = JSON.parse(authData);

      const token = parsed.state?.token;

      if (token) {
        return token as string;
      }
    } catch {
      // Ignore malformed persisted state.
    }
  }

  return localStorage.getItem("token");
}

/**
 * Creates an axios instance that attaches the auth token to every request.
 */
export function createApiClient(
  basePath = "",
  config: CreateAxiosDefaults = {}
) {
  const client = axios.create({
    baseURL: `${API_BASE_URL}${basePath}`,
    ...config,
  });

  client.interceptors.request.use(
    (requestConfig) => {
      const token = getAuthToken();

      if (token) {
        requestConfig.headers.Authorization = `Bearer ${token}`;
      }

      return requestConfig;
    }
  );

  return client;
}
