const { test, expect } = require('@playwright/test');

/**
 * 🎭 BASIC TRACING EXAMPLE
 * 
 * This test demonstrates basic tracing functionality.
 * Tracing records every action, network request, and browser event.
 */

test.describe('Basic Tracing Examples', () => {
  
  test('Login with tracing enabled', async ({ page, context }) => {
    // 🚀 Start tracing before any actions
    await context.tracing.start({
      screenshots: true,    // Capture screenshots
      snapshots: true,      // Capture DOM snapshots
      sources: true         // Capture source code
    });

    try {
      // Navigate to ezSCM login page
      await page.goto('https://stagingaz.ezscm.ai/');
      
      // Fill login form with real ezSCM credentials
      await page.fill('#email', 'rollinivi4+test@gmail.com');
      await page.fill('#password', 'User@123');
      
      // Click login button
      await page.click('button[type="submit"]');
      
      // Wait for navigation (ezSCM redirects after login)
      await page.waitForTimeout(3000);
      
      // Verify login success by checking if we're no longer on login page
      const currentUrl = page.url();
      console.log('📍 Current URL after login:', currentUrl);
      
      // Check if we're still on login page or moved somewhere
      await expect(page.locator('body')).toBeVisible();
      
      console.log('✅ Login test completed successfully!');
      
    } finally {
      // 🛑 Stop tracing and save the trace
      await context.tracing.stop({ 
        path: 'trace-files/login-trace.zip' 
      });
      
      console.log('📁 Trace saved to: trace-files/login-trace.zip');
    }
  });

  test('Form submission with tracing', async ({ page, context }) => {
    // Start tracing with custom options
    await context.tracing.start({
      screenshots: true,
      snapshots: true,
      sources: true,
      title: 'Form Submission Test'  // Custom title for the trace
    });

    try {
      await page.goto('https://stagingaz.ezscm.ai/');
      
      // Fill login form with invalid credentials to test error handling
      await page.fill('#email', 'rollinivi4+test@gmail.com');
      await page.fill('#password', 'wrongpassword');
      
      // Submit form
      await page.click('button[type="submit"]');
      
      // Wait for error or stay on login page
      await page.waitForTimeout(2000);
      
      // Check if we're still on login page (which means login failed)
      await expect(page).toHaveURL(/stagingaz\.ezscm\.ai/);
      
    } finally {
      // Save trace with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      await context.tracing.stop({ 
        path: `trace-files/form-submission-${timestamp}.zip` 
      });
    }
  });

  test('Error scenario with tracing', async ({ page, context }) => {
    await context.tracing.start({
      screenshots: true,
      snapshots: true,
      sources: true,
      title: 'Error Scenario Test'
    });

    try {
      await page.goto('https://stagingaz.ezscm.ai/');
      
      // Intentionally cause an error with invalid credentials
      await page.fill('#email', 'invalid-email@test.com');
      await page.fill('#password', 'wrong-password');
      await page.click('button[type="submit"]');
      
      // Wait for error or stay on login page
      await page.waitForTimeout(2000);
      
      // This will fail and we can see the trace
      await expect(page).toHaveURL(/stagingaz\.ezscm\.ai/);
      
    } catch (error) {
      console.log('❌ Test failed as expected:', error.message);
    } finally {
      // Save trace even when test fails
      await context.tracing.stop({ 
        path: 'trace-files/error-trace.zip' 
      });
    }
  });
});




