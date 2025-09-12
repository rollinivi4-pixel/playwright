# 🎯 XPath Reference for Order Management System

Based on the image analysis, here are the key XPaths and selectors for the order management system:

## 🔍 **View Icon Selectors (Order 700025)**

### **Primary Selectors:**
```javascript
// Specific ID selector (most reliable)
'#ship700025'

// XPath using ID
"//img[@id='ship700025']"

// XPath using alt attribute
"//img[@alt='view']"

// XPath using title attribute  
"//img[@title='View']"
```

### **CSS Selectors:**
```javascript
// ID selector
'#ship700025'

// Alt attribute selector
'img[alt="view"]'

// Title attribute selector
'img[title="View"]'

// Source path selector (partial match)
'img[src*="view"]'

// Class selector (if view class exists)
'img[class*="view"]'
```

## 📊 **Table Structure Selectors**

### **Main Table:**
```javascript
// XPath
"//table[@role='table']"

// CSS
'table[role="table"]'
```

### **Table Headers:**
```javascript
// All headers
"//table[@role='table']/thead/tr/th"

// Specific header by text
"//th[text()='Order No']"
"//th[text()='Action']"
```

### **Table Rows:**
```javascript
// All data rows
"//table[@role='table']/tbody/tr"

// First row
"//table[@role='table']/tbody/tr[1]"

// Row containing specific order number
"//tr[.//td[contains(text(), '700025')]]"
```

## 🔢 **Order Number Selectors**

### **Order 700025:**
```javascript
// CSS selector
'td:has-text("700025")'

// XPath
"//td[contains(text(), '700025')]"

// Exact match XPath
"//td[text()='700025']"
```

### **Row containing Order 700025:**
```javascript
// CSS selector
'tr:has(td:has-text("700025"))'

// XPath
"//tr[.//td[contains(text(), '700025')]]"
```

## 🔍 **Search and Filter Selectors**

### **Search Input:**
```javascript
// XPath (from your previous context)
"//input[@id='salesOrder_salesOrders_searchInput']"

// CSS
'#salesOrder_salesOrders_searchInput'
```

### **Status Filter Dropdown:**
```javascript
// CSS
'select[id="salesOrder_salesOrders_shipmentStatusSelect"]'

// XPath
"//select[@id='salesOrder_salesOrders_shipmentStatusSelect']"
```

## 📁 **File Upload Selectors**

### **Add Image Button (Visible):**
```javascript
// XPath
"//img[@title='Add Image']"

// CSS
'img[title="Add Image"]'

// Alt text selector
'img[alt="view-button"]'
```

### **File Input (Hidden):**
```javascript
// XPath
"//input[@type='file']"

// CSS
'input[type="file"]'

// More specific selector
'input[type="file"][accept*="image"]'
```

### **File Upload Process:**
```javascript
// Step 1: Click the visible Add Image button
await page.locator('//img[@title="Add Image"]').click();

// Step 2: Set files on the hidden input (no visibility wait needed)
await page.locator('//input[@type="file"]').setInputFiles('path/to/file');
```

### **Uploaded File Verification:**
```javascript
// Uploaded file container (based on image analysis)
"//div[@class='mb-1 ms-2']"

// CSS selector for uploaded file container
'.mb-1.ms-2'

// Specific file name verification
'text=filename.ext'

// Uploaded image verification
'img[alt="filename.ext"]'

// Blob URL verification (for uploaded images)
'img[src*="blob:"]'
```

### **Complete File Upload with Verification:**
```javascript
// Upload file
await page.locator('//img[@title="Add Image"]').click();
await page.locator('//input[@type="file"]').setInputFiles('path/to/file');

// Verify upload
const uploadedContainer = page.locator('//div[@class="mb-1 ms-2"]');
const uploadedFileName = page.locator('text=filename.ext');

if (await uploadedContainer.isVisible()) {
  console.log('✅ File upload verified');
  const fileCount = await uploadedContainer.count();
  console.log(`📊 Total uploaded files: ${fileCount}`);
}
```

### **Other Filter Dropdowns (from image):**
```javascript
// Location dropdown
"//select[contains(@id, 'location')]"

// Order type dropdown  
"//select[contains(@id, 'orderType')]"

// Payment type dropdown
"//select[contains(@id, 'paymentType')]"

// Source type dropdown
"//select[contains(@id, 'sourceType')]"
```

## 🎯 **Action Column Selectors**

### **Action Column (Column 9):**
```javascript
// CSS selector for action column in specific row
'tr:has(td:has-text("700025")) td:nth-child(9)'

// XPath for action column
"//tr[.//td[contains(text(), '700025')]]/td[9]"
```

### **All Action Icons in Row:**
```javascript
// All images in the row
'tr:has(td:has-text("700025")) img'

// All clickable elements in action column
'tr:has(td:has-text("700025")) td:nth-child(9) *'
```

## 📱 **Navigation Selectors**

### **Sales Orders Menu:**
```javascript
// XPath
"//li[normalize-space()='Sales Orders']"

// CSS
'li:has-text("Sales Orders")'
```

### **Pagination Controls:**
```javascript
// Show dropdown (from image: "Show 10 orders")
"//select[contains(text(), 'Show')]"

// Filter icon
"//i[contains(@class, 'filter')]"
```

## 🎨 **Dynamic ID Pattern**

Based on the image, the view icon ID follows this pattern:
- **Order 700025** → `#ship700025`
- **Order 700016** → `#ship700016` (likely)
- **Order 700044** → `#ship700044` (likely)

### **Dynamic Selector:**
```javascript
// For any order number
function getViewIconSelector(orderNumber) {
  return `#ship${orderNumber}`;
}

// Usage
const orderNumber = "700025";
const viewIconSelector = `#ship${orderNumber}`;
const viewIcon = page.locator(viewIconSelector);
```

## 🔧 **Best Practices**

1. **Use ID selectors first** - Most reliable and fastest
2. **Fallback to alt/title attributes** - Good for accessibility
3. **Use XPath for complex relationships** - When CSS is not enough
4. **Test selectors in browser console** - Before using in tests
5. **Use specific selectors** - Avoid generic ones when possible

## 🚀 **Example Usage in Playwright**

```javascript
// Find and click view icon for order 700025
const orderNumber = "700025";
const viewIcon = page.locator(`#ship${orderNumber}`);
await viewIcon.click();

// Alternative approach with fallbacks
const viewIcon = page.locator(`#ship${orderNumber}`)
  .or(page.locator(`img[alt="view"]`))
  .or(page.locator(`img[title="View"]`));
await viewIcon.click();
```
