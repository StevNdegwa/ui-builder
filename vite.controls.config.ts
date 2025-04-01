import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const builderComponentsName = "ui-builder-controls";

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
    lib: {
      entry: path.resolve(__dirname, "src/modules/controls/ui-controls.ts"),
      name: builderComponentsName,
      formats: ["es", "umd"],
      fileName: (format) => `${builderComponentsName}.${format}.js`,
    },
    outDir: path.resolve(__dirname, "controls-dist"),
  },
});
