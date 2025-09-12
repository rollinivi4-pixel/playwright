/**
 * KEYBOARD ACTIONS EXAMPLES FOR BEGINNERS
 * 
 * This file shows simple examples of keyboard actions
 * Perfect for learning different keyboard scenarios!
 */

const { test, expect } = require('@playwright/test');

// ========================================
// EXAMPLE 1: BASIC TYPING
// ========================================
test('Example 1: Basic Typing', async ({ page }) => {
  console.log('⌨️ Example 1: Basic Typing');
  
  // Go to a page with input fields
  await page.goto('https://example.com');
  
  // Find input field and type
  const inputs = page.locator('input');
  const inputCount = await inputs.count();
  
  if (inputCount > 0) {
    await inputs.first().type('Hello World!');
    console.log('✅ Typed "Hello World!" in input field!');
  } else {
    console.log('ℹ️ No input fields found on this page');
  }
  
  // Take screenshot
  await page.screenshot({ path: 'example1-basic-typing.png' });
  console.log('📸 Screenshot saved!');
});

// ========================================
// EXAMPLE 2: PRESSING ENTER KEY
// ========================================
test('Example 2: Pressing Enter Key', async ({ page }) => {
  console.log('⌨️ Example 2: Pressing Enter Key');
  
  // Go to a page
  await page.goto('https://example.com');
  
  // Press Enter key
  await page.keyboard.press('Enter');
  console.log('✅ Pressed Enter key!');
  
  // Take screenshot
  await page.screenshot({ path: 'example2-enter-key.png' });
  console.log('📸 Screenshot saved!');
});

// ========================================
// EXAMPLE 3: PRESSING TAB KEY
// ========================================
test('Example 3: Pressing Tab Key', async ({ page }) => {
  console.log('⌨️ Example 3: Pressing Tab Key');
  
  // Go to a page
  await page.goto('https://example.com');
  
  // Press Tab key multiple times
  for (let i = 0; i < 3; i++) {
    await page.keyboard.press('Tab');
    console.log(`✅ Pressed Tab key ${i + 1} time(s)!`);
  }
  
  // Take screenshot
  await page.screenshot({ path: 'example3-tab-key.png' });
  console.log('📸 Screenshot saved!');
});

// ========================================
// EXAMPLE 4: ARROW KEYS
// ========================================
test('Example 4: Arrow Keys', async ({ page }) => {
  console.log('⌨️ Example 4: Arrow Keys');
  
  // Go to a page
  await page.goto('https://example.com');
  
  // Test all arrow keys
  const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
  
  for (const key of arrowKeys) {
    await page.keyboard.press(key);
    console.log(`✅ Pressed ${key} key!`);
  }
  
  // Take screenshot
  await page.screenshot({ path: 'example4-arrow-keys.png' });
  console.log('📸 Screenshot saved!');
});

// ========================================
// EXAMPLE 5: PAGE NAVIGATION KEYS
// ========================================
test('Example 5: Page Navigation Keys', async ({ page }) => {
  console.log('⌨️ Example 5: Page Navigation Keys');
  
  // Go to a page
  await page.goto('https://example.com');
  
  // Test page navigation keys
  const pageKeys = ['PageUp', 'PageDown', 'Home', 'End'];
  
  for (const key of pageKeys) {
    await page.keyboard.press(key);
    console.log(`✅ Pressed ${key} key!`);
  }
  
  // Take screenshot
  await page.screenshot({ path: 'example5-page-keys.png' });
  console.log('📸 Screenshot saved!');
});

// ========================================
// EXAMPLE 6: FUNCTION KEYS
// ========================================
test('Example 6: Function Keys', async ({ page }) => {
  console.log('⌨️ Example 6: Function Keys');
  
  // Go to a page
  await page.goto('https://example.com');
  
  // Test function keys
  const functionKeys = ['F1', 'F5', 'F12'];
  
  for (const key of functionKeys) {
    await page.keyboard.press(key);
    console.log(`✅ Pressed ${key} key!`);
  }
  
  // Take screenshot
  await page.screenshot({ path: 'example6-function-keys.png' });
  console.log('📸 Screenshot saved!');
});

