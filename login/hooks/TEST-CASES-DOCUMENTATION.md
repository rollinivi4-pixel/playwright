# Hooks Test Cases Documentation

This document provides comprehensive documentation for all test cases created for the hooks functionality.

## 📁 Test Files Overview

| File | Purpose | Test Count | Description |
|------|---------|------------|-------------|
| `hooks-test-suite.spec.js` | Complete Integration | 15 tests | Tests all hooks together in real scenarios |
| `common-hooks-tests.spec.js` | Common Utilities | 8 tests | Tests error monitoring, screenshots, data generation |
| `login-hooks-tests.spec.js` | Login Functionality | 12 tests | Tests login, navigation, and search input |
| `keyboard-hooks-tests.spec.js` | Keyboard Actions | 12 tests | Tests keyboard interactions and shortcuts |
| `run-hooks-tests.js` | Test Runner | - | Easy-to-use script to run different test suites |

## 🧪 Test Categories

### 1. Common Hooks Tests (`common-hooks-tests.spec.js`)

#### Test 1: Error Monitoring
- **Purpose**: Test `setupErrorListeners` functionality
- **What it tests**: Console errors, network errors, request monitoring
- **Screenshots**: `error-monitoring-test-{timestamp}.png`
- **Verification**: Page loads successfully, error data is collected

#### Test 2: Screenshot Functionality
- **Purpose**: Test `takeTimestampedScreenshot` functionality
- **What it tests**: Multiple screenshots with timestamps
- **Screenshots**: `screenshot-1-{timestamp}.png`, `screenshot-2-{timestamp}.png`, etc.
- **Verification**: Screenshots are created with unique timestamps

#### Test 3: Element Waiting with Retry
- **Purpose**: Test `waitForElementWithRetry` functionality
- **What it tests**: Waiting for elements with retry logic
- **Elements tested**: `#email`, `#password`, `button[type="submit"]`
- **Verification**: All elements are found and visible

#### Test 4: Test Data Generation
- **Purpose**: Test `generateTestData` functionality
- **What it tests**: Email, order, name, and other data generation
- **Data types**: email, order, name, other
- **Verification**: Generated data matches expected patterns

#### Test 5: Test Timeout Setting
- **Purpose**: Test `setTestTimeout` functionality
- **What it tests**: Setting custom test timeouts
- **Timeout**: 30 seconds
- **Verification**: Test completes within timeout

#### Test 6: File Cleanup
- **Purpose**: Test `cleanupTestFiles` functionality
- **What it tests**: Creating and cleaning up test files
- **Files**: `test-file-1.png`, `test-file-2.png`, `test-file-3.png`
- **Verification**: Files are created and cleaned up

#### Test 7: Error Handling
- **Purpose**: Test error handling with invalid selectors
- **What it tests**: Invalid selector handling, retry logic
- **Invalid selector**: `#invalid-selector`
- **Verification**: Invalid selector fails after retries, valid selector succeeds

#### Test 8: Multiple Screenshots
- **Purpose**: Test multiple screenshot naming patterns
- **What it tests**: Different naming patterns, unique timestamps
- **Patterns**: `login-page`, `form-elements`, `page-loaded`, `test-completion`
- **Verification**: All screenshots created with unique timestamps

### 2. Login Hooks Tests (`login-hooks-tests.spec.js`)

#### Test 1: Standard Login
- **Purpose**: Test `loginToWebsite` hook with default credentials
- **What it tests**: Standard login flow
- **Credentials**: Default (rollinivi4+test@gmail.com, User@123)
- **Screenshots**: `standard-login-success-{timestamp}.png`
- **Verification**: Login successful, page visible

#### Test 2: Custom Credentials
- **Purpose**: Test `loginToWebsite` hook with custom credentials
- **What it tests**: Login with custom email and password
- **Credentials**: Custom (rollinivi4+test@gmail.com, User@123)
- **Screenshots**: `custom-login-success-{timestamp}.png`
- **Verification**: Login successful with custom credentials

#### Test 3: Keyboard Login
- **Purpose**: Test `loginWithKeyboard` hook with default credentials
- **What it tests**: Login using only keyboard actions
- **Actions**: Type email, Tab, type password, Enter
- **Screenshots**: `keyboard-login-success-{timestamp}.png`
- **Verification**: Login successful using keyboard only

