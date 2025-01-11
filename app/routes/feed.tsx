import type { Route } from "./+types/feed";
import Feed from "~/pages/feed";

export function meta({}: Route.MetaArgs) {
  return [{ title: "모먼티" }];
}

export default function Component({}: Route.ComponentProps) {
  return <Feed />;
}
