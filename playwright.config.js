import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: 'tests',
  use: {
    video: {
      mode: 'off',
      size: { width: 640, height: 480 }
    }
  },
  // Configure projects for major browsers.
  projects: [
      {
        name: 'Development',
        use: {
          baseURL: 'http://144.24.129.185:3002/',
        },
      },
  ],
});