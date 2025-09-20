/**
 * 🎭 GLOBAL SETUP FOR PLAYWRIGHT TRACING
 * 
 * This file sets up the global environment for tracing tests.
 * It runs once before all tests and prepares the tracing environment.
 */

const fs = require('fs');
const path = require('path');

async function globalSetup(config) {
  console.log('🚀 Setting up Playwright Tracing environment...');
  
  // Create trace directory
  const traceDir = path.join(process.cwd(), 'trace-files');
  if (!fs.existsSync(traceDir)) {
    fs.mkdirSync(traceDir, { recursive: true });
    console.log(`📁 Created trace directory: ${traceDir}`);
  }
  
  // Create debug screenshots directory
  const debugDir = path.join(process.cwd(), 'debug-screenshots');
  if (!fs.existsSync(debugDir)) {
    fs.mkdirSync(debugDir, { recursive: true });
    console.log(`📁 Created debug directory: ${debugDir}`);
  }
  
  // Clean up old trace files (older than 7 days)
  cleanOldTraceFiles(traceDir);
  
  // Set up environment variables
  process.env.PLAYWRIGHT_TRACING_ENABLED = 'true';
  process.env.TRACE_OUTPUT_DIR = traceDir;
  
  console.log('✅ Global setup completed');
}

function cleanOldTraceFiles(traceDir) {
  try {
    const files = fs.readdirSync(traceDir);
    const now = Date.now();
    const sevenDaysAgo = now - (7 * 24 * 60 * 60 * 1000);
    
    let cleanedCount = 0;
    
    files.forEach(file => {
      const filePath = path.join(traceDir, file);
      const stats = fs.statSync(filePath);
      
      if (stats.mtime.getTime() < sevenDaysAgo) {
        fs.unlinkSync(filePath);
        cleanedCount++;
      }
    });
    
    if (cleanedCount > 0) {
      console.log(`🧹 Cleaned up ${cleanedCount} old trace files`);
    }
    
  } catch (error) {
    console.log('⚠️ Could not clean up old trace files:', error.message);
  }
}

module.exports = globalSetup;
