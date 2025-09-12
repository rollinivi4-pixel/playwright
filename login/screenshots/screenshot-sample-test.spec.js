import { test, expect } from '@playwright/test';

test.describe('Screenshot Sample Tests', () => {
  // Test 1: Basic login with organized screenshots
  test('login with organized screenshots', async ({ page }) => {
    console.log('🚀 Starting login test with organized screenshots...');
    
    // Step 1: Navigate to website
    console.log('📱 Navigating to ezSCM website...');
    await page.goto('https://stagingaz.ezscm.ai/');
    console.log('✅ Page loaded successfully');
    
    // Take initial page screenshot
    await page.screenshot({ 
      path: 'login/screenshots/login/01-initial-page-load.png',
      fullPage: true 
    });
    console.log('📸 Screenshot saved: login/screenshots/login/01-initial-page-load.png');
    
    // Step 2: Fill email field
    console.log('📧 Filling email field...');
    await page.fill('#email', 'rollinivi4+test@gmail.com');
    console.log('✅ Email filled: rollinivi4+test@gmail.com');
    
    // Take screenshot after email input
    await page.screenshot({ 
      path: 'login/screenshots/login/02-after-email-input.png' 
    });
    console.log('📸 Screenshot saved: login/screenshots/login/02-after-email-input.png');
    
    // Step 3: Fill password field
    console.log('🔒 Filling password field...');
    await page.fill('#password', 'User@123');
    console.log('✅ Password filled');
    
    // Take screenshot after password input
    await page.screenshot({ 
      path: 'login/screenshots/login/03-after-password-input.png' 
    });
    console.log('📸 Screenshot saved: login/screenshots/login/03-after-password-input.png');
    
    // Step 4: Check "Keep me logged in" checkbox
    console.log('☑️ Checking "Keep me logged in" checkbox...');
    await page.check('input[type="checkbox"]');
    console.log('✅ Checkbox checked');
    
    // Take screenshot after checkbox
    await page.screenshot({ 
      path: 'login/screenshots/login/04-after-checkbox-checked.png' 
    });
    console.log('📸 Screenshot saved: screenshots/login/04-after-checkbox-checked.png');
    
    // Step 5: Click login button
    console.log('🖱️ Clicking login button...');
    await page.click('button[type="submit"]');
    console.log('✅ Login button clicked');
    
    // Wait for page to load after login
    await page.waitForTimeout(3000);
    
    // Take final screenshot after login
    await page.screenshot({ 
      path: 'login/screenshots/login/05-after-login-success.png',
      fullPage: true 
    });
    console.log('📸 Screenshot saved: login/screenshots/login/05-after-login-success.png');
    
    // Verify login success
    const currentUrl = page.url();
    console.log('📍 Current URL:', currentUrl);
    await expect(page.locator('body')).toBeVisible();
    console.log('✅ Login test completed successfully!');
  });

  // Test 2: Login with wrong password and error screenshots
  test('login with wrong password - error screenshots', async ({ page }) => {
    console.log('🚀 Starting wrong password test with error screenshots...');
    
    // Step 1: Navigate to website
    console.log('📱 Navigating to ezSCM website...');
    await page.goto('https://stagingaz.ezscm.ai/');
    console.log('✅ Page loaded successfully');
    
    // Take initial screenshot
    await page.screenshot({ 
      path: 'login/screenshots/login/error-01-initial-page.png',
      fullPage: true 
    });
    console.log('📸 Screenshot saved: login/screenshots/login/error-01-initial-page.png');
    
    // Step 2: Fill with wrong credentials
    console.log('📧 Filling email field with correct email...');
    await page.fill('#email', 'rollinivi4+test@gmail.com');
    console.log('✅ Email filled: rollinivi4+test@gmail.com');
    
    console.log('🔒 Filling password field with WRONG password...');
    await page.fill('#password', 'wrongpassword');
    console.log('✅ Wrong password filled: wrongpassword');
    
    // Take screenshot before clicking login
    await page.screenshot({ 
    path: 'login/screenshots/login/error-02-before-login-click.png' 
    });
    console.log('📸 Screenshot saved: login/screenshots/login/error-02-before-login-click.png');
    
    // Step 3: Click login button
    console.log('🖱️ Clicking login button...');
    await page.click('button[type="submit"]');
    console.log('✅ Login button clicked');
    
    // Wait for error message
    await page.waitForTimeout(2000);
    
    // Take screenshot after login attempt
    await page.screenshot({ 
      path: 'login/screenshots/login/error-03-after-login-attempt.png',
      fullPage: true 
    });
    console.log('📸 Screenshot saved: login/screenshots/login/error-03-after-login-attempt.png');
    
    // Verify we're still on login page (error case)
    await expect(page).toHaveURL(/stagingaz\.ezscm\.ai/);
    console.log('✅ Login failed as expected - still on login page');
  });

  // Test 3: Forgot password flow with screenshots
  test('forgot password flow with screenshots', async ({ page }) => {
    console.log('🚀 Starting forgot password flow with screenshots...');
    
    // Step 1: Navigate and attempt login with wrong password
    console.log('📱 Navigating to ezSCM website...');
    await page.goto('https://stagingaz.ezscm.ai/');
    console.log('✅ Page loaded successfully');
    
    // Take initial screenshot
    await page.screenshot({ 
      path: 'login/screenshots/login/forgot-01-initial-page.png',
      fullPage: true 
    });
    console.log('📸 Screenshot saved: login/screenshots/login/forgot-01-initial-page.png');
    
    // Step 2: Enter wrong credentials
    console.log('📧 Filling email field with valid email...');
    await page.fill('#email', 'rollinivi4+test@gmail.com');
    console.log('✅ Email filled: rollinivi4+test@gmail.com');
    
    console.log('🔒 Filling password field with INVALID password...');
    await page.fill('#password', 'wrongpassword123');
    console.log('✅ Invalid password filled: wrongpassword123');
    
    // Take screenshot before login
    await page.screenshot({ 
      path: 'login/screenshots/login/forgot-02-before-login.png' 
    });
    console.log('📸 Screenshot saved: login/screenshots/login/forgot-02-before-login.png');
    
    // Step 3: Click login button
    console.log('🖱️ Clicking login button...');
    await page.click('button[type="submit"]');
    console.log('✅ Login button clicked');
    
    // Wait for error
    await page.waitForTimeout(2000);
    
    // Take screenshot after login attempt
    await page.screenshot({ 
      path: 'login/screenshots/login/forgot-03-after-login-error.png',
      fullPage: true 
    });
    console.log('📸 Screenshot saved: login/screenshots/login/forgot-03-after-login-error.png');
    
    // Step 4: Look for forgot password link
    console.log('🔍 Looking for forgot password link...');
    
    const forgotPasswordSelectors = [
      'text=Forgot password?',
      'text=Forgot Password?',
      'text=Forgot password',
      'text=Forgot Password',
      'a[href*="forgot"]',
      'a[href*="reset"]',
      'a[href*="password"]'
    ];
    
    let linkFound = false;
    let usedSelector = '';
    
    for (const selector of forgotPasswordSelectors) {
      try {
        const element = page.locator(selector);
        if (await element.isVisible()) {
          console.log(`✅ Found forgot password link with selector: "${selector}"`);
          usedSelector = selector;
          linkFound = true;
          break;
        }
      } catch (e) {
        // Continue to next selector
      }
    }
    
    if (!linkFound) {
      console.log('❌ Forgot password link not found');
      await page.screenshot({ 
        path: 'login/screenshots/login/forgot-04-debug-no-link-found.png',
        fullPage: true 
      });
      throw new Error('Forgot password link not found on the page');
    }
    
    // Take screenshot showing the forgot password link
    await page.screenshot({ 
      path: 'login/screenshots/login/forgot-04-forgot-password-link-visible.png',
      fullPage: true 
    });
    console.log('📸 Screenshot saved: screenshots/login/forgot-04-forgot-password-link-visible.png');
    
    // Step 5: Click forgot password link
    console.log('🖱️ Clicking forgot password link...');
    await page.click(usedSelector);
    console.log('✅ Forgot password link clicked');
    
    // Wait for navigation
    await page.waitForTimeout(3000);
    
    // Take screenshot of forgot password page
    await page.screenshot({ 
      path: 'login/screenshots/login/forgot-05-forgot-password-page.png',
      fullPage: true 
    });
    console.log('📸 Screenshot saved: screenshots/login/forgot-05-forgot-password-page.png');
    
    // Verify forgot password page
    const currentUrl = page.url();
    console.log('📍 Current URL:', currentUrl);
    console.log('✅ Forgot password flow test completed');
  });

  // Test 4: General page elements screenshot test
  test('general page elements screenshot test', async ({ page }) => {
    console.log('🚀 Starting general page elements screenshot test...');
    
    // Navigate to a test page
    await page.goto('https://stagingaz.ezscm.ai/');
    
    // Take full page screenshot
    await page.screenshot({ 
      path: 'login/screenshots/general/01-full-page.png',
      fullPage: true 
    });
    console.log('📸 Screenshot saved: login/screenshots/general/01-full-page.png');
    
    // Take viewport screenshot
    await page.screenshot({ 
      path: 'login/screenshots/general/02-viewport-only.png' 
    });
    console.log('📸 Screenshot saved: login/screenshots/general/02-viewport-only.png');
    
    // Take screenshot of specific element (if exists)
    try {
      const loginForm = page.locator('form');
      if (await loginForm.isVisible()) {
        await loginForm.screenshot({ 
          path: 'login/screenshots/general/03-login-form-element.png' 
        });
        console.log('📸 Screenshot saved: login/screenshots/general/03-login-form-element.png');
      }
    } catch (e) {
      console.log('⚠️ Login form element not found for screenshot');
    }
    
    console.log('✅ General page elements test completed');
  });
});
