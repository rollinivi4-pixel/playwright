# 🎯 Beginner's Guide to Playwright Testing

## 📚 **What is this test about?**

This test automates the process of adding a new customer to your application. It's like having a robot that:
1. Opens your website
2. Logs in with your credentials
3. Navigates to the right page
4. Fills out a customer form
5. Saves the customer
6. Verifies it was saved correctly

## 🏗️ **Test Structure Explained**

### **1. Configuration Section**
```javascript
const TEST_CONFIG = {
  baseUrl: 'http://192.168.0.100:3000/',  // Your application URL
  credentials: {                          // Login details
    email: 'rollinivi4+test@gmail.com',
    password: 'User@123'
  },
  customerData: {                         // Customer information to add
    phone: '985689325955',
    firstName: 'Nisarga',
    lastName: 'p',
    address: '1, SB Market Main Road, Chickpet, Bengaluru, Karnataka 560053',
    pincode: '560053'
  }
};
```

**What it does**: Stores all the information needed for the test in one place, making it easy to modify.

### **2. Helper Functions**

#### **takeScreenshot()**
```javascript
async function takeScreenshot(page, stepName, description) {
  // Takes a picture of the current page
  // Saves it with a descriptive name
  // Logs what happened
}
```
**Purpose**: Captures what the page looks like at each step for debugging.

#### **fillInputSafely()**
```javascript
async function fillInputSafely(page, selector, value, fieldName) {
  // Finds an input field on the page
  // Clears any existing text
  // Types new text with realistic delays
  // Verifies the text was entered correctly
}
```
**Purpose**: Safely fills form fields with error handling.

#### **clickButtonSafely()**
```javascript
async function clickButtonSafely(page, buttonText, buttonDescription) {
  // Finds a button by its text
  // Waits for it to be clickable
  // Clicks it
  // Logs success or failure
}
```
**Purpose**: Safely clicks buttons with error handling.

## 🎬 **Test Steps Explained**

### **Step 1: Open Application**
```javascript
await page.goto(TEST_CONFIG.baseUrl, { 
  waitUntil: 'networkidle',
  timeout: TEST_CONFIG.timeouts.long 
});
```
**What it does**: 
- Opens your application in a browser
- Waits for the page to fully load (networkidle)
- Times out after 30 seconds if it fails

**Why it's important**: The test needs to start from a known state.

### **Step 2: Login**
```javascript
// Fill email
await fillInputSafely(page, 'input[type="email"]', email, 'Email address');

// Fill password  
await fillInputSafely(page, 'input[type="password"]', password, 'Password');

// Click login button
await clickButtonSafely(page, 'Log in', 'Login button');
```
**What it does**:
- Finds the email input field
- Types your email address
- Finds the password field
- Types your password
- Clicks the login button

**Why it's important**: The test needs to be logged in to access customer features.

### **Step 3: Navigate to Sales Orders**
```javascript
await clickButtonSafely(page, 'Sales Orders', 'Sales Orders menu');
```
**What it does**: Clicks on the "Sales Orders" menu item.

**Why it's important**: This is where the customer management features are located.

### **Step 4: Create New Sales Order**
```javascript
await clickButtonSafely(page, 'Create New Sales Order', 'Create New Sales Order button');
```
**What it does**: Starts the process of creating a new sales order.

**Why it's important**: This opens the form where we can add a customer.

### **Step 5: Add Customer**
```javascript
await clickButtonSafely(page, 'Add Customer', 'Add Customer button');
```
**What it does**: Opens the customer form.

**Why it's important**: This is where we'll enter the customer details.

### **Step 6: Fill Customer Details**
```javascript
// Fill phone number
await fillInputSafely(page, 'input[type="tel"]', phone, 'Phone number');

// Fill first name
await fillInputSafely(page, 'input[placeholder*="first"]', firstName, 'First name');

// Fill last name
await fillInputSafely(page, 'input[placeholder*="last"]', lastName, 'Last name');

// Fill address
await fillInputSafely(page, 'input[placeholder*="address"]', address, 'Address');

// Fill pincode
await fillInputSafely(page, 'input[placeholder*="pincode"]', pincode, 'Pincode');
```
**What it does**: Fills out all the customer information fields.

**Why it's important**: This is the actual data entry that the test is validating.

### **Step 7: Save Customer**
```javascript
await clickButtonSafely(page, 'Save Customer', 'Save Customer button');
```
**What it does**: Saves the customer information.

