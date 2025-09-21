# 🚀 Getting Started Guide

Welcome to the Playwright Test Framework! This guide will help you get up and running quickly.

## 📋 **Prerequisites**

Before you begin, make sure you have:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Git** (for version control)
- **Your application** running (for testing)

## 🛠️ **Installation**

### **Step 1: Download the Framework**

```bash
# Clone the repository
git clone <repository-url>
cd playwright-test-framework

# Or download and extract the ZIP file
# Then navigate to the extracted folder
```

### **Step 2: Install Dependencies**

```bash
# Install Node.js dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### **Step 3: Verify Installation**

```bash
# Check if everything is installed correctly
npx playwright --version
npm run check-urls
```

## ⚙️ **Configuration**

### **Step 1: Configure Your Environment**

Edit the configuration file:

```bash
# Open the environments configuration
nano config/environments.json
```

Update the configuration for your application:

```json
{
  "development": {
    "baseUrl": "http://localhost:3000",
    "timeout": 30000,
    "headless": false
  }
}
```

### **Step 2: Configure Test Data**

Edit the test data file:

```bash
# Open the test data configuration
nano config/test-data.json
```

Update the test data:

```json
{
  "users": {
    "user": {
      "email": "your-email@example.com",
      "password": "your-password"
    }
  }
}
```

### **Step 3: Check URL Connectivity**

```bash
# Check which URLs are accessible
npm run check-urls
```

This will test all configured URLs and tell you which ones are working.

## 🎯 **Running Your First Test**

### **Step 1: Start Your Application**

Make sure your application is running on the configured URL.

### **Step 2: Run a Simple Test**

```bash
# Run the simple login test
npm run test:simple

# Or run with browser visible
npm run test:simple -- --headed
```

### **Step 3: View Results**

After the test completes, you can view:

- **Screenshots**: `screenshots/` folder
- **Videos**: `videos/` folder  
- **HTML Report**: `playwright-report/index.html`
- **Console Output**: Terminal output

## 📚 **Understanding the Framework**

### **Directory Structure**

```
playwright-test-framework/
├── 📁 config/              # Configuration files
├── 📁 src/                 # Source code
│   ├── 📁 pages/           # Page Object Model
│   ├── 📁 utils/           # Utility classes
│   └── 📁 fixtures/        # Test fixtures
├── 📁 tests/               # Test files
│   ├── 📁 examples/        # Example tests
│   ├── 📁 simple/          # Simple tests
│   └── 📁 standard/        # Standard tests
├── 📁 scripts/             # Utility scripts
└── 📁 docs/                # Documentation
```

### **Test Levels**

The framework provides three levels of tests:

1. **🥚 Simple**: Perfect for beginners
2. **🐣 Standard**: Good for learning
3. **🐓 Advanced**: Production-ready

### **Page Object Model**

The framework uses the Page Object Model pattern:

```javascript
// Example: LoginPage.js
export class LoginPage extends BasePage {
  async login(email, password) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }
}
```

## 🎨 **Customizing Tests**

### **Adding New Test Data**

Edit `config/test-data.json`:

```json
{
  "testData": {
    "customer": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com"
    }
  }
}
```

### **Adding New Selectors**

Edit `config/selectors.json`:

```json
{
  "newPage": {
    "button": "button[data-test='new-button']",
    "input": "input[data-test='new-input']"
  }
}
```

### **Creating New Tests**

Create a new test file in `tests/`:

```javascript
import { test } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage.js';

test('My new test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.goto('http://localhost:3000');
  await loginPage.login('user@example.com', 'password');
  // ... rest of your test
});
```

## 🔧 **Common Commands**

### **Running Tests**

```bash
# Run all tests
npm test

# Run with browser visible
npm run test:headed

# Run specific test
npm run test -- --grep "test name"

# Run specific browser
npm run test:chrome
```

### **Debugging**

```bash
# Run in debug mode
npm run test:debug

# Generate test code
npm run test:codegen

# Show test report
npm run report
```

### **Maintenance**

```bash
# Clean test artifacts
npm run clean

# Check URL connectivity
npm run check-urls

# Update Playwright
npm run install
```

## 🐛 **Troubleshooting**

### **Common Issues**

#### **"Application not found" Error**
```
Error: net::ERR_CONNECTION_TIMED_OUT
```

**Solution**:
1. Make sure your application is running
2. Check the URL in `config/environments.json`
3. Run `npm run check-urls` to test connectivity

#### **"Element not found" Error**
```
Error: Timeout waiting for selector
```

**Solution**:
1. Check if the page loaded correctly
2. Look at screenshots to see what's on the page
3. Update selectors in `config/selectors.json`

#### **"Login failed" Error**

**Solution**:
1. Check your credentials in `config/test-data.json`
2. Make sure the login form fields are correct
3. Check for error messages in screenshots

### **Getting Help**

1. **Check Screenshots**: Look in the `screenshots/` folder
2. **Read Console Output**: The test tells you what it's doing
3. **Use Debug Mode**: `npm run test:debug`
4. **Check Documentation**: Read the docs in the `docs/` folder

## 🚀 **Next Steps**

### **Learning Path**

1. **Start Simple**: Run the simple tests first
2. **Read Examples**: Look at the example tests
3. **Modify Tests**: Change test data and see what happens
4. **Create Tests**: Write your own tests
5. **Advanced Features**: Explore the advanced features

### **Resources**

- [Configuration Guide](configuration.md)
- [Writing Tests](writing-tests.md)
- [Page Object Model](page-objects.md)
- [Utilities Reference](utilities.md)
- [Best Practices](best-practices.md)

## 🎉 **Congratulations!**

You're now ready to start using the Playwright Test Framework! 

**Quick Start Checklist**:
- ✅ Framework installed
- ✅ Dependencies installed
- ✅ Configuration updated
- ✅ URL connectivity verified
- ✅ First test run successfully

**What's Next**:
- Explore the example tests
- Read the documentation
- Start writing your own tests
- Join the community for support

Happy Testing! 🚀
