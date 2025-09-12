/**
 * SIMPLE TABLE TEST FOR BEGINNERS
 * 
 * This test shows how to work with tables in Playwright
 * Perfect for learning table automation basics!
 * 
 * What this test does:
 * 1. Login to the website
 * 2. Go to the table page
 * 3. Check table structure
 * 4. Find specific data in the table
 * 5. Take screenshots
 */

const { test, expect } = require('@playwright/test');

test('Simple Table Test for Beginners', async ({ page }) => {
  
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
  await page.click("//li[normalize-space()='Sales Orders']");
  console.log('✅ Clicked on Sales Orders!');
  
  // Wait for table to load
  console.log('⏳ Step 7: Waiting for table to load...');
  await page.waitForTimeout(5000);
  console.log('✅ Table is ready!');
  
  // ========================================
  // STEP 3: WHAT IS A TABLE?
  // ========================================
  console.log('\n📊 ===== WHAT IS A TABLE? =====');
  console.log('A table has:');
  console.log('• Headers (column titles)');
  console.log('• Rows (horizontal lines of data)');
  console.log('• Cells (individual data points)');
  console.log('Let\'s explore this table!');
  
  // ========================================
  // STEP 4: FIND THE TABLE
  // ========================================
  console.log('\n🔍 Step 8: Looking for the table...');
  const table = page.locator('//table[@role="table"]');
  await expect(table).toBeVisible();
  console.log('✅ Table found and visible!');
  
  // ========================================
  // STEP 5: CHECK TABLE HEADERS (COLUMNS)
  // ========================================
  console.log('\n📋 Step 9: Checking table headers...');
  const headers = page.locator('//table[@role="table"]/thead/tr/th');
  const headerCount = await headers.count();
  console.log(`📊 Found ${headerCount} columns in the table`);
  
  // Get all header names
  console.log('📝 Column names:');
  const headerNames = await headers.allTextContents();
  headerNames.forEach((name, index) => {
    console.log(`   ${index + 1}. ${name}`);
  });
  
  // ========================================
  // STEP 6: CHECK TABLE ROWS (DATA)
  // ========================================
  console.log('\n📊 Step 10: Checking table rows...');
  const rows = page.locator('//table[@role="table"]/tbody/tr');
  const rowCount = await rows.count();
  console.log(`📊 Found ${rowCount} rows of data`);
  
  // ========================================
  // STEP 7: HOW TO FIND DATA IN TABLES
  // ========================================
  console.log('\n🔍 ===== HOW TO FIND DATA IN TABLES =====');
  console.log('To find data in a table, you can:');
  console.log('• Search by text: td:has-text("700107")');
  console.log('• Find by row: tr:has(td:has-text("700107"))');
  console.log('• Get cell data: row.locator("td").allTextContents()');
  
  // ========================================
  // STEP 8: SEARCH FOR SPECIFIC ORDERS
  // ========================================
  console.log('\n🎯 Step 11: Looking for specific orders...');
  const orderNumbers = ["700107", "700106", "700104", "700103"];
  
  // Function to search for one order
  async function findOrder(orderNumber) {
    console.log(`\n🔍 Looking for order: ${orderNumber}`);
    
    try {
      // Find the cell with the order number
      const orderCell = page.locator(`td:has-text("${orderNumber}")`);
      const found = await orderCell.isVisible();
      
      if (found) {
        console.log(`   ✅ Order ${orderNumber} found!`);
        
        // Find the entire row
        const row = page.locator(`tr:has(td:has-text("${orderNumber}"))`);
        
        // Get all data from the row
        const rowData = await row.locator('td').allTextContents();
        console.log(`   📊 Row data:`, rowData);
        
        // Show each piece of data
        console.log(`   📋 Order details:`);
        rowData.forEach((data, index) => {
          const headerName = headerNames[index] || `Column ${index + 1}`;
          console.log(`      ${headerName}: ${data}`);
        });
        
        return true;
      } else {
        console.log(`   ❌ Order ${orderNumber} not found`);
        return false;
      }
      
    } catch (error) {
      console.log(`   ❌ Error finding order ${orderNumber}: ${error.message}`);
      return false;
    }
  }
  
  // Search for all orders
  let foundCount = 0;
  for (const orderNumber of orderNumbers) {
    const found = await findOrder(orderNumber);
    if (found) {
      foundCount++;
    }
  }
  
  // ========================================
  // STEP 9: SHOW RESULTS
  // ========================================
  console.log('\n📊 ===== SEARCH RESULTS =====');
  console.log(`✅ Orders found: ${foundCount}`);
  console.log(`❌ Orders not found: ${orderNumbers.length - foundCount}`);
  console.log(`📈 Success rate: ${Math.round((foundCount / orderNumbers.length) * 100)}%`);
  
  // ========================================
  // STEP 10: TAKE SCREENSHOTS
  // ========================================
  console.log('\n📸 Step 12: Taking screenshots...');
  await page.screenshot({ path: 'simple-table-test.png' });
  console.log('✅ Screenshot saved: simple-table-test.png');
  
  // ========================================
  // STEP 11: WHAT WE LEARNED
  // ========================================
  console.log('\n🎓 ===== WHAT WE LEARNED =====');
  console.log('1. 📊 Tables have headers, rows, and cells');
  console.log('2. 🔍 We can find data using text content');
  console.log('3. 📝 We can get all data from a row');
  console.log('4. 📸 Screenshots help us see the results');
  console.log('5. ✅ We can verify if data exists in tables');
  
  // ========================================
  // STEP 12: COMMON TABLE SELECTORS
  // ========================================
  console.log('\n📚 ===== COMMON TABLE SELECTORS =====');
  console.log('• table - Find the table');
  console.log('• thead tr th - Find table headers');
  console.log('• tbody tr - Find table rows');
  console.log('• td:has-text("text") - Find cell with specific text');
  console.log('• tr:has(td:has-text("text")) - Find row with specific text');
  
  // ========================================
  // STEP 13: TEST ASSERTION
  // ========================================
  console.log('\n✅ Step 13: Checking if test passed...');
  expect(foundCount).toBeGreaterThan(0);
  console.log('✅ Test passed! Found at least one order!');
  
  console.log('\n🎉 SIMPLE TABLE TEST COMPLETED!');
  console.log('📚 You now know how to work with tables in Playwright!');
});
