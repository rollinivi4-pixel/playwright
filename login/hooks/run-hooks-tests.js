#!/usr/bin/env node

/**
 * Hooks Test Runner
 * 
 * This script provides easy commands to run different hook test suites
 * with various configurations and options.
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🎯 Hooks Test Runner');
console.log('===================\n');

// Get command line arguments
const args = process.argv.slice(2);
const command = args[0] || 'help';

// Available commands
const commands = {
  'help': () => {
    console.log('Available commands:');
    console.log('  help           - Show this help message');
    console.log('  all            - Run all hook test suites');
    console.log('  common         - Run common hooks tests only');
    console.log('  login          - Run login hooks tests only');
    console.log('  keyboard       - Run keyboard hooks tests only');
    console.log('  integration    - Run integration tests only');
    console.log('  chrome         - Run all tests in Chrome only');
    console.log('  firefox        - Run all tests in Firefox only');
    console.log('  headed         - Run tests with visible browser');
    console.log('  headless       - Run tests in headless mode');
    console.log('  slow           - Run tests with slow motion');
    console.log('  fast           - Run tests at normal speed');
    console.log('  debug          - Run tests in debug mode');
    console.log('  report         - Generate HTML report');
    console.log('\nTest Categories:');
    console.log('  common-hooks-tests.spec.js     - Common utilities tests');
    console.log('  login-hooks-tests.spec.js      - Login functionality tests');
    console.log('  keyboard-hooks-tests.spec.js   - Keyboard actions tests');
    console.log('  hooks-test-suite.spec.js       - Complete integration tests');
    console.log('\nExamples:');
    console.log('  node run-hooks-tests.js all');
    console.log('  node run-hooks-tests.js common');
    console.log('  node run-hooks-tests.js chrome headed');
    console.log('  node run-hooks-tests.js keyboard slow');
  },

  'all': () => {
    console.log('🚀 Running all hook test suites...\n');
    execSync('npx playwright test login/hooks/', { stdio: 'inherit' });
  },

  'common': () => {
    console.log('🚀 Running common hooks tests...\n');
    execSync('npx playwright test login/hooks/common-hooks-tests.spec.js', { stdio: 'inherit' });
  },

  'login': () => {
    console.log('🚀 Running login hooks tests...\n');
    execSync('npx playwright test login/hooks/login-hooks-tests.spec.js', { stdio: 'inherit' });
  },

  'keyboard': () => {
    console.log('🚀 Running keyboard hooks tests...\n');
    execSync('npx playwright test login/hooks/keyboard-hooks-tests.spec.js', { stdio: 'inherit' });
  },

  'integration': () => {
    console.log('🚀 Running integration tests...\n');
    execSync('npx playwright test login/hooks/hooks-test-suite.spec.js', { stdio: 'inherit' });
  },

  'chrome': () => {
    console.log('🚀 Running all tests in Chrome...\n');
    execSync('npx playwright test login/hooks/ --project=chromium', { stdio: 'inherit' });
  },

  'firefox': () => {
    console.log('🚀 Running all tests in Firefox...\n');
    execSync('npx playwright test login/hooks/ --project=firefox', { stdio: 'inherit' });
  },

  'headed': () => {
    console.log('🚀 Running tests with visible browser...\n');
    execSync('npx playwright test login/hooks/ --headed', { stdio: 'inherit' });
  },

  'headless': () => {
    console.log('🚀 Running tests in headless mode...\n');
    execSync('npx playwright test login/hooks/ --headless', { stdio: 'inherit' });
  },

  'slow': () => {
    console.log('🚀 Running tests with slow motion...\n');
    execSync('npx playwright test login/hooks/ --slow-mo=2000', { stdio: 'inherit' });
  },

  'fast': () => {
    console.log('🚀 Running tests at normal speed...\n');
    execSync('npx playwright test login/hooks/ --slow-mo=0', { stdio: 'inherit' });
  },

  'debug': () => {
    console.log('🚀 Running tests in debug mode...\n');
    execSync('npx playwright test login/hooks/ --debug', { stdio: 'inherit' });
  },

  'report': () => {
    console.log('🚀 Generating HTML report...\n');
    execSync('npx playwright test login/hooks/ --reporter=html', { stdio: 'inherit' });
  }
};

// Execute command
if (commands[command]) {
  try {
    commands[command]();
    console.log('\n✅ Command completed successfully!');
    console.log('📊 Check the test-results/ folder for detailed results');
    console.log('📸 Check the screenshots/ folder for test screenshots');
  } catch (error) {
    console.error('\n❌ Command failed:', error.message);
    process.exit(1);
  }
} else {
  console.log(`❌ Unknown command: ${command}`);
  commands.help();
  process.exit(1);
}