**Why it's important**: This completes the customer creation process.

### **Step 8: Verify Customer Creation**
```javascript
// Look for search input (indicates we're back to customer list)
await page.waitForSelector('[data-test="search-input"]');

// Search for the customer
await page.fill('[data-test="search-input"]', firstName);
```
**What it does**: Verifies that the customer was saved successfully.

**Why it's important**: This confirms the test actually worked.

## 🔧 **How to Run the Test**

### **1. Prerequisites**
- Make sure your application is running
- Update the `baseUrl` in the config if needed
- Update login credentials if needed

### **2. Run the Test**
```bash
# Run the simple test
npx playwright test login/Salesorder_module/simple-addCustomer.spec.js

# Run with browser visible (easier to see what's happening)
npx playwright test login/Salesorder_module/simple-addCustomer.spec.js --headed

# Run specific test
npx playwright test login/Salesorder_module/simple-addCustomer.spec.js -g "Add New Customer"
```

### **3. View Results**
- Screenshots are saved in `screenshots/` folder
- Test reports are in `test-results/` folder
- Videos are in `test-results/` folder

## 🐛 **Common Issues and Solutions**

### **Issue 1: "Application not found"**
**Error**: `net::ERR_CONNECTION_TIMED_OUT`
**Solution**: 
1. Make sure your application is running
2. Check the URL in `TEST_CONFIG.baseUrl`
3. Try `http://localhost:3000/` instead

### **Issue 2: "Element not found"**
**Error**: `Timeout waiting for selector`
**Solution**:
1. Check if the page loaded correctly
2. Look at the screenshot to see what's on the page
3. The selectors might need to be updated for your application

### **Issue 3: "Login failed"**
**Error**: Login button not working
**Solution**:
1. Check your email and password in `TEST_CONFIG.credentials`
2. Make sure the login form fields have the right selectors
3. Check if there are any error messages on the page

## 📝 **Customizing the Test**

### **Change Customer Data**
```javascript
customerData: {
  phone: '1234567890',           // Change phone number
  firstName: 'John',             // Change first name
  lastName: 'Doe',               // Change last name
  address: '123 Main St',        // Change address
  pincode: '12345'               // Change pincode
}
```

### **Change Login Credentials**
```javascript
credentials: {
  email: 'your-email@example.com',    // Your email
  password: 'YourPassword123'         // Your password
}
```

### **Change Application URL**
```javascript
baseUrl: 'http://your-app-url:port/',  // Your application URL
```

## 🎯 **Understanding Selectors**

### **What are selectors?**
Selectors tell Playwright how to find elements on the page.

### **Common Selector Types**

#### **By Input Type**
```javascript
'input[type="email"]'     // Email input field
'input[type="password"]'  // Password input field
'input[type="tel"]'       // Phone number input field
```

#### **By Placeholder Text**
```javascript
'input[placeholder*="email" i]'     // Input with "email" in placeholder
'input[placeholder*="phone" i]'     // Input with "phone" in placeholder
'input[placeholder*="first" i]'     // Input with "first" in placeholder
```

#### **By Button Text**
```javascript
'button:has-text("Log in")'           // Button with "Log in" text
'button:has-text("Save Customer")'    // Button with "Save Customer" text
```

#### **By Data Attributes**
```javascript
'[data-test="search-input"]'  // Element with data-test="search-input"
```

## 🔍 **Debugging Tips**

### **1. Use Screenshots**
The test takes screenshots at each step. Look at them to see what went wrong.

### **2. Check Console Output**
The test logs everything it does. Look for error messages.

### **3. Run with --headed**
```bash
npx playwright test --headed
```
This shows the browser window so you can see what's happening.

### **4. Use --debug**
```bash
npx playwright test --debug
```
This pauses the test and lets you step through it manually.

## 📚 **Learning More**

### **Next Steps**
1. Try modifying the customer data
2. Add more fields to the customer form
3. Create tests for other features
4. Learn about more advanced Playwright features

### **Useful Resources**
- [Playwright Documentation](https://playwright.dev/)
- [Playwright Selectors Guide](https://playwright.dev/docs/selectors)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)

## 🎉 **Congratulations!**

You now understand how to create a simple, beginner-friendly Playwright test! This test demonstrates:
- ✅ Basic page navigation
- ✅ Form filling
- ✅ Button clicking
- ✅ Error handling
- ✅ Screenshot capture
- ✅ Step-by-step logging

Keep practicing and you'll become a Playwright expert in no time! 🚀
