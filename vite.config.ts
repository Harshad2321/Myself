import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Relative base so the built site also works from a subpath (e.g. GitHub Pages project sites).
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
});
