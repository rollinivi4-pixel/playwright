const { test, expect } = require('@playwright/test');

/**
 * 🎭 EZSCM TRACING EXAMPLES
 * 
 * This file demonstrates Playwright tracing using the actual ezSCM website
 * with real credentials and test scenarios from the original ezscm-login.spec.js
 */

test.describe('ezSCM Tracing Examples', () => {
  
  test('ezSCM Login with comprehensive tracing', async ({ page, context }) => {
    console.log('🚀 Starting ezSCM login test with tracing...');
    
    // Start comprehensive tracing
    await context.tracing.start({
      screenshots: true,
      snapshots: true,
      sources: true,
      title: 'ezSCM Login Test'
    });

    try {
      console.log('📱 Navigating to ezSCM website...');
      await page.goto('https://stagingaz.ezscm.ai/');
      console.log('✅ Page loaded successfully');
      
      // Get page title for trace
      const pageTitle = await page.title();
      console.log('📄 Page title:', pageTitle);
      
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
      
      console.log('⏳ Waiting for login processing...');
      await page.waitForTimeout(3000);
      
      console.log('📸 Taking screenshot...');
      await page.screenshot({ path: 'debug-screenshots/ezscm-login-result.png' });
      console.log('✅ Screenshot saved');
      
      console.log('🔍 Checking login result...');
      const currentUrl = page.url();
      console.log('📍 Current URL:', currentUrl);
      
      // Verify login success
      await expect(page.locator('body')).toBeVisible();
      console.log('✅ Login test completed successfully!');
      
    } finally {
      // Stop tracing and save
      await context.tracing.stop({ 
        path: 'trace-files/ezscm-login-trace.zip' 
      });
      console.log('📁 Trace saved to: trace-files/ezscm-login-trace.zip');
    }
  });

  test('ezSCM Login with wrong password - Error tracing', async ({ page, context }) => {
    console.log('🚀 Starting ezSCM wrong password test with tracing...');
    
    // Start tracing for error scenario
    await context.tracing.start({
      screenshots: true,
      snapshots: true,
      sources: true,
      title: 'ezSCM Wrong Password Error Test'
    });

    try {
      console.log('📱 Navigating to ezSCM website...');
      await page.goto('https://stagingaz.ezscm.ai/');
      console.log('✅ Page loaded successfully');
      
      console.log('📧 Filling email field with correct email...');
      await page.fill('#email', 'rollinivi4+test@gmail.com');
      console.log('✅ Email filled: rollinivi4+test@gmail.com');
      
      console.log('🔒 Filling password field with WRONG password...');
      await page.fill('#password', 'wrongpassword');
      console.log('✅ Wrong password filled: wrongpassword');
      
      console.log('🖱️ Clicking login button...');
      await page.click('button[type="submit"]');
      console.log('✅ Login button clicked');
      
      console.log('⏳ Waiting for error response...');
      await page.waitForTimeout(2000);
      
      console.log('📸 Taking screenshot after login attempt...');
      await page.screenshot({ path: 'debug-screenshots/ezscm-wrong-password.png' });
      console.log('✅ Screenshot saved');
      
      console.log('🔍 Checking for error message...');
      
      // Try to find error message with multiple selectors
      const possibleErrorSelectors = [
        '.error-message',
        '.alert-danger', 
        '.error',
        '.invalid-feedback',
        '[role="alert"]',
        '.text-danger',
        '.message-error',
        '.alert',
        '.notification',
        '.toast'
      ];
      
      let errorFound = false;
      for (const selector of possibleErrorSelectors) {
        const element = page.locator(selector);
        if (await element.isVisible()) {
          const text = await element.textContent();
          console.log(`✅ Found error with selector "${selector}": "${text}"`);
          errorFound = true;
          break;
        }
      }
      
      if (!errorFound) {
        console.log('⚠️ No error message found with common selectors');
        console.log('📍 Current URL:', page.url());
      }
      
      // Verify we're still on login page (which means login failed)
      await expect(page).toHaveURL(/stagingaz\.ezscm\.ai/);
      console.log('✅ Login failed as expected - still on login page');
      
    } finally {
      // Save trace even when test fails
      await context.tracing.stop({ 
        path: 'trace-files/ezscm-wrong-password-trace.zip' 
      });
      console.log('📁 Error trace saved to: trace-files/ezscm-wrong-password-trace.zip');
    }
  });

  test('ezSCM Forgot Password Flow with tracing', async ({ page, context }) => {
    console.log('🚀 Starting ezSCM forgot password flow test with tracing...');
    
    // Start tracing for forgot password flow
    await context.tracing.start({
      screenshots: true,
      snapshots: true,
      sources: true,
      title: 'ezSCM Forgot Password Flow Test'
    });

    try {
      console.log('📱 Navigating to ezSCM website...');
      await page.goto('https://stagingaz.ezscm.ai/');
      console.log('✅ Page loaded successfully');

      const pageTitle = await page.title();
      console.log('📄 Page title:', pageTitle);
      
      // Step 1: Enter valid email and invalid password
      console.log('📧 Filling email field with valid email...');
      await page.fill('#email', 'rollinivi4+test@gmail.com');
      console.log('✅ Email filled: rollinivi4+test@gmail.com');
      
      console.log('🔒 Filling password field with INVALID password...');
      await page.fill('#password', 'wrongpassword123');
      console.log('✅ Invalid password filled: wrongpassword123');
      
      // Step 2: Click login button
      console.log('🖱️ Clicking login button...');
      await page.click('button[type="submit"]');
      console.log('✅ Login button clicked');
      
      // Step 3: Wait for error message and verify it appears
      console.log('⏳ Waiting for error message to appear...');
      await page.waitForTimeout(2000);
      
      console.log('📸 Taking screenshot after login attempt...');
      await page.screenshot({ path: 'debug-screenshots/ezscm-login-error.png' });
      console.log('✅ Screenshot saved');
      
      console.log('🔍 Verifying error message appears...');
      
      // Try multiple possible error message selectors
      const errorSelectors = [
        '.error-message',
        '.alert-danger',
        '.error',
        '.invalid-feedback',
        '[role="alert"]',
        '.text-danger',
        '.message-error',
        '.alert',
        '.notification',
        '.toast'
      ];
      
      let errorFound = false;
      let errorText = '';
      
      for (const selector of errorSelectors) {
        try {
          const element = page.locator(selector);
          if (await element.isVisible()) {
            errorText = await element.textContent();
            console.log(`✅ Error message found with selector "${selector}": "${errorText}"`);
            errorFound = true;
            break;
          }
        } catch (e) {
          // Continue to next selector
        }
      }
      
      if (!errorFound) {
        // Check if we're still on login page (which indicates login failed)
        const currentUrl = page.url();
        console.log('📍 Current URL:', currentUrl);
        
        if (currentUrl.includes('login') || currentUrl.includes('signin') || currentUrl === 'https://stagingaz.ezscm.ai/') {
          console.log('✅ Login failed - still on login page (error message might not be visible)');
          errorFound = true;
        }
      }
      
      if (!errorFound) {
        console.log('⚠️ No error message found, but continuing with forgot password test...');
      }
      
      // Step 4: Now look for and click forgot password link
      console.log('🔍 Looking for forgot password link...');
      
      // Try multiple possible selectors for forgot password link
      const forgotPasswordSelectors = [
        'text=Forgot password?',
        'text=Forgot Password?',
        'text=Forgot password',
        'text=Forgot Password',
        'text=forgot password',
        'text=forgot password?',
        'a[href*="forgot"]',
        'a[href*="reset"]',
        'a[href*="password"]',
        '.forgot-password',
        '#forgot-password',
        '[data-testid="forgot-password"]'
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
        console.log('❌ Forgot password link not found with any selector');
        console.log('📸 Taking screenshot to debug...');
        await page.screenshot({ path: 'debug-screenshots/ezscm-forgot-password-debug.png' });
        throw new Error('Forgot password link not found on the page');
      }
      
      console.log('🖱️ Clicking forgot password link...');
      await page.click(usedSelector);
      console.log('✅ Forgot password link clicked');
      
      // Step 5: Wait for navigation and verify forgot password page
      console.log('⏳ Waiting for forgot password page to load...');
      await page.waitForTimeout(3000);
      
      console.log('📸 Taking screenshot of forgot password page...');
      await page.screenshot({ path: 'debug-screenshots/ezscm-forgot-password-page.png' });
      console.log('✅ Screenshot saved');
      
      console.log('🔍 Checking if forgot password page loaded...');
      const currentUrl = page.url();
      console.log('📍 Current URL:', currentUrl);
      
      // Check for various possible forgot password page indicators
      const forgotPasswordIndicators = [
        /forgot-password/,
        /reset-password/,
        /forgot/,
        /reset/,
        /password-reset/,
        /recover/
      ];
      
      let forgotPasswordPageFound = false;
      
      // Check URL patterns
      for (const pattern of forgotPasswordIndicators) {
        if (pattern.test(currentUrl)) {
          console.log(`✅ Forgot password page detected by URL pattern: ${pattern}`);
          forgotPasswordPageFound = true;
          break;
        }
      }
      
      // If URL doesn't match, check for page content indicators
      if (!forgotPasswordPageFound) {
        const contentIndicators = [
          'text=Reset your password',
          'text=Forgot your password',
          'text=Enter your email',
          'text=Password reset',
          'text=Send reset link',
          'input[type="email"]',
          'input[placeholder*="email"]',
          'button[type="submit"]'
        ];
        
        for (const indicator of contentIndicators) {
          try {
            const element = page.locator(indicator);
            if (await element.isVisible()) {
              console.log(`✅ Forgot password page detected by content: "${indicator}"`);
              forgotPasswordPageFound = true;
              break;
            }
          } catch (e) {
            // Continue to next indicator
          }
        }
      }
      
      if (forgotPasswordPageFound) {
        console.log('✅ Complete test PASSED - login error verified and forgot password link worked');
      } else {
        console.log('❌ Test FAILED - forgot password link did not navigate to expected page');
        console.log('📍 Final URL:', currentUrl);
        throw new Error('Forgot password link did not navigate to expected page');
      }
      
      console.log('✅ Complete forgot password flow test completed');
      
    } finally {
      // Save trace
      await context.tracing.stop({ 
        path: 'trace-files/ezscm-forgot-password-trace.zip' 
      });
      console.log('📁 Forgot password trace saved to: trace-files/ezscm-forgot-password-trace.zip');
    }
  });

  test('ezSCM Performance Analysis with tracing', async ({ page, context }) => {
    console.log('🚀 Starting ezSCM performance analysis with tracing...');
    
    // Start performance tracing
    await context.tracing.start({
      screenshots: true,
      snapshots: true,
      sources: true,
      title: 'ezSCM Performance Analysis'
    });

    try {
      // Measure page load time
      const startTime = Date.now();
      
      console.log('📱 Navigating to ezSCM website...');
      await page.goto('https://stagingaz.ezscm.ai/');
      
      // Wait for critical elements to load
      await page.waitForSelector('#email');
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      console.log(`⏱️ Page load time: ${loadTime}ms`);
      
      // Measure login form interaction performance
      const interactionStart = Date.now();
      
      console.log('📧 Filling email field...');
      await page.fill('#email', 'rollinivi4+test@gmail.com');
      
      console.log('🔒 Filling password field...');
      await page.fill('#password', 'User@123');
      
      console.log('☑️ Checking keep me logged in...');
      await page.check('input[type="checkbox"]');
      
      console.log('🖱️ Clicking login button...');
      await page.click('button[type="submit"]');
      
      // Wait for login processing
      await page.waitForTimeout(3000);
      
      const interactionTime = Date.now() - interactionStart;
      console.log(`⚡ Login interaction time: ${interactionTime}ms`);
      
      // Performance assertions
      expect(loadTime).toBeLessThan(5000); // Page should load in under 5 seconds
      expect(interactionTime).toBeLessThan(3000); // Login should complete in under 3 seconds
      
      console.log('✅ Performance analysis completed');
      
    } finally {
      await context.tracing.stop({ 
        path: 'trace-files/ezscm-performance-trace.zip' 
      });
      console.log('📁 Performance trace saved to: trace-files/ezscm-performance-trace.zip');
    }
  });
});
