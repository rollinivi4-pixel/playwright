/**
 * Playwright Annotations Examples for Login Page Testing
 * 
 * This file demonstrates comprehensive usage of Playwright annotations
 * including test steps, metadata, attachments, and error handling.
 */

import { test, expect } from '@playwright/test';

// ============================================================================
// BASIC ANNOTATION EXAMPLES
// ============================================================================

test.describe('Basic Annotation Examples', () => {
  
  test('should login with valid credentials - Basic Steps', async ({ page }) => {
    // Add test metadata
    test.info().annotations.push(
      { type: 'test-description', description: 'Verify basic login functionality with valid credentials' },
      { type: 'test-category', description: 'Authentication' },
      { type: 'test-priority', description: 'Critical' },
      { type: 'test-environment', description: 'Staging' }
    );

    await test.step('Navigate to login page', async () => {
      await page.goto('https://stagingaz.ezscm.ai/');
      console.log('✅ Navigated to login page');
    });

    await test.step('Fill login form', async () => {
      await page.fill('#email', 'rollinivi4+test@gmail.com');
      await page.fill('#password', 'User@123');
      console.log('✅ Filled login form');
    });

    await test.step('Submit login form', async () => {
      await page.click('button[type="submit"]');
      await page.waitForTimeout(3000);
      console.log('✅ Submitted login form');
    });

    await test.step('Verify successful login', async () => {
      await expect(page).toHaveURL(/lobby/);
      await expect(page.locator('text=Sales Orders')).toBeVisible();
      console.log('✅ Login verification completed');
    });
  });

  test('should handle invalid credentials - Error Handling', async ({ page }) => {
    test.info().annotations.push(
      { type: 'test-description', description: 'Verify error handling for invalid credentials' },
      { type: 'test-category', description: 'Error Handling' },
      { type: 'test-priority', description: 'High' },
      { type: 'test-data', description: 'Invalid email: invalid@email.com, Invalid password: wrongpassword' }
    );

    await test.step('Navigate to login page', async () => {
      await page.goto('https://stagingaz.ezscm.ai/');
      console.log('✅ Navigated to login page');
    });

    await test.step('Enter invalid credentials', async () => {
      await page.fill('#email', 'invalid@email.com');
      await page.fill('#password', 'wrongpassword');
      console.log('✅ Entered invalid credentials');
    });

    await test.step('Submit form and verify error', async () => {
      await page.click('button[type="submit"]');
      await page.waitForTimeout(2000);
      
      // Take screenshot for debugging
      await page.screenshot({ path: 'login-error.png' });
      
      await test.info().attach('Login Error Screenshot', {
        contentType: 'image/png',
        path: 'login-error.png'
      });
      
      // Verify error handling
      await expect(page).toHaveURL(/stagingaz\.ezscm\.ai/);
      console.log('✅ Error handling verified');
    });
  });
});

// ============================================================================
// SCREENSHOT AND ATTACHMENT EXAMPLES
// ============================================================================

