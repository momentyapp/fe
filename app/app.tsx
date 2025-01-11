import { useContext, useState, useEffect } from "react";
import { Outlet } from "react-router";
import { ThemeProvider, type DefaultTheme } from "styled-components";
import ReactModal from "react-modal";

import PreferenceContext from "~/contexts/preference";
import palette from "~/styles/palette";
import GlobalStyle from "~/styles/global";

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

  // 모달 기본 설정
  useEffect(() => {
    ReactModal.defaultStyles = {
      overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      content: {
        position: "fixed",
        left: 20,
        right: 20,
        bottom: 0,
        display: "flex",
        padding: "30px 0px",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "10px",
        borderRadius: "20px",
        background: theme.bg2,
      },
    };

    ReactModal.setAppElement("main");
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Outlet />
    </ThemeProvider>
  );
}