#### Test 4: Keyboard Login Custom
- **Purpose**: Test `loginWithKeyboard` hook with custom credentials
- **What it tests**: Keyboard login with custom credentials
- **Credentials**: Custom (rollinivi4+test@gmail.com, User@123)
- **Screenshots**: `custom-keyboard-login-success-{timestamp}.png`
- **Verification**: Keyboard login successful with custom credentials

#### Test 5: Sales Orders Navigation
- **Purpose**: Test `navigateToSalesOrders` hook
- **What it tests**: Navigation to Sales Orders page
- **Prerequisites**: Must be logged in
- **Screenshots**: `sales-orders-navigation-success-{timestamp}.png`
- **Verification**: Successfully navigated to Sales Orders page

#### Test 6: Search Input Waiting
- **Purpose**: Test `waitForSearchInput` hook
- **What it tests**: Waiting for search input to be ready
- **Prerequisites**: Must be on Sales Orders page
- **Screenshots**: `search-input-waiting-success-{timestamp}.png`
- **Verification**: Search input is visible and ready

#### Test 7: Custom XPath
- **Purpose**: Test `waitForSearchInput` hook with custom XPath
- **What it tests**: Waiting for search input with custom XPath
- **XPath**: `//input[@id='salesOrder_salesOrders_searchInput']`
- **Screenshots**: `custom-xpath-success-{timestamp}.png`
- **Verification**: Search input found with custom XPath

#### Test 8: Complete Login Flow
- **Purpose**: Test all login hooks in sequence
- **What it tests**: Standard login → Navigation → Search input waiting
- **Steps**: 3 steps with screenshots
- **Screenshots**: `step1-standard-login`, `step2-sales-orders`, `step3-search-input`
- **Verification**: All steps completed successfully

#### Test 9: Error Handling
- **Purpose**: Test error handling with invalid credentials
- **What it tests**: Login failure with invalid credentials
- **Credentials**: Invalid (invalid@email.com, wrongpassword)
- **Screenshots**: `invalid-credentials-error-{timestamp}.png`
- **Verification**: Login fails, stays on login page

#### Test 10: Performance Test
- **Purpose**: Test performance with multiple login attempts
- **What it tests**: Multiple login attempts and timing
- **Attempts**: 3 login attempts
- **Metrics**: Total time, average time per login
- **Screenshots**: `login-attempt-1`, `login-attempt-2`, `login-attempt-3`
- **Verification**: All attempts complete, performance metrics logged

#### Test 11: Cross-Browser Login
- **Purpose**: Test login hooks across different browser contexts
- **What it tests**: Login functionality in different browsers
- **Screenshots**: `cross-browser-standard-{timestamp}.png`
- **Verification**: Login works across different browsers

#### Test 12: Login State Verification
- **Purpose**: Test login state verification
- **What it tests**: Verifying successful login state
- **Checks**: Page visibility, URL verification
- **Screenshots**: `login-state-verification-{timestamp}.png`
- **Verification**: Login state confirmed, not on login page

### 3. Keyboard Hooks Tests (`keyboard-hooks-tests.spec.js`)

#### Test 1: Search Order
- **Purpose**: Test `searchOrderWithKeyboard` hook
- **What it tests**: Searching for order using keyboard
- **Order number**: 700107
- **Screenshots**: `search-order-results-{timestamp}.png`
- **Verification**: Search completed successfully

#### Test 2: Multiple Orders Search
- **Purpose**: Test searching for multiple orders
- **What it tests**: Searching for different order numbers
- **Order numbers**: 700107, 700106, 700104
- **Screenshots**: `search-order-700107`, `search-order-700106`, `search-order-700104`
- **Verification**: All searches completed successfully

#### Test 3: Clear Search Input
- **Purpose**: Test `clearSearchInput` hook with all methods
- **What it tests**: Different methods to clear search input
- **Methods**: ctrl-a-delete, ctrl-a-backspace, backspace
- **Screenshots**: `before-clear-{method}`, `after-clear-{method}`
- **Verification**: All clear methods work correctly

#### Test 4: Tab Navigation
- **Purpose**: Test `testTabNavigation` hook
- **What it tests**: Tab and Shift+Tab navigation
- **Actions**: Tab (move away), Shift+Tab (move back)
- **Screenshots**: `tab-navigation-test-{timestamp}.png`
- **Verification**: Tab navigation works correctly

#### Test 5: Type with Delay
- **Purpose**: Test `typeWithDelay` hook with different speeds
- **What it tests**: Typing with different delay speeds
- **Delays**: 50ms, 100ms, 200ms, 500ms
- **Text**: 700107
- **Screenshots**: `typing-delay-{delay}ms-{timestamp}.png`
- **Verification**: All delay speeds work correctly

