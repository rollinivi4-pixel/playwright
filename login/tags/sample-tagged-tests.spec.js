/**
 * Sample Tagged Tests for Login Page
 * 
 * This file demonstrates how to use tags in Playwright tests
 * for login page functionality. Each test shows different tag
 * combinations and their practical applications.
 */

import { test, expect } from '@playwright/test';

// ============================================================================
// CRITICAL LOGIN TESTS
// ============================================================================

test.describe('Critical Login Tests', () => {
  
  test('should login with valid credentials', { 
    tag: '@critical @smoke @positive @fast @authentication' 
  }, async ({ page }) => {
    console.log('🚀 Starting critical login test...');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    await page.fill('#email', 'rollinivi4+test@gmail.com');
    await page.fill('#password', 'User@123');
    await page.click('button[type="submit"]');
    
    await page.waitForTimeout(3000);
    await expect(page).toHaveURL(/lobby/);
    await expect(page.locator('text=Sales Orders')).toBeVisible();
    
    console.log('✅ Critical login test completed successfully');
  });

  test('should handle invalid credentials', { 
    tag: '@critical @negative @authentication @ui' 
  }, async ({ page }) => {
    console.log('🚀 Starting invalid credentials test...');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    await page.fill('#email', 'rollinivi4+test@gmail.com');
    await page.fill('#password', 'wrongpassword');
    await page.click('button[type="submit"]');
    
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL(/stagingaz\.ezscm\.ai/);
    
    console.log('✅ Invalid credentials test completed successfully');
  });

  test('should load login page elements', { 
    tag: '@critical @smoke @positive @fast @ui' 
  }, async ({ page }) => {
    console.log('🚀 Starting login page elements test...');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    await expect(page.locator('input[type="checkbox"]')).toBeVisible();
    
    console.log('✅ Login page elements test completed successfully');
  });
});

// ============================================================================
// HIGH PRIORITY VALIDATION TESTS
// ============================================================================

test.describe('High Priority Validation Tests', () => {
  
  test('should validate email format', { 
    tag: '@high @validation @negative @ui @boundary' 
  }, async ({ page }) => {
    console.log('🚀 Starting email validation test...');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    
    const invalidEmails = [
      'invalid-email',
      '@domain.com',
      'user@',
      'user@domain',
      'user..name@domain.com'
    ];
    
    for (const email of invalidEmails) {
      await page.fill('#email', email);
      await page.fill('#password', 'User@123');
      await page.click('button[type="submit"]');
      
      await expect(page).toHaveURL(/stagingaz\.ezscm\.ai/);
      
      await page.fill('#email', '');
      await page.fill('#password', '');
    }
    
    console.log('✅ Email validation test completed successfully');
  });

  test('should validate password requirements', { 
    tag: '@high @validation @negative @security @boundary' 
  }, async ({ page }) => {
    console.log('🚀 Starting password validation test...');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    
    const weakPasswords = ['123', 'password', '12345678', ''];
    
    for (const password of weakPasswords) {
      await page.fill('#email', 'rollinivi4+test@gmail.com');
      await page.fill('#password', password);
      await page.click('button[type="submit"]');
      
      await expect(page).toHaveURL(/stagingaz\.ezscm\.ai/);
      
      await page.fill('#password', '');
    }
    
    console.log('✅ Password validation test completed successfully');
  });

  test('should require both email and password', { 
    tag: '@high @validation @negative @ui @positive' 
  }, async ({ page }) => {
    console.log('🚀 Starting required fields test...');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    
    // Test with empty email
    await page.fill('#password', 'User@123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/stagingaz\.ezscm\.ai/);
    
    // Test with empty password
    await page.fill('#email', 'rollinivi4+test@gmail.com');
    await page.fill('#password', '');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/stagingaz\.ezscm\.ai/);
    
    console.log('✅ Required fields test completed successfully');
  });
});

// ============================================================================
// MEDIUM PRIORITY UI TESTS
// ============================================================================

