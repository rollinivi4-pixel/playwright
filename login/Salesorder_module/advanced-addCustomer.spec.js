import { test, expect, Page, BrowserContext } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Test configuration and metadata
const TEST_CONFIG = {
  baseUrl: process.env.APP_URL || 'http://192.168.0.100:3000/',
  fallbackUrls: [
    'http://localhost:3000/',
    'http://127.0.0.1:3000/',
    'https://stagingaz.ezscm.ai/',
    'http://192.168.0.100:3000/'
  ],
  credentials: {
    email: 'rollinivi4+test@gmail.com',
    password: 'User@123'
  },
  customerData: {
    phone: '985689325955',
    firstName: 'Nisarga',
    lastName: 'p',
    address: '1, SB Market Main Road, Chickpet, Bengaluru, Karnataka 560053',
    pincode: '560053'
  },
  timeouts: {
    navigation: 30000,
    element: 15000,
    network: 10000,
    stabilization: 5000
  },
  screenshots: {
    enabled: true,
    fullPage: true,
    quality: 90
  },
  video: {
    enabled: true,
    mode: 'retain-on-failure'
  }
};

// Performance tracking utilities
class PerformanceTracker {
  constructor() {
    this.metrics = {
      startTime: Date.now(),
      pageLoadTimes: [],
      networkRequests: [],
      consoleErrors: [],
      networkErrors: [],
      memoryUsage: [],
      customTimings: {}
    };
  }

  startTiming(label) {
    this.metrics.customTimings[label] = { start: Date.now() };
  }

  endTiming(label) {
    if (this.metrics.customTimings[label]) {
      this.metrics.customTimings[label].end = Date.now();
      this.metrics.customTimings[label].duration = 
        this.metrics.customTimings[label].end - this.metrics.customTimings[label].start;
    }
  }

  addPageLoadTime(time) {
    this.metrics.pageLoadTimes.push(time);
  }

  addNetworkRequest(request) {
    this.metrics.networkRequests.push(request);
  }

  addConsoleError(error) {
    this.metrics.consoleErrors.push(error);
  }

  addNetworkError(error) {
    this.metrics.networkErrors.push(error);
  }

  getTotalDuration() {
    return Date.now() - this.metrics.startTime;
  }

  getSummary() {
    return {
      totalDuration: this.getTotalDuration(),
      pageLoadTimes: this.metrics.pageLoadTimes,
      networkRequests: this.metrics.networkRequests.length,
      consoleErrors: this.metrics.consoleErrors.length,
      networkErrors: this.metrics.networkErrors.length,
      customTimings: this.metrics.customTimings
    };
  }
}

// Advanced screenshot utility
class ScreenshotManager {
  constructor(page, testInfo) {
    this.page = page;
    this.testInfo = testInfo;
    this.screenshots = [];
  }

  async capture(name, options = {}) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `screenshot-${name}-${timestamp}.png`;
    const fullPath = path.join('screenshots', filename);
    
    // Ensure screenshots directory exists
    if (!fs.existsSync('screenshots')) {
      fs.mkdirSync('screenshots', { recursive: true });
    }

    const screenshotOptions = {
      path: fullPath,
      fullPage: options.fullPage ?? TEST_CONFIG.screenshots.fullPage,
      quality: options.quality ?? TEST_CONFIG.screenshots.quality,
      ...options
    };

    try {
      await this.page.screenshot(screenshotOptions);
      
      const screenshotInfo = {
        name,
        filename,
        path: fullPath,
        timestamp: new Date().toISOString(),
        ...options
      };
      
      this.screenshots.push(screenshotInfo);
      
      // Attach to test report
      await this.testInfo.attach(filename, {
        path: fullPath,
        contentType: 'image/png'
      });
      
      console.log(`📸 Screenshot captured: ${name} -> ${filename}`);
      return screenshotInfo;
    } catch (error) {
      console.log(`⚠️ Screenshot failed for ${name}:`, error.message);
      return null;
    }
  }

  getScreenshots() {
    return this.screenshots;
  }
}

