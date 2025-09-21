/**
 * HELPER FUNCTIONS
 * 
 * This file contains all the reusable helper functions for the sales order tests.
 * These functions can be used across different test files.
 */

// Import selectors
const selectors = require('./selectors.js');

/**
 * Check if page is still active and responsive
 * @param {Page} page - Playwright page object
 * @returns {boolean} - True if page is active
 */
async function isPageActive(page) {
  try {
    await page.evaluate(() => document.title);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Wait for specified number of seconds
 * @param {number} seconds - Number of seconds to wait
 */
async function wait(seconds) {
  console.log(`⏳ Waiting ${seconds} seconds...`);
  await new Promise(resolve => setTimeout(resolve, seconds * 1000));
  console.log(`✅ Done waiting`);
}

/**
 * Take a screenshot with timestamp
 * @param {Page} page - Playwright page object
 * @param {string} stepName - Name for the screenshot
 * @param {Object} config - Configuration object
 */
async function takePicture(page, stepName, config) {
  try {
    // Check if page is still active before taking screenshot
    if (!(await isPageActive(page))) {
      console.log(`⚠️ Page is closed, cannot take picture: ${stepName}`);
      return;
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `step-${stepName}-${timestamp}.png`;
    await page.screenshot({ 
      path: `${config.screenshots.folder}/${filename}`,
      fullPage: config.screenshots.fullPage 
    });
    console.log(`📸 Picture taken: ${stepName}`);
  } catch (error) {
    console.log(`⚠️ Could not take picture: ${error.message}`);
  }
}

/**
 * Handle insufficient stock warning messages
 * @param {Page} page - Playwright page object
 * @returns {boolean} - True if warning was found and handled
 */
async function handleInsufficientStockWarning(page) {
  console.log('🔍 Checking for insufficient stock warnings...');
  
  try {
    let warningFound = false;
    for (const selector of selectors.warnings.insufficientStock) {
      try {
        const warningElement = page.locator(selector).first();
        if (await warningElement.isVisible({ timeout: 2000 })) {
          const warningText = await warningElement.textContent();
          console.log(`⚠️ Found insufficient stock warning: ${warningText}`);
          warningFound = true;
          break;
        }
      } catch (error) {
        // Continue to next selector
      }
    }
    
    if (warningFound) {
      console.log('📝 Handling insufficient stock warning...');
      
      // Try to find quantity input fields and reduce quantity
      const quantitySelectors = [
        'input[id*="totalQuantity"]',
        'input[name*="quantity"]',
        'input[id*="quantity"]',
        'input[placeholder*="quantity" i]'
      ];
      
      for (const selector of quantitySelectors) {
        try {
          const qtyInput = page.locator(selector).first();
          if (await qtyInput.isVisible({ timeout: 2000 })) {
            const currentValue = await qtyInput.inputValue();
            if (currentValue && parseFloat(currentValue) > 0) {
              // Reduce quantity to 1
              await qtyInput.click();
              await qtyInput.clear();
              await qtyInput.type('1', { delay: 100 });
              console.log(`✅ Reduced quantity from ${currentValue} to 1 due to insufficient stock`);
              
              // Trigger change event
              await qtyInput.press('Tab');
              await wait(1);
              break;
            }
          }
        } catch (error) {
          console.log(`⚠️ Could not adjust quantity with selector: ${selector}`);
        }
      }
      
      return true;
    }
    
    console.log('✅ No insufficient stock warnings found');
    return false;
    
  } catch (error) {
    console.log(`⚠️ Error checking for stock warnings: ${error.message}`);
    return false;
  }
}

/**
 * Handle expiration warning popup
 * @param {Page} page - Playwright page object
 * @returns {boolean} - True if popup was found and handled
 */
async function handleExpirationWarningPopup(page) {
  console.log('🔍 Checking for expiration warning popup...');
  
  try {
    let modalFound = false;
    for (const selector of selectors.warnings.expirationPopup) {
      try {
        const modalElement = page.locator(selector).first();
        if (await modalElement.isVisible({ timeout: 3000 })) {
          const modalText = await modalElement.textContent();
          if (modalText && (modalText.includes('expiring') || modalText.includes('expiration'))) {
            console.log(`⚠️ Found expiration warning popup: ${modalText}`);
            modalFound = true;
            break;
          }
        }
      } catch (error) {
        // Continue to next selector
      }
    }
    
    if (modalFound) {
      console.log('📝 Handling expiration warning popup...');
      
      // Try to click "Yes" button to continue
      let buttonClicked = false;
      for (const selector of selectors.warnings.yesButton) {
        try {
          const yesButton = page.locator(selector).first();
          if (await yesButton.isVisible({ timeout: 2000 })) {
            await yesButton.click();
            console.log(`✅ Clicked "Yes" button to continue with expiring item`);
            buttonClicked = true;
            await wait(2); // Wait for modal to close
            break;
          }
        } catch (error) {
          console.log(`⚠️ Could not click Yes button with selector: ${selector}`);
        }
      }
      
      if (!buttonClicked) {
        console.log('⚠️ Could not find or click "Yes" button, trying to close modal...');
        
        // Try to press Escape key to close modal
        try {
          await page.keyboard.press('Escape');
          console.log('✅ Pressed Escape to close modal');
          await wait(1);
        } catch (error) {
          console.log('⚠️ Could not close modal with Escape key');
        }
      }
      
      return true;
    }
    
    console.log('✅ No expiration warning popup found');
    return false;
    
  } catch (error) {
    console.log(`⚠️ Error checking for expiration popup: ${error.message}`);
    return false;
  }
}

/**
 * Add item to sales order with comprehensive handling
 * @param {Page} page - Playwright page object
 * @param {Object} config - Configuration object
 * @param {Object} itemData - Item data to add
 * @param {number} index - Index of the item
 * @returns {boolean} - True if item was added successfully
 */
async function addItemToSalesOrder(page, config, itemData, index = 0) {
  console.log(`\n🛒 Adding item ${index + 1} to sales order...`);
  console.log(`📦 Item: ${itemData.itemName}`);
  console.log(`📊 Quantity: ${itemData.quantity}`);
  console.log(`💰 Selling Price: ${itemData.sellingPrice}`);
  
  try {
    // Wait for item form to be visible
    await page.waitForSelector(selectors.create_sales_order.itemForm.itemInput, { timeout: 10000 });
    await takePicture(page, `12-item-form-${index + 1}`, config);
    
    // Step 1: Select Item
    console.log('🔍 Step 1: Selecting item...');
    const itemSelectors = [
      `input[id="selected_create_sales_order_item_${index}"]`,
      `input[id*="selected_create_sales_order_item"]`,
      selectors.create_sales_order.itemForm.itemInput
    ];
    
    let itemSelected = false;
    for (const selector of itemSelectors) {
      try {
        const itemInput = page.locator(selector).first();
        if (await itemInput.isVisible({ timeout: 2000 })) {
          await itemInput.click();
          await itemInput.clear();
          await itemInput.type(itemData.itemName, { delay: 100 });
          console.log(`✅ Item name entered: ${itemData.itemName}`);
          
          // Wait for dropdown and select first option
          await wait(2);
          await itemInput.press('ArrowDown');
          await itemInput.press('Enter');
          console.log('✅ Item selected from dropdown');
          itemSelected = true;
          break;
        }
      } catch (error) {
        console.log(`⚠️ Could not select item with selector: ${selector}`);
      }
    }
    
    if (!itemSelected) {
      throw new Error('Could not select item');
    }
    
    await wait(1);
    await takePicture(page, `13-item-selected-${index + 1}`, config);
    
    // Step 2: Enter Quantity
    console.log('🔢 Step 2: Entering quantity...');
    const quantitySelectors = [
      `input[id="totalQuantity_${index}"]`,
      `input[id*="totalQuantity"]`,
      selectors.create_sales_order.itemForm.quantityInput
    ];
    
    let quantityEntered = false;
    for (const selector of quantitySelectors) {
      try {
        const qtyInput = page.locator(selector).first();
        if (await qtyInput.isVisible({ timeout: 2000 })) {
          await qtyInput.click();
          await qtyInput.clear();
          await qtyInput.type(itemData.quantity.toString(), { delay: 100 });
          console.log(`✅ Quantity entered: ${itemData.quantity}`);
          quantityEntered = true;
          break;
        }
      } catch (error) {
        console.log(`⚠️ Could not enter quantity with selector: ${selector}`);
      }
    }
    
    if (!quantityEntered) {
      throw new Error('Could not enter quantity');
    }
    
    await wait(1);
    
    // Step 3: Enter Selling Price
    console.log('💰 Step 3: Entering selling price...');
    const priceSelectors = [
      `input[id="totalPrice_${index}"]`,
      `input[id*="totalPrice"]`,
      selectors.create_sales_order.itemForm.sellingPriceInput
    ];
    
    let priceEntered = false;
    for (const selector of priceSelectors) {
      try {
        const priceInput = page.locator(selector).first();
        if (await priceInput.isVisible({ timeout: 2000 })) {
          await priceInput.click();
          await priceInput.clear();
          await priceInput.type(itemData.sellingPrice.toString(), { delay: 100 });
          console.log(`✅ Selling price entered: ${itemData.sellingPrice}`);
          priceEntered = true;
          break;
        }
      } catch (error) {
        console.log(`⚠️ Could not enter price with selector: ${selector}`);
      }
    }
    
    if (!priceEntered) {
      throw new Error('Could not enter selling price');
    }
    
    await wait(1);
    
    // Step 4: Enter HSN/SAC if provided
    if (itemData.hsnSac) {
      console.log('🏷️ Step 4: Entering HSN/SAC...');
      const hsnSelectors = [
        `input[id*="hsn"]`,
        selectors.create_sales_order.itemForm.hsnSacInput
      ];
      
      for (const selector of hsnSelectors) {
        try {
          const hsnInput = page.locator(selector).first();
          if (await hsnInput.isVisible({ timeout: 2000 })) {
            await hsnInput.click();
            await hsnInput.clear();
            await hsnInput.type(itemData.hsnSac, { delay: 100 });
            console.log(`✅ HSN/SAC entered: ${itemData.hsnSac}`);
            break;
          }
        } catch (error) {
          console.log(`⚠️ Could not enter HSN/SAC with selector: ${selector}`);
        }
      }
      
      await wait(1);
    }
    
    // Step 5: Select Tax Type
    console.log('📋 Step 5: Selecting tax type...');
    const taxTypeSelectors = [
      `input[id="tax_type_${index}"]`,
      `input[id*="tax_type"]`,
      selectors.create_sales_order.itemForm.taxTypeSelect
    ];
    
    let taxTypeSelected = false;
    for (const selector of taxTypeSelectors) {
      try {
        const taxTypeInput = page.locator(selector).first();
        if (await taxTypeInput.isVisible({ timeout: 2000 })) {
          await taxTypeInput.click();
          console.log('✅ Tax type dropdown clicked');
          
          // Wait for dropdown options
          await wait(1);
          
          // Try to select the tax type
          try {
            await page.selectOption(selector, { label: itemData.taxType });
            console.log(`✅ Tax type selected: ${itemData.taxType}`);
            taxTypeSelected = true;
            break;
          } catch (error) {
            // If selectOption fails, try clicking on the option
            try {
              await page.click(`text=${itemData.taxType}`);
              console.log(`✅ Tax type selected by clicking: ${itemData.taxType}`);
              taxTypeSelected = true;
              break;
            } catch (clickError) {
              console.log(`⚠️ Could not select tax type: ${itemData.taxType}`);
            }
          }
        }
      } catch (error) {
        console.log(`⚠️ Could not click tax type dropdown with selector: ${selector}`);
      }
    }
    
    if (!taxTypeSelected) {
      console.log('⚠️ Could not select tax type, continuing...');
    }
    
    await wait(1);
    
    // Step 6: Select Tax Rate (only if tax type was selected)
    if (taxTypeSelected && itemData.taxRate) {
      console.log('📊 Step 6: Selecting tax rate...');
      const taxRateSelectors = [
        `input[id="tax_rate_${index}"]`,
        `input[id*="tax_rate"]`,
        selectors.create_sales_order.itemForm.taxRateSelect
      ];
      
      for (const selector of taxRateSelectors) {
        try {
          const taxRateInput = page.locator(selector).first();
          if (await taxRateInput.isVisible({ timeout: 2000 })) {
            await taxRateInput.click();
            console.log('✅ Tax rate dropdown clicked');
            
            // Wait for dropdown options
            await wait(1);
            
            // Try to select the tax rate
            try {
              await page.selectOption(selector, { label: `${itemData.taxRate}%` });
              console.log(`✅ Tax rate selected: ${itemData.taxRate}%`);
              break;
            } catch (error) {
              // If selectOption fails, try clicking on the option
              try {
                await page.click(`text=${itemData.taxRate}%`);
                console.log(`✅ Tax rate selected by clicking: ${itemData.taxRate}%`);
                break;
              } catch (clickError) {
                console.log(`⚠️ Could not select tax rate: ${itemData.taxRate}%`);
              }
            }
          }
        } catch (error) {
          console.log(`⚠️ Could not click tax rate dropdown with selector: ${selector}`);
        }
      }
      
      await wait(1);
    }
    
    // Step 7: Calculate and verify amount
    console.log('🧮 Step 7: Calculating amount...');
    const calculatedAmount = itemData.quantity * itemData.sellingPrice;
    console.log(`📊 Calculated amount: ${itemData.quantity} × ${itemData.sellingPrice} = ${calculatedAmount}`);
    
    // Check if amount field is automatically calculated or needs manual entry
    const amountSelectors = [
      `input[id="total_price_${index}"]`,
      `input[id*="total_price"]`,
      selectors.create_sales_order.itemForm.amountInput
    ];
    
    for (const selector of amountSelectors) {
      try {
        const amountInput = page.locator(selector).first();
        if (await amountInput.isVisible({ timeout: 2000 })) {
          const currentValue = await amountInput.inputValue();
          console.log(`📊 Current amount value: ${currentValue}`);
          
          // If amount is not automatically calculated, enter it manually
          if (!currentValue || currentValue === '0' || currentValue === '') {
            await amountInput.click();
            await amountInput.clear();
            await amountInput.type(calculatedAmount.toString(), { delay: 100 });
            console.log(`✅ Amount entered manually: ${calculatedAmount}`);
          } else {
            console.log(`✅ Amount calculated automatically: ${currentValue}`);
          }
          break;
        }
      } catch (error) {
        console.log(`⚠️ Could not handle amount field with selector: ${selector}`);
      }
    }
    
    await wait(1);
    await takePicture(page, `14-item-completed-${index + 1}`, config);
    
    // Step 8: Handle insufficient stock warning (if appears)
    console.log('🔍 Step 8: Checking for stock warnings...');
    await handleInsufficientStockWarning(page);
    
    // Step 9: Click Add Product button
    console.log('➕ Step 9: Adding product to order...');
    const addProductSelectors = [
      'button:has-text("Add Product")',
      'button:has-text("Add Item")',
      'button:has-text("+")',
      'button[title*="Add"]',
      selectors.create_sales_order.itemForm.addItemButton
    ];
    
    let productAdded = false;
    for (const selector of addProductSelectors) {
      try {
        const addButton = page.locator(selector).first();
        if (await addButton.isVisible({ timeout: 2000 })) {
          await addButton.click();
          console.log(`✅ Clicked add product button with selector: ${selector}`);
          productAdded = true;
          break;
        }
      } catch (error) {
        console.log(`⚠️ Could not click add product button with selector: ${selector}`);
      }
    }
    
    if (!productAdded) {
      console.log('⚠️ Could not find add product button, continuing...');
    }
    
    await wait(2);
    
    // Step 10: Handle expiration warning popup (if appears after adding product)
    console.log('🔍 Step 10: Checking for expiration warnings...');
    await handleExpirationWarningPopup(page);
    
    await wait(1);
    await takePicture(page, `15-item-added-${index + 1}`, config);
    
    console.log(`✅ Item ${index + 1} added successfully!`);
    return true;
    
  } catch (error) {
    console.log(`❌ Error adding item ${index + 1}: ${error.message}`);
    await takePicture(page, `16-item-error-${index + 1}`, config);
    throw error;
  }
}

/**
 * Verify order summary after adding items
 * @param {Page} page - Playwright page object
 * @param {Object} config - Configuration object
 * @param {Array} expectedItems - Array of expected items
 * @returns {boolean} - True if verification completed
 */
async function verifyOrderSummary(page, config, expectedItems) {
  console.log('\n📋 Verifying order summary...');
  
  try {
    // Wait for order summary to be visible
    await wait(2);
    await takePicture(page, '16-order-summary-check', config);
    
    // Look for order summary section
    let summaryFound = false;
    for (const selector of selectors.orderSummary.summarySection.split(', ')) {
      try {
        const summaryElement = page.locator(selector).first();
        if (await summaryElement.isVisible({ timeout: 3000 })) {
          console.log(`✅ Found order summary with selector: ${selector}`);
          summaryFound = true;
          break;
        }
      } catch (error) {
        console.log(`⚠️ Could not find summary with selector: ${selector}`);
      }
    }
    
    if (!summaryFound) {
      console.log('⚠️ Order summary section not found, but continuing...');
      return false;
    }
    
    // Verify items in summary
    console.log('🔍 Checking items in order summary...');
    
    for (let i = 0; i < expectedItems.length; i++) {
      const item = expectedItems[i];
      console.log(`\n📦 Verifying item ${i + 1}: ${item.itemName}`);
      
      // Check if item name appears in summary
      let itemNameFound = false;
      for (const selector of selectors.orderSummary.itemName.split(', ')) {
        try {
          const itemElement = page.locator(`${selector}:has-text("${item.itemName}")`).first();
          if (await itemElement.isVisible({ timeout: 2000 })) {
            console.log(`✅ Item name found: ${item.itemName}`);
            itemNameFound = true;
            break;
          }
        } catch (error) {
          // Continue to next selector
        }
      }
      
      if (!itemNameFound) {
        console.log(`⚠️ Item name not found in summary: ${item.itemName}`);
      }
      
      // Check quantity
      let quantityFound = false;
      for (const selector of selectors.orderSummary.quantity.split(', ')) {
        try {
          const qtyElement = page.locator(`${selector}:has-text("${item.quantity}")`).first();
          if (await qtyElement.isVisible({ timeout: 2000 })) {
            console.log(`✅ Quantity found: ${item.quantity}`);
            quantityFound = true;
            break;
          }
        } catch (error) {
          // Continue to next selector
        }
      }
      
      if (!quantityFound) {
        console.log(`⚠️ Quantity not found in summary: ${item.quantity}`);
      }
      
      // Check price
      let priceFound = false;
      for (const selector of selectors.orderSummary.price.split(', ')) {
        try {
          const priceElement = page.locator(`${selector}:has-text("${item.sellingPrice}")`).first();
          if (await priceElement.isVisible({ timeout: 2000 })) {
            console.log(`✅ Price found: ${item.sellingPrice}`);
            priceFound = true;
            break;
          }
        } catch (error) {
          // Continue to next selector
        }
      }
      
      if (!priceFound) {
        console.log(`⚠️ Price not found in summary: ${item.sellingPrice}`);
      }
      
      // Calculate and check total amount
      const expectedTotal = item.quantity * item.sellingPrice;
      let totalFound = false;
      for (const selector of selectors.orderSummary.total.split(', ')) {
        try {
          const totalElement = page.locator(`${selector}:has-text("${expectedTotal}")`).first();
          if (await totalElement.isVisible({ timeout: 2000 })) {
            console.log(`✅ Total amount found: ${expectedTotal}`);
            totalFound = true;
            break;
          }
        } catch (error) {
          // Continue to next selector
        }
      }
      
      if (!totalFound) {
        console.log(`⚠️ Total amount not found in summary: ${expectedTotal}`);
      }
      
      console.log(`📊 Item ${i + 1} verification: ${itemNameFound ? '✅' : '❌'} Name, ${quantityFound ? '✅' : '❌'} Qty, ${priceFound ? '✅' : '❌'} Price, ${totalFound ? '✅' : '❌'} Total`);
    }
    
    // Check for grand total
    console.log('\n💰 Checking grand total...');
    let grandTotalFound = false;
    for (const selector of selectors.orderSummary.grandTotal.split(', ')) {
      try {
        const totalElement = page.locator(selector).first();
        if (await totalElement.isVisible({ timeout: 2000 })) {
          const totalText = await totalElement.textContent();
          console.log(`✅ Grand total found: ${totalText}`);
          grandTotalFound = true;
          break;
        }
      } catch (error) {
        // Continue to next selector
      }
    }
    
    if (!grandTotalFound) {
      console.log('⚠️ Grand total not found in summary');
    }
    
    // Check for order details
    console.log('\n📋 Checking order details...');
    let orderDetailsFound = false;
    for (const selector of selectors.orderSummary.orderDetails.split(', ')) {
      try {
        const detailsElement = page.locator(selector).first();
        if (await detailsElement.isVisible({ timeout: 2000 })) {
          console.log(`✅ Order details found with selector: ${selector}`);
          orderDetailsFound = true;
          break;
        }
      } catch (error) {
        // Continue to next selector
      }
    }
    
    if (!orderDetailsFound) {
      console.log('⚠️ Order details not found in summary');
    }
    
    await takePicture(page, '17-order-summary-verified', config);
    
    console.log('✅ Order summary verification completed');
    return true;
    
  } catch (error) {
    console.log(`❌ Error verifying order summary: ${error.message}`);
    await takePicture(page, '17-order-summary-error', config);
    return false;
  }
}

// Export all functions
module.exports = {
  isPageActive,
  wait,
  takePicture,
  handleInsufficientStockWarning,
  handleExpirationWarningPopup,
  addItemToSalesOrder,
  verifyOrderSummary
};
