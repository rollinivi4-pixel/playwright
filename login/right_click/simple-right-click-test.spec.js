/**
 * SIMPLE RIGHT-CLICK TEST FOR BEGINNERS
 * 
 * This test shows how to use right-click actions in Playwright
 * Perfect for learning the basics of right-click testing!
 * 
 * What this test does:
 * 1. Login to the website
 * 2. Go to the table page
 * 3. Find order numbers
 * 4. Right-click on them
 * 5. Take screenshots
 */

const { test, expect } = require('@playwright/test');

test('Simple Right-Click Test for Beginners', async ({ page }) => {
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
  
  // Fill in username and password
  console.log('📝 Step 3: Filling login details...');
  await page.fill('#email', 'rollinivi4+test@gmail.com');
  await page.fill('#password', 'User@123');
  console.log('✅ Login details filled!');
  
  // Click login button
  console.log('🔐 Step 4: Clicking login button...');
  await page.click('button[type="submit"]');
  console.log('✅ Login button clicked!');
  
  // Wait for login to complete
  console.log('⏳ Step 5: Waiting for login to finish...');
  await page.waitForTimeout(5000);
  console.log('✅ Login completed!');
  
  // ========================================
  // STEP 2: GO TO THE TABLE PAGE
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
  // STEP 3: WHAT IS RIGHT-CLICK?
  // ========================================
  console.log('\n🖱️ ===== WHAT IS RIGHT-CLICK? =====');
  console.log('Right-click means clicking the right mouse button');
  console.log('This usually shows a context menu with options like:');
  console.log('• Copy, Paste, Cut');
  console.log('• Edit, Delete, Rename');
  console.log('• View Details, Properties');
  console.log('Let\'s test this on our table!');
  
  // ========================================
  // STEP 4: FIND ORDER NUMBERS TO TEST
  // ========================================
  console.log('\n📋 Step 8: Order numbers we want to right-click:');
  const orderNumbers = ["700107", "700106", "700104", "700103"];
  orderNumbers.forEach((order, index) => {
    console.log(`   ${index + 1}. ${order}`);
  });
  
  // ========================================
  // STEP 5: HOW TO RIGHT-CLICK IN PLAYWRIGHT
  // ========================================
  console.log('\n🖱️ ===== HOW TO RIGHT-CLICK IN PLAYWRIGHT =====');
  console.log('To right-click on an element, use:');
  console.log('await page.click("selector", { button: "right" })');
  console.log('Example: await page.click("button", { button: "right" })');
  
  // Function to test right-click on one order
  async function testRightClickOnOrder(orderNumber) {
    console.log(`\n🖱️ Testing right-click on order: ${orderNumber}`);
    
    try {
      // Step 1: Find the order number in the table
      console.log(`   🔍 Looking for order ${orderNumber}...`);
      const orderCell = page.locator(`td:has-text("${orderNumber}")`);
      const found = await orderCell.isVisible();
      
      if (!found) {
        console.log(`   ❌ Order ${orderNumber} not found`);
        return false;
      }
      
      console.log(`   ✅ Order ${orderNumber} found!`);
      
      // Step 2: Right-click on the order number
      console.log(`   🖱️ Right-clicking on order number...`);
      await orderCell.click({ button: 'right' });
      console.log(`   ✅ Right-clicked on order number!`);
      
      // Step 3: Take a screenshot
      console.log(`   📸 Taking screenshot...`);
      await page.screenshot({ path: `right-click-${orderNumber}.png` });
      console.log(`   ✅ Screenshot saved: right-click-${orderNumber}.png`);
      
      // Step 4: Find the entire row
      console.log(`   🔍 Finding the entire row...`);
      const row = page.locator(`tr:has(td:has-text("${orderNumber}"))`);
      
      // Step 5: Right-click on the entire row
      console.log(`   🖱️ Right-clicking on entire row...`);
      await row.click({ button: 'right' });
      console.log(`   ✅ Right-clicked on entire row!`);
      
      // Step 6: Take another screenshot
      console.log(`   📸 Taking row screenshot...`);
      await page.screenshot({ path: `right-click-${orderNumber}-row.png` });
      console.log(`   ✅ Row screenshot saved!`);
      
      // Step 7: Check if any context menu appeared
      console.log(`   🔍 Checking for context menu...`);
      
      // Common context menu selectors
      const contextMenuSelectors = [
        '.context-menu',
        '.dropdown-menu',
        '.right-click-menu',
        '[role="menu"]',
        '.menu',
        '.popup-menu'
      ];
      
      let menuFound = false;
      for (const selector of contextMenuSelectors) {
        const menu = page.locator(selector);
        if (await menu.isVisible()) {
          console.log(`   ✨ Found context menu: ${selector}`);
          const menuText = await menu.textContent();
          console.log(`   📝 Menu content: ${menuText}`);
          menuFound = true;
          
          // Take screenshot of the menu
          await page.screenshot({ path: `right-click-${orderNumber}-menu.png` });
          console.log(`   📸 Menu screenshot saved!`);
          break;
        }
      }
      
      if (!menuFound) {
        console.log(`   ℹ️ No context menu appeared (this is normal for some elements)`);
      }
      
      // Step 8: Click somewhere else to close any menu
      console.log(`   🖱️ Clicking elsewhere to close menu...`);
      await page.click('body', { position: { x: 10, y: 10 } });
      console.log(`   ✅ Clicked elsewhere!`);
      
      // Step 9: Get row information
      console.log(`   📊 Getting row information...`);
      const rowData = await row.locator('td').allTextContents();
      console.log(`   📋 Row data:`, rowData);
      
      console.log(`   🎉 Right-click test completed for order ${orderNumber}!`);
      return true;
      
    } catch (error) {
      console.log(`   ❌ Error testing order ${orderNumber}: ${error.message}`);
      return false;
    }
  }
  
  // ========================================
  // STEP 6: TEST RIGHT-CLICK ON ALL ORDERS
  // ========================================
  console.log('\n🚀 Step 9: Testing right-click on all orders...');
  
  let successCount = 0;
  let totalCount = orderNumbers.length;
  
  for (const orderNumber of orderNumbers) {
    const success = await testRightClickOnOrder(orderNumber);
    if (success) {
      successCount++;
    }
    console.log('---'); // Separator between orders
  }
  
  // ========================================
  // STEP 7: SHOW RESULTS
  // ========================================
  console.log('\n📊 ===== RIGHT-CLICK TEST RESULTS =====');
  console.log(`✅ Successful right-click tests: ${successCount}`);
  console.log(`❌ Failed right-click tests: ${totalCount - successCount}`);
  console.log(`📈 Success rate: ${Math.round((successCount / totalCount) * 100)}%`);
  
  // ========================================
  // STEP 8: WHAT WE LEARNED
  // ========================================
  console.log('\n🎓 ===== WHAT WE LEARNED =====');
  console.log('1. 🖱️ Right-click uses the right mouse button');
  console.log('2. 📝 Use { button: "right" } option in Playwright');
  console.log('3. 📸 Screenshots help us see what happened');
  console.log('4. 🔍 We can check for context menus');
  console.log('5. 📊 We can get data from table rows');
  
  // ========================================
  // STEP 9: COMMON RIGHT-CLICK SELECTORS
  // ========================================
  console.log('\n📚 ===== COMMON RIGHT-CLICK SELECTORS =====');
  console.log('• await page.click("button", { button: "right" }) - Right-click button');
  console.log('• await page.click("#id", { button: "right" }) - Right-click element with ID');
  console.log('• await page.click(".class", { button: "right" }) - Right-click element with class');
  console.log('• await page.click("text=Hello", { button: "right" }) - Right-click text "Hello"');
  console.log('• await page.click("td:has-text(\'700107\')", { button: "right" }) - Right-click cell');
  
  // ========================================
  // STEP 10: TEST ASSERTION
  // ========================================
  console.log('\n✅ Step 10: Checking if test passed...');
  expect(successCount).toBeGreaterThan(0);
  console.log('✅ Test passed! At least one right-click action worked!');
  
  // Final screenshot
  await page.screenshot({ path: 'right-click-test-complete.png' });
  console.log('📸 Final screenshot saved: right-click-test-complete.png');
  
  console.log('\n🎉 SIMPLE RIGHT-CLICK TEST COMPLETED!');
  console.log('📚 You now know how to use right-click in Playwright!');
});
