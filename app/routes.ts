import {
  type RouteConfig,
  route,
  index,
  layout,
} from "@react-router/dev/routes";

export default [
  layout("./app.tsx", [
    index("./routes/feed.tsx"),
    route("/write", "./routes/write.tsx"),
  ]),
  route("/welcome", "./routes/welcome.tsx"),
  route("/login", "./routes/login.tsx")
] satisfies RouteConfig;