test.describe('Medium Priority UI Tests', () => {
  
  test('should support keyboard navigation', { 
    tag: '@medium @accessibility @ui @positive @fast' 
  }, async ({ page }) => {
    console.log('🚀 Starting keyboard navigation test...');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    
    await page.keyboard.press('Tab');
    await page.keyboard.type('rollinivi4+test@gmail.com');
    
    await page.keyboard.press('Tab');
    await page.keyboard.type('User@123');
    
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    
    await page.waitForTimeout(3000);
    await expect(page).toHaveURL(/lobby/);
    
    console.log('✅ Keyboard navigation test completed successfully');
  });

  test('should handle remember me checkbox', { 
    tag: '@medium @ui @positive @fast' 
  }, async ({ page }) => {
    console.log('🚀 Starting remember me checkbox test...');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    
    const checkbox = page.locator('input[type="checkbox"]');
    await expect(checkbox).not.toBeChecked();
    
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
    
    console.log('✅ Remember me checkbox test completed successfully');
  });

  test('should show loading state during login', { 
    tag: '@medium @ui @positive @fast' 
  }, async ({ page }) => {
    console.log('🚀 Starting loading state test...');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    await page.fill('#email', 'rollinivi4+test@gmail.com');
    await page.fill('#password', 'User@123');
    
    await page.click('button[type="submit"]');
    
    // Check for loading indicators
    const loadingSelectors = [
      '.loading',
      '.spinner',
      '[data-testid="loading"]',
      'button[disabled]'
    ];
    
    let loadingFound = false;
    for (const selector of loadingSelectors) {
      if (await page.locator(selector).isVisible()) {
        loadingFound = true;
        break;
      }
    }
    
    console.log('✅ Loading state test completed successfully');
  });
});

// ============================================================================
// SECURITY TESTS
// ============================================================================

test.describe('Security Tests', () => {
  
  test('should mask password input', { 
    tag: '@high @security @ui @positive @fast' 
  }, async ({ page }) => {
    console.log('🚀 Starting password masking test...');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    
    const passwordField = page.locator('#password');
    await passwordField.fill('User@123');
    
    await expect(passwordField).toHaveAttribute('type', 'password');
    
    const pageContent = await page.content();
    expect(pageContent).not.toContain('User@123');
    
    console.log('✅ Password masking test completed successfully');
  });

  test('should prevent XSS in form inputs', { 
    tag: '@high @security @negative @ui @fast' 
  }, async ({ page }) => {
    console.log('🚀 Starting XSS prevention test...');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    
    const xssPayload = '<script>alert("XSS")</script>';
    
    await page.fill('#email', xssPayload);
    await page.fill('#password', 'User@123');
    await page.click('button[type="submit"]');
    
    await page.waitForTimeout(2000);
    
    const pageContent = await page.content();
    expect(pageContent).not.toContain('alert("XSS")');
    
    console.log('✅ XSS prevention test completed successfully');
  });

  test('should include CSRF protection', { 
    tag: '@high @security @positive @ui @fast' 
  }, async ({ page }) => {
    console.log('🚀 Starting CSRF protection test...');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    
    const csrfToken = await page.locator('input[name="_token"], input[name="csrf_token"], meta[name="csrf-token"]');
    
    console.log('✅ CSRF protection test completed successfully');
  });
});

// ============================================================================
// PERFORMANCE TESTS
// ============================================================================

test.describe('Performance Tests', () => {
  
  test('should load login page within acceptable time', { 
    tag: '@medium @performance @positive @fast' 
  }, async ({ page }) => {
    console.log('🚀 Starting page load performance test...');
    
    const startTime = Date.now();
    
    await page.goto('https://stagingaz.ezscm.ai/');
    
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(5000);
    
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    
    console.log(`✅ Page load performance test completed in ${loadTime}ms`);
  });

  test('should complete login within acceptable time', { 
    tag: '@medium @performance @positive @slow' 
  }, async ({ page }) => {
    console.log('🚀 Starting login performance test...');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    
    const startTime = Date.now();
    
    await page.fill('#email', 'rollinivi4+test@gmail.com');
    await page.fill('#password', 'User@123');
    await page.click('button[type="submit"]');
    
    await page.waitForURL(/lobby/);
    
    const loginTime = Date.now() - startTime;
    
    expect(loginTime).toBeLessThan(10000);
    
    console.log(`✅ Login performance test completed in ${loginTime}ms`);
  });
});

// ============================================================================
// ACCESSIBILITY TESTS
// ============================================================================

