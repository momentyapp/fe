import type { Route } from "./+types/feed";
import { Feed } from "../feed/feed";

export function meta({}: Route.MetaArgs) {
  return [{ title: "모먼티" }];
}

export default function Component() {
  return <Feed />;
}
