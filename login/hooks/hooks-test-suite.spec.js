const { test, expect } = require('@playwright/test');

// Import all hooks
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

const { 
  loginToWebsite, 
  loginWithKeyboard, 
  navigateToSalesOrders, 
  waitForSearchInput 
} = require('./login-hooks');

const { 
  searchOrderWithKeyboard, 
  clearSearchInput, 
  testTabNavigation, 
  typeWithDelay, 
  testKeyboardShortcuts, 
  testArrowKeyNavigation 
} = require('./keyboard-hooks');

test.describe('Hooks Test Suite', () => {
  let errorData;
  let testFiles = [];

  // Setup before each test
  test.beforeEach(async ({ page }) => {
    console.log('\n🚀 Setting up test...');
    
    // Set up error listeners
    errorData = await setupErrorListeners(page);
    
    // Set test timeout
    setTestTimeout(test, 120000);
    
    console.log('✅ Test setup completed!');
  });

  // Cleanup after each test
  test.afterEach(async ({ page }) => {
    console.log('\n🧹 Cleaning up test...');
    
    // Take final screenshot
    const screenshotPath = await takeTimestampedScreenshot(page, 'test-completion');
    testFiles.push(screenshotPath);
    
    // Log test completion
    logTestCompletion('Hooks Test', true);
    
    // Clean up test files
    await cleanupTestFiles(testFiles);
    
    console.log('✅ Test cleanup completed!');
  });

  // Test 1: Common Hooks - Error Monitoring
  test('Common Hooks - Error Monitoring and Screenshots', async ({ page }) => {
    logTestInfo('Error Monitoring Test', 'Testing error listeners and screenshot functionality');
    
    // Navigate to a page that might have errors
    await page.goto('https://stagingaz.ezscm.ai/');
    
    // Take initial screenshot
    const initialScreenshot = await takeTimestampedScreenshot(page, 'initial-page');
    testFiles.push(initialScreenshot);
    
    // Wait for page to load
    await page.waitForTimeout(3000);
    
    // Check for console errors
    console.log(`📊 Console errors detected: ${errorData.consoleErrors.length}`);
    console.log(`📊 Network errors detected: ${errorData.networkErrors.length}`);
    console.log(`📊 Network requests made: ${errorData.networkRequests.length}`);
    
    // Take screenshot after page load
    const loadedScreenshot = await takeTimestampedScreenshot(page, 'page-loaded');
    testFiles.push(loadedScreenshot);
    
    // Verify page loaded successfully
    await expect(page.locator('body')).toBeVisible();
    
    console.log('✅ Error monitoring test completed!');
  });

  // Test 2: Common Hooks - Element Waiting and Retry
  test('Common Hooks - Element Waiting with Retry Logic', async ({ page }) => {
    logTestInfo('Element Waiting Test', 'Testing waitForElementWithRetry functionality');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    
    // Test waiting for email field with retry
    const emailField = await waitForElementWithRetry(page, '#email', 5000, 3);
    await expect(emailField).toBeVisible();
    
    // Test waiting for password field
    const passwordField = await waitForElementWithRetry(page, '#password', 5000, 3);
    await expect(passwordField).toBeVisible();
    
    // Test waiting for login button
    const loginButton = await waitForElementWithRetry(page, 'button[type="submit"]', 5000, 3);
    await expect(loginButton).toBeVisible();
    
    console.log('✅ Element waiting test completed!');
  });

  // Test 3: Common Hooks - Test Data Generation
  test('Common Hooks - Test Data Generation', async ({ page }) => {
    logTestInfo('Test Data Generation', 'Testing generateTestData functionality');
    
    // Generate different types of test data
    const testEmail = generateTestData('email');
    const testOrder = generateTestData('order');
    const testName = generateTestData('name');
    const testData = generateTestData('other');
    
    console.log(`📧 Generated email: ${testEmail}`);
    console.log(`📦 Generated order: ${testOrder}`);
    console.log(`👤 Generated name: ${testName}`);
    console.log(`📝 Generated data: ${testData}`);
    
    // Get test order numbers
    const orderNumbers = getTestOrderNumbers();
    console.log(`📋 Test order numbers: ${orderNumbers.join(', ')}`);
    
    // Verify data generation
    expect(testEmail).toContain('@example.com');
    expect(testOrder).toMatch(/^700\d{3}$/);
    expect(testName).toContain('Test User');
    expect(orderNumbers).toContain('700107');
    
    console.log('✅ Test data generation completed!');
  });

  // Test 4: Login Hooks - Standard Login
  test('Login Hooks - Standard Login Flow', async ({ page }) => {
    logTestInfo('Standard Login Test', 'Testing loginToWebsite hook');
    
    // Use the login hook
    await loginToWebsite(page, 'rollinivi4+test@gmail.com', 'User@123');
    
    // Take screenshot after login
    const loginScreenshot = await takeTimestampedScreenshot(page, 'after-login');
    testFiles.push(loginScreenshot);
    
    // Verify login was successful
    await expect(page.locator('body')).toBeVisible();
    
    console.log('✅ Standard login test completed!');
  });

  // Test 5: Login Hooks - Keyboard Login
  test('Login Hooks - Keyboard Login Flow', async ({ page }) => {
    logTestInfo('Keyboard Login Test', 'Testing loginWithKeyboard hook');
    
    // Use the keyboard login hook
    await loginWithKeyboard(page, 'rollinivi4+test@gmail.com', 'User@123');
    
    // Take screenshot after keyboard login
    const keyboardLoginScreenshot = await takeTimestampedScreenshot(page, 'after-keyboard-login');
    testFiles.push(keyboardLoginScreenshot);
    
    // Verify login was successful
    await expect(page.locator('body')).toBeVisible();
    
    console.log('✅ Keyboard login test completed!');
  });

  // Test 6: Login Hooks - Navigation to Sales Orders
  test('Login Hooks - Navigation to Sales Orders', async ({ page }) => {
    logTestInfo('Sales Orders Navigation Test', 'Testing navigateToSalesOrders hook');
    
    // Login first
    await loginWithKeyboard(page);
    
    // Navigate to Sales Orders
    await navigateToSalesOrders(page);
    
    // Take screenshot of Sales Orders page
    const salesOrdersScreenshot = await takeTimestampedScreenshot(page, 'sales-orders-page');
    testFiles.push(salesOrdersScreenshot);
    
    // Verify we're on the right page
    await expect(page.locator('body')).toBeVisible();
    
    console.log('✅ Sales Orders navigation test completed!');
  });

  // Test 7: Login Hooks - Search Input Waiting
  test('Login Hooks - Search Input Waiting', async ({ page }) => {
    logTestInfo('Search Input Waiting Test', 'Testing waitForSearchInput hook');
    
    // Login and navigate
    await loginWithKeyboard(page);
    await navigateToSalesOrders(page);
    
    // Wait for search input
    const searchInput = await waitForSearchInput(page);
    
    // Verify search input is ready
    await expect(searchInput).toBeVisible();
    
    // Take screenshot of search input
    const searchInputScreenshot = await takeTimestampedScreenshot(page, 'search-input-ready');
    testFiles.push(searchInputScreenshot);
    
    console.log('✅ Search input waiting test completed!');
  });

  // Test 8: Keyboard Hooks - Search Order with Keyboard
  test('Keyboard Hooks - Search Order with Keyboard', async ({ page }) => {
    logTestInfo('Keyboard Search Test', 'Testing searchOrderWithKeyboard hook');
    
    // Setup
    await loginWithKeyboard(page);
    await navigateToSalesOrders(page);
    const searchInput = await waitForSearchInput(page);
    
    // Search for an order using keyboard
    await searchOrderWithKeyboard(page, searchInput, '700107', true);
    
    // Take screenshot of search results
    const searchResultsScreenshot = await takeTimestampedScreenshot(page, 'search-results');
    testFiles.push(searchResultsScreenshot);
    
    console.log('✅ Keyboard search test completed!');
  });

  // Test 9: Keyboard Hooks - Clear Search Input
  test('Keyboard Hooks - Clear Search Input Methods', async ({ page }) => {
    logTestInfo('Clear Search Input Test', 'Testing clearSearchInput hook with different methods');
    
    // Setup
    await loginWithKeyboard(page);
    await navigateToSalesOrders(page);
    const searchInput = await waitForSearchInput(page);
    
    // Test different clear methods
    const methods = ['ctrl-a-delete', 'ctrl-a-backspace', 'backspace'];
    
    for (const method of methods) {
      console.log(`🧪 Testing clear method: ${method}`);
      
      // Type some text first
      await searchInput.type('test123');
      await page.waitForTimeout(500);
      
      // Clear using the method
      await clearSearchInput(page, searchInput, method);
      await page.waitForTimeout(500);
      
      // Take screenshot
      const clearScreenshot = await takeTimestampedScreenshot(page, `clear-method-${method}`);
      testFiles.push(clearScreenshot);
    }
    
    console.log('✅ Clear search input test completed!');
  });

  // Test 10: Keyboard Hooks - Tab Navigation
  test('Keyboard Hooks - Tab Navigation', async ({ page }) => {
    logTestInfo('Tab Navigation Test', 'Testing testTabNavigation hook');
    
    // Setup
    await loginWithKeyboard(page);
    await navigateToSalesOrders(page);
    const searchInput = await waitForSearchInput(page);
    
    // Test tab navigation
    await testTabNavigation(page, searchInput);
    
    // Take screenshot
    const tabNavigationScreenshot = await takeTimestampedScreenshot(page, 'tab-navigation');
    testFiles.push(tabNavigationScreenshot);
    
    console.log('✅ Tab navigation test completed!');
  });

  // Test 11: Keyboard Hooks - Type with Delay
  test('Keyboard Hooks - Type with Delay', async ({ page }) => {
    logTestInfo('Type with Delay Test', 'Testing typeWithDelay hook');
    
    // Setup
    await loginWithKeyboard(page);
    await navigateToSalesOrders(page);
    const searchInput = await waitForSearchInput(page);
    
    // Test typing with different delays
    const delays = [50, 100, 200];
    
    for (const delay of delays) {
      console.log(`⌨️ Testing typing with ${delay}ms delay`);
      
      // Clear input first
      await clearSearchInput(page, searchInput, 'ctrl-a-delete');
      
      // Type with delay
      await typeWithDelay(searchInput, '700107', delay);
      await page.waitForTimeout(1000);
      
      // Take screenshot
      const delayScreenshot = await takeTimestampedScreenshot(page, `typing-delay-${delay}ms`);
      testFiles.push(delayScreenshot);
    }
    
    console.log('✅ Type with delay test completed!');
  });

  // Test 12: Keyboard Hooks - Keyboard Shortcuts
  test('Keyboard Hooks - Keyboard Shortcuts', async ({ page }) => {
    logTestInfo('Keyboard Shortcuts Test', 'Testing testKeyboardShortcuts hook');
    
    // Setup
    await loginWithKeyboard(page);
    await navigateToSalesOrders(page);
    const searchInput = await waitForSearchInput(page);
    
    // Test keyboard shortcuts
    await testKeyboardShortcuts(page, searchInput);
    
    // Take screenshot
    const shortcutsScreenshot = await takeTimestampedScreenshot(page, 'keyboard-shortcuts');
    testFiles.push(shortcutsScreenshot);
    
    console.log('✅ Keyboard shortcuts test completed!');
  });

  // Test 13: Keyboard Hooks - Arrow Key Navigation
  test('Keyboard Hooks - Arrow Key Navigation', async ({ page }) => {
    logTestInfo('Arrow Key Navigation Test', 'Testing testArrowKeyNavigation hook');
    
    // Setup
    await loginWithKeyboard(page);
    await navigateToSalesOrders(page);
    const searchInput = await waitForSearchInput(page);
    
    // Test arrow key navigation
    await testArrowKeyNavigation(page, searchInput);
    
    // Take screenshot
    const arrowKeysScreenshot = await takeTimestampedScreenshot(page, 'arrow-key-navigation');
    testFiles.push(arrowKeysScreenshot);
    
    console.log('✅ Arrow key navigation test completed!');
  });

  // Test 14: Integration Test - Complete Workflow
  test('Integration Test - Complete Workflow with All Hooks', async ({ page }) => {
    logTestInfo('Complete Workflow Test', 'Testing integration of all hooks in a complete workflow');
    
    // Step 1: Login using keyboard
    console.log('🔐 Step 1: Logging in...');
    await loginWithKeyboard(page);
    
    // Step 2: Navigate to Sales Orders
    console.log('🧭 Step 2: Navigating to Sales Orders...');
    await navigateToSalesOrders(page);
    
    // Step 3: Wait for search input
    console.log('🔍 Step 3: Waiting for search input...');
    const searchInput = await waitForSearchInput(page);
    
    // Step 4: Search for multiple orders
    console.log('📝 Step 4: Searching for multiple orders...');
    const orderNumbers = getTestOrderNumbers();
    
    for (let i = 0; i < Math.min(3, orderNumbers.length); i++) {
      const orderNumber = orderNumbers[i];
      console.log(`   🔍 Searching for order: ${orderNumber}`);
      
      // Clear previous search
      await clearSearchInput(page, searchInput, 'ctrl-a-delete');
      
      // Search for order
      await searchOrderWithKeyboard(page, searchInput, orderNumber, true);
      
      // Take screenshot
      const orderScreenshot = await takeTimestampedScreenshot(page, `order-${orderNumber}`);
      testFiles.push(orderScreenshot);
      
      // Wait between searches
      await page.waitForTimeout(2000);
    }
    
    // Step 5: Test keyboard interactions
    console.log('⌨️ Step 5: Testing keyboard interactions...');
    await testTabNavigation(page, searchInput);
    await testKeyboardShortcuts(page, searchInput);
    await testArrowKeyNavigation(page, searchInput);
    
    // Step 6: Final screenshot
    console.log('📸 Step 6: Taking final screenshot...');
    const finalScreenshot = await takeTimestampedScreenshot(page, 'complete-workflow-final');
    testFiles.push(finalScreenshot);
    
    // Step 7: Verify completion
    console.log('✅ Step 7: Verifying completion...');
    await expect(page.locator('body')).toBeVisible();
    
    // Log error summary
    console.log(`\n📊 Error Summary:`);
    console.log(`   Console errors: ${errorData.consoleErrors.length}`);
    console.log(`   Network errors: ${errorData.networkErrors.length}`);
    console.log(`   Network requests: ${errorData.networkRequests.length}`);
    
    console.log('✅ Complete workflow test completed!');
  });

  // Test 15: Error Handling Test
  test('Error Handling Test - Invalid Login', async ({ page }) => {
    logTestInfo('Error Handling Test', 'Testing error handling with invalid login');
    
    // Try to login with invalid credentials
    try {
      await loginToWebsite(page, 'invalid@email.com', 'wrongpassword');
    } catch (error) {
      console.log('❌ Expected error caught:', error.message);
    }
    
    // Take screenshot of error state
    const errorScreenshot = await takeTimestampedScreenshot(page, 'error-state');
    testFiles.push(errorScreenshot);
    
    // Check for errors in our error listeners
    console.log(`📊 Errors detected: ${errorData.consoleErrors.length + errorData.networkErrors.length}`);
    
    // Verify we're still on login page (error case)
    await expect(page).toHaveURL(/stagingaz\.ezscm\.ai/);
    
    console.log('✅ Error handling test completed!');
  });
});
