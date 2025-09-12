# Playwright Hooks Documentation

This folder contains reusable hook functions that help organize and maintain your Playwright tests. Hooks allow you to avoid code duplication and make your tests more maintainable.

## 📁 File Structure

```
hooks/
├── README.md                 # This documentation file
├── login-hooks.js           # Login-related functionality
├── keyboard-hooks.js        # Keyboard actions and interactions
└── common-hooks.js          # Common utilities and helpers
```

## 🔧 Available Hooks

### 1. Login Hooks (`login-hooks.js`)

#### `loginToWebsite(page, email, password)`
- **Purpose**: Login to the ezSCM website using form filling
- **Parameters**: 
  - `page`: Playwright page object
  - `email`: Email address (default: 'rollinivi4+test@gmail.com')
  - `password`: Password (default: 'User@123')
- **Usage**: `await loginToWebsite(page);`

#### `loginWithKeyboard(page, email, password)`
- **Purpose**: Login using only keyboard actions (no mouse clicks)
- **Parameters**: Same as `loginToWebsite`
- **Usage**: `await loginWithKeyboard(page);`

#### `navigateToSalesOrders(page)`
- **Purpose**: Navigate to the Sales Orders page
- **Parameters**: `page`: Playwright page object
- **Usage**: `await navigateToSalesOrders(page);`

#### `waitForSearchInput(page, xpath)`
- **Purpose**: Wait for search input to be ready
- **Parameters**: 
  - `page`: Playwright page object
  - `xpath`: XPath selector (default: search input XPath)
- **Returns**: Search input locator
- **Usage**: `const searchInput = await waitForSearchInput(page);`

### 2. Keyboard Hooks (`keyboard-hooks.js`)

#### `searchOrderWithKeyboard(page, searchInput, orderNumber, takeScreenshot)`
- **Purpose**: Search for an order number using keyboard actions
- **Parameters**:
  - `page`: Playwright page object
  - `searchInput`: Search input locator
  - `orderNumber`: Order number to search for
  - `takeScreenshot`: Whether to take screenshots (default: true)
- **Usage**: `await searchOrderWithKeyboard(page, searchInput, '700107');`

#### `clearSearchInput(page, searchInput, method)`
- **Purpose**: Clear search input using different keyboard methods
- **Parameters**:
  - `page`: Playwright page object
  - `searchInput`: Search input locator
  - `method`: 'ctrl-a-delete', 'ctrl-a-backspace', or 'backspace'
- **Usage**: `await clearSearchInput(page, searchInput, 'ctrl-a-delete');`

#### `testTabNavigation(page, searchInput)`
- **Purpose**: Test Tab and Shift+Tab navigation
- **Usage**: `await testTabNavigation(page, searchInput);`

#### `typeWithDelay(searchInput, text, delay)`
- **Purpose**: Type text with delay between characters
- **Parameters**:
  - `searchInput`: Search input locator
  - `text`: Text to type
  - `delay`: Delay in milliseconds (default: 100)
- **Usage**: `await typeWithDelay(searchInput, '700107', 150);`

#### `testKeyboardShortcuts(page, searchInput)`
- **Purpose**: Test common keyboard shortcuts (Ctrl+A, Ctrl+C, etc.)
- **Usage**: `await testKeyboardShortcuts(page, searchInput);`

#### `testArrowKeyNavigation(page, searchInput)`
- **Purpose**: Test arrow key navigation (Home, End, Left, Right)
- **Usage**: `await testArrowKeyNavigation(page, searchInput);`

### 3. Common Hooks (`common-hooks.js`)

#### `setupErrorListeners(page)`
- **Purpose**: Set up console and network error listeners
- **Returns**: Object with error arrays and cleanup function
- **Usage**: `const errorData = await setupErrorListeners(page);`

#### `takeTimestampedScreenshot(page, name, folder)`
- **Purpose**: Take screenshot with timestamp
- **Parameters**:
  - `page`: Playwright page object
  - `name`: Screenshot name
  - `folder`: Folder to save in (default: 'screenshots')
- **Usage**: `await takeTimestampedScreenshot(page, 'test-result');`

#### `waitForElementWithRetry(page, selector, timeout, retries)`
- **Purpose**: Wait for element with retry logic
- **Parameters**:
  - `page`: Playwright page object
  - `selector`: CSS selector or XPath
  - `timeout`: Timeout in milliseconds (default: 10000)
  - `retries`: Number of retries (default: 3)
- **Usage**: `await waitForElementWithRetry(page, '#myElement');`

#### `setTestTimeout(test, timeout)`
- **Purpose**: Set test timeout
- **Parameters**:
  - `test`: Test object
  - `timeout`: Timeout in milliseconds (default: 120000)
- **Usage**: `setTestTimeout(test, 60000);`

#### `logTestInfo(testName, description)`
- **Purpose**: Log test information with formatting
- **Usage**: `logTestInfo('My Test', 'Testing something important');`

#### `logTestCompletion(testName, passed)`
- **Purpose**: Log test completion status
- **Usage**: `logTestCompletion('My Test', true);`

#### `getTestOrderNumbers()`
- **Purpose**: Get array of test order numbers
- **Returns**: Array of order numbers
- **Usage**: `const orders = getTestOrderNumbers();`

