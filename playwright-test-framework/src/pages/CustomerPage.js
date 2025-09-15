/**
 * Customer Page Object Model
 * 
 * This class handles all interactions with customer-related pages.
 * It includes functionality for adding, editing, searching, and managing customers.
 */

import { BasePage } from '../utils/BasePage.js';
import { expect } from '@playwright/test';

export class CustomerPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Load selectors from config
    this.selectors = {
      // Navigation
      addButton: "button:has-text('Add Customer'), [data-test='add-customer']",
      searchInput: "input[placeholder*='search' i], [data-test='search-input']",
      searchButton: "button:has-text('Search'), [data-test='search-button']",
      
      // Customer form
      firstName: "input[placeholder*='first' i], input[name*='first' i], [data-test='first-name']",
      lastName: "input[placeholder*='last' i], input[name*='last' i], [data-test='last-name']",
      email: "input[type='email'], input[placeholder*='email' i], [data-test='email']",
      phone: "input[type='tel'], input[placeholder*='phone' i], input[placeholder*='mobile' i], [data-test='phone']",
      address: "input[placeholder*='address' i], textarea[placeholder*='address' i], [data-test='address']",
      pincode: "input[placeholder*='pincode' i], input[placeholder*='zip' i], [data-test='pincode']",
      
      // Form buttons
      saveButton: "button:has-text('Save Customer'), [data-test='save-customer']",
      cancelButton: "button:has-text('Cancel'), [data-test='cancel-customer']",
      editButton: "button:has-text('Edit'), [data-test='edit-customer']",
      deleteButton: "button:has-text('Delete'), [data-test='delete-customer']",
      
      // Customer list
      table: "table, [data-test='customer-table']",
      tableRow: "tr, [data-test='customer-row']",
      searchResult: "[data-test='result'], .search-result",
      
      // Validation
      errorMessage: ".error-message, .invalid-feedback, [data-test='error-message']",
      successMessage: ".success-message, .alert-success, [data-test='success-message']",
      
      // Loading
      loading: ".loading, .spinner, [data-test='loading']"
    };
  }

  /**
   * Navigate to customer page
   * @param {string} baseUrl - Base URL of the application
   */
  async goto(baseUrl) {
    const customerUrl = `${baseUrl}/customers`;
    await super.goto(customerUrl);
    await this.waitForPageLoad();
  }

  /**
   * Wait for customer page to load
   */
  async waitForPageLoad() {
    console.log('⏳ Waiting for customer page to load...');
    await this.waitForElement(this.selectors.addButton);
    console.log('✅ Customer page loaded successfully');
  }

  /**
   * Click Add Customer button
   */
  async clickAddCustomer() {
    console.log('🖱️ Clicking Add Customer button...');
    await this.click(this.selectors.addButton);
    await this.waitForCustomerForm();
    console.log('✅ Add Customer button clicked');
  }

  /**
   * Wait for customer form to load
   */
  async waitForCustomerForm() {
    console.log('⏳ Waiting for customer form to load...');
    await this.waitForElement(this.selectors.firstName);
    await this.waitForElement(this.selectors.saveButton);
    console.log('✅ Customer form loaded');
  }

  /**
   * Fill customer first name
   * @param {string} firstName - First name
   */
  async fillFirstName(firstName) {
    console.log(`👤 Filling first name: ${firstName}`);
    await this.fill(this.selectors.firstName, firstName);
    console.log('✅ First name filled');
  }

  /**
   * Fill customer last name
   * @param {string} lastName - Last name
   */
  async fillLastName(lastName) {
    console.log(`👤 Filling last name: ${lastName}`);
    await this.fill(this.selectors.lastName, lastName);
    console.log('✅ Last name filled');
  }

  /**
   * Fill customer email
   * @param {string} email - Email address
   */
  async fillEmail(email) {
    console.log(`📧 Filling email: ${email}`);
    await this.fill(this.selectors.email, email);
    console.log('✅ Email filled');
  }

  /**
   * Fill customer phone number
   * @param {string} phone - Phone number
   */
  async fillPhone(phone) {
    console.log(`📞 Filling phone: ${phone}`);
    
    // Try multiple approaches for phone field
    const phoneSelectors = [
      this.selectors.phone,
      'input[type="tel"]',
      'input[placeholder*="phone" i]',
      'input[placeholder*="mobile" i]'
    ];
    
    let success = false;
    for (const selector of phoneSelectors) {
      try {
        await this.fill(selector, phone);
        await this.wait(500);
        const value = await this.getValue(selector);
        if (value && value.length > 5) {
          console.log(`✅ Phone filled using selector: ${selector}`);
          success = true;
          break;
        }
      } catch (error) {
        console.log(`⚠️ Selector failed: ${selector}`);
        continue;
      }
    }
    
    if (!success) {
      console.log('⚠️ All phone selectors failed, trying keyboard input...');
      await this.type('input[type="tel"]', phone, { delay: 100 });
    }
  }

  /**
   * Fill customer address
   * @param {string} address - Address
   */
  async fillAddress(address) {
    console.log(`🏠 Filling address: ${address}`);
    await this.fill(this.selectors.address, address);
    console.log('✅ Address filled');
  }

  /**
   * Fill customer pincode
   * @param {string} pincode - Pincode
   */
  async fillPincode(pincode) {
    console.log(`📮 Filling pincode: ${pincode}`);
    await this.fill(this.selectors.pincode, pincode);
    console.log('✅ Pincode filled');
  }

  /**
   * Fill complete customer form
   * @param {object} customerData - Customer data object
   */
  async fillCustomerForm(customerData) {
    console.log('📝 Filling complete customer form...');
    
    if (customerData.firstName) {
      await this.fillFirstName(customerData.firstName);
    }
    
    if (customerData.lastName) {
      await this.fillLastName(customerData.lastName);
    }
    
    if (customerData.email) {
      await this.fillEmail(customerData.email);
    }
    
    if (customerData.phone) {
      await this.fillPhone(customerData.phone);
    }
    
    if (customerData.address) {
      await this.fillAddress(customerData.address);
    }
    
    if (customerData.pincode) {
      await this.fillPincode(customerData.pincode);
    }
    
    // Take screenshot of filled form
    await this.screenshot('customer-form-filled');
    console.log('✅ Customer form filled completely');
  }

  /**
   * Click Save Customer button
   */
  async clickSaveCustomer() {
    console.log('💾 Clicking Save Customer button...');
    await this.click(this.selectors.saveButton);
    console.log('✅ Save Customer button clicked');
  }

  /**
   * Save customer and wait for success
   * @param {object} customerData - Customer data
   */
  async saveCustomer(customerData) {
    console.log('💾 Saving customer...');
    
    // Fill the form
    await this.fillCustomerForm(customerData);
    
    // Take screenshot before saving
    await this.screenshot('customer-before-save');
    
    // Click save button
    await this.clickSaveCustomer();
    
    // Wait for save to complete
    await this.waitForSaveComplete();
    
    console.log('✅ Customer saved successfully');
  }

  /**
   * Wait for save operation to complete
   */
  async waitForSaveComplete() {
    console.log('⏳ Waiting for save to complete...');
    
    try {
      // Wait for either success message or return to customer list
      await Promise.race([
        this.waitForElement(this.selectors.successMessage, { timeout: 10000 }),
        this.waitForElement(this.selectors.searchInput, { timeout: 10000 })
      ]);
      
      console.log('✅ Save operation completed');
    } catch (error) {
      console.log('⚠️ Save completion timeout, but continuing...');
    }
  }

  /**
   * Search for customer
   * @param {string} searchTerm - Search term
   */
  async searchCustomer(searchTerm) {
    console.log(`🔍 Searching for customer: ${searchTerm}`);
    
    await this.fill(this.selectors.searchInput, searchTerm);
    await this.pressKey('Enter');
    
    // Wait for search results
    await this.wait(2000);
    
    console.log('✅ Customer search completed');
  }

  /**
   * Get search results
   * @returns {Array} - Array of search result elements
   */
  async getSearchResults() {
    try {
      const results = await this.page.locator(this.selectors.searchResult).all();
      console.log(`📋 Found ${results.length} search results`);
      return results;
    } catch (error) {
      console.log('⚠️ No search results found');
      return [];
    }
  }

  /**
   * Click on first search result
   */
  async clickFirstSearchResult() {
    console.log('🖱️ Clicking first search result...');
    const results = await this.getSearchResults();
    
    if (results.length > 0) {
      await results[0].click();
      console.log('✅ First search result clicked');
    } else {
      throw new Error('No search results found to click');
    }
  }

  /**
   * Verify customer was added
   * @param {object} customerData - Customer data to verify
   */
  async verifyCustomerAdded(customerData) {
    console.log('🔍 Verifying customer was added...');
    
    // Search for the customer
    await this.searchCustomer(customerData.firstName);
    
    // Check if search results contain the customer
    const results = await this.getSearchResults();
    
    if (results.length > 0) {
      console.log('✅ Customer found in search results');
      await this.screenshot('customer-search-results');
      return true;
    } else {
      console.log('❌ Customer not found in search results');
      await this.screenshot('customer-not-found');
      return false;
    }
  }

  /**
   * Clear customer form
   */
  async clearCustomerForm() {
    console.log('🧹 Clearing customer form...');
    
    const fields = [
      this.selectors.firstName,
      this.selectors.lastName,
      this.selectors.email,
      this.selectors.phone,
      this.selectors.address,
      this.selectors.pincode
    ];
    
    for (const field of fields) {
      try {
        await this.fill(field, '');
      } catch (error) {
        console.log(`⚠️ Could not clear field: ${field}`);
      }
    }
    
    console.log('✅ Customer form cleared');
  }

  /**
   * Get customer form data
   * @returns {object} - Current form data
   */
  async getCustomerFormData() {
    console.log('📋 Getting customer form data...');
    
    const formData = {
      firstName: await this.getValue(this.selectors.firstName),
      lastName: await this.getValue(this.selectors.lastName),
      email: await this.getValue(this.selectors.email),
      phone: await this.getValue(this.selectors.phone),
      address: await this.getValue(this.selectors.address),
      pincode: await this.getValue(this.selectors.pincode)
    };
    
    console.log('✅ Customer form data retrieved:', formData);
    return formData;
  }

  /**
   * Validate customer form
   * @param {object} customerData - Customer data to validate
   * @returns {object} - Validation result
   */
  async validateCustomerForm(customerData) {
    console.log('✅ Validating customer form...');
    
    const validation = {
      isValid: true,
      errors: []
    };
    
    // Validate required fields
    if (!customerData.firstName) {
      validation.errors.push('First name is required');
      validation.isValid = false;
    }
    
    if (!customerData.lastName) {
      validation.errors.push('Last name is required');
      validation.isValid = false;
    }
    
    if (!customerData.phone) {
      validation.errors.push('Phone number is required');
      validation.isValid = false;
    }
    
    // Validate email format if provided
    if (customerData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(customerData.email)) {
        validation.errors.push('Invalid email format');
        validation.isValid = false;
      }
    }
    
    console.log(`✅ Validation result: ${validation.isValid ? 'Valid' : 'Invalid'}`, validation.errors);
    return validation;
  }

  /**
   * Check if error message is visible
   * @returns {boolean} - True if error message is visible
   */
  async hasErrorMessage() {
    return await this.isVisible(this.selectors.errorMessage);
  }

  /**
   * Get error message text
   * @returns {string} - Error message text
   */
  async getErrorMessage() {
    try {
      const errorText = await this.getText(this.selectors.errorMessage);
      console.log(`❌ Error message: ${errorText}`);
      return errorText;
    } catch (error) {
      console.log('⚠️ No error message found');
      return '';
    }
  }

  /**
   * Check if success message is visible
   * @returns {boolean} - True if success message is visible
   */
  async hasSuccessMessage() {
    return await this.isVisible(this.selectors.successMessage);
  }

  /**
   * Get success message text
   * @returns {string} - Success message text
   */
  async getSuccessMessage() {
    try {
      const successText = await this.getText(this.selectors.successMessage);
      console.log(`✅ Success message: ${successText}`);
      return successText;
    } catch (error) {
      console.log('⚠️ No success message found');
      return '';
    }
  }

  /**
   * Assert customer form is loaded
   */
  async assertCustomerFormLoaded() {
    console.log('✅ Asserting customer form is loaded...');
    await this.assertVisible(this.selectors.firstName);
    await this.assertVisible(this.selectors.saveButton);
  }

  /**
   * Assert customer was added successfully
   * @param {object} customerData - Customer data
   */
  async assertCustomerAdded(customerData) {
    console.log('✅ Asserting customer was added...');
    const isAdded = await this.verifyCustomerAdded(customerData);
    expect(isAdded).toBe(true);
  }

  /**
   * Assert error message is displayed
   * @param {string} expectedMessage - Expected error message
   */
  async assertErrorMessage(expectedMessage = null) {
    console.log('✅ Asserting error message is displayed...');
    await this.assertVisible(this.selectors.errorMessage);
    
    if (expectedMessage) {
      await this.assertText(this.selectors.errorMessage, expectedMessage);
    }
  }

  /**
   * Complete customer addition workflow
   * @param {object} customerData - Customer data
   * @param {boolean} validate - Whether to validate the addition
   */
  async addCustomerComplete(customerData, validate = true) {
    console.log('👤 Starting complete customer addition workflow...');
    
    // Navigate to add customer
    await this.clickAddCustomer();
    
    // Validate form data
    const validation = await this.validateCustomerForm(customerData);
    if (!validation.isValid) {
      throw new Error(`Invalid customer data: ${validation.errors.join(', ')}`);
    }
    
    // Save customer
    await this.saveCustomer(customerData);
    
    // Verify addition if requested
    if (validate) {
      await this.assertCustomerAdded(customerData);
    }
    
    console.log('✅ Complete customer addition workflow finished');
  }
}