test.describe('Screenshot and Attachment Examples', () => {
  
  test('should capture screenshots during login process', async ({ page }) => {
    test.info().annotations.push(
      { type: 'test-description', description: 'Capture screenshots at each step of login process' },
      { type: 'test-category', description: 'Visual Testing' },
      { type: 'test-priority', description: 'Medium' }
    );

    await test.step('Navigate to login page and capture initial state', async () => {
      await page.goto('https://stagingaz.ezscm.ai/');
      
      const screenshot = await page.screenshot({ path: '01-login-page.png' });
      
      await test.info().attach('Login Page - Initial State', {
        contentType: 'image/png',
        path: '01-login-page.png'
      });
      
      console.log('✅ Captured initial login page screenshot');
    });

    await test.step('Fill form and capture filled state', async () => {
      await page.fill('#email', 'rollinivi4+test@gmail.com');
      await page.fill('#password', 'User@123');
      await page.check('input[type="checkbox"]');
      
      const screenshot = await page.screenshot({ path: '02-filled-form.png' });
      
      await test.info().attach('Login Form - Filled State', {
        contentType: 'image/png',
        path: '02-filled-form.png'
      });
      
      console.log('✅ Captured filled form screenshot');
    });

    await test.step('Submit form and capture submission state', async () => {
      await page.click('button[type="submit"]');
      await page.waitForTimeout(1000);
      
      const screenshot = await page.screenshot({ path: '03-form-submitted.png' });
      
      await test.info().attach('Login Form - Submission State', {
        contentType: 'image/png',
        path: '03-form-submitted.png'
      });
      
      console.log('✅ Captured form submission screenshot');
    });

    await test.step('Verify success and capture final state', async () => {
      await page.waitForTimeout(2000);
      
      const screenshot = await page.screenshot({ path: '04-login-success.png' });
      
      await test.info().attach('Login Success - Final State', {
        contentType: 'image/png',
        path: '04-login-success.png'
      });
      
      await expect(page).toHaveURL(/lobby/);
      console.log('✅ Captured success state screenshot');
    });
  });

  test('should attach test data and logs', async ({ page }) => {
    test.info().annotations.push(
      { type: 'test-description', description: 'Attach test data and logs for debugging' },
      { type: 'test-category', description: 'Data Testing' },
      { type: 'test-priority', description: 'Medium' }
    );

    const testData = {
      email: 'rollinivi4+test@gmail.com',
      password: 'User@123',
      environment: 'staging',
      timestamp: new Date().toISOString()
    };

    await test.step('Attach test data', async () => {
      await test.info().attach('Test Data', {
        contentType: 'application/json',
        body: JSON.stringify(testData, null, 2)
      });
      
      console.log('✅ Attached test data');
    });

    await test.step('Execute login with logging', async () => {
      const logs = [];
      
      logs.push(`Starting login test at ${new Date().toISOString()}`);
      
      await page.goto('https://stagingaz.ezscm.ai/');
      logs.push('Navigated to login page');
      
      await page.fill('#email', testData.email);
      logs.push(`Filled email: ${testData.email}`);
      
      await page.fill('#password', testData.password);
      logs.push('Filled password field');
      
      await page.click('button[type="submit"]');
      logs.push('Clicked submit button');
      
      await page.waitForTimeout(3000);
      logs.push('Waited for page load');
      
      const currentUrl = page.url();
      logs.push(`Current URL: ${currentUrl}`);
      
      await test.info().attach('Test Execution Log', {
        contentType: 'text/plain',
        body: logs.join('\n')
      });
      
      console.log('✅ Attached execution logs');
    });

    await test.step('Verify login success', async () => {
      await expect(page).toHaveURL(/lobby/);
      await expect(page.locator('text=Sales Orders')).toBeVisible();
      
      const successMessage = `Login successful at ${new Date().toISOString()}`;
      
      await test.info().attach('Success Message', {
        contentType: 'text/plain',
        body: successMessage
      });
      
      console.log('✅ Login verification completed');
    });
  });
});

// ============================================================================
// PERFORMANCE TESTING WITH ANNOTATIONS
// ============================================================================

