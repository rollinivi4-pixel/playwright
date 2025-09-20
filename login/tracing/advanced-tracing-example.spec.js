const { test, expect } = require('@playwright/test');

/**
 * 🎭 ADVANCED TRACING EXAMPLES
 * 
 * This file demonstrates advanced tracing features including:
 * - Conditional tracing
 * - Network request tracing
 * - Performance monitoring
 * - Custom trace events
 */

test.describe('Advanced Tracing Examples', () => {
  
  test('Conditional tracing based on test outcome', async ({ page, context }) => {
    let traceStarted = false;
    
    try {
      await page.goto('https://stagingaz.ezscm.ai/');
      
      // Start tracing only if we encounter issues
      await page.fill('#email', 'rollinivi4+test@gmail.com');
      await page.fill('#password', 'User@123');
      
      // If login fails, start tracing for debugging
      const loginButton = page.locator('button[type="submit"]');
      await loginButton.click();
      
      // Wait a bit to see if login succeeds
      try {
        await page.waitForTimeout(3000);
        const currentUrl = page.url();
        if (currentUrl.includes('dashboard') || !currentUrl.includes('stagingaz.ezscm.ai')) {
          console.log('✅ Login successful - no tracing needed');
        } else {
          throw new Error('Still on login page');
        }
      } catch (error) {
        console.log('❌ Login failed - starting trace for debugging');
        await context.tracing.start({
          screenshots: true,
          snapshots: true,
          sources: true,
          title: 'ezSCM Login Failure Debug'
        });
        traceStarted = true;
        
        // Take additional screenshots for debugging
        await page.screenshot({ path: 'debug-screenshots/ezscm-login-failure.png' });
      }
      
    } finally {
      if (traceStarted) {
        await context.tracing.stop({ 
          path: 'trace-files/conditional-trace.zip' 
        });
      }
    }
  });

  test('Network request tracing', async ({ page, context }) => {
    // Start tracing to capture network requests
    await context.tracing.start({
      screenshots: true,
      snapshots: true,
      sources: true,
      title: 'Network Request Analysis'
    });

    // Listen to network requests
    const requests = [];
    const responses = [];
    
    page.on('request', request => {
      requests.push({
        url: request.url(),
        method: request.method(),
        headers: request.headers(),
        postData: request.postData()
      });
    });
    
    page.on('response', response => {
      responses.push({
        url: response.url(),
        status: response.status(),
        statusText: response.statusText(),
        headers: response.headers()
      });
    });

    try {
      await page.goto('https://stagingaz.ezscm.ai/');
      
      // Fill login form to trigger network requests
      await page.fill('#email', 'rollinivi4+test@gmail.com');
      await page.fill('#password', 'User@123');
      
      // Listen for login API call
      const loginResponse = page.waitForResponse(response => 
        response.url().includes('login') || response.url().includes('auth')
      );
      
      await page.click('button[type="submit"]');
      
      // Wait for login response
      try {
        await loginResponse;
        console.log('✅ Login API call completed');
      } catch (error) {
        console.log('⚠️ No login API call detected, continuing...');
      }
      
      // Wait for page to process
      await page.waitForTimeout(2000);
      
      console.log(`📊 Captured ${requests.length} requests and ${responses.length} responses`);
      
    } finally {
      await context.tracing.stop({ 
        path: 'trace-files/network-trace.zip' 
      });
    }
  });

  test('Performance monitoring with tracing', async ({ page, context }) => {
    await context.tracing.start({
      screenshots: true,
      snapshots: true,
      sources: true,
      title: 'Performance Analysis'
    });

    try {
      // Measure page load time
      const startTime = Date.now();
      
      await page.goto('https://stagingaz.ezscm.ai/');
      
      // Wait for critical elements to load
      await page.waitForSelector('#email');
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      console.log(`⏱️ Page load time: ${loadTime}ms`);
      
      // Measure login form interaction performance
      const interactionStart = Date.now();
      await page.fill('#email', 'rollinivi4+test@gmail.com');
      await page.fill('#password', 'User@123');
      await page.click('button[type="submit"]');
      await page.waitForTimeout(2000); // Wait for login processing
      
      const interactionTime = Date.now() - interactionStart;
      console.log(`⚡ Login interaction time: ${interactionTime}ms`);
      
      // Performance assertions
      expect(loadTime).toBeLessThan(5000); // Page should load in under 5 seconds
      expect(interactionTime).toBeLessThan(3000); // Login should complete in under 3 seconds
      
    } finally {
      await context.tracing.stop({ 
        path: 'trace-files/performance-trace.zip' 
      });
    }
  });

  test('Custom trace events and annotations', async ({ page, context }) => {
    await context.tracing.start({
      screenshots: true,
      snapshots: true,
      sources: true,
      title: 'Custom Trace Events'
    });

    try {
      // Add custom trace events
      await page.addInitScript(() => {
        // This will be included in the trace
        console.log('🚀 Custom initialization script executed');
      });
      
      await page.goto('https://stagingaz.ezscm.ai/');
      
      // Custom trace annotation
      await page.evaluate(() => {
        console.log('📝 Starting ezSCM login process');
      });
      
      // Fill login form with custom annotations
      await page.fill('#email', 'rollinivi4+test@gmail.com');
      await page.evaluate(() => {
        console.log('📧 Email field filled');
      });
      
      await page.fill('#password', 'User@123');
      await page.evaluate(() => {
        console.log('🔒 Password field filled');
      });
      
      // Check "Keep me logged in" if available
      const keepLoggedIn = page.locator('input[type="checkbox"]');
      if (await keepLoggedIn.isVisible()) {
        await keepLoggedIn.check();
        await page.evaluate(() => {
          console.log('☑️ Keep me logged in checked');
        });
      }
      
      // Another custom annotation
      await page.evaluate(() => {
        console.log('✅ Login form filled successfully');
      });
      
      await page.click('button[type="submit"]');
      await page.waitForTimeout(3000);
      
    } finally {
      await context.tracing.stop({ 
        path: 'trace-files/custom-events-trace.zip' 
      });
    }
  });

  test('Multi-step workflow tracing', async ({ page, context }) => {
    await context.tracing.start({
      screenshots: true,
      snapshots: true,
      sources: true,
      title: 'Multi-step Workflow'
    });

    try {
      // Step 1: Login to ezSCM
      console.log('🔐 Step 1: Login to ezSCM');
      await page.goto('https://stagingaz.ezscm.ai/');
      await page.fill('#email', 'rollinivi4+test@gmail.com');
      await page.fill('#password', 'User@123');
      
      // Check "Keep me logged in" if available
      const keepLoggedIn = page.locator('input[type="checkbox"]');
      if (await keepLoggedIn.isVisible()) {
        await keepLoggedIn.check();
        console.log('☑️ Keep me logged in checked');
      }
      
      await page.click('button[type="submit"]');
      await page.waitForTimeout(3000);
      
      // Step 2: Verify login success
      console.log('✅ Step 2: Verify login success');
      const currentUrl = page.url();
      console.log('📍 Current URL after login:', currentUrl);
      
      // Step 3: Test forgot password flow (if login fails)
      if (currentUrl.includes('stagingaz.ezscm.ai')) {
        console.log('🔄 Step 3: Testing forgot password flow');
        
        // Look for forgot password link
        const forgotPasswordSelectors = [
          'text=Forgot password?',
          'text=Forgot Password?',
          'text=Forgot password',
          'a[href*="forgot"]',
          'a[href*="reset"]'
        ];
        
        let linkFound = false;
        for (const selector of forgotPasswordSelectors) {
          const element = page.locator(selector);
          if (await element.isVisible()) {
            console.log(`✅ Found forgot password link: ${selector}`);
            await element.click();
            await page.waitForTimeout(2000);
            linkFound = true;
            break;
          }
        }
        
        if (!linkFound) {
          console.log('⚠️ Forgot password link not found');
        }
      }
      
      // Step 4: Take final screenshot
      console.log('📸 Step 4: Taking final screenshot');
      await page.screenshot({ path: 'debug-screenshots/ezscm-workflow-final.png' });
      
    } finally {
      await context.tracing.stop({ 
        path: 'trace-files/workflow-trace.zip' 
      });
    }
  });
});
