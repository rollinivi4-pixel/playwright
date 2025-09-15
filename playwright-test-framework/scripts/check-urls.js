#!/usr/bin/env node

/**
 * URL Connectivity Checker
 * 
 * This script checks which URLs are accessible before running tests.
 * It helps identify connectivity issues and suggests working URLs.
 */

const { chromium } = require('@playwright/test');
const environments = require('../config/environments.json');

async function checkUrlConnectivity() {
  console.log('🔍 Checking URL connectivity for all environments...\n');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const results = {};
  
  // Check each environment
  for (const [envName, config] of Object.entries(environments)) {
    console.log(`🌐 Checking ${envName} environment...`);
    console.log(`   URL: ${config.baseUrl}`);
    
    const result = await checkSingleUrl(page, config.baseUrl, envName);
    results[envName] = result;
    
    // Check fallback URLs if they exist
    if (config.fallbackUrls) {
      console.log(`   Checking ${config.fallbackUrls.length} fallback URLs...`);
      for (const fallbackUrl of config.fallbackUrls) {
        const fallbackResult = await checkSingleUrl(page, fallbackUrl, `${envName}-fallback`);
        if (fallbackResult.status === 'SUCCESS') {
          results[`${envName}-fallback`] = fallbackResult;
        }
      }
    }
    
    console.log('');
  }
  
  await browser.close();
  
  // Generate summary
  generateSummary(results);
  
  return results;
}

async function checkSingleUrl(page, url, name) {
  try {
    console.log(`   Testing: ${url}`);
    const startTime = Date.now();
    
    const response = await page.goto(url, { 
      waitUntil: 'domcontentloaded',
      timeout: 10000 
    });
    
    const loadTime = Date.now() - startTime;
    
    if (response && response.ok()) {
      console.log(`   ✅ SUCCESS: ${url} (${loadTime}ms, Status: ${response.status()})`);
      return {
        url,
        status: 'SUCCESS',
        loadTime,
        statusCode: response.status(),
        name
      };
    } else {
      console.log(`   ❌ FAILED: ${url} - Status: ${response?.status() || 'No response'}`);
      return {
        url,
        status: 'FAILED',
        loadTime,
        statusCode: response?.status() || 0,
        name
      };
    }
  } catch (error) {
    console.log(`   ❌ ERROR: ${url} - ${error.message}`);
    return {
      url,
      status: 'ERROR',
      loadTime: 0,
      error: error.message,
      name
    };
  }
}

function generateSummary(results) {
  console.log('📊 CONNECTIVITY SUMMARY:');
  console.log('========================');
  
  const successful = Object.values(results).filter(r => r.status === 'SUCCESS');
  const failed = Object.values(results).filter(r => r.status !== 'SUCCESS');
  
  console.log(`✅ Working URLs: ${successful.length}`);
  successful.forEach(result => {
    console.log(`   - ${result.name}: ${result.url} (${result.loadTime}ms, Status: ${result.statusCode})`);
  });
  
  console.log(`\n❌ Failed URLs: ${failed.length}`);
  failed.forEach(result => {
    console.log(`   - ${result.name}: ${result.url} - ${result.error || 'Failed'}`);
  });
  
  if (successful.length > 0) {
    const bestUrl = successful.reduce((best, current) => 
      current.loadTime < best.loadTime ? current : best
    );
    
    console.log(`\n🎯 RECOMMENDED URL: ${bestUrl.url}`);
    console.log(`   Environment: ${bestUrl.name}`);
    console.log(`   Load Time: ${bestUrl.loadTime}ms`);
    console.log(`   Status Code: ${bestUrl.statusCode}`);
    
    console.log('\n💡 You can set this URL as environment variable:');
    console.log(`   set BASE_URL=${bestUrl.url}`);
    console.log(`   # or on Linux/Mac:`);
    console.log(`   export BASE_URL=${bestUrl.url}`);
    
    console.log('\n🚀 Or run tests with specific environment:');
    console.log(`   npm run test:${bestUrl.name.toLowerCase()}`);
  } else {
    console.log('\n❌ No working URLs found!');
    console.log('\n🔧 TROUBLESHOOTING STEPS:');
    console.log('1. Check if your application is running');
    console.log('2. Verify the correct IP address and port');
    console.log('3. Check firewall settings');
    console.log('4. Ensure the application is accessible from your machine');
    console.log('5. Try running: npm start or your application start command');
    console.log('6. Check if the application is running on a different port');
  }
  
  // Save results to file
  const fs = require('fs');
  const resultsPath = 'connectivity-results.json';
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  console.log(`\n📄 Results saved to: ${resultsPath}`);
}

// Run the check
if (require.main === module) {
  checkUrlConnectivity()
    .then(results => {
      const successful = Object.values(results).filter(r => r.status === 'SUCCESS');
      process.exit(successful.length > 0 ? 0 : 1);
    })
    .catch(error => {
      console.error('❌ Script error:', error);
      process.exit(1);
    });
}

module.exports = { checkUrlConnectivity };