#### Test 6: Keyboard Shortcuts
- **Purpose**: Test `testKeyboardShortcuts` hook
- **What it tests**: Common keyboard shortcuts
- **Shortcuts**: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+Z
- **Screenshots**: `keyboard-shortcuts-test-{timestamp}.png`
- **Verification**: All shortcuts work correctly

#### Test 7: Arrow Key Navigation
- **Purpose**: Test `testArrowKeyNavigation` hook
- **What it tests**: Arrow key navigation
- **Keys**: Home, End, Left Arrow, Right Arrow
- **Screenshots**: `arrow-key-navigation-test-{timestamp}.png`
- **Verification**: All arrow keys work correctly

#### Test 8: Complete Keyboard Workflow
- **Purpose**: Test all keyboard hooks in sequence
- **What it tests**: Complete keyboard workflow
- **Steps**: Search → Clear → Tab → Type → Shortcuts → Arrows
- **Screenshots**: `step1-search-order`, `step2-clear-search`, etc.
- **Verification**: All keyboard actions work in sequence

#### Test 9: Error Handling
- **Purpose**: Test error handling with invalid search
- **What it tests**: Searching with invalid order number
- **Invalid order**: invalid123
- **Screenshots**: `invalid-search-error-{timestamp}.png`
- **Verification**: Error handling works correctly

#### Test 10: Performance Test
- **Purpose**: Test performance with rapid keyboard actions
- **What it tests**: Rapid keyboard actions and timing
- **Actions**: 5 rapid action cycles
- **Metrics**: Total time, average time per action
- **Screenshots**: `rapid-actions-performance-{timestamp}.png`
- **Verification**: Performance metrics logged

#### Test 11: Accessibility Test
- **Purpose**: Test keyboard accessibility
- **What it tests**: Full keyboard navigation flow
- **Actions**: Search, clear, shortcuts, arrows, tab navigation
- **Screenshots**: `keyboard-accessibility-{timestamp}.png`
- **Verification**: Full keyboard accessibility confirmed

#### Test 12: Cross-Browser Keyboard Test
- **Purpose**: Test keyboard hooks across different browsers
- **What it tests**: Keyboard functionality in different browsers
- **Screenshots**: `cross-browser-keyboard-{timestamp}.png`
- **Verification**: Keyboard hooks work across browsers

### 4. Integration Tests (`hooks-test-suite.spec.js`)

#### Test 1: Error Monitoring and Screenshots
- **Purpose**: Test error monitoring and screenshot functionality
- **What it tests**: Error listeners, screenshot taking
- **Screenshots**: `initial-page-{timestamp}.png`, `page-loaded-{timestamp}.png`
- **Verification**: Error monitoring works, screenshots taken

#### Test 2: Element Waiting with Retry
- **Purpose**: Test element waiting with retry logic
- **What it tests**: Waiting for multiple elements with retry
- **Elements**: #email, #password, button[type="submit"]
- **Verification**: All elements found with retry logic

#### Test 3: Test Data Generation
- **Purpose**: Test test data generation functionality
- **What it tests**: Generating different types of test data
- **Data types**: email, order, name, other
- **Verification**: All data types generated correctly

#### Test 4: Standard Login Flow
- **Purpose**: Test standard login flow
- **What it tests**: Complete login process
- **Screenshots**: `after-login-{timestamp}.png`
- **Verification**: Login successful

#### Test 5: Keyboard Login Flow
- **Purpose**: Test keyboard login flow
- **What it tests**: Login using keyboard only
- **Screenshots**: `after-keyboard-login-{timestamp}.png`
- **Verification**: Keyboard login successful

#### Test 6: Sales Orders Navigation
- **Purpose**: Test navigation to Sales Orders
- **What it tests**: Complete navigation flow
- **Screenshots**: `sales-orders-page-{timestamp}.png`
- **Verification**: Navigation successful

#### Test 7: Search Input Waiting
- **Purpose**: Test search input waiting
- **What it tests**: Waiting for search input
- **Screenshots**: `search-input-ready-{timestamp}.png`
- **Verification**: Search input ready

#### Test 8: Search Order with Keyboard
- **Purpose**: Test keyboard search functionality
- **What it tests**: Searching for order using keyboard
- **Order**: 700107
- **Screenshots**: `search-results-{timestamp}.png`
- **Verification**: Search successful

