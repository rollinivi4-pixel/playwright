# 📁 File Upload Guide for Beginners

## 🎯 What is File Upload?

File upload means sending a file from your computer to a website. It's like attaching a file to an email, but for websites.

## 🔧 How File Upload Works

### **Two Parts of File Upload:**

1. **🖱️ Visible Button** - What you click (like "Add Image", "Upload File")
2. **📁 Hidden Input** - Where the file actually goes (invisible to users)

### **The Process:**
```
1. Click visible button → 2. Hidden input becomes active → 3. Select file → 4. File uploads
```

## 📝 Basic File Upload Code

### **Step 1: Click the Upload Button**
```javascript
// Find and click the upload button
const uploadButton = page.locator('//img[@title="Add Image"]');
await uploadButton.click();
```

### **Step 2: Upload the File**
```javascript
// Find the hidden file input
const fileInput = page.locator('//input[@type="file"]');

// Upload your file
await fileInput.setInputFiles('C:\\path\\to\\your\\file.jpg');
```

### **Step 3: Verify Upload**
```javascript
// Check if file was uploaded
const uploadedFile = page.locator('//div[@class="mb-1 ms-2"]');
if (await uploadedFile.isVisible()) {
  console.log('✅ File uploaded successfully!');
}
```

## 🎯 Common File Upload Selectors

### **Upload Buttons:**
```javascript
// By title attribute
'//img[@title="Add Image"]'

// By text content
'button:has-text("Upload")'

// By class
'.upload-button'
```

### **File Inputs:**
```javascript
// Basic file input
'//input[@type="file"]'

// Multiple file input
'//input[@type="file"][multiple]'

// Specific file types
'//input[@type="file"][accept*="image"]'
```

### **Uploaded Files:**
```javascript
// Uploaded file container
'//div[@class="mb-1 ms-2"]'

// File name
'text=filename.jpg'

// Uploaded image
'img[alt="filename.jpg"]'
```

## 🚀 Complete Example

```javascript
test('Upload a file', async ({ page }) => {
  // 1. Go to the page
  await page.goto('https://example.com');
  
  // 2. Click upload button
  const uploadButton = page.locator('//img[@title="Add Image"]');
  await uploadButton.click();
  
  // 3. Upload file
  const fileInput = page.locator('//input[@type="file"]');
  await fileInput.setInputFiles('C:\\path\\to\\file.jpg');
  
  // 4. Verify upload
  const uploadedFile = page.locator('//div[@class="mb-1 ms-2"]');
  expect(await uploadedFile.isVisible()).toBe(true);
  
  // 5. Take screenshot
  await page.screenshot({ path: 'upload-result.png' });
});
```

## ⚠️ Common Issues and Solutions

### **Issue 1: File Input Not Found**
```javascript
// ❌ Problem: Waiting for hidden element to be visible
await fileInput.waitFor({ state: 'visible' }); // This will timeout!

// ✅ Solution: Don't wait for visibility
const fileInput = page.locator('//input[@type="file"]');
await fileInput.setInputFiles('path/to/file');
```

### **Issue 2: Wrong File Path**
```javascript
// ❌ Wrong: Using file:// protocol
await fileInput.setInputFiles('file:///C:/path/to/file.jpg');

// ✅ Correct: Use normal path
await fileInput.setInputFiles('C:\\path\\to\\file.jpg');
```

### **Issue 3: Multiple Elements Found**
```javascript
// ❌ Problem: Multiple file inputs
const fileInput = page.locator('//input[@type="file"]'); // Finds all

// ✅ Solution: Be more specific
const fileInput = page.locator('//input[@type="file"][1]'); // First one
// or
const fileInput = page.locator('//input[@type="file"][@accept*="image"]'); // Specific type
```

## 📊 File Upload Verification

### **Check if File Appeared:**
```javascript
// Look for uploaded file container
const uploadedFile = page.locator('//div[@class="mb-1 ms-2"]');
if (await uploadedFile.isVisible()) {
  console.log('✅ File uploaded!');
}
```

### **Check File Name:**
```javascript
// Look for specific file name
const fileName = page.locator('text=myfile.jpg');
if (await fileName.isVisible()) {
  console.log('✅ File name appears!');
}
```

### **Count Uploaded Files:**
```javascript
// Count how many files were uploaded
const uploadedFiles = page.locator('//div[@class="mb-1 ms-2"]');
const fileCount = await uploadedFiles.count();
console.log(`📊 Total files: ${fileCount}`);
```

## 🎨 Different File Types

### **Images:**
```javascript
await fileInput.setInputFiles('image.jpg');
await fileInput.setInputFiles('photo.png');
await fileInput.setInputFiles('picture.gif');
```

### **Documents:**
```javascript
await fileInput.setInputFiles('document.pdf');
await fileInput.setInputFiles('report.docx');
await fileInput.setInputFiles('spreadsheet.xlsx');
```

### **Multiple Files:**
```javascript
const files = [
  'file1.jpg',
  'file2.pdf',
  'file3.txt'
];
await fileInput.setInputFiles(files);
```

## 🔍 Debugging Tips

### **1. Take Screenshots:**
```javascript
// Before upload
await page.screenshot({ path: 'before-upload.png' });

// After upload
await page.screenshot({ path: 'after-upload.png' });
```

### **2. Check Element Count:**
```javascript
const fileInputs = page.locator('//input[@type="file"]');
const count = await fileInputs.count();
console.log(`Found ${count} file inputs`);
```

### **3. Log Element Info:**
```javascript
const fileInput = page.locator('//input[@type="file"]');
const isVisible = await fileInput.isVisible();
const isEnabled = await fileInput.isEnabled();
console.log(`Visible: ${isVisible}, Enabled: ${isEnabled}`);
```

## 🎯 Best Practices

1. **✅ Always click the visible button first**
2. **✅ Don't wait for hidden file inputs to be visible**
3. **✅ Use correct file paths (no file:// protocol)**
4. **✅ Verify uploads with screenshots**
5. **✅ Handle multiple file inputs properly**
6. **✅ Test with different file types**
7. **✅ Check for error messages**

## 🚀 Quick Reference

| Action | Code |
|--------|------|
| Click upload button | `await page.locator('//img[@title="Add Image"]').click();` |
| Upload single file | `await page.locator('//input[@type="file"]').setInputFiles('path');` |
| Upload multiple files | `await fileInput.setInputFiles(['file1.jpg', 'file2.pdf']);` |
| Verify upload | `await page.locator('//div[@class="mb-1 ms-2"]').isVisible();` |
| Take screenshot | `await page.screenshot({ path: 'result.png' });` |

## 🎉 Conclusion

File upload testing is easy once you understand:
- **Click visible button first**
- **Then interact with hidden input**
- **Verify the upload worked**
- **Take screenshots for proof**

Happy testing! 🚀
