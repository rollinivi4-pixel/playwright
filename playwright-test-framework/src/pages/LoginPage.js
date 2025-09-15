/**
 * Login Page Object Model
 * 
 * This class handles all interactions with the login page.
 * It extends BasePage to inherit common functionality.
 */

import { BasePage } from '../utils/BasePage.js';
import { expect } from '@playwright/test';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Load selectors from config
    this.selectors = {
      email: "input[type='email'], input[placeholder*='email' i], input[name*='email' i], #email",
      password: "input[type='password'], input[placeholder*='password' i], input[name*='password' i], #password",
      checkbox: "input[type='checkbox'], [data-test='keep-logged-in']",
      loginButton: "button[type='submit'], button:has-text('Log in'), button:has-text('Login'), [data-test='login-button']",
      forgotPassword: "a:has-text('Forgot'), a:has-text('Reset'), [data-test='forgot-password']",
      errorMessage: ".error-message, .alert-danger, [data-test='login-error']",
      loading: ".loading, .spinner, [data-test='loading']"
    };
  }

  /**
   * Navigate to login page
   * @param {string} baseUrl - Base URL of the application
   */
  async goto(baseUrl) {
    const loginUrl = `${baseUrl}/login`;
    await super.goto(loginUrl);
    await this.waitForPageLoad();
  }

  /**
   * Wait for login page to load completely
   */
  async waitForPageLoad() {
    console.log('⏳ Waiting for login page to load...');
    await this.waitForElement(this.selectors.email);
    await this.waitForElement(this.selectors.password);
    await this.waitForElement(this.selectors.loginButton);
    console.log('✅ Login page loaded successfully');
  }

  /**
   * Fill email field
   * @param {string} email - Email address
   */
  async fillEmail(email) {
    console.log(`📧 Filling email: ${email}`);
    await this.fill(this.selectors.email, email);
    console.log('✅ Email filled successfully');
  }

  /**
   * Fill password field
   * @param {string} password - Password
   */
  async fillPassword(password) {
    console.log('🔒 Filling password...');
    await this.fill(this.selectors.password, password);
    console.log('✅ Password filled successfully');
  }

  /**
   * Check "Keep me logged in" checkbox
   */
  async checkKeepLoggedIn() {
    try {
      console.log('☑️ Checking "Keep me logged in" checkbox...');
      await this.check(this.selectors.checkbox);
      console.log('✅ Checkbox checked successfully');
    } catch (error) {
      console.log('⚠️ Could not find or check "Keep me logged in" checkbox');
    }
  }

  /**
   * Click login button
   */
  async clickLoginButton() {
    console.log('🖱️ Clicking login button...');
    await this.click(this.selectors.loginButton);
    console.log('✅ Login button clicked');
  }

  /**
   * Complete login process
   * @param {string} email - Email address
   * @param {string} password - Password
   * @param {boolean} keepLoggedIn - Whether to check "Keep me logged in"
   */
  async login(email, password, keepLoggedIn = true) {
    console.log('🔐 Starting login process...');
    
    // Fill email
    await this.fillEmail(email);
    
    // Fill password
    await this.fillPassword(password);
    
    // Check "Keep me logged in" if requested
    if (keepLoggedIn) {
      await this.checkKeepLoggedIn();
    }
    
    // Take screenshot before login
    await this.screenshot('login-form-filled');
    
    // Click login button
    await this.clickLoginButton();
    
    console.log('✅ Login process completed');
  }

  /**
   * Wait for login to complete and verify success
   * @param {string} successIndicator - Element that indicates successful login
   */
  async waitForLoginSuccess(successIndicator = 'text=Sales Orders') {
    console.log('⏳ Waiting for login to complete...');
    
    try {
      // Wait for success indicator
      await this.waitForText(successIndicator, { timeout: 15000 });
      console.log('✅ Login successful - Dashboard loaded');
      
      // Take screenshot after successful login
      await this.screenshot('login-success');
      
      return true;
    } catch (error) {
      console.log('❌ Login failed or timeout waiting for success indicator');
      await this.screenshot('login-failed');
      throw new Error(`Login failed: ${error.message}`);
    }
  }

  /**
   * Check if login was successful
   * @param {string} successIndicator - Element that indicates successful login
   * @returns {boolean} - True if login was successful
   */
  async isLoginSuccessful(successIndicator = 'text=Sales Orders') {
    try {
      await this.waitForElement(successIndicator, { timeout: 5000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get error message if login fails
   * @returns {string} - Error message text
   */
  async getErrorMessage() {
    try {
      const errorText = await this.getText(this.selectors.errorMessage);
      console.log(`❌ Login error message: ${errorText}`);
      return errorText;
    } catch (error) {
      console.log('⚠️ No error message found');
      return '';
    }
  }

  /**
   * Check if error message is visible
   * @returns {boolean} - True if error message is visible
   */
  async hasErrorMessage() {
    return await this.isVisible(this.selectors.errorMessage);
  }

  /**
   * Click forgot password link
   */
  async clickForgotPassword() {
    try {
      console.log('🔗 Clicking forgot password link...');
      await this.click(this.selectors.forgotPassword);
      console.log('✅ Forgot password link clicked');
    } catch (error) {
      console.log('⚠️ Could not find forgot password link');
      throw error;
    }
  }

  /**
   * Clear all form fields
   */
  async clearForm() {
    console.log('🧹 Clearing login form...');
    
    try {
      await this.fill(this.selectors.email, '');
      await this.fill(this.selectors.password, '');
      console.log('✅ Form cleared successfully');
    } catch (error) {
      console.log('⚠️ Error clearing form:', error.message);
    }
  }

  /**
   * Validate email field
   * @param {string} email - Email to validate
   * @returns {boolean} - True if email is valid
   */
  async validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Get email field value
   * @returns {string} - Email field value
   */
  async getEmailValue() {
    return await this.getValue(this.selectors.email);
  }

  /**
   * Get password field value (usually empty for security)
   * @returns {string} - Password field value
   */
  async getPasswordValue() {
    return await this.getValue(this.selectors.password);
  }

  /**
   * Check if login button is enabled
   * @returns {boolean} - True if button is enabled
   */
  async isLoginButtonEnabled() {
    try {
      const button = this.page.locator(this.selectors.loginButton);
      return await button.isEnabled();
    } catch (error) {
      return false;
    }
  }

  /**
   * Wait for loading to complete
   */
  async waitForLoadingComplete() {
    try {
      console.log('⏳ Waiting for loading to complete...');
      await this.page.waitForSelector(this.selectors.loading, { state: 'hidden', timeout: 10000 });
      console.log('✅ Loading completed');
    } catch (error) {
      console.log('⚠️ Loading indicator not found or already hidden');
    }
  }

  /**
   * Assert login page is loaded
   */
  async assertLoginPageLoaded() {
    console.log('✅ Asserting login page is loaded...');
    await this.assertVisible(this.selectors.email);
    await this.assertVisible(this.selectors.password);
    await this.assertVisible(this.selectors.loginButton);
  }

  /**
   * Assert login was successful
   * @param {string} successIndicator - Element that indicates successful login
   */
  async assertLoginSuccessful(successIndicator = 'text=Sales Orders') {
    console.log('✅ Asserting login was successful...');
    await this.waitForText(successIndicator, { timeout: 15000 });
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
   * Complete login with validation
   * @param {string} email - Email address
   * @param {string} password - Password
   * @param {boolean} keepLoggedIn - Whether to check "Keep me logged in"
   * @param {string} successIndicator - Element that indicates successful login
   */
  async loginWithValidation(email, password, keepLoggedIn = true, successIndicator = 'text=Sales Orders') {
    console.log('🔐 Starting validated login process...');
    
    // Validate email format
    if (!await this.validateEmail(email)) {
      throw new Error(`Invalid email format: ${email}`);
    }
    
    // Perform login
    await this.login(email, password, keepLoggedIn);
    
    // Wait for success
    await this.waitForLoginSuccess(successIndicator);
    
    console.log('✅ Validated login completed successfully');
  }

  /**
   * Login with keyboard navigation only
   * @param {string} email - Email address
   * @param {string} password - Password
   */
  async loginWithKeyboard(email, password) {
    console.log('⌨️ Starting keyboard-only login...');
    
    // Navigate to email field and type
    await this.pressKey('Tab');
    await this.type(this.selectors.email, email);
    
    // Navigate to password field and type
    await this.pressKey('Tab');
    await this.type(this.selectors.password, password);
    
    // Navigate to checkbox and check it
    await this.pressKey('Tab');
    await this.pressKey('Space');
    
    // Submit form with Enter
    await this.pressKey('Enter');
    
    console.log('✅ Keyboard-only login completed');
  }
}
