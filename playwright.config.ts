import { defineConfig, devices } from '@playwright/test';

const externalBaseURL = process.env.BASE_URL;

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: [['list']],
  use: {
    baseURL: externalBaseURL || 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
    viewport: { width: 1440, height: 900 },
    actionTimeout: 5000,
    navigationTimeout: 10000
  },
  projects: [
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Chrome'], channel: process.env.PLAYWRIGHT_CHANNEL || 'msedge' }
    }
  ],
  webServer: externalBaseURL ? undefined : {
    command: 'node tools/server.mjs',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: true,
    timeout: 10000
  }
});
