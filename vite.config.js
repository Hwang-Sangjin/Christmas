import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import restart from "vite-plugin-restart";
import glsl from "vite-plugin-glsl";
import tailwindcss from "tailwindcss";

// https://vite.dev/config/
export default defineConfig({
  publicDir: "../static/",

  plugins: [
    react(),
    restart({ restart: ["../static/**"] }), // Restart server on static file change
    glsl(), // Handle shader files
  ],
  resolve: {
    alias: {
      "@": "/src",
      "&": "/static",
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
