import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@ui": path.resolve(__dirname, "src/ui"),
      "@modules": path.resolve(__dirname, "src/modules"),
      "@app": path.resolve(__dirname, "src/app"),
      "@media": path.resolve(__dirname, "src/media"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "app-dist"),
  },
});
