/**
 * SIMPLE TEST CONFIGURATION
 * 
 * This file contains all the settings for your test.
 * Modify these values to match your application and requirements.
 */

module.exports = {
  // 🌐 APPLICATION SETTINGS
  application: {
    // Your application URL - Change this to match your setup
    baseUrl: 'http://192.168.0.100:3000/',
    
    // Alternative URLs to try if the main one doesn't work
    fallbackUrls: [
      'http://localhost:3000/',
      'http://127.0.0.1:3000/',
      'https://stagingaz.ezscm.ai/',
      'http://192.168.0.100:3000/'
    ],
    
    // How long to wait for pages to load (in milliseconds)
    timeouts: {
      short: 5000,    // 5 seconds - for quick operations
      medium: 10000,  // 10 seconds - for normal operations
      long: 30000     // 30 seconds - for slow operations
    }
  },

  // 🔐 LOGIN CREDENTIALS
  login: {
    // Your login email
    email: 'rollinivi4+test@gmail.com',
    
    // Your login password
    password: 'User@123',
    
    // Whether to check "Keep me logged in" checkbox
    keepLoggedIn: true
  },

  // 👤 CUSTOMER DATA
  customer: {
    // Phone number for the test customer
    phone: '985689325955',
    
    // First name for the test customer
    firstName: 'Nisarga',
    
    // Last name for the test customer
    lastName: 'p',
    
    // Address for the test customer
    address: '1, SB Market Main Road, Chickpet, Bengaluru, Karnataka 560053',
    
    // Pincode for the test customer
    pincode: '560053'
  },

  // 📸 SCREENSHOT SETTINGS
  screenshots: {
    // Whether to take screenshots during the test
    enabled: true,
    
    // Folder to save screenshots
    folder: 'screenshots',
    
    // Whether to take full page screenshots
    fullPage: true,
    
    // Image quality (1-100)
    quality: 90
  },

  // 🎥 VIDEO SETTINGS
  video: {
    // Whether to record videos during the test
    enabled: true,
    
    // When to keep videos ('retain-on-failure' or 'retain-on-pass')
    mode: 'retain-on-failure'
  },

  // ⌨️ KEYBOARD SETTINGS
  keyboard: {
    // Delay between keystrokes (in milliseconds)
    typingDelay: 100,
    
    // Whether to use keyboard navigation
    useKeyboardNavigation: true
  },

  // 🔍 ELEMENT SELECTORS
  selectors: {
    // Login page selectors
    login: {
      email: 'input[type="email"], input[placeholder*="email" i], input[name*="email" i]',
      password: 'input[type="password"], input[placeholder*="password" i], input[name*="password" i]',
      checkbox: 'input[type="checkbox"]',
      loginButton: 'button:has-text("Log in")'
    },
    
    // Navigation selectors
    navigation: {
      salesOrders: 'text=Sales Orders',
      createOrder: 'button:has-text("Create New Sales Order")',
      addCustomer: 'button:has-text("Add Customer")'
    },
    
    // Customer form selectors
    customerForm: {
      phone: 'input[type="tel"], input[placeholder*="phone" i], input[placeholder*="mobile" i]',
      firstName: 'input[placeholder*="first" i], input[name*="first" i]',
      lastName: 'input[placeholder*="last" i], input[name*="last" i]',
      address: 'input[placeholder*="address" i], textarea[placeholder*="address" i]',
      pincode: 'input[placeholder*="pincode" i], input[placeholder*="zip" i]',
      saveButton: 'button:has-text("Save Customer")'
    },
    
    // Verification selectors
    verification: {
      searchInput: '[data-test="search-input"]',
      searchResults: '[data-test="result"]'
    }
  },

  // 📊 TEST SETTINGS
  test: {
    // Test timeout (in milliseconds)
    timeout: 60000,
    
    // Whether to run tests in headed mode (visible browser)
    headed: false,
    
    // Whether to run tests in parallel
    parallel: false,
    
    // Number of retries on failure
    retries: 1
  }
};