// ========================================
// EXAMPLE 7: SPECIAL KEYS
// ========================================
test('Example 7: Special Keys', async ({ page }) => {
  console.log('⌨️ Example 7: Special Keys');
  
  // Go to a page
  await page.goto('https://example.com');
  
  // Test special keys
  const specialKeys = ['Escape', 'Space', 'Backspace', 'Delete'];
  
  for (const key of specialKeys) {
    await page.keyboard.press(key);
    console.log(`✅ Pressed ${key} key!`);
  }
  
  // Take screenshot
  await page.screenshot({ path: 'example7-special-keys.png' });
  console.log('📸 Screenshot saved!');
});

// ========================================
// EXAMPLE 8: KEYBOARD SHORTCUTS
// ========================================
test('Example 8: Keyboard Shortcuts', async ({ page }) => {
  console.log('⌨️ Example 8: Keyboard Shortcuts');
  
  // Go to a page
  await page.goto('https://example.com');
  
  // Test common shortcuts
  const shortcuts = [
    'Control+a',  // Select All
    'Control+c',  // Copy
    'Control+v',  // Paste
    'Control+z',  // Undo
    'Control+s',  // Save
    'Control+f'   // Find
  ];
  
  for (const shortcut of shortcuts) {
    await page.keyboard.press(shortcut);
    console.log(`✅ Pressed ${shortcut} shortcut!`);
  }
  
  // Take screenshot
  await page.screenshot({ path: 'example8-shortcuts.png' });
  console.log('📸 Screenshot saved!');
});

// ========================================
// EXAMPLE 9: TYPING WITH DELAY
// ========================================
test('Example 9: Typing with Delay', async ({ page }) => {
  console.log('⌨️ Example 9: Typing with Delay');
  
  // Go to a page
  await page.goto('https://example.com');
  
  // Find input field
  const inputs = page.locator('input');
  const inputCount = await inputs.count();
  
  if (inputCount > 0) {
    // Type with delay (slower typing)
    await inputs.first().type('Slow typing...', { delay: 100 });
    console.log('✅ Typed with delay (100ms between characters)!');
  } else {
    console.log('ℹ️ No input fields found on this page');
  }
  
  // Take screenshot
  await page.screenshot({ path: 'example9-typing-delay.png' });
  console.log('📸 Screenshot saved!');
});

// ========================================
// EXAMPLE 10: CLEARING AND TYPING
// ========================================
test('Example 10: Clearing and Typing', async ({ page }) => {
  console.log('⌨️ Example 10: Clearing and Typing');
  
  // Go to a page
  await page.goto('https://example.com');
  
  // Find input field
  const inputs = page.locator('input');
  const inputCount = await inputs.count();
  
  if (inputCount > 0) {
    const input = inputs.first();
    
    // Type some text first
    await input.type('Original text');
    console.log('✅ Typed original text!');
    
    // Clear the field
    await input.fill('');
    console.log('✅ Cleared the field!');
    
    // Type new text
    await input.type('New text');
    console.log('✅ Typed new text!');
  } else {
    console.log('ℹ️ No input fields found on this page');
  }
  
  // Take screenshot
  await page.screenshot({ path: 'example10-clear-type.png' });
  console.log('📸 Screenshot saved!');
});

console.log('\n🎓 ===== KEYBOARD ACTIONS EXAMPLES SUMMARY =====');
console.log('These examples show different keyboard actions:');
console.log('1. Basic typing in input fields');
console.log('2. Pressing Enter key');
console.log('3. Using Tab key for navigation');
console.log('4. Arrow keys for movement');
console.log('5. Page navigation keys (PageUp, PageDown, etc.)');
console.log('6. Function keys (F1, F5, F12, etc.)');
console.log('7. Special keys (Escape, Space, Backspace, etc.)');
console.log('8. Keyboard shortcuts (Ctrl+C, Ctrl+V, etc.)');
console.log('9. Typing with delay');
console.log('10. Clearing and typing new text');
console.log('\n📚 Use these examples to learn keyboard testing!');
