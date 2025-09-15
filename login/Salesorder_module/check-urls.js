#!/usr/bin/env node

/**
 * URL Connectivity Checker for Salesorder Module
 */

const { chromium } = require('@playwright/test');

const URLs_TO_CHECK = [
  'http://192.168.0.100:3000/',
  'http://localhost:3000/',
  'http://127.0.0.1:3000/',
  'https://stagingaz.ezscm.ai/',
  'http://192.168.1.100:3000/',
  'http://10.0.0.100:3000/'
];

async function checkUrlConnectivity() {
  console.log('🔍 Checking URL connectivity for Salesorder Module...\n');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const results = [];
  
  for (const url of URLs_TO_CHECK) {
    try {
      console.log(`🌐 Testing: ${url}`);
      const startTime = Date.now();
      
      const response = await page.goto(url, { 
        waitUntil: 'domcontentloaded',
        timeout: 10000 
      });
      
      const loadTime = Date.now() - startTime;
      
      if (response && response.ok()) {
        console.log(`✅ SUCCESS: ${url} (${loadTime}ms)`);
        results.push({
          url,
          status: 'SUCCESS',
          loadTime,
          statusCode: response.status()
        });
      } else {
        console.log(`❌ FAILED: ${url} - Status: ${response?.status() || 'No response'}`);
        results.push({
          url,
          status: 'FAILED',
          loadTime,
          statusCode: response?.status() || 0
        });
      }
    } catch (error) {
      console.log(`❌ ERROR: ${url} - ${error.message}`);
      results.push({
        url,
        status: 'ERROR',
        loadTime: 0,
        error: error.message
      });
    }
  }
  
  await browser.close();
  
  // Summary
  console.log('\n📊 CONNECTIVITY SUMMARY:');
  console.log('========================');
  
  const successful = results.filter(r => r.status === 'SUCCESS');
  const failed = results.filter(r => r.status !== 'SUCCESS');
  
  console.log(`✅ Working URLs: ${successful.length}`);
  successful.forEach(result => {
    console.log(`   - ${result.url} (${result.loadTime}ms, Status: ${result.statusCode})`);
  });
  
  console.log(`\n❌ Failed URLs: ${failed.length}`);
  failed.forEach(result => {
    console.log(`   - ${result.url} - ${result.error || 'Failed'}`);
  });
  
  if (successful.length > 0) {
    console.log(`\n🎯 RECOMMENDED URL: ${successful[0].url}`);
    console.log('\n💡 You can set this URL as environment variable:');
    console.log(`   set BASE_URL=${successful[0].url}`);
    console.log(`   # or on Linux/Mac:`);
    console.log(`   export BASE_URL=${successful[0].url}`);
  } else {
    console.log('\n❌ No working URLs found!');
    console.log('\n🔧 TROUBLESHOOTING STEPS:');
    console.log('1. Check if your application is running');
    console.log('2. Verify the correct IP address and port');
    console.log('3. Check firewall settings');
    console.log('4. Ensure the application is accessible from your machine');
    console.log('5. Try running: npm start or your application start command');
  }
  
  return results;
}

// Run the check
checkUrlConnectivity()
  .then(results => {
    const successful = results.filter(r => r.status === 'SUCCESS');
    process.exit(successful.length > 0 ? 0 : 1);
  })
  .catch(error => {
    console.error('❌ Script error:', error);
    process.exit(1);
  });