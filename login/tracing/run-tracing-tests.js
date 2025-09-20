/**
 * 🎭 PLAYWRIGHT TRACING TEST RUNNER
 * 
 * This script demonstrates how to run Playwright tests with different tracing configurations.
 * Use this to test various tracing scenarios and see the results.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function createTraceDirectory() {
  const traceDir = 'trace-files';
  if (!fs.existsSync(traceDir)) {
    fs.mkdirSync(traceDir, { recursive: true });
    log(`📁 Created trace directory: ${traceDir}`, 'green');
  }
  return traceDir;
}

function runTest(testFile, description) {
  log(`\n🚀 Running: ${description}`, 'cyan');
  log(`📄 Test file: ${testFile}`, 'blue');
  
  try {
    const command = `npx playwright test ${testFile} --headed`;
    log(`💻 Command: ${command}`, 'yellow');
    
    execSync(command, { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    
    log(`✅ ${description} completed successfully!`, 'green');
    
  } catch (error) {
    log(`❌ ${description} failed:`, 'red');
    log(error.message, 'red');
  }
}

function runTestWithConfig(testFile, config, description) {
  log(`\n🚀 Running: ${description}`, 'cyan');
  log(`📄 Test file: ${testFile}`, 'blue');
  log(`⚙️ Config: ${config}`, 'yellow');
  
  try {
    const command = `npx playwright test ${testFile} --config=${config} --headed`;
    log(`💻 Command: ${command}`, 'yellow');
    
    execSync(command, { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    
    log(`✅ ${description} completed successfully!`, 'green');
    
  } catch (error) {
    log(`❌ ${description} failed:`, 'red');
    log(error.message, 'red');
  }
}

function listTraceFiles() {
  const traceDir = 'trace-files';
  if (fs.existsSync(traceDir)) {
    const files = fs.readdirSync(traceDir);
    if (files.length > 0) {
      log(`\n📁 Trace files generated:`, 'magenta');
      files.forEach(file => {
        const filePath = path.join(traceDir, file);
        const stats = fs.statSync(filePath);
        const size = (stats.size / 1024).toFixed(2);
        log(`  📄 ${file} (${size} KB)`, 'blue');
      });
    } else {
      log(`\n📁 No trace files found in ${traceDir}`, 'yellow');
    }
  }
}

function showTraceViewingInstructions() {
  log(`\n🎭 How to view traces:`, 'magenta');
  log(`1. Open trace files in Playwright Trace Viewer:`, 'blue');
  log(`   npx playwright show-trace trace-files/your-trace-file.zip`, 'yellow');
  log(`2. Or use the HTML report:`, 'blue');
  log(`   npx playwright show-report`, 'yellow');
  log(`3. View traces in VS Code with Playwright extension`, 'blue');
  log(`4. Upload traces to Playwright Cloud for sharing`, 'blue');
}

function main() {
  log(`🎭 Playwright Tracing Test Runner`, 'bright');
  log(`================================`, 'bright');
  
  // Create trace directory
  createTraceDirectory();
  
  // Run basic tracing tests
  runTest(
    'login/tracing/basic-tracing-example.spec.js',
    'Basic Tracing Examples'
  );
  
  // Run advanced tracing tests
  runTest(
    'login/tracing/advanced-tracing-example.spec.js',
    'Advanced Tracing Examples'
  );
  
  // Run ezSCM-specific tracing tests
  runTest(
    'login/tracing/ezscm-tracing-example.spec.js',
    'ezSCM Tracing Examples'
  );
  
  // Run with different configurations
  const configs = [
    {
      file: 'tracing-config-examples.js',
      description: 'Custom Tracing Configuration'
    }
  ];
  
  configs.forEach(config => {
    runTestWithConfig(
      'login/tracing/basic-tracing-example.spec.js',
      `login/tracing/${config.file}`,
      config.description
    );
  });
  
  // List generated trace files
  listTraceFiles();
  
  // Show instructions
  showTraceViewingInstructions();
  
  log(`\n🎉 All tracing tests completed!`, 'green');
  log(`Check the trace-files directory for generated traces.`, 'blue');
}

// Run if this file is executed directly
if (require.main === module) {
  main();
}

module.exports = {
  runTest,
  runTestWithConfig,
  createTraceDirectory,
  listTraceFiles,
  showTraceViewingInstructions
};
