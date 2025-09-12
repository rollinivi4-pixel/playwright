# 🎭 Playwright Simple Notes
## Keyboard Actions, Mouse Hover, Right Click & File Upload

---

## ⌨️ KEYBOARD ACTIONS

### **Basic Syntax**
```javascript
// Type text
await page.type('selector', 'text to type');
await page.fill('selector', 'text to fill');

// Press keys
await page.keyboard.press('KeyName');
```

### **Common Keys**
| Key | Purpose | Example |
|-----|---------|---------|
| `Tab` | Move to next element | `await page.keyboard.press('Tab');` |
| `Enter` | Submit/confirm | `await page.keyboard.press('Enter');` |
| `Escape` | Cancel/close | `await page.keyboard.press('Escape');` |
| `Space` | Activate button | `await page.keyboard.press('Space');` |
| `Backspace` | Delete character | `await page.keyboard.press('Backspace');` |
| `Delete` | Delete character | `await page.keyboard.press('Delete');` |

### **Arrow Keys**
```javascript
await page.keyboard.press('ArrowUp');    // Move up
await page.keyboard.press('ArrowDown');  // Move down
await page.keyboard.press('ArrowLeft');  // Move left
await page.keyboard.press('ArrowRight'); // Move right
```

### **Keyboard Shortcuts**
```javascript
// Text editing
await page.keyboard.press('Control+a'); // Select All
await page.keyboard.press('Control+c'); // Copy
await page.keyboard.press('Control+v'); // Paste
await page.keyboard.press('Control+x'); // Cut
await page.keyboard.press('Control+z'); // Undo

// File operations
await page.keyboard.press('Control+s'); // Save
await page.keyboard.press('Control+o'); // Open
await page.keyboard.press('Control+n'); // New
```

### **Practical Example**
```javascript
// Login form with keyboard navigation
await page.type('#email', 'user@example.com');
await page.keyboard.press('Tab'); // Move to password field
await page.type('#password', 'password123');
await page.keyboard.press('Enter'); // Submit form
```

---

## 🖱️ MOUSE HOVER

### **Basic Syntax**
```javascript
// Hover over an element
await page.hover('selector');
```

### **Common Hover Selectors**
```javascript
await page.hover('button');                    // Hover over a button
await page.hover('#id');                       // Hover over element with ID
await page.hover('.class');                    // Hover over element with class
await page.hover('text=Hello');                // Hover over text "Hello"
await page.hover('td:has-text("700107")');     // Hover over cell with specific text
```

### **Practical Example**
```javascript
// Hover over table row
const orderRow = page.locator('tr:has(td:has-text("700107"))');
await orderRow.hover();
console.log('✅ Hovered over order row!');

// Take screenshot after hover
await page.screenshot({ path: 'hover-result.png' });
```

### **What Mouse Hover Does**
- Shows tooltips
- Highlights elements
- Reveals hidden menus
- Triggers hover effects
- Displays additional information

---

## 🖱️ RIGHT CLICK

### **Basic Syntax**
```javascript
// Right-click on element
await page.click('selector', { button: 'right' });
```

### **Common Right-Click Examples**
```javascript
// Right-click on page
await page.click('body', { button: 'right' });

// Right-click on button
await page.click('button', { button: 'right' });

// Right-click on text
await page.click('text=Example', { button: 'right' });

// Right-click at specific position
await page.click('body', { 
  button: 'right',
  position: { x: 100, y: 100 }
});

// Force right-click
await page.click('body', { 
  button: 'right',
  force: true
});
```

### **Right-Click and Check for Menu**
```javascript
// Right-click and wait for context menu
await page.click('body', { button: 'right' });
await page.waitForTimeout(1000); // Wait for menu to appear

// Check for common menu selectors
const menuSelectors = ['.context-menu', '.dropdown-menu', '[role="menu"]'];
let menuFound = false;

for (const selector of menuSelectors) {
  const menu = page.locator(selector);
  if (await menu.isVisible()) {
    console.log(`✨ Found menu: ${selector}`);
    menuFound = true;
    break;
  }
}
```

---

## 📁 FILE UPLOAD

### **How File Upload Works**
1. **🖱️ Visible Button** - What you click (like "Add Image", "Upload File")
2. **📁 Hidden Input** - Where the file actually goes (invisible to users)

### **Basic File Upload Process**
```javascript
// Step 1: Click the upload button
const uploadButton = page.locator('//img[@title="Add Image"]');
await uploadButton.click();

// Step 2: Upload the file
const fileInput = page.locator('//input[@type="file"]');
await fileInput.setInputFiles('C:\\path\\to\\your\\file.jpg');

// Step 3: Verify upload
const uploadedFile = page.locator('//div[@class="mb-1 ms-2"]');
if (await uploadedFile.isVisible()) {
  console.log('✅ File uploaded successfully!');
}
```

