import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    reactRouter(),
    tsconfigPaths(),
    svgr({ svgrOptions: { icon: true } }),
  ],
  server: {
    host: "localhost",
    allowedHosts: ["momenty.kr"],
    port: 7070,
    strictPort: true,
    hmr: {
      host: "momenty.kr",
      protocol: "wss"
    }
  },
  publicDir: "app/public",
});
