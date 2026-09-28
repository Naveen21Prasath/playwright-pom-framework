import path from "path";
import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, ".env") });

const isCI = !!process.env.CI;
const bddTestDir = defineBddConfig({
  features: "features/**/*.feature",
  steps: ["steps/**/*.ts", "src/fixtures/test.ts"],
  outputDir: ".features-gen",
  importTestFrom: "src/fixtures/test.ts",
  disableWarnings: { importTestFrom: true },
});

export default defineConfig({
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: isCI ? 2 : undefined,
  timeout: 30_000,
  reporter: [
    ["list"],
    ["html", { open: "never" }],
    ["allure-playwright"],
  ],
  use: {
    baseURL: process.env.BASE_URL ?? "https://www.saucedemo.com",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      testDir: "./tests",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "bdd",
      testDir: bddTestDir,
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
