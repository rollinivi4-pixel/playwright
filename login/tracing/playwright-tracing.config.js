/**
 * 🎭 PLAYWRIGHT TRACING CONFIGURATION
 * 
 * This is a dedicated configuration file for Playwright tracing examples.
 * Use this configuration to run tests with comprehensive tracing enabled.
 */

const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // Test directory
  testDir: './login/tracing',
  
  // Global test configuration
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  
  // Retry configuration
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter configuration
  reporter: [
    ['html', { 
      outputFolder: 'playwright-report',
      open: 'never' // Don't auto-open in CI
    }],
    ['json', { 
      outputFile: 'test-results.json' 
    }],
    ['junit', { 
      outputFile: 'test-results.xml' 
    }]
  ],
  
  // Global test configuration
  use: {
    // Tracing configuration
    trace: 'on-first-retry', // Trace on first retry (recommended)
    
    // Screenshot configuration
    screenshot: 'only-on-failure',
    
    // Video recording
    video: 'retain-on-failure',
    
    // Browser context options
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    
    // Action timeout
    actionTimeout: 10000,
    
    // Navigation timeout
    navigationTimeout: 30000,
  },
  
  // Project configurations
  projects: [
    {
      name: 'chromium-tracing',
      use: { 
        ...devices['Desktop Chrome'],
        // Override global tracing for this project
        trace: 'on' // Always trace for this project
      },
    },
    {
      name: 'firefox-tracing',
      use: { 
        ...devices['Desktop Firefox'],
        trace: 'retain-on-failure' // Only trace on failure
      },
    },
    {
      name: 'webkit-tracing',
      use: { 
        ...devices['Desktop Safari'],
        trace: 'on-first-retry' // Trace on first retry
      },
    },
    {
      name: 'mobile-tracing',
      use: { 
        ...devices['iPhone 12'],
        trace: 'on',
        // Mobile-specific options
        hasTouch: true,
        isMobile: true
      },
    }
  ],
  
  // Global setup and teardown
  globalSetup: require.resolve('./global-setup.js'),
  globalTeardown: require.resolve('./global-teardown.js'),
  
  // Web server configuration (if needed)
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  //   reuseExistingServer: !process.env.CI,
  // },
  
  // Output directory for traces
  outputDir: 'trace-files/',
  
  // Test match patterns
  testMatch: [
    '**/*.spec.js',
    '**/*.test.js'
  ],
  
  // Test ignore patterns
  testIgnore: [
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**'
  ],
  
  // Fully parallel
  fullyParallel: true,
  
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  
  // Retry on CI only
  retries: process.env.CI ? 2 : 0,
  
  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter to use
  reporter: process.env.CI ? 'github' : 'list',
  
  // Shared settings for all the projects below
  use: {
    // Base URL to use in actions like `await page.goto('/')`
    // baseURL: 'http://127.0.0.1:3000',
    
    // Collect trace when retrying the failed test
    trace: 'on-first-retry',
    
    // Take screenshot on failure
    screenshot: 'only-on-failure',
    
    // Record video on failure
    video: 'retain-on-failure',
  },
});
