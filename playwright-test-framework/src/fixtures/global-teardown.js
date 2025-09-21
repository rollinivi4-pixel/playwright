/**
 * Global Teardown
 * 
 * This file runs after all tests to clean up the testing environment.
 * It can be used to stop servers, clean up databases, or perform other cleanup tasks.
 */

async function globalTeardown(config) {
  console.log('🧹 Starting global teardown...');
  
  // Clean up test files
  const fs = require('fs');
  const path = require('path');
  
  try {
    // Clean up temporary test files
    const testFilesDir = 'test-files';
    if (fs.existsSync(testFilesDir)) {
      const files = fs.readdirSync(testFilesDir);
      files.forEach(file => {
        const filePath = path.join(testFilesDir, file);
        fs.unlinkSync(filePath);
      });
      console.log(`🗑️ Cleaned up ${files.length} test files`);
    }
    
    // Generate final report
    const reportsDir = 'reports';
    if (fs.existsSync(reportsDir)) {
      const reportFiles = fs.readdirSync(reportsDir);
      console.log(`📊 Generated ${reportFiles.length} report files`);
    }
    
    // Log test artifacts
    const screenshotsDir = 'screenshots';
    const videosDir = 'videos';
    
    let screenshotCount = 0;
    let videoCount = 0;
    
    if (fs.existsSync(screenshotsDir)) {
      screenshotCount = fs.readdirSync(screenshotsDir).length;
    }
    
    if (fs.existsSync(videosDir)) {
      videoCount = fs.readdirSync(videosDir).length;
    }
    
    console.log('\n📋 Test Artifacts Summary:');
    console.log('==========================');
    console.log(`📸 Screenshots: ${screenshotCount}`);
    console.log(`🎥 Videos: ${videoCount}`);
    console.log(`📊 Reports: ${fs.existsSync(reportsDir) ? fs.readdirSync(reportsDir).length : 0}`);
    
    // Log final status
    console.log('\n🏁 Global teardown completed successfully!');
    console.log('📁 Check the following directories for test artifacts:');
    console.log('   - screenshots/ (test screenshots)');
    console.log('   - videos/ (test recordings)');
    console.log('   - reports/ (test reports)');
    console.log('   - playwright-report/ (HTML report)');
    console.log('   - test-results/ (raw test results)');
    
  } catch (error) {
    console.log('⚠️ Error during teardown:', error.message);
  }
}

module.exports = globalTeardown;
