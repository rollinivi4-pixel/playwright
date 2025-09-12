# Screenshots Organization

This folder contains organized screenshots from Playwright tests, structured by test type and functionality.

## Folder Structure

```
screenshots/
├── login/           # Login-related screenshots
├── datepicker/      # Date picker test screenshots
├── hover/          # Mouse hover test screenshots
├── keyboard/       # Keyboard action test screenshots
├── upload/         # File upload test screenshots
├── table/          # Table interaction test screenshots
├── general/        # General page screenshots
└── README.md       # This file
```

## Screenshot Naming Convention

Screenshots are named with a sequential number prefix and descriptive name:

- `01-initial-page-load.png` - First screenshot of the test
- `02-after-email-input.png` - Screenshot after email input
- `03-after-password-input.png` - Screenshot after password input
- `04-after-checkbox-checked.png` - Screenshot after checkbox interaction
- `05-after-login-success.png` - Final screenshot after successful login

## Error Screenshots

Error-related screenshots use the `error-` prefix:

- `error-01-initial-page.png` - Initial page before error
- `error-02-before-login-click.png` - Page before clicking login with wrong credentials
- `error-03-after-login-attempt.png` - Page after failed login attempt

## Forgot Password Screenshots

Forgot password flow screenshots use the `forgot-` prefix:

- `forgot-01-initial-page.png` - Initial page
- `forgot-02-before-login.png` - Before login attempt
- `forgot-03-after-login-error.png` - After login error
- `forgot-04-forgot-password-link-visible.png` - Showing forgot password link
- `forgot-05-forgot-password-page.png` - Forgot password page

## Usage

To run the sample screenshot test:

```bash
npx playwright test screenshots/screenshot-sample-test.spec.js
```

## Screenshot Types

1. **Full Page Screenshots**: Capture the entire page content
2. **Viewport Screenshots**: Capture only the visible area
3. **Element Screenshots**: Capture specific elements
4. **Debug Screenshots**: Help debug test failures

## Best Practices

1. Use descriptive names that explain what the screenshot shows
2. Use sequential numbering for step-by-step flows
3. Use prefixes for different test scenarios (error-, forgot-, etc.)
4. Take screenshots at key interaction points
5. Include both success and failure scenarios
6. Use fullPage: true for comprehensive page captures
7. Use fullPage: false for focused viewport captures
