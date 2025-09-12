/**
 * SIMPLE HOVER TEST FOR BEGINNERS
 * 
 * This test shows how to use mouse hover actions in Playwright
 * Perfect for learning the basics of hover testing!
 * 
 * What this test does:
 * 1. Login to the website
 * 2. Go to the table page
 * 3. Find order numbers
 * 4. Hover over them with the mouse
 * 5. Take screenshots
 */

const { test, expect } = require('@playwright/test');

test('Simple Hover Test for Beginners', async ({ page }) => {
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
  // STEP 3: WHAT IS MOUSE HOVER?
  // ========================================
  console.log('\n🖱️ ===== WHAT IS MOUSE HOVER? =====');
  console.log('Mouse hover means moving your mouse over an element');
  console.log('without clicking it. This can show tooltips, highlights,');
  console.log('or other effects. Let\'s test this!');
  
  // ========================================
  // STEP 4: FIND ORDER NUMBERS TO TEST
  // ========================================
  console.log('\n📋 Step 8: Order numbers we want to test:');
  const orderNumbers = ["700107", "700106", "700104", "700103"];
  orderNumbers.forEach((order, index) => {
    console.log(`   ${index + 1}. ${order}`);
  });
  
  // ========================================
  // STEP 5: SIMPLE HOVER FUNCTION
  // ========================================
  console.log('\n🖱️ ===== HOW TO HOVER IN PLAYWRIGHT =====');
  console.log('To hover over an element, use: await page.hover("selector")');
  console.log('Example: await page.hover("button") - hovers over a button');
  
  // Function to test hover on one order
  async function testHoverOnOrder(orderNumber) {
    console.log(`\n🖱️ Testing hover on order: ${orderNumber}`);
    
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
      
      // Step 2: Hover over the order number
      console.log(`   🖱️ Hovering over order number...`);
      await orderCell.hover();
      console.log(`   ✅ Hovered over order number!`);
      
      // Step 3: Take a screenshot
      console.log(`   📸 Taking screenshot...`);
      await page.screenshot({ path: `simple-hover-${orderNumber}.png` });
      console.log(`   ✅ Screenshot saved: simple-hover-${orderNumber}.png`);
      
      // Step 4: Find the entire row
      console.log(`   🔍 Finding the entire row...`);
      const row = page.locator(`tr:has(td:has-text("${orderNumber}"))`);
      
      // Step 5: Hover over the entire row
      console.log(`   🖱️ Hovering over entire row...`);
      await row.hover();
      console.log(`   ✅ Hovered over entire row!`);
      
      // Step 6: Take another screenshot
      console.log(`   📸 Taking row screenshot...`);
      await page.screenshot({ path: `simple-hover-${orderNumber}-row.png` });
      console.log(`   ✅ Row screenshot saved!`);
      
      // Step 7: Get row information
      console.log(`   📊 Getting row information...`);
      const rowData = await row.locator('td').allTextContents();
      console.log(`   📋 Row data:`, rowData);
      
      console.log(`   🎉 Hover test completed for order ${orderNumber}!`);
      return true;
      
    } catch (error) {
      console.log(`   ❌ Error testing order ${orderNumber}: ${error.message}`);
      return false;
    }
  }
  
  // ========================================
  // STEP 6: TEST HOVER ON ALL ORDERS
  // ========================================
  console.log('\n🚀 Step 9: Testing hover on all orders...');
  
  let successCount = 0;
  let totalCount = orderNumbers.length;
  
  for (const orderNumber of orderNumbers) {
    const success = await testHoverOnOrder(orderNumber);
    if (success) {
      successCount++;
    }
    console.log('---'); // Separator between orders
  }
  
  // ========================================
  // STEP 7: SHOW RESULTS
  // ========================================
  console.log('\n📊 ===== HOVER TEST RESULTS =====');
  console.log(`✅ Successful hover tests: ${successCount}`);
  console.log(`❌ Failed hover tests: ${totalCount - successCount}`);
  console.log(`📈 Success rate: ${Math.round((successCount / totalCount) * 100)}%`);
  
  // ========================================
  // STEP 8: WHAT WE LEARNED
  // ========================================
  console.log('\n🎓 ===== WHAT WE LEARNED =====');
  console.log('1. 🖱️ Mouse hover is moving mouse over elements without clicking');
  console.log('2. 📝 Use page.hover("selector") to hover in Playwright');
  console.log('3. 📸 Screenshots help us see what happened');
  console.log('4. 🔍 We can find elements using text content');
  console.log('5. 📊 We can get data from table rows');
  
  // ========================================
  // STEP 9: COMMON HOVER SELECTORS
  // ========================================
  console.log('\n📚 ===== COMMON HOVER SELECTORS =====');
  console.log('• await page.hover("button") - Hover over a button');
  console.log('• await page.hover("#id") - Hover over element with ID');
  console.log('• await page.hover(".class") - Hover over element with class');
  console.log('• await page.hover("text=Hello") - Hover over text "Hello"');
  console.log('• await page.hover("td:has-text(\'700107\')") - Hover over cell with text');
  
  // ========================================
  // STEP 10: TEST ASSERTION
  // ========================================
  console.log('\n✅ Step 10: Checking if test passed...');
  expect(successCount).toBeGreaterThan(0);
  console.log('✅ Test passed! At least one hover action worked!');
  
  // Final screenshot
  await page.screenshot({ path: 'simple-hover-test-complete.png' });
  console.log('📸 Final screenshot saved: simple-hover-test-complete.png');
  
  console.log('\n🎉 SIMPLE HOVER TEST COMPLETED!');
  console.log('📚 You now know how to use mouse hover in Playwright!');
});
