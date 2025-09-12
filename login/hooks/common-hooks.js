/**
 * COMMON HOOKS
 * 
 * This file contains common utility functions that can be used across multiple tests
 * These hooks help with setup, cleanup, and common operations
 */

/**
 * Set up error listeners for a page
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @returns {Object} Object containing error arrays and cleanup function
 */
async function setupErrorListeners(page) {
  console.log('🔧 Setting up error listeners...');
  
  const consoleErrors = [];
  const networkErrors = [];
  const networkRequests = [];
  
  // Listen for console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push({
        type: 'console',
        message: msg.text(),
        location: msg.location(),
        timestamp: new Date().toISOString()
      });
      console.log('❌ Console Error:', msg.text());
    }
  });
  
  // Listen for network requests
  page.on('request', request => {
    const requestData = {
      type: 'request',
      method: request.method(),
      url: request.url(),
      headers: request.headers(),
      postData: request.postData(),
      timestamp: new Date().toISOString(),
      resourceType: request.resourceType()
    };
    
    networkRequests.push(requestData);
    
    // Log API calls (XHR/Fetch requests)
    if (request.resourceType() === 'xhr' || request.resourceType() === 'fetch') {
      console.log(`🌐 API Call: ${request.method()} ${request.url()}`);
    }
  });
  
  // Listen for network responses
  page.on('response', response => {
    if (!response.ok()) {
      networkErrors.push({
        type: 'network',
        url: response.url(),
        status: response.status(),
        statusText: response.statusText(),
        timestamp: new Date().toISOString()
      });
      console.log(`❌ Network Error: ${response.status()} ${response.statusText()} - ${response.url()}`);
    }
  });
  
  // Listen for failed requests
  page.on('requestfailed', request => {
    networkErrors.push({
      type: 'request_failed',
      url: request.url(),
      failure: request.failure()?.errorText || 'Unknown error',
      timestamp: new Date().toISOString()
    });
    console.log(`❌ Request Failed: ${request.url()} - ${request.failure()?.errorText}`);
  });
  
  console.log('✅ Error listeners set up!');
  
  return {
    consoleErrors,
    networkErrors,
    networkRequests,
    cleanup: () => {
      console.log('🧹 Cleaning up error listeners...');
      // Remove listeners if needed
    }
  };
}

/**
 * Take screenshot with timestamp
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} name - Name for the screenshot file
 * @param {string} folder - Folder to save screenshot in (default: 'screenshots')
 */
async function takeTimestampedScreenshot(page, name, folder = 'screenshots') {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `${name}-${timestamp}.png`;
  const path = `${folder}/${filename}`;
  
  console.log(`📸 Taking screenshot: ${path}`);
  await page.screenshot({ path });
  console.log(`✅ Screenshot saved: ${path}`);
  
  return path;
}

/**
 * Wait for element with retry logic
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} selector - CSS selector or XPath
 * @param {number} timeout - Timeout in milliseconds (default: 10000)
 * @param {number} retries - Number of retries (default: 3)
 */
async function waitForElementWithRetry(page, selector, timeout = 10000, retries = 3) {
  console.log(`🔍 Waiting for element: ${selector}`);
  
  for (let i = 0; i < retries; i++) {
    try {
      await page.waitForSelector(selector, { timeout });
      console.log(`✅ Element found: ${selector}`);
      return page.locator(selector);
    } catch (error) {
      console.log(`⚠️ Attempt ${i + 1} failed: ${error.message}`);
      if (i === retries - 1) {
        throw error;
      }
      await page.waitForTimeout(1000); // Wait 1 second before retry
    }
  }
}

/**
 * Set test timeout
 * @param {import('@playwright/test').Test} test - Test object
 * @param {number} timeout - Timeout in milliseconds (default: 120000)
 */
function setTestTimeout(test, timeout = 120000) {
  console.log(`⏱️ Setting test timeout to ${timeout}ms (${timeout / 1000} seconds)`);
  test.setTimeout(timeout);
}

/**
 * Log test information
 * @param {string} testName - Name of the test
 * @param {string} description - Description of what the test does
 */
function logTestInfo(testName, description) {
  console.log('\n' + '='.repeat(60));
  console.log(`🧪 TEST: ${testName}`);
  console.log(`📝 DESCRIPTION: ${description}`);
  console.log('='.repeat(60));
}

/**
 * Log test completion
 * @param {string} testName - Name of the test
 * @param {boolean} passed - Whether the test passed
 */
function logTestCompletion(testName, passed = true) {
  console.log('\n' + '='.repeat(60));
  if (passed) {
    console.log(`✅ TEST COMPLETED: ${testName}`);
    console.log('🎉 Test passed successfully!');
  } else {
    console.log(`❌ TEST FAILED: ${testName}`);
    console.log('💥 Test failed!');
  }
  console.log('='.repeat(60));
}

/**
 * Create test data for orders
 * @returns {Array} Array of test order numbers
 */
function getTestOrderNumbers() {
  return [
    '700107',
    '700106', 
    '700104',
    '700103',
    '700025'
  ];
}

/**
 * Generate random test data
 * @param {string} type - Type of data to generate
 * @returns {string} Generated test data
 */
function generateTestData(type) {
  const timestamp = Date.now();
  
  switch (type) {
    case 'email':
      return `test-${timestamp}@example.com`;
    case 'order':
      return `700${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    case 'name':
      return `Test User ${timestamp}`;
    default:
      return `test-data-${timestamp}`;
  }
}

/**
 * Clean up test files
 * @param {Array} filePaths - Array of file paths to clean up
 */
async function cleanupTestFiles(filePaths) {
  console.log('🧹 Cleaning up test files...');
  
  for (const filePath of filePaths) {
    try {
      const fs = require('fs');
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`✅ Deleted: ${filePath}`);
      }
    } catch (error) {
      console.log(`⚠️ Could not delete ${filePath}: ${error.message}`);
    }
  }
  
  console.log('✅ Cleanup completed!');
}

module.exports = {
  setupErrorListeners,
  takeTimestampedScreenshot,
  waitForElementWithRetry,
  setTestTimeout,
  logTestInfo,
  logTestCompletion,
  getTestOrderNumbers,
  generateTestData,
  cleanupTestFiles
};
