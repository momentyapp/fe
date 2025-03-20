import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, type DefaultTheme } from "styled-components";
import { Links, Meta, Scripts, ScrollRestoration } from "react-router";

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

const queryClient = new QueryClient();

export function Layout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<DefaultTheme>(palette.dark);

  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <main>{children}</main>
          </ThemeProvider>
        </QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default App;
