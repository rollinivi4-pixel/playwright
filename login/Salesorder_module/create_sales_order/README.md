# 📁 Sales Order Test Suite - Modular Structure

This directory contains a well-organized, modular test suite for creating sales orders. The structure is designed to be easy to understand, maintain, and extend.


## 🗂️ File Structure

```
create_sales_order/
├── 📄 test-data.json          # Test data and configuration
├── 🎯 selectors.js            # All XPath selectors and element locators
├── 🔧 helper-functions.js     # Reusable helper functions
├── 🧪 main-test.spec.js       # Main test file
├── 📖 README.md              # This documentation
└── 📁 screenshots/           # Test screenshots (auto-generated)
```

## 📋 File Descriptions

### 1. **test-data.json** - Test Data & Configuration
- **Purpose**: Contains all test data, URLs, credentials, and settings
- **Contains**:
  - Application URLs and timeouts
  - Login credentials
  - Customer information
  - Sales order data (items, payment, shipping)
  - Screenshot and video settings
  - Test configuration

### 2. **selectors.js** - Element Selectors & XPaths
- **Purpose**: Centralized location for all element selectors
- **Contains**:
  - Login form selectors
  - Navigation selectors
  - Customer form selectors
  - Sales order form selectors
  - Order summary selectors
  - Warning and popup selectors
  - Customer search selectors

### 3. **helper-functions.js** - Reusable Functions
- **Purpose**: Contains all reusable helper functions
- **Contains**:
  - `isPageActive()` - Check if page is responsive
  - `wait()` - Wait for specified time
  - `takePicture()` - Take screenshots
  - `handleInsufficientStockWarning()` - Handle stock warnings
  - `handleExpirationWarningPopup()` - Handle expiration popups
  - `addItemToSalesOrder()` - Add items to order
  - `verifyOrderSummary()` - Verify order summary

### 4. **main-test.spec.js** - Main Test File
- **Purpose**: Main test orchestration file
- **Contains**:
  - Complete test workflow
  - Step-by-step execution
  - Error handling
  - Success reporting

## 🚀 How to Use

### **For Beginners:**
1. **Update Data**: Modify `test-data.json` with your test data
2. **Run Test**: Execute `main-test.spec.js`
3. **Check Results**: View screenshots in `screenshots/` folder

### **For Developers:**
1. **Add Selectors**: Update `selectors.js` when UI changes
2. **Add Functions**: Add new helper functions to `helper-functions.js`
3. **Modify Tests**: Update `main-test.spec.js` for new test scenarios

## 🔧 Configuration

### **Test Data (test-data.json)**
```json
{
  "application": {
    "baseUrl": "http://192.168.0.100:3000/",
    "timeouts": { "short": 5000, "medium": 10000, "long": 30000 }
  },
  "login": {
    "email": "your-email@example.com",
    "password": "your-password"
  },
  "customer": {
    "phone": "985698562",
    "firstName": "Nisarga",
    "lastName": "p"
  },
  "salesOrder": {
    "orderFrom": "ezSCM",
    "location": "Bangalore",
    "items": [
      {
        "itemName": "Sample Product 1",
        "quantity": 2,
        "sellingPrice": 90,
        "taxType": "GST",
        "taxRate": 18
      }
    ]
  }
}
```

### **Selectors (selectors.js)**
```javascript
module.exports = {
  login: {
    email: 'input[type="email"], input[placeholder*="email" i]',
    password: 'input[type="password"], input[placeholder*="password" i]',
    loginButton: 'button:has-text("Log in")'
  },
  // ... more selectors
};
```

## 🎯 Test Flow

1. **Login** → Authenticate user
2. **Navigate** → Go to Sales Orders
3. **Search Customer** → Find and select customer
4. **Select Options** → Choose order from and location
5. **Add Items** → Add products to order
6. **Handle Warnings** → Manage stock and expiration warnings
7. **Verify Summary** → Confirm order details
8. **Complete** → Finish test with success report

## 📸 Screenshots

The test automatically takes screenshots at each step:
- `01-app-opened` - Application loaded
- `02-login-form` - Login form filled
- `03-login-success` - Login completed
- `04-sales-orders` - Sales orders page
- `05-sales-order-submodule` - Sub-module navigation
- `06-create-order` - Create order page
- `07-customer-search-page` - Customer search
- `08-customer-search-results` - Search results
- `09-order-form-loaded` - Order form
- `10-location-selected` - Location selected
- `11-all-items-added` - Items added
- `12-test-completed` - Test completed

## 🛠️ Customization

### **Adding New Items:**
```json
{
  "salesOrder": {
    "items": [
      {
        "itemName": "New Product",
        "quantity": 1,
        "sellingPrice": 100,
        "taxType": "GST",
        "taxRate": 18
      }
    ]
  }
}
```

### **Adding New Selectors:**
```javascript
// In selectors.js
module.exports = {
  // ... existing selectors
  newFeature: {
    button: 'button:has-text("New Feature")',
    input: 'input[name="new-input"]'
  }
};
```

### **Adding New Functions:**
```javascript
// In helper-functions.js
async function newHelperFunction(page, config) {
  // Your function logic here
}

module.exports = {
  // ... existing functions
  newHelperFunction
};
```

## 🐛 Troubleshooting

### **Common Issues:**
1. **Element Not Found**: Update selectors in `selectors.js`
2. **Test Data Issues**: Check `test-data.json` format
3. **Timeout Errors**: Increase timeouts in configuration
4. **Screenshot Errors**: Check screenshot folder permissions

### **Debug Mode:**
- Enable `headed: true` in test configuration
- Add more `console.log` statements
- Check browser developer tools

## 📚 Best Practices

1. **Keep Selectors Updated**: Update `selectors.js` when UI changes
2. **Use Descriptive Names**: Name functions and variables clearly
3. **Handle Errors Gracefully**: Always include error handling
4. **Take Screenshots**: Capture important steps for debugging
5. **Modular Design**: Keep functions small and focused
6. **Document Changes**: Update README when adding features

## 🎉 Benefits of This Structure

- **Easy to Understand**: Clear separation of concerns
- **Easy to Maintain**: Update one file for specific changes
- **Easy to Extend**: Add new functions or tests easily
- **Easy to Debug**: Isolated functions for troubleshooting
- **Easy to Reuse**: Functions can be used in other tests
- **Professional**: Industry-standard structure

## 📞 Support

If you need help with this test suite:
1. Check the console output for error messages
2. Review the screenshots for visual debugging
3. Update selectors if UI has changed
4. Verify test data is correct
5. Check application is running and accessible

---

**Happy Testing! 🚀**
