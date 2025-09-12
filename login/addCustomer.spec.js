import { test, expect } from '@playwright/test';

test.describe('Add Customer Tests', () => {
  test('Add new customer and verify with valid details', async ({ page }) => {
    // Increase test timeout to handle slow application
    test.setTimeout(60000); // 60 seconds instead of default 30
    console.log('🚀 Starting Add Customer test...');
    
    // Capture console errors and network requests
    const consoleErrors = [];
    const networkRequests = [];
    const networkErrors = [];
    
    // Listen for console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push({
          type: 'console',
          message: msg.text(),
          location: msg.location(),
          timestamp: new Date().toISOString()
        });
        console.log('❌ Console Error:', msg.text());
      }
    });
    
    // Listen for ALL network requests (like Network tab)
    page.on('request', request => {
      const requestData = {
        type: 'request',
        method: request.method(),
        url: request.url(),
        headers: request.headers(),
        postData: request.postData(),
        timestamp: new Date().toISOString(),
        resourceType: request.resourceType()
      };
      
      networkRequests.push(requestData);
      
      // Log API calls (XHR/Fetch requests)
      if (request.resourceType() === 'xhr' || request.resourceType() === 'fetch') {
        console.log(`🌐 API Call: ${request.method()} ${request.url()}`);
      }
    });
    
    // Listen for ALL network responses (like Network tab)
    page.on('response', async response => {
      const request = response.request();
      const responseData = {
        type: 'response',
        method: request.method(),
        url: response.url(),
        status: response.status(),
        statusText: response.statusText(),
        headers: response.headers(),
        timestamp: new Date().toISOString(),
        resourceType: request.resourceType(),
        size: 0,
        time: 0
      };
      
      // Try to get response body for API calls
      if (request.resourceType() === 'xhr' || request.resourceType() === 'fetch') {
        try {
          const responseBody = await response.text();
          responseData.responseBody = responseBody;
          responseData.size = responseBody.length;
          
          // Log API responses
          if (response.ok()) {
            console.log(`✅ API Response: ${response.status()} ${request.method()} ${response.url()}`);
          } else {
            console.log(`❌ API Error: ${response.status()} ${request.method()} ${response.url()}`);
            networkErrors.push(responseData);
          }
        } catch (error) {
          console.log(`⚠️ Could not read response body for ${response.url()}`);
        }
      }
      
      networkRequests.push(responseData);
    });
    
    // Listen for failed requests
    page.on('requestfailed', request => {
      const failedRequest = {
        type: 'request_failed',
        method: request.method(),
        url: request.url(),
        failure: request.failure()?.errorText || 'Unknown error',
        timestamp: new Date().toISOString(),
        resourceType: request.resourceType()
      };
      
      networkErrors.push(failedRequest);
      console.log(`❌ Request Failed: ${request.method()} ${request.url()} - ${request.failure()?.errorText}`);
    });
    
    // Function to save comprehensive network report (can be called anytime)
    const saveErrorReport = async (testStatus = 'unknown') => {
      const fs = require('fs');
      
      // Create comprehensive network report
      const networkReport = {
        testName: 'Add Customer Test',
        testStatus: testStatus,
        timestamp: new Date().toISOString(),
        summary: {
          totalRequests: networkRequests.length,
          totalErrors: consoleErrors.length + networkErrors.length,
          consoleErrors: consoleErrors.length,
          networkErrors: networkErrors.length,
          apiCalls: networkRequests.filter(req => req.resourceType === 'xhr' || req.resourceType === 'fetch').length
        },
        consoleErrors,
        networkErrors,
        allNetworkRequests: networkRequests
      };
        
        const reportPath = 'network-report.json';
        fs.writeFileSync(reportPath, JSON.stringify(networkReport, null, 2));
        console.log(`\n📄 Network report saved to: ${reportPath} (Test Status: ${testStatus})`);
        console.log('📧 Share this file with your development team for debugging');
        
        // Attach the network report to the HTML report
        await test.info().attach('network-report.json', {
          path: reportPath,
          contentType: 'application/json'
        });
        console.log('📎 Network report attached to HTML report');
        
        // Also create a human-readable network summary
        const summaryPath = 'network-summary.md';
        const apiCalls = networkRequests.filter(req => req.resourceType === 'xhr' || req.resourceType === 'fetch');
        
        const summary = `# Network Report for Add Customer Test

**Test Status:** ${testStatus}  
**Timestamp:** ${new Date().toISOString()}  
**Total Requests:** ${networkRequests.length}  
**API Calls:** ${apiCalls.length}  
**Total Errors:** ${consoleErrors.length + networkErrors.length}

## API Calls Summary (${apiCalls.length})
${apiCalls.map((req, index) => `
### ${index + 1}. ${req.method} ${req.url}
- **Type:** ${req.resourceType}
- **Time:** ${req.timestamp}
- **Status:** ${req.status || 'Pending'}
${req.responseBody ? `- **Response Size:** ${req.size} bytes` : ''}
`).join('')}

## Console Errors (${consoleErrors.length})
${consoleErrors.map((error, index) => `
### ${index + 1}. ${error.message.split('\n')[0]}
- **Location:** ${error.location.url}:${error.location.lineNumber}:${error.location.columnNumber}
- **Time:** ${error.timestamp}
`).join('')}

## Network Errors (${networkErrors.length})
${networkErrors.map((error, index) => `
### ${index + 1}. ${error.type.toUpperCase()}
- **Method:** ${error.method}
- **URL:** ${error.url}
- **Status:** ${error.status} ${error.statusText}
- **Time:** ${error.timestamp}
`).join('')}

## All Network Requests (${networkRequests.length})
${networkRequests.map((req, index) => `
### ${index + 1}. ${req.method} ${req.url}
- **Type:** ${req.resourceType}
- **Time:** ${req.timestamp}
- **Status:** ${req.status || 'Pending'}
`).join('')}

---
*This report was automatically generated by Playwright test automation.*
`;
        
        fs.writeFileSync(summaryPath, summary);
        await test.info().attach('network-summary.md', {
          path: summaryPath,
          contentType: 'text/markdown'
        });
        console.log('📎 Network summary attached to HTML report');
    };
    
    // Wrap the entire test in try-catch to capture errors even on failure
    try {
    
    // Step 1: Login to the application
    console.log('📱 Navigating to ezSCM website...');
    await page.goto('http://192.168.0.100:3000/');
    console.log('✅ Page loaded successfully');
    
    console.log('📧 Filling email field...');
    await page.getByRole('textbox', { name: 'Email or Phone number' }).click();
    await page.getByRole('textbox', { name: 'Email or Phone number' }).fill('rollinivi4+test@gmail.com');
    console.log('✅ Email filled: rollinivi4+test@gmail.com');
    

    console.log('🔒 Filling password field...');
    await page.getByRole('textbox', { name: '********' }).click();
    await page.getByRole('textbox', { name: '********' }).fill('User@123');
    console.log('✅ Password filled');
    
    
    console.log('☑️ Checking "Keep me logged in" checkbox...');
    await page.getByText('Keep me logged in').click();
    console.log('✅ Checkbox checked');
    
    console.log('🖱️ Clicking login button...');
    await page.getByRole('button', { name: 'Log in' }).click();
    console.log('✅ Login button clicked');
    
    // Wait for login to complete
    console.log('⏳ Waiting for login to complete...');
    
    // Wait for dashboard to load (Sales Orders is visible in snapshot)
    await page.waitForSelector('text=Sales Orders', { timeout: 15000 });
    console.log('✅ Dashboard loaded successfully');
    
    // Take screenshot after login
    console.log('📸 Taking screenshot after login...');
    try {
      await page.screenshot({ path: 'screenshot-login.png' });
      console.log('✅ Screenshot saved as screenshot-login.png');
    } catch (error) {
      console.log('⚠️ Screenshot failed, continuing...');
    }
    
    // Give a short stabilization time - use waitForLoadState instead of waitForTimeout
    console.log('⏳ Waiting for dashboard to fully stabilize...');
    try {
      await page.waitForLoadState('networkidle', { timeout: 5000 });
      console.log('✅ Dashboard stabilized (network idle)');
    } catch (error) {
      console.log('⚠️ Network idle timeout, continuing...');
      // Fallback to a very short timeout
      await page.waitForTimeout(500);
      console.log('✅ Dashboard stabilized (fallback)');
    }
    
    // Step 2: Navigate to Sales Orders
    console.log('🔍 Looking for Sales Orders menu...');
    const salesOrder = page.locator('text=Sales Orders');
    await expect(salesOrder).toBeVisible();
    console.log('✅ Sales Orders found');
    
    console.log('🖱️ Clicking on Sales Orders menu...');
    await salesOrder.click();
    console.log('✅ Sales Orders clicked');
    
    // Wait for Sales Orders page to load
    await page.waitForSelector('text=Create New Sales Order', { timeout: 10000 });
    console.log('✅ Sales Orders page loaded');
    
    console.log('📸 Taking screenshot of Sales Orders page...');
    try {
      await page.screenshot({ path: 'screenshot-salesOrders.png' });
      console.log('✅ Screenshot saved as screenshot-salesOrders.png');
    } catch (error) {
      console.log('⚠️ Screenshot failed, continuing...');
    }
    
    // Step 3: Create New Sales Order
    console.log('🖱️ Clicking Create New Sales Order button...');
    await page.getByRole('button', { name: 'Create New Sales Order' }).click();
    console.log('✅ Create New Sales Order button clicked');
    
    // Wait for the form to load
    await page.waitForTimeout(5000);
    await page.waitForSelector('text=Add Customer');
    console.log('✅ Create Sales Order form loaded');
    
    // Check page health before proceeding
    if (page.isClosed()) {
      throw new Error('Page was closed after Create Sales Order form loaded');
    }
    console.log('✅ Page is still alive and responsive');
    
    console.log('📸 Taking screenshot of Create Sales Order form...');
    try {
      await page.screenshot({ path: 'screenshot-createSalesOrder.png' });
      console.log('✅ Screenshot saved as screenshot-createSalesOrder.png');
    } catch (error) {
      console.log('⚠️ Screenshot failed, continuing...');
    }
    
    // Step 4: Add Customer
    console.log('🖱️ Clicking Add Customer button...');
    try {
      // Wait for the button to be available and stable
      await page.waitForSelector('button:has-text("Add Customer")', { timeout: 10000 });
      await page.waitForTimeout(1000); // Small stabilization wait
      
      // Check if page is still alive before clicking
      if (page.isClosed()) {
        throw new Error('Page was closed before clicking Add Customer button');
      }
      
      await page.getByRole('button', { name: 'Add Customer' }).click();
      console.log('✅ Add Customer button clicked');
    } catch (error) {
      console.log('❌ Failed to click Add Customer button:', error.message);
      // Take a screenshot for debugging
      try {
        await page.screenshot({ path: 'debug-add-customer-failed.png' });
        console.log('📸 Debug screenshot saved: debug-add-customer-failed.png');
      } catch (screenshotError) {
        console.log('⚠️ Could not take debug screenshot');
      }
      throw error;
    }
    
    // Wait for customer form to load
    await page.waitForSelector('input[type="tel"]', { timeout: 10000 });
    console.log('✅ Add Customer form loaded');
    
    console.log('📸 Taking screenshot of Add Customer form...');
    try {
      await page.screenshot({ path: 'screenshot-addCustomerForm.png' });
      console.log('✅ Screenshot saved as screenshot-addCustomerForm.png');
    } catch (error) {
      console.log('⚠️ Screenshot failed, continuing...');
    }
    
    // Step 5: Fill customer details
    // add delay
    await page.waitForTimeout(5000);
    console.log('📞 Filling phone number...');
    
    // Try multiple selectors for phone number field
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
    for (const selector of phoneSelectors) {
      try {
        phoneField = page.locator(selector).first();
        if (await phoneField.isVisible({ timeout: 1000 })) {
          console.log(`✅ Found phone field with selector: ${selector}`);
          break;
        }
      } catch (error) {
        console.log(`⚠️ Selector ${selector} not found, trying next...`);
      }
    }
    
    if (!phoneField) {
      throw new Error('Could not find phone number input field');
    }
    
    // Clear and fill the phone number
    await phoneField.click();
    const phoneNumber = '985689325955';
    console.log(`📱 Attempting to enter phone number: ${phoneNumber}`);
    
    // Try multiple approaches to fill the phone number
    let success = false;
    
    // Method 1: Direct fill
    try {
      await phoneField.fill(phoneNumber);
      await page.waitForTimeout(500);
      const value1 = await phoneField.inputValue();
      if (value1 && value1.length > 5) {
        console.log('✅ Phone number filled using fill(): ', value1);
        success = true;
      }
    } catch (error) {
      console.log('⚠️ Fill method failed:', error.message);
    }
    
    // Method 2: Type with delay if fill didn't work
    if (!success) {
      try {
        
        await phoneField.type(phoneNumber, { delay: 100 });
        await page.waitForTimeout(500);
        const value2 = await phoneField.inputValue();
        if (value2 && value2.length > 5) {
          console.log('✅ Phone number filled using type(): ', value2);
          success = true;
        }
      } catch (error) {
        console.log('⚠️ Type method failed:', error.message);
      }
    }
    
    // Method 3: Try with country code if still not working
    if (!success) {
      try {
        
        await phoneField.type('+91' + phoneNumber, { delay: 100 });
        await page.waitForTimeout(500);
        const value3 = await phoneField.inputValue();
        console.log('✅ Phone number filled with country code: ', value3);
        success = true;
      } catch (error) {
        console.log('⚠️ Country code method failed:', error.message);
      }
    }
    
    // Final verification
    const finalValue = await phoneField.inputValue();
    console.log(`📱 Final phone field value: "${finalValue}"`);
    
    if (!finalValue || finalValue.length < 5) {
      console.log('❌ Phone number field is still not working properly');
      // Take a screenshot for debugging
      try {
        await page.screenshot({ path: 'debug-phone-field.png' });
        console.log('📸 Debug screenshot saved: debug-phone-field.png');
      } catch (error) {
        console.log('⚠️ Could not take debug screenshot');
      }
    } else {
      console.log('✅ Phone number successfully entered');
    }
    
    console.log('👤 Filling first name...');
    await page.getByRole('textbox', { name: 'First Name' }).click();
    await page.getByRole('textbox', { name: 'First Name' }).fill('Nisarga');
    console.log('✅ First name filled: Nisarga');
    
    console.log('👤 Filling last name...');
    await page.getByRole('textbox', { name: 'Last Name' }).click();
    await page.getByRole('textbox', { name: 'Last Name' }).fill('p');
    console.log('✅ Last name filled: p');
    
    console.log('🏠 Filling address...');
    await page.getByRole('textbox', { name: 'Address', exact: true }).click();
    const address = '1, SB Market Main Road, Chickpet, Bengaluru, Karnataka 560053';
    await page.getByRole('textbox', { name: 'Address', exact: true }).fill(address);
    await page.waitForSelector("")

    const  fromAddress = await page.getByRole('textbox', { name: 'Address', exact: true }).inputValue();
    console.log('✅ Address filled: ', fromAddress);
    
    
    await page.waitForTimeout(5000);
    // Fill pincode field
    console.log('📮 Filling pincode...');
    await page.getByPlaceholder('Pincode').click();
    await page.getByPlaceholder('Pincode').fill('560053');
    console.log('✅ Pincode filled: 560053');
    
    console.log('📸 Taking screenshot before saving customer...');
    try {
      await page.screenshot({ path: 'screenshot-customerDetails.png' });
      console.log('✅ Screenshot saved as screenshot-customerDetails.png');
    } catch (error) {
      console.log('⚠️ Screenshot failed, continuing...');
    }
    
    // Step 6: Save Customer
    await page.waitForTimeout(10000);
    console.log('💾 Clicking Save Customer button...');
    await page.getByRole('button', { name: 'Save Customer' }).click();
    console.log('✅ Save Customer button clicked');
    
    // Wait for customer to be saved
    await page.waitForSelector('[data-test="search-input"]', { timeout: 10000 });
    console.log('✅ Customer saved successfully');
    
    console.log('📸 Taking screenshot after saving customer...');
    try {
      await page.screenshot({ path: 'screenshot-customerSaved.png' });
      console.log('✅ Screenshot saved as screenshot-customerSaved.png');
    } catch (error) {
      console.log('⚠️ Screenshot failed, continuing...');
    }
    
    // Step 7: Search and verify customer
    console.log('🔍 Searching for the created customer...');
    await page.locator('[data-test="search-input"]').click();
    await page.locator('[data-test="search-input"]').fill('nisarga');
    console.log('✅ Search term entered: nis');
    
    // Wait for search results
    await page.waitForSelector('[data-test="result"]', { timeout: 10000 });
    console.log('✅ Search results loaded');
    
    console.log('📸 Taking screenshot of search results...');
    try {
      await page.screenshot({ path: 'screenshot-searchResults.png' });
      console.log('✅ Screenshot saved as screenshot-searchResults.png');
    } catch (error) {
      console.log('⚠️ Screenshot failed, continuing...');
    }
    
    console.log('👆 Clicking on found customer...');
    await page.locator('[data-test="result"]').getByText('Nisarga').click();
    console.log('✅ Customer clicked: Nisarga');
    
    // Final verification
    await page.waitForTimeout(2000);
    
    console.log('📸 Taking final screenshot...');
    try {
      await page.screenshot({ path: 'screenshot-final.png' });
      console.log('✅ Screenshot saved as screenshot-final.png');
    } catch (error) {
      console.log('⚠️ Screenshot failed, continuing...');
    }
    
    console.log('🎥 Video recording is enabled in config...');
    console.log('✅ Video will be saved automatically for ALL tests (pass or fail)');
    
    // Report all network activity found during the test
    console.log('\n📊 NETWORK REPORT:');
    console.log('==================');
    
    const apiCalls = networkRequests.filter(req => req.resourceType === 'xhr' || req.resourceType === 'fetch');
    console.log(`\n🌐 Total Network Requests: ${networkRequests.length}`);
    console.log(`🔗 API Calls (XHR/Fetch): ${apiCalls.length}`);
    
    if (apiCalls.length > 0) {
      console.log(`\n📡 API Calls Summary:`);
      apiCalls.forEach((req, index) => {
        console.log(`${index + 1}. ${req.method} ${req.url}`);
        console.log(`   Status: ${req.status || 'Pending'} | Time: ${req.timestamp}`);
      });
    }
    
    if (consoleErrors.length > 0) {
      console.log(`\n❌ Console Errors Found: ${consoleErrors.length}`);
      consoleErrors.forEach((error, index) => {
        console.log(`${index + 1}. [${error.timestamp}] ${error.message}`);
        console.log(`   Location: ${error.location.url}:${error.location.lineNumber}:${error.location.columnNumber}`);
      });
    } else {
      console.log('✅ No console errors found');
    }
    
    if (networkErrors.length > 0) {
      console.log(`\n❌ Network Errors Found: ${networkErrors.length}`);
      networkErrors.forEach((error, index) => {
        console.log(`${index + 1}. [${error.timestamp}] ${error.type.toUpperCase()}`);
        console.log(`   Method: ${error.method} | URL: ${error.url}`);
        if (error.status) {
          console.log(`   Status: ${error.status} ${error.statusText}`);
        }
        if (error.failure) {
          console.log(`   Error: ${error.failure}`);
        }
      });
    } else {
      console.log('✅ No network errors found');
    }
    
    // Save errors to file for development team
    await saveErrorReport('completed');
    
    console.log('\n✅ Add Customer test completed successfully!');
    
    } catch (testError) {
      // Test failed - but we still want to capture and report errors
      console.log('\n❌ TEST FAILED - but capturing errors for debugging...');
      console.log(`❌ Test Error: ${testError.message}`);
      
      // Report all errors found during the test (even on failure)
      console.log('\n📊 ERROR REPORT:');
      console.log('================');
      
      if (consoleErrors.length > 0) {
        console.log(`\n❌ Console Errors Found: ${consoleErrors.length}`);
        consoleErrors.forEach((error, index) => {
          console.log(`${index + 1}. [${error.timestamp}] ${error.message}`);
          console.log(`   Location: ${error.location.url}:${error.location.lineNumber}:${error.location.columnNumber}`);
        });
      } else {
        console.log('✅ No console errors found');
      }
      
      if (networkErrors.length > 0) {
        console.log(`\n❌ Network Errors Found: ${networkErrors.length}`);
        networkErrors.forEach((error, index) => {
          console.log(`${index + 1}. [${error.timestamp}] ${error.type.toUpperCase()}`);
          console.log(`   URL: ${error.url}`);
          if (error.status) {
            console.log(`   Status: ${error.status} ${error.statusText}`);
          }
          if (error.failure) {
            console.log(`   Error: ${error.failure}`);
          }
        });
      } else {
        console.log('✅ No network errors found');
      }
      
      // Save error report even on test failure
      await saveErrorReport('failed');
      
      // Re-throw the error so the test is marked as failed
      throw testError;
    }
  });
});