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
  route("/login", "./routes/login.tsx"),
  route("/signup", "./pages/signup/index.tsx", [
    index("./pages/signup/form.tsx"),
    route("/signup/term", "./pages/signup/term.tsx"),
  ]),
] satisfies RouteConfig;