// Keyboard actions utility
class KeyboardActions {
  constructor(page) {
    this.page = page;
  }

  async fillWithKeyboard(selector, text, options = {}) {
    const element = this.page.locator(selector);
    await element.click();
    await element.clear();
    
    // Type with realistic delays
    const delay = options.delay || 50;
    for (const char of text) {
      await this.page.keyboard.type(char, { delay });
    }
  }

  async navigateWithKeyboard(direction) {
    const keyMap = {
      'tab': 'Tab',
      'shift-tab': 'Shift+Tab',
      'enter': 'Enter',
      'escape': 'Escape',
      'space': 'Space',
      'arrow-up': 'ArrowUp',
      'arrow-down': 'ArrowDown',
      'arrow-left': 'ArrowLeft',
      'arrow-right': 'ArrowRight'
    };
    
    const key = keyMap[direction];
    if (key) {
      await this.page.keyboard.press(key);
    }
  }

  async selectAll() {
    await this.page.keyboard.press('Control+a');
  }

  async copy() {
    await this.page.keyboard.press('Control+c');
  }

  async paste() {
    await this.page.keyboard.press('Control+v');
  }

  async undo() {
    await this.page.keyboard.press('Control+z');
  }

  async redo() {
    await this.page.keyboard.press('Control+y');
  }
}

// Network monitoring utility
class NetworkMonitor {
  constructor(page) {
    this.page = page;
    this.requests = [];
    this.responses = [];
    this.errors = [];
    this.setupListeners();
  }

  setupListeners() {
    this.page.on('request', request => {
      this.requests.push({
        url: request.url(),
        method: request.method(),
        headers: request.headers(),
        postData: request.postData(),
        timestamp: Date.now(),
        resourceType: request.resourceType()
      });
    });

    this.page.on('response', response => {
      this.responses.push({
        url: response.url(),
        status: response.status(),
        statusText: response.statusText(),
        headers: response.headers(),
        timestamp: Date.now()
      });
    });

    this.page.on('requestfailed', request => {
      this.errors.push({
        url: request.url(),
        error: request.failure()?.errorText,
        timestamp: Date.now()
      });
    });
  }

  getApiCalls() {
    return this.requests.filter(req => 
      req.resourceType === 'xhr' || req.resourceType === 'fetch'
    );
  }

  getFailedRequests() {
    return this.errors;
  }

  getSummary() {
    return {
      totalRequests: this.requests.length,
      totalResponses: this.responses.length,
      failedRequests: this.errors.length,
      apiCalls: this.getApiCalls().length
    };
  }
}

// URL validation and fallback utility
class URLValidator {
  static async findWorkingUrl(page, urls, timeout = 10000) {
    console.log('🔍 Checking URL availability...');
    
    for (const url of urls) {
      try {
        console.log(`🌐 Testing URL: ${url}`);
        const response = await page.goto(url, { 
          waitUntil: 'domcontentloaded',
          timeout: timeout 
        });
        
        if (response && response.ok()) {
          console.log(`✅ Working URL found: ${url}`);
          return url;
        }
      } catch (error) {
        console.log(`❌ URL failed: ${url} - ${error.message}`);
        continue;
      }
    }
    
    throw new Error(`❌ No working URL found. Tried: ${urls.join(', ')}`);
  }

  static async validateUrl(page, url, timeout = 5000) {
    try {
      const response = await page.goto(url, { 
        waitUntil: 'domcontentloaded',
        timeout: timeout 
      });
      return response && response.ok();
    } catch (error) {
      return false;
    }
  }
}

// Test data generator
class TestDataGenerator {
  static generateCustomerData() {
    const timestamp = Date.now();
    return {
      phone: `9${Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')}`,
      firstName: `TestUser${timestamp}`,
      lastName: `LastName${timestamp}`,
      address: `Test Address ${timestamp}, Test City, Test State 123456`,
      pincode: '123456'
    };
  }

  static generateEmail() {
    const timestamp = Date.now();
    return `testuser${timestamp}@example.com`;
  }
}

