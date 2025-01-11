import { type RouteConfig, route, index, layout } from "@react-router/dev/routes";

export default [layout("./app.tsx", [
    index("./routes/feed.tsx"),
])] satisfies RouteConfig;
