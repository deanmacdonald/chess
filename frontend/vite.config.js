import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // REQUIRED for Vercel static hosting
  // Prevents broken absolute paths like /assets/... in production
  base: "",

  server: {
    port: 5173,
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },

  build: {
    sourcemap: false,
    outDir: "dist",
    emptyOutDir: true,
  },
});
