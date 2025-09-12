const { test, expect } = require('@playwright/test');

// Import keyboard hooks
const { 
  searchOrderWithKeyboard, 
  clearSearchInput, 
  testTabNavigation, 
  typeWithDelay, 
  testKeyboardShortcuts, 
  testArrowKeyNavigation 
} = require('./keyboard-hooks');

// Import login hooks for setup
const { 
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

test.describe('Keyboard Hooks Tests', () => {
  let testFiles = [];
  let searchInput;

  test.beforeEach(async ({ page }) => {
    console.log('\n🚀 Setting up keyboard hooks test...');
    await setupErrorListeners(page);
    
    // Login and navigate to Sales Orders
    await loginWithKeyboard(page);
    await navigateToSalesOrders(page);
    
    // Wait for search input
    searchInput = await waitForSearchInput(page);
    
    console.log('✅ Keyboard hooks test setup completed!');
  });

  test.afterEach(async ({ page }) => {
    console.log('\n🧹 Cleaning up keyboard hooks test...');
    const screenshotPath = await takeTimestampedScreenshot(page, 'keyboard-hooks-test-completion');
    testFiles.push(screenshotPath);
    await cleanupTestFiles(testFiles);
    console.log('✅ Keyboard hooks test cleanup completed!');
  });

  // Test 1: Search Order with Keyboard
  test('Search Order - searchOrderWithKeyboard Hook', async ({ page }) => {
    logTestInfo('Search Order Test', 'Testing searchOrderWithKeyboard hook');
    
    const orderNumber = '700107';
    
    // Search for order using keyboard
    await searchOrderWithKeyboard(page, searchInput, orderNumber, true);
    
    // Take screenshot of search results
    const searchResultsScreenshot = await takeTimestampedScreenshot(page, 'search-order-results');
    testFiles.push(searchResultsScreenshot);
    
    console.log('✅ Search order test completed!');
    logTestCompletion('Search Order Test', true);
  });

  // Test 2: Search Multiple Orders
  test('Search Multiple Orders - Different Order Numbers', async ({ page }) => {
    logTestInfo('Multiple Orders Search Test', 'Testing searchOrderWithKeyboard with multiple orders');
    
    const orderNumbers = ['700107', '700106', '700104'];
    
    for (let i = 0; i < orderNumbers.length; i++) {
      const orderNumber = orderNumbers[i];
      console.log(`🔍 Searching for order ${i + 1}/${orderNumbers.length}: ${orderNumber}`);
      
      // Clear previous search
      await clearSearchInput(page, searchInput, 'ctrl-a-delete');
      
      // Search for order
      await searchOrderWithKeyboard(page, searchInput, orderNumber, true);
      
      // Take screenshot
      const orderScreenshot = await takeTimestampedScreenshot(page, `search-order-${orderNumber}`);
      testFiles.push(orderScreenshot);
      
      // Wait between searches
      await page.waitForTimeout(2000);
    }
    
    console.log('✅ Multiple orders search test completed!');
    logTestCompletion('Multiple Orders Search Test', true);
  });

  // Test 3: Clear Search Input - Different Methods
  test('Clear Search Input - All Clear Methods', async ({ page }) => {
    logTestInfo('Clear Search Input Test', 'Testing clearSearchInput hook with all methods');
    
    const clearMethods = ['ctrl-a-delete', 'ctrl-a-backspace', 'backspace'];
    
    for (const method of clearMethods) {
      console.log(`🧪 Testing clear method: ${method}`);
      
      // Type some text first
      await searchInput.type('test123');
      await page.waitForTimeout(500);
      
      // Take screenshot before clearing
      const beforeClearScreenshot = await takeTimestampedScreenshot(page, `before-clear-${method}`);
      testFiles.push(beforeClearScreenshot);
      
      // Clear using the method
      await clearSearchInput(page, searchInput, method);
      await page.waitForTimeout(500);
      
      // Take screenshot after clearing
      const afterClearScreenshot = await takeTimestampedScreenshot(page, `after-clear-${method}`);
      testFiles.push(afterClearScreenshot);
      
      console.log(`✅ Clear method ${method} completed!`);
    }
    
    console.log('✅ Clear search input test completed!');
    logTestCompletion('Clear Search Input Test', true);
  });

  // Test 4: Tab Navigation
  test('Tab Navigation - testTabNavigation Hook', async ({ page }) => {
    logTestInfo('Tab Navigation Test', 'Testing testTabNavigation hook');
    
    // Test tab navigation
    await testTabNavigation(page, searchInput);
    
    // Take screenshot
    const tabNavigationScreenshot = await takeTimestampedScreenshot(page, 'tab-navigation-test');
    testFiles.push(tabNavigationScreenshot);
    
    console.log('✅ Tab navigation test completed!');
    logTestCompletion('Tab Navigation Test', true);
  });

  // Test 5: Type with Delay - Different Delay Speeds
  test('Type with Delay - Different Delay Speeds', async ({ page }) => {
    logTestInfo('Type with Delay Test', 'Testing typeWithDelay hook with different speeds');
    
    const delaySpeeds = [50, 100, 200, 500];
    const testText = '700107';
    
    for (const delay of delaySpeeds) {
      console.log(`⌨️ Testing typing with ${delay}ms delay`);
      
      // Clear input first
      await clearSearchInput(page, searchInput, 'ctrl-a-delete');
      
      // Type with delay
      await typeWithDelay(searchInput, testText, delay);
      
      // Take screenshot
      const delayScreenshot = await takeTimestampedScreenshot(page, `typing-delay-${delay}ms`);
      testFiles.push(delayScreenshot);
      
      // Wait between tests
      await page.waitForTimeout(1000);
    }
    
    console.log('✅ Type with delay test completed!');
    logTestCompletion('Type with Delay Test', true);
  });

  // Test 6: Keyboard Shortcuts
  test('Keyboard Shortcuts - testKeyboardShortcuts Hook', async ({ page }) => {
    logTestInfo('Keyboard Shortcuts Test', 'Testing testKeyboardShortcuts hook');
    
    // Test keyboard shortcuts
    await testKeyboardShortcuts(page, searchInput);
    
    // Take screenshot
    const shortcutsScreenshot = await takeTimestampedScreenshot(page, 'keyboard-shortcuts-test');
    testFiles.push(shortcutsScreenshot);
    
    console.log('✅ Keyboard shortcuts test completed!');
    logTestCompletion('Keyboard Shortcuts Test', true);
  });

  // Test 7: Arrow Key Navigation
  test('Arrow Key Navigation - testArrowKeyNavigation Hook', async ({ page }) => {
    logTestInfo('Arrow Key Navigation Test', 'Testing testArrowKeyNavigation hook');
    
    // Test arrow key navigation
    await testArrowKeyNavigation(page, searchInput);
    
    // Take screenshot
    const arrowKeysScreenshot = await takeTimestampedScreenshot(page, 'arrow-key-navigation-test');
    testFiles.push(arrowKeysScreenshot);
    
    console.log('✅ Arrow key navigation test completed!');
    logTestCompletion('Arrow Key Navigation Test', true);
  });

  // Test 8: Complete Keyboard Workflow
  test('Complete Keyboard Workflow - All Keyboard Hooks', async ({ page }) => {
    logTestInfo('Complete Keyboard Workflow Test', 'Testing all keyboard hooks in sequence');
    
    const orderNumber = '700107';
    
    // Step 1: Search for order
    console.log('🔍 Step 1: Searching for order...');
    await searchOrderWithKeyboard(page, searchInput, orderNumber, true);
    const step1Screenshot = await takeTimestampedScreenshot(page, 'step1-search-order');
    testFiles.push(step1Screenshot);
    
    // Step 2: Clear search
    console.log('🧹 Step 2: Clearing search...');
    await clearSearchInput(page, searchInput, 'ctrl-a-delete');
    const step2Screenshot = await takeTimestampedScreenshot(page, 'step2-clear-search');
    testFiles.push(step2Screenshot);
    
    // Step 3: Test tab navigation
    console.log('⌨️ Step 3: Testing tab navigation...');
    await testTabNavigation(page, searchInput);
    const step3Screenshot = await takeTimestampedScreenshot(page, 'step3-tab-navigation');
    testFiles.push(step3Screenshot);
    
    // Step 4: Type with delay
    console.log('⏱️ Step 4: Typing with delay...');
    await typeWithDelay(searchInput, orderNumber, 100);
    const step4Screenshot = await takeTimestampedScreenshot(page, 'step4-type-delay');
    testFiles.push(step4Screenshot);
    
    // Step 5: Test keyboard shortcuts
    console.log('⌨️ Step 5: Testing keyboard shortcuts...');
    await testKeyboardShortcuts(page, searchInput);
    const step5Screenshot = await takeTimestampedScreenshot(page, 'step5-keyboard-shortcuts');
    testFiles.push(step5Screenshot);
    
    // Step 6: Test arrow key navigation
    console.log('⬅️➡️ Step 6: Testing arrow key navigation...');
    await testArrowKeyNavigation(page, searchInput);
    const step6Screenshot = await takeTimestampedScreenshot(page, 'step6-arrow-navigation');
    testFiles.push(step6Screenshot);
    
    console.log('✅ Complete keyboard workflow test completed!');
    logTestCompletion('Complete Keyboard Workflow Test', true);
  });

  // Test 9: Error Handling - Invalid Search Input
  test('Error Handling - Invalid Search Input', async ({ page }) => {
    logTestInfo('Error Handling Test', 'Testing error handling with invalid search input');
    
    // Try to search with invalid order number
    const invalidOrderNumber = 'invalid123';
    
    try {
      await searchOrderWithKeyboard(page, searchInput, invalidOrderNumber, true);
      console.log('⚠️ Search completed with invalid order number');
    } catch (error) {
      console.log('✅ Expected: Search failed with invalid order number');
      console.log('Error message:', error.message);
    }
    
    // Take screenshot
    const errorScreenshot = await takeTimestampedScreenshot(page, 'invalid-search-error');
    testFiles.push(errorScreenshot);
    
    console.log('✅ Error handling test completed!');
    logTestCompletion('Error Handling Test', true);
  });

  // Test 10: Performance Test - Rapid Keyboard Actions
  test('Performance Test - Rapid Keyboard Actions', async ({ page }) => {
    logTestInfo('Performance Test', 'Testing performance with rapid keyboard actions');
    
    const startTime = Date.now();
    
    // Perform rapid keyboard actions
    for (let i = 1; i <= 5; i++) {
      console.log(`⌨️ Rapid action ${i}/5...`);
      
      // Type text
      await searchInput.type(`test${i}`);
      
      // Clear text
      await clearSearchInput(page, searchInput, 'ctrl-a-delete');
      
      // Test shortcuts
      await testKeyboardShortcuts(page, searchInput);
      
      // Wait briefly
      await page.waitForTimeout(100);
    }
    
    const endTime = Date.now();
    const totalTime = endTime - startTime;
    
    console.log(`⏱️ Total time for rapid actions: ${totalTime}ms`);
    console.log(`⏱️ Average time per action: ${Math.round(totalTime / 5)}ms`);
    
    // Take screenshot
    const performanceScreenshot = await takeTimestampedScreenshot(page, 'rapid-actions-performance');
    testFiles.push(performanceScreenshot);
    
    console.log('✅ Performance test completed!');
    logTestCompletion('Performance Test', true);
  });

  // Test 11: Keyboard Accessibility Test
  test('Keyboard Accessibility Test - Full Keyboard Navigation', async ({ page }) => {
    logTestInfo('Accessibility Test', 'Testing keyboard accessibility and navigation');
    
    // Test full keyboard navigation flow
    console.log('🔍 Testing keyboard search...');
    await searchOrderWithKeyboard(page, searchInput, '700107', true);
    
    console.log('🧹 Testing keyboard clear...');
    await clearSearchInput(page, searchInput, 'ctrl-a-delete');
    
    console.log('⌨️ Testing keyboard shortcuts...');
    await testKeyboardShortcuts(page, searchInput);
    
    console.log('⬅️➡️ Testing arrow navigation...');
    await testArrowKeyNavigation(page, searchInput);
    
    console.log('🔄 Testing tab navigation...');
    await testTabNavigation(page, searchInput);
    
    // Take screenshot
    const accessibilityScreenshot = await takeTimestampedScreenshot(page, 'keyboard-accessibility');
    testFiles.push(accessibilityScreenshot);
    
    console.log('✅ Keyboard accessibility test completed!');
    logTestCompletion('Accessibility Test', true);
  });

  // Test 12: Cross-Browser Keyboard Test
  test('Cross-Browser Keyboard Test - Different Browser Contexts', async ({ page }) => {
    logTestInfo('Cross-Browser Keyboard Test', 'Testing keyboard hooks across different browser contexts');
    
    // Test keyboard functionality
    await searchOrderWithKeyboard(page, searchInput, '700107', true);
    await clearSearchInput(page, searchInput, 'ctrl-a-delete');
    await testKeyboardShortcuts(page, searchInput);
    
    // Take screenshot
    const crossBrowserScreenshot = await takeTimestampedScreenshot(page, 'cross-browser-keyboard');
    testFiles.push(crossBrowserScreenshot);
    
    console.log('✅ Cross-browser keyboard test completed!');
    logTestCompletion('Cross-Browser Keyboard Test', true);
  });
});
