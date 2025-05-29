import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests/e2e',
  testMatch: ['**/*.e2e.ts'],
  testIgnore: ['**/unit/**'],
  timeout: 30 * 1000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
  webServer: {
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer: !process.env.CI,
    timeout: 60 * 1000,
    env: {
      VITE_API_BASE_URL: 'http://localhost:3000'
    }
  }
});
