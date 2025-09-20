# Playwright Annotations - Login Page Testing

## Overview

This directory contains comprehensive examples and utilities for using Playwright's built-in annotations feature. Annotations allow you to add metadata, descriptions, and visual markers to your tests for better reporting, debugging, and test management.

## Table of Contents

- [Quick Start](#quick-start)
- [Annotation Types](#annotation-types)
- [Usage Examples](#usage-examples)
- [Best Practices](#best-practices)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)

## Quick Start

### 1. Basic Annotation Usage

```javascript
import { test, expect } from '@playwright/test';

test('should login with valid credentials', async ({ page }) => {
  // Add step annotation
  await test.step('Navigate to login page', async () => {
    await page.goto('https://stagingaz.ezscm.ai/');
  });

  // Add step annotation with description
  await test.step('Fill login form', async () => {
    await page.fill('#email', 'rollinivi4+test@gmail.com');
    await page.fill('#password', 'User@123');
  });

  // Add step annotation with error handling
  await test.step('Submit login form', async () => {
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);
  });

  // Add step annotation for verification
  await test.step('Verify successful login', async () => {
    await expect(page).toHaveURL(/lobby/);
    await expect(page.locator('text=Sales Orders')).toBeVisible();
  });
});
```

### 2. Running Tests with Annotations

```bash
# Run tests with step-by-step reporting
npx playwright test --reporter=html

# Run tests with line-by-line reporting
npx playwright test --reporter=line

# Run tests with JSON reporting
npx playwright test --reporter=json
```

## Annotation Types

### 1. Test Steps (`test.step()`)

**Purpose**: Break down test execution into logical steps for better reporting and debugging.

**Syntax**:
```javascript
await test.step(stepName, async () => {
  // Test code here
});
```

**Examples**:
```javascript
// Simple step
await test.step('Login to application', async () => {
  await page.goto('https://stagingaz.ezscm.ai/');
  await page.fill('#email', 'rollinivi4+test@gmail.com');
  await page.fill('#password', 'User@123');
  await page.click('button[type="submit"]');
});

// Step with error handling
await test.step('Verify login success', async () => {
  try {
    await expect(page).toHaveURL(/lobby/);
  } catch (error) {
    await page.screenshot({ path: 'login-failure.png' });
    throw error;
  }
});
```

### 2. Test Info (`test.info()`)

**Purpose**: Add metadata and information to tests for better reporting.

**Syntax**:
```javascript
test.info().annotations.push({
  type: 'annotation-type',
  description: 'Description text'
});
```

**Examples**:
```javascript
// Add test description
test.info().annotations.push({
  type: 'test-description',
  description: 'This test verifies basic login functionality with valid credentials'
});

// Add test category
test.info().annotations.push({
  type: 'test-category',
  description: 'Authentication'
});

// Add test priority
test.info().annotations.push({
  type: 'test-priority',
  description: 'Critical'
});

// Add test environment
test.info().annotations.push({
  type: 'test-environment',
  description: 'Staging'
});

// Add test data info
test.info().annotations.push({
  type: 'test-data',
  description: 'Valid user credentials: rollinivi4+test@gmail.com'
});
```

### 3. Attachments (`test.info().attach()`)

**Purpose**: Attach files, screenshots, or other data to test reports.

**Syntax**:
```javascript
await test.info().attach(name, {
  contentType: 'mime-type',
  path: 'file-path'
});
```

**Examples**:
```javascript
// Attach screenshot
await test.info().attach('Login Page Screenshot', {
  contentType: 'image/png',
  path: 'login-page.png'
});

// Attach JSON data
await test.info().attach('Test Data', {
  contentType: 'application/json',
  path: 'test-data.json'
});

// Attach text content
await test.info().attach('Error Log', {
  contentType: 'text/plain',
  body: 'Error occurred during login process'
});
```

## Usage Examples

### 1. Complete Login Test with Annotations

```javascript
import { test, expect } from '@playwright/test';

test('should login with valid credentials', async ({ page }) => {
  // Add test metadata
  test.info().annotations.push(
    { type: 'test-description', description: 'Verify basic login functionality' },
    { type: 'test-category', description: 'Authentication' },
    { type: 'test-priority', description: 'Critical' },
    { type: 'test-environment', description: 'Staging' }
  );

  await test.step('Navigate to login page', async () => {
    await page.goto('https://stagingaz.ezscm.ai/');
    await page.screenshot({ path: 'login-page.png' });
    
    await test.info().attach('Login Page', {
      contentType: 'image/png',
      path: 'login-page.png'
    });
  });

  await test.step('Fill login form', async () => {
    await page.fill('#email', 'rollinivi4+test@gmail.com');
    await page.fill('#password', 'User@123');
    await page.check('input[type="checkbox"]');
    
    await page.screenshot({ path: 'filled-form.png' });
    
    await test.info().attach('Filled Form', {
      contentType: 'image/png',
      path: 'filled-form.png'
    });
  });

  await test.step('Submit login form', async () => {
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);
    
    await page.screenshot({ path: 'submitted-form.png' });
    
    await test.info().attach('Form Submission', {
      contentType: 'image/png',
      path: 'submitted-form.png'
    });
  });

  await test.step('Verify successful login', async () => {
    await expect(page).toHaveURL(/lobby/);
    await expect(page.locator('text=Sales Orders')).toBeVisible();
    
    await page.screenshot({ path: 'login-success.png' });
    
    await test.info().attach('Login Success', {
      contentType: 'image/png',
      path: 'login-success.png'
    });
  });
});
```

### 2. Error Handling with Annotations

```javascript
test('should handle invalid credentials', async ({ page }) => {
  test.info().annotations.push(
    { type: 'test-description', description: 'Verify error handling for invalid credentials' },
    { type: 'test-category', description: 'Error Handling' },
    { type: 'test-priority', description: 'High' }
  );

  await test.step('Navigate to login page', async () => {
    await page.goto('https://stagingaz.ezscm.ai/');
  });

  await test.step('Enter invalid credentials', async () => {
    await page.fill('#email', 'invalid@email.com');
    await page.fill('#password', 'wrongpassword');
  });

  await test.step('Submit form and verify error', async () => {
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);
    
    // Take screenshot for debugging
    await page.screenshot({ path: 'login-error.png' });
    
    await test.info().attach('Login Error', {
      contentType: 'image/png',
      path: 'login-error.png'
    });
    
    // Verify error handling
    await expect(page).toHaveURL(/stagingaz\.ezscm\.ai/);
  });
});
```

### 3. Performance Testing with Annotations

```javascript
test('should load login page within acceptable time', async ({ page }) => {
  test.info().annotations.push(
    { type: 'test-description', description: 'Verify login page load performance' },
    { type: 'test-category', description: 'Performance' },
    { type: 'test-priority', description: 'Medium' }
  );

  await test.step('Measure page load time', async () => {
    const startTime = Date.now();
    
    await page.goto('https://stagingaz.ezscm.ai/');
    
    const loadTime = Date.now() - startTime;
    
    await test.info().attach('Load Time', {
      contentType: 'text/plain',
      body: `Page loaded in ${loadTime}ms`
    });
    
    expect(loadTime).toBeLessThan(5000);
  });

  await test.step('Verify page elements are visible', async () => {
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });
});
```

### 4. Data-Driven Testing with Annotations

```javascript
const testData = [
  { email: 'rollinivi4+test@gmail.com', password: 'User@123', expected: 'success' },
  { email: 'invalid@email.com', password: 'wrongpassword', expected: 'error' },
  { email: 'rollinivi4+test@gmail.com', password: '', expected: 'error' }
];

for (const data of testData) {
  test(`should handle login with ${data.expected} result`, async ({ page }) => {
    test.info().annotations.push(
      { type: 'test-description', description: `Test login with ${data.expected} scenario` },
      { type: 'test-category', description: 'Data-Driven Testing' },
      { type: 'test-data', description: `Email: ${data.email}, Password: ${data.password}` }
    );

    await test.step('Navigate to login page', async () => {
      await page.goto('https://stagingaz.ezscm.ai/');
    });

    await test.step('Fill form with test data', async () => {
      await page.fill('#email', data.email);
      await page.fill('#password', data.password);
    });

    await test.step('Submit form and verify result', async () => {
      await page.click('button[type="submit"]');
      await page.waitForTimeout(2000);
      
      if (data.expected === 'success') {
        await expect(page).toHaveURL(/lobby/);
      } else {
        await expect(page).toHaveURL(/stagingaz\.ezscm\.ai/);
      }
    });
  });
}
```

## Best Practices

### 1. Step Organization

```javascript
// Good: Clear, descriptive step names
await test.step('Navigate to login page', async () => {
  // Implementation
});

await test.step('Fill email field with valid email', async () => {
  // Implementation
});

await test.step('Fill password field with valid password', async () => {
  // Implementation
});

// Bad: Vague step names
await test.step('Do stuff', async () => {
  // Implementation
});
```

### 2. Error Handling in Steps

```javascript
await test.step('Verify login success', async () => {
  try {
    await expect(page).toHaveURL(/lobby/);
  } catch (error) {
    // Attach screenshot for debugging
    await page.screenshot({ path: 'login-failure.png' });
    await test.info().attach('Login Failure Screenshot', {
      contentType: 'image/png',
      path: 'login-failure.png'
    });
    
    // Attach error details
    await test.info().attach('Error Details', {
      contentType: 'text/plain',
      body: `Error: ${error.message}\nURL: ${page.url()}`
    });
    
    throw error;
  }
});
```

### 3. Metadata Management

```javascript
// Create reusable annotation sets
const criticalTestAnnotations = [
  { type: 'test-priority', description: 'Critical' },
  { type: 'test-category', description: 'Authentication' },
  { type: 'test-environment', description: 'Staging' }
];

const performanceTestAnnotations = [
  { type: 'test-priority', description: 'Medium' },
  { type: 'test-category', description: 'Performance' },
  { type: 'test-environment', description: 'Staging' }
];

// Use in tests
test('critical login test', async ({ page }) => {
  test.info().annotations.push(...criticalTestAnnotations);
  // Test implementation
});
```

### 4. Attachment Management

```javascript
// Create helper function for attachments
async function attachScreenshot(page, name) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `${name}-${timestamp}.png`;
  
  await page.screenshot({ path: filename });
  
  await test.info().attach(name, {
    contentType: 'image/png',
    path: filename
  });
}

// Use in tests
await test.step('Take screenshot', async () => {
  await attachScreenshot(page, 'Login Page');
});
```

## Configuration

### 1. Reporter Configuration

```javascript
// playwright.config.js
export default defineConfig({
  testDir: './login',
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results.json' }],
    ['junit', { outputFile: 'test-results.xml' }]
  ],
  // ... other config
});
```

### 2. Global Annotations

```javascript
// global-setup.js
import { test } from '@playwright/test';

// Add global annotations to all tests
test.beforeEach(async ({ page }, testInfo) => {
  testInfo.annotations.push(
    { type: 'test-environment', description: 'Staging' },
    { type: 'test-version', description: '1.0.0' }
  );
});
```

### 3. Custom Annotation Types

```javascript
// Custom annotation types
const customAnnotations = {
  testOwner: (owner) => ({ type: 'test-owner', description: owner }),
  testJira: (ticket) => ({ type: 'test-jira', description: ticket }),
  testComponent: (component) => ({ type: 'test-component', description: component }),
  testRisk: (risk) => ({ type: 'test-risk', description: risk })
};

// Usage
test.info().annotations.push(
  customAnnotations.testOwner('John Doe'),
  customAnnotations.testJira('LOGIN-123'),
  customAnnotations.testComponent('Authentication'),
  customAnnotations.testRisk('High')
);
```

## Troubleshooting

### Common Issues

1. **Steps not showing in report**
   - Ensure you're using the HTML reporter
   - Check that steps are properly awaited
   - Verify step names are descriptive

2. **Attachments not appearing**
   - Check file paths are correct
   - Ensure content type is properly set
   - Verify files are created before attachment

3. **Annotations not displaying**
   - Check annotation format is correct
   - Ensure annotations are added before test execution
   - Verify reporter supports annotations

### Debug Tips

1. **Use console.log for debugging**
   ```javascript
   await test.step('Debug step', async () => {
     console.log('Current URL:', page.url());
     console.log('Page title:', await page.title());
   });
   ```

2. **Add timing information**
   ```javascript
   await test.step('Timed operation', async () => {
     const start = Date.now();
     // Your operation
     const duration = Date.now() - start;
     console.log(`Operation took ${duration}ms`);
   });
   ```

3. **Capture page state**
   ```javascript
   await test.step('Capture page state', async () => {
     const pageContent = await page.content();
     await test.info().attach('Page HTML', {
       contentType: 'text/html',
       body: pageContent
     });
   });
   ```

## Additional Resources

- [Playwright Test Annotations Documentation](https://playwright.dev/docs/test-annotations)
- [Playwright Test Steps Documentation](https://playwright.dev/docs/test-steps)
- [Playwright Test Attachments Documentation](https://playwright.dev/docs/test-attachments)
- [Playwright Test Info Documentation](https://playwright.dev/docs/test-info)

---

**Last Updated**: 2024
**Version**: 1.0.0
**Maintainer**: Test Automation Team
