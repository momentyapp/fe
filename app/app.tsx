import { useContext, useState, useEffect } from "react";
import { Outlet } from "react-router";
import { ThemeProvider, type DefaultTheme } from "styled-components";

import PreferenceContext from "~/contexts/preference";
import palette from "~/styles/palette";

export default function App() {
  const preference = useContext(PreferenceContext);
  const [theme, setTheme] = useState<DefaultTheme>(
    preference.theme === "dark" ? palette.dark : palette.light
  );

  // 테마가 디바이스 설정에 따라 변경되도록 설정
  useEffect(() => {
    if (preference.theme !== "device") return;

    const match = window.matchMedia("(prefers-color-scheme: dark)");

    const eventListener = (e: MediaQueryListEvent) =>
      setTheme(e.matches ? palette.dark : palette.light);
    match.addEventListener("change", eventListener);

    return () => match.removeEventListener("change", eventListener);
  }, [preference.theme]);

  return (
    <ThemeProvider theme={theme}>
      <Outlet />
    </ThemeProvider>
  );
}
