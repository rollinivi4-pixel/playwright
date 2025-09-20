/**
 * 🎭 PLAYWRIGHT TRACING CONFIGURATION EXAMPLES
 * 
 * This file contains various configuration examples for Playwright tracing.
 * Use these configurations in your playwright.config.js or individual tests.
 */

// ============================================================================
// 1. BASIC TRACING CONFIGURATION
// ============================================================================

const basicTracingConfig = {
  use: {
    // Enable tracing for all tests
    trace: 'on-first-retry', // Trace on first retry (useful for debugging failures)
    // Alternative options:
    // trace: 'on'           // Always trace
    // trace: 'off'          // Never trace
    // trace: 'retain-on-failure' // Only keep traces when tests fail
  }
};

// ============================================================================
// 2. ADVANCED TRACING CONFIGURATION
// ============================================================================

const advancedTracingConfig = {
  use: {
    trace: 'on-first-retry',
    // Additional tracing options
    screenshot: 'only-on-failure', // Take screenshots only on failure
    video: 'retain-on-failure',    // Record video only on failure
  },
  
  // Global test configuration
  globalSetup: require.resolve('./global-setup.js'),
  globalTeardown: require.resolve('./global-teardown.js'),
  
  // Reporter configuration for trace viewing
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results.json' }]
  ]
};

// ============================================================================
// 3. PERFORMANCE-FOCUSED TRACING
// ============================================================================

const performanceTracingConfig = {
  use: {
    trace: 'on',
    // Capture detailed performance metrics
    screenshot: 'on',
    video: 'on',
  },
  
  // Test timeout for performance tests
  timeout: 30000,
  
  // Expect timeout for assertions
  expect: {
    timeout: 5000
  }
};

// ============================================================================
// 4. DEBUG-FOCUSED TRACING
// ============================================================================

const debugTracingConfig = {
  use: {
    trace: 'on',
    screenshot: 'on',
    video: 'on',
    // Additional debugging options
    headless: false,        // Run in headed mode for visual debugging
    slowMo: 100,           // Slow down operations by 100ms
    devtools: true,        // Open DevTools
  },
  
  // Longer timeouts for debugging
  timeout: 60000,
  expect: {
    timeout: 10000
  }
};

// ============================================================================
// 5. CI/CD TRACING CONFIGURATION
// ============================================================================

const ciTracingConfig = {
  use: {
    // Only trace on failure to save storage space
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  
  // CI-specific settings
  workers: 1, // Run tests sequentially in CI
  retries: 2, // Retry failed tests twice
  
  // Reporter for CI
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['junit', { outputFile: 'test-results.xml' }]
  ]
};

// ============================================================================
// 6. CUSTOM TRACING FUNCTIONS
// ============================================================================

/**
 * Start tracing with custom configuration
 */
async function startCustomTracing(context, options = {}) {
  const defaultOptions = {
    screenshots: true,
    snapshots: true,
    sources: true,
    title: 'Custom Trace'
  };
  
  const tracingOptions = { ...defaultOptions, ...options };
  await context.tracing.start(tracingOptions);
  
  console.log('🎭 Custom tracing started with options:', tracingOptions);
}

/**
 * Stop tracing and save with timestamp
 */
async function stopCustomTracing(context, testName) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const tracePath = `trace-files/${testName}-${timestamp}.zip`;
  
  await context.tracing.stop({ path: tracePath });
  console.log(`📁 Trace saved to: ${tracePath}`);
  
  return tracePath;
}

/**
 * Conditional tracing based on environment
 */
async function startConditionalTracing(context, testName) {
  const isDebugMode = process.env.DEBUG === 'true';
  const isFailureMode = process.env.TRACE_ON_FAILURE === 'true';
  
  if (isDebugMode || isFailureMode) {
    await context.tracing.start({
      screenshots: true,
      snapshots: true,
      sources: true,
      title: `${testName} - ${isDebugMode ? 'Debug' : 'Failure'} Trace`
    });
    return true; // Tracing started
  }
  
  return false; // No tracing
}

// ============================================================================
// 7. TRACE ANALYSIS UTILITIES
// ============================================================================

/**
 * Analyze trace file for common issues
 */
async function analyzeTrace(tracePath) {
  console.log(`🔍 Analyzing trace: ${tracePath}`);
  
  // This would typically involve:
  // 1. Extracting trace data
  // 2. Analyzing performance metrics
  // 3. Identifying slow operations
  // 4. Checking for errors
  
  console.log('📊 Trace analysis complete');
}

/**
 * Generate trace report
 */
async function generateTraceReport(tracePath, outputPath) {
  console.log(`📝 Generating trace report: ${outputPath}`);
  
  // This would generate a detailed report including:
  // 1. Timeline of events
  // 2. Performance metrics
  // 3. Screenshots at key moments
  // 4. Network requests
  // 5. Console logs
  
  console.log('✅ Trace report generated');
}

// ============================================================================
// 8. EXPORT CONFIGURATIONS
// ============================================================================

module.exports = {
  basicTracingConfig,
  advancedTracingConfig,
  performanceTracingConfig,
  debugTracingConfig,
  ciTracingConfig,
  startCustomTracing,
  stopCustomTracing,
  startConditionalTracing,
  analyzeTrace,
  generateTraceReport
};

// ============================================================================
// 9. USAGE EXAMPLES
// ============================================================================

/*
// Example 1: Using in playwright.config.js
module.exports = {
  ...basicTracingConfig,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
};

// Example 2: Using in individual test
test('My test', async ({ page, context }) => {
  await startCustomTracing(context, { title: 'My Custom Test' });
  
  // Your test code here
  
  await stopCustomTracing(context, 'my-test');
});

// Example 3: Conditional tracing
test('Conditional test', async ({ page, context }) => {
  const tracingStarted = await startConditionalTracing(context, 'conditional-test');
  
  // Your test code here
  
  if (tracingStarted) {
    await stopCustomTracing(context, 'conditional-test');
  }
});
*/
