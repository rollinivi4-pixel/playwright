
/**
 * IMPROVED FILE UPLOAD TEST
 * 
 * This is an improved version with better practices:
 * - Environment variables for credentials
 * - Configurable file paths
 * - Better error handling
 * - Cleaner code structure
 * - Reusable functions
 */

const { test, expect } = require('@playwright/test');
const path = require('path');

// ========================================
// CONFIGURATION CONSTANTS
// ========================================
const CONFIG = {
  // Timeouts (in milliseconds)
  TIMEOUTS: {
    SHORT: 3000,
    MEDIUM: 5000,
    LONG: 10000,
    TEST: 120000
  },
  
  // Test data
  TEST_DATA: {
    EMAIL: process.env.TEST_EMAIL || 'rollinivi4+test@gmail.com',
    PASSWORD: process.env.TEST_PASSWORD || 'User@123',
    ORDER_NUMBER: '700025',
    COMMENTS: 'Test comments for order 700025 - Improved upload test'
  },
  
  // File paths
  FILE_PATHS: {
    DOWNLOADS: process.env.DOWNLOADS_PATH || 'C:\\Users\\Lenovo\\Downloads',
    TEST_FILES: [
      'JWO-905-400025.pdf',
      'JWO-905-400025 (1).pdf',
      'JWO-905-400017.pdf',
      'JWO-905-400017 (1).pdf',
      'JWO-905-400017 (2).pdf'
    ]
  },
  
  // Selectors
  SELECTORS: {
    EMAIL: '#email',
    PASSWORD: '#password',
    LOGIN_BUTTON: 'button[type="submit"]',
    SALES_ORDERS_MENU: "//li[normalize-space()='Sales Orders']",
    STATUS_FILTER: 'select[id="salesOrder_salesOrders_shipmentStatusSelect"]',
    SEARCH_INPUT: "//input[@id='salesOrder_salesOrders_searchInput']",
    UPLOAD_BUTTON: '//img[@title="Add Image"]',
    FILE_INPUT: '//input[@type="file"]',
    UPLOADED_FILE_CONTAINER: '//div[@class="mb-1 ms-2"]',
    NOTES_FIELD: '//textarea[@id="notes"]',
    TYPE_SELECT: '//select[@id="type"]'
  }
};

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Find an available file to upload
 */
async function findAvailableFile() {
  const fs = require('fs');
  
  // Try specific test files first
  for (const fileName of CONFIG.FILE_PATHS.TEST_FILES) {
    const filePath = path.join(CONFIG.FILE_PATHS.DOWNLOADS, fileName);
    if (fs.existsSync(filePath)) {
      console.log(`✅ Found test file: ${fileName}`);
      return filePath;
    }
  }
  
  // Fallback: Find any PDF file
  console.log('⚠️ No specific test files found, looking for any PDF...');
  try {
    const files = fs.readdirSync(CONFIG.FILE_PATHS.DOWNLOADS);
    const pdfFiles = files.filter(file => 
      file.toLowerCase().endsWith('.pdf') && 
      !file.startsWith('~') // Exclude temp files
    );
    
    if (pdfFiles.length > 0) {
      const filePath = path.join(CONFIG.FILE_PATHS.DOWNLOADS, pdfFiles[0]);
      console.log(`✅ Found PDF file: ${pdfFiles[0]}`);
      return filePath;
    }
  } catch (error) {
    console.log('❌ Error accessing Downloads folder:', error.message);
  }
  
  throw new Error('No suitable files found for upload');
}

/**
 * Login to the application
 */
async function login(page) {
  console.log('🔐 Logging in...');
  
  await page.goto('https://stagingaz.ezscm.ai/');
  await page.waitForSelector(CONFIG.SELECTORS.EMAIL, { timeout: CONFIG.TIMEOUTS.LONG });
  
  await page.fill(CONFIG.SELECTORS.EMAIL, CONFIG.TEST_DATA.EMAIL);
  await page.fill(CONFIG.SELECTORS.PASSWORD, CONFIG.TEST_DATA.PASSWORD);
  await page.click(CONFIG.SELECTORS.LOGIN_BUTTON);
  
  await page.waitForTimeout(CONFIG.TIMEOUTS.MEDIUM);
  console.log('✅ Login completed!');
}

/**
 * Navigate to Sales Orders page
 */
async function navigateToSalesOrders(page) {
  console.log('🔍 Navigating to Sales Orders...');
  
  const salesOrderMenu = page.locator(CONFIG.SELECTORS.SALES_ORDERS_MENU);
  await salesOrderMenu.waitFor({ state: 'visible', timeout: CONFIG.TIMEOUTS.MEDIUM });
  await salesOrderMenu.click();
  
  await page.waitForTimeout(CONFIG.TIMEOUTS.MEDIUM);
  console.log('✅ Sales Orders page loaded!');
}

