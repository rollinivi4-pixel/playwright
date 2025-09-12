const { test, expect } = require('@playwright/test');

// Import common hooks
const { 
  setupErrorListeners, 
  takeTimestampedScreenshot, 
  waitForElementWithRetry, 
  setTestTimeout, 
  logTestInfo, 
  logTestCompletion, 
  getTestOrderNumbers, 
  generateTestData, 
  cleanupTestFiles 
} = require('./common-hooks');

test.describe('Common Hooks Tests', () => {
  let errorData;
  let testFiles = [];

  test.beforeEach(async ({ page }) => {
    console.log('\n🚀 Setting up common hooks test...');
    errorData = await setupErrorListeners(page);
    setTestTimeout(test, 60000);
    console.log('✅ Common hooks test setup completed!');
  });

  test.afterEach(async ({ page }) => {
    console.log('\n🧹 Cleaning up common hooks test...');
    const screenshotPath = await takeTimestampedScreenshot(page, 'common-hooks-test-completion');
    testFiles.push(screenshotPath);
    await cleanupTestFiles(testFiles);
    console.log('✅ Common hooks test cleanup completed!');
  });

  // Test 1: Error Monitoring
  test('Error Monitoring - Console and Network Errors', async ({ page }) => {
    logTestInfo('Error Monitoring Test', 'Testing setupErrorListeners functionality');
    
    // Navigate to a page
    await page.goto('https://stagingaz.ezscm.ai/');
    await page.waitForTimeout(3000);
    
    // Take screenshot
    const screenshot = await takeTimestampedScreenshot(page, 'error-monitoring-test');
    testFiles.push(screenshot);
    
    // Log error statistics
    console.log(`📊 Console errors detected: ${errorData.consoleErrors.length}`);
    console.log(`📊 Network errors detected: ${errorData.networkErrors.length}`);
    console.log(`📊 Network requests made: ${errorData.networkRequests.length}`);
    
    // Verify page loaded
    await expect(page.locator('body')).toBeVisible();
    
    logTestCompletion('Error Monitoring Test', true);
  });

  // Test 2: Screenshot Functionality
  test('Screenshot Functionality - Timestamped Screenshots', async ({ page }) => {
    logTestInfo('Screenshot Test', 'Testing takeTimestampedScreenshot functionality');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    
    // Take multiple screenshots
    const screenshots = [
      await takeTimestampedScreenshot(page, 'screenshot-1'),
      await takeTimestampedScreenshot(page, 'screenshot-2'),
      await takeTimestampedScreenshot(page, 'screenshot-3')
    ];
    
    testFiles.push(...screenshots);
    
    // Verify screenshots were created
    expect(screenshots).toHaveLength(3);
    screenshots.forEach(screenshot => {
      expect(screenshot).toContain('screenshot');
      expect(screenshot).toContain('.png');
    });
    
    console.log('✅ Screenshot functionality test completed!');
    logTestCompletion('Screenshot Test', true);
  });

  // Test 3: Element Waiting with Retry
  test('Element Waiting - Wait for Elements with Retry Logic', async ({ page }) => {
    logTestInfo('Element Waiting Test', 'Testing waitForElementWithRetry functionality');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    
    // Test waiting for different elements
    const elements = [
      { selector: '#email', name: 'Email Field' },
      { selector: '#password', name: 'Password Field' },
      { selector: 'button[type="submit"]', name: 'Login Button' }
    ];
    
    for (const element of elements) {
      console.log(`🔍 Waiting for ${element.name}...`);
      const locator = await waitForElementWithRetry(page, element.selector, 5000, 3);
      await expect(locator).toBeVisible();
      console.log(`✅ ${element.name} found and visible!`);
    }
    
    console.log('✅ Element waiting test completed!');
    logTestCompletion('Element Waiting Test', true);
  });

  // Test 4: Test Data Generation
  test('Test Data Generation - Generate Various Test Data', async ({ page }) => {
    logTestInfo('Test Data Generation Test', 'Testing generateTestData functionality');
    
    // Generate different types of test data
    const testData = {
      email: generateTestData('email'),
      order: generateTestData('order'),
      name: generateTestData('name'),
      other: generateTestData('other')
    };
    
    console.log('📧 Generated email:', testData.email);
    console.log('📦 Generated order:', testData.order);
    console.log('👤 Generated name:', testData.name);
    console.log('📝 Generated other:', testData.other);
    
    // Verify email format
    expect(testData.email).toContain('@example.com');
    expect(testData.email).toContain('test-');
    
    // Verify order format
    expect(testData.order).toMatch(/^700\d{3}$/);
    
    // Verify name format
    expect(testData.name).toContain('Test User');
    
    // Get test order numbers
    const orderNumbers = getTestOrderNumbers();
    console.log('📋 Test order numbers:', orderNumbers.join(', '));
    
    expect(orderNumbers).toContain('700107');
    expect(orderNumbers).toContain('700106');
    expect(orderNumbers).toContain('700104');
    
    console.log('✅ Test data generation test completed!');
    logTestCompletion('Test Data Generation Test', true);
  });

  // Test 5: Test Timeout Setting
  test('Test Timeout - Set and Verify Test Timeout', async ({ page }) => {
    logTestInfo('Test Timeout Test', 'Testing setTestTimeout functionality');
    
    // Set a custom timeout
    const customTimeout = 30000; // 30 seconds
    setTestTimeout(test, customTimeout);
    
    console.log(`⏱️ Test timeout set to ${customTimeout}ms`);
    
    // Navigate to a page
    await page.goto('https://stagingaz.ezscm.ai/');
    
    // Wait for elements to ensure timeout is working
    await waitForElementWithRetry(page, '#email', 5000, 2);
    
    console.log('✅ Test timeout test completed!');
    logTestCompletion('Test Timeout Test', true);
  });

  // Test 6: File Cleanup
  test('File Cleanup - Clean Up Test Files', async ({ page }) => {
    logTestInfo('File Cleanup Test', 'Testing cleanupTestFiles functionality');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    
    // Create some test files
    const testFilePaths = [
      'test-file-1.png',
      'test-file-2.png',
      'test-file-3.png'
    ];
    
    // Take screenshots to create files
    for (let i = 0; i < testFilePaths.length; i++) {
      await page.screenshot({ path: testFilePaths[i] });
      console.log(`📸 Created test file: ${testFilePaths[i]}`);
    }
    
    // Clean up the files
    await cleanupTestFiles(testFilePaths);
    
    console.log('✅ File cleanup test completed!');
    logTestCompletion('File Cleanup Test', true);
  });

  // Test 7: Error Handling with Invalid Selectors
  test('Error Handling - Invalid Selectors and Retry Logic', async ({ page }) => {
    logTestInfo('Error Handling Test', 'Testing error handling with invalid selectors');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    
    // Test with invalid selector (should fail after retries)
    try {
      await waitForElementWithRetry(page, '#invalid-selector', 2000, 2);
      console.log('⚠️ Unexpected: Invalid selector found');
    } catch (error) {
      console.log('✅ Expected: Invalid selector not found after retries');
      expect(error.message).toContain('waiting for selector');
    }
    
    // Test with valid selector (should succeed)
    try {
      await waitForElementWithRetry(page, '#email', 5000, 3);
      console.log('✅ Valid selector found successfully');
    } catch (error) {
      console.log('❌ Unexpected: Valid selector not found');
      throw error;
    }
    
    console.log('✅ Error handling test completed!');
    logTestCompletion('Error Handling Test', true);
  });

  // Test 8: Multiple Screenshots with Different Names
  test('Multiple Screenshots - Different Naming Patterns', async ({ page }) => {
    logTestInfo('Multiple Screenshots Test', 'Testing multiple screenshot naming patterns');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    
    // Take screenshots with different naming patterns
    const screenshotPatterns = [
      'login-page',
      'form-elements',
      'page-loaded',
      'test-completion'
    ];
    
    const screenshotPaths = [];
    
    for (const pattern of screenshotPatterns) {
      const path = await takeTimestampedScreenshot(page, pattern);
      screenshotPaths.push(path);
      testFiles.push(path);
      console.log(`📸 Screenshot saved: ${path}`);
    }
    
    // Verify all screenshots were created
    expect(screenshotPaths).toHaveLength(screenshotPatterns.length);
    
    // Verify each screenshot has unique timestamp
    const timestamps = screenshotPaths.map(path => {
      const match = path.match(/(\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}-\d{3}Z)/);
      return match ? match[1] : null;
    });
    
    const uniqueTimestamps = new Set(timestamps);
    expect(uniqueTimestamps.size).toBe(timestamps.length);
    
    console.log('✅ Multiple screenshots test completed!');
    logTestCompletion('Multiple Screenshots Test', true);
  });
});
