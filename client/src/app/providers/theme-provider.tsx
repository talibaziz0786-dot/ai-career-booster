import { useEffect } from "react";
import { useSettingsStore } from "../../store/settings-store";

interface Props {
  children: React.ReactNode;
}

export default function ThemeProvider({
  children,
}: Props) {
  const darkMode = useSettingsStore(
    (state) => state.settings.darkMode
  );

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      darkMode
    );
  }, [darkMode]);

  return <>{children}</>;
}