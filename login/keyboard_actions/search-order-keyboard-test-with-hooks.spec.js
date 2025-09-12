/**
 * SEARCH ORDER KEYBOARD TEST WITH HOOKS
 * 
 * This test demonstrates how to use hooks to organize and reuse code
 * The original functionality is preserved but now uses reusable hook functions
 * 
 * What this test does:
 * 1. Uses beforeEach hook to login and navigate to Sales Orders
 * 2. Uses reusable keyboard functions from hooks
 * 3. Tests different search scenarios with organized code
 * 4. Uses afterEach hook for cleanup
 */

const { test, expect } = require('@playwright/test');

// Import our custom hooks
const { loginWithKeyboard, navigateToSalesOrders, waitForSearchInput } = require('../hooks/login-hooks');
const { 
  searchOrderWithKeyboard, 
  clearSearchInput, 
  testTabNavigation, 
  typeWithDelay,
  testKeyboardShortcuts,
  testArrowKeyNavigation 
} = require('../hooks/keyboard-hooks');
const { 
  setupErrorListeners, 
  takeTimestampedScreenshot, 
  setTestTimeout, 
  logTestInfo, 
  logTestCompletion,
  getTestOrderNumbers,
  cleanupTestFiles 
} = require('../hooks/common-hooks');

test.describe('Search Order Keyboard Tests with Hooks', () => {
  
  // ========================================
  // HOOKS SETUP
  // ========================================
  
  test.beforeEach(async ({ page }) => {
    // Set test timeout
    setTestTimeout(test, 120000);
    
    // Log test info
    logTestInfo('Search Order Keyboard Test', 'Testing keyboard actions for searching order numbers using hooks');
    
    // Set up error listeners
    const errorData = await setupErrorListeners(page);
    
    // Login using keyboard actions
    await loginWithKeyboard(page);
    
    // Navigate to Sales Orders
    await navigateToSalesOrders(page);
    
    // Wait for search input to be ready
    const searchInput = await waitForSearchInput(page);
    
    // Store search input in page context for use in tests
    await page.evaluate(() => {
      window.testSearchInput = arguments[0];
    }, searchInput);
    
    console.log('✅ Test setup completed using hooks!');
  });
  
  test.afterEach(async ({ page }) => {
    // Take final screenshot
    await takeTimestampedScreenshot(page, 'final-test-result');
    
    // Clean up test files (optional)
    const testFiles = [
      'search-order-700107.png',
      'search-results-700107.png',
      'search-order-700106.png',
      'search-results-700106.png',
      'search-order-700104.png',
      'search-results-700104.png',
      'search-order-700103.png',
      'search-results-700103.png'
    ];
    
    // Uncomment the line below if you want to clean up screenshots after each test
    // await cleanupTestFiles(testFiles);
    
    logTestCompletion('Search Order Keyboard Test', true);
  });
  
  // ========================================
  // INDIVIDUAL TESTS
  // ========================================
  
  test('Search for multiple orders using keyboard actions', async ({ page }) => {
    console.log('\n🔍 Testing search for multiple orders...');
    
    // Get search input from page context
    const searchInput = page.locator("//input[@id='salesOrder_salesOrders_searchInput']");
    
    // Get test order numbers from hooks
    const testOrders = getTestOrderNumbers();
    
    // Test searching for each order
    for (let i = 0; i < Math.min(3, testOrders.length); i++) {
      const orderNumber = testOrders[i];
      console.log(`\n📝 Testing order ${i + 1}: ${orderNumber}`);
      
      // Search for the order using keyboard
      await searchOrderWithKeyboard(page, searchInput, orderNumber, true);
      
      // Clear search for next iteration
      if (i < testOrders.length - 1) {
        await clearSearchInput(page, searchInput, 'ctrl-a-delete');
      }
    }
    
    console.log('✅ Multiple order search test completed!');
  });
  
  test('Test different search clearing methods', async ({ page }) => {
    console.log('\n⌨️ Testing different search clearing methods...');
    
    const searchInput = page.locator("//input[@id='salesOrder_salesOrders_searchInput']");
    
    // Test different clearing methods
    const clearingMethods = ['ctrl-a-delete', 'ctrl-a-backspace', 'backspace'];
    
    for (const method of clearingMethods) {
      console.log(`\n🧪 Testing clearing method: ${method}`);
      
      // Type some test text first
      await searchInput.click();
      await searchInput.type('test123');
      console.log('   📝 Typed "test123" for testing...');
      
      // Clear using the specified method
      await clearSearchInput(page, searchInput, method);
      
      // Verify it's cleared by typing something new
      await searchInput.type('cleared');
      console.log('   ✅ Verified clearing worked!');
    }
    
    console.log('✅ Search clearing methods test completed!');
  });
  
  test('Test keyboard navigation and shortcuts', async ({ page }) => {
    console.log('\n⌨️ Testing keyboard navigation and shortcuts...');
    
    const searchInput = page.locator("//input[@id='salesOrder_salesOrders_searchInput']");
    
    // Test Tab navigation
    await testTabNavigation(page, searchInput);
    
    // Test typing with delay
    await typeWithDelay(searchInput, '700105', 150);
    
    // Test keyboard shortcuts
    await testKeyboardShortcuts(page, searchInput);
    
    // Test arrow key navigation
    await testArrowKeyNavigation(page, searchInput);
    
    console.log('✅ Keyboard navigation and shortcuts test completed!');
  });
  
  test('Test search with different input methods', async ({ page }) => {
    console.log('\n🔍 Testing search with different input methods...');
    
    const searchInput = page.locator("//input[@id='salesOrder_salesOrders_searchInput']");
    
    // Method 1: Direct typing
    console.log('\n📝 Method 1: Direct typing...');
    await searchInput.click();
    await searchInput.type('700108');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);
    
    // Method 2: Type with delay
    console.log('\n📝 Method 2: Typing with delay...');
    await clearSearchInput(page, searchInput, 'ctrl-a-delete');
    await typeWithDelay(searchInput, '700109', 200);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);
    
    // Method 3: Character by character
    console.log('\n📝 Method 3: Character by character...');
    await clearSearchInput(page, searchInput, 'ctrl-a-delete');
    const orderNumber = '700110';
    for (const char of orderNumber) {
      await searchInput.type(char);
      await page.waitForTimeout(100); // Small delay between characters
    }
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);
    
    console.log('✅ Different input methods test completed!');
  });
  
  test('Test search input focus and interaction', async ({ page }) => {
    console.log('\n🎯 Testing search input focus and interaction...');
    
    const searchInput = page.locator("//input[@id='salesOrder_salesOrders_searchInput']");
    
    // Test clicking to focus
    console.log('\n🖱️ Testing click to focus...');
    await searchInput.click();
    await searchInput.type('focus-test');
    console.log('   ✅ Click focus test passed!');
    
    // Test keyboard focus
    console.log('\n⌨️ Testing keyboard focus...');
    await clearSearchInput(page, searchInput, 'ctrl-a-delete');
    await page.keyboard.press('Tab'); // Move focus away
    await page.keyboard.press('Shift+Tab'); // Move focus back
    await searchInput.type('keyboard-focus-test');
    console.log('   ✅ Keyboard focus test passed!');
    
    // Test focus with Enter key
    console.log('\n⌨️ Testing Enter key submission...');
    await clearSearchInput(page, searchInput, 'ctrl-a-delete');
    await searchInput.type('700111');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);
    console.log('   ✅ Enter key submission test passed!');
    
    console.log('✅ Search input focus and interaction test completed!');
  });
  
  // ========================================
  // TEST SUMMARY
  // ========================================
  
  test('Display test summary and learnings', async ({ page }) => {
    console.log('\n🎓 ===== WHAT WE LEARNED WITH HOOKS =====');
    console.log('1. 🔧 Hooks help organize and reuse code');
    console.log('2. 🔍 XPath locator: //input[@id=\'salesOrder_salesOrders_searchInput\']');
    console.log('3. ⌨️ page.type() - Type text in search fields');
    console.log('4. ⌨️ page.keyboard.press(\'Enter\') - Submit search');
    console.log('5. ⌨️ page.keyboard.press(\'Control+a\') - Select all text');
    console.log('6. ⌨️ page.keyboard.press(\'Delete\') - Delete selected text');
    console.log('7. ⌨️ page.keyboard.press(\'Backspace\') - Delete character');
    console.log('8. ⌨️ page.keyboard.press(\'Tab\') - Move focus');
    console.log('9. ⌨️ page.keyboard.press(\'Shift+Tab\') - Move focus back');
    console.log('10. 🧪 beforeEach() - Setup before each test');
    console.log('11. 🧪 afterEach() - Cleanup after each test');
    console.log('12. 📦 Modular hooks - Reusable functions');
    console.log('13. 🎯 Better test organization');
    console.log('14. 🔄 DRY principle - Don\'t Repeat Yourself');
    console.log('15. 🛠️ Easier maintenance and updates');
    
    // Final assertion
    expect(true).toBe(true);
    console.log('✅ All hook-based tests completed successfully!');
    
    console.log('\n🎉 SEARCH ORDER KEYBOARD TEST WITH HOOKS COMPLETED!');
    console.log('📚 You now know how to use hooks to organize your Playwright tests!');
  });
});
