import type { Route } from "./+types/feed";
import Welcome from "~/pages/welcome";

export function meta({}: Route.MetaArgs) {
  return [{ title: "모먼티" }];
}

export default function Component({}: Route.ComponentProps) {
  return <Welcome />;
}
