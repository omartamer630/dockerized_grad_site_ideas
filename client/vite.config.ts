import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

export default defineConfig(({ mode }) => {
  const __filename = fileURLToPath(import.meta.url);
  const ___rootDir = path.dirname(__filename); // server

  const env = loadEnv(mode, path.resolve(___rootDir, "../"), "");

  return {
    plugins: [react()],
    build: {
      outDir: "dist",
      // Example of using environment variables
      base: env.VITE_BASE_URL || "/",
    },
    preview: {
      port: Number(env.VITE_PREVIEW_PORT) || 5411,
      proxy: {
        "/api": {
          target: `http://localhost:80`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    server: {
      port: Number(env.VITE_SERVER_PORT) || 5411,
      proxy: {
        "/api": {
          target: `http://localhost:80`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
