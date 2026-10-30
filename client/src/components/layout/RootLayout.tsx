import { Outlet } from "react-router-dom";
import PageTransition from "../animations/PageTransition";

export default function RootLayout() {
  return (
    <PageTransition>
      <Outlet />
    </PageTransition>
  );
}