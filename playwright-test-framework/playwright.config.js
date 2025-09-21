/**
 * Playwright Configuration
 * 
 * This configuration file sets up Playwright for the test framework.
 * It includes browser settings, test options, and reporting configuration.
 */

import { defineConfig, devices } from '@playwright/test';

// Load environment configuration
const environment = process.env.ENVIRONMENT || 'development';
const config = require('./config/environments.json')[environment] || require('./config/environments.json').development;

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Test directory
  testDir: './tests',
  
  // Global test timeout
  timeout: config.timeout || 30000,
  
  // Expect timeout for assertions
  expect: {
    timeout: 10000
  },
  
  // Test failure retry configuration
  retries: config.retries || 1,
  
  // Number of workers for parallel execution
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter configuration
  reporter: [
    ['html', { 
      outputFolder: 'playwright-report',
      open: 'never'
    }],
    ['json', { 
      outputFile: 'test-results/results.json'
    }],
    ['junit', { 
      outputFile: 'test-results/results.xml'
    }],
    ['list']
  ],
  
  // Global test configuration
  use: {
    // Base URL for all tests
    baseURL: config.baseUrl,
    
    // Browser context options
    headless: config.headless !== undefined ? config.headless : true,
    
    // Viewport size
    viewport: { width: 1280, height: 720 },
    
    // Ignore HTTPS errors
    ignoreHTTPSErrors: true,
    
    // Action timeout
    actionTimeout: 10000,
    
    // Navigation timeout
    navigationTimeout: config.timeout || 30000,
    
    // Screenshot configuration
    screenshot: config.screenshot || 'only-on-failure',
    
    // Video configuration
    video: config.video || 'retain-on-failure',
    
    // Trace configuration
    trace: config.trace || 'retain-on-failure',
    
    // Slow motion for debugging
    launchOptions: {
      slowMo: config.slowMo || 0
    }
  },

  // Project configuration for different browsers
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        headless: config.headless !== undefined ? config.headless : true
      },
    },

    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        headless: config.headless !== undefined ? config.headless : true
      },
    },

    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        headless: config.headless !== undefined ? config.headless : true
      },
    },

    // Mobile testing
    {
      name: 'Mobile Chrome',
      use: { 
        ...devices['Pixel 5'],
        headless: config.headless !== undefined ? config.headless : true
      },
    },

    {
      name: 'Mobile Safari',
      use: { 
        ...devices['iPhone 12'],
        headless: config.headless !== undefined ? config.headless : true
      },
    },

    // Tablet testing
    {
      name: 'iPad',
      use: { 
        ...devices['iPad Pro'],
        headless: config.headless !== undefined ? config.headless : true
      },
    }
  ],

  // Web server configuration (if needed)
  webServer: process.env.START_SERVER ? {
    command: 'npm run start',
    url: config.baseUrl,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  } : undefined,

  // Global setup and teardown
  globalSetup: require.resolve('./src/fixtures/global-setup.js'),
  globalTeardown: require.resolve('./src/fixtures/global-teardown.js'),

  // Test output directory
  outputDir: 'test-results/',

  // Maximum number of test failures
  maxFailures: process.env.CI ? 10 : undefined,

  // Test match patterns
  testMatch: [
    '**/tests/**/*.spec.js',
    '**/tests/**/*.test.js'
  ],

  // Test ignore patterns
  testIgnore: [
    '**/node_modules/**',
    '**/test-results/**',
    '**/playwright-report/**'
  ],

  // Fully parallel mode
  fullyParallel: true,

  // Forbid only mode
  forbidOnly: !!process.env.CI,

  // Global test timeout
  globalTimeout: 60 * 60 * 1000, // 1 hour

  // Test timeout
  timeout: config.timeout || 30000,

  // Expect timeout
  expect: {
    timeout: 10000
  }
});
