/**
 * LOGIN HOOKS
 * 
 * This file contains reusable login functionality that can be used across multiple tests
 * Using hooks helps avoid code duplication and makes tests more maintainable
 */

const { expect } = require('@playwright/test');

/**
 * Login to the ezSCM website
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} email - Email address for login
 * @param {string} password - Password for login
 */
async function loginToWebsite(page, email = 'rollinivi4+test@gmail.com', password = 'User@123') {
  console.log('🌐 Navigating to the website...');
  await page.goto('https://stagingaz.ezscm.ai/');
  console.log('✅ Website loaded!');
  
  // Wait for login form to appear
  console.log('⏳ Waiting for login form...');
  await page.waitForSelector('#email');
  console.log('✅ Login form is ready!');
  
  // Fill login form
  console.log('📝 Filling login form...');
  await page.fill('#email', email);
  await page.fill('#password', password);
  console.log('✅ Login form filled!');
  
  // Submit login
  console.log('🖱️ Clicking login button...');
  await page.click('button[type="submit"]');
  console.log('✅ Login button clicked!');
  
  // Wait for login to complete
  console.log('⏳ Waiting for login to finish...');
  await page.waitForTimeout(5000);
  console.log('✅ Login completed!');
}

/**
 * Login using keyboard actions only
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} email - Email address for login
 * @param {string} password - Password for login
 */
async function loginWithKeyboard(page, email = 'rollinivi4+test@gmail.com', password = 'User@123') {
  console.log('🌐 Navigating to the website...');
  await page.goto('https://stagingaz.ezscm.ai/');
  console.log('✅ Website loaded!');
  
  // Wait for login form to appear
  console.log('⏳ Waiting for login form...');
  await page.waitForSelector('#email');
  console.log('✅ Login form is ready!');
  
  console.log('⌨️ Login using keyboard actions...');
  
  // Type email using keyboard
  console.log('   📝 Typing email using keyboard...');
  await page.type('#email', email);
  console.log('   ✅ Email typed!');
  
  // Press Tab to move to password field
  console.log('   ⌨️ Pressing Tab to move to password field...');
  await page.keyboard.press('Tab');
  console.log('   ✅ Tab pressed!');
  
  // Type password using keyboard
  console.log('   📝 Typing password using keyboard...');
  await page.type('#password', password);
  console.log('   ✅ Password typed!');
  
  // Press Enter to submit login
  console.log('   ⌨️ Pressing Enter to submit login...');
  await page.keyboard.press('Enter');
  console.log('   ✅ Enter pressed!');
  
  // Wait for login to complete
  console.log('⏳ Waiting for login to finish...');
  await page.waitForTimeout(5000);
  console.log('✅ Login completed!');
}

/**
 * Navigate to Sales Orders page
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function navigateToSalesOrders(page) {
  console.log('🔍 Looking for Sales Orders menu...');
  
  // Try different selectors for Sales Orders menu
  let salesOrderMenu = null;
  
  // Try selector 1
  try {
    salesOrderMenu = page.locator("//li[normalize-space()='Sales Orders']");
    await salesOrderMenu.waitFor({ state: 'visible', timeout: 5000 });
    console.log('✅ Found Sales Orders menu with selector 1');
  } catch (error1) {
    console.log('⚠️ Selector 1 failed, trying selector 2...');
    
    // Try selector 2
    try {
      salesOrderMenu = page.locator("li:has-text('Sales Orders')");
      await salesOrderMenu.waitFor({ state: 'visible', timeout: 5000 });
      console.log('✅ Found Sales Orders menu with selector 2');
    } catch (error2) {
      console.log('⚠️ Selector 2 failed, trying selector 3...');
      
      // Try selector 3
      try {
        salesOrderMenu = page.locator("a:has-text('Sales Orders')");
        await salesOrderMenu.waitFor({ state: 'visible', timeout: 5000 });
        console.log('✅ Found Sales Orders menu with selector 3');
      } catch (error3) {
        console.log('❌ All selectors failed. Let me check what menus are available...');
        
        // Debug: Check what menu items are available
        const allMenuItems = page.locator('li, a');
        const menuCount = await allMenuItems.count();
        console.log(`📊 Total menu items found: ${menuCount}`);
        
        // Take screenshot to see what's on the page
        await page.screenshot({ path: 'menu-debug.png' });
        console.log('📸 Menu debug screenshot saved: menu-debug.png');
        
        throw new Error('Sales Orders menu not found');
      }
    }
  }
  
  // Click the menu
  await salesOrderMenu.click();
  console.log('✅ Sales Orders page loaded!');
  
  // Wait for page to load
  await page.waitForTimeout(5000);
  console.log('✅ Sales Orders page is ready!');
}

/**
 * Wait for search input to be ready
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} xpath - XPath for the search input
 */
async function waitForSearchInput(page, xpath = "//input[@id='salesOrder_salesOrders_searchInput']") {
  console.log('🔍 Looking for search input using XPath...');
  
  const searchInput = page.locator(xpath);
  await searchInput.waitFor({ state: 'visible', timeout: 10000 });
  console.log('✅ Search input found and ready!');
  
  return searchInput;
}

module.exports = {
  loginToWebsite,
  loginWithKeyboard,
  navigateToSalesOrders,
  waitForSearchInput
};
