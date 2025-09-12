# 🎹 Keyboard Actions Guide for Playwright

## 📚 What are Keyboard Actions?

Keyboard actions in Playwright allow you to simulate keyboard interactions like:
- **Typing text** in input fields
- **Pressing keys** (Enter, Tab, Escape, etc.)
- **Using shortcuts** (Ctrl+C, Ctrl+V, etc.)
- **Navigating** with arrow keys
- **Function keys** (F1, F5, F12, etc.)

## 🔧 Basic Syntax

### Typing Text
```javascript
await page.type('selector', 'text to type');
await page.fill('selector', 'text to fill');
```

### Pressing Keys
```javascript
await page.keyboard.press('KeyName');
```

### Keyboard Shortcuts
```javascript
await page.keyboard.press('Control+c'); // Ctrl+C
await page.keyboard.press('Control+v'); // Ctrl+V
```

## ⌨️ Common Keys

### Navigation Keys
- `Tab` - Move to next element
- `Enter` - Submit/confirm
- `Escape` - Cancel/close
- `Space` - Activate button
- `Backspace` - Delete character
- `Delete` - Delete character

### Arrow Keys
- `ArrowUp` - Move up
- `ArrowDown` - Move down
- `ArrowLeft` - Move left
- `ArrowRight` - Move right

### Page Navigation
- `PageUp` - Scroll up one page
- `PageDown` - Scroll down one page
- `Home` - Go to beginning
- `End` - Go to end

### Function Keys
- `F1` - Help
- `F5` - Refresh
- `F12` - Developer tools

## 🎯 Keyboard Shortcuts

### Text Editing
- `Control+a` - Select All
- `Control+c` - Copy
- `Control+v` - Paste
- `Control+x` - Cut
- `Control+z` - Undo
- `Control+y` - Redo

### File Operations
- `Control+s` - Save
- `Control+o` - Open
- `Control+n` - New
- `Control+w` - Close

### Navigation
- `Control+f` - Find
- `Control+h` - Replace
- `Control+g` - Go to line
- `Control+r` - Refresh

## 📝 Practical Examples

### Example 1: Login Form
```javascript
// Type in email field
await page.type('#email', 'user@example.com');

// Press Tab to move to password field
await page.keyboard.press('Tab');

// Type in password field
await page.type('#password', 'password123');

// Press Enter to submit
await page.keyboard.press('Enter');
```

### Example 2: Search Functionality
```javascript
// Click on search field
await page.click('#search');

// Type search term
await page.type('#search', 'playwright');

// Press Enter to search
await page.keyboard.press('Enter');
```

### Example 3: Form Navigation
```javascript
// Fill form fields using Tab navigation
await page.type('#firstName', 'John');
await page.keyboard.press('Tab');
await page.type('#lastName', 'Doe');
await page.keyboard.press('Tab');
await page.type('#email', 'john@example.com');
await page.keyboard.press('Tab');
await page.keyboard.press('Enter'); // Submit form
```

### Example 4: Text Selection and Copy
```javascript
// Select all text
await page.keyboard.press('Control+a');

// Copy selected text
await page.keyboard.press('Control+c');

// Move to another field
await page.click('#anotherField');

// Paste copied text
await page.keyboard.press('Control+v');
```

## 🎮 Advanced Techniques

### Typing with Delay
```javascript
// Type slowly (100ms delay between characters)
await page.type('#input', 'slow typing', { delay: 100 });
```

### Multiple Key Combinations
```javascript
// Press multiple keys at once
await page.keyboard.press('Control+Shift+i'); // Open DevTools
```

### Key Sequences
```javascript
// Press multiple keys in sequence
await page.keyboard.press('Control+a');
await page.keyboard.press('Delete');
await page.type('#input', 'new text');
```

## 🚨 Common Issues and Solutions

### Issue 1: Element Not Focused
```javascript
// Click element first to focus it
await page.click('#input');
await page.type('#input', 'text');
```

### Issue 2: Typing Too Fast
```javascript
// Add delay between keystrokes
await page.type('#input', 'text', { delay: 50 });
```

### Issue 3: Special Characters
```javascript
// Use proper key names for special characters
await page.keyboard.press('@'); // For @ symbol
await page.keyboard.press('#'); // For # symbol
```

## 🎯 Best Practices

1. **Always focus elements** before typing
2. **Use appropriate delays** for slow typing
3. **Test keyboard shortcuts** thoroughly
4. **Handle special characters** properly
5. **Use Tab navigation** for form testing
6. **Test accessibility** with keyboard-only navigation

## 📊 Testing Scenarios

### Form Testing
- Tab navigation between fields
- Enter key submission
- Escape key cancellation
- Backspace/Delete for corrections

### Search Testing
- Type search terms
- Enter key to search
- Escape to clear
- Arrow keys for suggestions

### Navigation Testing
- Arrow keys for menu navigation
- Tab for focus management
- Enter for activation
- Escape for closing

### Shortcut Testing
- Copy/Paste functionality
- Undo/Redo operations
- Save/Open shortcuts
- Find/Replace features

## 🎉 Conclusion

Keyboard actions are essential for testing user interactions. They help ensure your application is accessible and works properly with keyboard navigation. Use these examples and techniques to create comprehensive keyboard tests!