### **Common File Upload Selectors**
```javascript
// Upload buttons
'//img[@title="Add Image"]'           // By title attribute
'button:has-text("Upload")'           // By text content
'.upload-button'                      // By class

// File inputs
'//input[@type="file"]'               // Basic file input
'//input[@type="file"][multiple]'     // Multiple file input
'//input[@type="file"][accept*="image"]' // Specific file types

// Uploaded files
'//div[@class="mb-1 ms-2"]'           // Uploaded file container
'text=filename.jpg'                   // File name
'img[alt="filename.jpg"]'             // Uploaded image
```

### **Upload Different File Types**
```javascript
// Single file
await fileInput.setInputFiles('image.jpg');

// Multiple files
const files = ['file1.jpg', 'file2.pdf', 'file3.txt'];
await fileInput.setInputFiles(files);

// Different file types
await fileInput.setInputFiles('document.pdf');
await fileInput.setInputFiles('spreadsheet.xlsx');
await fileInput.setInputFiles('photo.png');
```

### **File Upload Verification**
```javascript
// Check if file appeared
const uploadedFile = page.locator('//div[@class="mb-1 ms-2"]');
if (await uploadedFile.isVisible()) {
  console.log('✅ File uploaded!');
}

// Count uploaded files
const uploadedFiles = page.locator('//div[@class="mb-1 ms-2"]');
const fileCount = await uploadedFiles.count();
console.log(`📊 Total files: ${fileCount}`);

// Check specific file name
const fileName = page.locator('text=myfile.jpg');
if (await fileName.isVisible()) {
  console.log('✅ File name appears!');
}
```

---

## 🚨 COMMON ISSUES & SOLUTIONS

### **Keyboard Actions**
```javascript
// ❌ Problem: Element not focused
await page.type('#input', 'text'); // May not work

// ✅ Solution: Click element first
await page.click('#input');
await page.type('#input', 'text');

// ❌ Problem: Typing too fast
await page.type('#input', 'text'); // May miss characters

// ✅ Solution: Add delay
await page.type('#input', 'text', { delay: 50 });
```

### **File Upload**
```javascript
// ❌ Problem: Waiting for hidden element to be visible
await fileInput.waitFor({ state: 'visible' }); // This will timeout!

// ✅ Solution: Don't wait for visibility
const fileInput = page.locator('//input[@type="file"]');
await fileInput.setInputFiles('path/to/file');

// ❌ Problem: Wrong file path
await fileInput.setInputFiles('file:///C:/path/to/file.jpg');

// ✅ Solution: Use normal path
await fileInput.setInputFiles('C:\\path\\to\\file.jpg');
```

---

## 🎯 BEST PRACTICES

### **Keyboard Actions**
1. ✅ Always focus elements before typing
2. ✅ Use appropriate delays for slow typing
3. ✅ Test keyboard shortcuts thoroughly
4. ✅ Use Tab navigation for form testing

### **Mouse Hover**
1. ✅ Wait for elements to be visible before hovering
2. ✅ Take screenshots to verify hover effects
3. ✅ Test hover on different element types
4. ✅ Check for tooltips and hover states

### **Right Click**
1. ✅ Wait for elements to be ready before right-clicking
2. ✅ Check for context menus after right-click
3. ✅ Test right-click on different elements
4. ✅ Use force option if needed

### **File Upload**
1. ✅ Always click the visible button first
2. ✅ Don't wait for hidden file inputs to be visible
3. ✅ Use correct file paths (no file:// protocol)
4. ✅ Verify uploads with screenshots
5. ✅ Test with different file types

---

## 🚀 QUICK REFERENCE

| Action | Code |
|--------|------|
| **Type text** | `await page.type('#input', 'text');` |
| **Press key** | `await page.keyboard.press('Enter');` |
| **Hover element** | `await page.hover('button');` |
| **Right-click** | `await page.click('body', { button: 'right' });` |
| **Upload file** | `await fileInput.setInputFiles('path/to/file');` |
| **Take screenshot** | `await page.screenshot({ path: 'result.png' });` |

---

## 🎉 CONCLUSION

These four actions are essential for testing user interactions:

- **⌨️ Keyboard Actions** - Test typing, shortcuts, and navigation
- **🖱️ Mouse Hover** - Test hover effects and tooltips  
- **🖱️ Right Click** - Test context menus and right-click functionality
- **📁 File Upload** - Test file upload functionality

Remember: Always take screenshots to verify your actions worked! 📸

Happy testing! 🚀
