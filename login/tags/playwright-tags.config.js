/**
 * Playwright Tags Configuration
 * 
 * This file contains configuration for tag-based test execution
 * and provides utilities for managing test tags.
 */

import { defineConfig, devices } from '@playwright/test';

// Tag configuration
export const tagConfig = {
  // Priority tags
  priority: {
    critical: '@critical',
    high: '@high',
    medium: '@medium',
    low: '@low'
  },

  // Test type tags
  testType: {
    smoke: '@smoke',
    regression: '@regression',
    integration: '@integration',
    unit: '@unit'
  },

  // Environment tags
  environment: {
    staging: '@staging',
    production: '@production',
    local: '@local'
  },

  // Browser tags
  browser: {
    chrome: '@chrome',
    firefox: '@firefox',
    safari: '@safari',
    mobile: '@mobile'
  },

  // Feature tags
  feature: {
    authentication: '@authentication',
    validation: '@validation',
    ui: '@ui',
    security: '@security',
    accessibility: '@accessibility'
  },

  // Performance tags
  performance: {
    performance: '@performance',
    load: '@load'
  },

  // Data tags
  data: {
    positive: '@positive',
    negative: '@negative',
    boundary: '@boundary'
  },

  // User role tags
  userRole: {
    admin: '@admin',
    user: '@user',
    guest: '@guest'
  },

  // Maintenance tags
  maintenance: {
    flaky: '@flaky',
    skip: '@skip',
    fixme: '@fixme'
  },

  // Execution tags
  execution: {
    slow: '@slow',
    fast: '@fast',
    parallel: '@parallel',
    serial: '@serial'
  }
};

// Common tag combinations
export const tagCombinations = {
  // Smoke tests
  smoke: '@critical @smoke @positive @fast',
  smokeChrome: '@critical @smoke @positive @fast @chrome',
  smokeMobile: '@critical @smoke @positive @fast @mobile',

  // Regression tests
  regression: '@high @regression @negative @ui',
  regressionChrome: '@high @regression @negative @ui @chrome',
  regressionFirefox: '@high @regression @negative @ui @firefox',

  // Integration tests
  integration: '@medium @integration @positive @slow',
  integrationStaging: '@medium @integration @positive @slow @staging',
  integrationProduction: '@medium @integration @positive @slow @production',

  // Unit tests
  unit: '@high @unit @positive @fast',
  unitValidation: '@high @unit @positive @fast @validation',
  unitUI: '@high @unit @positive @fast @ui',

  // Security tests
  security: '@high @security @negative @ui',
  securityChrome: '@high @security @negative @ui @chrome',
  securityFirefox: '@high @security @negative @ui @firefox',

  // Accessibility tests
  accessibility: '@medium @accessibility @positive @ui',
  accessibilityChrome: '@medium @accessibility @positive @ui @chrome',
  accessibilityMobile: '@medium @accessibility @positive @ui @mobile',

  // Performance tests
  performance: '@medium @performance @positive @slow',
  performanceChrome: '@medium @performance @positive @slow @chrome',
  performanceMobile: '@medium @performance @positive @slow @mobile',

  // Authentication tests
  authentication: '@critical @authentication @positive @fast',
  authenticationNegative: '@high @authentication @negative @ui',
  authenticationSecurity: '@high @authentication @security @positive',

  // Validation tests
  validation: '@high @validation @negative @ui',
  validationPositive: '@high @validation @positive @ui',
  validationBoundary: '@high @validation @boundary @ui',

  // UI tests
  ui: '@medium @ui @positive @fast',
  uiChrome: '@medium @ui @positive @fast @chrome',
  uiMobile: '@medium @ui @positive @fast @mobile'
};

