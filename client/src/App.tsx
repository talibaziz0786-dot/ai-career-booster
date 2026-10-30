import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { router } from "./routes";
import AuthInitializer from "./components/providers/AuthInitializer";
import CustomCursor from "./components/ui/CustomCursor";

export default function App() {
  return (
    <>
      <CustomCursor />
      <AuthInitializer />
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3500,
          style: {
            borderRadius: "12px",
          },
        }}
      />
    </>
  );
}
