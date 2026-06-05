import { useEffect } from "react";
import { useThemeStore } from "../../store/theme-store";

interface Props {
  children: React.ReactNode;
}

export default function ThemeProvider({
  children,
}: Props) {
  const theme =
    useThemeStore(
      (state) => state.theme
    );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add(
        "dark"
      );
    } else {
      document.documentElement.classList.remove(
        "dark"
      );
    }
  }, [theme]);

  return <>{children}</>;
}