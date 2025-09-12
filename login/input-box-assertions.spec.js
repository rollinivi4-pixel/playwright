import { test, expect } from '@playwright/test';

test.describe('Input Box Assertions - Complete Guide', () => {
  
  test('Basic Input Box Assertions', async ({ page }) => {
    console.log('📝 Testing Basic Input Box Assertions...');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    
    // ========================================
    // 1. VISIBILITY ASSERTIONS
    // ========================================
    console.log('👁️ Testing Visibility Assertions...');
    
    // Check if input is visible
    await expect(page.locator('input[type="email"]')).toBeVisible();
    console.log('✅ Email input is visible');
    
    // Check if input is hidden
    await expect(page.locator('input[type="hidden"]')).toBeHidden();
    console.log('✅ Hidden input is hidden');
    
    // Check if input is attached to DOM
    await expect(await page.locator('input[type="email"]')).toBeAttached();
    console.log('✅ Email input is attached to DOM');
    
    // ========================================
    // 2. ENABLED/DISABLED ASSERTIONS
    // ========================================
    console.log('🔓 Testing Enabled/Disabled Assertions...');
    
    // Check if input is enabled
    await expect(page.locator('input[type="email"]')).toBeEnabled();
    console.log('✅ Email input is enabled');
    
    // Check if input is disabled
    await expect(page.locator('input[disabled]')).toBeDisabled();
    console.log('✅ Disabled input is disabled');
    
    // ========================================
    // 3. VALUE ASSERTIONS
    // ========================================
    console.log('💬 Testing Value Assertions...');
    
    // Fill input and check value
    await page.fill('input[type="email"]', 'test@example.com');
    await expect(page.locator('input[type="email"]')).toHaveValue('test@example.com');
    console.log('✅ Email input has correct value');
    
    // Check empty value
    await page.fill('input[type="email"]', '');
    await expect(page.locator('input[type="email"]')).toHaveValue('');
    console.log('✅ Email input is empty');
    
    // Check value with regex
    await page.fill('input[type="email"]', 'user@domain.com');
    await expect(page.locator('input[type="email"]')).toHaveValue(/user@/);
    console.log('✅ Email input value matches regex');
    
    // ========================================
    // 4. ATTRIBUTE ASSERTIONS
    // ========================================
    console.log('🏷️ Testing Attribute Assertions...');
    
    // Check input type
    await expect(page.locator('input[type="email"]')).toHaveAttribute('type', 'email');
    console.log('✅ Email input has correct type attribute');
    
    // Check placeholder
    await expect(page.locator('input[type="email"]')).toHaveAttribute('placeholder');
    console.log('✅ Email input has placeholder attribute');
    
    // Check required attribute
    await expect(page.locator('input[type="email"]')).toHaveAttribute('required');
    console.log('✅ Email input has required attribute');
    
    // Check name attribute
    await expect(page.locator('input[type="email"]')).toHaveAttribute('name');
    console.log('✅ Email input has name attribute');
    
    // Check id attribute
    await expect(page.locator('input[type="email"]')).toHaveAttribute('id');
    console.log('✅ Email input has id attribute');
    
    // ========================================
    // 5. CSS CLASS ASSERTIONS
    // ========================================
    console.log('🎨 Testing CSS Class Assertions...');
    
    // Check if input has specific class
    await expect(page.locator('input[type="email"]')).toHaveClass(/form-control/);
    console.log('✅ Email input has form-control class');
    
    // Check if input has multiple classes
    await expect(page.locator('input[type="email"]')).toHaveClass(/form-control|input/);
    console.log('✅ Email input has form-control or input class');
    
    // ========================================
    // 6. CSS PROPERTY ASSERTIONS
    // ========================================
    console.log('🎨 Testing CSS Property Assertions...');
    
    // Check background color
    await expect(page.locator('input[type="email"]')).toHaveCSS('background-color');
    console.log('✅ Email input has background-color');
    
    // Check border
    await expect(page.locator('input[type="email"]')).toHaveCSS('border');
    console.log('✅ Email input has border');
    
    // Check font size
    await expect(page.locator('input[type="email"]')).toHaveCSS('font-size');
    console.log('✅ Email input has font-size');
    
    // ========================================
    // 7. FOCUS ASSERTIONS
    // ========================================
    console.log('🎯 Testing Focus Assertions...');
    
    // Click input to focus
    await page.click('input[type="email"]');
    await expect(page.locator('input[type="email"]')).toBeFocused();
    console.log('✅ Email input is focused');
    
    // Click elsewhere to unfocus
    await page.click('body');
    await expect(page.locator('input[type="email"]')).not.toBeFocused();
    console.log('✅ Email input is not focused');
  });
  
  test('Input Box Validation Assertions', async ({ page }) => {
    console.log('✅ Testing Input Box Validation Assertions...');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    
    // ========================================
    // 1. REQUIRED FIELD ASSERTIONS
    // ========================================
    console.log('🔴 Testing Required Field Assertions...');
    
    // Check if input is required
    await expect(page.locator('input[type="email"]')).toHaveAttribute('required');
    console.log('✅ Email input is required');
    
    // Check if input has required attribute
    await expect(page.locator('input[type="password"]')).toHaveAttribute('required');
    console.log('✅ Password input is required');
    
    // ========================================
    // 2. PLACEHOLDER ASSERTIONS
    // ========================================
    console.log('💭 Testing Placeholder Assertions...');
    
    // Check placeholder text
    await expect(page.locator('input[type="email"]')).toHaveAttribute('placeholder', /email/i);
    console.log('✅ Email input has email placeholder');
    
    // Check placeholder exists
    await expect(page.locator('input[type="password"]')).toHaveAttribute('placeholder');
    console.log('✅ Password input has placeholder');
    
    // ========================================
    // 3. MAXLENGTH ASSERTIONS
    // ========================================
    console.log('📏 Testing MaxLength Assertions...');
    
    // Check maxlength attribute
    await expect(page.locator('input[type="email"]')).toHaveAttribute('maxlength');
    console.log('✅ Email input has maxlength attribute');
    
    // Check specific maxlength value
    await expect(page.locator('input[type="email"]')).toHaveAttribute('maxlength', '50');
    console.log('✅ Email input has maxlength of 50');
    
    // ========================================
    // 4. MINLENGTH ASSERTIONS
    // ========================================
    console.log('📏 Testing MinLength Assertions...');
    
    // Check minlength attribute
    await expect(page.locator('input[type="password"]')).toHaveAttribute('minlength');
    console.log('✅ Password input has minlength attribute');
    
    // Check specific minlength value
    await expect(page.locator('input[type="password"]')).toHaveAttribute('minlength', '6');
    console.log('✅ Password input has minlength of 6');
    
    // ========================================
    // 5. PATTERN ASSERTIONS
    // ========================================
    console.log('🔍 Testing Pattern Assertions...');
    
    // Check pattern attribute
    await expect(page.locator('input[type="email"]')).toHaveAttribute('pattern');
    console.log('✅ Email input has pattern attribute');
    
    // Check specific pattern
    await expect(page.locator('input[type="email"]')).toHaveAttribute('pattern', /email/);
    console.log('✅ Email input has email pattern');
  });
  
  test('Input Box Interaction Assertions', async ({ page }) => {
    console.log('🖱️ Testing Input Box Interaction Assertions...');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    
    // ========================================
    // 1. CLICK ASSERTIONS
    // ========================================
    console.log('👆 Testing Click Assertions...');
    
    // Click input and check if it's focused
    await page.click('input[type="email"]');
    await expect(page.locator('input[type="email"]')).toBeFocused();
    console.log('✅ Email input is clickable and focused');
    
    // ========================================
    // 2. FILL ASSERTIONS
    // ========================================
    console.log('✏️ Testing Fill Assertions...');
    
    // Fill input and check value
    await page.fill('input[type="email"]', 'test@example.com');
    await expect(page.locator('input[type="email"]')).toHaveValue('test@example.com');
    console.log('✅ Email input can be filled');
    
    // Clear input and check if empty
    await page.fill('input[type="email"]', '');
    await expect(page.locator('input[type="email"]')).toHaveValue('');
    console.log('✅ Email input can be cleared');
    
    // ========================================
    // 3. TYPE ASSERTIONS
    // ========================================
    console.log('⌨️ Testing Type Assertions...');
    
    // Type in input and check value
    await page.type('input[type="email"]', 'user@domain.com');
    await expect(page.locator('input[type="email"]')).toHaveValue('user@domain.com');
    console.log('✅ Email input can be typed in');
    
    // ========================================
    // 4. KEYBOARD ASSERTIONS
    // ========================================
    console.log('⌨️ Testing Keyboard Assertions...');
    
    // Press Enter and check if form submits
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.press('input[type="password"]', 'Enter');
    
    // Check if page navigates (form submission)
    await expect(page).toHaveURL(/dashboard/);
    console.log('✅ Enter key submits form');
  });
  
  test('Input Box Error State Assertions', async ({ page }) => {
    console.log('❌ Testing Input Box Error State Assertions...');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    
    // ========================================
    // 1. ERROR CLASS ASSERTIONS
    // ========================================
    console.log('🔴 Testing Error Class Assertions...');
    
    // Fill invalid data and submit
    await page.fill('input[type="email"]', 'invalid-email');
    await page.fill('input[type="password"]', 'wrong-password');
    await page.click('button[type="submit"]');
    
    // Check if input has error class
    await expect(page.locator('input[type="email"]')).toHaveClass(/error/);
    console.log('✅ Email input has error class');
    
    // Check if input has invalid class
    await expect(page.locator('input[type="email"]')).toHaveClass(/invalid/);
    console.log('✅ Email input has invalid class');
    
    // ========================================
    // 2. ERROR MESSAGE ASSERTIONS
    // ========================================
    console.log('💬 Testing Error Message Assertions...');
    
    // Check if error message is visible
    await expect(page.locator('.error-message')).toBeVisible();
    console.log('✅ Error message is visible');
    
    // Check error message text
    await expect(page.locator('.error-message')).toContainText('Invalid');
    console.log('✅ Error message contains "Invalid"');
    
    // ========================================
    // 3. VALIDATION STATE ASSERTIONS
    // ========================================
    console.log('✅ Testing Validation State Assertions...');
    
    // Check if input is invalid
    await expect(page.locator('input[type="email"]')).toHaveAttribute('aria-invalid', 'true');
    console.log('✅ Email input has aria-invalid attribute');
    
    // Check if input has validation message
    await expect(page.locator('input[type="email"]')).toHaveAttribute('aria-describedby');
    console.log('✅ Email input has aria-describedby attribute');
  });
  
  test('Input Box Accessibility Assertions', async ({ page }) => {
    console.log('♿ Testing Input Box Accessibility Assertions...');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    
    // ========================================
    // 1. LABEL ASSERTIONS
    // ========================================
    console.log('🏷️ Testing Label Assertions...');
    
    // Check if input has associated label
    await expect(page.locator('input[type="email"]')).toHaveAttribute('aria-label');
    console.log('✅ Email input has aria-label');
    
    // Check if input has aria-labelledby
    await expect(page.locator('input[type="email"]')).toHaveAttribute('aria-labelledby');
    console.log('✅ Email input has aria-labelledby');
    
    // ========================================
    // 2. ARIA ATTRIBUTES ASSERTIONS
    // ========================================
    console.log('🔍 Testing ARIA Attributes Assertions...');
    
    // Check aria-required
    await expect(page.locator('input[type="email"]')).toHaveAttribute('aria-required', 'true');
    console.log('✅ Email input has aria-required');
    
    // Check aria-describedby
    await expect(page.locator('input[type="email"]')).toHaveAttribute('aria-describedby');
    console.log('✅ Email input has aria-describedby');
    
    // ========================================
    // 3. ROLE ASSERTIONS
    // ========================================
    console.log('🎭 Testing Role Assertions...');
    
    // Check if input has correct role
    await expect(page.locator('input[type="email"]')).toHaveAttribute('role', 'textbox');
    console.log('✅ Email input has textbox role');
    
    // Check if input has correct type
    await expect(page.locator('input[type="email"]')).toHaveAttribute('type', 'email');
    console.log('✅ Email input has email type');
  });
  
  test('Input Box Soft Assertions Example', async ({ page }) => {
    console.log('🪶 Testing Input Box Soft Assertions...');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    
    // ========================================
    // SOFT ASSERTIONS FOR COMPREHENSIVE VALIDATION
    // ========================================
    console.log('🔍 Testing Comprehensive Input Validation...');
    
    // Soft assertion 1: Check if email input is visible
    await expect.soft(page.locator('input[type="email"]')).toBeVisible();
    console.log('✅ Soft: Email input is visible');
    
    // Soft assertion 2: Check if email input is enabled
    await expect.soft(page.locator('input[type="email"]')).toBeEnabled();
    console.log('✅ Soft: Email input is enabled');
    
    // Soft assertion 3: Check if email input has required attribute
    await expect.soft(page.locator('input[type="email"]')).toHaveAttribute('required');
    console.log('✅ Soft: Email input is required');
    
    // Soft assertion 4: Check if email input has placeholder
    await expect.soft(page.locator('input[type="email"]')).toHaveAttribute('placeholder');
    console.log('✅ Soft: Email input has placeholder');
    
    // Soft assertion 5: Check if email input has correct type
    await expect.soft(page.locator('input[type="email"]')).toHaveAttribute('type', 'email');
    console.log('✅ Soft: Email input has email type');
    
    // Soft assertion 6: Check if password input is visible
    await expect.soft(page.locator('input[type="password"]')).toBeVisible();
    console.log('✅ Soft: Password input is visible');
    
    // Soft assertion 7: Check if password input is enabled
    await expect.soft(page.locator('input[type="password"]')).toBeEnabled();
    console.log('✅ Soft: Password input is enabled');
    
    // Soft assertion 8: Check if password input has required attribute
    await expect.soft(page.locator('input[type="password"]')).toHaveAttribute('required');
    console.log('✅ Soft: Password input is required');
    
    // Soft assertion 9: Check if password input has placeholder
    await expect.soft(page.locator('input[type="password"]')).toHaveAttribute('placeholder');
    console.log('✅ Soft: Password input has placeholder');
    
    // Soft assertion 10: Check if password input has correct type
    await expect.soft(page.locator('input[type="password"]')).toHaveAttribute('type', 'password');
    console.log('✅ Soft: Password input has password type');
    
    console.log('🎉 All soft assertions completed! (Failures reported at end)');
  });
  
  test('Input Box Mixed Assertions Best Practice', async ({ page }) => {
    console.log('🎯 Testing Input Box Mixed Assertions (Best Practice)...');
    
    // HARD: Critical page load
    await page.goto('https://stagingaz.ezscm.ai/');
    await expect(page).toHaveURL('https://stagingaz.ezscm.ai/');
    console.log('✅ Hard: Page loaded correctly');
    
    // HARD: Essential form must exist
    await expect(page.locator('form')).toBeVisible();
    console.log('✅ Hard: Form is visible');
    
    // SOFT: Multiple input field validations
    await expect.soft(page.locator('input[type="email"]')).toBeVisible();
    console.log('✅ Soft: Email input is visible');
    
    await expect.soft(page.locator('input[type="email"]')).toBeEnabled();
    console.log('✅ Soft: Email input is enabled');
    
    await expect.soft(page.locator('input[type="email"]')).toHaveAttribute('required');
    console.log('✅ Soft: Email input is required');
    
    await expect.soft(page.locator('input[type="password"]')).toBeVisible();
    console.log('✅ Soft: Password input is visible');
    
    await expect.soft(page.locator('input[type="password"]')).toBeEnabled();
    console.log('✅ Soft: Password input is enabled');
    
    await expect.soft(page.locator('input[type="password"]')).toHaveAttribute('required');
    console.log('✅ Soft: Password input is required');
    
    // HARD: Critical action - fill and submit
    await page.fill('input[type="email"]', 'rollinivi4+test@gmail.com');
    await page.fill('input[type="password"]', 'User@123');
    await page.click('button[type="submit"]');
    
    // HARD: Critical result - must redirect
    await expect(page).toHaveURL(/dashboard/);
    console.log('✅ Hard: Login successful and redirected');
    
    console.log('🎉 Mixed assertions completed successfully!');
  });
});
