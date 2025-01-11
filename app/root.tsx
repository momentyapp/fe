import { useContext, useEffect, useState } from "react";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { ThemeProvider } from "styled-components";

import palette from "~/styles/palette";
import PreferenceContext, { PreferenceProvider } from "~/contexts/preferences";

import type { Palette } from "~/styles/palette";
import type { Route } from "./+types/root";

export const links: Route.LinksFunction = () => [
  {
    rel: "preconnect",
    href: "https://cdn.jsdelivr.net",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    as: "style",
    href: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css",
  },
  {
    rel: "stylesheet",
    href: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <PreferenceProvider>
          {children}
          <ScrollRestoration />
          <Scripts />
        </PreferenceProvider>
      </body>
    </html>
  );
}

export default function App() {
  const preference = useContext(PreferenceContext);
  const [theme, setTheme] = useState<Palette>(
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
      <Outlet />;
    </ThemeProvider>
  );
}
