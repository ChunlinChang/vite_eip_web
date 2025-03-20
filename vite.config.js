import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: "./static",
  base: "/eip/", // 確保所有資源都從 /eip/ 讀取
  css: {
    postcss: {
      plugins: [tailwind()],
    },
  },
  define: {
    'process.env': process.env,
  },
  server: {
    proxy: {
      "/token": {
        target: "https://identityprovider.54ucl.com:1989",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
