/**
 * Tagged Tests Runner
 * 
 * This script provides utilities for running tests with specific tags
 * and managing test execution based on tag combinations.
 */

import { execSync } from 'child_process';
import { tagConfig, tagCombinations, executionProfiles, tagUtils } from './playwright-tags.config.js';

class TaggedTestRunner {
  constructor() {
    this.baseCommand = 'npx playwright test';
    this.availableTags = this.getAllAvailableTags();
  }

  /**
   * Get all available tags from configuration
   */
  getAllAvailableTags() {
    const tags = [];
    
    Object.values(tagConfig).forEach(category => {
      Object.values(category).forEach(tag => {
        tags.push(tag);
      });
    });
    
    return tags;
  }

  /**
   * Run tests with specific tags
   */
  runTestsWithTags(tags, options = {}) {
    const tagString = Array.isArray(tags) ? tags.join('|') : tags;
    const command = this.buildCommand(tagString, options);
    
    console.log(`🚀 Running tests with tags: ${tagString}`);
    console.log(`📝 Command: ${command}`);
    
    try {
      execSync(command, { stdio: 'inherit' });
      console.log('✅ Tests completed successfully');
    } catch (error) {
      console.error('❌ Tests failed:', error.message);
      process.exit(1);
    }
  }

  /**
   * Run tests with tag combination
   */
  runTestsWithCombination(combinationName, options = {}) {
    const combination = tagCombinations[combinationName];
    
    if (!combination) {
      console.error(`❌ Unknown combination: ${combinationName}`);
      console.log('Available combinations:', Object.keys(tagCombinations).join(', '));
      return;
    }

    console.log(`🚀 Running tests with combination: ${combinationName}`);
    console.log(`📝 Tags: ${combination}`);
    
    this.runTestsWithTags(combination, options);
  }

  /**
   * Run tests with execution profile
   */
  runTestsWithProfile(profileName, options = {}) {
    const profile = executionProfiles[profileName];
    
    if (!profile) {
      console.error(`❌ Unknown profile: ${profileName}`);
      console.log('Available profiles:', Object.keys(executionProfiles).join(', '));
      return;
    }

    console.log(`🚀 Running tests with profile: ${profileName}`);
    console.log(`📝 Description: ${profile.description}`);
    console.log(`📝 Tags: ${profile.tags.join(', ')}`);
    console.log(`📝 Browsers: ${profile.browsers.join(', ')}`);
    console.log(`📝 Parallel: ${profile.parallel}`);
    console.log(`📝 Timeout: ${profile.timeout}ms`);

    const tagString = profile.tags.join('|');
    const command = this.buildCommand(tagString, {
      ...options,
      browsers: profile.browsers,
      parallel: profile.parallel,
      timeout: profile.timeout
    });

    console.log(`📝 Command: ${command}`);
    
    try {
      execSync(command, { stdio: 'inherit' });
      console.log('✅ Tests completed successfully');
    } catch (error) {
      console.error('❌ Tests failed:', error.message);
      process.exit(1);
    }
  }

  /**
   * Run tests excluding specific tags
   */
  runTestsExcludingTags(tags, options = {}) {
    const tagString = Array.isArray(tags) ? tags.join('|') : tags;
    const command = this.buildCommand(tagString, { ...options, exclude: true });
    
    console.log(`🚀 Running tests excluding tags: ${tagString}`);
    console.log(`📝 Command: ${command}`);
    
    try {
      execSync(command, { stdio: 'inherit' });
      console.log('✅ Tests completed successfully');
    } catch (error) {
      console.error('❌ Tests failed:', error.message);
      process.exit(1);
    }
  }

