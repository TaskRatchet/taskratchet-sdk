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
      __FIREBASE_API_KEY__: JSON.stringify(env.VITE_FIREBASE_API_KEY),
      __FIREBASE_AUTH_DOMAIN__: JSON.stringify(env.VITE_FIREBASE_AUTH_DOMAIN),
      __FIREBASE_DATABASE_URL__: JSON.stringify(env.VITE_FIREBASE_DATABASE_URL),
      __FIREBASE_PROJECT_ID__: JSON.stringify(env.VITE_FIREBASE_PROJECT_ID),
      __FIREBASE_STORAGE_BUCKET__: JSON.stringify(
        env.VITE_FIREBASE_STORAGE_BUCKET
      ),
      __FIREBASE_MESSAGING_SENDER_ID__: JSON.stringify(
        env.VITE_FIREBASE_MESSAGING_SENDER_ID
      ),
      __FIREBASE_APP_ID__: JSON.stringify(env.VITE_FIREBASE_APP_ID),
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
