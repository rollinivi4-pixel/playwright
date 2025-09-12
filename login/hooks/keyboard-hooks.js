/**
 * KEYBOARD HOOKS
 * 
 * This file contains reusable keyboard functionality that can be used across multiple tests
 * These hooks help with common keyboard actions and search operations
 */

/**
 * Search for an order number using keyboard actions
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {import('@playwright/test').Locator} searchInput - Search input locator
 * @param {string} orderNumber - Order number to search for
 * @param {boolean} takeScreenshot - Whether to take screenshot (default: true)
 */
async function searchOrderWithKeyboard(page, searchInput, orderNumber, takeScreenshot = true) {
  console.log(`📝 Searching for order number "${orderNumber}"...`);
  
  // Click on search input to focus it
  await searchInput.click();
  console.log('   ✅ Search input focused!');
  
  // Type order number using keyboard
  await searchInput.type(orderNumber);
  console.log('   ✅ Order number typed!');
  
  // Take screenshot if requested
  if (takeScreenshot) {
    await page.screenshot({ path: `search-order-${orderNumber}.png` });
    console.log(`   📸 Screenshot saved: search-order-${orderNumber}.png`);
  }
  
  // Press Enter to search
  console.log('   ⌨️ Pressing Enter to search...');
  await page.keyboard.press('Enter');
  console.log('   ✅ Enter pressed!');
  
  // Wait for search results
  await page.waitForTimeout(3000);
  console.log('   ⏳ Waiting for search results...');
  
  // Take screenshot of results if requested
  if (takeScreenshot) {
    await page.screenshot({ path: `search-results-${orderNumber}.png` });
    console.log(`   📸 Screenshot saved: search-results-${orderNumber}.png`);
  }
}

/**
 * Clear search input using different keyboard methods
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {import('@playwright/test').Locator} searchInput - Search input locator
 * @param {string} method - Method to use: 'ctrl-a-delete', 'ctrl-a-backspace', 'backspace'
 */
async function clearSearchInput(page, searchInput, method = 'ctrl-a-delete') {
  console.log(`⌨️ Clearing search input using method: ${method}...`);
  
  // Focus search input
  await searchInput.click();
  
  switch (method) {
    case 'ctrl-a-delete':
      await page.keyboard.press('Control+a');
      await page.keyboard.press('Delete');
      console.log('   ✅ Cleared using Ctrl+A + Delete!');
      break;
      
    case 'ctrl-a-backspace':
      await page.keyboard.press('Control+a');
      await page.keyboard.press('Backspace');
      console.log('   ✅ Cleared using Ctrl+A + Backspace!');
      break;
      
    case 'backspace':
      // Type some test text first
      await searchInput.type('test123');
      console.log('   📝 Typed "test123" for testing...');
      
      // Press Backspace multiple times
      for (let i = 0; i < 6; i++) {
        await page.keyboard.press('Backspace');
      }
      console.log('   ✅ Cleared using multiple Backspace!');
      break;
      
    default:
      console.log('   ⚠️ Unknown method, using default (ctrl-a-delete)');
      await page.keyboard.press('Control+a');
      await page.keyboard.press('Delete');
      console.log('   ✅ Cleared using default method!');
  }
}

/**
 * Test Tab navigation on search input
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {import('@playwright/test').Locator} searchInput - Search input locator
 */
async function testTabNavigation(page, searchInput) {
  console.log('⌨️ Testing Tab navigation...');
  
  // Focus search input
  await searchInput.click();
  
  // Press Tab to move focus away
  await page.keyboard.press('Tab');
  console.log('   ✅ Tab pressed (moved focus away)!');
  
  // Press Shift+Tab to move focus back
  await page.keyboard.press('Shift+Tab');
  console.log('   ✅ Shift+Tab pressed (moved focus back)!');
}

/**
 * Type text with delay (slow typing simulation)
 * @param {import('@playwright/test').Locator} searchInput - Search input locator
 * @param {string} text - Text to type
 * @param {number} delay - Delay between characters in milliseconds
 */
async function typeWithDelay(searchInput, text, delay = 100) {
  console.log(`📝 Typing "${text}" with delay (${delay}ms between characters)...`);
  await searchInput.type(text, { delay });
  console.log(`   ✅ Typed with delay (${delay}ms between characters)!`);
}

/**
 * Test different keyboard shortcuts
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {import('@playwright/test').Locator} searchInput - Search input locator
 */
async function testKeyboardShortcuts(page, searchInput) {
  console.log('⌨️ Testing keyboard shortcuts...');
  
  // Focus search input
  await searchInput.click();
  
  // Type some text
  await searchInput.type('test text');
  console.log('   📝 Typed "test text" for testing...');
  
  // Test Ctrl+A (Select All)
  await page.keyboard.press('Control+a');
  console.log('   ✅ Ctrl+A pressed (Select All)!');
  
  // Test Ctrl+C (Copy) - won't work in test environment but demonstrates the action
  await page.keyboard.press('Control+c');
  console.log('   ✅ Ctrl+C pressed (Copy)!');
  
  // Test Ctrl+V (Paste) - won't work in test environment but demonstrates the action
  await page.keyboard.press('Control+v');
  console.log('   ✅ Ctrl+V pressed (Paste)!');
  
  // Test Ctrl+Z (Undo) - won't work in test environment but demonstrates the action
  await page.keyboard.press('Control+z');
  console.log('   ✅ Ctrl+Z pressed (Undo)!');
}

/**
 * Test arrow key navigation
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {import('@playwright/test').Locator} searchInput - Search input locator
 */
async function testArrowKeyNavigation(page, searchInput) {
  console.log('⌨️ Testing arrow key navigation...');
  
  // Focus search input
  await searchInput.click();
  
  // Type some text
  await searchInput.type('test text');
  console.log('   📝 Typed "test text" for testing...');
  
  // Test Home key (move to beginning)
  await page.keyboard.press('Home');
  console.log('   ✅ Home key pressed (moved to beginning)!');
  
  // Test End key (move to end)
  await page.keyboard.press('End');
  console.log('   ✅ End key pressed (moved to end)!');
  
  // Test Left Arrow
  await page.keyboard.press('ArrowLeft');
  console.log('   ✅ Left Arrow pressed!');
  
  // Test Right Arrow
  await page.keyboard.press('ArrowRight');
  console.log('   ✅ Right Arrow pressed!');
}

module.exports = {
  searchOrderWithKeyboard,
  clearSearchInput,
  testTabNavigation,
  typeWithDelay,
  testKeyboardShortcuts,
  testArrowKeyNavigation
};