  /**
   * Run tests with multiple tag conditions
   */
  runTestsWithMultipleConditions(conditions, options = {}) {
    const { include, exclude, requireAll } = conditions;
    
    let tagString = '';
    
    if (include && include.length > 0) {
      const includeString = include.join('|');
      tagString = includeString;
    }
    
    if (exclude && exclude.length > 0) {
      const excludeString = exclude.join('|');
      tagString = tagString ? `${tagString}.*${excludeString}` : excludeString;
    }
    
    if (requireAll && requireAll.length > 0) {
      const requireAllString = requireAll.join('.*');
      tagString = tagString ? `${tagString}.*${requireAllString}` : requireAllString;
    }
    
    const command = this.buildCommand(tagString, options);
    
    console.log(`🚀 Running tests with conditions:`);
    if (include) console.log(`📝 Include: ${include.join(', ')}`);
    if (exclude) console.log(`📝 Exclude: ${exclude.join(', ')}`);
    if (requireAll) console.log(`📝 Require All: ${requireAll.join(', ')}`);
    console.log(`📝 Command: ${command}`);
    
    try {
      execSync(command, { stdio: 'inherit' });
      console.log('✅ Tests completed successfully');
    } catch (error) {
      console.error('❌ Tests failed:', error.message);
      process.exit(1);
    }
  }

  /**
   * Build command with options
   */
  buildCommand(tagString, options = {}) {
    let command = this.baseCommand;
    
    if (tagString) {
      command += ` --grep "${tagString}"`;
    }
    
    if (options.exclude) {
      command += ' --grep-invert';
    }
    
    if (options.browsers && options.browsers.length > 0) {
      command += ` --project ${options.browsers.join(',')}`;
    }
    
    if (options.parallel !== undefined) {
      command += options.parallel ? ' --fully-parallel' : ' --no-fully-parallel';
    }
    
    if (options.timeout) {
      command += ` --timeout ${options.timeout}`;
    }
    
    if (options.retries !== undefined) {
      command += ` --retries ${options.retries}`;
    }
    
    if (options.workers) {
      command += ` --workers ${options.workers}`;
    }
    
    if (options.headless !== undefined) {
      command += options.headless ? ' --headed' : ' --headless';
    }
    
    if (options.reporter) {
      command += ` --reporter ${options.reporter}`;
    }
    
    if (options.output) {
      command += ` --output ${options.output}`;
    }
    
    if (options.debug) {
      command += ' --debug';
    }
    
    if (options.ui) {
      command += ' --ui';
    }
    
    if (options.trace) {
      command += ` --trace ${options.trace}`;
    }
    
    if (options.video) {
      command += ` --video ${options.video}`;
    }
    
    if (options.screenshot) {
      command += ` --screenshot ${options.screenshot}`;
    }
    
    return command;
  }

  /**
   * List available tags
   */
  listTags() {
    console.log('📋 Available Tags:');
    console.log('');
    
    Object.entries(tagConfig).forEach(([category, tags]) => {
      console.log(`🔹 ${category.toUpperCase()}:`);
      Object.entries(tags).forEach(([name, tag]) => {
        console.log(`   ${tag} - ${tagUtils.getTagDescription(tag)}`);
      });
      console.log('');
    });
  }

  /**
   * List available combinations
   */
  listCombinations() {
    console.log('📋 Available Tag Combinations:');
    console.log('');
    
    Object.entries(tagCombinations).forEach(([name, combination]) => {
      console.log(`🔹 ${name}: ${combination}`);
    });
  }

  /**
   * List available profiles
   */
  listProfiles() {
    console.log('📋 Available Execution Profiles:');
    console.log('');
    
    Object.entries(executionProfiles).forEach(([name, profile]) => {
      console.log(`🔹 ${name}:`);
      console.log(`   Description: ${profile.description}`);
      console.log(`   Tags: ${profile.tags.join(', ')}`);
      console.log(`   Browsers: ${profile.browsers.join(', ')}`);
      console.log(`   Parallel: ${profile.parallel}`);
      console.log(`   Timeout: ${profile.timeout}ms`);
      console.log('');
    });
  }

  /**
   * Validate tags
   */
  validateTags(tags) {
    const invalidTags = [];
    const validTags = [];
    
    tags.forEach(tag => {
      if (tagUtils.validateTag(tag)) {
        validTags.push(tag);
      } else {
        invalidTags.push(tag);
      }
    });
    
    if (invalidTags.length > 0) {
      console.error('❌ Invalid tags found:', invalidTags);
      console.log('Valid tag format: @category-name');
      return false;
    }
    
    console.log('✅ All tags are valid:', validTags);
    return true;
  }

