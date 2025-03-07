import type { Route } from "./+types/feed";
import Login from "~/pages/login";

export function meta({}: Route.MetaArgs) {
  return [{ title: "모먼티" }];
}

export default function Component({}: Route.ComponentProps) {
  return <Login />;
}
