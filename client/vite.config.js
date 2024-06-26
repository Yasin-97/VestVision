import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: "globalThis",
    "process.env": {},
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "esnext",
      define: {
        global: "globalThis",
      },
      supported: {
        bigint: true,
      },
    },
  },
  build: {
    target: ["esnext"],
    rollupOptions: {
      external: [
        "@safe-globalThis/safe-ethers-adapters",
        "@safe-globalThis/safe-core-sdk",
        "@safe-globalThis/safe-ethers-lib",
      ],
    },
  },
});