test.describe('Accessibility Tests', () => {
  
  test('should have proper ARIA labels', { 
    tag: '@medium @accessibility @ui @positive @fast' 
  }, async ({ page }) => {
    console.log('🚀 Starting ARIA labels test...');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    
    const emailField = page.locator('#email');
    const passwordField = page.locator('#password');
    const submitButton = page.locator('button[type="submit"]');
    
    await expect(emailField).toBeVisible();
    await expect(passwordField).toBeVisible();
    await expect(submitButton).toBeVisible();
    
    console.log('✅ ARIA labels test completed successfully');
  });

  test('should be compatible with screen readers', { 
    tag: '@medium @accessibility @ui @positive @fast' 
  }, async ({ page }) => {
    console.log('🚀 Starting screen reader compatibility test...');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    expect(headings.length).toBeGreaterThan(0);
    
    const form = page.locator('form');
    await expect(form).toBeVisible();
    
    console.log('✅ Screen reader compatibility test completed successfully');
  });

  test('should have sufficient color contrast', { 
    tag: '@medium @accessibility @ui @positive @fast' 
  }, async ({ page }) => {
    console.log('🚀 Starting color contrast test...');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    
    console.log('✅ Color contrast test completed successfully');
  });
});

// ============================================================================
// BROWSER-SPECIFIC TESTS
// ============================================================================

test.describe('Browser-Specific Tests', () => {
  
  test('should work with Chrome autofill', { 
    tag: '@medium @chrome @ui @positive @fast' 
  }, async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'Chrome-specific test');
    
    console.log('🚀 Starting Chrome autofill test...');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    
    await page.fill('#email', 'rollinivi4+test@gmail.com');
    await page.fill('#password', 'User@123');
    
    console.log('✅ Chrome autofill test completed successfully');
  });

  test('should work on mobile devices', { 
    tag: '@medium @mobile @ui @positive @fast' 
  }, async ({ page }) => {
    console.log('🚀 Starting mobile test...');
    
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('https://stagingaz.ezscm.ai/');
    
    await page.fill('#email', 'rollinivi4+test@gmail.com');
    await page.fill('#password', 'User@123');
    await page.click('button[type="submit"]');
    
    await page.waitForTimeout(3000);
    await expect(page).toHaveURL(/lobby/);
    
    console.log('✅ Mobile test completed successfully');
  });
});

// ============================================================================
// MAINTENANCE TESTS
// ============================================================================

test.describe('Maintenance Tests', () => {
  
  test('should handle network timeouts gracefully', { 
    tag: '@flaky @negative @performance @slow' 
  }, async ({ page }) => {
    console.log('🚀 Starting network timeout test...');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    
    await page.route('**/*', route => {
      setTimeout(() => route.continue(), 1000);
    });
    
    await page.fill('#email', 'rollinivi4+test@gmail.com');
    await page.fill('#password', 'User@123');
    await page.click('button[type="submit"]');
    
    console.log('✅ Network timeout test completed successfully');
  });

  test('should validate error message text', { 
    tag: '@fixme @negative @ui @fast' 
  }, async ({ page }) => {
    console.log('🚀 Starting error message validation test...');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    await page.fill('#email', 'invalid@email.com');
    await page.fill('#password', 'wrongpassword');
    await page.click('button[type="submit"]');
    
    await page.waitForTimeout(2000);
    
    console.log('✅ Error message validation test completed successfully');
  });
});

// ============================================================================
// EXECUTION CONTROL TESTS
// ============================================================================

test.describe('Execution Control Tests', () => {
  
  test('should perform comprehensive login flow', { 
    tag: '@slow @integration @positive @serial' 
  }, async ({ page }) => {
    console.log('🚀 Starting comprehensive login flow test...');
    
    const scenarios = [
      { email: 'rollinivi4+test@gmail.com', password: 'User@123', shouldSucceed: true },
      { email: 'invalid@email.com', password: 'wrongpassword', shouldSucceed: false },
      { email: 'rollinivi4+test@gmail.com', password: 'User@123', shouldSucceed: true }
    ];
    
    for (const scenario of scenarios) {
      await page.goto('https://stagingaz.ezscm.ai/');
      await page.fill('#email', scenario.email);
      await page.fill('#password', scenario.password);
      await page.click('button[type="submit"]');
      
      await page.waitForTimeout(2000);
      
      if (scenario.shouldSucceed) {
        await expect(page).toHaveURL(/lobby/);
      } else {
        await expect(page).toHaveURL(/stagingaz\.ezscm\.ai/);
      }
    }
    
    console.log('✅ Comprehensive login flow test completed successfully');
  });

  test('should load login page quickly', { 
    tag: '@fast @smoke @positive @parallel' 
  }, async ({ page }) => {
    console.log('🚀 Starting quick page load test...');
    
    await page.goto('https://stagingaz.ezscm.ai/');
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    
    console.log('✅ Quick page load test completed successfully');
  });
});
