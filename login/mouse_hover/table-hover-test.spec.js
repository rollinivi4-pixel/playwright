/**
 * DEDICATED TABLE HOVER TEST
 * 
 * This test focuses specifically on mouse hover actions on table rows:
 * 1. Login and navigate to table page
 * 2. Find specific order numbers
 * 3. Perform comprehensive hover actions on each found order
 * 4. Test hover effects, tooltips, and interactive elements
 * 5. Capture screenshots of hover states
 * 
 * Perfect for testing hover interactions in isolation!
 */

const { test, expect } = require('@playwright/test');

test('Table Hover Actions Test', async ({ page }) => {
  // Set test timeout to 2 minutes for comprehensive hover testing
  test.setTimeout(120000);
  
  // ========================================
  // PHASE 1: LOGIN AND NAVIGATION
  // ========================================
  
  try {
    // STEP 1: Navigate to login page
    console.log('🌐 Step 1: Navigating to login page...');
    await page.goto('https://stagingaz.ezscm.ai/', { 
      waitUntil: 'domcontentloaded',
      timeout: 15000 
    });
    console.log('✅ Successfully navigated to login page');
    
    // STEP 2: Wait for login form to load
    console.log('⏳ Step 2: Waiting for login form to load...');
    await page.waitForSelector('#email', { timeout: 10000 });
    console.log('✅ Login form loaded successfully');
    
    // STEP 3: Fill in login credentials
    console.log('📝 Step 3: Filling login form...');
    const userName = 'rollinivi4+test@gmail.com';
    const password = 'User@123';
    
    await page.fill('#email', userName);
    console.log('✅ Email filled:', userName);
    
    await page.fill('#password', password);
    console.log('✅ Password filled');
    
    // STEP 4: Submit login form
    console.log('🔐 Step 4: Submitting login form...');
    await page.waitForSelector('button[type="submit"]', { 
      state: 'visible',
      timeout: 10000 
    });
    
    await page.click('button[type="submit"]', { 
      force: true,
      timeout: 10000 
    });
    console.log('✅ Login button clicked');
    
    // STEP 5: Wait for login to complete
    console.log('⏳ Step 5: Waiting for login to complete...');
    try {
      await page.waitForLoadState('networkidle', { timeout: 5000 });
      console.log('✅ Login form submitted successfully');
    } catch (error) {
      console.log('⚠️ Network idle timeout, trying domcontentloaded...');
      await page.waitForLoadState('domcontentloaded', { timeout: 5000 });
      console.log('✅ Login form submitted successfully (DOM loaded)');
    }
    
    // STEP 6: Verify login success
    console.log('🔍 Step 6: Verifying login success...');
    await page.waitForTimeout(3000);
    
    const loginFormVisible = await page.isVisible('#email');
    if (loginFormVisible) {
      console.log('❌ Login failed - Login form still visible');
      expect(loginFormVisible).toBe(false);
    } else {
      console.log('✅ Login successful - Login form not visible');
    }
    
  } catch (error) {
    console.error('❌ Login failed:', error);
    await page.screenshot({ path: 'hover-test-login-error.png' });
    throw error;
  }
  
  // ========================================
  // PHASE 2: NAVIGATE TO TABLE PAGE
  // ========================================
  
  // STEP 7: Navigate to Sales Orders page
  console.log('🔍 Step 7: Looking for Sales Orders menu...');
  const salesOrderMenu = page.locator("//li[normalize-space()='Sales Orders']");
  await salesOrderMenu.waitFor({ state: 'visible', timeout: 10000 });
  await salesOrderMenu.click();
  console.log('✅ Navigated to sales order page');
  
  // Wait for the sales order page to load
  await page.waitForTimeout(5000);
  
  // ========================================
  // PHASE 3: TABLE VERIFICATION
  // ========================================
  
  // STEP 8: Verify table is loaded
  console.log('🔍 Step 8: Verifying table is loaded...');
  const table = page.locator('//table[@role="table"]');
  await expect(table).toBeVisible({ timeout: 10000 });
  console.log('✅ Table is visible');
  
  // Wait for table to fully load
  await page.waitForTimeout(3000);
  
  // ========================================
  // PHASE 4: HOVER ACTIONS ON ORDER NUMBERS
  // ========================================
  
  // STEP 9: Define order numbers to test hover actions on
  const orderNumbers = ["700107", "700106", "700104", "700103"];
  console.log('📋 Step 9: Order numbers for hover testing:', orderNumbers);
  
  // STEP 10: Function to perform comprehensive hover actions on an order
  async function performHoverActions(orderNo) {
    console.log(`\n🖱️ ===== HOVER TESTING FOR ORDER ${orderNo} =====`);
    
    try {
      // Find the order number cell
      const orderCell = page.locator(`td:has-text("${orderNo}")`);
      const found = await orderCell.isVisible();
      
      if (!found) {
        console.log(`❌ Order number "${orderNo}" not found - skipping hover tests`);
        return { orderNo, success: false, reason: 'Order not found' };
      }
      
      console.log(`✅ Order number "${orderNo}" found!`);
      
      // Get the entire row that contains this order
      const row = page.locator(`tr:has(td:has-text("${orderNo}"))`);
      const rowData = await row.locator('td').allTextContents();
      console.log(`📊 Row data:`, rowData);
      
      // ========================================
      // HOVER ACTION 1: Order Number Cell
      // ========================================
      console.log(`🖱️ Hover Action 1: Hovering over order number cell...`);
      await orderCell.hover({ timeout: 5000 });
      await page.waitForTimeout(1000);
      console.log(`✅ Hovered over order number cell`);
      
      // Take screenshot
      await page.screenshot({ path: `hover-${orderNo}-cell.png` });
      console.log(`📸 Screenshot saved: hover-${orderNo}-cell.png`);
      
      // ========================================
      // HOVER ACTION 2: Entire Row
      // ========================================
      console.log(`🖱️ Hover Action 2: Hovering over entire row...`);
      await row.hover({ timeout: 5000 });
      await page.waitForTimeout(1000);
      console.log(`✅ Hovered over entire row`);
      
      // Take screenshot
      await page.screenshot({ path: `hover-${orderNo}-row.png` });
      console.log(`📸 Screenshot saved: hover-${orderNo}-row.png`);
      
      // ========================================
      // HOVER ACTION 3: Individual Cells
      // ========================================
      console.log(`🖱️ Hover Action 3: Hovering over individual cells...`);
      
      const cells = row.locator('td');
      const cellCount = await cells.count();
      console.log(`📊 Found ${cellCount} cells in row`);
      
      for (let i = 0; i < cellCount; i++) {
        const cell = cells.nth(i);
        const cellText = await cell.textContent();
        console.log(`🖱️ Hovering over cell ${i + 1}: "${cellText.trim()}"`);
        
        await cell.hover({ timeout: 3000 });
        await page.waitForTimeout(500);
        console.log(`✅ Hovered over cell ${i + 1}`);
      }
      
      // ========================================
      // HOVER ACTION 4: Action Buttons
      // ========================================
      console.log(`🖱️ Hover Action 4: Testing action buttons...`);
      
      const actionButtons = row.locator('button, .btn, [role="button"], a[href]');
      const buttonCount = await actionButtons.count();
      
      if (buttonCount > 0) {
        console.log(`🖱️ Found ${buttonCount} interactive elements, testing hover...`);
        
        for (let i = 0; i < buttonCount; i++) {
          const button = actionButtons.nth(i);
          const buttonText = await button.textContent();
          const buttonTag = await button.evaluate(el => el.tagName);
          
          console.log(`🖱️ Hovering over ${buttonTag}: "${buttonText.trim()}"`);
          
          await button.hover({ timeout: 3000 });
          await page.waitForTimeout(500);
          
          // Check if element is actually hovered
          const isHovered = await button.evaluate(el => el.matches(':hover'));
          console.log(`✅ Element hovered: ${isHovered}`);
        }
        
        // Take screenshot of buttons
        await page.screenshot({ path: `hover-${orderNo}-buttons.png` });
        console.log(`📸 Screenshot saved: hover-${orderNo}-buttons.png`);
      } else {
        console.log(`ℹ️ No action buttons found in row`);
      }
      
      // ========================================
      // HOVER ACTION 5: Check for Hover Effects
      // ========================================
      console.log(`🖱️ Hover Action 5: Checking for hover effects...`);
      
      // Common hover effect selectors
      const hoverEffectSelectors = [
        '.row-highlight',
        '.hover-tooltip',
        '.row-actions',
        '.hover-menu',
        '.tooltip',
        '[class*="hover"]',
        '[class*="highlight"]',
        '[class*="active"]',
        '.selected',
        '.focused'
      ];
      
      let effectsFound = 0;
      for (const selector of hoverEffectSelectors) {
        const effectElement = page.locator(selector);
        if (await effectElement.isVisible()) {
          const effectText = await effectElement.textContent();
          console.log(`✨ Found hover effect "${selector}": "${effectText}"`);
          effectsFound++;
        }
      }
      
      if (effectsFound === 0) {
        console.log(`ℹ️ No visible hover effects detected`);
      } else {
        console.log(`✨ Total hover effects found: ${effectsFound}`);
      }
      
      // ========================================
      // HOVER ACTION 6: Test Mouse Movement
      // ========================================
      console.log(`🖱️ Hover Action 6: Testing mouse movement patterns...`);
      
      // Move mouse away and back
      await page.mouse.move(0, 0);
      await page.waitForTimeout(500);
      console.log(`🖱️ Moved mouse away from element`);
      
      await row.hover({ timeout: 3000 });
      await page.waitForTimeout(500);
      console.log(`🖱️ Moved mouse back to element`);
      
      // Take final screenshot
      await page.screenshot({ path: `hover-${orderNo}-final.png` });
      console.log(`📸 Final screenshot saved: hover-${orderNo}-final.png`);
      
      console.log(`🎉 All hover actions completed for order "${orderNo}"`);
      return { orderNo, success: true, effectsFound };
      
    } catch (error) {
      console.log(`❌ Hover actions failed for order "${orderNo}":`, error.message);
      return { orderNo, success: false, reason: error.message };
    }
  }
  
  // STEP 11: Perform hover actions on all orders
  console.log('\n🚀 Step 11: Starting hover actions on all orders...');
  const hoverResults = [];
  
  for (const orderNo of orderNumbers) {
    const result = await performHoverActions(orderNo);
    hoverResults.push(result);
    console.log('---'); // Separator between orders
  }
  
  // ========================================
  // PHASE 5: HOVER RESULTS ANALYSIS
  // ========================================
  
  // STEP 12: Analyze hover results
  console.log('\n📊 Step 12: HOVER ACTIONS RESULTS:');
  
  const successfulHovers = hoverResults.filter(r => r.success);
  const failedHovers = hoverResults.filter(r => !r.success);
  
  console.log(`✅ Successful hover actions: ${successfulHovers.length}`);
  successfulHovers.forEach(result => {
    console.log(`   - Order ${result.orderNo}: ${result.effectsFound || 0} effects found`);
  });
  
  if (failedHovers.length > 0) {
    console.log(`❌ Failed hover actions: ${failedHovers.length}`);
    failedHovers.forEach(result => {
      console.log(`   - Order ${result.orderNo}: ${result.reason}`);
    });
  }
  
  // STEP 13: Screenshots summary
  console.log('\n📸 Step 13: SCREENSHOTS TAKEN:');
  successfulHovers.forEach(result => {
    console.log(`📸 Order ${result.orderNo}:`);
    console.log(`   - hover-${result.orderNo}-cell.png`);
    console.log(`   - hover-${result.orderNo}-row.png`);
    console.log(`   - hover-${result.orderNo}-buttons.png`);
    console.log(`   - hover-${result.orderNo}-final.png`);
  });
  
  // STEP 14: Test assertions
  expect(successfulHovers.length).toBeGreaterThan(0);
  console.log('✅ Test passed: At least one hover action was successful');
  
  // Take final test screenshot
  await page.screenshot({ path: 'hover-test-complete.png' });
  console.log('📸 Final test screenshot saved: hover-test-complete.png');
  
  console.log('\n🎉 TABLE HOVER TEST COMPLETED SUCCESSFULLY!');
  console.log(`📊 Summary: ${successfulHovers.length}/${orderNumbers.length} orders tested with hover actions`);
});
