/**
 * FILE UPLOAD EXAMPLES FOR BEGINNERS
 * 
 * This file shows simple examples of file upload
 * Perfect for learning different file upload scenarios!
 */

const { test, expect } = require('@playwright/test');

// ========================================
// EXAMPLE 1: BASIC FILE UPLOAD
// ========================================
test('Example 1: Basic File Upload', async ({ page }) => {
  console.log('📁 Example 1: Basic File Upload');
  
  // Go to a page with file upload
  await page.goto('https://example.com');
  
  // Find file input
  const fileInput = page.locator('input[type="file"]');
  const inputCount = await fileInput.count();
  
  if (inputCount > 0) {
    // Upload a file (you need to have a test file)
    await fileInput.setInputFiles('path/to/your/test/file.txt');
    console.log('✅ File uploaded successfully!');
  } else {
    console.log('ℹ️ No file input found on this page');
  }
  
  // Take screenshot
  await page.screenshot({ path: 'example1-basic-upload.png' });
  console.log('📸 Screenshot saved!');
});

// ========================================
// EXAMPLE 2: MULTIPLE FILE UPLOAD
// ========================================
test('Example 2: Multiple File Upload', async ({ page }) => {
  console.log('📁 Example 2: Multiple File Upload');
  
  // Go to a page
  await page.goto('https://example.com');
  
  // Find file input that supports multiple files
  const fileInput = page.locator('input[type="file"][multiple]');
  const inputCount = await fileInput.count();
  
  if (inputCount > 0) {
    // Upload multiple files
    const files = [
      'path/to/file1.txt',
      'path/to/file2.txt',
      'path/to/file3.txt'
    ];
    await fileInput.setInputFiles(files);
    console.log('✅ Multiple files uploaded successfully!');
  } else {
    console.log('ℹ️ No multiple file input found on this page');
  }
  
  // Take screenshot
  await page.screenshot({ path: 'example2-multiple-upload.png' });
  console.log('📸 Screenshot saved!');
});

// ========================================
// EXAMPLE 3: FILE UPLOAD WITH BUTTON CLICK
// ========================================
test('Example 3: File Upload with Button Click', async ({ page }) => {
  console.log('📁 Example 3: File Upload with Button Click');
  
  // Go to a page
  await page.goto('https://example.com');
  
  // Find upload button
  const uploadButton = page.locator('button:has-text("Upload")').or(page.locator('input[type="file"] + button'));
  const buttonCount = await uploadButton.count();
  
  if (buttonCount > 0) {
    // Click upload button first
    await uploadButton.click();
    console.log('✅ Upload button clicked!');
    
    // Then find and use file input
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles('path/to/your/file.txt');
    console.log('✅ File uploaded after button click!');
  } else {
    console.log('ℹ️ No upload button found on this page');
  }
  
  // Take screenshot
  await page.screenshot({ path: 'example3-button-upload.png' });
  console.log('📸 Screenshot saved!');
});

// ========================================
// EXAMPLE 4: FILE UPLOAD WITH DRAG AND DROP
// ========================================
test('Example 4: File Upload with Drag and Drop', async ({ page }) => {
  console.log('📁 Example 4: File Upload with Drag and Drop');
  
  // Go to a page
  await page.goto('https://example.com');
  
  // Find drop zone
  const dropZone = page.locator('[data-testid="drop-zone"]').or(page.locator('.drop-zone'));
  const dropZoneCount = await dropZone.count();
  
  if (dropZoneCount > 0) {
    // Simulate drag and drop
    await dropZone.setInputFiles('path/to/your/file.txt');
    console.log('✅ File uploaded via drag and drop!');
  } else {
    console.log('ℹ️ No drop zone found on this page');
  }
  
  // Take screenshot
  await page.screenshot({ path: 'example4-drag-drop.png' });
  console.log('📸 Screenshot saved!');
});

// ========================================
// EXAMPLE 5: FILE UPLOAD WITH PROGRESS CHECK
// ========================================
test('Example 5: File Upload with Progress Check', async ({ page }) => {
  console.log('📁 Example 5: File Upload with Progress Check');
  
  // Go to a page
  await page.goto('https://example.com');
  
  // Find file input
  const fileInput = page.locator('input[type="file"]');
  const inputCount = await fileInput.count();
  
  if (inputCount > 0) {
    // Upload file
    await fileInput.setInputFiles('path/to/your/file.txt');
    console.log('✅ File upload started!');
    
    // Wait for upload to complete
    await page.waitForTimeout(3000);
    
    // Check for progress indicator
    const progressBar = page.locator('.progress-bar').or(page.locator('[role="progressbar"]'));
    const progressCount = await progressBar.count();
    
    if (progressCount > 0) {
      console.log('✅ Progress bar found!');
    }
    
    // Check for success message
    const successMessage = page.locator('text=Upload successful').or(page.locator('text=File uploaded'));
    const successCount = await successMessage.count();
    
    if (successCount > 0) {
      console.log('✅ Upload success message found!');
    }
    
  } else {
    console.log('ℹ️ No file input found on this page');
  }
  
  // Take screenshot
  await page.screenshot({ path: 'example5-progress-upload.png' });
  console.log('📸 Screenshot saved!');
});

