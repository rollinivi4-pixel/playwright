/**
 * Simple Login Test - Beginner Level
 * 
 * This test demonstrates basic login functionality using the framework.
 * Perfect for beginners learning Playwright testing.
 */

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/LoginPage.js';
import { TestUtils } from '../../../src/utils/TestUtils.js';

// Load test data
const testData = require('../../../config/test-data.json');

test.describe('Simple Login Tests', () => {
  let loginPage;
  let testUtils;

  test.beforeEach(async ({ page }) => {
    // Initialize page objects
    loginPage = new LoginPage(page);
    testUtils = new TestUtils(page);
    
    console.log('🚀 Starting simple login test...');
  });

  test('User can login with valid credentials @smoke', async ({ page }) => {
    console.log('🔐 Testing login with valid credentials...');
    
    // Navigate to login page
    await loginPage.goto(process.env.BASE_URL || 'http://localhost:3000');
    
    // Take screenshot of login page
    await loginPage.screenshot('login-page');
    
    // Perform login
    await loginPage.login(
      testData.users.user.email,
      testData.users.user.password,
      true // Keep me logged in
    );
    
    // Wait for login success
    await loginPage.waitForLoginSuccess();
    
    // Verify we're on the dashboard
    await expect(page).toHaveURL(/dashboard|sales|home/);
    
    // Take screenshot after login
    await loginPage.screenshot('login-success');
    
    console.log('✅ Login test completed successfully!');
  });

  test('User cannot login with invalid credentials', async ({ page }) => {
    console.log('🔐 Testing login with invalid credentials...');
    
    // Navigate to login page
    await loginPage.goto(process.env.BASE_URL || 'http://localhost:3000');
    
    // Try to login with invalid credentials
    await loginPage.login(
      'invalid@example.com',
      'wrongpassword',
      false
    );
    
    // Check for error message
    const hasError = await loginPage.hasErrorMessage();
    expect(hasError).toBe(true);
    
    // Take screenshot of error
    await loginPage.screenshot('login-error');
    
    console.log('✅ Invalid login test completed successfully!');
  });

  test('User can use forgot password link', async ({ page }) => {
    console.log('🔐 Testing forgot password functionality...');
    
    // Navigate to login page
    await loginPage.goto(process.env.BASE_URL || 'http://localhost:3000');
    
    // Click forgot password link
    await loginPage.clickForgotPassword();
    
    // Wait for forgot password page to load
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of forgot password page
    await loginPage.screenshot('forgot-password-page');
    
    // Verify we're on forgot password page
    await expect(page).toHaveURL(/forgot|reset|password/);
    
    console.log('✅ Forgot password test completed successfully!');
  });

  test('Login form validation works', async ({ page }) => {
    console.log('🔐 Testing login form validation...');
    
    // Navigate to login page
    await loginPage.goto(process.env.BASE_URL || 'http://localhost:3000');
    
    // Try to submit empty form
    await loginPage.clickLoginButton();
    
    // Check for validation errors
    const hasError = await loginPage.hasErrorMessage();
    expect(hasError).toBe(true);
    
    // Take screenshot of validation error
    await loginPage.screenshot('login-validation-error');
    
    console.log('✅ Login validation test completed successfully!');
  });

  test('User can login using keyboard navigation', async ({ page }) => {
    console.log('⌨️ Testing keyboard-only login...');
    
    // Navigate to login page
    await loginPage.goto(process.env.BASE_URL || 'http://localhost:3000');
    
    // Login using only keyboard
    await loginPage.loginWithKeyboard(
      testData.users.user.email,
      testData.users.user.password
    );
    
    // Wait for login success
    await loginPage.waitForLoginSuccess();
    
    // Take screenshot after keyboard login
    await loginPage.screenshot('keyboard-login-success');
    
    console.log('✅ Keyboard login test completed successfully!');
  });
});