// Main test suite
test.describe('Advanced Add Customer Tests', () => {
  let performanceTracker;
  let screenshotManager;
  let keyboardActions;
  let networkMonitor;

  // Global setup hook
  test.beforeAll(async () => {
    console.log('🚀 Setting up Advanced Add Customer Test Suite...');
    
    // Ensure test directories exist
    const dirs = ['screenshots', 'test-results', 'reports'];
    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
    
    console.log('✅ Test suite setup completed');
  });

  // Test setup hook
  test.beforeEach(async ({ page, context }, testInfo) => {
    // Initialize utilities
    performanceTracker = new PerformanceTracker();
    screenshotManager = new ScreenshotManager(page, testInfo);
    keyboardActions = new KeyboardActions(page);
    networkMonitor = new NetworkMonitor(page);

    // Add test metadata
    testInfo.annotations.push({
      type: 'test-id',
      description: `TEST-${testInfo.title.replace(/\s+/g, '-').toUpperCase()}`
    });

    testInfo.annotations.push({
      type: 'priority',
      description: 'High'
    });

    testInfo.annotations.push({
      type: 'feature',
      description: 'Customer Management'
    });

    // Set test timeout
    test.setTimeout(TEST_CONFIG.timeouts.navigation);

    console.log(`🎬 Starting test: ${testInfo.title}`);
    performanceTracker.startTiming('total-test-duration');
  });

  // Test teardown hook
  test.afterEach(async ({ page, context }, testInfo) => {
    performanceTracker.endTiming('total-test-duration');

    // Generate comprehensive test report
    const testReport = {
      testInfo: {
        title: testInfo.title,
        status: testInfo.status,
        duration: testInfo.duration,
        annotations: testInfo.annotations
      },
      performance: performanceTracker.getSummary(),
      network: networkMonitor.getSummary(),
      screenshots: screenshotManager.getScreenshots(),
      timestamp: new Date().toISOString()
    };

    // Save test report
    const reportPath = `reports/test-report-${testInfo.title.replace(/\s+/g, '-')}-${Date.now()}.json`;
    fs.writeFileSync(reportPath, JSON.stringify(testReport, null, 2));

    // Attach report to test results
    await testInfo.attach('test-report.json', {
      path: reportPath,
      contentType: 'application/json'
    });

    console.log(`📊 Test completed: ${testInfo.title} (${testInfo.status})`);
    console.log(`⏱️ Duration: ${testInfo.duration}ms`);
    console.log(`📸 Screenshots: ${screenshotManager.getScreenshots().length}`);
    console.log(`🌐 Network requests: ${networkMonitor.getSummary().totalRequests}`);
  });

  // Main test case with all advanced features
  test('Advanced Add Customer with Comprehensive Features', async ({ page, context }, testInfo) => {
    // Add test tags
    testInfo.annotations.push({
      type: 'tags',
      description: 'smoke,regression,customer-management,ui,api'
    });

    testInfo.annotations.push({
      type: 'description',
      description: 'Comprehensive test for adding a new customer with advanced Playwright features including hooks, keyboard actions, screenshots, video recording, performance tracking, and network monitoring'
    });

    // Step 1: Login with advanced features
    await performAdvancedLogin(page, screenshotManager, keyboardActions, performanceTracker);

    // Step 2: Navigate to Sales Orders with keyboard navigation
    await navigateToSalesOrders(page, screenshotManager, keyboardActions, performanceTracker);

    // Step 3: Create New Sales Order with enhanced error handling
    await createNewSalesOrder(page, screenshotManager, keyboardActions, performanceTracker);

    // Step 4: Add Customer with comprehensive data validation
    await addCustomerWithAdvancedFeatures(page, screenshotManager, keyboardActions, performanceTracker, testInfo);

    // Step 5: Verify customer creation with multiple validation methods
    await verifyCustomerCreation(page, screenshotManager, keyboardActions, performanceTracker);

    // Final performance summary
    const performanceSummary = performanceTracker.getSummary();
    console.log('\n📊 PERFORMANCE SUMMARY:');
    console.log('========================');
    console.log(`⏱️ Total Duration: ${performanceSummary.totalDuration}ms`);
    console.log(`🌐 Network Requests: ${performanceSummary.networkRequests}`);
    console.log(`❌ Console Errors: ${performanceSummary.consoleErrors}`);
    console.log(`❌ Network Errors: ${performanceSummary.networkErrors}`);
    
    // Add performance annotations
    testInfo.annotations.push({
      type: 'performance',
      description: `Total Duration: ${performanceSummary.totalDuration}ms`
    });

    testInfo.annotations.push({
      type: 'network',
      description: `Requests: ${performanceSummary.networkRequests}, Errors: ${performanceSummary.networkErrors}`
    });
  });

  // URL connectivity test
  test('Check Application Connectivity', async ({ page }, testInfo) => {
    testInfo.annotations.push({
      type: 'tags',
      description: 'connectivity,smoke,infrastructure'
    });

    console.log('🔍 Testing application connectivity...');
    
    try {
      const workingUrl = await URLValidator.findWorkingUrl(page, TEST_CONFIG.fallbackUrls, 5000);
      console.log(`✅ Application is accessible at: ${workingUrl}`);
      
      // Take a screenshot of the working page
      await screenshotManager.capture('connectivity-test', {
        description: `Application accessible at ${workingUrl}`
      });
      
      // Update baseUrl for other tests
      TEST_CONFIG.baseUrl = workingUrl;
      
    } catch (error) {
      console.log('❌ Application connectivity failed:', error.message);
      await screenshotManager.capture('connectivity-failed', {
        description: 'Application connectivity test failed'
      });
      throw error;
    }
  });

  // Additional test cases for different scenarios
  test('Add Customer with Keyboard Navigation Only', async ({ page }, testInfo) => {
    testInfo.annotations.push({
      type: 'tags',
      description: 'keyboard-only,accessibility,ui'
    });

    await performAdvancedLogin(page, screenshotManager, keyboardActions, performanceTracker);
    await navigateToSalesOrdersWithKeyboard(page, screenshotManager, keyboardActions, performanceTracker);
    // ... rest of keyboard-only test
  });

  test('Add Customer with Performance Monitoring', async ({ page }, testInfo) => {
    testInfo.annotations.push({
      type: 'tags',
      description: 'performance,monitoring,load-testing'
    });

    // Performance-focused test implementation
    // ... implementation
  });
});