/**
 * Search for specific order
 */
async function searchForOrder(page, orderNumber) {
  console.log(`🔍 Searching for order ${orderNumber}...`);
  
  // Select PICKED status filter
  await page.locator(CONFIG.SELECTORS.STATUS_FILTER)
    .selectOption({ label: 'PICKED' });
  await page.waitForTimeout(CONFIG.TIMEOUTS.SHORT);
  
  // Search for order
  const searchInput = page.locator(CONFIG.SELECTORS.SEARCH_INPUT);
  await searchInput.click();
  await searchInput.fill(orderNumber);
  await page.keyboard.press('Enter');
  
  await page.waitForTimeout(CONFIG.TIMEOUTS.SHORT);
  console.log('✅ Order search completed!');
}

/**
 * Open order details
 */
async function openOrderDetails(page, orderNumber) {
  console.log(`👁️ Opening order ${orderNumber} details...`);
  
  const orderCell = page.locator(`td:has-text("${orderNumber}")`);
  const isVisible = await orderCell.isVisible();
  
  if (!isVisible) {
    throw new Error(`Order ${orderNumber} not found`);
  }
  
  const row = page.locator(`tr:has(td:has-text("${orderNumber}"))`);
  const viewIcon = row.locator(`#ship${orderNumber}`);
  await viewIcon.click();
  
  await page.waitForTimeout(CONFIG.TIMEOUTS.SHORT);
  console.log('✅ Order details opened!');
}

/**
 * Fill order details
 */
async function fillOrderDetails(page) {
  console.log('📝 Filling order details...');
  
  try {
    // Select status
    const statusSelect = page.locator(CONFIG.SELECTORS.TYPE_SELECT);
    await statusSelect.waitFor({ state: 'visible', timeout: CONFIG.TIMEOUTS.LONG });
    await statusSelect.selectOption({ label: 'READY FOR DELIVERY' });
    console.log('✅ Status selected!');
  } catch (error) {
    console.log('⚠️ Status selection failed:', error.message);
  }
  
  try {
    // Enter comments
    const notesField = page.locator(CONFIG.SELECTORS.NOTES_FIELD);
    await notesField.waitFor({ state: 'visible', timeout: CONFIG.TIMEOUTS.LONG });
    await notesField.fill(CONFIG.TEST_DATA.COMMENTS);
    console.log('✅ Comments entered!');
  } catch (error) {
    console.log('⚠️ Comments entry failed:', error.message);
  }
}

/**
 * Upload file using file chooser method
 */
async function uploadFileWithChooser(page, filePath) {
  console.log('📁 Uploading file with chooser method...');
  
  // Set up file chooser handler BEFORE clicking
  const fileChooserPromise = page.waitForFileChooser({ timeout: CONFIG.TIMEOUTS.LONG });
  
  // Click upload button
  const uploadButton = page.locator(CONFIG.SELECTORS.UPLOAD_BUTTON);
  await uploadButton.waitFor({ state: 'visible', timeout: CONFIG.TIMEOUTS.LONG });
  await uploadButton.click();
  
  // Handle file chooser
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(filePath);
  
  // Wait for upload to process
  await page.waitForTimeout(CONFIG.TIMEOUTS.SHORT);
  console.log('✅ File uploaded with chooser method!');
}

/**
 * Upload file using direct input method (fallback)
 */
async function uploadFileWithInput(page, filePath) {
  console.log('📁 Uploading file with direct input method...');
  
  // Click upload button
  const uploadButton = page.locator(CONFIG.SELECTORS.UPLOAD_BUTTON);
  await uploadButton.click();
  await page.waitForTimeout(CONFIG.TIMEOUTS.SHORT);
  
  // Find file input and upload
  const fileInput = page.locator(CONFIG.SELECTORS.FILE_INPUT);
  await fileInput.setInputFiles(filePath);
  
  // Wait for upload to process
  await page.waitForTimeout(CONFIG.TIMEOUTS.SHORT);
  console.log('✅ File uploaded with direct input method!');
}

/**
 * Close any open dialogs
 */
async function closeDialogs(page) {
  console.log('🔍 Closing any open dialogs...');
  
  const closeMethods = [
    () => page.keyboard.press('Escape'),
    () => page.mouse.click(100, 100),
    () => page.keyboard.press('Enter')
  ];
  
  for (const method of closeMethods) {
    try {
      await method();
      await page.waitForTimeout(500);
    } catch (error) {
      // Ignore errors, try next method
    }
  }
  
  console.log('✅ Dialog closing attempts completed!');
}

