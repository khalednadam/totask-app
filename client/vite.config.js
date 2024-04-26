import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const API_URL = `${env.VITE_SERVER_URL}`
  return {
    server: {
      host: true,
      proxy: {
        '/api': {
          target: API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    },
    plugins: [vue()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    optimizeDeps: {
      exclude: ["js-big-decimal"],
    },
  }
});

// ({
//   server: {
//     proxy: {
//       '/api': {
//         target: import.meta.env.VITE_SERVER_URL,
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       }
//     }
//   },
//   plugins: [vue()],
//   resolve: {
//     alias: {
//       "@": fileURLToPath(new URL("./src", import.meta.url)),
//     },
//   },
//   optimizeDeps: {
//     exclude: ["js-big-decimal"],
//   },
// });
