/**
 * Base Page Class - Foundation for all page objects
 * 
 * This class provides common functionality that all page objects can use.
 * It includes methods for common actions like clicking, filling, waiting, etc.
 */

import { expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export class BasePage {
  constructor(page) {
    this.page = page;
    this.selectors = {};
    this.timeout = 30000;
  }

  /**
   * Navigate to a URL
   * @param {string} url - URL to navigate to
   * @param {object} options - Navigation options
   */
  async goto(url, options = {}) {
    const defaultOptions = {
      waitUntil: 'networkidle',
      timeout: this.timeout
    };
    
    console.log(`🌐 Navigating to: ${url}`);
    await this.page.goto(url, { ...defaultOptions, ...options });
    console.log(`✅ Navigation completed`);
  }

  /**
   * Click on an element
   * @param {string} selector - Element selector
   * @param {object} options - Click options
   */
  async click(selector, options = {}) {
    console.log(`🖱️ Clicking: ${selector}`);
    await this.page.click(selector, options);
    console.log(`✅ Click completed`);
  }

  /**
   * Fill an input field
   * @param {string} selector - Input selector
   * @param {string} value - Value to fill
   * @param {object} options - Fill options
   */
  async fill(selector, value, options = {}) {
    console.log(`📝 Filling ${selector} with: ${value}`);
    await this.page.fill(selector, value, options);
    console.log(`✅ Fill completed`);
  }

  /**
   * Type text with realistic delays
   * @param {string} selector - Input selector
   * @param {string} text - Text to type
   * @param {object} options - Type options
   */
  async type(selector, text, options = {}) {
    const defaultOptions = { delay: 100 };
    console.log(`⌨️ Typing in ${selector}: ${text}`);
    await this.page.type(selector, text, { ...defaultOptions, ...options });
    console.log(`✅ Typing completed`);
  }

  /**
   * Wait for an element to be visible
   * @param {string} selector - Element selector
   * @param {object} options - Wait options
   */
  async waitForElement(selector, options = {}) {
    const defaultOptions = { timeout: this.timeout };
    console.log(`⏳ Waiting for element: ${selector}`);
    await this.page.waitForSelector(selector, { ...defaultOptions, ...options });
    console.log(`✅ Element found: ${selector}`);
  }

  /**
   * Wait for text to appear
   * @param {string} text - Text to wait for
   * @param {object} options - Wait options
   */
  async waitForText(text, options = {}) {
    const defaultOptions = { timeout: this.timeout };
    console.log(`⏳ Waiting for text: ${text}`);
    await this.page.waitForSelector(`text=${text}`, { ...defaultOptions, ...options });
    console.log(`✅ Text found: ${text}`);
  }

  /**
   * Check if element is visible
   * @param {string} selector - Element selector
   * @returns {boolean} - True if visible
   */
  async isVisible(selector) {
    try {
      const isVisible = await this.page.isVisible(selector);
      console.log(`👁️ Element visibility check: ${selector} = ${isVisible}`);
      return isVisible;
    } catch (error) {
      console.log(`⚠️ Error checking visibility: ${error.message}`);
      return false;
    }
  }

  /**
   * Get text content of an element
   * @param {string} selector - Element selector
   * @returns {string} - Text content
   */
  async getText(selector) {
    try {
      const text = await this.page.textContent(selector);
      console.log(`📄 Text content of ${selector}: ${text}`);
      return text;
    } catch (error) {
      console.log(`⚠️ Error getting text: ${error.message}`);
      return '';
    }
  }

  /**
   * Get input value
   * @param {string} selector - Input selector
   * @returns {string} - Input value
   */
  async getValue(selector) {
    try {
      const value = await this.page.inputValue(selector);
      console.log(`📝 Input value of ${selector}: ${value}`);
      return value;
    } catch (error) {
      console.log(`⚠️ Error getting value: ${error.message}`);
      return '';
    }
  }

  /**
   * Take a screenshot
   * @param {string} name - Screenshot name
   * @param {object} options - Screenshot options
   */
  async screenshot(name, options = {}) {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `${name}-${timestamp}.png`;
      const screenshotPath = path.join('screenshots', filename);
      
      // Ensure screenshots directory exists
      if (!fs.existsSync('screenshots')) {
        fs.mkdirSync('screenshots', { recursive: true });
      }

      const defaultOptions = {
        path: screenshotPath,
        fullPage: true
      };

      await this.page.screenshot({ ...defaultOptions, ...options });
      console.log(`📸 Screenshot saved: ${filename}`);
      return screenshotPath;
    } catch (error) {
      console.log(`⚠️ Screenshot failed: ${error.message}`);
      return null;
    }
  }

  /**
   * Wait for a specified time
   * @param {number} milliseconds - Time to wait
   */
  async wait(milliseconds) {
    console.log(`⏳ Waiting ${milliseconds}ms...`);
    await this.page.waitForTimeout(milliseconds);
    console.log(`✅ Wait completed`);
  }

  /**
   * Wait for page to load completely
   * @param {object} options - Load state options
   */
  async waitForLoadState(options = {}) {
    const defaultOptions = { timeout: this.timeout };
    console.log(`⏳ Waiting for page load state...`);
    await this.page.waitForLoadState('networkidle', { ...defaultOptions, ...options });
    console.log(`✅ Page load completed`);
  }

  /**
   * Scroll to an element
   * @param {string} selector - Element selector
   */
  async scrollTo(selector) {
    console.log(`📜 Scrolling to: ${selector}`);
    await this.page.locator(selector).scrollIntoViewIfNeeded();
    console.log(`✅ Scroll completed`);
  }

  /**
   * Hover over an element
   * @param {string} selector - Element selector
   */
  async hover(selector) {
    console.log(`🖱️ Hovering over: ${selector}`);
    await this.page.hover(selector);
    console.log(`✅ Hover completed`);
  }

  /**
   * Double click on an element
   * @param {string} selector - Element selector
   */
  async doubleClick(selector) {
    console.log(`🖱️ Double clicking: ${selector}`);
    await this.page.dblclick(selector);
    console.log(`✅ Double click completed`);
  }

  /**
   * Right click on an element
   * @param {string} selector - Element selector
   */
  async rightClick(selector) {
    console.log(`🖱️ Right clicking: ${selector}`);
    await this.page.click(selector, { button: 'right' });
    console.log(`✅ Right click completed`);
  }

  /**
   * Select option from dropdown
   * @param {string} selector - Select element selector
   * @param {string} value - Option value to select
   */
  async selectOption(selector, value) {
    console.log(`📋 Selecting option: ${value} from ${selector}`);
    await this.page.selectOption(selector, value);
    console.log(`✅ Option selected`);
  }

  /**
   * Check a checkbox
   * @param {string} selector - Checkbox selector
   */
  async check(selector) {
    console.log(`☑️ Checking: ${selector}`);
    await this.page.check(selector);
    console.log(`✅ Checkbox checked`);
  }

  /**
   * Uncheck a checkbox
   * @param {string} selector - Checkbox selector
   */
  async uncheck(selector) {
    console.log(`☐ Unchecking: ${selector}`);
    await this.page.uncheck(selector);
    console.log(`✅ Checkbox unchecked`);
  }

  /**
   * Upload a file
   * @param {string} selector - File input selector
   * @param {string} filePath - Path to file
   */
  async uploadFile(selector, filePath) {
    console.log(`📁 Uploading file: ${filePath} to ${selector}`);
    await this.page.setInputFiles(selector, filePath);
    console.log(`✅ File uploaded`);
  }

  /**
   * Press a key
   * @param {string} key - Key to press
   */
  async pressKey(key) {
    console.log(`⌨️ Pressing key: ${key}`);
    await this.page.keyboard.press(key);
    console.log(`✅ Key pressed`);
  }

  /**
   * Assert element is visible
   * @param {string} selector - Element selector
   */
  async assertVisible(selector) {
    console.log(`✅ Asserting element is visible: ${selector}`);
    await expect(this.page.locator(selector)).toBeVisible();
  }

  /**
   * Assert element contains text
   * @param {string} selector - Element selector
   * @param {string} text - Expected text
   */
  async assertText(selector, text) {
    console.log(`✅ Asserting element contains text: ${text}`);
    await expect(this.page.locator(selector)).toContainText(text);
  }

  /**
   * Assert element has value
   * @param {string} selector - Input selector
   * @param {string} value - Expected value
   */
  async assertValue(selector, value) {
    console.log(`✅ Asserting input has value: ${value}`);
    await expect(this.page.locator(selector)).toHaveValue(value);
  }

  /**
   * Assert URL contains text
   * @param {string} text - Expected URL text
   */
  async assertUrl(text) {
    console.log(`✅ Asserting URL contains: ${text}`);
    await expect(this.page).toHaveURL(new RegExp(text));
  }

  /**
   * Get current URL
   * @returns {string} - Current URL
   */
  getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Get page title
   * @returns {string} - Page title
   */
  async getTitle() {
    return await this.page.title();
  }

  /**
   * Reload the page
   * @param {object} options - Reload options
   */
  async reload(options = {}) {
    console.log(`🔄 Reloading page...`);
    await this.page.reload(options);
    console.log(`✅ Page reloaded`);
  }

  /**
   * Go back in browser history
   */
  async goBack() {
    console.log(`⬅️ Going back...`);
    await this.page.goBack();
    console.log(`✅ Navigation back completed`);
  }

  /**
   * Go forward in browser history
   */
  async goForward() {
    console.log(`➡️ Going forward...`);
    await this.page.goForward();
    console.log(`✅ Navigation forward completed`);
  }
}