/**
 * Verify file upload was successful
 */
async function verifyFileUpload(page, filePath) {
  console.log('✅ Verifying file upload...');
  
  const fileName = path.basename(filePath);
  
  // Multiple verification methods
  const verifications = [
    {
      name: 'Upload container',
      locator: page.locator(CONFIG.SELECTORS.UPLOADED_FILE_CONTAINER)
    },
    {
      name: 'File name',
      locator: page.locator(`text=${fileName}`)
    },
    {
      name: 'File icon',
      locator: page.locator(`img[alt="${fileName}"]`)
    },
    {
      name: 'PDF icon',
      locator: page.locator('img[alt*="pdf"]')
    },
    {
      name: 'Any uploaded file',
      locator: page.locator('img[src*="blob:"]')
    },
    {
      name: 'Success message',
      locator: page.locator('text=Upload successful').or(
        page.locator('text=File uploaded')
      )
    }
  ];
  
  let uploadVerified = false;
  
  for (const verification of verifications) {
    try {
      if (await verification.locator.isVisible()) {
        console.log(`✅ ${verification.name} found!`);
        uploadVerified = true;
        break;
      }
    } catch (error) {
      // Continue to next verification
    }
  }
  
  if (!uploadVerified) {
    console.log('❌ File upload verification failed!');
    await page.screenshot({ path: 'upload-verification-failed.png' });
  }
  
  return uploadVerified;
}

// ========================================
// MAIN TEST
// ========================================

test('Improved File Upload Test', async ({ page }) => {
  // Set test timeout
  test.setTimeout(CONFIG.TIMEOUTS.TEST);
  
  try {
    // Step 1: Login
    await login(page);
    
    // Step 2: Navigate to Sales Orders
    await navigateToSalesOrders(page);
    
    // Step 3: Search for order
    await searchForOrder(page, CONFIG.TEST_DATA.ORDER_NUMBER);
    
    // Step 4: Open order details
    await openOrderDetails(page, CONFIG.TEST_DATA.ORDER_NUMBER);
    
    // Step 5: Fill order details
    await fillOrderDetails(page);
    
    // Step 6: Find file to upload
    const filePath = await findAvailableFile();
    console.log(`📂 File to upload: ${filePath}`);
    
    // Step 7: Upload file (try both methods)
    try {
      await uploadFileWithChooser(page, filePath);
    } catch (error) {
      console.log('⚠️ Chooser method failed, trying direct input...');
      await uploadFileWithInput(page, filePath);
    }
    
    // Step 8: Close dialogs
    await closeDialogs(page);
    
    // Step 9: Verify upload
    const uploadVerified = await verifyFileUpload(page, filePath);
    
    // Step 10: Take final screenshot
    await page.screenshot({ path: 'improved-file-upload-result.png' });
    
    // Step 11: Assertion
    expect(uploadVerified).toBe(true);
    console.log('🎉 Test passed! File upload successful!');
    
  } catch (error) {
    console.log('❌ Test failed:', error.message);
    await page.screenshot({ path: 'test-failure.png' });
    throw error;
  }
});

// ========================================
// ADDITIONAL HELPER TESTS
// ========================================

test('File Upload - Chooser Method Only', async ({ page }) => {
  test.setTimeout(CONFIG.TIMEOUTS.TEST);
  
  await login(page);
  await navigateToSalesOrders(page);
  await searchForOrder(page, CONFIG.TEST_DATA.ORDER_NUMBER);
  await openOrderDetails(page, CONFIG.TEST_DATA.ORDER_NUMBER);
  await fillOrderDetails(page);
  
  const filePath = await findAvailableFile();
  await uploadFileWithChooser(page, filePath);
  await closeDialogs(page);
  
  const uploadVerified = await verifyFileUpload(page, filePath);
  expect(uploadVerified).toBe(true);
});

test('File Upload - Direct Input Method Only', async ({ page }) => {
  test.setTimeout(CONFIG.TIMEOUTS.TEST);
  
  await login(page);
  await navigateToSalesOrders(page);
  await searchForOrder(page, CONFIG.TEST_DATA.ORDER_NUMBER);
  await openOrderDetails(page, CONFIG.TEST_DATA.ORDER_NUMBER);
  await fillOrderDetails(page);
  
  const filePath = await findAvailableFile();
  await uploadFileWithInput(page, filePath);
  await closeDialogs(page);
  
  const uploadVerified = await verifyFileUpload(page, filePath);
  expect(uploadVerified).toBe(true);
});
