import { RouterProvider } from "react-router-dom";

import { router } from "./routes";

import AuthInitializer
from "./components/providers/AuthInitializer";

export default function App() {
  return (
    <>
      <AuthInitializer />

      <RouterProvider
        router={router}
      />
    </>
  );
}