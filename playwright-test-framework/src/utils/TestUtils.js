/**
 * Test Utilities - Common helper functions for tests
 * 
 * This class provides utility functions that can be used across different tests.
 * It includes data generation, validation, file operations, and more.
 */

import fs from 'fs';
import path from 'path';

export class TestUtils {
  constructor(page) {
    this.page = page;
  }

  /**
   * Generate random test data
   * @param {string} type - Type of data to generate
   * @returns {object} - Generated test data
   */
  generateTestData(type = 'customer') {
    const timestamp = Date.now();
    const randomId = Math.floor(Math.random() * 10000);
    
    const dataGenerators = {
      customer: () => ({
        firstName: `TestUser${timestamp}`,
        lastName: `LastName${timestamp}`,
        email: `testuser${timestamp}@example.com`,
        phone: `9${Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')}`,
        address: `Test Address ${timestamp}, Test City, Test State 12345`,
        pincode: '12345'
      }),
      
      user: () => ({
        firstName: `User${timestamp}`,
        lastName: `Test${timestamp}`,
        email: `user${timestamp}@test.com`,
        password: `Password${timestamp}!`,
        username: `user${timestamp}`
      }),
      
      product: () => ({
        name: `Test Product ${timestamp}`,
        description: `This is a test product created at ${new Date().toISOString()}`,
        price: (Math.random() * 1000 + 10).toFixed(2),
        category: 'Test Category',
        sku: `SKU-${timestamp}`
      }),
      
      order: () => ({
        quantity: Math.floor(Math.random() * 10) + 1,
        notes: `Test order notes - ${timestamp}`,
        priority: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)]
      })
    };

    const generator = dataGenerators[type] || dataGenerators.customer;
    const data = generator();
    
    console.log(`🎲 Generated ${type} test data:`, data);
    return data;
  }

  /**
   * Generate random email
   * @param {string} domain - Email domain
   * @returns {string} - Random email
   */
  generateEmail(domain = 'example.com') {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const email = `test${timestamp}${randomString}@${domain}`;
    console.log(`📧 Generated email: ${email}`);
    return email;
  }

  /**
   * Generate random phone number
   * @param {string} countryCode - Country code
   * @returns {string} - Random phone number
   */
  generatePhoneNumber(countryCode = '91') {
    const randomNumber = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
    const phone = `${countryCode}${randomNumber}`;
    console.log(`📞 Generated phone: ${phone}`);
    return phone;
  }

  /**
   * Generate random string
   * @param {number} length - String length
   * @param {string} prefix - String prefix
   * @returns {string} - Random string
   */
  generateRandomString(length = 10, prefix = '') {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = prefix;
    
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    console.log(`🔤 Generated random string: ${result}`);
    return result;
  }

  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} - True if valid
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    console.log(`📧 Email validation: ${email} = ${isValid}`);
    return isValid;
  }

  /**
   * Validate phone number format
   * @param {string} phone - Phone number to validate
   * @returns {boolean} - True if valid
   */
  isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const isValid = phoneRegex.test(phone.replace(/\s/g, ''));
    console.log(`📞 Phone validation: ${phone} = ${isValid}`);
    return isValid;
  }

  /**
   * Wait for element with retry logic
   * @param {string} selector - Element selector
   * @param {number} maxRetries - Maximum retry attempts
   * @param {number} delay - Delay between retries
   * @returns {boolean} - True if element found
   */
  async waitForElementWithRetry(selector, maxRetries = 3, delay = 1000) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        console.log(`⏳ Attempt ${i + 1}/${maxRetries} - Waiting for: ${selector}`);
        await this.page.waitForSelector(selector, { timeout: 5000 });
        console.log(`✅ Element found: ${selector}`);
        return true;
      } catch (error) {
        console.log(`⚠️ Attempt ${i + 1} failed: ${error.message}`);
        if (i < maxRetries - 1) {
          await this.page.waitForTimeout(delay);
        }
      }
    }
    console.log(`❌ Element not found after ${maxRetries} attempts: ${selector}`);
    return false;
  }

  /**
   * Try multiple selectors until one works
   * @param {Array} selectors - Array of selectors to try
   * @param {string} action - Action to perform ('click', 'fill', 'wait')
   * @param {string} value - Value for fill action
   * @returns {boolean} - True if action succeeded
   */
  async tryMultipleSelectors(selectors, action, value = null) {
    for (const selector of selectors) {
      try {
        console.log(`🔍 Trying selector: ${selector}`);
        
        switch (action) {
          case 'click':
            await this.page.click(selector);
            break;
          case 'fill':
            await this.page.fill(selector, value);
            break;
          case 'wait':
            await this.page.waitForSelector(selector, { timeout: 5000 });
            break;
          case 'visible':
            if (await this.page.isVisible(selector)) {
              console.log(`✅ Selector worked: ${selector}`);
              return true;
            }
            continue;
        }
        
        console.log(`✅ Action succeeded with selector: ${selector}`);
        return true;
      } catch (error) {
        console.log(`⚠️ Selector failed: ${selector} - ${error.message}`);
        continue;
      }
    }
    
    console.log(`❌ All selectors failed for action: ${action}`);
    return false;
  }

  /**
   * Create test file
   * @param {string} filename - File name
   * @param {string} content - File content
   * @param {string} directory - Directory path
   */
  createTestFile(filename, content, directory = 'test-files') {
    try {
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }
      
      const filePath = path.join(directory, filename);
      fs.writeFileSync(filePath, content);
      console.log(`📁 Test file created: ${filePath}`);
      return filePath;
    } catch (error) {
      console.log(`❌ Failed to create test file: ${error.message}`);
      return null;
    }
  }

  /**
   * Delete test file
   * @param {string} filePath - File path to delete
   */
  deleteTestFile(filePath) {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`🗑️ Test file deleted: ${filePath}`);
        return true;
      }
      return false;
    } catch (error) {
      console.log(`❌ Failed to delete test file: ${error.message}`);
      return false;
    }
  }

  /**
   * Clean up test files
   * @param {string} directory - Directory to clean
   */
  cleanupTestFiles(directory = 'test-files') {
    try {
      if (fs.existsSync(directory)) {
        const files = fs.readdirSync(directory);
        files.forEach(file => {
          const filePath = path.join(directory, file);
          fs.unlinkSync(filePath);
        });
        console.log(`🧹 Cleaned up ${files.length} test files`);
      }
    } catch (error) {
      console.log(`❌ Failed to cleanup test files: ${error.message}`);
    }
  }

  /**
   * Get current timestamp
   * @param {string} format - Timestamp format
   * @returns {string} - Formatted timestamp
   */
  getTimestamp(format = 'iso') {
    const now = new Date();
    
    switch (format) {
      case 'iso':
        return now.toISOString();
      case 'readable':
        return now.toLocaleString();
      case 'filename':
        return now.toISOString().replace(/[:.]/g, '-');
      case 'unix':
        return now.getTime().toString();
      default:
        return now.toISOString();
    }
  }

  /**
   * Format date
   * @param {Date} date - Date to format
   * @param {string} format - Date format
   * @returns {string} - Formatted date
   */
  formatDate(date = new Date(), format = 'YYYY-MM-DD') {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    switch (format) {
      case 'YYYY-MM-DD':
        return `${year}-${month}-${day}`;
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`;
      case 'MM/DD/YYYY':
        return `${month}/${day}/${year}`;
      default:
        return `${year}-${month}-${day}`;
    }
  }

  /**
   * Generate test report data
   * @param {string} testName - Test name
   * @param {string} status - Test status
   * @param {object} data - Additional data
   * @returns {object} - Report data
   */
  generateTestReport(testName, status, data = {}) {
    const report = {
      testName,
      status,
      timestamp: this.getTimestamp(),
      duration: data.duration || 0,
      screenshots: data.screenshots || [],
      errors: data.errors || [],
      data: data.testData || {},
      environment: data.environment || 'unknown'
    };
    
    console.log(`📊 Generated test report for: ${testName}`);
    return report;
  }

  /**
   * Save test report to file
   * @param {object} report - Test report data
   * @param {string} filename - Report filename
   */
  saveTestReport(report, filename = null) {
    try {
      if (!filename) {
        filename = `test-report-${this.getTimestamp('filename')}.json`;
      }
      
      const reportsDir = 'reports';
      if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir, { recursive: true });
      }
      
      const filePath = path.join(reportsDir, filename);
      fs.writeFileSync(filePath, JSON.stringify(report, null, 2));
      console.log(`📄 Test report saved: ${filePath}`);
      return filePath;
    } catch (error) {
      console.log(`❌ Failed to save test report: ${error.message}`);
      return null;
    }
  }

  /**
   * Compare two objects
   * @param {object} obj1 - First object
   * @param {object} obj2 - Second object
   * @returns {object} - Comparison result
   */
  compareObjects(obj1, obj2) {
    const differences = [];
    const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
    
    for (const key of allKeys) {
      if (obj1[key] !== obj2[key]) {
        differences.push({
          key,
          value1: obj1[key],
          value2: obj2[key]
        });
      }
    }
    
    const result = {
      areEqual: differences.length === 0,
      differences,
      summary: `${differences.length} differences found`
    };
    
    console.log(`🔍 Object comparison: ${result.summary}`);
    return result;
  }

  /**
   * Generate random number in range
   * @param {number} min - Minimum value
   * @param {number} max - Maximum value
   * @returns {number} - Random number
   */
  randomNumber(min = 0, max = 100) {
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(`🎲 Generated random number: ${number} (range: ${min}-${max})`);
    return number;
  }

  /**
   * Generate random boolean
   * @returns {boolean} - Random boolean
   */
  randomBoolean() {
    const bool = Math.random() < 0.5;
    console.log(`🎲 Generated random boolean: ${bool}`);
    return bool;
  }

  /**
   * Pick random item from array
   * @param {Array} array - Array to pick from
   * @returns {*} - Random item
   */
  randomItem(array) {
    if (!array || array.length === 0) {
      console.log(`⚠️ Empty array provided for random selection`);
      return null;
    }
    
    const item = array[Math.floor(Math.random() * array.length)];
    console.log(`🎲 Selected random item: ${item}`);
    return item;
  }
}
