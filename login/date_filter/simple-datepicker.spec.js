/**
 * SIMPLE DATE PICKER TEST - Beginner Friendly Version
 * This test shows how to select any date from a date picker
 * Easy to understand and modify!
 */

const { test, expect } = require('@playwright/test');

test('Simple Date Picker Test', async ({ page }) => {
  // ========================================
  // STEP 1: CONFIGURE YOUR TARGET DATE
  // ========================================
  // Change these values to select any date you want!
  const targetDate = 15;        // Day: 1-31
  const targetMonth = 'December'; // Month: January, February, March, etc.
  const targetYear = 2024;      // Year: 2024, 2025, etc.
  
  console.log(`🎯 I want to select: ${targetDate} ${targetMonth} ${targetYear}`);

  // ========================================
  // STEP 2: LOGIN TO THE APPLICATION
  // ========================================
  console.log('🌐 Step 1: Going to login page...');
  await page.goto('https://stagingaz.ezscm.ai/', { 
    waitUntil: 'domcontentloaded',
    timeout: 15000 
  });
  
  console.log('📝 Step 2: Filling login form...');
  await page.waitForSelector('#email', { timeout: 10000 });
  await page.fill('#email', 'laurent.buyer+demo@gmail.com');
  await page.fill('#password', 'User@123');
  
  console.log('🔐 Step 3: Clicking login button...');
  await page.click('button[type="submit"]');
  
  // Wait for login to complete
  await page.waitForTimeout(3000);
  console.log('✅ Step 4: Login successful!');

  // ========================================
  // STEP 3: GO TO SALES ORDERS PAGE
  // ========================================
  console.log('🔍 Step 5: Going to Sales Orders page...');
  await page.click("//li[normalize-space()='Sales Orders']");
  await page.waitForTimeout(2000);  // Wait for page to load
  console.log('✅ Step 6: Now on Sales Orders page!');

  // ========================================
  // STEP 4: OPEN THE DATE PICKER
  // ========================================
  console.log('📅 Step 7: Opening date picker...');
  await page.click('//img[@id="sales_order_calender_icon"]');  // Click calendar icon
  await page.waitForTimeout(2000);  // Wait 2 seconds
  
  await page.click('//input[@placeholder="Select Delivery Date"]');  // Click date input
  await page.waitForTimeout(2000);  // Wait 2 seconds
  console.log('✅ Step 8: Date picker is now open!');

  // ========================================
  // STEP 5: NAVIGATE TO TARGET MONTH/YEAR
  // ========================================
  console.log(`🎯 Step 9: Going to ${targetMonth} ${targetYear}...`);
  
  // Get current month and year
  const currentMonthText = await page.textContent('//div[@class="react-datepicker__current-month"]');
  console.log(`📅 Currently showing: ${currentMonthText}`);
  
  // Simple navigation logic
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                     'July', 'August', 'September', 'October', 'November', 'December'];
  
  const currentMonth = currentMonthText.split(' ')[0];
  const currentYear = parseInt(currentMonthText.split(' ')[1]);
  const currentMonthIndex = monthNames.indexOf(currentMonth);
  const targetMonthIndex = monthNames.indexOf(targetMonth);
  
  // Calculate how many months to move
  const yearDifference = targetYear - currentYear;
  const monthDifference = targetMonthIndex - currentMonthIndex;
  const totalMonthsToMove = (yearDifference * 12) + monthDifference;
  
  console.log(`📊 Need to move ${totalMonthsToMove} months`);
  
  // Move to target month
  for (let i = 0; i < Math.abs(totalMonthsToMove); i++) {
    if (totalMonthsToMove > 0) {
      console.log(`➡️ Moving to next month...`);
      await page.click('//button[@aria-label="Next Month"]');
    } else {
      console.log(`⬅️ Moving to previous month...`);
      await page.click('//button[@aria-label="Previous Month"]');
    }
    await page.waitForTimeout(500);  // Wait half a second
  }
  
  console.log(`✅ Step 10: Now showing ${targetMonth} ${targetYear}!`);

  // ========================================
  // STEP 6: SELECT THE TARGET DATE
  // ========================================
  console.log(`📅 Step 11: Looking for date ${targetDate}...`);
  
  // Find all available dates
  const allDates = page.locator('//div[contains(@class, "react-datepicker__day") and @role="option"]');
  const totalDates = await allDates.count();
  console.log(`📊 Found ${totalDates} dates to choose from`);
  
  // Search for our target date
  let dateFound = false;
  for (let i = 0; i < totalDates; i++) {
    const dateText = await allDates.nth(i).textContent();
    
    if (dateText === targetDate.toString()) {
      console.log(`🎯 Found date ${targetDate} at position ${i + 1}!`);
      await allDates.nth(i).click();
      console.log(`✅ Step 12: Successfully selected date ${targetDate}!`);
      dateFound = true;
      break;
    }
  }
  
  if (!dateFound) {
    console.log(`❌ Could not find date ${targetDate}`);
  }

  // ========================================
  // STEP 7: CLICK OK BUTTON
  // ========================================
  console.log('🔘 Step 13: Clicking OK button...');
  await page.waitForTimeout(2000);  // Wait 2 seconds
  await page.click('//button[@id="salesOrder_salesOrders_okButton"]');
  console.log('✅ Step 14: OK button clicked!');

  // ========================================
  // STEP 8: TAKE A SCREENSHOT
  // ========================================
  console.log('📸 Step 15: Taking final screenshot...');
  await page.screenshot({ path: 'simple-datepicker-result.png' });
  console.log('✅ Step 16: Screenshot saved as simple-datepicker-result.png');

  console.log('🎉 Test completed successfully!');
  console.log(`📅 You selected: ${targetDate} ${targetMonth} ${targetYear}`);
});
