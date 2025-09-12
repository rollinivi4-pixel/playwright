/**
 * ULTRA SIMPLE DATE PICKER TEST
 * Perfect for absolute beginners!
 * 
 * This test shows the basic concepts of date picker automation
 * without getting into complex navigation or error handling.
 */

const { test, expect } = require('@playwright/test');

test('Ultra Simple Date Picker Test', async ({ page }) => {
  
  // ========================================
  // STEP 1: SET YOUR TARGET DATE
  // ========================================
  // 👇 CHANGE THESE VALUES TO SELECT ANY DATE YOU WANT
  const targetDay = 15;        // Day of month (1-31)
  const targetMonth = 'March'; // Month name
  const targetYear = 2025;     // Year
  
  console.log(`🎯 GOAL: Select ${targetDay} ${targetMonth} ${targetYear}`);

  // ========================================
  // STEP 2: LOGIN (Basic Pattern)
  // ========================================
  console.log('🌐 Going to website...');
  await page.goto('https://stagingaz.ezscm.ai/');
  
  console.log('📝 Filling login form...');
  await page.fill('#email', 'laurent.buyer+demo@gmail.com');
  await page.fill('#password', 'User@123');
  await page.click('button[type="submit"]');
  
  console.log('✅ Login successful!');

  // ========================================
  // STEP 3: NAVIGATE TO SALES ORDERS
  // ========================================
  console.log('🔍 Going to Sales Orders page...');
  await page.waitForTimeout(3000);  // Wait for page to load
  await page.click("//li[normalize-space()='Sales Orders']");
  await page.waitForTimeout(3000);  // Wait for navigation
  console.log('✅ On Sales Orders page!');

  // ========================================
  // STEP 4: OPEN DATE PICKER
  // ========================================
  console.log('📅 Opening date picker...');
  
  // Click calendar icon
  await page.click('//img[@id="sales_order_calender_icon"]');
  await page.waitForTimeout(2000);
  
  // Click date input
  await page.click('//input[@placeholder="Select Delivery Date"]');
  await page.waitForTimeout(2000);
  
  console.log('✅ Date picker is open!');

  // ========================================
  // STEP 5: NAVIGATE TO TARGET MONTH
  // ========================================
  console.log(`🎯 Going to ${targetMonth} ${targetYear}...`);
  
  // Get current month
  const currentMonthText = await page.textContent('//div[@class="react-datepicker__current-month"]');
  console.log(`📅 Currently showing: ${currentMonthText}`);
  
  // Month names array
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
                 'July', 'August', 'September', 'October', 'November', 'December'];
  
  // Calculate months to move
  const currentMonth = currentMonthText.split(' ')[0];
  const currentYear = parseInt(currentMonthText.split(' ')[1]);
  const currentIndex = months.indexOf(currentMonth);
  const targetIndex = months.indexOf(targetMonth);
  const yearDiff = targetYear - currentYear;
  const monthDiff = targetIndex - currentIndex;
  const totalMonths = (yearDiff * 12) + monthDiff;
  
  console.log(`📊 Need to move ${totalMonths} months`);
  
  // Move to target month
  for (let i = 0; i < Math.abs(totalMonths); i++) {
    if (totalMonths > 0) {
      console.log(`➡️ Moving to next month...`);
      await page.click('//button[@aria-label="Next Month"]');
    } else {
      console.log(`⬅️ Moving to previous month...`);
      await page.click('//button[@aria-label="Previous Month"]');
    }
    await page.waitForTimeout(500);
  }
  
  console.log(`✅ Now showing ${targetMonth} ${targetYear}!`);

  // ========================================
  // STEP 6: SELECT TARGET DATE
  // ========================================
  console.log(`📅 Looking for date ${targetDay}...`);
  
  // Find all dates
  const dates = page.locator('//div[contains(@class, "react-datepicker__day") and @role="option"]');
  const totalDates = await dates.count();
  console.log(`📊 Found ${totalDates} dates available`);
  
  // Search for target date
  let found = false;
  for (let i = 0; i < totalDates; i++) {
    const dateText = await dates.nth(i).textContent();
    
    if (dateText === targetDay.toString()) {
      console.log(`🎯 Found date ${targetDay} at position ${i + 1}!`);
      await dates.nth(i).click();
      console.log(`✅ Selected date ${targetDay}!`);
      found = true;
      break;
    }
  }
  
  if (!found) {
    console.log(`❌ Could not find date ${targetDay}`);
  }

  // ========================================
  // STEP 7: CLICK OK
  // ========================================
  console.log('🔘 Clicking OK button...');
  await page.waitForTimeout(2000);
  await page.click('//button[@id="salesOrder_salesOrders_okButton"]');
  console.log('✅ OK clicked!');

  // ========================================
  // STEP 8: TAKE SCREENSHOT
  // ========================================
  console.log('📸 Taking screenshot...');
  await page.screenshot({ path: 'ultra-simple-result.png' });
  console.log('✅ Screenshot saved!');

  console.log('🎉 TEST COMPLETED!');
  console.log(`📅 You selected: ${targetDay} ${targetMonth} ${targetYear}`);
});

/*
========================================
BEGINNER'S GUIDE TO THIS TEST
========================================

WHAT EACH PART DOES:

1. SET TARGET DATE (Lines 12-15)
   - Change these values to select any date you want
   - Example: targetDay = 25, targetMonth = 'December', targetYear = 2024

2. LOGIN (Lines 20-26)
   - Goes to the website
   - Fills in email and password
   - Clicks the login button

3. NAVIGATE (Lines 31-35)
   - Goes to the Sales Orders page
   - Waits for the page to load

4. OPEN DATE PICKER (Lines 40-48)
   - Clicks the calendar icon
   - Clicks the date input field
   - Waits for the date picker to appear

5. NAVIGATE TO MONTH (Lines 53-85)
   - Gets the current month
   - Calculates how many months to move
   - Clicks next/previous month buttons

6. SELECT DATE (Lines 90-110)
   - Finds all available dates
   - Searches for your target date
   - Clicks on the matching date

7. CLICK OK (Lines 115-119)
   - Clicks the OK button to confirm

8. TAKE SCREENSHOT (Lines 124-128)
   - Takes a picture as proof

KEY CONCEPTS:

- page.goto() - Go to a website
- page.fill() - Fill input fields
- page.click() - Click buttons
- page.waitForTimeout() - Wait for things to load
- page.locator() - Find elements
- page.screenshot() - Take pictures
- for loops - Search through lists
- if statements - Make decisions

HOW TO MODIFY:

1. Change the target date (lines 12-15)
2. Change the website URL (line 21)
3. Change the login credentials (lines 23-24)
4. Add more steps between existing steps
5. Change the selectors if the website changes

This is the foundation of web automation!
*/
