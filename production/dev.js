#!/usr/bin/env node
// dev.js - Cross-platform development script

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function exec(command, options = {}) {
  try {
    return execSync(command, { 
      stdio: 'inherit',
      ...options 
    });
  } catch (error) {
    log(`Error executing: ${command}`, 'red');
    process.exit(1);
  }
}

// Generate version based on timestamp
function generateVersion() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  
  return `v1.0.${year}${month}${day}-${hours}${minutes}`;
}

// Update docker-compose.local.yaml with new version
function updateDockerCompose(version) {
  const composeFile = path.resolve(__dirname, 'docker-compose.local.yaml');
  
  log(`Checking file: ${composeFile}`, 'yellow');
  
  if (!fs.existsSync(composeFile)) {
    log(`Error: ${composeFile} not found`, 'red');
    process.exit(1);
  }
  
  log('✓ File found', 'green');
  
  // Read file
  let content = fs.readFileSync(composeFile, 'utf8');
  
  // Show old version
  const oldMatch = content.match(/image:\s+(.+):(.+)/);
  if (oldMatch) {
    log(`Old image: ${oldMatch[1]}:${oldMatch[2]}`, 'yellow');
  }
  
  // Replace version - Match đúng pattern có registry
  const newContent = content.replace(
    /image:\s+registry\.gitlab\.com\/tuanxx31\/taikhoansieure\/be-gx:.+/,
    `image: registry.gitlab.com/tuanxx31/taikhoansieure/be-gx:${version}`
  );
  
  // Check if content changed
  if (content === newContent) {
    log('Warning: No changes made.', 'red');
    log('Current image line:', 'yellow');
    const imageLine = content.match(/image:.*/);
    if (imageLine) {
      log(imageLine[0], 'yellow');
    }
    process.exit(1);
  }
  
  // Write file
  fs.writeFileSync(composeFile, newContent);
  log(`✓ Updated to: registry.gitlab.com/tuanxx31/taikhoansieure/be-gx:${version}`, 'green');
  
  // Verify write
  const verify = fs.readFileSync(composeFile, 'utf8');
  const verifyMatch = verify.match(/image:\s+(.+):(.+)/);
  if (verifyMatch && verifyMatch[2].includes(version.split('-')[0])) {
    log(`✓ Verified successfully!`, 'green');
  } else {
    log('✗ Verification failed!', 'red');
    process.exit(1);
  }
}

// Main function
function main() {
  const version = generateVersion();
  const imageName = `registry.gitlab.com/tuanxx31/taikhoansieure/be-gx:${version}`;
  
  log('\n=== Building & Pushing to Registry ===', 'cyan');
  log(`Version: ${version}`, 'green');
  log(`Platform: ${process.platform}`, 'yellow');
  
  // Update docker-compose file
  log('\n=== Updating docker-compose.local.yaml ===', 'cyan');
  updateDockerCompose(version);
  
  // Build new image
  log('\n=== Building image ===', 'cyan');
  exec('docker-compose -f docker-compose.local.yaml build --no-cache be-gx');
  
  // Push to registry
  log('\n=== Pushing to GitLab Registry ===', 'cyan');
  exec(`docker push ${imageName}`);
  
  // Show built images
  log('\n=== Images ===', 'cyan');
  exec('docker images registry.gitlab.com/tuanxx31/taikhoansieure/be-gx --format "table {{.Tag}}\\t{{.CreatedAt}}\\t{{.Size}}"');
  
  // Success message
  log('\n=== Build & Push Complete! ===', 'green');
  log(`Version: ${version}`, 'green');
  log(`Image: ${imageName}`, 'green');
  log('\nTo pull this image on server:', 'yellow');
  log(`  docker pull ${imageName}`, 'cyan');
}

// Run
main();