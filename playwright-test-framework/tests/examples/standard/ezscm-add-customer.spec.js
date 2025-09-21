/**
 * ezSCM Add Customer Test - Standard Level
 * 
 * This test demonstrates adding a customer to the ezSCM application.
 * Uses the ezSCM environment configuration and test data.
 */

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/LoginPage.js';
import { CustomerPage } from '../../../src/pages/CustomerPage.js';
import { TestUtils } from '../../../src/utils/TestUtils.js';

// Load test data
const testData = require('../../../config/test-data.json');
const environments = require('../../../config/environments.json');

test.describe('ezSCM Add Customer Tests', () => {
  let loginPage;
  let customerPage;
  let testUtils;

  test.beforeEach(async ({ page }) => {
    // Initialize page objects
    loginPage = new LoginPage(page);
    customerPage = new CustomerPage(page);
    testUtils = new TestUtils(page);
    
    console.log('🚀 Starting ezSCM add customer test...');
  });

  test('Add customer to ezSCM application @smoke @ezscm', async ({ page }) => {
    console.log('👤 Testing ezSCM add customer functionality...');
    
    const ezscmConfig = environments.ezscm;
    const ezscmUser = testData.users.ezscm;
    const ezscmCustomerData = testData.testData.customer.ezscm;
    
    // Step 1: Login to ezSCM
    console.log('🔐 Logging into ezSCM...');
    await loginPage.goto(ezscmConfig.baseUrl);
    await loginPage.login(ezscmUser.email, ezscmUser.password);
    await loginPage.waitForLoginSuccess('text=Sales Orders');
    
    // Take screenshot after login
    await loginPage.screenshot('ezscm-login-success');
    
    // Step 2: Navigate to Sales Orders
    console.log('📋 Navigating to Sales Orders...');
    await page.click('text=Sales Orders');
    await page.waitForLoadState('networkidle');
    await customerPage.screenshot('ezscm-sales-orders');
    
    // Step 3: Create New Sales Order
    console.log('🛒 Creating new sales order...');
    await page.click('button:has-text("Create New Sales Order")');
    await page.waitForSelector('text=Add Customer', { timeout: 10000 });
    await customerPage.screenshot('ezscm-create-order');
    
    // Step 4: Add Customer
    console.log('👤 Adding customer...');
    await page.click('button:has-text("Add Customer")');
    await page.waitForSelector('input[type="tel"]', { timeout: 10000 });
    await customerPage.screenshot('ezscm-add-customer-form');
    
    // Step 5: Fill customer details
    console.log('📝 Filling customer details...');
    await customerPage.fillCustomerForm(ezscmCustomerData);
    await customerPage.screenshot('ezscm-customer-details-filled');
    
    // Step 6: Save customer
    console.log('💾 Saving customer...');
    await customerPage.clickSaveCustomer();
    await customerPage.waitForSaveComplete();
    await customerPage.screenshot('ezscm-customer-saved');
    
    // Step 7: Verify customer was added
    console.log('🔍 Verifying customer was added...');
    await customerPage.assertCustomerAdded(ezscmCustomerData);
    
    console.log('✅ ezSCM add customer test completed successfully!');
  });

  test('Add multiple customers to ezSCM', async ({ page }) => {
    console.log('👥 Testing multiple customer addition...');
    
    const ezscmConfig = environments.ezscm;
    const ezscmUser = testData.users.ezscm;
    
    // Login to ezSCM
    await loginPage.goto(ezscmConfig.baseUrl);
    await loginPage.login(ezscmUser.email, ezscmUser.password);
    await loginPage.waitForLoginSuccess('text=Sales Orders');
    
    // Navigate to Sales Orders
    await page.click('text=Sales Orders');
    await page.waitForLoadState('networkidle');
    
    // Add multiple customers
    const customers = [
      {
        firstName: 'Customer1',
        lastName: 'Test1',
        phone: testUtils.generatePhoneNumber(),
        address: 'Address 1, City 1, State 1',
        pincode: '11111'
      },
      {
        firstName: 'Customer2',
        lastName: 'Test2',
        phone: testUtils.generatePhoneNumber(),
        address: 'Address 2, City 2, State 2',
        pincode: '22222'
      },
      {
        firstName: 'Customer3',
        lastName: 'Test3',
        phone: testUtils.generatePhoneNumber(),
        address: 'Address 3, City 3, State 3',
        pincode: '33333'
      }
    ];
    
    for (let i = 0; i < customers.length; i++) {
      console.log(`👤 Adding customer ${i + 1}/${customers.length}...`);
      
      // Create new sales order for each customer
      await page.click('button:has-text("Create New Sales Order")');
      await page.waitForSelector('text=Add Customer', { timeout: 10000 });
      
      // Add customer
      await page.click('button:has-text("Add Customer")');
      await page.waitForSelector('input[type="tel"]', { timeout: 10000 });
      
      // Fill customer details
      await customerPage.fillCustomerForm(customers[i]);
      
      // Save customer
      await customerPage.clickSaveCustomer();
      await customerPage.waitForSaveComplete();
      
      // Take screenshot
      await customerPage.screenshot(`ezscm-customer-${i + 1}-saved`);
      
      console.log(`✅ Customer ${i + 1} added successfully`);
    }
    
    console.log('✅ Multiple customers test completed successfully!');
  });

  test('ezSCM customer search and verification', async ({ page }) => {
    console.log('🔍 Testing ezSCM customer search...');
    
    const ezscmConfig = environments.ezscm;
    const ezscmUser = testData.users.ezscm;
    const ezscmCustomerData = testData.testData.customer.ezscm;
    
    // Login to ezSCM
    await loginPage.goto(ezscmConfig.baseUrl);
    await loginPage.login(ezscmUser.email, ezscmUser.password);
    await loginPage.waitForLoginSuccess('text=Sales Orders');
    
    // Navigate to Sales Orders
    await page.click('text=Sales Orders');
    await page.waitForLoadState('networkidle');
    
    // Search for existing customer
    console.log('🔍 Searching for customer...');
    await page.fill('[data-test="search-input"]', ezscmCustomerData.firstName);
    await page.press('[data-test="search-input"]', 'Enter');
    await page.waitForTimeout(2000);
    
    // Take screenshot of search results
    await customerPage.screenshot('ezscm-search-results');
    
    // Verify search results
    const results = await page.locator('[data-test="result"]').count();
    expect(results).toBeGreaterThan(0);
    
    console.log('✅ ezSCM customer search test completed successfully!');
  });

  test('ezSCM customer form validation', async ({ page }) => {
    console.log('✅ Testing ezSCM customer form validation...');
    
    const ezscmConfig = environments.ezscm;
    const ezscmUser = testData.users.ezscm;
    
    // Login to ezSCM
    await loginPage.goto(ezscmConfig.baseUrl);
    await loginPage.login(ezscmUser.email, ezscmUser.password);
    await loginPage.waitForLoginSuccess('text=Sales Orders');
    
    // Navigate to Sales Orders
    await page.click('text=Sales Orders');
    await page.waitForLoadState('networkidle');
    
    // Create new sales order
    await page.click('button:has-text("Create New Sales Order")');
    await page.waitForSelector('text=Add Customer', { timeout: 10000 });
    
    // Add customer
    await page.click('button:has-text("Add Customer")');
    await page.waitForSelector('input[type="tel"]', { timeout: 10000 });
    
    // Try to save empty form
    await page.click('button:has-text("Save Customer")');
    
    // Check for validation errors
    await page.waitForTimeout(2000);
    await customerPage.screenshot('ezscm-validation-errors');
    
    // Verify validation errors are shown
    const hasErrors = await page.locator('.error, .invalid, [data-test="error"]').count();
    expect(hasErrors).toBeGreaterThan(0);
    
    console.log('✅ ezSCM customer validation test completed successfully!');
  });

  test('ezSCM keyboard navigation test', async ({ page }) => {
    console.log('⌨️ Testing ezSCM keyboard navigation...');
    
    const ezscmConfig = environments.ezscm;
    const ezscmUser = testData.users.ezscm;
    const ezscmCustomerData = testData.testData.customer.ezscm;
    
    // Login using keyboard
    await loginPage.goto(ezscmConfig.baseUrl);
    await loginPage.loginWithKeyboard(ezscmUser.email, ezscmUser.password);
    await loginPage.waitForLoginSuccess('text=Sales Orders');
    
    // Navigate using keyboard
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter'); // Sales Orders
    
    await page.waitForLoadState('networkidle');
    
    // Create new sales order using keyboard
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter'); // Create New Sales Order
    
    await page.waitForSelector('text=Add Customer', { timeout: 10000 });
    
    // Add customer using keyboard
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter'); // Add Customer
    
    await page.waitForSelector('input[type="tel"]', { timeout: 10000 });
    
    // Fill form using keyboard
    await page.keyboard.type(ezscmCustomerData.phone, { delay: 100 });
    await page.keyboard.press('Tab');
    await page.keyboard.type(ezscmCustomerData.firstName, { delay: 100 });
    await page.keyboard.press('Tab');
    await page.keyboard.type(ezscmCustomerData.lastName, { delay: 100 });
    await page.keyboard.press('Tab');
    await page.keyboard.type(ezscmCustomerData.address, { delay: 100 });
    await page.keyboard.press('Tab');
    await page.keyboard.type(ezscmCustomerData.pincode, { delay: 100 });
    
    // Save using keyboard
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter'); // Save Customer
    
    await customerPage.waitForSaveComplete();
    await customerPage.screenshot('ezscm-keyboard-navigation-complete');
    
    console.log('✅ ezSCM keyboard navigation test completed successfully!');
  });
});