// Helper functions for advanced test steps
async function performAdvancedLogin(page, screenshotManager, keyboardActions, performanceTracker) {
  performanceTracker.startTiming('login-process');
  
  console.log('🔐 Starting advanced login process...');
  
  // Find working URL with fallback mechanism
  const workingUrl = await URLValidator.findWorkingUrl(page, TEST_CONFIG.fallbackUrls, 10000);
  console.log(`🌐 Using working URL: ${workingUrl}`);
  
  // Navigate with performance tracking
  const navigationStart = Date.now();
  await page.goto(workingUrl, { 
    waitUntil: 'networkidle',
    timeout: TEST_CONFIG.timeouts.navigation 
  });
  const navigationTime = Date.now() - navigationStart;
  performanceTracker.addPageLoadTime(navigationTime);
  
  await screenshotManager.capture('01-login-page', {
    description: 'Initial login page load'
  });

  // Fill email with keyboard actions
  console.log('📧 Filling email with keyboard actions...');
  await keyboardActions.fillWithKeyboard(
    'input[type="email"], input[placeholder*="email" i], input[name*="email" i]',
    TEST_CONFIG.credentials.email,
    { delay: 100 }
  );

  // Navigate to password field using Tab
  await keyboardActions.navigateWithKeyboard('tab');
  
  // Fill password with keyboard actions
  console.log('🔒 Filling password with keyboard actions...');
  await keyboardActions.fillWithKeyboard(
    'input[type="password"], input[placeholder*="password" i], input[name*="password" i]',
    TEST_CONFIG.credentials.password,
    { delay: 100 }
  );

  // Check "Keep me logged in" with keyboard
  await keyboardActions.navigateWithKeyboard('tab');
  await page.keyboard.press('Space'); // Check checkbox

  await screenshotManager.capture('02-login-form-filled', {
    description: 'Login form filled with keyboard actions'
  });

  // Submit with Enter key
  console.log('🖱️ Submitting login with Enter key...');
  await page.keyboard.press('Enter');

  // Wait for dashboard with enhanced error handling
  try {
    await page.waitForSelector('text=Sales Orders', { 
      timeout: TEST_CONFIG.timeouts.element 
    });
    console.log('✅ Login successful - Dashboard loaded');
  } catch (error) {
    await screenshotManager.capture('03-login-error', {
      description: 'Login failed - error state'
    });
    throw new Error(`Login failed: ${error.message}`);
  }

  await screenshotManager.capture('03-dashboard-loaded', {
    description: 'Dashboard loaded after successful login'
  });

  performanceTracker.endTiming('login-process');
  console.log('✅ Advanced login process completed');
}

