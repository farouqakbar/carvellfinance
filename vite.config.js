import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "/carvellfinance/",
  build: {
    outDir: "docs", // Build output ke folder /docs
  },
});