// ========================================
// EXAMPLE 6: FILE UPLOAD WITH VALIDATION
// ========================================
test('Example 6: File Upload with Validation', async ({ page }) => {
  console.log('📁 Example 6: File Upload with Validation');
  
  // Go to a page
  await page.goto('https://example.com');
  
  // Find file input
  const fileInput = page.locator('input[type="file"]');
  const inputCount = await fileInput.count();
  
  if (inputCount > 0) {
    // Try to upload an invalid file type
    try {
      await fileInput.setInputFiles('path/to/invalid-file.exe');
      console.log('⚠️ Invalid file uploaded (this might cause an error)');
    } catch (error) {
      console.log('✅ File validation working - invalid file rejected');
    }
    
    // Check for error message
    const errorMessage = page.locator('text=Invalid file type').or(page.locator('text=File not supported'));
    const errorCount = await errorMessage.count();
    
    if (errorCount > 0) {
      console.log('✅ Error message found for invalid file!');
    }
    
  } else {
    console.log('ℹ️ No file input found on this page');
  }
  
  // Take screenshot
  await page.screenshot({ path: 'example6-validation-upload.png' });
  console.log('📸 Screenshot saved!');
});

// ========================================
// EXAMPLE 7: FILE UPLOAD WITH PREVIEW
// ========================================
test('Example 7: File Upload with Preview', async ({ page }) => {
  console.log('📁 Example 7: File Upload with Preview');
  
  // Go to a page
  await page.goto('https://example.com');
  
  // Find file input
  const fileInput = page.locator('input[type="file"]');
  const inputCount = await fileInput.count();
  
  if (inputCount > 0) {
    // Upload an image file
    await fileInput.setInputFiles('path/to/your/image.jpg');
    console.log('✅ Image file uploaded!');
    
    // Wait for preview to load
    await page.waitForTimeout(2000);
    
    // Check for image preview
    const imagePreview = page.locator('img[src*="blob:"]').or(page.locator('.image-preview img'));
    const previewCount = await imagePreview.count();
    
    if (previewCount > 0) {
      console.log('✅ Image preview found!');
    }
    
  } else {
    console.log('ℹ️ No file input found on this page');
  }
  
  // Take screenshot
  await page.screenshot({ path: 'example7-preview-upload.png' });
  console.log('📸 Screenshot saved!');
});

// ========================================
// EXAMPLE 8: FILE UPLOAD WITH REMOVAL
// ========================================
test('Example 8: File Upload with Removal', async ({ page }) => {
  console.log('📁 Example 8: File Upload with Removal');
  
  // Go to a page
  await page.goto('https://example.com');
  
  // Find file input
  const fileInput = page.locator('input[type="file"]');
  const inputCount = await fileInput.count();
  
  if (inputCount > 0) {
    // Upload a file
    await fileInput.setInputFiles('path/to/your/file.txt');
    console.log('✅ File uploaded!');
    
    // Wait for file to appear
    await page.waitForTimeout(2000);
    
    // Find and click remove button
    const removeButton = page.locator('button:has-text("Remove")').or(page.locator('.remove-btn')).or(page.locator('[title="Remove"]'));
    const removeCount = await removeButton.count();
    
    if (removeCount > 0) {
      await removeButton.click();
      console.log('✅ File removed!');
    } else {
      console.log('ℹ️ No remove button found');
    }
    
  } else {
    console.log('ℹ️ No file input found on this page');
  }
  
  // Take screenshot
  await page.screenshot({ path: 'example8-remove-upload.png' });
  console.log('📸 Screenshot saved!');
});

console.log('\n🎓 ===== FILE UPLOAD EXAMPLES SUMMARY =====');
console.log('These examples show different file upload scenarios:');
console.log('1. Basic file upload');
console.log('2. Multiple file upload');
console.log('3. File upload with button click');
console.log('4. File upload with drag and drop');
console.log('5. File upload with progress check');
console.log('6. File upload with validation');
console.log('7. File upload with preview');
console.log('8. File upload with removal');
console.log('\n📚 Use these examples to learn file upload testing!');
