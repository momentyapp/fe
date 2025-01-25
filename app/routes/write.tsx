import type { Route } from "./+types/write";
import Write from "~/pages/write";

export function meta({}: Route.MetaArgs) {
  return [{ title: "모먼티" }];
}

export default function Component({}: Route.ComponentProps) {
  return <Write />;
}
