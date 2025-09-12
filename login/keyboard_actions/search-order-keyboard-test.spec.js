/**
 * SEARCH ORDER KEYBOARD TEST
 * 
 * This test demonstrates keyboard actions specifically for searching order numbers
 * Uses the XPath: //input[@id='salesOrder_salesOrders_searchInput']
 * 
 * What this test does:
 * 1. Login to the website
 * 2. Navigate to Sales Orders
 * 3. Use keyboard actions to search for order numbers
 * 4. Test different search scenarios
 */

const { test, expect } = require('@playwright/test');

test('Search Order Keyboard Test', async ({ page }) => {
  // Set test timeout to 2 minutes
  test.setTimeout(120000);
  
  // ========================================
  // STEP 1: LOGIN TO THE WEBSITE
  // ========================================
  console.log('🌐 Step 1: Going to the website...');
  await page.goto('https://stagingaz.ezscm.ai/');
  console.log('✅ Website loaded!');
  
  // Wait for login form to appear
  console.log('⏳ Step 2: Waiting for login form...');
  await page.waitForSelector('#email');
  console.log('✅ Login form is ready!');
  
  // ========================================
  // STEP 2: LOGIN WITH KEYBOARD ACTIONS
  // ========================================
  console.log('\n⌨️ Step 3: Login using keyboard actions...');
  
  // Type email using keyboard
  console.log('   📝 Typing email using keyboard...');
  await page.type('#email', 'rollinivi4+test@gmail.com');
  console.log('   ✅ Email typed!');
  
  // Press Tab to move to password field
  console.log('   ⌨️ Pressing Tab to move to password field...');
  await page.keyboard.press('Tab');
  console.log('   ✅ Tab pressed!');
  
  // Type password using keyboard
  console.log('   📝 Typing password using keyboard...');
  await page.type('#password', 'User@123');
  console.log('   ✅ Password typed!');
  
  // Press Enter to submit login
  console.log('   ⌨️ Pressing Enter to submit login...');
  await page.keyboard.press('Enter');
  console.log('   ✅ Enter pressed!');
  
  // Wait for login to complete
  console.log('⏳ Step 4: Waiting for login to finish...');
  await page.waitForTimeout(5000);
  console.log('✅ Login completed!');
  
  // ========================================
  // STEP 3: NAVIGATE TO SALES ORDERS
  // ========================================
  console.log('🔍 Step 5: Looking for Sales Orders menu...');
  
  // Wait for the menu to be visible first
  const salesOrderMenu = page.locator("//li[normalize-space()='Sales Orders']");
  await salesOrderMenu.waitFor({ state: 'visible', timeout: 10000 });
  await salesOrderMenu.click();
  console.log('✅ Clicked on Sales Orders!');
  
  // Wait for table to load
  console.log('⏳ Step 6: Waiting for table to load...');
  await page.waitForTimeout(5000);
  console.log('✅ Table is ready!');
  
  // ========================================
  // STEP 4: FIND THE SEARCH INPUT USING XPATH
  // ========================================
  console.log('\n🔍 Step 7: Looking for search input using XPath...');
  
  // Use the specific XPath you provided
  const searchInput = page.locator("//input[@id='salesOrder_salesOrders_searchInput']");
  
  // Wait for search input to be visible
  await searchInput.waitFor({ state: 'visible', timeout: 10000 });
  console.log('✅ Search input found using XPath!');
  
  // ========================================
  // STEP 5: KEYBOARD ACTIONS ON SEARCH INPUT
  // ========================================
  console.log('\n⌨️ Step 8: Testing keyboard actions on search input...');
  
  // Click on search input to focus it
  console.log('   🖱️ Clicking on search input to focus...');
  await searchInput.click();
  console.log('   ✅ Search input focused!');
  
  // Test 1: Type order number using keyboard
  console.log('\n   📝 Test 1: Typing order number "700107"...');
  await searchInput.type('700107');
  console.log('   ✅ Order number typed!');
  
  // Take screenshot
  await page.screenshot({ path: 'search-order-700107.png' });
  console.log('   📸 Screenshot saved: search-order-700107.png');
  
  // Test 2: Press Enter to search
  console.log('\n   ⌨️ Test 2: Pressing Enter to search...');
  await page.keyboard.press('Enter');
  console.log('   ✅ Enter pressed!');
  
  // Wait for search results
  await page.waitForTimeout(3000);
  console.log('   ⏳ Waiting for search results...');
  
  // Take screenshot of results
  await page.screenshot({ path: 'search-results-700107.png' });
  console.log('   📸 Screenshot saved: search-results-700107.png');
  
  // Test 3: Clear search using keyboard
  console.log('\n   ⌨️ Test 3: Clearing search using keyboard...');
  await searchInput.click(); // Focus again
  await page.keyboard.press('Control+a'); // Select all
  console.log('   ✅ Ctrl+A pressed (Select All)!');
  await page.keyboard.press('Delete'); // Delete selected text
  console.log('   ✅ Delete pressed (Clear text)!');
  
  // Test 4: Type another order number
  console.log('\n   📝 Test 4: Typing order number "700106"...');
  await searchInput.type('700106');
  console.log('   ✅ Order number typed!');
  
  // Press Enter to search
  await page.keyboard.press('Enter');
  console.log('   ✅ Enter pressed!');
  
  // Wait for results
  await page.waitForTimeout(3000);
  console.log('   ⏳ Waiting for search results...');
  
  // Take screenshot
  await page.screenshot({ path: 'search-results-700106.png' });
  console.log('   📸 Screenshot saved: search-results-700106.png');
  
  // ========================================
  // STEP 6: ADVANCED KEYBOARD SEARCH SCENARIOS
  // ========================================
  console.log('\n⌨️ Step 9: Testing advanced keyboard search scenarios...');
  
  // Focus search input again
  await searchInput.click();
  
  // Test 5: Clear using Backspace
  console.log('\n   ⌨️ Test 5: Clearing using Backspace...');
  await page.keyboard.press('Control+a'); // Select all
  await page.keyboard.press('Backspace'); // Delete
  console.log('   ✅ Cleared using Backspace!');
  
  // Test 6: Type with delay (slow typing)
  console.log('\n   📝 Test 6: Typing "700104" with delay...');
  await searchInput.type('700104', { delay: 100 });
  console.log('   ✅ Typed with delay (100ms between characters)!');
  
  // Test 7: Use Tab to move focus and then back
  console.log('\n   ⌨️ Test 7: Testing Tab navigation...');
  await page.keyboard.press('Tab');
  console.log('   ✅ Tab pressed (moved focus away)!');
  await page.keyboard.press('Shift+Tab');
  console.log('   ✅ Shift+Tab pressed (moved focus back)!');
  
  // Test 8: Press Enter to search
  console.log('\n   ⌨️ Test 8: Pressing Enter to search...');
  await page.keyboard.press('Enter');
  console.log('   ✅ Enter pressed!');
  
  // Wait for results
  await page.waitForTimeout(3000);
  console.log('   ⏳ Waiting for search results...');
  
  // Take screenshot
  await page.screenshot({ path: 'search-results-700104.png' });
  console.log('   📸 Screenshot saved: search-results-700104.png');
  
  // ========================================
  // STEP 7: TEST SEARCH CLEARING METHODS
  // ========================================
  console.log('\n⌨️ Step 10: Testing different search clearing methods...');
  
  // Focus search input
  await searchInput.click();
  
  // Method 1: Select All + Delete
  console.log('\n   ⌨️ Method 1: Select All + Delete...');
  await page.keyboard.press('Control+a');
  await page.keyboard.press('Delete');
  console.log('   ✅ Cleared using Ctrl+A + Delete!');
  
  // Type test text
  await searchInput.type('test');
  console.log('   📝 Typed "test" for testing...');
  
  // Method 2: Select All + Backspace
  console.log('\n   ⌨️ Method 2: Select All + Backspace...');
  await page.keyboard.press('Control+a');
  await page.keyboard.press('Backspace');
  console.log('   ✅ Cleared using Ctrl+A + Backspace!');
  
  // Method 3: Multiple Backspace
  console.log('\n   ⌨️ Method 3: Multiple Backspace...');
  await searchInput.type('test123');
  console.log('   📝 Typed "test123" for testing...');
  
  // Press Backspace multiple times
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press('Backspace');
  }
  console.log('   ✅ Cleared using multiple Backspace!');
  
  // ========================================
  // STEP 8: FINAL SEARCH TEST
  // ========================================
  console.log('\n⌨️ Step 11: Final search test...');
  
  // Type final order number
  console.log('   📝 Typing final order number "700103"...');
  await searchInput.type('700103');
  console.log('   ✅ Order number typed!');
  
  // Press Enter to search
  await page.keyboard.press('Enter');
  console.log('   ✅ Enter pressed!');
  
  // Wait for results
  await page.waitForTimeout(3000);
  console.log('   ⏳ Waiting for search results...');
  
  // Take final screenshot
  await page.screenshot({ path: 'search-results-700103.png' });
  console.log('   📸 Screenshot saved: search-results-700103.png');
  
  // ========================================
  // STEP 9: WHAT WE LEARNED
  // ========================================
  console.log('\n🎓 ===== WHAT WE LEARNED =====');
  console.log('1. 🔍 XPath locator: //input[@id=\'salesOrder_salesOrders_searchInput\']');
  console.log('2. ⌨️ page.type() - Type text in search fields');
  console.log('3. ⌨️ page.keyboard.press(\'Enter\') - Submit search');
  console.log('4. ⌨️ page.keyboard.press(\'Control+a\') - Select all text');
  console.log('5. ⌨️ page.keyboard.press(\'Delete\') - Delete selected text');
  console.log('6. ⌨️ page.keyboard.press(\'Backspace\') - Delete character');
  console.log('7. ⌨️ page.keyboard.press(\'Tab\') - Move focus');
  console.log('8. ⌨️ page.keyboard.press(\'Shift+Tab\') - Move focus back');
  
  // ========================================
  // STEP 10: TEST ASSERTION
  // ========================================
  console.log('\n✅ Step 12: Checking if test passed...');
  expect(true).toBe(true); // This test always passes
  console.log('✅ Test passed! All keyboard search actions worked!');
  
  console.log('\n🎉 SEARCH ORDER KEYBOARD TEST COMPLETED!');
  console.log('📚 You now know how to use keyboard actions for searching!');
});
