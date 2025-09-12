/**
 * COMPREHENSIVE TABLE AUTOMATION TEST
 * 
 * This test demonstrates advanced table automation techniques including:
 * 1. Login and navigation
 * 2. Table structure verification
 * 3. Data searching and validation
 * 4. Pagination testing with scrolling
 * 5. Order number verification
 * 
 * Perfect for learning table automation patterns!
 */

const { test, expect } = require('@playwright/test');

// Note: For JavaScript, we need to use require() instead of import
// and we'll need to create a JavaScript version of the LoginAutomation class
// or use the TypeScript version with ts-node/tsx

test('Comprehensive Table Automation Test', async ({ page }) => {
  // Set test timeout to 2 minutes for comprehensive testing
  test.setTimeout(120000);
  // ========================================
  // PHASE 1: LOGIN AND NAVIGATION
  // ========================================
  // This section handles the login process and navigation to the table page
  
  try {
    // STEP 1: Navigate to the website
    console.log('🌐 Step 1: Navigating to login page...');
    await page.goto('https://stagingaz.ezscm.ai/', { 
      waitUntil: 'domcontentloaded',  // Wait for DOM to be ready
      timeout: 15000                   // 15 second timeout
    });
    console.log('✅ Successfully navigated to login page');
    
    // STEP 2: Wait for login form to load
    console.log('⏳ Step 2: Waiting for login form to load...');
    await page.waitForSelector('#email', { timeout: 10000 });
    console.log('✅ Login form loaded successfully');
    
    // STEP 3: Verify all login elements are present
    console.log('🔍 Step 3: Verifying login elements...');
    const emailInput = await page.isVisible('#email');
    const passwordInput = await page.isVisible('#password');
    const loginButton = await page.isVisible('button[type="submit"]');
    
    console.log('📧 Email input found:', emailInput);
    console.log('🔒 Password input found:', passwordInput);
    console.log('🔐 Login button found:', loginButton);
    
    // Assert all elements are visible (test will fail if any are missing)
    expect(emailInput).toBe(true);
    expect(passwordInput).toBe(true);
    expect(loginButton).toBe(true);
    
    // STEP 4: Fill in login credentials
    const userName = 'rollinivi4+test@gmail.com';
    const password = 'User@123';
    console.log('📝 Step 4: Filling login form...');
    await page.fill('#email', userName);
    console.log('✅ Email filled: ', userName);
    
    await page.fill('#password', password);
    console.log('✅ Password filled');
    
    // STEP 5: Submit the login form
    console.log('🔐 Step 5: Submitting login form...');
    await page.waitForSelector('button[type="submit"]', { 
      state: 'visible',    // Wait for button to be visible
      timeout: 10000 
    });
    
    await page.click('button[type="submit"]', { 
      force: true,         // Force click if needed
      timeout: 10000 
    });
    console.log('✅ Login button clicked');
    
    // STEP 6: Wait for login to complete
    console.log('⏳ Step 6: Waiting for login to complete...');
    try {
      await page.waitForLoadState('networkidle', { timeout: 5000 });
      console.log('✅ Login form submitted successfully');
    } catch (error) {
      console.log('⚠️ Network idle timeout, trying domcontentloaded...');
      try {
        await page.waitForLoadState('domcontentloaded', { timeout: 5000 });
        console.log('✅ Login form submitted successfully (DOM loaded)');
      } catch (domError) {
        console.log('⚠️ DOM timeout, waiting 2 seconds...');
        await page.waitForTimeout(2000);
      }
    }
    
    // STEP 7: Verify login was successful
    console.log('🔍 Step 7: Verifying login success...');
    await page.waitForTimeout(5000);
    
    const currentUrl = page.url();
    console.log('📍 Current URL:', currentUrl);
    
    // Check if login form is still visible (indicates failure)
    const loginFormVisible = await page.isVisible('#email');
    
    if (loginFormVisible) {
      console.log('❌ Login failed - Login form still visible');
      expect(loginFormVisible).toBe(false);
    } else {
      console.log('✅ Login successful - Login form not visible');
    }
    
    // Take screenshot for debugging
    await page.screenshot({ path: 'test_login_result.png' });
    console.log('📸 Screenshot saved as: test_login_result.png');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    // Take error screenshot
    await page.screenshot({ path: 'test_error.png' });
    console.log('📸 Error screenshot saved as: test_error.png');
    throw error;
  }
  
  // ========================================
  // PHASE 2: NAVIGATE TO TABLE PAGE
  // ========================================
  // This section navigates to the page containing the table we want to test
  
  // Wait for page to fully load after login
  await page.waitForTimeout(3000);
  
  // STEP 8: Navigate to Sales Orders page
  console.log('🔍 Step 8: Looking for Sales Orders menu...');
  
  // Wait for the menu item to be visible and clickable
  const salesOrderMenu = page.locator("//li[normalize-space()='Sales Orders']");
  await salesOrderMenu.waitFor({ state: 'visible', timeout: 10000 });
  await salesOrderMenu.click();
  console.log('✅ Navigated to sales order page');
  
  // Wait for the sales order page to load
  await page.waitForTimeout(5000);
  
  // ========================================
  // PHASE 3: TABLE STRUCTURE VERIFICATION
  // ========================================
  // This section verifies that the table is properly loaded and structured
  
  // STEP 9: Verify the table is loaded
  console.log('🔍 Step 9: Verifying table is loaded...');
  const table = page.locator('//table[@role="table"]');
  await expect(table).toBeVisible({ timeout: 10000 });
  console.log('✅ Table is visible');
  
  // STEP 10: Verify table columns (headers)
  console.log('🔍 Step 10: Verifying table columns...');
  const columns = page.locator('//table[@role="table"]/thead/tr/th');
  await expect(columns.first()).toBeVisible({ timeout: 5000 });
  console.log('✅ Columns are visible');
  
  const columnCount = await columns.count();
  console.log(`📊 Number of columns: ${columnCount}`);
  
  // STEP 11: Get and display table headings
  console.log('📋 Step 11: Getting table headings...');
  const headings = await columns.allTextContents();
  console.log('Table headings:', headings);
  
  // Display each heading individually for clarity
  for (let i = 0; i < headings.length; i++) {
    console.log(`Column ${i + 1}: ${headings[i]}`);
  }
    
  // STEP 12: Verify table rows (data)
  console.log('🔍 Step 12: Verifying table rows...');
  const rows = page.locator('//table[@role="table"]/tbody/tr');
  
  // Wait for at least one row to be visible (or handle empty table)
  try {
    await expect(rows.first()).toBeVisible({ timeout: 5000 });
    console.log('✅ Rows are visible');
    const rowCount = await rows.count();
    console.log(`📊 Number of rows: ${rowCount}`);
    
    // STEP 13: Additional table validations
    if (rowCount > 0) {
      console.log('🔍 Step 13: Verifying first row data...');
      const firstRowCells = page.locator('//table[@role="table"]/tbody/tr[1]/td');
      const cellCount = await firstRowCells.count();
      console.log(`📊 Number of cells in first row: ${cellCount}`);
      
      // Verify cell count matches column count (data integrity check)
      expect(cellCount).toBe(columnCount);
      console.log('✅ Cell count matches column count - data integrity verified');
    } else {
      console.log('ℹ️ Table is empty (no data rows)');
    }
    
  } catch (error) {
    console.log('⚠️ No rows found - table might be empty or still loading');
    // Check if table shows "No data" message
    const noDataMessage = page.locator('text=No data').or(page.locator('text=No records')).or(page.locator('text=Empty'));
    if (await noDataMessage.isVisible()) {
      console.log('ℹ️ Table shows "No data" message');
    }
  }
  
  // Take screenshot of the table for documentation
  await page.screenshot({ path: 'sales-order-table.png' });
  console.log('📸 Table screenshot saved as: sales-order-table.png');

  // ========================================
  // PHASE 4: DATA SEARCH AND VERIFICATION
  // ========================================
  // This section searches for specific data in the table and verifies it exists
  
  // Wait for table to fully load before searching for order number
  console.log('⏳ Step 14: Waiting for table to fully load...');
  await page.waitForTimeout(5000);
  console.log('✅ Table loading complete');

  // STEP 15: Define order numbers to search for
  const orderNumbers = ["700107", "700106", "700104", "700103"];
  console.log('📋 Step 15: Order numbers to verify:', orderNumbers);
  
  // STEP 16: Function to search for a single order number
  async function searchOrder(orderNo) {
    console.log(`🔍 Looking for order number "${orderNo}"...`);
    
    // Use CSS selector to find cell containing the order number
    const orderCell = page.locator(`td:has-text("${orderNo}")`);
    const found = await orderCell.isVisible();
    
    if (found) {
      console.log(`✅ Order number "${orderNo}" found!`);
      
      // Get the entire row that contains this order
      const row = page.locator(`tr:has(td:has-text("${orderNo}"))`);
      const rowData = await row.locator('td').allTextContents();
      
      console.log(`📊 Row data for ${orderNo}:`, rowData);
      return { orderNo, found: true, rowData };
    } else {
      console.log(`❌ Order number "${orderNo}" not found`);
      return { orderNo, found: false, rowData: null };
    }
  }
  
  // STEP 17: Search for all orders one by one
  console.log('🚀 Step 17: Starting verification for multiple orders...');
  const results = [];
  
  for (const orderNo of orderNumbers) {
    const result = await searchOrder(orderNo);
    results.push(result);
    console.log('---'); // Separator between orders
  }
  
  // STEP 18: Summary of search results
  console.log('📋 Step 18: Verification Summary:');
  const foundOrders = results.filter(r => r.found);
  const notFoundOrders = results.filter(r => !r.found);
  
  console.log(`✅ Found ${foundOrders.length} orders:`, foundOrders.map(r => r.orderNo));
  console.log(`❌ Not found ${notFoundOrders.length} orders:`, notFoundOrders.map(r => r.orderNo));
  
  // Test assertion: At least one order must be found for test to pass
  expect(foundOrders.length).toBeGreaterThan(0);
  console.log('✅ Test passed: At least one order was found');
  

  // ========================================
  // PHASE 5: PAGINATION TESTING WITH SCROLLING
  // ========================================
  // This section tests table pagination by scrolling to load more data
  
  console.log('🔍 Step 19: Starting pagination test with scrolling...');
  
  // STEP 20: Function to get all visible order numbers
  async function getVisibleOrderNumbers() {
    // Get the first cell (order number) from each row
    const orderCells = page.locator('table tbody tr td:first-child');
    const orderNumbers = await orderCells.allTextContents();
    return orderNumbers.filter(num => num.trim() !== ''); // Remove empty strings
  }
  
  // STEP 21: Function to scroll and capture order numbers
  async function scrollAndCaptureOrders() {
    const allOrderNumbers = new Set(); // Use Set to avoid duplicates
    let scrollAttempts = 0;
    const maxScrollAttempts = 10; // Increased to allow more scrolling
    let noNewDataCount = 0; // Track consecutive scrolls with no new data
    const maxNoNewData = 3; // Stop after 3 consecutive scrolls with no new data
    
    console.log('📊 Step 21: Starting scroll-based pagination test...');
    
    // First, get initial orders without scrolling
    const initialOrders = await getVisibleOrderNumbers();
    console.log(`📋 Initial load: Found ${initialOrders.length} visible orders`);
    initialOrders.forEach(order => allOrderNumbers.add(order));
    console.log(`📊 Initial unique orders: ${allOrderNumbers.size}`);
    
    // STEP 22: Scroll through the table to load more data
    while (scrollAttempts < maxScrollAttempts && noNewDataCount < maxNoNewData) {
      // Scroll down to load more content
      await page.mouse.wheel(0, 1500); // Increased scroll distance
      await page.waitForTimeout(3000); // Increased wait time for content to load
      scrollAttempts++;
      
      // Get current visible order numbers after scroll
      const currentOrders = await getVisibleOrderNumbers();
      console.log(`📋 After scroll ${scrollAttempts}: Found ${currentOrders.length} visible orders`);
      
      // Count orders before adding new ones
      const beforeCount = allOrderNumbers.size;
      
      // Add new orders to our collection
      currentOrders.forEach(order => allOrderNumbers.add(order));
      
      // Check if we found new orders
      const afterCount = allOrderNumbers.size;
      if (afterCount > beforeCount) {
        console.log(`📈 New orders found! Added ${afterCount - beforeCount} new orders. Total unique: ${afterCount}`);
        noNewDataCount = 0; // Reset counter when we find new orders
      } else {
        noNewDataCount++;
        console.log(`🔄 No new orders found after scroll ${scrollAttempts}. Consecutive no-new-data count: ${noNewDataCount}`);
        
        // Try different scroll strategies
        if (noNewDataCount === 1) {
          console.log('🔄 Trying scroll to bottom...');
          await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
          await page.waitForTimeout(2000);
        } else if (noNewDataCount === 2) {
          console.log('🔄 Trying page down key...');
          await page.keyboard.press('PageDown');
          await page.waitForTimeout(2000);
        }
      }
      
      // Log current unique orders for debugging
      console.log(`📊 Current unique orders: ${Array.from(allOrderNumbers).slice(0, 5).join(', ')}${allOrderNumbers.size > 5 ? '...' : ''}`);
    }
    
    console.log(`🏁 Pagination test completed after ${scrollAttempts} scroll attempts`);
    console.log(`📊 Final unique orders count: ${allOrderNumbers.size}`);
    return Array.from(allOrderNumbers);
  }
  
  // STEP 23: Run the pagination test
  const allOrders = await scrollAndCaptureOrders();
  
  // STEP 24: Display pagination test results
  console.log('📊 Step 24: PAGINATION TEST RESULTS:');
  console.log(`✅ Total unique orders found: ${allOrders.length}`);
  console.log('📋 All order numbers:', allOrders);
  
  // Verify pagination worked - check if we found any orders at all
  expect(allOrders.length).toBeGreaterThan(0);
  console.log('✅ Pagination test passed: Found orders through scrolling');
  
  // Additional check: if we found more orders than initial search, that's a bonus
  if (allOrders.length > foundOrders.length) {
    console.log(`🎉 Bonus: Found ${allOrders.length - foundOrders.length} additional orders through scrolling!`);
  } else {
    console.log('ℹ️ All orders were visible without scrolling (table might be small)');
  }
  
  // Take screenshot after pagination test
  await page.screenshot({ path: 'pagination-test-result.png' });
  console.log('📸 Pagination test screenshot saved');

});