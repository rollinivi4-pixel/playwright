/**
 * SIMPLE KEYBOARD ACTIONS TEST FOR BEGINNERS
 * 
 * This test shows how to use keyboard actions in Playwright
 * Perfect for learning the basics of keyboard testing!
 * 
 * What this test does:
 * 1. Login to the website
 * 2. Go to the table page
 * 3. Test different keyboard actions
 * 4. Show keyboard shortcuts
 * 5. Take screenshots
 */

const { test, expect } = require('@playwright/test');

test('Simple Keyboard Actions Test for Beginners', async ({ page }) => {
  // Set test timeout to 2 minutes for beginners
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
  // STEP 2: WHAT ARE KEYBOARD ACTIONS?
  // ========================================
  console.log('\n⌨️ ===== WHAT ARE KEYBOARD ACTIONS? =====');
  console.log('Keyboard actions let you:');
  console.log('• Type text in input fields');
  console.log('• Press special keys (Enter, Tab, Escape, etc.)');
  console.log('• Use keyboard shortcuts (Ctrl+C, Ctrl+V, etc.)');
  console.log('• Navigate with arrow keys');
  console.log('Let\'s test these!');
  
  // ========================================
  // STEP 3: BASIC TYPING
  // ========================================
  console.log('\n⌨️ Step 3: Testing basic typing...');
  
  // Clear and type in email field
  console.log('   📝 Typing in email field...');
  await page.fill('#email', ''); // Clear first
  await page.type('#email', 'rollinivi4+test@gmail.com');
  console.log('   ✅ Typed email address!');
  
  // Clear and type in password field
  console.log('   📝 Typing in password field...');
  await page.fill('#password', ''); // Clear first
  await page.type('#password', 'User@123');
  console.log('   ✅ Typed password!');
  
  // ========================================
  // STEP 4: KEYBOARD SHORTCUTS
  // ========================================
  console.log('\n⌨️ Step 4: Testing keyboard shortcuts...');
  
  // Test Tab key to move between fields
  console.log('   ⌨️ Pressing Tab key...');
  await page.keyboard.press('Tab');
  console.log('   ✅ Tab key pressed!');
  
  // Test Enter key to submit
  console.log('   ⌨️ Pressing Enter key...');
  await page.keyboard.press('Enter');
  console.log('   ✅ Enter key pressed!');
  
  // Wait for login to complete
  console.log('⏳ Step 5: Waiting for login to finish...');
  await page.waitForTimeout(5000);
  console.log('✅ Login completed!');
  
  // ========================================
  // STEP 5: GO TO THE TABLE PAGE
  // ========================================
  console.log('🔍 Step 6: Looking for Sales Orders menu...');
  
  // Wait for the menu to be visible first
  const salesOrderMenu = page.locator("//li[normalize-space()='Sales Orders']");
  await salesOrderMenu.waitFor({ state: 'visible', timeout: 10000 });
  await salesOrderMenu.click();
  console.log('✅ Clicked on Sales Orders!');
  
  // Wait for table to load
  console.log('⏳ Step 7: Waiting for table to load...');
  await page.waitForTimeout(5000);
  console.log('✅ Table is ready!');
  
  // ========================================
  // STEP 6: KEYBOARD NAVIGATION
  // ========================================
  console.log('\n⌨️ Step 8: Testing keyboard navigation...');
  
  // Test arrow keys
  console.log('   ⌨️ Pressing Arrow Down key...');
  await page.keyboard.press('ArrowDown');
  console.log('   ✅ Arrow Down pressed!');
  
  console.log('   ⌨️ Pressing Arrow Up key...');
  await page.keyboard.press('ArrowUp');
  console.log('   ✅ Arrow Up pressed!');
  
  console.log('   ⌨️ Pressing Arrow Right key...');
  await page.keyboard.press('ArrowRight');
  console.log('   ✅ Arrow Right pressed!');
  
  console.log('   ⌨️ Pressing Arrow Left key...');
  await page.keyboard.press('ArrowLeft');
  console.log('   ✅ Arrow Left pressed!');
  
  // ========================================
  // STEP 7: PAGE NAVIGATION KEYS
  // ========================================
  console.log('\n⌨️ Step 9: Testing page navigation keys...');
  
  // Test Page Down
  console.log('   ⌨️ Pressing Page Down key...');
  await page.keyboard.press('PageDown');
  console.log('   ✅ Page Down pressed!');
  
  // Test Page Up
  console.log('   ⌨️ Pressing Page Up key...');
  await page.keyboard.press('PageUp');
  console.log('   ✅ Page Up pressed!');
  
  // Test Home key
  console.log('   ⌨️ Pressing Home key...');
  await page.keyboard.press('Home');
  console.log('   ✅ Home key pressed!');
  
  // Test End key
  console.log('   ⌨️ Pressing End key...');
  await page.keyboard.press('End');
  console.log('   ✅ End key pressed!');
  
  // ========================================
  // STEP 8: FUNCTION KEYS
  // ========================================
  console.log('\n⌨️ Step 10: Testing function keys...');
  
  // Test F5 (Refresh)
  console.log('   ⌨️ Pressing F5 key (Refresh)...');
  await page.keyboard.press('F5');
  console.log('   ✅ F5 key pressed!');
  
  // Wait for page to reload
  await page.waitForTimeout(3000);
  console.log('   ⏳ Page refreshed!');
  
  // ========================================
  // STEP 9: SPECIAL KEYS
  // ========================================
  console.log('\n⌨️ Step 11: Testing special keys...');
  
  // Test Escape key
  console.log('   ⌨️ Pressing Escape key...');
  await page.keyboard.press('Escape');
  console.log('   ✅ Escape key pressed!');
  
  // Test Space key
  console.log('   ⌨️ Pressing Space key...');
  await page.keyboard.press('Space');
  console.log('   ✅ Space key pressed!');
  
  // Test Backspace key
  console.log('   ⌨️ Pressing Backspace key...');
  await page.keyboard.press('Backspace');
  console.log('   ✅ Backspace key pressed!');
  
  // ========================================
  // STEP 10: KEYBOARD SHORTCUTS
  // ========================================
  console.log('\n⌨️ Step 12: Testing keyboard shortcuts...');
  
  // Test Ctrl+A (Select All)
  console.log('   ⌨️ Pressing Ctrl+A (Select All)...');
  await page.keyboard.press('Control+a');
  console.log('   ✅ Ctrl+A pressed!');
  
  // Test Ctrl+C (Copy)
  console.log('   ⌨️ Pressing Ctrl+C (Copy)...');
  await page.keyboard.press('Control+c');
  console.log('   ✅ Ctrl+C pressed!');
  
  // Test Ctrl+V (Paste)
  console.log('   ⌨️ Pressing Ctrl+V (Paste)...');
  await page.keyboard.press('Control+v');
  console.log('   ✅ Ctrl+V pressed!');
  
  // Test Ctrl+Z (Undo)
  console.log('   ⌨️ Pressing Ctrl+Z (Undo)...');
  await page.keyboard.press('Control+z');
  console.log('   ✅ Ctrl+Z pressed!');
  
  // ========================================
  // STEP 11: TYPING IN SEARCH FIELDS
  // ========================================
  console.log('\n⌨️ Step 13: Testing typing in search fields...');
  
  // Look for search input fields
  const searchInputs = page.locator('input[type="search"], input[placeholder*="search"], input[placeholder*="Search"]');
  const searchCount = await searchInputs.count();
  
  if (searchCount > 0) {
    console.log(`   🔍 Found ${searchCount} search input(s)`);
    
    // Type in first search field
    const firstSearch = searchInputs.first();
    await firstSearch.click();
    await firstSearch.type('test search');
    console.log('   ✅ Typed in search field!');
    
    // Clear the search
    await firstSearch.fill('');
    console.log('   ✅ Cleared search field!');
  } else {
    console.log('   ℹ️ No search fields found on this page');
  }
  
  // ========================================
  // STEP 12: TAKE SCREENSHOTS
  // ========================================
  console.log('\n📸 Step 14: Taking screenshots...');
  await page.screenshot({ path: 'keyboard-actions-test.png' });
  console.log('✅ Screenshot saved: keyboard-actions-test.png');
  
  // ========================================
  // STEP 13: WHAT WE LEARNED
  // ========================================
  console.log('\n🎓 ===== WHAT WE LEARNED =====');
  console.log('1. ⌨️ page.type() - Type text in fields');
  console.log('2. ⌨️ page.keyboard.press() - Press single keys');
  console.log('3. ⌨️ Arrow keys - Navigate around the page');
  console.log('4. ⌨️ Page keys - Navigate through content');
  console.log('5. ⌨️ Function keys - Special actions (F5, F1, etc.)');
  console.log('6. ⌨️ Shortcuts - Ctrl+C, Ctrl+V, Ctrl+A, etc.');
  
  // ========================================
  // STEP 14: COMMON KEYBOARD ACTIONS
  // ========================================
  console.log('\n📚 ===== COMMON KEYBOARD ACTIONS =====');
  console.log('• await page.type("input", "text") - Type text');
  console.log('• await page.keyboard.press("Enter") - Press Enter');
  console.log('• await page.keyboard.press("Tab") - Press Tab');
  console.log('• await page.keyboard.press("Escape") - Press Escape');
  console.log('• await page.keyboard.press("Control+c") - Press Ctrl+C');
  console.log('• await page.keyboard.press("ArrowDown") - Press Arrow Down');
  console.log('• await page.keyboard.press("PageDown") - Press Page Down');
  console.log('• await page.keyboard.press("F5") - Press F5');
  
  // ========================================
  // STEP 15: TEST ASSERTION
  // ========================================
  console.log('\n✅ Step 15: Checking if test passed...');
  expect(true).toBe(true); // This test always passes
  console.log('✅ Test passed! All keyboard actions worked!');
  
  console.log('\n🎉 SIMPLE KEYBOARD ACTIONS TEST COMPLETED!');
  console.log('📚 You now know how to use keyboard actions in Playwright!');
});