// Test execution profiles
export const executionProfiles = {
  // Quick smoke test run
  smoke: {
    description: 'Quick smoke tests for basic functionality',
    tags: ['@critical', '@smoke', '@positive', '@fast'],
    browsers: ['chromium'],
    parallel: true,
    timeout: 30000
  },

  // Critical tests only
  critical: {
    description: 'Critical tests that must pass',
    tags: ['@critical'],
    browsers: ['chromium', 'firefox'],
    parallel: true,
    timeout: 60000
  },

  // High priority tests
  high: {
    description: 'High priority tests for important functionality',
    tags: ['@critical', '@high'],
    browsers: ['chromium', 'firefox', 'webkit'],
    parallel: true,
    timeout: 120000
  },

  // Regression tests
  regression: {
    description: 'Regression tests to prevent bugs',
    tags: ['@regression'],
    browsers: ['chromium', 'firefox'],
    parallel: false,
    timeout: 300000
  },

  // Integration tests
  integration: {
    description: 'Integration tests for end-to-end workflows',
    tags: ['@integration'],
    browsers: ['chromium'],
    parallel: false,
    timeout: 600000
  },

  // Security tests
  security: {
    description: 'Security-related tests',
    tags: ['@security'],
    browsers: ['chromium', 'firefox'],
    parallel: true,
    timeout: 180000
  },

  // Accessibility tests
  accessibility: {
    description: 'Accessibility compliance tests',
    tags: ['@accessibility'],
    browsers: ['chromium', 'firefox', 'webkit'],
    parallel: true,
    timeout: 240000
  },

  // Performance tests
  performance: {
    description: 'Performance and load tests',
    tags: ['@performance', '@load'],
    browsers: ['chromium'],
    parallel: false,
    timeout: 900000
  },

  // Full test suite
  full: {
    description: 'Complete test suite',
    tags: ['@critical', '@high', '@medium', '@low'],
    browsers: ['chromium', 'firefox', 'webkit'],
    parallel: true,
    timeout: 1800000
  },

  // Fast tests only
  fast: {
    description: 'Fast tests for quick feedback',
    tags: ['@fast'],
    browsers: ['chromium'],
    parallel: true,
    timeout: 60000
  },

  // Slow tests only
  slow: {
    description: 'Slow tests for comprehensive testing',
    tags: ['@slow'],
    browsers: ['chromium'],
    parallel: false,
    timeout: 1800000
  },

  // Chrome-specific tests
  chrome: {
    description: 'Chrome browser specific tests',
    tags: ['@chrome'],
    browsers: ['chromium'],
    parallel: true,
    timeout: 300000
  },

  // Mobile tests
  mobile: {
    description: 'Mobile browser tests',
    tags: ['@mobile'],
    browsers: ['chromium'],
    parallel: true,
    timeout: 300000
  },

  // Staging environment tests
  staging: {
    description: 'Staging environment tests',
    tags: ['@staging'],
    browsers: ['chromium'],
    parallel: true,
    timeout: 300000
  },

  // Production environment tests
  production: {
    description: 'Production environment tests',
    tags: ['@production'],
    browsers: ['chromium'],
    parallel: false,
    timeout: 600000
  }
};

