import { defineConfig } from "vite";
import postcss from "./postcss.config.js";
import react from "@vitejs/plugin-react";
import NodeGlobalsPolyfillPlugin from "@esbuild-plugins/node-globals-polyfill";
import inject from "@rollup/plugin-inject";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env": process.env,
  },
  css: {
    postcss,
  },
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
  commonjsOptions: {
    transformMixedEsModules: true,
  },
  resolve: {
    mainFields: ["browser", "module", "main"],
    alias: [
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, "");
        },
      },
    ],
  },
  build: {
    css: {
      postcss,
    },
    rollupOptions: {
      plugins: [inject({ Buffer: ["buffer", "Buffer"] })],
      define: {
        process: { env: {} },
      },
      // optimizeDeps: {
      //   esbuildOptions: {
      //     // Node.js global to browser globalThis
      //     define: {
      //       global: "globalThis",
      //     },
      //   },
      // },
    },
    resolve: {
      mainFields: ["browser", "module", "main"],
      alias: [
        {
          find: /^~.+/,
          replacement: (val) => {
            return val.replace(/^~/, "");
          },
        },
      ],
    },
  },
});
