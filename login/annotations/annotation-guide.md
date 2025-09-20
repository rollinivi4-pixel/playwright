# Playwright Annotations - Complete Guide

## Table of Contents

1. [Introduction](#introduction)
2. [Annotation Types](#annotation-types)
3. [Test Steps](#test-steps)
4. [Test Info and Metadata](#test-info-and-metadata)
5. [Attachments](#attachments)
6. [Error Handling](#error-handling)
7. [Best Practices](#best-practices)
8. [Advanced Usage](#advanced-usage)
9. [Configuration](#configuration)
10. [Troubleshooting](#troubleshooting)

## Introduction

Playwright annotations provide a powerful way to enhance your test reports with metadata, visual steps, and debugging information. They help make your tests more maintainable, debuggable, and provide better insights into test execution.

### Key Benefits

- **Better Test Reports**: Rich, step-by-step test execution reports
- **Enhanced Debugging**: Screenshots, logs, and data attached to specific steps
- **Improved Maintainability**: Clear test structure with descriptive steps
- **Better Collaboration**: Team members can understand test flow easily
- **CI/CD Integration**: Detailed reports for automated test runs

## Annotation Types

### 1. Test Steps (`test.step()`)

Test steps break down your test into logical, reportable units.

#### Basic Syntax
```javascript
await test.step(stepName, async () => {
  // Test code here
});
```

#### Examples

**Simple Step**
```javascript
await test.step('Navigate to login page', async () => {
  await page.goto('https://stagingaz.ezscm.ai/');
});
```

**Step with Error Handling**
```javascript
await test.step('Verify login success', async () => {
  try {
    await expect(page).toHaveURL(/lobby/);
  } catch (error) {
    await page.screenshot({ path: 'login-failure.png' });
    throw error;
  }
});
```

**Nested Steps**
```javascript
await test.step('Complete login process', async () => {
  await test.step('Fill email field', async () => {
    await page.fill('#email', 'rollinivi4+test@gmail.com');
  });
  
  await test.step('Fill password field', async () => {
    await page.fill('#password', 'User@123');
  });
  
  await test.step('Submit form', async () => {
    await page.click('button[type="submit"]');
  });
});
```

### 2. Test Info (`test.info()`)

Test info allows you to add metadata and attachments to your tests.

#### Basic Syntax
```javascript
test.info().annotations.push({
  type: 'annotation-type',
  description: 'Description text'
});
```

#### Common Annotation Types

**Test Description**
```javascript
test.info().annotations.push({
  type: 'test-description',
  description: 'This test verifies basic login functionality'
});
```

**Test Category**
```javascript
test.info().annotations.push({
  type: 'test-category',
  description: 'Authentication'
});
```

**Test Priority**
```javascript
test.info().annotations.push({
  type: 'test-priority',
  description: 'Critical'
});
```

**Test Environment**
```javascript
test.info().annotations.push({
  type: 'test-environment',
  description: 'Staging'
});
```

**Test Data**
```javascript
test.info().annotations.push({
  type: 'test-data',
  description: 'Email: test@example.com, Password: Test123'
});
```

**Custom Annotations**
```javascript
test.info().annotations.push({
  type: 'test-owner',
  description: 'John Doe'
});

test.info().annotations.push({
  type: 'test-jira',
  description: 'LOGIN-123'
});
```

### 3. Attachments (`test.info().attach()`)

Attachments allow you to add files, screenshots, or data to your test reports.

#### Basic Syntax
```javascript
await test.info().attach(name, {
  contentType: 'mime-type',
  path: 'file-path' // or body: 'content'
});
```

#### Common Attachment Types

**Screenshots**
```javascript
await page.screenshot({ path: 'login-page.png' });
await test.info().attach('Login Page', {
  contentType: 'image/png',
  path: 'login-page.png'
});
```

**JSON Data**
```javascript
const testData = { email: 'test@example.com', password: 'Test123' };
await test.info().attach('Test Data', {
  contentType: 'application/json',
  body: JSON.stringify(testData, null, 2)
});
```

**Text Content**
```javascript
await test.info().attach('Error Log', {
  contentType: 'text/plain',
  body: 'Error occurred during login process'
});
```

**HTML Content**
```javascript
const pageContent = await page.content();
await test.info().attach('Page HTML', {
  contentType: 'text/html',
  body: pageContent
});
```

## Test Steps

### Step Organization

#### Good Step Structure
```javascript
test('should login successfully', async ({ page }) => {
  await test.step('Navigate to login page', async () => {
    await page.goto('https://stagingaz.ezscm.ai/');
  });

  await test.step('Fill login form', async () => {
    await page.fill('#email', 'rollinivi4+test@gmail.com');
    await page.fill('#password', 'User@123');
  });

  await test.step('Submit login form', async () => {
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);
  });

  await test.step('Verify successful login', async () => {
    await expect(page).toHaveURL(/lobby/);
    await expect(page.locator('text=Sales Orders')).toBeVisible();
  });
});
```

#### Step Naming Conventions

**Use Action-Oriented Names**
```javascript
// Good
await test.step('Navigate to login page', async () => {});
await test.step('Fill email field', async () => {});
await test.step('Submit login form', async () => {});

// Bad
await test.step('Do stuff', async () => {});
await test.step('Test', async () => {});
await test.step('Check', async () => {});
```

**Use Present Tense**
```javascript
// Good
await test.step('Navigate to login page', async () => {});
await test.step('Fill login form', async () => {});

// Bad
await test.step('Navigated to login page', async () => {});
await test.step('Filled login form', async () => {});
```

### Step Error Handling

#### Basic Error Handling
```javascript
await test.step('Verify login success', async () => {
  try {
    await expect(page).toHaveURL(/lobby/);
  } catch (error) {
    await page.screenshot({ path: 'login-failure.png' });
    await test.info().attach('Login Failure Screenshot', {
      contentType: 'image/png',
      path: 'login-failure.png'
    });
    throw error;
  }
});
```

#### Advanced Error Handling
```javascript
await test.step('Verify login success', async () => {
  try {
    await expect(page).toHaveURL(/lobby/);
  } catch (error) {
    // Capture multiple debugging artifacts
    const debugInfo = {
      timestamp: new Date().toISOString(),
      currentUrl: page.url(),
      pageTitle: await page.title(),
      error: error.message
    };

    await page.screenshot({ path: 'login-failure.png' });
    
    await test.info().attach('Login Failure Screenshot', {
      contentType: 'image/png',
      path: 'login-failure.png'
    });
    
    await test.info().attach('Debug Information', {
      contentType: 'application/json',
      body: JSON.stringify(debugInfo, null, 2)
    });
    
    throw error;
  }
});
```

## Test Info and Metadata

### Adding Test Metadata

#### Basic Metadata
```javascript
test('should login successfully', async ({ page }) => {
  test.info().annotations.push(
    { type: 'test-description', description: 'Verify basic login functionality' },
    { type: 'test-category', description: 'Authentication' },
    { type: 'test-priority', description: 'Critical' },
    { type: 'test-environment', description: 'Staging' }
  );
  
  // Test implementation
});
```

#### Custom Metadata
```javascript
test('should login successfully', async ({ page }) => {
  test.info().annotations.push(
    { type: 'test-owner', description: 'John Doe' },
    { type: 'test-jira', description: 'LOGIN-123' },
    { type: 'test-component', description: 'Authentication' },
    { type: 'test-risk', description: 'High' },
    { type: 'test-version', description: '1.0.0' }
  );
  
  // Test implementation
});
```

### Reusable Metadata

#### Create Metadata Sets
```javascript
const criticalTestMetadata = [
  { type: 'test-priority', description: 'Critical' },
  { type: 'test-category', description: 'Authentication' },
  { type: 'test-environment', description: 'Staging' }
];

const performanceTestMetadata = [
  { type: 'test-priority', description: 'Medium' },
  { type: 'test-category', description: 'Performance' },
  { type: 'test-environment', description: 'Staging' }
];

// Use in tests
test('critical login test', async ({ page }) => {
  test.info().annotations.push(...criticalTestMetadata);
  // Test implementation
});
```

#### Metadata Helper Functions
```javascript
const addTestMetadata = (description, category, priority, environment = 'Staging') => {
  test.info().annotations.push(
    { type: 'test-description', description },
    { type: 'test-category', description: category },
    { type: 'test-priority', description: priority },
    { type: 'test-environment', description: environment }
  );
};

// Use in tests
test('login test', async ({ page }) => {
  addTestMetadata('Verify login functionality', 'Authentication', 'Critical');
  // Test implementation
});
```

## Attachments

### Screenshot Attachments

#### Basic Screenshot
```javascript
await page.screenshot({ path: 'login-page.png' });
await test.info().attach('Login Page', {
  contentType: 'image/png',
  path: 'login-page.png'
});
```

#### Timestamped Screenshots
```javascript
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const filename = `login-page-${timestamp}.png`;

await page.screenshot({ path: filename });
await test.info().attach('Login Page', {
  contentType: 'image/png',
  path: filename
});
```

#### Screenshot Helper Function
```javascript
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

// Use in tests
await test.step('Capture login page', async () => {
  await attachScreenshot(page, 'Login Page');
});
```

### Data Attachments

#### JSON Data
```javascript
const testData = {
  email: 'rollinivi4+test@gmail.com',
  password: 'User@123',
  timestamp: new Date().toISOString()
};

await test.info().attach('Test Data', {
  contentType: 'application/json',
  body: JSON.stringify(testData, null, 2)
});
```

#### Text Data
```javascript
const logData = [
  'Test started at: 2024-01-01T10:00:00Z',
  'Navigated to login page',
  'Filled email field',
  'Filled password field',
  'Clicked submit button',
  'Test completed at: 2024-01-01T10:01:00Z'
].join('\n');

await test.info().attach('Test Log', {
  contentType: 'text/plain',
  body: logData
});
```

#### HTML Content
```javascript
const pageContent = await page.content();
await test.info().attach('Page HTML', {
  contentType: 'text/html',
  body: pageContent
});
```

### Performance Data Attachments

```javascript
const performanceData = {
  pageLoadTime: 1500,
  elementVisibilityTime: 200,
  formSubmissionTime: 3000,
  totalTestTime: 4700
};

await test.info().attach('Performance Metrics', {
  contentType: 'application/json',
  body: JSON.stringify(performanceData, null, 2)
});
```

## Error Handling

### Basic Error Handling

```javascript
await test.step('Verify login success', async () => {
  try {
    await expect(page).toHaveURL(/lobby/);
  } catch (error) {
    await page.screenshot({ path: 'login-failure.png' });
    await test.info().attach('Login Failure', {
      contentType: 'image/png',
      path: 'login-failure.png'
    });
    throw error;
  }
});
```

### Advanced Error Handling

```javascript
await test.step('Verify login success', async () => {
  try {
    await expect(page).toHaveURL(/lobby/);
  } catch (error) {
    // Capture comprehensive debugging information
    const debugInfo = {
      timestamp: new Date().toISOString(),
      currentUrl: page.url(),
      pageTitle: await page.title(),
      viewportSize: page.viewportSize(),
      userAgent: await page.evaluate(() => navigator.userAgent),
      error: error.message,
      stack: error.stack
    };

    // Take multiple screenshots
    await page.screenshot({ path: 'login-failure-full.png', fullPage: true });
    await page.screenshot({ path: 'login-failure-viewport.png' });

    // Attach debugging information
    await test.info().attach('Debug Information', {
      contentType: 'application/json',
      body: JSON.stringify(debugInfo, null, 2)
    });

    await test.info().attach('Full Page Screenshot', {
      contentType: 'image/png',
      path: 'login-failure-full.png'
    });

    await test.info().attach('Viewport Screenshot', {
      contentType: 'image/png',
      path: 'login-failure-viewport.png'
    });

    throw error;
  }
});
```

### Network Error Handling

```javascript
await test.step('Handle network errors', async () => {
  try {
    await page.goto('https://stagingaz.ezscm.ai/', { timeout: 5000 });
  } catch (error) {
    const networkError = {
      timestamp: new Date().toISOString(),
      error: error.message,
      url: 'https://stagingaz.ezscm.ai/',
      timeout: 5000
    };

    await test.info().attach('Network Error', {
      contentType: 'application/json',
      body: JSON.stringify(networkError, null, 2)
    });

    throw error;
  }
});
```

## Best Practices

### 1. Step Organization

#### Keep Steps Focused
```javascript
// Good: Each step has a single responsibility
await test.step('Navigate to login page', async () => {
  await page.goto('https://stagingaz.ezscm.ai/');
});

await test.step('Fill email field', async () => {
  await page.fill('#email', 'rollinivi4+test@gmail.com');
});

// Bad: Step does too many things
await test.step('Do login', async () => {
  await page.goto('https://stagingaz.ezscm.ai/');
  await page.fill('#email', 'rollinivi4+test@gmail.com');
  await page.fill('#password', 'User@123');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);
  await expect(page).toHaveURL(/lobby/);
});
```

#### Use Descriptive Step Names
```javascript
// Good: Clear and descriptive
await test.step('Navigate to login page', async () => {});
await test.step('Fill email field with valid email', async () => {});
await test.step('Submit login form and wait for navigation', async () => {});

// Bad: Vague or unclear
await test.step('Go to page', async () => {});
await test.step('Fill form', async () => {});
await test.step('Submit', async () => {});
```

### 2. Metadata Management

#### Consistent Annotation Types
```javascript
// Define standard annotation types
const ANNOTATION_TYPES = {
  DESCRIPTION: 'test-description',
  CATEGORY: 'test-category',
  PRIORITY: 'test-priority',
  ENVIRONMENT: 'test-environment',
  OWNER: 'test-owner',
  JIRA: 'test-jira'
};

// Use consistently
test.info().annotations.push(
  { type: ANNOTATION_TYPES.DESCRIPTION, description: 'Verify login functionality' },
  { type: ANNOTATION_TYPES.CATEGORY, description: 'Authentication' },
  { type: ANNOTATION_TYPES.PRIORITY, description: 'Critical' }
);
```

#### Reusable Metadata Sets
```javascript
const metadataSets = {
  critical: [
    { type: 'test-priority', description: 'Critical' },
    { type: 'test-category', description: 'Authentication' }
  ],
  performance: [
    { type: 'test-priority', description: 'Medium' },
    { type: 'test-category', description: 'Performance' }
  ],
  regression: [
    { type: 'test-priority', description: 'High' },
    { type: 'test-category', description: 'Regression' }
  ]
};

// Use in tests
test('critical login test', async ({ page }) => {
  test.info().annotations.push(...metadataSets.critical);
  // Test implementation
});
```

### 3. Attachment Management

#### Consistent Naming
```javascript
const generateFilename = (name, extension = 'png') => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  return `${name}-${timestamp}.${extension}`;
};

// Use consistently
const filename = generateFilename('login-page');
await page.screenshot({ path: filename });
```

#### Attachment Helper Functions
```javascript
const attachScreenshot = async (page, name, options = {}) => {
  const filename = generateFilename(name);
  await page.screenshot({ path: filename, ...options });
  
  await test.info().attach(name, {
    contentType: 'image/png',
    path: filename
  });
  
  return filename;
};

const attachData = async (data, name, contentType = 'application/json') => {
  await test.info().attach(name, {
    contentType,
    body: typeof data === 'string' ? data : JSON.stringify(data, null, 2)
  });
};
```

### 4. Error Handling

#### Consistent Error Handling
```javascript
const handleStepError = async (page, stepName, error) => {
  const debugInfo = {
    step: stepName,
    timestamp: new Date().toISOString(),
    currentUrl: page.url(),
    error: error.message
  };

  await page.screenshot({ path: `${stepName}-error.png` });
  
  await test.info().attach(`${stepName} Error Screenshot`, {
    contentType: 'image/png',
    path: `${stepName}-error.png`
  });

  await test.info().attach(`${stepName} Debug Info`, {
    contentType: 'application/json',
    body: JSON.stringify(debugInfo, null, 2)
  });

  throw error;
};

// Use in steps
await test.step('Verify login success', async () => {
  try {
    await expect(page).toHaveURL(/lobby/);
  } catch (error) {
    await handleStepError(page, 'Verify login success', error);
  }
});
```

## Advanced Usage

### 1. Dynamic Annotations

```javascript
test('should login with different user types', async ({ page }, testInfo) => {
  const userTypes = ['admin', 'user', 'guest'];
  
  for (const userType of userTypes) {
    testInfo.annotations.push({
      type: 'test-user-type',
      description: userType
    });
    
    // Test implementation for each user type
  }
});
```

### 2. Conditional Annotations

```javascript
test('should handle different environments', async ({ page }, testInfo) => {
  const environment = process.env.TEST_ENV || 'staging';
  
  testInfo.annotations.push({
    type: 'test-environment',
    description: environment
  });
  
  if (environment === 'production') {
    testInfo.annotations.push({
      type: 'test-warning',
      description: 'Running in production environment'
    });
  }
});
```

### 3. Performance Monitoring

```javascript
test('should monitor login performance', async ({ page }) => {
  const performanceMetrics = {};
  
  await test.step('Measure page load time', async () => {
    const startTime = Date.now();
    await page.goto('https://stagingaz.ezscm.ai/');
    performanceMetrics.pageLoadTime = Date.now() - startTime;
  });
  
  await test.step('Measure form filling time', async () => {
    const startTime = Date.now();
    await page.fill('#email', 'rollinivi4+test@gmail.com');
    await page.fill('#password', 'User@123');
    performanceMetrics.formFillingTime = Date.now() - startTime;
  });
  
  await test.step('Measure login time', async () => {
    const startTime = Date.now();
    await page.click('button[type="submit"]');
    await page.waitForURL(/lobby/);
    performanceMetrics.loginTime = Date.now() - startTime;
  });
  
  await test.info().attach('Performance Metrics', {
    contentType: 'application/json',
    body: JSON.stringify(performanceMetrics, null, 2)
  });
});
```

### 4. Data-Driven Testing with Annotations

```javascript
const testData = [
  { email: 'user1@example.com', password: 'pass1', role: 'admin' },
  { email: 'user2@example.com', password: 'pass2', role: 'user' },
  { email: 'user3@example.com', password: 'pass3', role: 'guest' }
];

for (const data of testData) {
  test(`should login as ${data.role}`, async ({ page }, testInfo) => {
    testInfo.annotations.push(
      { type: 'test-role', description: data.role },
      { type: 'test-email', description: data.email }
    );
    
    // Test implementation
  });
}
```

## Configuration

### 1. Reporter Configuration

```javascript
// playwright.config.js
export default defineConfig({
  testDir: './login',
  reporter: [
    ['html', { 
      outputFolder: 'playwright-report',
      open: 'never'
    }],
    ['json', { 
      outputFile: 'test-results.json' 
    }],
    ['junit', { 
      outputFile: 'test-results.xml' 
    }]
  ],
  // ... other config
});
```

### 2. Global Annotations

```javascript
// global-setup.js
import { test } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  testInfo.annotations.push(
    { type: 'test-environment', description: 'Staging' },
    { type: 'test-version', description: '1.0.0' },
    { type: 'test-browser', description: 'Chrome' }
  );
});
```

### 3. Custom Annotation Types

```javascript
// annotation-types.js
export const ANNOTATION_TYPES = {
  DESCRIPTION: 'test-description',
  CATEGORY: 'test-category',
  PRIORITY: 'test-priority',
  ENVIRONMENT: 'test-environment',
  OWNER: 'test-owner',
  JIRA: 'test-jira',
  COMPONENT: 'test-component',
  RISK: 'test-risk',
  VERSION: 'test-version',
  BROWSER: 'test-browser',
  DATA: 'test-data',
  EXPECTED: 'test-expected',
  THRESHOLD: 'test-threshold',
  WARNING: 'test-warning'
};

export const createAnnotation = (type, description) => ({
  type,
  description
});
```

## Troubleshooting

### Common Issues

#### 1. Steps Not Showing in Report

**Problem**: Steps don't appear in the HTML report.

**Solutions**:
- Ensure you're using the HTML reporter
- Check that steps are properly awaited
- Verify step names are descriptive
- Make sure you're not using `test.only()` or `test.skip()`

#### 2. Attachments Not Appearing

**Problem**: Attachments don't show up in the report.

**Solutions**:
- Check file paths are correct and files exist
- Ensure content type is properly set
- Verify files are created before attachment
- Check file permissions

#### 3. Annotations Not Displaying

**Problem**: Annotations don't appear in the report.

**Solutions**:
- Check annotation format is correct
- Ensure annotations are added before test execution
- Verify reporter supports annotations
- Check for typos in annotation types

#### 4. Performance Issues

**Problem**: Tests run slowly with many annotations.

**Solutions**:
- Limit the number of screenshots
- Use conditional annotations
- Optimize attachment sizes
- Consider using `test.skip()` for non-critical annotations

### Debug Tips

#### 1. Use Console Logging

```javascript
await test.step('Debug step', async () => {
  console.log('Current URL:', page.url());
  console.log('Page title:', await page.title());
  console.log('Viewport size:', page.viewportSize());
});
```

#### 2. Add Timing Information

```javascript
await test.step('Timed operation', async () => {
  const start = Date.now();
  // Your operation
  const duration = Date.now() - start;
  console.log(`Operation took ${duration}ms`);
  
  await test.info().attach('Timing Info', {
    contentType: 'text/plain',
    body: `Operation completed in ${duration}ms`
  });
});
```

#### 3. Capture Page State

```javascript
await test.step('Capture page state', async () => {
  const pageState = {
    url: page.url(),
    title: await page.title(),
    viewport: page.viewportSize(),
    timestamp: new Date().toISOString()
  };
  
  await test.info().attach('Page State', {
    contentType: 'application/json',
    body: JSON.stringify(pageState, null, 2)
  });
});
```

### Best Practices Summary

1. **Use descriptive step names** that clearly indicate what each step does
2. **Keep steps focused** on a single responsibility
3. **Add meaningful metadata** to help with test organization and reporting
4. **Use attachments strategically** for debugging and documentation
5. **Handle errors gracefully** with proper debugging information
6. **Be consistent** with annotation types and naming conventions
7. **Optimize performance** by limiting unnecessary attachments
8. **Use helper functions** to reduce code duplication
9. **Test your annotations** to ensure they work as expected
10. **Document your annotation strategy** for team consistency

---

**Last Updated**: 2024
**Version**: 1.0.0
**Maintainer**: Test Automation Team
