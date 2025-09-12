# 📅 Beginner Date Picker Test - Simple Guide

## 🎯 What This Test Does
This test automatically selects any date you want from a date picker on a website. It's perfect for beginners to learn web automation!

## 🚀 How to Use

### Step 1: Change the Date
Open `beginner-datepicker.spec.js` and modify these lines:

```javascript
const day = 25;           // Day of month (1-31)
const month = 'January';  // Month name
const year = 2025;        // Year
```

**Examples:**
- `day = 15, month = 'March', year = 2025` → Selects March 15, 2025
- `day = 1, month = 'December', year = 2024` → Selects December 1, 2024
- `day = 31, month = 'October', year = 2025` → Selects October 31, 2025

### Step 2: Run the Test
```bash
npx playwright test login/beginner-datepicker.spec.js
```

### Step 3: Watch It Work!
The test will:
1. ✅ Log into the website
2. ✅ Go to Sales Orders page
3. ✅ Open the date picker
4. ✅ Navigate to your target month/year
5. ✅ Find and select your target date
6. ✅ Click OK button
7. ✅ Take a screenshot

## 📚 What You'll Learn

### Basic Playwright Commands:
- `page.goto()` - Go to a website
- `page.fill()` - Fill input fields
- `page.click()` - Click buttons/elements
- `page.waitForTimeout()` - Wait for things to load
- `page.locator()` - Find elements on the page
- `page.screenshot()` - Take a picture

### Key Concepts:
- **Locators**: How to find elements on a webpage
- **Waits**: Why we need to wait for things to load
- **Loops**: How to search through lists of items
- **Variables**: How to store and use data
- **Console Logging**: How to see what's happening

## 🔧 Troubleshooting

### If the test fails:
1. **Check your internet connection**
2. **Make sure the website is working**
3. **Try a different date** (some dates might not be available)
4. **Check the console output** for error messages

### Common Issues:
- **Login fails**: Check if the website is down
- **Date picker doesn't open**: The website might have changed
- **Date not found**: Try a different date in the current month

## 🎓 Next Steps

Once you understand this test, you can:
1. **Modify it** to work with different websites
2. **Add more features** like selecting multiple dates
3. **Create your own tests** using the same patterns
4. **Learn more advanced Playwright features**

## 💡 Tips for Beginners

1. **Read the comments** - They explain what each part does
2. **Change one thing at a time** - Don't modify everything at once
3. **Use console.log()** - Add your own logging to see what's happening
4. **Take screenshots** - They help you see what the test is doing
5. **Start simple** - Get the basic version working before adding complexity

## 🆘 Need Help?

If you get stuck:
1. Check the console output for error messages
2. Look at the screenshots to see what happened
3. Try running the test step by step
4. Ask for help with specific error messages

Happy learning! 🎉
