/**
 * 🎭 GLOBAL TEARDOWN FOR PLAYWRIGHT TRACING
 * 
 * This file cleans up after all tracing tests are complete.
 * It runs once after all tests and performs cleanup operations.
 */

const fs = require('fs');
const path = require('path');

async function globalTeardown(config) {
  console.log('🧹 Cleaning up Playwright Tracing environment...');
  
  const traceDir = path.join(process.cwd(), 'trace-files');
  const debugDir = path.join(process.cwd(), 'debug-screenshots');
  
  // Generate trace summary
  generateTraceSummary(traceDir);
  
  // Clean up temporary files
  cleanupTemporaryFiles(debugDir);
  
  // Generate trace report
  generateTraceReport(traceDir);
  
  console.log('✅ Global teardown completed');
}

function generateTraceSummary(traceDir) {
  try {
    if (!fs.existsSync(traceDir)) {
      console.log('📁 No trace directory found');
      return;
    }
    
    const files = fs.readdirSync(traceDir);
    const traceFiles = files.filter(file => file.endsWith('.zip'));
    
    if (traceFiles.length === 0) {
      console.log('📄 No trace files generated');
      return;
    }
    
    let totalSize = 0;
    const traceInfo = traceFiles.map(file => {
      const filePath = path.join(traceDir, file);
      const stats = fs.statSync(filePath);
      const size = stats.size;
      totalSize += size;
      
      return {
        name: file,
        size: size,
        sizeFormatted: formatBytes(size),
        created: stats.mtime.toISOString()
      };
    });
    
    // Sort by creation time (newest first)
    traceInfo.sort((a, b) => new Date(b.created) - new Date(a.created));
    
    // Generate summary
    const summary = {
      totalFiles: traceFiles.length,
      totalSize: totalSize,
      totalSizeFormatted: formatBytes(totalSize),
      files: traceInfo,
      generatedAt: new Date().toISOString()
    };
    
    // Save summary to file
    const summaryPath = path.join(traceDir, 'trace-summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
    
    console.log(`📊 Trace Summary:`);
    console.log(`   📄 Total files: ${summary.totalFiles}`);
    console.log(`   💾 Total size: ${summary.totalSizeFormatted}`);
    console.log(`   📁 Summary saved: ${summaryPath}`);
    
  } catch (error) {
    console.log('⚠️ Could not generate trace summary:', error.message);
  }
}

function cleanupTemporaryFiles(debugDir) {
  try {
    if (!fs.existsSync(debugDir)) {
      return;
    }
    
    const files = fs.readdirSync(debugDir);
    const imageFiles = files.filter(file => 
      file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')
    );
    
    if (imageFiles.length > 0) {
      console.log(`🧹 Found ${imageFiles.length} temporary image files`);
      
      // Keep only the last 10 images
      if (imageFiles.length > 10) {
        const filesToDelete = imageFiles.slice(10);
        filesToDelete.forEach(file => {
          fs.unlinkSync(path.join(debugDir, file));
        });
        console.log(`🗑️ Deleted ${filesToDelete.length} old image files`);
      }
    }
    
  } catch (error) {
    console.log('⚠️ Could not clean up temporary files:', error.message);
  }
}

function generateTraceReport(traceDir) {
  try {
    const summaryPath = path.join(traceDir, 'trace-summary.json');
    if (!fs.existsSync(summaryPath)) {
      return;
    }
    
    const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
    
    // Generate markdown report
    const report = `# 🎭 Playwright Tracing Report

Generated: ${new Date().toLocaleString()}

## 📊 Summary
- **Total Trace Files**: ${summary.totalFiles}
- **Total Size**: ${summary.totalSizeFormatted}
- **Generated At**: ${summary.generatedAt}

## 📁 Trace Files

| File Name | Size | Created |
|-----------|------|---------|
${summary.files.map(file => 
  `| ${file.name} | ${file.sizeFormatted} | ${new Date(file.created).toLocaleString()} |`
).join('\n')}

## 🚀 How to View Traces

\`\`\`bash
# View specific trace
npx playwright show-trace trace-files/your-trace-file.zip

# View all traces
npx playwright show-trace trace-files/*.zip

# Open HTML report
npx playwright show-report
\`\`\`

## 📝 Notes
- Trace files are automatically cleaned up after 7 days
- Use \`npx playwright show-trace\` to view traces
- Check the HTML report for detailed test results
`;

    const reportPath = path.join(traceDir, 'trace-report.md');
    fs.writeFileSync(reportPath, report);
    
    console.log(`📝 Trace report generated: ${reportPath}`);
    
  } catch (error) {
    console.log('⚠️ Could not generate trace report:', error.message);
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

module.exports = globalTeardown;
