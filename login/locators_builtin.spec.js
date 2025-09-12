import { test, expect } from '@playwright/test';

test.describe('ezSCM Login Tests', () => {
//   test1 : login to ezSCM website
  test('login to ezSCM website', async ({ page }) => {
    console.log('🚀 Starting login test...');
    
    console.log('📱 Navigating to ezSCM website...');
    await page.goto('http://192.168.0.100:3000/');
    console.log('✅ Page loaded successfully');
    
    console.log('📧 Filling email field...');
    await page.fill('#email', 'rollinivi4+test@gmail.com');
    console.log('✅ Email filled: rollinivi4+test@gmail.com');
    
    console.log('🔒 Filling password field...');
    await page.fill('#password', 'User@123');
    console.log('✅ Password filled');
    
    console.log('☑️ Checking "Keep me logged in" checkbox...');
    await page.check('input[type="checkbox"]');
    console.log('✅ Checkbox checked');
    
    console.log('🖱️ Clicking login button...');
    await page.click('button[type="submit"]');
    console.log('✅ Login button clicked');
    
    console.log('📸 Taking screenshot...');
    await page.screenshot({ path: 'screenshot.png' });
    console.log('✅ Screenshot saved as screenshot.png');
    
    console.log('🎥 Video recording is enabled in config...');
    console.log('✅ Video will be saved automatically for ALL tests (pass or fail)');
    
    console.log('🔍 Checking if login was successful...');
    
    // Wait for navigation or page change after login
    try {
      // Wait for either navigation to happen or stay on login page
      await Promise.race([
        page.waitForURL('**/dashboard**', { timeout: 10000 }),
        page.waitForURL('**/home**', { timeout: 10000 }),
        page.waitForURL('**/main**', { timeout: 10000 }),
        page.waitForTimeout(5000) // Fallback timeout
      ]);
    } catch (e) {
      console.log('⚠️ No navigation detected, continuing...');
    }
    
    console.log('✅ Login process completed - checking current page...');
    
    // Check current URL
    const currentUrl = page.url();
    console.log('📍 Current URL:', currentUrl);
    
    // Test passes if we can see the page (either login page or redirected page)
    await expect(page.locator('body')).toBeVisible();
    console.log('✅ Page is visible');


    const logo = await page.getByAltText('saveplex logo');
    await expect(logo).toBeVisible();
    // click on the logo
    await logo.click();
    // check if the logo is visible
    await expect(logo).toBeVisible();
    // take screenshot of the logo
    await page.screenshot({ path: 'screenshot-logo.png' });
    console.log('✅ Logo found:', logo);

    // // get by placeholder
    // const pageholder = await page.getByPlaceholder('Search for a page');
    // await expect(pageholder).toBeVisible();
    // // fill the pageholder
    // await pageholder.fill('New Page');
    // // check if the pageholder is visible
    // await expect(pageholder).toBeVisible();
    // // take screenshot of the pageholder

    // Navigate to Sales Orders - Simple approach
    console.log('🔍 Looking for Sales Orders...');
    
    // Find and click Sales Orders
    const salesOrder = page.locator('text=Sales Orders');
    await expect(salesOrder).toBeVisible();
    console.log('✅ Sales Orders found');
    
    await salesOrder.click();
    console.log('✅ Sales Orders clicked');
    
    // Wait for page to load
    await page.waitForTimeout(5000);
    
    // Take screenshot
    await page.screenshot({ path: 'screenshot-salesOrder.png' });
    console.log('✅ Screenshot saved as screenshot-salesOrder.png');

    // Click on the Create Sales Order button using getByRole
    console.log('🔍 Looking for Create Sales Order button...');
    
    // Wait a moment for the page to fully load
    await page.waitForTimeout(5000);
    
    // Use getByRole with the button text content
    const createSalesOrder = page.getByRole('button', { name: 'Create New Sales Order' });
    await expect(createSalesOrder).toBeVisible();
    console.log('✅ Create Sales Order button found');
    
    await createSalesOrder.click();
    console.log('✅ Create Sales Order button clicked');
    
    // Take screenshot after clicking
    await page.screenshot({ path: 'screenshot-createSalesOrder.png' });
    console.log('✅ Screenshot saved as screenshot-createSalesOrder.png');


    
    console.log('✅ Test completed successfully!');
  });
});