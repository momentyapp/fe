import {  useState, useEffect } from "react";
import { Links, Meta, Scripts, ScrollRestoration } from "react-router";
import { ThemeProvider, type DefaultTheme } from "styled-components";
import ReactModal from "react-modal";
import "react-photo-view/dist/react-photo-view.css";

import { CacheProvider } from "~/contexts/cache";

import GlobalStyle from "~/styles/global";
import palette from "~/styles/palette";

import App from "./app";

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
    type: "text/css",
    href: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css",
  },
  {
    rel: "stylesheet",
    type: "text/css",
    href: "https://cdn.jsdelivr.net/gh/toss/tossface/dist/tossface.css",
  },
  {
    rel: "icon",
    type: "image/png",
    href: "/favicon.png",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<DefaultTheme>(palette.dark);

  // 모달 기본 설정
  useEffect(() => {
    ReactModal.setAppElement("main");
    ReactModal.defaultStyles = {
      content: {
        background: theme.bg2,
      },
    };
  }, [theme]);

  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CacheProvider>
            <GlobalStyle />
            <main>{children}</main>
          </CacheProvider>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default App;
