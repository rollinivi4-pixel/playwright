/**
 * RIGHT-CLICK EXAMPLES FOR BEGINNERS
 * 
 * This file shows simple examples of right-click actions
 * Perfect for learning different right-click scenarios!
 */

const { test, expect } = require('@playwright/test');

// ========================================
// EXAMPLE 1: BASIC RIGHT-CLICK
// ========================================
test('Example 1: Basic Right-Click', async ({ page }) => {
  console.log('🖱️ Example 1: Basic Right-Click');
  
  // Go to a simple page
  await page.goto('https://example.com');
  
  // Right-click on the page
  await page.click('body', { button: 'right' });
  console.log('✅ Right-clicked on the page!');
  
  // Take screenshot
  await page.screenshot({ path: 'example1-basic-right-click.png' });
  console.log('📸 Screenshot saved!');
});

// ========================================
// EXAMPLE 2: RIGHT-CLICK ON BUTTON
// ========================================
test('Example 2: Right-Click on Button', async ({ page }) => {
  console.log('🖱️ Example 2: Right-Click on Button');
  
  // Go to a page with buttons
  await page.goto('https://example.com');
  
  // Find a button and right-click it
  const button = page.locator('button').first();
  if (await button.isVisible()) {
    await button.click({ button: 'right' });
    console.log('✅ Right-clicked on button!');
  } else {
    console.log('ℹ️ No button found on this page');
  }
  
  // Take screenshot
  await page.screenshot({ path: 'example2-button-right-click.png' });
  console.log('📸 Screenshot saved!');
});

// ========================================
// EXAMPLE 3: RIGHT-CLICK ON TEXT
// ========================================
test('Example 3: Right-Click on Text', async ({ page }) => {
  console.log('🖱️ Example 3: Right-Click on Text');
  
  // Go to a page with text
  await page.goto('https://example.com');
  
  // Right-click on text
  await page.click('text=Example', { button: 'right' });
  console.log('✅ Right-clicked on text!');
  
  // Take screenshot
  await page.screenshot({ path: 'example3-text-right-click.png' });
  console.log('📸 Screenshot saved!');
});

// ========================================
// EXAMPLE 4: RIGHT-CLICK WITH POSITION
// ========================================
test('Example 4: Right-Click with Position', async ({ page }) => {
  console.log('🖱️ Example 4: Right-Click with Position');
  
  // Go to a page
  await page.goto('https://example.com');
  
  // Right-click at specific position
  await page.click('body', { 
    button: 'right',
    position: { x: 100, y: 100 }
  });
  console.log('✅ Right-clicked at position (100, 100)!');
  
  // Take screenshot
  await page.screenshot({ path: 'example4-position-right-click.png' });
  console.log('📸 Screenshot saved!');
});

// ========================================
// EXAMPLE 5: RIGHT-CLICK AND CHECK FOR MENU
// ========================================
test('Example 5: Right-Click and Check for Menu', async ({ page }) => {
  console.log('🖱️ Example 5: Right-Click and Check for Menu');
  
  // Go to a page
  await page.goto('https://example.com');
  
  // Right-click on the page
  await page.click('body', { button: 'right' });
  console.log('✅ Right-clicked on page!');
  
  // Wait a moment for any menu to appear
  await page.waitForTimeout(1000);
  
  // Check for common menu selectors
  const menuSelectors = [
    '.context-menu',
    '.dropdown-menu',
    '[role="menu"]',
    '.menu'
  ];
  
  let menuFound = false;
  for (const selector of menuSelectors) {
    const menu = page.locator(selector);
    if (await menu.isVisible()) {
      console.log(`✨ Found menu: ${selector}`);
      menuFound = true;
      break;
    }
  }
  
  if (!menuFound) {
    console.log('ℹ️ No visible menu found (this is normal)');
  }
  
  // Take screenshot
  await page.screenshot({ path: 'example5-menu-check.png' });
  console.log('📸 Screenshot saved!');
});

// ========================================
// EXAMPLE 6: RIGHT-CLICK ON INPUT FIELD
// ========================================
test('Example 6: Right-Click on Input Field', async ({ page }) => {
  console.log('🖱️ Example 6: Right-Click on Input Field');
  
  // Go to a page with form
  await page.goto('https://example.com');
  
  // Look for input fields
  const inputs = page.locator('input');
  const inputCount = await inputs.count();
  
  if (inputCount > 0) {
    // Right-click on first input
    await inputs.first().click({ button: 'right' });
    console.log('✅ Right-clicked on input field!');
  } else {
    console.log('ℹ️ No input fields found on this page');
  }
  
  // Take screenshot
  await page.screenshot({ path: 'example6-input-right-click.png' });
  console.log('📸 Screenshot saved!');
});

// ========================================
// EXAMPLE 7: RIGHT-CLICK WITH FORCE
// ========================================
test('Example 7: Right-Click with Force', async ({ page }) => {
  console.log('🖱️ Example 7: Right-Click with Force');
  
  // Go to a page
  await page.goto('https://example.com');
  
  // Right-click with force option
  await page.click('body', { 
    button: 'right',
    force: true
  });
  console.log('✅ Force right-clicked on page!');
  
  // Take screenshot
  await page.screenshot({ path: 'example7-force-right-click.png' });
  console.log('📸 Screenshot saved!');
});

// ========================================
// EXAMPLE 8: RIGHT-CLICK AND WAIT
// ========================================
test('Example 8: Right-Click and Wait', async ({ page }) => {
  console.log('🖱️ Example 8: Right-Click and Wait');
  
  // Go to a page
  await page.goto('https://example.com');
  
  // Right-click and wait for timeout
  await page.click('body', { button: 'right' });
  console.log('✅ Right-clicked on page!');
  
  // Wait for 2 seconds
  await page.waitForTimeout(2000);
  console.log('⏳ Waited for 2 seconds!');
  
  // Take screenshot
  await page.screenshot({ path: 'example8-wait-right-click.png' });
  console.log('📸 Screenshot saved!');
});

console.log('\n🎓 ===== RIGHT-CLICK EXAMPLES SUMMARY =====');
console.log('These examples show different ways to use right-click:');
console.log('1. Basic right-click on any element');
console.log('2. Right-click on buttons');
console.log('3. Right-click on text');
console.log('4. Right-click at specific positions');
console.log('5. Right-click and check for menus');
console.log('6. Right-click on input fields');
console.log('7. Force right-click');
console.log('8. Right-click with wait');
console.log('\n📚 Use these examples to learn right-click testing!');
