/**
 * BEGINNER DATE PICKER TEST - Super Simple Version
 * Perfect for beginners to understand how date picker automation works
 * 
 * WHAT THIS TEST DOES:
 * 1. Logs into the application
 * 2. Opens a date picker
 * 3. Selects a specific date
 * 4. Clicks OK
 */

const { test, expect } = require('@playwright/test');

test('Beginner Date Picker Test', async ({ page }) => {
  
  // ========================================
  // PART 1: SET YOUR TARGET DATE
  // ========================================
  // 👇 CHANGE THESE VALUES TO SELECT ANY DATE YOU WANT
  const day = 25;           // Day of month (1-31)
  const month = 'January';  // Month name
  const year = 2025;        // Year
  
  console.log(`🎯 GOAL: Select ${day} ${month} ${year}`);

  // ========================================
  // PART 2: LOGIN (Copy this pattern for any login)
  // ========================================
  console.log('🌐 Step 1: Going to website...');
  await page.goto('https://stagingaz.ezscm.ai/');
  
  console.log('📝 Step 2: Filling login form...');
  await page.fill('#email', 'laurent.buyer+demo@gmail.com');
  await page.fill('#password', 'User@123');
  await page.click('button[type="submit"]');
  
  console.log('✅ Step 3: Login done!');

  // ========================================
  // PART 3: GO TO SALES ORDERS PAGE
  // ========================================
  console.log('🔍 Step 4: Going to Sales Orders...');
  await page.click("//li[normalize-space()='Sales Orders']");
  await page.waitForTimeout(3000);  // Wait 3 seconds for page to load
  console.log('✅ Step 5: On Sales Orders page!');

  // ========================================
  // PART 4: OPEN DATE PICKER
  // ========================================
  console.log('📅 Step 6: Opening date picker...');
  
  // Click the calendar icon
  await page.click('//img[@id="sales_order_calender_icon"]');
  await page.waitForTimeout(2000);
  
  // Click the date input field
  await page.click('//input[@placeholder="Select Delivery Date"]');
  await page.waitForTimeout(2000);
  
  console.log('✅ Step 7: Date picker is open!');

  // ========================================
  // PART 5: NAVIGATE TO YOUR TARGET MONTH
  // ========================================
  console.log(`🎯 Step 8: Going to ${month} ${year}...`);
  
  // Get current month
  const currentMonthText = await page.textContent('//div[@class="react-datepicker__current-month"]');
  console.log(`📅 Currently showing: ${currentMonthText}`);
  
  // Simple month names array
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
                 'July', 'August', 'September', 'October', 'November', 'December'];
  
  // Calculate how many months to move
  const currentMonth = currentMonthText.split(' ')[0];
  const currentYear = parseInt(currentMonthText.split(' ')[1]);
  const currentIndex = months.indexOf(currentMonth);
  const targetIndex = months.indexOf(month);
  const yearDiff = year - currentYear;
  const monthDiff = targetIndex - currentIndex;
  const totalMonths = (yearDiff * 12) + monthDiff;
  
  console.log(`📊 Need to move ${totalMonths} months`);
  
  // Move to target month
  for (let i = 0; i < Math.abs(totalMonths); i++) {
    if (totalMonths > 0) {
      console.log(`➡️ Next month...`);
      await page.click('//button[@aria-label="Next Month"]');
    } else {
      console.log(`⬅️ Previous month...`);
      await page.click('//button[@aria-label="Previous Month"]');
    }
    await page.waitForTimeout(500);
  }
  
  console.log(`✅ Step 9: Now showing ${month} ${year}!`);

  // ========================================
  // PART 6: SELECT YOUR TARGET DATE
  // ========================================
  console.log(`📅 Step 10: Looking for date ${day}...`);
  
  // Find all clickable dates
  const dates = page.locator('//div[contains(@class, "react-datepicker__day") and @role="option"]');
  const totalDates = await dates.count();
  console.log(`📊 Found ${totalDates} dates available`);
  
  // Search for your target date
  let found = false;
  for (let i = 0; i < totalDates; i++) {
    const dateText = await dates.nth(i).textContent();
    
    if (dateText === day.toString()) {
      console.log(`🎯 Found date ${day} at position ${i + 1}!`);
      await dates.nth(i).click();
      console.log(`✅ Step 11: Selected date ${day}!`);
      found = true;
      break;
    }
  }
  
  if (!found) {
    console.log(`❌ Could not find date ${day}`);
  }

  // ========================================
  // PART 7: CLICK OK BUTTON
  // ========================================
  console.log('🔘 Step 12: Clicking OK...');
  await page.waitForTimeout(2000);
  await page.click('//button[@id="salesOrder_salesOrders_okButton"]');
  console.log('✅ Step 13: OK clicked!');

  // ========================================
  // PART 8: TAKE SCREENSHOT
  // ========================================
  console.log('📸 Step 14: Taking screenshot...');
  await page.screenshot({ path: 'beginner-datepicker-result.png' });
  console.log('✅ Step 15: Screenshot saved!');

  console.log('🎉 SUCCESS! Test completed!');
  console.log(`📅 You selected: ${day} ${month} ${year}`);
});

/*
========================================
HOW TO USE THIS TEST:
========================================

1. CHANGE THE DATE:
   - Modify lines 12-14 to select any date you want
   - Example: day = 15, month = 'March', year = 2025

2. RUN THE TEST:
   - npx playwright test login/beginner-datepicker.spec.js

3. UNDERSTAND EACH PART:
   - PART 1: Set your target date
   - PART 2: Login to the app
   - PART 3: Navigate to the right page
   - PART 4: Open the date picker
   - PART 5: Navigate to your target month/year
   - PART 6: Find and select your target date
   - PART 7: Click OK to confirm
   - PART 8: Take a screenshot as proof

4. KEY CONCEPTS:
   - page.goto() - Go to a website
   - page.fill() - Fill input fields
   - page.click() - Click buttons/elements
   - page.waitForTimeout() - Wait for things to load
   - page.locator() - Find elements on the page
   - page.screenshot() - Take a picture

5. COMMON PATTERNS:
   - Always wait after clicking (waitForTimeout)
   - Use locator() to find elements
   - Use loops to search through lists
   - Use console.log() to see what's happening

This is the foundation of web automation!
*/
