import axios from "axios";

export const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {

    const authData =
      localStorage.getItem(
        "careerboost-auth"
      );

    if (authData) {

      const parsed =
        JSON.parse(authData);

      const token =
        parsed.state?.token;

      if (token) {

        config.headers.Authorization =
          `Bearer ${token}`;

      }
    }

    return config;
  }
);