#### `generateTestData(type)`
- **Purpose**: Generate random test data
- **Parameters**: `type`: 'email', 'order', 'name', or other
- **Usage**: `const email = generateTestData('email');`

#### `cleanupTestFiles(filePaths)`
- **Purpose**: Clean up test files
- **Parameters**: Array of file paths
- **Usage**: `await cleanupTestFiles(['file1.png', 'file2.png']);`

## 🚀 How to Use Hooks in Your Tests

### 1. Import the Hooks
```javascript
const { loginWithKeyboard, navigateToSalesOrders } = require('../hooks/login-hooks');
const { searchOrderWithKeyboard, clearSearchInput } = require('../hooks/keyboard-hooks');
const { setupErrorListeners, takeTimestampedScreenshot } = require('../hooks/common-hooks');
```

### 2. Use in beforeEach Hook
```javascript
test.beforeEach(async ({ page }) => {
  // Set up error listeners
  await setupErrorListeners(page);
  
  // Login and navigate
  await loginWithKeyboard(page);
  await navigateToSalesOrders(page);
  
  // Wait for search input
  const searchInput = await waitForSearchInput(page);
});
```

### 3. Use in Your Tests
```javascript
test('My test', async ({ page }) => {
  const searchInput = page.locator("//input[@id='salesOrder_salesOrders_searchInput']");
  
  // Search for an order
  await searchOrderWithKeyboard(page, searchInput, '700107');
  
  // Clear and search for another
  await clearSearchInput(page, searchInput, 'ctrl-a-delete');
  await searchOrderWithKeyboard(page, searchInput, '700106');
});
```

### 4. Use in afterEach Hook
```javascript
test.afterEach(async ({ page }) => {
  // Take final screenshot
  await takeTimestampedScreenshot(page, 'test-result');
  
  // Clean up files if needed
  await cleanupTestFiles(['screenshot1.png', 'screenshot2.png']);
});
```

## 📋 Example Test Structure

```javascript
const { test, expect } = require('@playwright/test');
const { loginWithKeyboard, navigateToSalesOrders } = require('../hooks/login-hooks');
const { searchOrderWithKeyboard } = require('../hooks/keyboard-hooks');
const { setupErrorListeners, takeTimestampedScreenshot } = require('../hooks/common-hooks');

test.describe('My Test Suite', () => {
  
  test.beforeEach(async ({ page }) => {
    await setupErrorListeners(page);
    await loginWithKeyboard(page);
    await navigateToSalesOrders(page);
  });
  
  test.afterEach(async ({ page }) => {
    await takeTimestampedScreenshot(page, 'test-result');
  });
  
  test('My test', async ({ page }) => {
    const searchInput = page.locator("//input[@id='salesOrder_salesOrders_searchInput']");
    await searchOrderWithKeyboard(page, searchInput, '700107');
    
    expect(true).toBe(true);
  });
});
```

## 🎯 Benefits of Using Hooks

1. **DRY Principle**: Don't Repeat Yourself - reuse code across tests
2. **Maintainability**: Change logic in one place, affects all tests
3. **Consistency**: All tests use the same setup and cleanup
4. **Readability**: Tests focus on the actual test logic, not setup
5. **Reliability**: Proper setup and cleanup for each test
6. **Organization**: Related functionality grouped together
7. **Reusability**: Use hooks across different test files

## 🔄 Hook Execution Order

When using multiple hooks, they execute in this order:

1. `test.beforeAll()` (once, before all tests)
2. `test.beforeEach()` (before each test)
3. **Your test runs**
4. `test.afterEach()` (after each test)
5. `test.afterAll()` (once, after all tests)

## 📝 Best Practices

1. **Keep hooks focused**: Each hook should have a single responsibility
2. **Use descriptive names**: Make it clear what each hook does
3. **Handle errors**: Include proper error handling in hooks
4. **Document parameters**: Clearly document what each parameter does
5. **Return useful data**: Return locators or data that tests might need
6. **Clean up resources**: Always clean up in afterEach hooks
7. **Use constants**: Define common values as constants
8. **Test your hooks**: Make sure hooks work correctly before using them

## 🐛 Troubleshooting

### Common Issues

1. **Import errors**: Make sure the path to hooks is correct
2. **Timeout issues**: Increase timeout in hooks if needed
3. **Element not found**: Add proper waits in hooks
4. **Cleanup issues**: Make sure afterEach hooks clean up properly

### Debug Tips

1. Add console.log statements in hooks to see execution flow
2. Use `takeTimestampedScreenshot` to see what's happening
3. Check error listeners for console and network errors
4. Use `waitForElementWithRetry` for flaky elements

## 📚 Related Files

- `../keyboard_actions/search-order-keyboard-test-with-hooks.spec.js` - Example test using hooks
- `../keyboard_actions/search-order-keyboard-test.spec.js` - Original test without hooks
- `playwright.config.js` - Playwright configuration

## 🤝 Contributing

When adding new hooks:

1. Follow the existing naming conventions
2. Add proper JSDoc comments
3. Include error handling
4. Update this README
5. Test the hooks thoroughly
6. Keep hooks focused and reusable
