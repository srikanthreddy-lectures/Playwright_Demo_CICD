import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: 'tests',
  reporter: [ 
    ['html', { open: 'never' }],
    ['junit', {outputFile: 'results.xml'}] //required for Azure DevOps Pipeline
  ],
  use: {
    actionTimeout: 60 * 1000,
    navigationTimeout: 30 * 1000,
    trace: 'on',
    screenshot: 'only-on-failure',
    headless: true,
    viewport: { width: 1900, height: 940 },
    launchOptions: {
        slowMo: 500,
    },
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
