import { test, expect } from '@playwright/test';

test.describe('Hard vs Soft Assertions Examples', () => {
  
  test('Hard Assertions - Stops on First Failure', async ({ page }) => {
    console.log('🔥 Testing HARD ASSERTIONS...');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    
    // HARD ASSERTION 1: If this fails, test stops here
    await expect(page.locator('body')).toBeVisible();
    console.log('✅ Hard assertion 1 passed');
    
    // HARD ASSERTION 2: This will NOT run if above fails
    await expect(page.locator('form')).toBeVisible();
    console.log('✅ Hard assertion 2 passed');
    
    // HARD ASSERTION 3: This will NOT run if any above fails
    await expect(page.locator('input[type="email"]')).toBeVisible();
    console.log('✅ Hard assertion 3 passed');
    
    console.log('🎉 All hard assertions passed!');
  });
  
  test('Soft Assertions - Continues on Failures', async ({ page }) => {
    console.log('🪶 Testing SOFT ASSERTIONS...');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    
    // SOFT ASSERTION 1: If this fails, test continues
    await expect.soft(page.locator('body')).toBeVisible();
    console.log('✅ Soft assertion 1 checked');
    
    // SOFT ASSERTION 2: This will run even if above fails
    await expect.soft(page.locator('form')).toBeVisible();
    console.log('✅ Soft assertion 2 checked');
    
    // SOFT ASSERTION 3: This will run even if any above fails
    await expect.soft(page.locator('input[type="email"]')).toBeVisible();
    console.log('✅ Soft assertion 3 checked');
    
    // SOFT ASSERTION 4: This will also run
    await expect.soft(page.locator('input[type="password"]')).toBeVisible();
    console.log('✅ Soft assertion 4 checked');
    
    // SOFT ASSERTION 5: This will also run
    await expect.soft(page.locator('button[type="submit"]')).toBeVisible();
    console.log('✅ Soft assertion 5 checked');
    
    console.log('🎉 All soft assertions checked! (Failures reported at end)');
  });
  
  test('Mixed Assertions - Best Practice', async ({ page }) => {
    console.log('🎯 Testing MIXED ASSERTIONS (Best Practice)...');
    
    // HARD: Critical page load
    await page.goto('https://stagingaz.ezscm.ai/');
    await expect(page).toHaveURL('https://stagingaz.ezscm.ai/');
    console.log('✅ Hard: Page loaded correctly');
    
    // HARD: Essential elements must exist
    await expect(page.locator('body')).toBeVisible();
    console.log('✅ Hard: Body is visible');
    
    // SOFT: Multiple form field validations
    await expect.soft(page.locator('input[type="email"]')).toBeVisible();
    console.log('✅ Soft: Email field checked');
    
    await expect.soft(page.locator('input[type="password"]')).toBeVisible();
    console.log('✅ Soft: Password field checked');
    
    await expect.soft(page.locator('button[type="submit"]')).toBeVisible();
    console.log('✅ Soft: Submit button checked');
    
    await expect.soft(page.locator('input[type="checkbox"]')).toBeVisible();
    console.log('✅ Soft: Checkbox checked');
    
    // HARD: Critical action
    await page.fill('input[type="email"]', 'rollinivi4+test@gmail.com');
    await page.fill('input[type="password"]', 'User@123');
    await page.click('button[type="submit"]');
    
    // HARD: Critical result
    await expect(page).toHaveURL(/dashboard/);
    console.log('✅ Hard: Login successful');
    
    console.log('🎉 Mixed assertions completed!');
  });
  
  test('Form Validation with Soft Assertions', async ({ page }) => {
    console.log('📋 Testing FORM VALIDATION with Soft Assertions...');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    
    // Fill form with invalid data
    await page.fill('input[type="email"]', 'invalid-email');
    await page.fill('input[type="password"]', 'wrong-password');
    await page.click('button[type="submit"]');
    
    // SOFT: Check multiple validation messages
    await expect.soft(page.locator('.error-message')).toBeVisible();
    console.log('✅ Soft: Error message checked');
    
    await expect.soft(page.locator('.error-message')).toContainText('Invalid');
    console.log('✅ Soft: Error text checked');
    
    await expect.soft(page.locator('input[type="email"]')).toHaveClass(/error/);
    console.log('✅ Soft: Email field error class checked');
    
    await expect.soft(page.locator('input[type="password"]')).toHaveClass(/error/);
    console.log('✅ Soft: Password field error class checked');
    
    console.log('🎉 Form validation with soft assertions completed!');
  });
  
  test('Login Flow with Hard Assertions', async ({ page }) => {
    console.log('🔐 Testing LOGIN FLOW with Hard Assertions...');
    
    // HARD: Must load page
    await page.goto('https://stagingaz.ezscm.ai/');
    await expect(page).toHaveURL('https://stagingaz.ezscm.ai/');
    console.log('✅ Hard: Page loaded');
    
    // HARD: Must have login form
    await expect(page.locator('form')).toBeVisible();
    console.log('✅ Hard: Login form visible');
    
    // HARD: Must have required fields
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    console.log('✅ Hard: Required fields present');
    
    // HARD: Must be able to fill and submit
    await page.fill('input[type="email"]', 'rollinivi4+test@gmail.com');
    await page.fill('input[type="password"]', 'User@123');
    await page.click('button[type="submit"]');
    
    // HARD: Must redirect to dashboard
    await expect(page).toHaveURL(/dashboard/);
    console.log('✅ Hard: Redirected to dashboard');
    
    // HARD: Must see welcome message
    await expect(page.locator('text=Welcome')).toBeVisible();
    console.log('✅ Hard: Welcome message visible');
    
    console.log('🎉 Login flow with hard assertions completed!');
  });
  
  test('Comprehensive Page Validation with Soft Assertions', async ({ page }) => {
    console.log('🔍 Testing COMPREHENSIVE PAGE VALIDATION...');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    
    // SOFT: Check all page elements
    await expect.soft(page.locator('body')).toBeVisible();
    console.log('✅ Soft: Body visible');
    
    await expect.soft(page.locator('form')).toBeVisible();
    console.log('✅ Soft: Form visible');
    
    await expect.soft(page.locator('input[type="email"]')).toBeVisible();
    console.log('✅ Soft: Email input visible');
    
    await expect.soft(page.locator('input[type="password"]')).toBeVisible();
    console.log('✅ Soft: Password input visible');
    
    await expect.soft(page.locator('button[type="submit"]')).toBeVisible();
    console.log('✅ Soft: Submit button visible');
    
    await expect.soft(page.locator('input[type="checkbox"]')).toBeVisible();
    console.log('✅ Soft: Checkbox visible');
    
    await expect.soft(page.locator('a[href*="forgot"]')).toBeVisible();
    console.log('✅ Soft: Forgot password link visible');
    
    await expect.soft(page.locator('img[alt*="logo"]')).toBeVisible();
    console.log('✅ Soft: Logo visible');
    
    // SOFT: Check form attributes
    await expect.soft(page.locator('input[type="email"]')).toHaveAttribute('type', 'email');
    console.log('✅ Soft: Email input type correct');
    
    await expect.soft(page.locator('input[type="password"]')).toHaveAttribute('type', 'password');
    console.log('✅ Soft: Password input type correct');
    
    await expect.soft(page.locator('button[type="submit"]')).toHaveAttribute('type', 'submit');
    console.log('✅ Soft: Submit button type correct');
    
    console.log('🎉 Comprehensive validation completed!');
  });
  
  test('Error Handling with Mixed Assertions', async ({ page }) => {
    console.log('⚠️ Testing ERROR HANDLING with Mixed Assertions...');
    
    // HARD: Must load page
    await page.goto('https://stagingaz.ezscm.ai/');
    await expect(page).toHaveURL('https://stagingaz.ezscm.ai/');
    console.log('✅ Hard: Page loaded');
    
    // HARD: Must have form
    await expect(page.locator('form')).toBeVisible();
    console.log('✅ Hard: Form visible');
    
    // Fill with invalid data
    await page.fill('input[type="email"]', 'invalid-email');
    await page.fill('input[type="password"]', 'wrong-password');
    await page.click('button[type="submit"]');
    
    // HARD: Must stay on login page (not redirect)
    await expect(page).toHaveURL('https://stagingaz.ezscm.ai/');
    console.log('✅ Hard: Still on login page');
    
    // SOFT: Check error indicators
    await expect.soft(page.locator('.error-message')).toBeVisible();
    console.log('✅ Soft: Error message visible');
    
    await expect.soft(page.locator('.error-message')).toContainText('Invalid');
    console.log('✅ Soft: Error message contains "Invalid"');
    
    await expect.soft(page.locator('input[type="email"]')).toHaveClass(/error/);
    console.log('✅ Soft: Email field has error class');
    
    await expect.soft(page.locator('input[type="password"]')).toHaveClass(/error/);
    console.log('✅ Soft: Password field has error class');
    
    console.log('🎉 Error handling validation completed!');
  });
});
