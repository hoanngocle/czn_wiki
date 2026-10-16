import { defineConfig } from "@playwright/test";

const devServer = process.env.PLAYWRIGHT_DEV_SERVER === "1";
const port = devServer ? 3000 : 3100;
const hostname = devServer ? "localhost" : "127.0.0.1";
const baseURL = `http://${hostname}:${port}`;

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "**/*.spec.ts",
  use: { baseURL, browserName: "chromium", locale: "en-US", timezoneId: "Asia/Saigon" },
  webServer: { command: `npm run ${devServer ? "dev" : "start"} -- --hostname ${hostname} --port ${port}`, url: baseURL, reuseExistingServer: devServer, timeout: 120_000 },
});
