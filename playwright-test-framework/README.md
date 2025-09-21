# 🚀 Playwright Test Framework - Universal Testing Solution

A comprehensive, beginner-friendly Playwright test framework that anyone can use to create robust, maintainable test automation.

## 🌟 **Features**

- ✅ **Beginner Friendly** - Clear documentation and examples
- ✅ **Page Object Model** - Organized, maintainable code structure
- ✅ **Multiple Test Levels** - From simple to advanced
- ✅ **Comprehensive Utilities** - Reusable helper functions
- ✅ **Smart Configuration** - Environment-based settings
- ✅ **Rich Reporting** - Screenshots, videos, and detailed reports
- ✅ **Error Handling** - Robust error management
- ✅ **Cross-Browser Support** - Chrome, Firefox, Safari, Edge
- ✅ **CI/CD Ready** - GitHub Actions, Jenkins integration
- ✅ **Extensible** - Easy to add new features

## 📁 **Framework Structure**

```
playwright-test-framework/
├── 📁 config/                    # Configuration files
│   ├── environments.json         # Environment settings
│   ├── test-data.json           # Test data
│   └── selectors.json           # Element selectors
├── 📁 src/                      # Source code
│   ├── 📁 pages/                # Page Object Model
│   ├── 📁 utils/                # Utility classes
│   ├── 📁 helpers/              # Helper functions
│   └── 📁 fixtures/             # Test fixtures
├── 📁 tests/                    # Test files
│   ├── 📁 examples/             # Example tests
│   ├── 📁 smoke/                # Smoke tests
│   └── 📁 regression/           # Regression tests
├── 📁 reports/                  # Test reports
├── 📁 screenshots/              # Screenshots
├── 📁 videos/                   # Video recordings
├── 📁 docs/                     # Documentation
└── 📁 scripts/                  # Utility scripts
```

## 🚀 **Quick Start**

### **1. Installation**
```bash
# Clone or download the framework
git clone <repository-url>
cd playwright-test-framework

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### **2. Configuration**
```bash
# Copy example configuration
cp config/environments.example.json config/environments.json

# Edit your environment settings
nano config/environments.json
```

### **3. Run Tests**
```bash
# Run all tests
npm test

# Run specific test
npm run test:smoke

# Run with browser visible
npm run test:headed

# Run specific browser
npm run test:chrome
```

## 🎯 **Test Levels**

### **🥚 Level 1: Ultra Simple**
Perfect for absolute beginners
```bash
npm run test:simple
```

### **🐣 Level 2: Standard**
Good for learning and development
```bash
npm run test:standard
```

### **🐓 Level 3: Advanced**
Production-ready with all features
```bash
npm run test:advanced
```

## 📚 **Documentation**

- [Getting Started Guide](docs/getting-started.md)
- [Configuration Guide](docs/configuration.md)
- [Writing Tests](docs/writing-tests.md)
- [Page Object Model](docs/page-objects.md)
- [Utilities Reference](docs/utilities.md)
- [Best Practices](docs/best-practices.md)
- [Troubleshooting](docs/troubleshooting.md)

## 🛠️ **Available Scripts**

```bash
npm test                 # Run all tests
npm run test:headed      # Run with visible browser
npm run test:debug       # Run in debug mode
npm run test:smoke       # Run smoke tests
npm run test:regression  # Run regression tests
npm run test:chrome      # Run on Chrome
npm run test:firefox     # Run on Firefox
npm run test:safari      # Run on Safari
npm run test:mobile      # Run mobile tests
npm run report           # Generate HTML report
npm run clean            # Clean test artifacts
```

## 🔧 **Configuration**

### **Environment Settings**
```json
{
  "development": {
    "baseUrl": "http://localhost:3000",
    "timeout": 30000,
    "retries": 1
  },
  "staging": {
    "baseUrl": "https://staging.example.com",
    "timeout": 60000,
    "retries": 2
  },
  "production": {
    "baseUrl": "https://example.com",
    "timeout": 90000,
    "retries": 3
  }
}
```

### **Test Data**
```json
{
  "users": {
    "admin": {
      "email": "admin@example.com",
      "password": "admin123"
    },
    "user": {
      "email": "user@example.com",
      "password": "user123"
    }
  },
  "testData": {
    "customer": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com"
    }
  }
}
```

## 📖 **Example Tests**

### **Simple Test**
```javascript
import { test } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

test('User can login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.goto();
  await loginPage.login('user@example.com', 'password123');
  await loginPage.verifyLoginSuccess();
});
```
### **Advanced Test**
```javascript
import { test } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { CustomerPage } from '../src/pages/CustomerPage';
import { TestUtils } from '../src/utils/TestUtils';

test('Add customer with validation', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const customerPage = new CustomerPage(page);
  const utils = new TestUtils(page);
  
  // Login
  await loginPage.goto();
  await loginPage.login('admin@example.com', 'admin123');
  
  // Add customer
  await customerPage.goto();
  const customerData = utils.generateCustomerData();
  await customerPage.addCustomer(customerData);
  
  // Verify
  await customerPage.verifyCustomerAdded(customerData);
});
```

## 🎨 **Customization**

### **Adding New Pages**
```javascript
// src/pages/NewPage.js
import { BasePage } from './BasePage';

export class NewPage extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      button: 'button[data-test="new-button"]',
      input: 'input[data-test="new-input"]'
    };
  }
  
  async clickButton() {
    await this.click(this.selectors.button);
  }
  
  async fillInput(text) {
    await this.fill(this.selectors.input, text);
  }
}
```

### **Adding New Utilities**
```javascript
// src/utils/NewUtility.js
export class NewUtility {
  constructor(page) {
    this.page = page;
  }
  
  async customAction() {
    // Your custom logic here
  }
}
```

## 🔍 **Debugging**

### **Visual Debugging**
```bash
# Run with browser visible
npm run test:headed

# Run in debug mode
npm run test:debug

# Run specific test
npm run test -- --grep "test name"
```

### **Screenshots and Videos**
- Screenshots: `screenshots/` folder
- Videos: `videos/` folder
- Reports: `reports/` folder

## 🚀 **CI/CD Integration**

### **GitHub Actions**
```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npx playwright install
      - run: npm test
      - uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

## 📊 **Reporting**

### **HTML Report**
```bash
npm run report
```
Opens detailed HTML report with:
- Test results
- Screenshots
- Videos
- Performance metrics
- Error details

### **Custom Reports**
- JSON reports for CI/CD
- JUnit XML for Jenkins
- Custom report formats

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## 📄 **License**

MIT License - feel free to use in your projects!

## 🆘 **Support**

- 📖 [Documentation](docs/)
- 🐛 [Issues](https://github.com/your-repo/issues)
- 💬 [Discussions](https://github.com/your-repo/discussions)
- 📧 [Email Support](mailto:support@example.com)

---

**Happy Testing!** 🎉

*This framework makes Playwright testing accessible to everyone, from beginners to experts.*