#### Test 9: Clear Search Input Methods
- **Purpose**: Test different clear methods
- **What it tests**: All clear input methods
- **Methods**: ctrl-a-delete, ctrl-a-backspace, backspace
- **Screenshots**: `clear-method-{method}-{timestamp}.png`
- **Verification**: All clear methods work

#### Test 10: Tab Navigation
- **Purpose**: Test tab navigation
- **What it tests**: Tab and Shift+Tab navigation
- **Screenshots**: `tab-navigation-{timestamp}.png`
- **Verification**: Tab navigation works

#### Test 11: Type with Delay
- **Purpose**: Test typing with different delays
- **What it tests**: Typing with various delay speeds
- **Delays**: 50ms, 100ms, 200ms
- **Screenshots**: `typing-delay-{delay}ms-{timestamp}.png`
- **Verification**: All delays work

#### Test 12: Keyboard Shortcuts
- **Purpose**: Test keyboard shortcuts
- **What it tests**: Common keyboard shortcuts
- **Screenshots**: `keyboard-shortcuts-{timestamp}.png`
- **Verification**: Shortcuts work

#### Test 13: Arrow Key Navigation
- **Purpose**: Test arrow key navigation
- **What it tests**: Arrow key functionality
- **Screenshots**: `arrow-key-navigation-{timestamp}.png`
- **Verification**: Arrow keys work

#### Test 14: Complete Workflow
- **Purpose**: Test complete workflow with all hooks
- **What it tests**: Integration of all hooks
- **Steps**: Login → Navigate → Search → Clear → Keyboard actions
- **Screenshots**: Multiple step screenshots
- **Verification**: Complete workflow successful

#### Test 15: Error Handling
- **Purpose**: Test error handling with invalid login
- **What it tests**: Error handling with invalid credentials
- **Screenshots**: `error-state-{timestamp}.png`
- **Verification**: Error handling works correctly

## 🚀 Running the Tests

### Using the Test Runner
```bash
# Run all tests
node login/hooks/run-hooks-tests.js all

# Run specific test suites
node login/hooks/run-hooks-tests.js common
node login/hooks/run-hooks-tests.js login
node login/hooks/run-hooks-tests.js keyboard
node login/hooks/run-hooks-tests.js integration

# Run with different configurations
node login/hooks/run-hooks-tests.js chrome
node login/hooks/run-hooks-tests.js headed
node login/hooks/run-hooks-tests.js slow
```

### Using Playwright Directly
```bash
# Run all hook tests
npx playwright test login/hooks/

# Run specific test file
npx playwright test login/hooks/common-hooks-tests.spec.js

# Run with specific browser
npx playwright test login/hooks/ --project=chromium

# Run with visible browser
npx playwright test login/hooks/ --headed
```

## 📊 Test Results

### Expected Outcomes
- **Total Tests**: 47 tests across all files
- **Success Rate**: 100% (when all hooks work correctly)
- **Screenshots**: Each test takes multiple screenshots
- **Videos**: All tests are recorded (if video recording enabled)
- **Reports**: HTML reports generated in `playwright-report/`

### Screenshot Organization
- **Location**: `screenshots/` folder
- **Naming**: `{test-name}-{timestamp}.png`
- **Categories**: Organized by test type and step

### Error Handling
- **Console Errors**: Monitored and logged
- **Network Errors**: Tracked and reported
- **Test Failures**: Screenshots taken for debugging
- **Retry Logic**: Built into element waiting functions

## 🔧 Maintenance

### Adding New Tests
1. Follow existing naming conventions
2. Include proper error handling
3. Take screenshots at key steps
4. Update this documentation
5. Test thoroughly before committing

### Updating Hooks
1. Update hook functions
2. Update corresponding test cases
3. Run all tests to ensure compatibility
4. Update documentation
5. Test across different browsers

### Debugging
1. Check console logs for detailed information
2. Review screenshots for visual debugging
3. Use error monitoring data
4. Test individual hook functions
5. Use debug mode for step-by-step execution

## 📝 Best Practices

1. **Always use hooks** instead of duplicating code
2. **Take screenshots** at key test steps
3. **Handle errors** gracefully
4. **Use descriptive names** for tests and screenshots
5. **Test across browsers** for compatibility
6. **Keep tests focused** on specific functionality
7. **Clean up** test files after completion
8. **Document changes** when updating hooks
