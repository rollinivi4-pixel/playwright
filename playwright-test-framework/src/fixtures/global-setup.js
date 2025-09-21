/**
 * Global Setup
 * 
 * This file runs before all tests to set up the testing environment.
 * It can be used to start servers, set up databases, or perform other global setup tasks.
 */

async function globalSetup(config) {
  console.log('🚀 Starting global setup...');
  
  // Set up test environment
  const environment = process.env.ENVIRONMENT || 'development';
  console.log(`🌍 Environment: ${environment}`);
  
  // Create necessary directories
  const fs = require('fs');
  const path = require('path');
  
  const directories = [
    'screenshots',
    'videos',
    'test-results',
    'reports',
    'test-files'
  ];
  
  directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`📁 Created directory: ${dir}`);
    }
  });
  
  // Load environment configuration
  const environments = require('../../config/environments.json');
  const envConfig = environments[environment];
  
  if (envConfig) {
    console.log(`✅ Environment configuration loaded: ${envConfig.name}`);
    console.log(`   Base URL: ${envConfig.baseUrl}`);
    console.log(`   Timeout: ${envConfig.timeout}ms`);
    console.log(`   Headless: ${envConfig.headless}`);
  } else {
    console.log(`⚠️ Environment configuration not found for: ${environment}`);
  }
  
  // Check URL connectivity if not in CI
  if (!process.env.CI) {
    try {
      const { checkUrlConnectivity } = require('../../scripts/check-urls.js');
      console.log('🔍 Checking URL connectivity...');
      await checkUrlConnectivity();
    } catch (error) {
      console.log('⚠️ URL connectivity check failed:', error.message);
    }
  }
  
  // Set up test data
  const testData = require('../../config/test-data.json');
  console.log(`📊 Test data loaded: ${Object.keys(testData).length} categories`);
  
  // Log configuration summary
  console.log('\n📋 Configuration Summary:');
  console.log('========================');
  console.log(`Environment: ${environment}`);
  console.log(`Base URL: ${envConfig?.baseUrl || 'Not configured'}`);
  console.log(`Timeout: ${envConfig?.timeout || 30000}ms`);
  console.log(`Retries: ${envConfig?.retries || 1}`);
  console.log(`Headless: ${envConfig?.headless !== false}`);
  console.log(`Screenshots: ${envConfig?.screenshot || 'only-on-failure'}`);
  console.log(`Video: ${envConfig?.video || 'retain-on-failure'}`);
  console.log(`Trace: ${envConfig?.trace || 'retain-on-failure'}`);
  
  console.log('\n✅ Global setup completed successfully!');
}

module.exports = globalSetup;
