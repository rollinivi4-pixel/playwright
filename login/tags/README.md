# Playwright Test Tags - Login Page Testing

## Overview

This directory contains a comprehensive tagging system for Playwright tests focused on login page functionality. The tagging system allows you to organize, categorize, and execute tests based on various criteria such as priority, test type, environment, browser, and more.

## Table of Contents

- [Quick Start](#quick-start)
- [Tag Categories](#tag-categories)
- [Usage Examples](#usage-examples)
- [Running Tagged Tests](#running-tagged-tests)
- [Best Practices](#best-practices)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## Quick Start

### 1. Basic Tag Usage

```javascript
import { test, expect } from '@playwright/test';

test('should login with valid credentials', { tag: '@critical @smoke @positive @fast' }, async ({ page }) => {
  await page.goto('https://stagingaz.ezscm.ai/');
  await page.fill('#email', 'rollinivi4+test@gmail.com');
  await page.fill('#password', 'User@123');
  await page.click('button[type="submit"]');
  
  await page.waitForTimeout(3000);
  await expect(page).toHaveURL(/lobby/);
});
```

### 2. Running Tagged Tests

```bash
# Run critical tests only
npx playwright test --grep "@critical"

# Run smoke tests
npx playwright test --grep "@smoke"

# Run tests with multiple tags
npx playwright test --grep "@critical|@smoke"

# Exclude flaky tests
npx playwright test --grep "@flaky" --grep-invert
```

## Tag Categories

### Priority Tags
- `@critical` - Essential tests that must pass for basic functionality
- `@high` - Important tests for user experience
- `@medium` - Enhanced functionality tests
- `@low` - Optional tests for comprehensive coverage

### Test Type Tags
- `@smoke` - Quick validation tests
- `@regression` - Tests to prevent previously fixed bugs
- `@integration` - Multi-component interaction tests
- `@unit` - Individual component tests

### Environment Tags
- `@staging` - Staging environment specific tests
- `@production` - Production environment tests
- `@local` - Local development environment tests

### Browser Tags
- `@chrome` - Chrome browser specific tests
- `@firefox` - Firefox browser specific tests
- `@safari` - Safari browser specific tests
- `@mobile` - Mobile browser tests

### Feature Tags
- `@authentication` - User authentication tests
- `@validation` - Form validation tests
- `@ui` - User interface tests
- `@security` - Security-related tests
- `@accessibility` - Accessibility compliance tests

### Performance Tags
- `@performance` - Performance-related tests
- `@load` - Load testing scenarios

### Data Tags
- `@positive` - Tests with valid, expected data
- `@negative` - Tests with invalid, unexpected data
- `@boundary` - Boundary value condition tests

### User Role Tags
- `@admin` - Administrator user role tests
- `@user` - Regular user role tests
- `@guest` - Guest/unauthenticated user tests

### Maintenance Tags
- `@flaky` - Tests known to be unstable
- `@skip` - Tests that should be skipped
- `@fixme` - Tests that need to be fixed

### Execution Tags
- `@slow` - Tests that take a long time to execute
- `@fast` - Tests that execute quickly
- `@parallel` - Tests that can run in parallel
- `@serial` - Tests that must run sequentially

## Usage Examples

### 1. Basic Login Test with Tags

```javascript
test('should login with valid credentials', { 
  tag: '@critical @smoke @positive @fast @authentication' 
}, async ({ page }) => {
  await page.goto('https://stagingaz.ezscm.ai/');
  await page.fill('#email', 'rollinivi4+test@gmail.com');
  await page.fill('#password', 'User@123');
  await page.click('button[type="submit"]');
  
  await page.waitForTimeout(3000);
  await expect(page).toHaveURL(/lobby/);
});
```

### 2. Validation Test with Tags

```javascript
test('should validate email format', { 
  tag: '@high @validation @negative @ui @boundary' 
}, async ({ page }) => {
  await page.goto('https://stagingaz.ezscm.ai/');
  
  const invalidEmails = ['invalid-email', '@domain.com', 'user@'];
  
  for (const email of invalidEmails) {
    await page.fill('#email', email);
    await page.fill('#password', 'User@123');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL(/stagingaz\.ezscm\.ai/);
    
    await page.fill('#email', '');
    await page.fill('#password', '');
  }
});
```

### 3. Security Test with Tags

```javascript
test('should mask password input', { 
  tag: '@high @security @ui @positive' 
}, async ({ page }) => {
  await page.goto('https://stagingaz.ezscm.ai/');
  
  const passwordField = page.locator('#password');
  await passwordField.fill('User@123');
  
  await expect(passwordField).toHaveAttribute('type', 'password');
  
  const pageContent = await page.content();
  expect(pageContent).not.toContain('User@123');
});
```

### 4. Accessibility Test with Tags

```javascript
test('should support keyboard navigation', { 
  tag: '@medium @accessibility @ui @positive' 
}, async ({ page }) => {
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
});
```

### 5. Performance Test with Tags

```javascript
test('should load login page within acceptable time', { 
  tag: '@medium @performance @positive @fast' 
}, async ({ page }) => {
  const startTime = Date.now();
  
  await page.goto('https://stagingaz.ezscm.ai/');
  
  const loadTime = Date.now() - startTime;
  expect(loadTime).toBeLessThan(5000);
  
  await expect(page.locator('#email')).toBeVisible();
  await expect(page.locator('#password')).toBeVisible();
});
```

## Running Tagged Tests

### Command Line Examples

```bash
# Run all critical tests
npx playwright test --grep "@critical"

# Run smoke tests only
npx playwright test --grep "@smoke"

# Run tests with multiple tags (OR condition)
npx playwright test --grep "@critical|@smoke"

# Run tests with specific tag combination (AND condition)
npx playwright test --grep "@critical.*@smoke"

# Exclude flaky tests
npx playwright test --grep "@flaky" --grep-invert

# Run tests for specific browser
npx playwright test --grep "@chrome"

# Run tests for specific environment
npx playwright test --grep "@staging"

# Run fast tests only
npx playwright test --grep "@fast"

# Run slow tests (for comprehensive testing)
npx playwright test --grep "@slow"
```

### Package.json Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "test:smoke": "playwright test --grep '@smoke'",
    "test:critical": "playwright test --grep '@critical'",
    "test:regression": "playwright test --grep '@regression'",
    "test:integration": "playwright test --grep '@integration'",
    "test:security": "playwright test --grep '@security'",
    "test:accessibility": "playwright test --grep '@accessibility'",
    "test:performance": "playwright test --grep '@performance'",
    "test:fast": "playwright test --grep '@fast'",
    "test:chrome": "playwright test --grep '@chrome'",
    "test:mobile": "playwright test --grep '@mobile'",
    "test:staging": "playwright test --grep '@staging'",
    "test:production": "playwright test --grep '@production'",
    "test:exclude-flaky": "playwright test --grep '@flaky' --grep-invert"
  }
}
```

### CI/CD Pipeline Examples

```yaml
# GitHub Actions example
name: Test Suite
on: [push, pull_request]

jobs:
  smoke-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run test:smoke

  critical-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run test:critical

  full-regression:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run test:regression
```

## Best Practices

### 1. Tag Selection Guidelines

- **Always include a priority tag** (@critical, @high, @medium, @low)
- **Include appropriate test type** (@smoke, @regression, @integration, @unit)
- **Add feature tags** (@authentication, @validation, @ui, @security)
- **Include data tags** (@positive, @negative, @boundary)
- **Add execution tags** (@fast, @slow, @parallel, @serial)

### 2. Common Tag Combinations

```javascript
// Smoke tests
{ tag: '@critical @smoke @positive @fast' }

// Regression tests
{ tag: '@high @regression @negative @ui' }

// Integration tests
{ tag: '@medium @integration @positive @slow' }

// Unit tests
{ tag: '@high @unit @positive @fast' }

// Security tests
{ tag: '@high @security @negative @ui' }

// Accessibility tests
{ tag: '@medium @accessibility @positive @ui' }

// Performance tests
{ tag: '@medium @performance @positive @slow' }
```

### 3. Tag Naming Conventions

- Use lowercase letters
- Use hyphens for multi-word tags
- Be descriptive and specific
- Keep tags concise but clear
- Use consistent naming across the project

### 4. Tag Maintenance

- Review tags regularly for relevance
- Update documentation when tags change
- Remove unused tags to avoid confusion
- Monitor tag usage across the test suite
- Ensure consistency in tag application

### 5. Test Organization

```javascript
// Group related tests with similar tags
test.describe('Login Validation Tests', () => {
  test('should validate email format', { tag: '@high @validation @negative @ui' }, async ({ page }) => {
    // Test implementation
  });

  test('should validate password strength', { tag: '@high @validation @negative @security' }, async ({ page }) => {
    // Test implementation
  });

  test('should require both fields', { tag: '@high @validation @negative @ui' }, async ({ page }) => {
    // Test implementation
  });
});
```

## Configuration

### Playwright Configuration

Update your `playwright.config.js` to support tag-based execution:

```javascript
// playwright.config.js
export default defineConfig({
  testDir: './login',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    trace: 'on-first-retry',
    headless: false,
    slowMo: 1000,
    video: 'on',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  // Global test configuration
  globalSetup: require.resolve('./global-setup.js'),
  globalTeardown: require.resolve('./global-teardown.js'),
});
```

### Environment Variables

Create a `.env` file for environment-specific configurations:

```bash
# .env
TEST_ENV=staging
BASE_URL=https://stagingaz.ezscm.ai/
TEST_USER_EMAIL=rollinivi4+test@gmail.com
TEST_USER_PASSWORD=User@123
ADMIN_USER_EMAIL=admin@example.com
ADMIN_USER_PASSWORD=Admin@123
```

### Test Data Configuration

Create a `test-data.json` file for test data management:

```json
{
  "users": {
    "valid": {
      "email": "rollinivi4+test@gmail.com",
      "password": "User@123"
    },
    "admin": {
      "email": "admin@example.com",
      "password": "Admin@123"
    },
    "invalid": {
      "email": "invalid@email.com",
      "password": "wrongpassword"
    }
  },
  "urls": {
    "staging": "https://stagingaz.ezscm.ai/",
    "production": "https://ezscm.ai/",
    "local": "http://localhost:3000/"
  }
}
```

## Troubleshooting

### Common Issues

#### 1. Tags Not Working

**Problem**: Tests with tags are not being filtered correctly.

**Solution**: 
- Check tag syntax (use `@tag` format)
- Verify grep pattern in command line
- Ensure tags are properly formatted in test files

#### 2. Multiple Tag Filtering

**Problem**: Want to run tests with multiple specific tags.

**Solution**: Use regex patterns:
```bash
# AND condition (tests must have both tags)
npx playwright test --grep "@critical.*@smoke"

# OR condition (tests with either tag)
npx playwright test --grep "@critical|@smoke"
```

#### 3. Excluding Tags

**Problem**: Want to exclude certain tags from test run.

**Solution**: Use `--grep-invert` flag:
```bash
# Exclude flaky tests
npx playwright test --grep "@flaky" --grep-invert

# Exclude slow tests
npx playwright test --grep "@slow" --grep-invert
```

#### 4. Tag Consistency

**Problem**: Inconsistent tag usage across tests.

**Solution**: 
- Create tag guidelines document
- Use code review to ensure consistency
- Implement automated tag validation

### Debugging Tips

1. **Check tag syntax**: Ensure tags start with `@` and use proper format
2. **Verify grep patterns**: Test grep patterns with simple examples first
3. **Check test files**: Ensure tags are properly added to test functions
4. **Monitor execution**: Use verbose output to see which tests are running
5. **Validate combinations**: Test tag combinations to ensure they work as expected

### Performance Considerations

1. **Tag filtering overhead**: Large test suites may have overhead with complex tag filtering
2. **Parallel execution**: Some tags may conflict with parallel execution
3. **Test isolation**: Ensure tagged tests don't interfere with each other
4. **Resource usage**: Monitor resource usage when running large tag combinations

## Contributing

### Adding New Tags

1. **Define the tag purpose** in `tag-categories.md`
2. **Add detailed description** in `tag-descriptions.md`
3. **Create examples** in `tag-examples.js`
4. **Update this README** with usage examples
5. **Train team members** on new tag usage

### Updating Existing Tags

1. **Update documentation** in relevant files
2. **Update examples** to reflect changes
3. **Notify team members** of changes
4. **Update test files** if needed
5. **Validate changes** with test runs

### Tag Review Process

1. **Code review**: Include tag usage in code reviews
2. **Documentation review**: Ensure documentation is up to date
3. **Consistency check**: Verify tag usage is consistent
4. **Performance impact**: Consider performance implications
5. **Team approval**: Get team approval for significant changes

## Additional Resources

- [Playwright Documentation](https://playwright.dev/docs/)
- [Test Tagging Best Practices](https://playwright.dev/docs/test-annotations)
- [Test Organization Guidelines](https://playwright.dev/docs/test-organization)
- [CI/CD Integration](https://playwright.dev/docs/ci)

## Support

For questions or issues with the tagging system:

1. Check this README for common solutions
2. Review the tag descriptions and examples
3. Consult the team documentation
4. Create an issue in the project repository
5. Contact the test automation team

---

**Last Updated**: 2024
**Version**: 1.0.0
**Maintainer**: Test Automation Team
