o# 🎭 Playwright Tracing Guide

## 📖 Table of Contents
- [What is Playwright Tracing?](#what-is-playwright-tracing)
- [Why Use Tracing?](#why-use-tracing)
- [Quick Start](#quick-start)
- [File Structure](#file-structure)
- [Examples](#examples)
- [Configuration Options](#configuration-options)
- [Viewing Traces](#viewing-traces)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## 🎯 What is Playwright Tracing?

**Playwright Tracing** is a powerful debugging feature that records every action, network request, and browser event during test execution. It creates a detailed timeline that you can replay step-by-step to understand exactly what happened during a test.

### 🔍 What Gets Recorded
- **🖱️ User Actions**: Clicks, typing, scrolling, hovering
- **🌐 Network Requests**: All HTTP requests and responses
- **📸 Screenshots**: Visual snapshots at each step
- **📄 DOM Snapshots**: Complete page state at each action
- **📝 Console Logs**: All console output and errors
- **⏱️ Timing**: Precise timing of each operation

---

## 🚀 Why Use Tracing?

### ✅ Benefits
- **🐛 Debug Test Failures**: See exactly what went wrong
- **📊 Performance Analysis**: Identify slow operations
- **🌐 Network Debugging**: Track all HTTP requests/responses
- **🖱️ Action Replay**: Watch every click, type, and navigation
- **📸 Visual Timeline**: See screenshots at each step
- **🔍 Root Cause Analysis**: Understand complex test failures
- **📈 Test Optimization**: Improve test reliability and speed

### 🎯 When to Use
- **Test Failures**: When tests fail unexpectedly
- **Performance Issues**: When tests are slow
- **Flaky Tests**: When tests pass/fail inconsistently
- **Complex Workflows**: Multi-step user journeys
- **Debugging**: Understanding test behavior
- **Documentation**: Creating visual test documentation

---

## 🚀 Quick Start

### 1. Basic Tracing
```javascript
const { test, expect } = require('@playwright/test');

test('My test with tracing', async ({ page, context }) => {
  // Start tracing
  await context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true
  });

  try {
    // Your test code here
    await page.goto('https://example.com');
    await page.click('button');
    
  } finally {
    // Stop tracing and save
    await context.tracing.stop({ 
    path: 'trace-files/my-test-trace.zip' 
    });
  }
});
```

### 2. Run Tests
```bash
# Run basic tracing tests
npx playwright test login/tracing/basic-tracing-example.spec.js

# Run advanced tracing tests
npx playwright test login/tracing/advanced-tracing-example.spec.js

# Run ezSCM-specific tracing tests
npx playwright test login/tracing/ezscm-tracing-example.spec.js

# Run all tracing tests
node login/tracing/run-tracing-tests.js
```

### 3. View Traces
```bash
# Open trace in Playwright Trace Viewer
npx playwright show-trace trace-files/my-test-trace.zip

# Open HTML report
npx playwright show-report
```

---

## 📁 File Structure

```
login/tracing/
├── README.md                           # This guide
├── basic-tracing-example.spec.js       # Basic tracing examples
├── advanced-tracing-example.spec.js    # Advanced tracing features
├── ezscm-tracing-example.spec.js       # ezSCM-specific tracing examples
├── tracing-config-examples.js          # Configuration examples
├── run-tracing-tests.js               # Test runner script
├── playwright-tracing.config.js        # Dedicated tracing config
├── global-setup.js                     # Global setup for tracing
├── global-teardown.js                  # Global teardown for tracing
└── trace-files/                        # Generated trace files (auto-created)
    ├── ezscm-login-trace.zip
    ├── ezscm-wrong-password-trace.zip
    ├── ezscm-forgot-password-trace.zip
    └── ezscm-performance-trace.zip
```

---

## 📚 Examples

### 1. Basic Tracing Example
**File**: `basic-tracing-example.spec.js`

Demonstrates:
- ✅ Simple tracing setup
- ✅ Login form tracing
- ✅ Error scenario tracing
- ✅ Form submission tracing

```javascript
test('Login with tracing enabled', async ({ page, context }) => {
  await context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true
  });

  try {
    await page.goto('https://example.com/login');
    await page.fill('#email', 'user@example.com');
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard');
    
  } finally {
    await context.tracing.stop({ 
      path: 'trace-files/login-trace.zip' 
    });
  }
});
```

### 2. Advanced Tracing Example
**File**: `advanced-tracing-example.spec.js`

Demonstrates:
- ✅ Conditional tracing
- ✅ Network request monitoring
- ✅ Performance analysis
- ✅ Custom trace events
- ✅ Multi-step workflows

```javascript
test('Network request tracing', async ({ page, context }) => {
  await context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true,
    title: 'Network Request Analysis'
  });

  // Listen to network requests
  const requests = [];
  page.on('request', request => {
    requests.push({
      url: request.url(),
      method: request.method(),
      headers: request.headers()
    });
  });

  try {
    await page.goto('https://jsonplaceholder.typicode.com/posts');
    await page.click('#load-posts');
    await page.waitForResponse(response => 
      response.url().includes('/posts') && response.status() === 200
    );
    
  } finally {bgfre
    await context.tracing.stop({ 
      path: 'trace-files/network-trace.zip' 
    });
  }
});
```

### 3. ezSCM-Specific Tracing Example
**File**: `ezscm-tracing-example.spec.js`

Demonstrates real-world tracing with actual ezSCM website:
- ✅ **Login with valid credentials** - Complete login flow tracing
- ✅ **Wrong password error** - Error scenario tracing with multiple error selectors
- ✅ **Forgot password flow** - Multi-step workflow with link detection
- ✅ **Performance analysis** - Page load and interaction timing
- ✅ **Real website testing** - Uses actual ezSCM staging environment

```javascript
test('ezSCM Login with comprehensive tracing', async ({ page, context }) => {
  await context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true,
    title: 'ezSCM Login Test'
  });

  try {
    await page.goto('https://stagingaz.ezscm.ai/');
    await page.fill('#email', 'rollinivi4+test@gmail.com');
    await page.fill('#password', 'User@123');
    await page.check('input[type="checkbox"]');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);
    
  } finally {
    await context.tracing.stop({ 
      path: 'trace-files/ezscm-login-trace.zip' 
    });
  }
});
```

### 4. Configuration Examples
**File**: `tracing-config-examples.js`

Contains various configuration options:
- ✅ Basic tracing config
- ✅ Advanced tracing config
- ✅ Performance-focused config
- ✅ Debug-focused config
- ✅ CI/CD config
- ✅ Custom tracing functions

---

## ⚙️ Configuration Options

### Global Configuration (playwright.config.js)
```javascript
module.exports = {
  use: {
    // Always trace
    trace: 'on',
    
    // Trace only on first retry (recommended)
    trace: 'on-first-retry',
    
    // Trace only on failure
    trace: 'retain-on-failure',
    
    // Never trace
    trace: 'off'
  }
};
```

### Per-Test Configuration
```javascript
await context.tracing.start({
  screenshots: true,        // Capture screenshots
  snapshots: true,         // Capture DOM snapshots
  sources: true,           // Capture source code
  title: 'My Test Trace'   // Custom title
});
```

### Trace Options
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `screenshots` | boolean | `false` | Capture screenshots at each action |
| `snapshots` | boolean | `false` | Capture DOM snapshots |
| `sources` | boolean | `false` | Capture source code |
| `title` | string | `undefined` | Custom title for the trace |

---

## 👀 Viewing Traces

### 1. Playwright Trace Viewer
```bash
# Open specific trace file
npx playwright show-trace trace-files/my-trace.zip

# Open latest trace
npx playwright show-trace trace-files/*.zip
```

### 2. HTML Report
```bash
# Generate and open HTML report
npx playwright show-report
```

### 3. VS Code Extension
- Install Playwright extension
- Open trace files directly in VS Code
- View traces in integrated viewer

### 4. Playwright Cloud
- Upload traces to Playwright Cloud
- Share traces with team members
- View traces in browser

---

## 🎯 Best Practices

### ✅ Do's
1. **Use `on-first-retry`** for most tests
2. **Always wrap in try/finally** to ensure traces are saved
3. **Use descriptive trace titles** for easy identification
4. **Save traces with timestamps** for organization
5. **Take screenshots on failures** for visual debugging
6. **Clean up old trace files** regularly
7. **Use conditional tracing** for performance-sensitive tests

### ❌ Don'ts
1. **Don't trace everything** - it uses storage space
2. **Don't forget to stop tracing** - it will consume memory
3. **Don't ignore trace file sizes** - they can get large
4. **Don't trace in production** - use only for debugging
5. **Don't commit trace files** - add to .gitignore

### 🔧 Optimization Tips
```javascript
// Good: Conditional tracing
const shouldTrace = process.env.DEBUG === 'true' || testFailed;
if (shouldTrace) {
  await context.tracing.start({ /* options */ });
}

// Good: Timestamped traces
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
await context.tracing.stop({ 
  path: `trace-files/test-${timestamp}.zip` 
});

// Good: Clean up old traces
const fs = require('fs');
const traceFiles = fs.readdirSync('trace-files');
const oldFiles = traceFiles.filter(file => 
  Date.now() - fs.statSync(`trace-files/${file}`).mtime.getTime() > 7 * 24 * 60 * 60 * 1000
);
oldFiles.forEach(file => fs.unlinkSync(`trace-files/${file}`));
```

---

## 🚨 Troubleshooting

### Common Issues

#### 1. Trace File Too Large
**Problem**: Trace files are very large
**Solution**: 
```javascript
// Use selective tracing
await context.tracing.start({
  screenshots: false,  // Disable screenshots
  snapshots: false,    // Disable DOM snapshots
  sources: false       // Disable source code
});
```

#### 2. Memory Issues
**Problem**: Tests run out of memory
**Solution**:
```javascript
// Always stop tracing in finally block
try {
  // test code
} finally {
  await context.tracing.stop({ path: 'trace.zip' });
}
```

#### 3. Trace Not Saved
**Problem**: Trace file not created
**Solution**:
```javascript
// Ensure directory exists
const fs = require('fs');
if (!fs.existsSync('trace-files')) {
  fs.mkdirSync('trace-files', { recursive: true });
}

// Use absolute path
await context.tracing.stop({ 
  path: path.resolve('trace-files/my-trace.zip') 
});
```

#### 4. Can't View Trace
**Problem**: Trace viewer won't open
**Solution**:
```bash
# Update Playwright
npx playwright install

# Try different viewer
npx playwright show-trace --help
```

### Debug Commands
```bash
# Check Playwright version
npx playwright --version

# List available commands
npx playwright --help

# Check trace file
ls -la trace-files/

# View trace info
npx playwright show-trace --help
```

---

## 🎉 Conclusion

Playwright Tracing is an essential tool for:
- 🐛 **Debugging** test failures
- 📊 **Analyzing** performance issues
- 🔍 **Understanding** test behavior
- 📈 **Improving** test reliability

### Next Steps
1. Run the example tests
2. Experiment with different configurations
3. View traces in the Trace Viewer
4. Integrate tracing into your test suite
5. Share traces with your team

### Resources
- [Playwright Documentation](https://playwright.dev/docs/trace-viewer)
- [Trace Viewer Guide](https://playwright.dev/docs/trace-viewer-intro)
- [Debugging Guide](https://playwright.dev/docs/debug)

---

**Happy Testing! 🚀**

*For questions or issues, check the troubleshooting section or create an issue in the repository.*
