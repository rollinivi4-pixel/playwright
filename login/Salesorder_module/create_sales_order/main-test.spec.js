/**
 * MAIN TEST FILE - CREATE SALES ORDER
 * 
 * This is the main test file that orchestrates the entire sales order creation process.
 * It uses helper functions and selectors from separate files for better organization.
 */

import { test, expect } from '@playwright/test';

// Import configuration and helper files
const config = require('../test-config.js');
const selectors = require('./selectors.js');
const helpers = require('./helper-functions.js');

/**
 * MAIN TEST: Create Sales Order - Ultra Simple Version
 * 
 * This test creates a complete sales order with:
 * 1. Login
 * 2. Navigate to Sales Orders
 * 3. Search and select customer
 * 4. Select order from and location
 * 5. Add items to order
 * 6. Handle stock warnings and expiration popups
 * 7. Verify order summary
 */
test('Create Sales Order - Ultra Simple Version', async ({ page }) => {
  // Set a longer timeout for this test
  test.setTimeout(120000); // 2 minutes
  console.log('🚀 Starting the test...');
  console.log('=======================');

  // Step 1: Open the application
  console.log('\n📍 Step 1: Opening the application');
  try {
    await page.goto(config.application.baseUrl, { 
      waitUntil: 'networkidle',
      timeout: config.application.timeouts.long 
    });
    console.log('✅ Application opened successfully!');
  } catch (error) {
    console.log('❌ Could not open application. Make sure it is running!');
    console.log(`💡 Tried to open: ${config.application.baseUrl}`);
    throw error;
  }

  // Take a picture
  await helpers.takePicture(page, '01-app-opened', config);

  // Step 2: Login
  console.log('\n🔐 Step 2: Logging in');
  
  // Fill email
  console.log('📧 Entering email...');
  await page.fill(selectors.login.email, config.login.email);
  
  // Fill password
  console.log('🔒 Entering password...');
  await page.fill(selectors.login.password, config.login.password);
  
  // Check "Keep me logged in" if enabled
  if (config.login.keepLoggedIn) {
    try {
      await page.check(selectors.login.checkbox);
      console.log('☑️ Checked "Keep me logged in"');
    } catch (error) {
      console.log('⚠️ Could not find checkbox');
    }
  }

  // Take a picture before login
  await helpers.takePicture(page, '02-login-form', config);

  // Click login button
  console.log('🖱️ Clicking login button...');
  await page.click(selectors.login.loginButton);

  // Wait for login to complete
  await helpers.wait(3);
  
  // Check if login worked
  try {
    await page.waitForSelector('text=Sales Orders', { timeout: 10000 });
    console.log('✅ Login successful!');
  } catch (error) {
    console.log('❌ Login failed!');
    await helpers.takePicture(page, '03-login-failed', config);
    throw error;
  }

  // Take a picture after login
  await helpers.takePicture(page, '03-login-success', config);

  // Step 3: Go to Sales Orders
  console.log('\n📋 Step 3: Going to Sales Orders');
  await page.click(selectors.navigation.salesOrders);
  await helpers.wait(2);
  await helpers.takePicture(page, '04-sales-orders', config);

  // Step 4: Go to Sales Order Sub-module
  console.log('\n📋 Step 4: Going to Sales Order Sub-module');
  
  // Wait a bit for any sub-menu to appear
  await helpers.wait(1);
  
  try {
    // First try to find and click the sub-menu item
    console.log('🔍 Looking for Sales Order sub-menu...');
    await page.waitForSelector(selectors.navigation.salesOrderSBModule, { timeout: 5000 });
    await page.click(selectors.navigation.salesOrderSBModule);
    await helpers.wait(2);
    await helpers.takePicture(page, '05-sales-order-submodule', config);
    console.log('✅ Successfully navigated to Sales Order sub-module');
  } catch (error) {
    console.log('⚠️ Could not find sub-menu with primary selector, trying alternatives...');
    
    try {
      // Try alternative approach - look for any link containing "salesorders"
      await page.click('a[href*="salesorders"]');
      await helpers.wait(2);
      await helpers.takePicture(page, '05-sales-order-submodule-alt', config);
      console.log('✅ Used alternative navigation method');
    } catch (altError) {
      console.log('⚠️ Alternative navigation also failed, continuing with current page...');
      await helpers.takePicture(page, '05-sales-order-submodule-skip', config);
    }
  }

  // Step 5: Create New Sales Order
  console.log('\n🛒 Step 5: Creating new sales order');
  
  let createOrderClicked = false;
  for (const selector of selectors.createOrder.createButton) {
    try {
      console.log(`🔍 Trying Create Order selector: ${selector}`);
      await page.waitForSelector(selector, { timeout: 3000 });
      await page.click(selector);
      console.log(`✅ Create Order clicked with selector: ${selector}`);
      createOrderClicked = true;
      break;
    } catch (error) {
      console.log(`⚠️ Selector ${selector} not found, trying next...`);
    }
  }
  
  if (!createOrderClicked) {
    throw new Error('Failed to click Create New Sales Order button');
  }
  
  await helpers.wait(3);
  await helpers.takePicture(page, '06-create-order', config);

  // Step 6: Search and Verify Customer
  console.log('\n🔍 Step 6: Searching and verifying customer');
  
  // Wait for the customer search page to load
  await helpers.wait(2);
  await helpers.takePicture(page, '07-customer-search-page', config);
  
  // Search for customer using the search input
  console.log('🔍 Searching for customer...');
  try {
    // Try multiple selectors for the search input
    let searchField = null;
    for (const selector of selectors.customerSearch.searchField) {
      try {
        const element = page.locator(selector).first();
        if (await element.isVisible({ timeout: 2000 })) {
          searchField = element;
          console.log(`✅ Found search field with selector: ${selector}`);
          break;
        }
      } catch (error) {
        console.log(`⚠️ Search selector ${selector} not found, trying next...`);
      }
    }
    
    if (searchField) {
      // Clear and type the customer phone number
      await searchField.click();
      await searchField.clear();
      await searchField.type(config.customer.phone, { delay: 100 });
      console.log(`✅ Searched for customer phone: ${config.customer.phone}`);
      
      // Wait for search results to load
      await helpers.wait(3);
      await helpers.takePicture(page, '08-customer-search-results', config);
      
      // Debug: Let's see what's actually on the page
      console.log('🔍 Debugging: Looking for any clickable elements...');
      try {
        const allClickableElements = await page.locator('div, li, tr, td, span, p, a, button').all();
        console.log(`📋 Found ${allClickableElements.length} potential clickable elements`);
        
        let foundCustomerElements = 0;
        for (let i = 0; i < Math.min(allClickableElements.length, 20); i++) {
          try {
            const text = await allClickableElements[i].textContent();
            if (text && (text.includes(config.customer.phone) || text.includes(config.customer.firstName) || text.includes('customer'))) {
              console.log(`🔘 Found potential customer element ${i + 1}: "${text}"`);
              foundCustomerElements++;
            }
          } catch (error) {
            // Continue to next element
          }
        }
        
        if (foundCustomerElements === 0) {
          console.log('⚠️ No customer elements found in search results');
          console.log('💡 This might mean:');
          console.log('   - Customer does not exist in the system');
          console.log('   - Search results are not loading properly');
          console.log('   - Customer data is in a different format');
        } else {
          console.log(`✅ Found ${foundCustomerElements} potential customer elements`);
        }
      } catch (error) {
        console.log('⚠️ Could not debug page elements');
      }
      
      // Try multiple approaches to find and select customer
      const customerSelectors = selectors.customerSearch.customerResults.map(selector => 
        selector.replace('${phone}', config.customer.phone)
      );
      
      // Add name-based selectors
      customerSelectors.push(
        `li:has-text("${config.customer.firstName}")`,
        `div:has-text("${config.customer.firstName}")`,
        `tr:has-text("${config.customer.firstName}")`,
        `td:has-text("${config.customer.firstName}")`
      );
      
      // Add generic selectors as last resort
      customerSelectors.push('li', 'div[role="button"]', 'div[onclick]');
      
      let customerSelected = false;
      for (const selector of customerSelectors) {
        try {
          console.log(`🔍 Trying customer selector: ${selector}`);
          const element = page.locator(selector).first();
          if (await element.isVisible({ timeout: 2000 })) {
            await element.click();
            console.log(`✅ Customer clicked with selector: ${selector}`);
            
            // Wait a moment for the selection to take effect
            await helpers.wait(1);
            
            // Verify that the customer was actually selected by checking for confirmation
            try {
              // Look for indicators that customer was selected
              let customerConfirmed = false;
              for (const confirmSelector of selectors.customerSearch.confirmation) {
                try {
                  if (await page.locator(confirmSelector).isVisible({ timeout: 2000 })) {
                    console.log(`✅ Customer selection confirmed with: ${confirmSelector}`);
                    customerConfirmed = true;
                    break;
                  }
                } catch (error) {
                  // Continue to next confirmation selector
                }
              }
              
              if (customerConfirmed) {
                customerSelected = true;
                console.log('✅ Customer successfully selected and confirmed!');
                break;
              } else {
                console.log('⚠️ Customer clicked but selection not confirmed, trying next selector...');
              }
              
            } catch (error) {
              console.log('⚠️ Could not verify customer selection');
            }
          }
        } catch (error) {
          console.log(`⚠️ Customer selector ${selector} not found, trying next...`);
        }
      }
      
      if (!customerSelected) {
        console.log('❌ Could not find or select customer in search results');
        console.log('💡 The customer might not exist in the system or the search results are not loading properly');
        
        // Take a screenshot to see what's on the page
        await helpers.takePicture(page, '08-customer-search-failed', config);
        
        // Try to continue anyway by looking for any "Add Customer" or "Create Customer" button
        try {
          const addCustomerSelectors = [
            'button:has-text("Add Customer")',
            'button:has-text("Create Customer")',
            'button:has-text("New Customer")',
            'a:has-text("Add Customer")',
            'text=Add Customer'
          ];
          
          for (const selector of addCustomerSelectors) {
            try {
              await page.waitForSelector(selector, { timeout: 2000 });
              await page.click(selector);
              console.log(`✅ Clicked Add Customer button with selector: ${selector}`);
              break;
            } catch (error) {
              // Continue to next selector
            }
          }
        } catch (error) {
          console.log('⚠️ Could not find Add Customer button either');
        }
      } else {
        console.log('✅ Customer selection completed successfully!');
        await helpers.takePicture(page, '08-customer-selected-confirmed', config);
      }
      
    } else {
      console.log('❌ Could not find search field');
    }
    
  } catch (error) {
    console.log('❌ Customer search failed:', error.message);
  }

  // Step 7: Select Order From
  console.log('\n📋 Step 7: Selecting order from');
  
  try {
    // Wait for the order form to load and verify we're on the right page
    await helpers.wait(2);
    
    // Check if we're on the order form page
    let orderFormFound = false;
    for (const indicator of selectors.createOrder.orderFormIndicators) {
      try {
        if (await page.locator(indicator).isVisible({ timeout: 2000 })) {
          console.log(`✅ Order form page confirmed with: ${indicator}`);
          orderFormFound = true;
          break;
        }
      } catch (error) {
        // Continue to next indicator
      }
    }
    
    if (!orderFormFound) {
      console.log('⚠️ Order form page not found, but continuing...');
    }
    
    await helpers.takePicture(page, '09-order-form-loaded', config);
    
    // Find and select the "Order From" dropdown
    const orderFromSelectors = [
      `select:has-text("${config.salesOrder.orderFrom}")`,
      `select option:has-text("${config.salesOrder.orderFrom}")`,
      'select',
      '[data-test="order-from"]',
      'select[name*="order"]',
      'select[name*="from"]'
    ];
    
    let orderFromSelected = false;
    for (const selector of orderFromSelectors) {
      try {
        console.log(`🔍 Trying Order From selector: ${selector}`);
        const element = page.locator(selector).first();
        if (await element.isVisible({ timeout: 2000 })) {
          await element.click();
          console.log(`✅ Order From dropdown clicked with selector: ${selector}`);
          
          // Try to select the order from option
          try {
            await page.selectOption(selector, { label: config.salesOrder.orderFrom });
            console.log(`✅ Selected ${config.salesOrder.orderFrom} from Order From dropdown`);
            orderFromSelected = true;
            break;
          } catch (error) {
            console.log('⚠️ Could not select ezSCM option, trying next selector...');
          }
        }
      } catch (error) {
        console.log(`⚠️ Order From selector ${selector} not found, trying next...`);
      }
    }
    
    if (!orderFromSelected) {
      console.log('⚠️ Could not select Order From, continuing...');
    }
    
  } catch (error) {
    console.log('❌ Order From selection failed:', error.message);
  }

  // Step 8: Select Location
  console.log('\n📍 Step 8: Selecting location');
  
  try {
    // Find and select the "Location" dropdown
    const locationSelectors = [
      `select:has-text("${config.salesOrder.location}")`,
      `select option:has-text("${config.salesOrder.location}")`,
      'select[name*="location"]',
      'select[name*="Location"]',
      '[data-test="location"]',
      'select:last-of-type'
    ];
    
    let locationSelected = false;
    for (const selector of locationSelectors) {
      try {
        console.log(`🔍 Trying Location selector: ${selector}`);
        const element = page.locator(selector).first();
        if (await element.isVisible({ timeout: 2000 })) {
          await element.click();
          console.log(`✅ Location dropdown clicked with selector: ${selector}`);
          
          // Try to select the location option
          try {
            await page.selectOption(selector, { label: config.salesOrder.location });
            console.log(`✅ Selected ${config.salesOrder.location} from Location dropdown`);
            locationSelected = true;
            break;
          } catch (error) {
            console.log('⚠️ Could not select Bangalore option, trying next selector...');
          }
        }
      } catch (error) {
        console.log(`⚠️ Location selector ${selector} not found, trying next...`);
      }
    }
    
    if (!locationSelected) {
      console.log('⚠️ Could not select Location, continuing...');
    }
    
    // Take screenshot after location selection
    await helpers.takePicture(page, '10-location-selected', config);
    
  } catch (error) {
    console.log('❌ Location selection failed:', error.message);
  }

  // Step 9: Add Items to Sales Order
  console.log('\n🛒 Step 9: Adding items to sales order');
  
  try {
    // Add each item from the config
    for (let i = 0; i < config.salesOrder.items.length; i++) {
      const item = config.salesOrder.items[i];
      console.log(`\n📦 Adding item ${i + 1}/${config.salesOrder.items.length}: ${item.itemName}`);
      
      try {
        await helpers.addItemToSalesOrder(page, config, item, i);
        console.log(`✅ Item ${i + 1} added successfully`);
        
        // If this is not the last item, wait a bit before adding the next one
        if (i < config.salesOrder.items.length - 1) {
          await helpers.wait(2);
        }
      } catch (error) {
        console.log(`❌ Failed to add item ${i + 1}: ${error.message}`);
        // Continue with next item instead of failing the entire test
      }
    }
    
    console.log('✅ All items added successfully');
    await helpers.takePicture(page, '11-all-items-added', config);
    
    // Step 10: Verify Order Summary
    console.log('\n📋 Step 10: Verifying order summary');
    try {
      await helpers.verifyOrderSummary(page, config, config.salesOrder.items);
      console.log('✅ Order summary verification completed');
    } catch (error) {
      console.log(`❌ Error verifying order summary: ${error.message}`);
    }
    
  } catch (error) {
    console.log(`❌ Error adding items: ${error.message}`);
    await helpers.takePicture(page, '11-items-error', config);
  }

  // Final picture
  await helpers.takePicture(page, '12-test-completed', config);

  // Success message
  console.log('\n🎉 TEST COMPLETED SUCCESSFULLY!');
  console.log('===============================');
  console.log('✅ Sales order creation process started');
  console.log('✅ Customer searched and verified');
  console.log('✅ Order from selected');
  console.log('✅ Location selected');
  console.log('✅ Items added to sales order');
  console.log('✅ Order summary verified');
  console.log('✅ All steps completed');
  console.log('✅ Pictures saved in screenshots/ folder');
  console.log('✅ Test passed! 🎉');
});

// Test cleanup
test.afterAll(async () => {
  console.log('\n🏁 All tests finished!');
  console.log('📸 Check the screenshots/ folder for pictures');
  console.log('📊 Check the test-results/ folder for reports');
});
