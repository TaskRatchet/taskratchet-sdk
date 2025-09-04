import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      dts({
        insertTypesEntry: true,
      }),
    ],
    build: {
      lib: {
        entry: resolve(__dirname, "src/main.ts"),
        name: "TaskRatchetSdk",
        fileName: "taskratchet-sdk",
      },
    },
    define: {
      __API1_URL__: JSON.stringify(env.VITE_API1_URL),
      __API2_URL__: JSON.stringify(env.VITE_API2_URL),
    },
    test: {
      setupFiles: ["./vitest.setup.ts"],
      environment: "jsdom",
      clearMocks: true,
    },
  };
});