test.describe('Performance Testing with Annotations', () => {
  
  test('should measure login page load performance', async ({ page }) => {
    test.info().annotations.push(
      { type: 'test-description', description: 'Measure login page load performance' },
      { type: 'test-category', description: 'Performance' },
      { type: 'test-priority', description: 'Medium' },
      { type: 'test-threshold', description: 'Page load time should be less than 5 seconds' }
    );

    await test.step('Measure page load time', async () => {
      const startTime = Date.now();
      
      await page.goto('https://stagingaz.ezscm.ai/');
      
      const loadTime = Date.now() - startTime;
      
      await test.info().attach('Page Load Time', {
        contentType: 'text/plain',
        body: `Page loaded in ${loadTime}ms`
      });
      
      expect(loadTime).toBeLessThan(5000);
      console.log(`✅ Page loaded in ${loadTime}ms`);
    });

    await test.step('Measure element visibility time', async () => {
      const startTime = Date.now();
      
      await expect(page.locator('#email')).toBeVisible();
      await expect(page.locator('#password')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toBeVisible();
      
      const visibilityTime = Date.now() - startTime;
      
      await test.info().attach('Element Visibility Time', {
        contentType: 'text/plain',
        body: `Elements became visible in ${visibilityTime}ms`
      });
      
      console.log(`✅ Elements visible in ${visibilityTime}ms`);
    });
  });

  test('should measure login process performance', async ({ page }) => {
    test.info().annotations.push(
      { type: 'test-description', description: 'Measure complete login process performance' },
      { type: 'test-category', description: 'Performance' },
      { type: 'test-priority', description: 'Medium' },
      { type: 'test-threshold', description: 'Login process should complete within 10 seconds' }
    );

    const performanceMetrics = {};

    await test.step('Measure form filling time', async () => {
      await page.goto('https://stagingaz.ezscm.ai/');
      
      const startTime = Date.now();
      
      await page.fill('#email', 'rollinivi4+test@gmail.com');
      await page.fill('#password', 'User@123');
      await page.check('input[type="checkbox"]');
      
      performanceMetrics.formFillingTime = Date.now() - startTime;
      
      console.log(`✅ Form filled in ${performanceMetrics.formFillingTime}ms`);
    });

    await test.step('Measure login submission time', async () => {
      const startTime = Date.now();
      
      await page.click('button[type="submit"]');
      await page.waitForURL(/lobby/);
      
      performanceMetrics.loginTime = Date.now() - startTime;
      
      await test.info().attach('Login Performance Metrics', {
        contentType: 'application/json',
        body: JSON.stringify(performanceMetrics, null, 2)
      });
      
      expect(performanceMetrics.loginTime).toBeLessThan(10000);
      console.log(`✅ Login completed in ${performanceMetrics.loginTime}ms`);
    });
  });
});

// ============================================================================
// DATA-DRIVEN TESTING WITH ANNOTATIONS
// ============================================================================

test.describe('Data-Driven Testing with Annotations', () => {
  
  const testScenarios = [
    {
      name: 'Valid Credentials',
      email: 'rollinivi4+test@gmail.com',
      password: 'User@123',
      expected: 'success',
      description: 'Test with valid credentials should succeed'
    },
    {
      name: 'Invalid Email',
      email: 'invalid@email.com',
      password: 'User@123',
      expected: 'error',
      description: 'Test with invalid email should fail'
    },
    {
      name: 'Invalid Password',
      email: 'rollinivi4+test@gmail.com',
      password: 'wrongpassword',
      expected: 'error',
      description: 'Test with invalid password should fail'
    },
    {
      name: 'Empty Email',
      email: '',
      password: 'User@123',
      expected: 'error',
      description: 'Test with empty email should fail'
    },
    {
      name: 'Empty Password',
      email: 'rollinivi4+test@gmail.com',
      password: '',
      expected: 'error',
      description: 'Test with empty password should fail'
    }
  ];

  for (const scenario of testScenarios) {
    test(`should handle ${scenario.name}`, async ({ page }) => {
      test.info().annotations.push(
        { type: 'test-description', description: scenario.description },
        { type: 'test-category', description: 'Data-Driven Testing' },
        { type: 'test-priority', description: 'High' },
        { type: 'test-data', description: `Email: ${scenario.email}, Password: ${scenario.password}` },
        { type: 'test-expected', description: `Expected result: ${scenario.expected}` }
      );

      await test.step('Navigate to login page', async () => {
        await page.goto('https://stagingaz.ezscm.ai/');
        console.log(`✅ Navigated to login page for ${scenario.name}`);
      });

      await test.step('Fill form with test data', async () => {
        if (scenario.email) {
          await page.fill('#email', scenario.email);
        }
        if (scenario.password) {
          await page.fill('#password', scenario.password);
        }
        
        await test.info().attach('Form Data', {
          contentType: 'application/json',
          body: JSON.stringify({
            email: scenario.email,
            password: scenario.password,
            timestamp: new Date().toISOString()
          }, null, 2)
        });
        
        console.log(`✅ Filled form for ${scenario.name}`);
      });

      await test.step('Submit form and verify result', async () => {
        await page.click('button[type="submit"]');
        await page.waitForTimeout(2000);
        
        const screenshot = await page.screenshot({ path: `${scenario.name.replace(/\s+/g, '-').toLowerCase()}-result.png` });
        
        await test.info().attach(`${scenario.name} Result`, {
          contentType: 'image/png',
          path: `${scenario.name.replace(/\s+/g, '-').toLowerCase()}-result.png`
        });
        
        if (scenario.expected === 'success') {
          await expect(page).toHaveURL(/lobby/);
          console.log(`✅ ${scenario.name} succeeded as expected`);
        } else {
          await expect(page).toHaveURL(/stagingaz\.ezscm\.ai/);
          console.log(`✅ ${scenario.name} failed as expected`);
        }
      });
    });
  }
});

// ============================================================================
// ERROR HANDLING AND DEBUGGING WITH ANNOTATIONS
// ============================================================================

test.describe('Error Handling and Debugging with Annotations', () => {
  
  test('should handle network errors gracefully', async ({ page }) => {
    test.info().annotations.push(
      { type: 'test-description', description: 'Test error handling for network issues' },
      { type: 'test-category', description: 'Error Handling' },
      { type: 'test-priority', description: 'Medium' }
    );

    await test.step('Simulate network error', async () => {
      // Simulate network error by intercepting requests
      await page.route('**/*', route => {
        if (route.request().url().includes('stagingaz.ezscm.ai')) {
          route.abort();
        } else {
          route.continue();
        }
      });
      
      console.log('✅ Network error simulation set up');
    });

    await test.step('Attempt to navigate and handle error', async () => {
      try {
        await page.goto('https://stagingaz.ezscm.ai/', { timeout: 5000 });
      } catch (error) {
        await test.info().attach('Network Error Details', {
          contentType: 'text/plain',
          body: `Network error occurred: ${error.message}\nTimestamp: ${new Date().toISOString()}`
        });
        
        console.log('✅ Network error handled gracefully');
      }
    });
  });

  test('should capture detailed error information', async ({ page }) => {
    test.info().annotations.push(
      { type: 'test-description', description: 'Capture detailed error information for debugging' },
      { type: 'test-category', description: 'Debugging' },
      { type: 'test-priority', description: 'Medium' }
    );

    await test.step('Navigate to login page', async () => {
      await page.goto('https://stagingaz.ezscm.ai/');
      console.log('✅ Navigated to login page');
    });

    await test.step('Attempt login with invalid data', async () => {
      await page.fill('#email', 'invalid@email.com');
      await page.fill('#password', 'wrongpassword');
      await page.click('button[type="submit"]');
      
      await page.waitForTimeout(2000);
      console.log('✅ Attempted login with invalid data');
    });

    await test.step('Capture error state and debug information', async () => {
      const errorInfo = {
        timestamp: new Date().toISOString(),
        currentUrl: page.url(),
        pageTitle: await page.title(),
        viewportSize: page.viewportSize(),
        userAgent: await page.evaluate(() => navigator.userAgent)
      };
      
      await test.info().attach('Error Debug Information', {
        contentType: 'application/json',
        body: JSON.stringify(errorInfo, null, 2)
      });
      
      const screenshot = await page.screenshot({ path: 'error-debug.png' });
      
      await test.info().attach('Error State Screenshot', {
        contentType: 'image/png',
        path: 'error-debug.png'
      });
      
      console.log('✅ Error information captured');
    });
  });
});

// ============================================================================
// CUSTOM ANNOTATION UTILITIES
// ============================================================================

test.describe('Custom Annotation Utilities', () => {
  
  // Custom annotation helper functions
  const addTestMetadata = (description, category, priority, environment = 'Staging') => {
    test.info().annotations.push(
      { type: 'test-description', description },
      { type: 'test-category', description: category },
      { type: 'test-priority', description: priority },
      { type: 'test-environment', description: environment }
    );
  };

  const attachScreenshot = async (page, name) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${name}-${timestamp}.png`;
    
    await page.screenshot({ path: filename });
    
    await test.info().attach(name, {
      contentType: 'image/png',
      path: filename
    });
    
    return filename;
  };

  const attachTestData = async (data, name) => {
    await test.info().attach(name, {
      contentType: 'application/json',
      body: JSON.stringify(data, null, 2)
    });
  };

  test('should use custom annotation utilities', async ({ page }) => {
    addTestMetadata(
      'Test custom annotation utilities for login functionality',
      'Utility Testing',
      'Low'
    );

    await test.step('Navigate and capture initial state', async () => {
      await page.goto('https://stagingaz.ezscm.ai/');
      
      const screenshotFile = await attachScreenshot(page, 'Initial Login Page');
      console.log(`✅ Screenshot saved: ${screenshotFile}`);
    });

    await test.step('Fill form and capture filled state', async () => {
      const formData = {
        email: 'rollinivi4+test@gmail.com',
        password: 'User@123',
        timestamp: new Date().toISOString()
      };
      
      await page.fill('#email', formData.email);
      await page.fill('#password', formData.password);
      
      await attachTestData(formData, 'Form Data');
      
      const screenshotFile = await attachScreenshot(page, 'Filled Form');
      console.log(`✅ Screenshot saved: ${screenshotFile}`);
    });

    await test.step('Submit and verify success', async () => {
      await page.click('button[type="submit"]');
      await page.waitForTimeout(3000);
      
      await expect(page).toHaveURL(/lobby/);
      
      const screenshotFile = await attachScreenshot(page, 'Login Success');
      console.log(`✅ Screenshot saved: ${screenshotFile}`);
    });
  });
});

