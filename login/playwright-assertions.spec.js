import { test, expect } from '@playwright/test';

test.describe('Playwright Assertions - Complete Reference', () => {
  
  test('All Playwright Assertions Examples', async ({ page }) => {
    console.log('🚀 Starting comprehensive assertions test...');
    
    // Navigate to a test page
    await page.goto('https://stagingaz.ezscm.ai/');
    
    // ========================================
    // 1. VISIBILITY ASSERTIONS
    // ========================================
    console.log('📋 Testing Visibility Assertions...');
    
    // Check if element is visible
    await expect(page.locator('body')).toBeVisible();
    console.log('✅ Element is visible');
    
    // Check if element is hidden
    await expect(page.locator('.hidden-element')).toBeHidden();
    console.log('✅ Element is hidden');
    
    // Check if element is attached to DOM
    await expect(page.locator('body')).toBeAttached();
    console.log('✅ Element is attached to DOM');
    
    // Check if element is detached from DOM
    await expect(page.locator('.detached-element')).toBeDetached();
    console.log('✅ Element is detached from DOM');
    
    // ========================================
    // 2. ENABLED/DISABLED ASSERTIONS
    // ========================================
    console.log('📋 Testing Enabled/Disabled Assertions...');
    
    // Check if element is enabled
    await expect(page.locator('input[type="email"]')).toBeEnabled();
    console.log('✅ Element is enabled');
    
    // Check if element is disabled
    await expect(page.locator('input[disabled]')).toBeDisabled();
    console.log('✅ Element is disabled');
    
    // ========================================
    // 3. CHECKED/UNCHECKED ASSERTIONS
    // ========================================
    console.log('📋 Testing Checked/Unchecked Assertions...');
    
    // Check if checkbox/radio is checked
    await expect(page.locator('input[type="checkbox"]')).toBeChecked();
    console.log('✅ Element is checked');
    
    // Check if checkbox/radio is unchecked
    await expect(page.locator('input[type="checkbox"]')).not.toBeChecked();
    console.log('✅ Element is unchecked');
    
    // ========================================
    // 4. SELECTED ASSERTIONS
    // ========================================
    console.log('📋 Testing Selected Assertions...');
    
    // Check if option is selected
    await expect(page.locator('option[value="option1"]')).toBeSelected();
    console.log('✅ Option is selected');
    
    // Check if option is not selected
    await expect(page.locator('option[value="option2"]')).not.toBeSelected();
    console.log('✅ Option is not selected');
    
    // ========================================
    // 5. TEXT CONTENT ASSERTIONS
    // ========================================
    console.log('📋 Testing Text Content Assertions...');
    
    // Check exact text content
    await expect(page.locator('h1')).toHaveText('Welcome to ezSCM');
    console.log('✅ Element has exact text');
    
    // Check text content (ignoring case)
    await expect(page.locator('h1')).toHaveText(/welcome to ezscm/i);
    console.log('✅ Element has text (case insensitive)');
    
    // Check if text contains substring
    await expect(page.locator('p')).toContainText('login');
    console.log('✅ Element contains text');
    
    // Check if text matches regex
    await expect(page.locator('span')).toHaveText(/^\d+$/);
    console.log('✅ Element text matches regex');
    
    // ========================================
    // 6. INPUT VALUE ASSERTIONS
    // ========================================
    console.log('📋 Testing Input Value Assertions...');
    
    // Check input field value
    await expect(page.locator('input[type="email"]')).toHaveValue('test@example.com');
    console.log('✅ Input has value');
    
    // Check input field is empty
    await expect(page.locator('input[type="password"]')).toHaveValue('');
    console.log('✅ Input is empty');
    
    // ========================================
    // 7. ATTRIBUTE ASSERTIONS
    // ========================================
    console.log('📋 Testing Attribute Assertions...');
    
    // Check if element has attribute
    await expect(page.locator('input[type="email"]')).toHaveAttribute('type', 'email');
    console.log('✅ Element has attribute');
    
    // Check if element has class
    await expect(page.locator('div')).toHaveClass('container');
    console.log('✅ Element has class');
    
    // Check if element has CSS property
    await expect(page.locator('button')).toHaveCSS('background-color', 'rgb(0, 123, 255)');
    console.log('✅ Element has CSS property');
    
    // ========================================
    // 8. URL ASSERTIONS
    // ========================================
    console.log('📋 Testing URL Assertions...');
    
    // Check exact URL
    await expect(page).toHaveURL('https://stagingaz.ezscm.ai/');
    console.log('✅ Page has exact URL');
    
    // Check URL contains substring
    await expect(page).toHaveURL(/ezscm/);
    console.log('✅ Page URL contains substring');
    
    // Check URL with timeout
    await expect(page).toHaveURL('https://stagingaz.ezscm.ai/', { timeout: 5000 });
    console.log('✅ Page has URL with timeout');
    
    // ========================================
    // 9. TITLE ASSERTIONS
    // ========================================
    console.log('📋 Testing Title Assertions...');
    
    // Check page title
    await expect(page).toHaveTitle('ezSCM - Login');
    console.log('✅ Page has title');
    
    // Check page title with regex
    await expect(page).toHaveTitle(/ezSCM/);
    console.log('✅ Page title matches regex');
    
    // ========================================
    // 10. COUNT ASSERTIONS
    // ========================================
    console.log('📋 Testing Count Assertions...');
    
    // Check exact count of elements
    await expect(page.locator('input')).toHaveCount(3);
    console.log('✅ Elements have exact count');
    
    // Check minimum count of elements
    await expect(page.locator('button')).toHaveCount({ min: 1 });
    console.log('✅ Elements have minimum count');
    
    // Check maximum count of elements
    await expect(page.locator('div')).toHaveCount({ max: 10 });
    console.log('✅ Elements have maximum count');
    
    // Check count range
    await expect(page.locator('span')).toHaveCount({ min: 1, max: 5 });
    console.log('✅ Elements have count in range');
    
    // ========================================
    // 11. FOCUS ASSERTIONS
    // ========================================
    console.log('📋 Testing Focus Assertions...');
    
    // Check if element is focused
    await expect(page.locator('input[type="email"]')).toBeFocused();
    console.log('✅ Element is focused');
    
    // ========================================
    // 12. SCREENSHOT ASSERTIONS
    // ========================================
    console.log('📋 Testing Screenshot Assertions...');
    
    // Compare screenshot
    await expect(page).toHaveScreenshot('login-page.png');
    console.log('✅ Screenshot matches');
    
    // ========================================
    // 13. NEGATIVE ASSERTIONS
    // ========================================
    console.log('📋 Testing Negative Assertions...');
    
    // Element should not be visible
    await expect(page.locator('.error-message')).not.toBeVisible();
    console.log('✅ Element is not visible');
    
    // Element should not have text
    await expect(page.locator('div')).not.toHaveText('Error');
    console.log('✅ Element does not have text');
    
    // Element should not have attribute
    await expect(page.locator('input')).not.toHaveAttribute('disabled');
    console.log('✅ Element does not have attribute');
    
    // ========================================
    // 14. CUSTOM ASSERTIONS WITH TIMEOUT
    // ========================================
    console.log('📋 Testing Custom Assertions with Timeout...');
    
    // Custom timeout for assertion
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });
    console.log('✅ Element visible with custom timeout');
    
    // ========================================
    // 15. SOFT ASSERTIONS
    // ========================================
    console.log('📋 Testing Soft Assertions...');
    
    // Soft assertion - won't stop test on failure
    await expect.soft(page.locator('body')).toBeVisible();
    console.log('✅ Soft assertion passed');
    
    // ========================================
    // 16. CONDITIONAL ASSERTIONS
    // ========================================
    console.log('📋 Testing Conditional Assertions...');
    
    // Check if element exists before asserting
    const element = page.locator('input[type="email"]');
    if (await element.count() > 0) {
      await expect(element).toBeVisible();
      console.log('✅ Conditional assertion passed');
    }
    
    // ========================================
    // 17. MULTIPLE ELEMENT ASSERTIONS
    // ========================================
    console.log('📋 Testing Multiple Element Assertions...');
    
    // Check all elements in a list
    const inputs = page.locator('input');
    const count = await inputs.count();
    for (let i = 0; i < count; i++) {
      await expect(inputs.nth(i)).toBeVisible();
    }
    console.log('✅ All elements are visible');
    
    // ========================================
    // 18. FORM VALIDATION ASSERTIONS
    // ========================================
    console.log('📋 Testing Form Validation Assertions...');
    
    // Check form validation messages
    await expect(page.locator('.error-message')).toHaveText('This field is required');
    console.log('✅ Form validation message is correct');
    
    // Check if form is valid
    await expect(page.locator('form')).toHaveAttribute('novalidate', '');
    console.log('✅ Form validation attribute is correct');
    
    // ========================================
    // 19. LOADING STATE ASSERTIONS
    // ========================================
    console.log('📋 Testing Loading State Assertions...');
    
    // Check if loading spinner is visible
    await expect(page.locator('.loading-spinner')).toBeVisible();
    console.log('✅ Loading spinner is visible');
    
    // Check if loading spinner is hidden after load
    await expect(page.locator('.loading-spinner')).toBeHidden();
    console.log('✅ Loading spinner is hidden');
    
    // ========================================
    // 20. RESPONSIVE ASSERTIONS
    // ========================================
    console.log('📋 Testing Responsive Assertions...');
    
    // Check element visibility on different screen sizes
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('.mobile-menu')).toBeVisible();
    console.log('✅ Mobile menu is visible on tablet');
    
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('.desktop-menu')).toBeVisible();
    console.log('✅ Desktop menu is visible on desktop');
    
    console.log('🎉 All assertions completed successfully!');
  });
  
  // ========================================
  // HELPER FUNCTIONS FOR COMMON ASSERTIONS
  // ========================================
  
  test('Helper Functions for Common Assertions', async ({ page }) => {
    console.log('🚀 Testing helper functions...');
    
    // Helper function to check if element exists
    async function elementExists(selector) {
      const count = await page.locator(selector).count();
      return count > 0;
    }
    
    // Helper function to wait for element and assert
    async function waitAndAssert(selector, assertion, timeout = 5000) {
      await page.waitForSelector(selector, { timeout });
      await assertion;
    }
    
    // Helper function to assert multiple elements
    async function assertAllElements(selector, assertion) {
      const elements = page.locator(selector);
      const count = await elements.count();
      for (let i = 0; i < count; i++) {
        await assertion(elements.nth(i));
      }
    }
    
    // Example usage
    await page.goto('https://stagingaz.ezscm.ai/');
    
    if (await elementExists('body')) {
      console.log('✅ Element exists helper function works');
    }
    
    await waitAndAssert('body', expect(page.locator('body')).toBeVisible());
    console.log('✅ Wait and assert helper function works');
    
    console.log('🎉 Helper functions tested successfully!');
  });
  
  // ========================================
  // ASSERTION PATTERNS FOR DIFFERENT SCENARIOS
  // ========================================
  
  test('Assertion Patterns for Different Scenarios', async ({ page }) => {
    console.log('🚀 Testing assertion patterns...');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    
    // Pattern 1: Login Flow Assertions
    console.log('📋 Testing Login Flow Pattern...');
    
    // Check login form is visible
    await expect(page.locator('form')).toBeVisible();
    
    // Check required fields are present
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    
    // Check submit button is enabled
    await expect(page.locator('button[type="submit"]')).toBeEnabled();
    
    console.log('✅ Login flow pattern assertions passed');
    
    // Pattern 2: Error Handling Assertions
    console.log('📋 Testing Error Handling Pattern...');
    
    // Fill invalid data
    await page.fill('input[type="email"]', 'invalid-email');
    await page.fill('input[type="password"]', 'wrong-password');
    await page.click('button[type="submit"]');
    
    // Check for error message
    await expect(page.locator('.error-message')).toBeVisible();
    await expect(page.locator('.error-message')).toContainText('Invalid');
    
    console.log('✅ Error handling pattern assertions passed');
    
    // Pattern 3: Success Flow Assertions
    console.log('📋 Testing Success Flow Pattern...');
    
    // Fill valid data
    await page.fill('input[type="email"]', 'rollinivi4+test@gmail.com');
    await page.fill('input[type="password"]', 'User@123');
    await page.click('button[type="submit"]');
    
    // Check for success indicators
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.locator('text=Welcome')).toBeVisible();
    
    console.log('✅ Success flow pattern assertions passed');
    
    console.log('🎉 All assertion patterns tested successfully!');
  });
});
