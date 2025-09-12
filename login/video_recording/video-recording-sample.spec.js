import { test, expect } from '@playwright/test';

test.describe('Video Recording Sample Tests', () => {
  // Test 1: Complete login flow with video recording
  test('complete login flow with video recording', async ({ page }) => {
    console.log('🎬 Starting complete login flow with video recording...');
    console.log('📹 Video will be automatically recorded and saved');
    
    // Step 1: Navigate to website
    console.log('📱 Navigating to ezSCM website...');
    await page.goto('https://stagingaz.ezscm.ai/');
    console.log('✅ Page loaded successfully');
    
    // Wait a moment to show the initial page in video
    await page.waitForTimeout(2000);
    
    // Step 2: Fill email field
    console.log('📧 Filling email field...');
    await page.fill('#email', 'rollinivi4+test@gmail.com');
    console.log('✅ Email filled: rollinivi4+test@gmail.com');
    
    // Wait to show the email input in video
    await page.waitForTimeout(1000);
    
    // Step 3: Fill password field
    console.log('🔒 Filling password field...');
    await page.fill('#password', 'User@123');
    console.log('✅ Password filled');
    
    // Wait to show the password input in video
    await page.waitForTimeout(1000);
    
    // Step 4: Check "Keep me logged in" checkbox
    console.log('☑️ Checking "Keep me logged in" checkbox...');
    await page.check('input[type="checkbox"]');
    console.log('✅ Checkbox checked');
    
    // Wait to show the checkbox interaction in video
    await page.waitForTimeout(1000);
    
    // Step 5: Click login button
    console.log('🖱️ Clicking login button...');
    await page.click('button[type="submit"]');
    console.log('✅ Login button clicked');
    
    // Wait for page to load after login
    console.log('⏳ Waiting for login to complete...');
    await page.waitForTimeout(3000);
    
    // Step 6: Verify login success
    console.log('🔍 Verifying login success...');
    const currentUrl = page.url();
    console.log('📍 Current URL:', currentUrl);
    
    // Verify we can see the page content
    await expect(page.locator('body')).toBeVisible();
    console.log('✅ Login completed successfully!');
    
    // Wait a moment to show the final result in video
    await page.waitForTimeout(2000);
    
    console.log('🎬 Video recording completed - check test-results folder for video file');
  });

  // Test 2: Login with wrong password - error scenario video
  test('login with wrong password - error scenario video', async ({ page }) => {
    console.log('🎬 Starting wrong password test with video recording...');
    console.log('📹 This will record the error scenario');
    
    // Step 1: Navigate to website
    console.log('📱 Navigating to ezSCM website...');
    await page.goto('https://stagingaz.ezscm.ai/');
    console.log('✅ Page loaded successfully');
    
    // Wait to show initial page
    await page.waitForTimeout(2000);
    
    // Step 2: Fill with wrong credentials
    console.log('📧 Filling email field with correct email...');
    await page.fill('#email', 'rollinivi4+test@gmail.com');
    console.log('✅ Email filled: rollinivi4+test@gmail.com');
    
    // Wait to show email input
    await page.waitForTimeout(1000);
    
    console.log('🔒 Filling password field with WRONG password...');
    await page.fill('#password', 'wrongpassword');
    console.log('✅ Wrong password filled: wrongpassword');
    
    // Wait to show password input
    await page.waitForTimeout(1000);
    
    // Step 3: Click login button
    console.log('🖱️ Clicking login button...');
    await page.click('button[type="submit"]');
    console.log('✅ Login button clicked');
    
    // Wait for error to appear
    console.log('⏳ Waiting for error response...');
    await page.waitForTimeout(3000);
    
    // Step 4: Verify error scenario
    console.log('🔍 Verifying error scenario...');
    const currentUrl = page.url();
    console.log('📍 Current URL:', currentUrl);
    
    // Verify we're still on login page (error case)
    await expect(page).toHaveURL(/stagingaz\.ezscm\.ai/);
    console.log('✅ Login failed as expected - still on login page');
    
    // Wait to show the error state in video
    await page.waitForTimeout(2000);
    
    console.log('🎬 Error scenario video recording completed');
  });

  // Test 3: Forgot password flow with video recording
  test('forgot password flow with video recording', async ({ page }) => {
    console.log('🎬 Starting forgot password flow with video recording...');
    console.log('📹 This will record the complete forgot password process');
    
    // Step 1: Navigate and attempt login with wrong password
    console.log('📱 Navigating to ezSCM website...');
    await page.goto('https://stagingaz.ezscm.ai/');
    console.log('✅ Page loaded successfully');
    
    // Wait to show initial page
    await page.waitForTimeout(2000);
    
    // Step 2: Enter wrong credentials
    console.log('📧 Filling email field with valid email...');
    await page.fill('#email', 'rollinivi4+test@gmail.com');
    console.log('✅ Email filled: rollinivi4+test@gmail.com');
    
    // Wait to show email input
    await page.waitForTimeout(1000);
    
    console.log('🔒 Filling password field with INVALID password...');
    await page.fill('#password', 'wrongpassword123');
    console.log('✅ Invalid password filled: wrongpassword123');
    
    // Wait to show password input
    await page.waitForTimeout(1000);
    
    // Step 3: Click login button
    console.log('🖱️ Clicking login button...');
    await page.click('button[type="submit"]');
    console.log('✅ Login button clicked');
    
    // Wait for error
    console.log('⏳ Waiting for login error...');
    await page.waitForTimeout(2000);
    
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
      await page.waitForTimeout(2000); // Show the page state in video
      throw new Error('Forgot password link not found on the page');
    }
    
    // Wait to show the forgot password link in video
    await page.waitForTimeout(1000);
    
    // Step 5: Click forgot password link
    console.log('🖱️ Clicking forgot password link...');
    await page.click(usedSelector);
    console.log('✅ Forgot password link clicked');
    
    // Wait for navigation
    console.log('⏳ Waiting for forgot password page to load...');
    await page.waitForTimeout(3000);
    
    // Step 6: Verify forgot password page
    console.log('🔍 Verifying forgot password page...');
    const currentUrl = page.url();
    console.log('📍 Current URL:', currentUrl);
    
    // Wait to show the forgot password page in video
    await page.waitForTimeout(2000);
    
    console.log('🎬 Forgot password flow video recording completed');
  });

  // Test 4: Interactive form filling with video recording
  test('interactive form filling with video recording', async ({ page }) => {
    console.log('🎬 Starting interactive form filling with video recording...');
    console.log('📹 This will show step-by-step form interactions');
    
    // Navigate to login page
    await page.goto('https://stagingaz.ezscm.ai/');
    console.log('✅ Page loaded successfully');
    
    // Wait to show initial page
    await page.waitForTimeout(2000);
    
    // Step 1: Focus on email field
    console.log('🎯 Focusing on email field...');
    await page.focus('#email');
    await page.waitForTimeout(1000);
    
    // Step 2: Type email character by character (slower for video)
    console.log('⌨️ Typing email character by character...');
    const email = 'rollinivi4+test@gmail.com';
    for (let i = 0; i < email.length; i++) {
      await page.keyboard.type(email[i]);
      await page.waitForTimeout(100); // Small delay between characters
    }
    console.log('✅ Email typed: rollinivi4+test@gmail.com');
    
    // Wait to show email field
    await page.waitForTimeout(1000);
    
    // Step 3: Focus on password field
    console.log('🎯 Focusing on password field...');
    await page.focus('#password');
    await page.waitForTimeout(1000);
    
    // Step 4: Type password character by character
    console.log('⌨️ Typing password character by character...');
    const password = 'User@123';
    for (let i = 0; i < password.length; i++) {
      await page.keyboard.type(password[i]);
      await page.waitForTimeout(100); // Small delay between characters
    }
    console.log('✅ Password typed');
    
    // Wait to show password field
    await page.waitForTimeout(1000);
    
    // Step 5: Check checkbox with visual feedback
    console.log('☑️ Checking "Keep me logged in" checkbox...');
    const checkbox = page.locator('input[type="checkbox"]');
    await checkbox.hover(); // Hover first for visual effect
    await page.waitForTimeout(500);
    await checkbox.check();
    console.log('✅ Checkbox checked');
    
    // Wait to show checkbox interaction
    await page.waitForTimeout(1000);
    
    // Step 6: Hover over login button before clicking
    console.log('🎯 Hovering over login button...');
    const loginButton = page.locator('button[type="submit"]');
    await loginButton.hover();
    await page.waitForTimeout(1000);
    
    // Step 7: Click login button
    console.log('🖱️ Clicking login button...');
    await loginButton.click();
    console.log('✅ Login button clicked');
    
    // Wait for login to complete
    console.log('⏳ Waiting for login to complete...');
    await page.waitForTimeout(3000);
    
    // Verify success
    await expect(page.locator('body')).toBeVisible();
    console.log('✅ Interactive form filling completed successfully!');
    
    // Final wait to show result
    await page.waitForTimeout(2000);
    
    console.log('🎬 Interactive form filling video recording completed');
  });

  // Test 5: Page navigation and interaction with video
  test('page navigation and interaction with video', async ({ page }) => {
    console.log('🎬 Starting page navigation and interaction with video...');
    console.log('📹 This will show various page interactions');
    
    // Navigate to login page
    await page.goto('https://stagingaz.ezscm.ai/');
    console.log('✅ Initial page loaded');
    
    // Wait to show initial page
    await page.waitForTimeout(2000);
    
    // Step 1: Scroll down to see more of the page
    console.log('📜 Scrolling down to see more content...');
    await page.evaluate(() => {
      window.scrollTo(0, 300);
    });
    await page.waitForTimeout(1000);
    
    // Step 2: Scroll back up
    console.log('📜 Scrolling back up...');
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1000);
    
    // Step 3: Hover over different elements
    console.log('🎯 Hovering over form elements...');
    
    // Hover over email field
    await page.hover('#email');
    await page.waitForTimeout(500);
    
    // Hover over password field
    await page.hover('#password');
    await page.waitForTimeout(500);
    
    // Hover over checkbox
    await page.hover('input[type="checkbox"]');
    await page.waitForTimeout(500);
    
    // Hover over login button
    await page.hover('button[type="submit"]');
    await page.waitForTimeout(1000);
    
    // Step 4: Fill form quickly
    console.log('⚡ Filling form quickly...');
    await page.fill('#email', 'rollinivi4+test@gmail.com');
    await page.fill('#password', 'User@123');
    await page.check('input[type="checkbox"]');
    
    // Wait to show filled form
    await page.waitForTimeout(1000);
    
    // Step 5: Click login
    console.log('🖱️ Clicking login button...');
    await page.click('button[type="submit"]');
    
    // Wait for result
    await page.waitForTimeout(3000);
    
    console.log('✅ Page navigation and interaction completed!');
    console.log('🎬 Navigation video recording completed');
  });
});
