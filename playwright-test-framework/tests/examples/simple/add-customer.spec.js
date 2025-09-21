/**
 * Simple Add Customer Test - Beginner Level
 * 
 * This test demonstrates adding a customer using the framework.
 * Perfect for beginners learning Playwright testing.
 */

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/LoginPage.js';
import { CustomerPage } from '../../../src/pages/CustomerPage.js';
import { TestUtils } from '../../../src/utils/TestUtils.js';

// Load test data
const testData = require('../../../config/test-data.json');

test.describe('Simple Add Customer Tests', () => {
  let loginPage;
  let customerPage;
  let testUtils;

  test.beforeEach(async ({ page }) => {
    // Initialize page objects
    loginPage = new LoginPage(page);
    customerPage = new CustomerPage(page);
    testUtils = new TestUtils(page);
    
    console.log('🚀 Starting simple add customer test...');
  });

  test('User can add a new customer @smoke', async ({ page }) => {
    console.log('👤 Testing add customer functionality...');
    
    // Step 1: Login
    await loginPage.goto(process.env.BASE_URL || 'http://localhost:3000');
    await loginPage.login(
      testData.users.user.email,
      testData.users.user.password
    );
    await loginPage.waitForLoginSuccess();
    
    // Step 2: Navigate to customer page
    await customerPage.goto(process.env.BASE_URL || 'http://localhost:3000');
    
    // Step 3: Add customer
    const customerData = testUtils.generateTestData('customer');
    await customerPage.addCustomerComplete(customerData);
    
    // Step 4: Verify customer was added
    await customerPage.assertCustomerAdded(customerData);
    
    console.log('✅ Add customer test completed successfully!');
  });

  test('User can add customer with minimal data', async ({ page }) => {
    console.log('👤 Testing add customer with minimal data...');
    
    // Login
    await loginPage.goto(process.env.BASE_URL || 'http://localhost:3000');
    await loginPage.login(
      testData.users.user.email,
      testData.users.user.password
    );
    await loginPage.waitForLoginSuccess();
    
    // Navigate to customer page
    await customerPage.goto(process.env.BASE_URL || 'http://localhost:3000');
    
    // Add customer with minimal data
    const minimalCustomerData = {
      firstName: 'Minimal',
      lastName: 'Customer',
      phone: testUtils.generatePhoneNumber()
    };
    
    await customerPage.addCustomerComplete(minimalCustomerData);
    
    // Verify customer was added
    await customerPage.assertCustomerAdded(minimalCustomerData);
    
    console.log('✅ Minimal customer test completed successfully!');
  });

  test('User can search for added customer', async ({ page }) => {
    console.log('🔍 Testing customer search functionality...');
    
    // Login
    await loginPage.goto(process.env.BASE_URL || 'http://localhost:3000');
    await loginPage.login(
      testData.users.user.email,
      testData.users.user.password
    );
    await loginPage.waitForLoginSuccess();
    
    // Navigate to customer page
    await customerPage.goto(process.env.BASE_URL || 'http://localhost:3000');
    
    // Add a customer first
    const customerData = testUtils.generateTestData('customer');
    await customerPage.addCustomerComplete(customerData);
    
    // Search for the customer
    await customerPage.searchCustomer(customerData.firstName);
    
    // Verify search results
    const results = await customerPage.getSearchResults();
    expect(results.length).toBeGreaterThan(0);
    
    console.log('✅ Customer search test completed successfully!');
  });

  test('User cannot add customer with invalid data', async ({ page }) => {
    console.log('❌ Testing customer validation...');
    
    // Login
    await loginPage.goto(process.env.BASE_URL || 'http://localhost:3000');
    await loginPage.login(
      testData.users.user.email,
      testData.users.user.password
    );
    await loginPage.waitForLoginSuccess();
    
    // Navigate to customer page
    await customerPage.goto(process.env.BASE_URL || 'http://localhost:3000');
    
    // Try to add customer with invalid data
    const invalidCustomerData = {
      firstName: '', // Empty first name
      lastName: '',  // Empty last name
      email: 'invalid-email', // Invalid email
      phone: '123' // Invalid phone
    };
    
    // Click add customer button
    await customerPage.clickAddCustomer();
    
    // Try to fill form with invalid data
    await customerPage.fillCustomerForm(invalidCustomerData);
    
    // Try to save (should fail)
    await customerPage.clickSaveCustomer();
    
    // Check for validation errors
    const hasError = await customerPage.hasErrorMessage();
    expect(hasError).toBe(true);
    
    console.log('✅ Customer validation test completed successfully!');
  });

  test('User can add customer using keyboard navigation', async ({ page }) => {
    console.log('⌨️ Testing keyboard-only customer addition...');
    
    // Login
    await loginPage.goto(process.env.BASE_URL || 'http://localhost:3000');
    await loginPage.loginWithKeyboard(
      testData.users.user.email,
      testData.users.user.password
    );
    await loginPage.waitForLoginSuccess();
    
    // Navigate to customer page
    await customerPage.goto(process.env.BASE_URL || 'http://localhost:3000');
    
    // Add customer using keyboard navigation
    const customerData = testUtils.generateTestData('customer');
    
    // Click add customer button
    await customerPage.clickAddCustomer();
    
    // Fill form using keyboard
    await customerPage.page.keyboard.press('Tab');
    await customerPage.type(customerPage.selectors.firstName, customerData.firstName);
    
    await customerPage.page.keyboard.press('Tab');
    await customerPage.type(customerPage.selectors.lastName, customerData.lastName);
    
    await customerPage.page.keyboard.press('Tab');
    await customerPage.type(customerPage.selectors.phone, customerData.phone);
    
    // Save using keyboard
    await customerPage.page.keyboard.press('Tab');
    await customerPage.page.keyboard.press('Enter');
    
    // Wait for save to complete
    await customerPage.waitForSaveComplete();
    
    console.log('✅ Keyboard customer addition test completed successfully!');
  });
});