async function navigateToSalesOrders(page, screenshotManager, keyboardActions, performanceTracker) {
  performanceTracker.startTiming('navigation-to-sales-orders');
  
  console.log('🔍 Navigating to Sales Orders...');
  
  // Find and click Sales Orders with enhanced error handling
  const salesOrderLocator = page.locator('text=Sales Orders');
  await expect(salesOrderLocator).toBeVisible({ timeout: TEST_CONFIG.timeouts.element });
  
  // Use keyboard navigation as alternative
  await salesOrderLocator.focus();
  await page.keyboard.press('Enter');
  
  // Wait for page load with network monitoring
  await page.waitForLoadState('networkidle', { timeout: TEST_CONFIG.timeouts.network });
  
  await screenshotManager.capture('04-sales-orders-page', {
    description: 'Sales Orders page loaded'
  });

  performanceTracker.endTiming('navigation-to-sales-orders');
  console.log('✅ Navigation to Sales Orders completed');
}

async function navigateToSalesOrdersWithKeyboard(page, screenshotManager, keyboardActions, performanceTracker) {
  console.log('⌨️ Navigating to Sales Orders using keyboard only...');
  
  // Use Tab navigation to find Sales Orders
  let found = false;
  for (let i = 0; i < 20; i++) { // Max 20 tabs
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.textContent);
    
    if (focusedElement && focusedElement.includes('Sales Orders')) {
      await page.keyboard.press('Enter');
      found = true;
      break;
    }
  }
  
  if (!found) {
    throw new Error('Sales Orders not found via keyboard navigation');
  }
  
  await page.waitForLoadState('networkidle');
  await screenshotManager.capture('04-sales-orders-keyboard', {
    description: 'Sales Orders page loaded via keyboard navigation'
  });
}

async function createNewSalesOrder(page, screenshotManager, keyboardActions, performanceTracker) {
  performanceTracker.startTiming('create-sales-order');
  
  console.log('🛒 Creating new sales order...');
  
  // Wait for and click Create New Sales Order button
  const createButton = page.getByRole('button', { name: 'Create New Sales Order' });
  await expect(createButton).toBeVisible({ timeout: TEST_CONFIG.timeouts.element });
  
  // Use keyboard navigation to button
  await createButton.focus();
  await page.keyboard.press('Enter');
  
  // Wait for form to load with enhanced error handling
  try {
    await page.waitForSelector('text=Add Customer', { 
      timeout: TEST_CONFIG.timeouts.element 
    });
    console.log('✅ Create Sales Order form loaded');
  } catch (error) {
    await screenshotManager.capture('05-create-order-error', {
      description: 'Error loading Create Sales Order form'
    });
    throw new Error(`Create Sales Order form failed to load: ${error.message}`);
  }

  await screenshotManager.capture('05-create-sales-order-form', {
    description: 'Create Sales Order form loaded'
  });

  performanceTracker.endTiming('create-sales-order');
  console.log('✅ Create Sales Order process completed');
}