  /**
   * Get tag suggestions
   */
  getTagSuggestions(partialTag) {
    const suggestions = this.availableTags.filter(tag => 
      tag.toLowerCase().includes(partialTag.toLowerCase())
    );
    
    if (suggestions.length > 0) {
      console.log(`💡 Tag suggestions for "${partialTag}":`);
      suggestions.forEach(tag => {
        console.log(`   ${tag} - ${tagUtils.getTagDescription(tag)}`);
      });
    } else {
      console.log(`❌ No suggestions found for "${partialTag}"`);
    }
    
    return suggestions;
  }

  /**
   * Show help
   */
  showHelp() {
    console.log('🚀 Tagged Test Runner Help');
    console.log('');
    console.log('Usage:');
    console.log('  node run-tagged-tests.js <command> [options]');
    console.log('');
    console.log('Commands:');
    console.log('  run <tags>                    Run tests with specific tags');
    console.log('  combination <name>            Run tests with tag combination');
    console.log('  profile <name>                Run tests with execution profile');
    console.log('  exclude <tags>                Run tests excluding specific tags');
    console.log('  conditions <config>           Run tests with multiple conditions');
    console.log('  list-tags                     List all available tags');
    console.log('  list-combinations             List all tag combinations');
    console.log('  list-profiles                 List all execution profiles');
    console.log('  validate <tags>               Validate tag format');
    console.log('  suggest <partial>             Get tag suggestions');
    console.log('  help                          Show this help message');
    console.log('');
    console.log('Examples:');
    console.log('  node run-tagged-tests.js run "@critical @smoke"');
    console.log('  node run-tagged-tests.js combination smoke');
    console.log('  node run-tagged-tests.js profile critical');
    console.log('  node run-tagged-tests.js exclude "@flaky @slow"');
    console.log('  node run-tagged-tests.js list-tags');
    console.log('  node run-tagged-tests.js suggest "@crit"');
  }
}

// CLI Interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const runner = new TaggedTestRunner();
  const command = process.argv[2];
  const args = process.argv.slice(3);
  
  switch (command) {
    case 'run':
      if (args.length === 0) {
        console.error('❌ Please provide tags to run');
        runner.showHelp();
        process.exit(1);
      }
      runner.runTestsWithTags(args);
      break;
      
    case 'combination':
      if (args.length === 0) {
        console.error('❌ Please provide combination name');
        runner.showHelp();
        process.exit(1);
      }
      runner.runTestsWithCombination(args[0]);
      break;
      
    case 'profile':
      if (args.length === 0) {
        console.error('❌ Please provide profile name');
        runner.showHelp();
        process.exit(1);
      }
      runner.runTestsWithProfile(args[0]);
      break;
      
    case 'exclude':
      if (args.length === 0) {
        console.error('❌ Please provide tags to exclude');
        runner.showHelp();
        process.exit(1);
      }
      runner.runTestsExcludingTags(args);
      break;
      
    case 'conditions':
      if (args.length === 0) {
        console.error('❌ Please provide conditions configuration');
        runner.showHelp();
        process.exit(1);
      }
      try {
        const conditions = JSON.parse(args[0]);
        runner.runTestsWithMultipleConditions(conditions);
      } catch (error) {
        console.error('❌ Invalid JSON configuration:', error.message);
        process.exit(1);
      }
      break;
      
    case 'list-tags':
      runner.listTags();
      break;
      
    case 'list-combinations':
      runner.listCombinations();
      break;
      
    case 'list-profiles':
      runner.listProfiles();
      break;
      
    case 'validate':
      if (args.length === 0) {
        console.error('❌ Please provide tags to validate');
        runner.showHelp();
        process.exit(1);
      }
      runner.validateTags(args);
      break;
      
    case 'suggest':
      if (args.length === 0) {
        console.error('❌ Please provide partial tag');
        runner.showHelp();
        process.exit(1);
      }
      runner.getTagSuggestions(args[0]);
      break;
      
    case 'help':
    default:
      runner.showHelp();
      break;
  }
}

export default TaggedTestRunner;
