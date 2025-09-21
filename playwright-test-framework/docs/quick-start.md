# ⚡ Quick Start Guide

Get up and running with the Playwright Test Framework in 5 minutes!

## 🚀 **5-Minute Setup**

### **Step 1: Install (1 minute)**
```bash
# Download and install
git clone <repository-url>
cd playwright-test-framework
npm install
npx playwright install
```

### **Step 2: Configure (2 minutes)**
```bash
# Edit your application URL
nano config/environments.json
```

Change this line:
```json
"baseUrl": "http://your-app-url:port"
```

### **Step 3: Test (2 minutes)**
```bash
# Check if your app is accessible
npm run check-urls

# Run your first test
npm run test:simple -- --headed
```

## 🎯 **Ready to Go!**

That's it! You now have a working Playwright test framework.

## 📋 **Quick Commands**

```bash
# Run tests
npm test                    # All tests
npm run test:headed         # With browser visible
npm run test:simple         # Simple tests only
npm run test:chrome         # Chrome only

# Debug
npm run test:debug          # Debug mode
npm run check-urls          # Check connectivity
npm run report              # View HTML report

# Clean up
npm run clean               # Clean test artifacts
```

## 🔧 **Quick Configuration**

### **Change Application URL**
```json
// config/environments.json
{
  "development": {
    "baseUrl": "http://localhost:3000"  // Change this
  }
}
```

### **Change Login Credentials**
```json
// config/test-data.json
{
  "users": {
    "user": {
      "email": "your-email@example.com",    // Change this
      "password": "your-password"           // Change this
    }
  }
}
```

## 🎨 **Quick Customization**

### **Add Your Own Test**
```javascript
// tests/my-test.spec.js
import { test } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage.js';

test('My test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto('http://localhost:3000');
  await loginPage.login('user@example.com', 'password');
  // Your test logic here
});
```

### **Run Your Test**
```bash
npm test -- tests/my-test.spec.js
```

## 🆘 **Quick Troubleshooting**

### **"Connection failed" Error**
```bash
# Check if your app is running
npm run check-urls

# Make sure URL is correct in config/environments.json
```

### **"Element not found" Error**
```bash
# Run with browser visible to see what's happening
npm run test:headed

# Check screenshots in screenshots/ folder
```

### **"Login failed" Error**
```bash
# Check credentials in config/test-data.json
# Make sure your app is running
```

## 📚 **Quick Learning**

1. **Look at examples**: `tests/examples/` folder
2. **Read the code**: Start with simple tests
3. **Modify tests**: Change data and see what happens
4. **Create tests**: Write your own tests

## 🎉 **You're Done!**

You now have a complete Playwright test framework ready to use!

**Next Steps**:
- Explore the example tests
- Read the full documentation
- Start writing your own tests
- Join the community for support

Happy Testing! 🚀