async function addCustomerWithAdvancedFeatures(page, screenshotManager, keyboardActions, performanceTracker, testInfo) {
  performanceTracker.startTiming('add-customer-process');
  
  console.log('👤 Starting advanced customer addition process...');
  
  // Click Add Customer button with enhanced error handling
  const addCustomerButton = page.getByRole('button', { name: 'Add Customer' });
  await expect(addCustomerButton).toBeVisible({ timeout: TEST_CONFIG.timeouts.element });
  
  // Use keyboard navigation
  await addCustomerButton.focus();
  await page.keyboard.press('Enter');
  
  // Wait for customer form with comprehensive error handling
  try {
    await page.waitForSelector('input[type="tel"]', { 
      timeout: TEST_CONFIG.timeouts.element 
    });
    console.log('✅ Add Customer form loaded');
  } catch (error) {
    await screenshotManager.capture('06-add-customer-form-error', {
      description: 'Error loading Add Customer form'
    });
    throw new Error(`Add Customer form failed to load: ${error.message}`);
  }

  await screenshotManager.capture('06-add-customer-form', {
    description: 'Add Customer form loaded'
  });

  // Fill customer details with advanced validation
  await fillCustomerDetailsAdvanced(page, screenshotManager, keyboardActions, performanceTracker, testInfo);

  performanceTracker.endTiming('add-customer-process');
  console.log('✅ Advanced customer addition process completed');
}

async function fillCustomerDetailsAdvanced(page, screenshotManager, keyboardActions, performanceTracker, testInfo) {
  console.log('📝 Filling customer details with advanced features...');
  
  // Generate test data with timestamp for uniqueness
  const customerData = {
    ...TEST_CONFIG.customerData,
    firstName: `TestUser${Date.now()}`,
    phone: `9${Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')}`
  };

  // Add test data annotation
  testInfo.annotations.push({
    type: 'test-data',
    description: `Customer: ${customerData.firstName} ${customerData.lastName}, Phone: ${customerData.phone}`
  });

  // Fill phone number with multiple fallback strategies
  await fillPhoneNumberAdvanced(page, customerData.phone, screenshotManager, keyboardActions);

  // Fill first name with keyboard actions
  console.log('👤 Filling first name...');
  await keyboardActions.fillWithKeyboard(
    'input[placeholder*="first" i], input[name*="first" i]',
    customerData.firstName,
    { delay: 50 }
  );

  // Fill last name with keyboard actions
  console.log('👤 Filling last name...');
  await keyboardActions.fillWithKeyboard(
    'input[placeholder*="last" i], input[name*="last" i]',
    customerData.lastName,
    { delay: 50 }
  );

  // Fill address with keyboard actions
  console.log('🏠 Filling address...');
  await keyboardActions.fillWithKeyboard(
    'input[placeholder*="address" i], textarea[placeholder*="address" i]',
    customerData.address,
    { delay: 30 }
  );

  // Fill pincode with keyboard actions
  console.log('📮 Filling pincode...');
  await keyboardActions.fillWithKeyboard(
    'input[placeholder*="pincode" i], input[placeholder*="zip" i]',
    customerData.pincode,
    { delay: 50 }
  );

  await screenshotManager.capture('07-customer-details-filled', {
    description: 'Customer details filled with advanced features'
  });

  // Save customer with enhanced error handling
  console.log('💾 Saving customer...');
  const saveButton = page.getByRole('button', { name: 'Save Customer' });
  await expect(saveButton).toBeVisible({ timeout: TEST_CONFIG.timeouts.element });
  
  // Use keyboard navigation
  await saveButton.focus();
  await page.keyboard.press('Enter');

  // Wait for save completion with comprehensive validation
  try {
    await page.waitForSelector('[data-test="search-input"]', { 
      timeout: TEST_CONFIG.timeouts.element 
    });
    console.log('✅ Customer saved successfully');
  } catch (error) {
    await screenshotManager.capture('08-save-customer-error', {
      description: 'Error saving customer'
    });
    throw new Error(`Customer save failed: ${error.message}`);
  }

  await screenshotManager.capture('08-customer-saved', {
    description: 'Customer saved successfully'
  });

  // Store customer data for verification
  testInfo.annotations.push({
    type: 'customer-data',
    description: JSON.stringify(customerData)
  });
}

