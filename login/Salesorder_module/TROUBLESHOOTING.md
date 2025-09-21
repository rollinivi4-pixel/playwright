# 🔧 Troubleshooting Guide - Connection Timeout Issues

## 🚨 **Current Error**
```
Error: page.goto: net::ERR_CONNECTION_TIMED_OUT at http://192.168.0.100:3000/
```

## 🔍 **Quick Diagnosis**

### Step 1: Check URL Connectivity
Run the URL checker script:
```bash
node login/Salesorder_module/check-urls.js
```

This will test multiple URLs and tell you which ones are working.

### Step 2: Manual URL Testing
Try these URLs in your browser:
- `http://192.168.0.100:3000/`
- `http://localhost:3000/`
- `http://127.0.0.1:3000/`
- `https://stagingaz.ezscm.ai/`

## 🛠️ **Solutions**

### Solution 1: Fix the Application URL
If your application is running on a different URL:

**Option A: Set Environment Variable**
```bash
# Windows
set APP_URL=http://localhost:3000/
npx playwright test login/Salesorder_module/advanced-addCustomer.spec.js

# Linux/Mac
export APP_URL=http://localhost:3000/
npx playwright test login/Salesorder_module/advanced-addCustomer.spec.js
```

**Option B: Update the Config**
Edit `advanced-addCustomer.spec.js` and change:
```javascript
const TEST_CONFIG = {
  baseUrl: 'http://YOUR_ACTUAL_URL:PORT/',  // Change this
  // ... rest of config
};
```

### Solution 2: Start Your Application
If the application isn't running:

```bash
# Navigate to your application directory
cd /path/to/your/application

# Start the application (common commands)
npm start
# or
npm run dev
# or
yarn start
# or
yarn dev
```

### Solution 3: Check Network Configuration
1. **Verify IP Address**: Make sure `192.168.0.100` is correct
2. **Check Port**: Ensure port `3000` is correct
3. **Firewall**: Check if firewall is blocking the connection
4. **Network**: Ensure you're on the same network

### Solution 4: Use Localhost
If the application is running locally, use:
```javascript
baseUrl: 'http://localhost:3000/',
```

## 🧪 **Test the Fix**

### Run Connectivity Test First
```bash
npx playwright test login/Salesorder_module/advanced-addCustomer.spec.js -g "Check Application Connectivity"
```

### Run All Tests
```bash
npx playwright test login/Salesorder_module/advanced-addCustomer.spec.js
```

## 📋 **Common Issues & Solutions**

### Issue 1: Application Not Running
**Symptoms**: All URLs fail
**Solution**: Start your application server

### Issue 2: Wrong IP Address
**Symptoms**: Specific IP fails, localhost works
**Solution**: Update IP address in config

### Issue 3: Wrong Port
**Symptoms**: Connection refused
**Solution**: Check application port (3000, 8080, 5000, etc.)

### Issue 4: Firewall Blocking
**Symptoms**: Timeout on specific IPs
**Solution**: Check firewall settings or use localhost

### Issue 5: Application on Different Network
**Symptoms**: IP not reachable
**Solution**: Use correct network IP or localhost

## 🔧 **Advanced Troubleshooting**

### Check Application Status
```bash
# Check if port is in use
netstat -an | findstr :3000

# Check if application is responding
curl http://localhost:3000/
```

### Network Diagnostics
```bash
# Ping the server
ping 192.168.0.100

# Check if port is open
telnet 192.168.0.100 3000
```

### Playwright Debug Mode
```bash
# Run with debug mode to see detailed errors
npx playwright test login/Salesorder_module/advanced-addCustomer.spec.js --debug

# Run with trace for detailed analysis
npx playwright test login/Salesorder_module/advanced-addCustomer.spec.js --trace=on
```

## 📊 **Expected Results After Fix**

When working correctly, you should see:
```
🔍 Checking URL availability...
🌐 Testing URL: http://192.168.0.100:3000/
✅ Working URL found: http://192.168.0.100:3000/
🌐 Using working URL: http://192.168.0.100:3000/
🔐 Starting advanced login process...
📧 Filling email with keyboard actions...
```

## 🆘 **Still Having Issues?**

1. **Check Application Logs**: Look at your application console for errors
2. **Verify Dependencies**: Ensure all required services are running
3. **Test Manually**: Open the URL in a browser first
4. **Check Playwright Version**: Ensure you have the latest version
5. **Network Issues**: Try using localhost instead of IP address

## 📞 **Getting Help**

If you're still stuck:
1. Run the URL checker: `node login/Salesorder_module/check-urls.js`
2. Check application logs
3. Verify the application is accessible in browser
4. Share the URL checker results for further assistance

---

**Remember**: The tests are designed to automatically find a working URL, but you need to ensure at least one URL is accessible!