// Utility functions for tag management
export const tagUtils = {
  // Create tag string from array
  createTagString: (tags) => {
    return tags.join(' ');
  },

  // Create tag string from object
  createTagStringFromObject: (tagObject) => {
    return Object.values(tagObject).join(' ');
  },

  // Check if test has specific tag
  hasTag: (testTags, tag) => {
    return testTags.includes(tag);
  },

  // Check if test has any of the specified tags
  hasAnyTag: (testTags, tags) => {
    return tags.some(tag => testTags.includes(tag));
  },

  // Check if test has all specified tags
  hasAllTags: (testTags, tags) => {
    return tags.every(tag => testTags.includes(tag));
  },

  // Filter tests by tags
  filterTestsByTags: (tests, tags) => {
    return tests.filter(test => 
      tags.some(tag => test.tags && test.tags.includes(tag))
    );
  },

  // Get tests by priority
  getTestsByPriority: (tests, priority) => {
    const priorityTag = tagConfig.priority[priority];
    return tests.filter(test => 
      test.tags && test.tags.includes(priorityTag)
    );
  },

  // Get tests by test type
  getTestsByType: (tests, testType) => {
    const typeTag = tagConfig.testType[testType];
    return tests.filter(test => 
      test.tags && test.tags.includes(typeTag)
    );
  },

  // Get tests by browser
  getTestsByBrowser: (tests, browser) => {
    const browserTag = tagConfig.browser[browser];
    return tests.filter(test => 
      test.tags && test.tags.includes(browserTag)
    );
  },

  // Get tests by feature
  getTestsByFeature: (tests, feature) => {
    const featureTag = tagConfig.feature[feature];
    return tests.filter(test => 
      test.tags && test.tags.includes(featureTag)
    );
  },

  // Get tests by environment
  getTestsByEnvironment: (tests, environment) => {
    const envTag = tagConfig.environment[environment];
    return tests.filter(test => 
      test.tags && test.tags.includes(envTag)
    );
  },

  // Get tests by execution speed
  getTestsBySpeed: (tests, speed) => {
    const speedTag = tagConfig.execution[speed];
    return tests.filter(test => 
      test.tags && test.tags.includes(speedTag)
    );
  },

  // Get tests by data type
  getTestsByDataType: (tests, dataType) => {
    const dataTag = tagConfig.data[dataType];
    return tests.filter(test => 
      test.tags && test.tags.includes(dataTag)
    );
  },

  // Get tests by user role
  getTestsByUserRole: (tests, userRole) => {
    const roleTag = tagConfig.userRole[userRole];
    return tests.filter(test => 
      test.tags && test.tags.includes(roleTag)
    );
  },

  // Get tests by maintenance status
  getTestsByMaintenance: (tests, maintenance) => {
    const maintenanceTag = tagConfig.maintenance[maintenance];
    return tests.filter(test => 
      test.tags && test.tags.includes(maintenanceTag)
    );
  },

  // Get tests by performance
  getTestsByPerformance: (tests, performance) => {
    const performanceTag = tagConfig.performance[performance];
    return tests.filter(test => 
      test.tags && test.tags.includes(performanceTag)
    );
  },

  // Get all tags from test
  getAllTags: (test) => {
    return test.tags || [];
  },

  // Get tag count
  getTagCount: (test) => {
    return test.tags ? test.tags.length : 0;
  },

  // Validate tag format
  validateTag: (tag) => {
    return /^@[a-z][a-z0-9-]*$/.test(tag);
  },

  // Validate tags array
  validateTags: (tags) => {
    return tags.every(tag => tagUtils.validateTag(tag));
  },

  // Get tag category
  getTagCategory: (tag) => {
    for (const [category, tags] of Object.entries(tagConfig)) {
      if (Object.values(tags).includes(tag)) {
        return category;
      }
    }
    return 'unknown';
  },

  // Get tag description
  getTagDescription: (tag) => {
    const category = tagUtils.getTagCategory(tag);
    if (category === 'unknown') {
      return 'Unknown tag';
    }
    
    const descriptions = {
      priority: {
        '@critical': 'Essential tests that must pass for basic functionality',
        '@high': 'Important tests for user experience',
        '@medium': 'Enhanced functionality tests',
        '@low': 'Optional tests for comprehensive coverage'
      },
      testType: {
        '@smoke': 'Quick validation tests for basic functionality',
        '@regression': 'Tests to prevent previously fixed bugs from reoccurring',
        '@integration': 'Multi-component interaction tests',
        '@unit': 'Individual component tests'
      },
      environment: {
        '@staging': 'Staging environment specific tests',
        '@production': 'Production environment tests',
        '@local': 'Local development environment tests'
      },
      browser: {
        '@chrome': 'Chrome browser specific tests',
        '@firefox': 'Firefox browser specific tests',
        '@safari': 'Safari browser specific tests',
        '@mobile': 'Mobile browser tests'
      },
      feature: {
        '@authentication': 'User authentication tests',
        '@validation': 'Form validation tests',
        '@ui': 'User interface tests',
        '@security': 'Security-related tests',
        '@accessibility': 'Accessibility compliance tests'
      },
      performance: {
        '@performance': 'Performance-related tests',
        '@load': 'Load testing scenarios'
      },
      data: {
        '@positive': 'Tests with valid, expected data',
        '@negative': 'Tests with invalid, unexpected data',
        '@boundary': 'Boundary value condition tests'
      },
      userRole: {
        '@admin': 'Administrator user role tests',
        '@user': 'Regular user role tests',
        '@guest': 'Guest/unauthenticated user tests'
      },
      maintenance: {
        '@flaky': 'Tests known to be unstable',
        '@skip': 'Tests that should be skipped',
        '@fixme': 'Tests that need to be fixed'
      },
      execution: {
        '@slow': 'Tests that take a long time to execute',
        '@fast': 'Tests that execute quickly',
        '@parallel': 'Tests that can run in parallel',
        '@serial': 'Tests that must run sequentially'
      }
    };

    return descriptions[category]?.[tag] || 'No description available';
  }
};

// Export default configuration
export default defineConfig({
  testDir: './login',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    trace: 'on-first-retry',
    headless: false,
    slowMo: 1000,
    video: 'on',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
