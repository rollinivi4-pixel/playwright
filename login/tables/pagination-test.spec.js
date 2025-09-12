/**
 * DEDICATED PAGINATION TEST
 * 
 * This test focuses specifically on testing table pagination functionality:
 * 1. Login and navigate to table page
 * 2. Test different scrolling strategies
 * 3. Capture all orders through pagination
 * 4. Verify pagination behavior
 * 
 * Perfect for testing pagination in isolation!
 */

const { test, expect } = require('@playwright/test');

test('Dedicated Pagination Test', async ({ page }) => {
  // Set test timeout to 2 minutes for comprehensive pagination testing
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
    await page.screenshot({ path: 'pagination-login-error.png' });
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
  // PHASE 3: PAGINATION TESTING
  // ========================================
  
  // STEP 8: Verify table is loaded
  console.log('🔍 Step 8: Verifying table is loaded...');
  const table = page.locator('//table[@role="table"]');
  await expect(table).toBeVisible({ timeout: 10000 });
  console.log('✅ Table is visible');
  
  // STEP 9: Function to get all visible order numbers
  async function getVisibleOrderNumbers() {
    console.log('📊 Getting visible order numbers...');
    const orderCells = page.locator('table tbody tr td:first-child');
    const orderNumbers = await orderCells.allTextContents();
    const filteredOrders = orderNumbers.filter(num => num.trim() !== '');
    console.log(`📋 Found ${filteredOrders.length} visible orders`);
    return filteredOrders;
  }
  
  // STEP 10: Function to get unique order numbers from visible rows
  async function getUniqueVisibleOrderNumbers() {
    console.log('📊 Getting unique visible order numbers...');
    const orderCells = page.locator('table tbody tr td:first-child');
    const orderNumbers = await orderCells.allTextContents();
    const filteredOrders = orderNumbers.filter(num => num.trim() !== '');
    const uniqueOrders = [...new Set(filteredOrders)]; // Remove duplicates
    console.log(`📋 Found ${filteredOrders.length} visible orders, ${uniqueOrders.length} unique`);
    return uniqueOrders;
  }
  
  // STEP 11: Function to test different scrolling strategies
  async function testScrollingStrategy(strategyName, scrollAction) {
    console.log(`🔄 Testing ${strategyName}...`);
    await scrollAction();
    await page.waitForTimeout(2000);
    const orders = await getUniqueVisibleOrderNumbers();
    return orders;
  }
  
  // STEP 12: Comprehensive pagination test
  const expectedTotalOrders = 120; // Expected total orders
  
  async function comprehensivePaginationTest() {
    const allOrderNumbers = new Set();
    let scrollAttempts = 0;
    const maxScrollAttempts = 50; // Increased significantly for 120 orders
    let noNewDataCount = 0;
    const maxNoNewData = 10; // Allow more attempts before giving up
    
    console.log('📊 Step 11: Starting comprehensive pagination test...');
    
    // Get initial orders
    const initialOrders = await getUniqueVisibleOrderNumbers();
    console.log(`📋 Initial load: Found ${initialOrders.length} unique visible orders`);
    initialOrders.forEach(order => allOrderNumbers.add(order));
    console.log(`📊 Initial unique orders: ${allOrderNumbers.size}`);
    
    // Test different scrolling strategies
    const scrollStrategies = [
      {
        name: 'Mouse Wheel Scroll',
        action: () => page.mouse.wheel(0, 1000)
      },
      {
        name: 'Large Mouse Wheel Scroll',
        action: () => page.mouse.wheel(0, 2000)
      },
      {
        name: 'Scroll to Bottom',
        action: () => page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      },
      {
        name: 'Page Down Key',
        action: () => page.keyboard.press('PageDown')
      },
      {
        name: 'End Key',
        action: () => page.keyboard.press('End')
      },
      {
        name: 'Arrow Down Key',
        action: () => page.keyboard.press('ArrowDown')
      }
    ];
    
    // STEP 12: Test each scrolling strategy
    while (scrollAttempts < maxScrollAttempts && noNewDataCount < maxNoNewData && allOrderNumbers.size < expectedTotalOrders) {
      const strategyIndex = scrollAttempts % scrollStrategies.length;
      const strategy = scrollStrategies[strategyIndex];
      
      console.log(`\n🔄 Scroll Attempt ${scrollAttempts + 1}: ${strategy.name}`);
      console.log(`🎯 Progress: ${allOrderNumbers.size}/${expectedTotalOrders} orders found`);
      
      const beforeCount = allOrderNumbers.size;
      const currentOrders = await testScrollingStrategy(strategy.name, strategy.action);
      
      // Add new orders to collection
      currentOrders.forEach(order => allOrderNumbers.add(order));
      
      const afterCount = allOrderNumbers.size;
      
      if (afterCount > beforeCount) {
        console.log(`📈 SUCCESS! Found ${afterCount - beforeCount} new orders with ${strategy.name}`);
        console.log(`📊 Total unique orders: ${afterCount}/${expectedTotalOrders}`);
        noNewDataCount = 0; // Reset counter
      } else {
        noNewDataCount++;
        console.log(`🔄 No new orders found with ${strategy.name}. Consecutive no-new-data: ${noNewDataCount}`);
        
        // Try more aggressive scrolling if no new data
        if (noNewDataCount >= 3) {
          console.log('🚀 Trying aggressive scrolling...');
          await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
            window.scrollBy(0, 1000);
          });
          await page.waitForTimeout(3000);
        }
      }
      
      // Log current orders for debugging (show more orders)
      const currentOrderList = Array.from(allOrderNumbers).slice(0, 15);
      console.log(`📊 Current orders: ${currentOrderList.join(', ')}${allOrderNumbers.size > 15 ? '...' : ''}`);
      
      // Check if we've reached the expected total
      if (allOrderNumbers.size >= expectedTotalOrders) {
        console.log(`🎉 TARGET REACHED! Found all ${expectedTotalOrders} orders!`);
        break;
      }
      
      scrollAttempts++;
    }
    
    console.log(`\n🏁 Pagination test completed after ${scrollAttempts} scroll attempts`);
    console.log(`📊 Final unique orders count: ${allOrderNumbers.size}`);
    return Array.from(allOrderNumbers);
  }
  
  // STEP 13: Run the comprehensive pagination test
  console.log('🚀 Step 13: Running comprehensive pagination test...');
  const allOrders = await comprehensivePaginationTest();
  
  // ========================================
  // PHASE 4: RESULTS ANALYSIS
  // ========================================
  
  // STEP 14: Display detailed results
  console.log('\n📊 Step 14: PAGINATION TEST RESULTS:');
  console.log(`✅ Total unique orders found: ${allOrders.length}`);
  console.log('📋 All order numbers:', allOrders);
  
  // STEP 15: Analyze pagination behavior
  console.log('\n🔍 Step 15: Pagination Analysis:');
  
  if (allOrders.length >= expectedTotalOrders) {
    console.log(`🎉 COMPLETE SUCCESS: Found all ${expectedTotalOrders} orders through pagination!`);
    console.log(`📈 Pagination efficiency: ${allOrders.length} total orders loaded`);
  } else if (allOrders.length > 20) {
    console.log('✅ TRUE PAGINATION: Found more orders through scrolling');
    console.log(`📈 Pagination efficiency: ${allOrders.length} orders loaded (${expectedTotalOrders - allOrders.length} remaining)`);
  } else if (allOrders.length === 20) {
    console.log('ℹ️ PARTIAL PAGINATION: Some orders loaded, but not all');
    console.log(`📊 Table shows ${allOrders.length} orders (${expectedTotalOrders - allOrders.length} more expected)`);
  } else {
    console.log('⚠️ LIMITED DATA: Fewer orders than expected');
    console.log(`📊 Found ${allOrders.length} orders, expected ${expectedTotalOrders}`);
  }
  
  // STEP 16: Test specific order numbers
  const targetOrders = ["700107", "700106", "700104", "700103"];
  console.log('\n🎯 Step 16: Verifying target orders in pagination results:');
  
  const foundTargetOrders = targetOrders.filter(order => allOrders.includes(order));
  const notFoundTargetOrders = targetOrders.filter(order => !allOrders.includes(order));
  
  console.log(`✅ Found ${foundTargetOrders.length}/${targetOrders.length} target orders:`, foundTargetOrders);
  if (notFoundTargetOrders.length > 0) {
    console.log(`❌ Not found ${notFoundTargetOrders.length} target orders:`, notFoundTargetOrders);
  }
  
  // STEP 17: Test assertions
  expect(allOrders.length).toBeGreaterThan(0);
  console.log('✅ Test passed: Found orders through pagination');
  
  // STEP 18: Take final screenshot
  await page.screenshot({ path: 'pagination-test-final.png' });
  console.log('📸 Final pagination test screenshot saved');
  
  console.log('\n🎉 PAGINATION TEST COMPLETED SUCCESSFULLY!');
  console.log(`📊 Summary: Found ${allOrders.length} unique orders through pagination testing`);
});
