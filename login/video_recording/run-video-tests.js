#!/usr/bin/env node

/**
 * Video Recording Test Runner
 * 
 * This script provides easy commands to run video recording tests
 * with different configurations and options.
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🎬 Video Recording Test Runner');
console.log('================================\n');

// Get command line arguments
const args = process.argv.slice(2);
const command = args[0] || 'help';

// Available commands
const commands = {
  'help': () => {
    console.log('Available commands:');
    console.log('  help           - Show this help message');
    console.log('  all            - Run all video recording tests');
    console.log('  login          - Run complete login flow test');
    console.log('  error          - Run error scenario test');
    console.log('  forgot         - Run forgot password flow test');
    console.log('  interactive    - Run interactive form filling test');
    console.log('  navigation     - Run page navigation test');
    console.log('  chrome         - Run all tests in Chrome only');
    console.log('  firefox        - Run all tests in Firefox only');
    console.log('  headed         - Run tests with visible browser');
    console.log('  headless       - Run tests in headless mode');
    console.log('  slow           - Run tests with slow motion');
    console.log('  fast           - Run tests at normal speed');
    console.log('\nExamples:');
    console.log('  node run-video-tests.js all');
    console.log('  node run-video-tests.js login');
    console.log('  node run-video-tests.js chrome');
    console.log('  node run-video-tests.js headed slow');
  },

  'all': () => {
    console.log('🚀 Running all video recording tests...\n');
    execSync('npx playwright test login/video_recording/', { stdio: 'inherit' });
  },

  'login': () => {
    console.log('🚀 Running complete login flow test...\n');
    execSync('npx playwright test login/video_recording/video-recording-sample.spec.js -g "complete login flow"', { stdio: 'inherit' });
  },

  'error': () => {
    console.log('🚀 Running error scenario test...\n');
    execSync('npx playwright test login/video_recording/video-recording-sample.spec.js -g "wrong password"', { stdio: 'inherit' });
  },

  'forgot': () => {
    console.log('🚀 Running forgot password flow test...\n');
    execSync('npx playwright test login/video_recording/video-recording-sample.spec.js -g "forgot password flow"', { stdio: 'inherit' });
  },

  'interactive': () => {
    console.log('🚀 Running interactive form filling test...\n');
    execSync('npx playwright test login/video_recording/video-recording-sample.spec.js -g "interactive form filling"', { stdio: 'inherit' });
  },

  'navigation': () => {
    console.log('🚀 Running page navigation test...\n');
    execSync('npx playwright test login/video_recording/video-recording-sample.spec.js -g "page navigation"', { stdio: 'inherit' });
  },

  'chrome': () => {
    console.log('🚀 Running all tests in Chrome...\n');
    execSync('npx playwright test login/video_recording/ --project=chromium', { stdio: 'inherit' });
  },

  'firefox': () => {
    console.log('🚀 Running all tests in Firefox...\n');
    execSync('npx playwright test login/video_recording/ --project=firefox', { stdio: 'inherit' });
  },

  'headed': () => {
    console.log('🚀 Running tests with visible browser...\n');
    execSync('npx playwright test login/video_recording/ --headed', { stdio: 'inherit' });
  },

  'headless': () => {
    console.log('🚀 Running tests in headless mode...\n');
    execSync('npx playwright test login/video_recording/ --headless', { stdio: 'inherit' });
  },

  'slow': () => {
    console.log('🚀 Running tests with slow motion...\n');
    execSync('npx playwright test login/video_recording/ --slow-mo=2000', { stdio: 'inherit' });
  },

  'fast': () => {
    console.log('🚀 Running tests at normal speed...\n');
    execSync('npx playwright test login/video_recording/ --slow-mo=0', { stdio: 'inherit' });
  }
};

// Execute command
if (commands[command]) {
  try {
    commands[command]();
    console.log('\n✅ Command completed successfully!');
    console.log('📹 Check the test-results/ folder for video files');
  } catch (error) {
    console.error('\n❌ Command failed:', error.message);
    process.exit(1);
  }
} else {
  console.log(`❌ Unknown command: ${command}`);
  commands.help();
  process.exit(1);
}
