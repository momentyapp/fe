import { Links, Meta, Scripts, ScrollRestoration } from "react-router";

import { PreferenceProvider } from "~/contexts/preference";
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
          <main>{children}</main>
          <ScrollRestoration />
          <Scripts />
        </PreferenceProvider>
      </body>
    </html>
  );
}

export default App;
