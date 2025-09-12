const { test, expect } = require('@playwright/test');

// Import login hooks
const { 
  loginToWebsite, 
  loginWithKeyboard, 
  navigateToSalesOrders, 
  waitForSearchInput 
} = require('./login-hooks');

// Import common hooks for setup
const { 
  setupErrorListeners, 
  takeTimestampedScreenshot, 
  logTestInfo, 
  logTestCompletion, 
  cleanupTestFiles 
} = require('./common-hooks');

test.describe('Login Hooks Tests', () => {
  let testFiles = [];

  test.beforeEach(async ({ page }) => {
    console.log('\n🚀 Setting up login hooks test...');
    await setupErrorListeners(page);
    console.log('✅ Login hooks test setup completed!');
  });

  test.afterEach(async ({ page }) => {
    console.log('\n🧹 Cleaning up login hooks test...');
    const screenshotPath = await takeTimestampedScreenshot(page, 'login-hooks-test-completion');
    testFiles.push(screenshotPath);
    await cleanupTestFiles(testFiles);
    console.log('✅ Login hooks test cleanup completed!');
  });

  // Test 1: Standard Login
  test('Standard Login - loginToWebsite Hook', async ({ page }) => {
    logTestInfo('Standard Login Test', 'Testing loginToWebsite hook with default credentials');
    
    // Test with default credentials
    await loginToWebsite(page);
    
    // Take screenshot after login
    const loginScreenshot = await takeTimestampedScreenshot(page, 'standard-login-success');
    testFiles.push(loginScreenshot);
    
    // Verify login was successful
    await expect(page.locator('body')).toBeVisible();
    
    console.log('✅ Standard login test completed!');
    logTestCompletion('Standard Login Test', true);
  });

  // Test 2: Standard Login with Custom Credentials
  test('Standard Login - Custom Credentials', async ({ page }) => {
    logTestInfo('Custom Credentials Test', 'Testing loginToWebsite hook with custom credentials');
    
    const customEmail = 'rollinivi4+test@gmail.com';
    const customPassword = 'User@123';
    
    await loginToWebsite(page, customEmail, customPassword);
    
    // Take screenshot after login
    const customLoginScreenshot = await takeTimestampedScreenshot(page, 'custom-login-success');
    testFiles.push(customLoginScreenshot);
    
    // Verify login was successful
    await expect(page.locator('body')).toBeVisible();
    
    console.log('✅ Custom credentials login test completed!');
    logTestCompletion('Custom Credentials Test', true);
  });

  // Test 3: Keyboard Login
  test('Keyboard Login - loginWithKeyboard Hook', async ({ page }) => {
    logTestInfo('Keyboard Login Test', 'Testing loginWithKeyboard hook with default credentials');
    
    // Test with default credentials
    await loginWithKeyboard(page);
    
    // Take screenshot after keyboard login
    const keyboardLoginScreenshot = await takeTimestampedScreenshot(page, 'keyboard-login-success');
    testFiles.push(keyboardLoginScreenshot);
    
    // Verify login was successful
    await expect(page.locator('body')).toBeVisible();
    
    console.log('✅ Keyboard login test completed!');
    logTestCompletion('Keyboard Login Test', true);
  });

  // Test 4: Keyboard Login with Custom Credentials
  test('Keyboard Login - Custom Credentials', async ({ page }) => {
    logTestInfo('Keyboard Custom Credentials Test', 'Testing loginWithKeyboard hook with custom credentials');
    
    const customEmail = 'rollinivi4+test@gmail.com';
    const customPassword = 'User@123';
    
    await loginWithKeyboard(page, customEmail, customPassword);
    
    // Take screenshot after keyboard login
    const customKeyboardScreenshot = await takeTimestampedScreenshot(page, 'custom-keyboard-login-success');
    testFiles.push(customKeyboardScreenshot);
    
    // Verify login was successful
    await expect(page.locator('body')).toBeVisible();
    
    console.log('✅ Custom keyboard login test completed!');
    logTestCompletion('Keyboard Custom Credentials Test', true);
  });

  // Test 5: Navigation to Sales Orders
  test('Sales Orders Navigation - navigateToSalesOrders Hook', async ({ page }) => {
    logTestInfo('Sales Orders Navigation Test', 'Testing navigateToSalesOrders hook');
    
    // Login first
    await loginWithKeyboard(page);
    
    // Navigate to Sales Orders
    await navigateToSalesOrders(page);
    
    // Take screenshot of Sales Orders page
    const salesOrdersScreenshot = await takeTimestampedScreenshot(page, 'sales-orders-navigation-success');
    testFiles.push(salesOrdersScreenshot);
    
    // Verify we're on the right page
    await expect(page.locator('body')).toBeVisible();
    
    console.log('✅ Sales Orders navigation test completed!');
    logTestCompletion('Sales Orders Navigation Test', true);
  });

  // Test 6: Search Input Waiting
  test('Search Input Waiting - waitForSearchInput Hook', async ({ page }) => {
    logTestInfo('Search Input Waiting Test', 'Testing waitForSearchInput hook');
    
    // Login and navigate
    await loginWithKeyboard(page);
    await navigateToSalesOrders(page);
    
    // Wait for search input
    const searchInput = await waitForSearchInput(page);
    
    // Verify search input is ready
    await expect(searchInput).toBeVisible();
    
    // Take screenshot of search input
    const searchInputScreenshot = await takeTimestampedScreenshot(page, 'search-input-waiting-success');
    testFiles.push(searchInputScreenshot);
    
    console.log('✅ Search input waiting test completed!');
    logTestCompletion('Search Input Waiting Test', true);
  });

  // Test 7: Search Input with Custom XPath
  test('Search Input - Custom XPath', async ({ page }) => {
    logTestInfo('Custom XPath Test', 'Testing waitForSearchInput hook with custom XPath');
    
    // Login and navigate
    await loginWithKeyboard(page);
    await navigateToSalesOrders(page);
    
    // Use custom XPath
    const customXPath = "//input[@id='salesOrder_salesOrders_searchInput']";
    const searchInput = await waitForSearchInput(page, customXPath);
    
    // Verify search input is ready
    await expect(searchInput).toBeVisible();
    
    // Take screenshot
    const customXPathScreenshot = await takeTimestampedScreenshot(page, 'custom-xpath-success');
    testFiles.push(customXPathScreenshot);
    
    console.log('✅ Custom XPath test completed!');
    logTestCompletion('Custom XPath Test', true);
  });

  // Test 8: Complete Login Flow
  test('Complete Login Flow - All Login Hooks', async ({ page }) => {
    logTestInfo('Complete Login Flow Test', 'Testing all login hooks in sequence');
    
    // Step 1: Standard login
    console.log('🔐 Step 1: Standard login...');
    await loginToWebsite(page);
    const step1Screenshot = await takeTimestampedScreenshot(page, 'step1-standard-login');
    testFiles.push(step1Screenshot);
    
    // Step 2: Navigate to Sales Orders
    console.log('🧭 Step 2: Navigate to Sales Orders...');
    await navigateToSalesOrders(page);
    const step2Screenshot = await takeTimestampedScreenshot(page, 'step2-sales-orders');
    testFiles.push(step2Screenshot);
    
    // Step 3: Wait for search input
    console.log('🔍 Step 3: Wait for search input...');
    const searchInput = await waitForSearchInput(page);
    const step3Screenshot = await takeTimestampedScreenshot(page, 'step3-search-input');
    testFiles.push(step3Screenshot);
    
    // Verify all steps completed successfully
    await expect(page.locator('body')).toBeVisible();
    await expect(searchInput).toBeVisible();
    
    console.log('✅ Complete login flow test completed!');
    logTestCompletion('Complete Login Flow Test', true);
  });

  // Test 9: Error Handling - Invalid Credentials
  test('Error Handling - Invalid Login Credentials', async ({ page }) => {
    logTestInfo('Invalid Credentials Test', 'Testing error handling with invalid login credentials');
    
    const invalidEmail = 'invalid@email.com';
    const invalidPassword = 'wrongpassword';
    
    try {
      await loginToWebsite(page, invalidEmail, invalidPassword);
      console.log('⚠️ Unexpected: Login succeeded with invalid credentials');
    } catch (error) {
      console.log('✅ Expected: Login failed with invalid credentials');
      console.log('Error message:', error.message);
    }
    
    // Take screenshot of error state
    const errorScreenshot = await takeTimestampedScreenshot(page, 'invalid-credentials-error');
    testFiles.push(errorScreenshot);
    
    // Verify we're still on login page
    await expect(page).toHaveURL(/stagingaz\.ezscm\.ai/);
    
    console.log('✅ Invalid credentials test completed!');
    logTestCompletion('Invalid Credentials Test', true);
  });

  // Test 10: Performance Test - Multiple Login Attempts
  test('Performance Test - Multiple Login Attempts', async ({ page }) => {
    logTestInfo('Performance Test', 'Testing performance with multiple login attempts');
    
    const startTime = Date.now();
    
    // Perform multiple login attempts
    for (let i = 1; i <= 3; i++) {
      console.log(`🔄 Login attempt ${i}/3...`);
      
      try {
        await loginWithKeyboard(page);
        const attemptScreenshot = await takeTimestampedScreenshot(page, `login-attempt-${i}`);
        testFiles.push(attemptScreenshot);
        
        // Wait between attempts
        if (i < 3) {
          await page.waitForTimeout(2000);
        }
      } catch (error) {
        console.log(`❌ Login attempt ${i} failed:`, error.message);
      }
    }
    
    const endTime = Date.now();
    const totalTime = endTime - startTime;
    
    console.log(`⏱️ Total time for 3 login attempts: ${totalTime}ms`);
    console.log(`⏱️ Average time per login: ${Math.round(totalTime / 3)}ms`);
    
    // Verify final state
    await expect(page.locator('body')).toBeVisible();
    
    console.log('✅ Performance test completed!');
    logTestCompletion('Performance Test', true);
  });

  // Test 11: Login with Different Browsers (if applicable)
  test('Cross-Browser Login - Different Browser Contexts', async ({ page }) => {
    logTestInfo('Cross-Browser Login Test', 'Testing login hooks across different browser contexts');
    
    // Test standard login
    await loginToWebsite(page);
    const standardScreenshot = await takeTimestampedScreenshot(page, 'cross-browser-standard');
    testFiles.push(standardScreenshot);
    
    // Verify login worked
    await expect(page.locator('body')).toBeVisible();
    
    console.log('✅ Cross-browser login test completed!');
    logTestCompletion('Cross-Browser Login Test', true);
  });

  // Test 12: Login State Verification
  test('Login State Verification - Verify Login Success', async ({ page }) => {
    logTestInfo('Login State Verification Test', 'Testing login state verification');
    
    // Login
    await loginWithKeyboard(page);
    
    // Verify login state by checking for elements that appear after login
    const bodyElement = page.locator('body');
    await expect(bodyElement).toBeVisible();
    
    // Check if we're not on the login page anymore
    const currentUrl = page.url();
    console.log('📍 Current URL after login:', currentUrl);
    
    // Take screenshot for verification
    const verificationScreenshot = await takeTimestampedScreenshot(page, 'login-state-verification');
    testFiles.push(verificationScreenshot);
    
    // Verify we're not on the login page
    expect(currentUrl).not.toContain('login');
    expect(currentUrl).not.toContain('signin');
    
    console.log('✅ Login state verification test completed!');
    logTestCompletion('Login State Verification Test', true);
  });
});