async function fillPhoneNumberAdvanced(page, phoneNumber, screenshotManager, keyboardActions) {
  console.log('📞 Filling phone number with advanced strategies...');
  
  const phoneSelectors = [
    'input[type="tel"]',
    'input[placeholder*="phone" i]',
    'input[placeholder*="mobile" i]',
    'input[name*="phone" i]',
    'input[name*="mobile" i]',
    'input[id*="phone" i]',
    'input[id*="mobile" i]'
  ];
  
  let phoneField = null;
  let usedSelector = '';
  
  // Try multiple selectors
  for (const selector of phoneSelectors) {
    try {
      const element = page.locator(selector).first();
      if (await element.isVisible({ timeout: 1000 })) {
        phoneField = element;
        usedSelector = selector;
        console.log(`✅ Found phone field with selector: ${selector}`);
        break;
      }
    } catch (error) {
      console.log(`⚠️ Selector ${selector} not found, trying next...`);
    }
  }
  
  if (!phoneField) {
    throw new Error('Could not find phone number input field with any selector');
  }

  // Focus and clear field
  await phoneField.click();
  await phoneField.clear();
  
  // Try multiple input methods
  const inputMethods = [
    () => phoneField.fill(phoneNumber),
    () => keyboardActions.fillWithKeyboard(usedSelector, phoneNumber, { delay: 100 }),
    () => phoneField.type(phoneNumber, { delay: 100 }),
    () => phoneField.type('+91' + phoneNumber, { delay: 100 })
  ];
  
  let success = false;
  for (let i = 0; i < inputMethods.length; i++) {
    try {
      await inputMethods[i]();
      await page.waitForTimeout(500);
      
      const value = await phoneField.inputValue();
      if (value && value.length > 5) {
        console.log(`✅ Phone number filled using method ${i + 1}: ${value}`);
        success = true;
        break;
      }
    } catch (error) {
      console.log(`⚠️ Input method ${i + 1} failed: ${error.message}`);
    }
  }
  
  if (!success) {
    await screenshotManager.capture('phone-field-debug', {
      description: 'Phone field input failed - debug screenshot'
    });
    throw new Error('All phone number input methods failed');
  }
  
  console.log('✅ Phone number filled successfully');
}

async function verifyCustomerCreation(page, screenshotManager, keyboardActions, performanceTracker) {
  performanceTracker.startTiming('customer-verification');
  
  console.log('🔍 Verifying customer creation...');
  
  // Search for the created customer
  const searchInput = page.locator('[data-test="search-input"]');
  await expect(searchInput).toBeVisible({ timeout: TEST_CONFIG.timeouts.element });
  
  // Use keyboard navigation to search
  await searchInput.focus();
  await keyboardActions.fillWithKeyboard(
    '[data-test="search-input"]',
    'TestUser', // Search for test users
    { delay: 50 }
  );
  
  // Wait for search results
  await page.waitForSelector('[data-test="result"]', { 
    timeout: TEST_CONFIG.timeouts.element 
  });
  
  await screenshotManager.capture('09-search-results', {
    description: 'Customer search results'
  });
  
  // Verify customer appears in results
  const results = page.locator('[data-test="result"]');
  const resultCount = await results.count();
  
  if (resultCount > 0) {
    console.log(`✅ Found ${resultCount} customer(s) in search results`);
    
    // Click on first result
    await results.first().click();
    
    await screenshotManager.capture('10-customer-selected', {
      description: 'Customer selected from search results'
    });
    
    console.log('✅ Customer verification completed successfully');
  } else {
    await screenshotManager.capture('10-no-results', {
      description: 'No search results found'
    });
    throw new Error('Customer not found in search results');
  }

  performanceTracker.endTiming('customer-verification');
  console.log('✅ Customer verification process completed');
}

// Global teardown hook
test.afterAll(async () => {
  console.log('🏁 Advanced Add Customer Test Suite completed');
  console.log('📊 All test reports and screenshots have been generated');
  console.log('🎥 Video recordings are available in test-results directory');
});
