#!/usr/bin/env node
// dev.js - Cross-platform development script

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ========== CONFIG ==========
const SERVICES = [
  'registry.gitlab.com/tuanxx31/taikhoansieure/be-gx',
  'registry.gitlab.com/tuanxx31/taikhoansieure/fe-gx',
];
// ============================

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

// Parse service name from full image path
function getServiceName(imagePath) {
  return imagePath.split('/').pop();
}

// Find image path by service name
function getImagePath(serviceName) {
  return SERVICES.find(s => getServiceName(s) === serviceName);
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
function updateDockerCompose(version, imagePath) {
  const composeFile = path.resolve(__dirname, 'docker-compose.local.yaml');
  
  if (!fs.existsSync(composeFile)) {
    log(`Error: ${composeFile} not found`, 'red');
    process.exit(1);
  }
  
  let content = fs.readFileSync(composeFile, 'utf8');
  
  // Escape special chars for regex
  const escapedPath = imagePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`(image:\\s+${escapedPath}:).+`, 'g');
  
  // Show old version
  const oldMatch = content.match(pattern);
  if (oldMatch) {
    log(`Old: ${oldMatch[0].replace('image: ', '')}`, 'yellow');
  }
  
  // Replace version
  const newContent = content.replace(pattern, `$1${version}`);
  
  if (content === newContent) {
    log(`Warning: No changes made for ${imagePath}`, 'red');
    return false;
  }
  
  fs.writeFileSync(composeFile, newContent);
  log(`New: ${imagePath}:${version}`, 'green');
  return true;
}

// Show usage
function showUsage() {
  const serviceNames = SERVICES.map(getServiceName);
  
  log('\n=== Dev Script Usage ===', 'cyan');
  
  log('\nBuild & Run locally:', 'yellow');
  serviceNames.forEach(name => {
    log(`  node dev.js dev ${name}`, 'cyan');
  });
  log(`  node dev.js dev all`, 'cyan');
  
  log('\nBuild & Push to registry:', 'yellow');
  serviceNames.forEach(name => {
    log(`  node dev.js push ${name}`, 'cyan');
  });
  log(`  node dev.js push all`, 'cyan');
  
  log('\nConfigured services:', 'yellow');
  SERVICES.forEach(s => log(`  ${s}`, 'cyan'));
}

// Build local and run
function buildAndRun(version, imagePath) {
  const serviceName = getServiceName(imagePath);
  
  // Stop existing container
  log(`\n=== Stopping ${serviceName} ===`, 'yellow');
  try {
    exec(`docker-compose -f docker-compose.local.yaml down ${serviceName}`, { stdio: 'pipe' });
  } catch (e) {
    // Ignore
  }
  
  // Build
  log(`\n=== Building ${serviceName} ===`, 'cyan');
  exec(`docker-compose -f docker-compose.local.yaml build --no-cache ${serviceName}`);
  
  // Start
  log(`\n=== Starting ${serviceName} ===`, 'cyan');
  exec(`docker-compose -f docker-compose.local.yaml up -d ${serviceName}`);
  
  return `${imagePath}:${version}`;
}

// Build and push to registry
function buildAndPush(version, imagePath) {
  const serviceName = getServiceName(imagePath);
  const fullImageName = `${imagePath}:${version}`;
  const latestImageName = `${imagePath}:latest`;
  
  // Build
  log(`\n=== Building ${serviceName} ===`, 'cyan');
  exec(`docker-compose -f docker-compose.local.yaml build --no-cache ${serviceName}`);
  
  // Push version tag
  log(`\n=== Pushing ${serviceName} (${version}) ===`, 'cyan');
  exec(`docker push ${fullImageName}`);
  
  // Tag and push latest
  log(`\n=== Pushing ${serviceName} (latest) ===`, 'cyan');
  exec(`docker tag ${fullImageName} ${latestImageName}`);
  exec(`docker push ${latestImageName}`);
  
  return fullImageName;
}

// Main function
function main() {
  const args = process.argv.slice(2);
  const mode = args[0];     // dev | push
  const target = args[1];   // be-gx | fe-gx | all
  
  const serviceNames = SERVICES.map(getServiceName);
  const validModes = ['dev', 'push'];
  const validTargets = [...serviceNames, 'all'];
  
  if (!mode || !validModes.includes(mode) || !target || !validTargets.includes(target)) {
    showUsage();
    process.exit(0);
  }
  
  // Filter services based on target
  const selectedServices = target === 'all' 
    ? SERVICES 
    : SERVICES.filter(s => getServiceName(s) === target);
  
  if (selectedServices.length === 0) {
    log(`Service "${target}" not found in config`, 'red');
    process.exit(1);
  }
  
  const version = generateVersion();
  const modeText = mode === 'dev' ? 'Building & Running Locally' : 'Building & Pushing to Registry';
  
  log(`\n=== ${modeText} ===`, 'cyan');
  log(`Version: ${version}`, 'green');
  log(`Services: ${selectedServices.map(getServiceName).join(', ')}`, 'green');
  log(`Platform: ${process.platform}`, 'yellow');
  
  const processedImages = [];
  
  for (const imagePath of selectedServices) {
    const serviceName = getServiceName(imagePath);
    
    // Update docker-compose file
    log(`\n=== Updating docker-compose for ${serviceName} ===`, 'cyan');
    updateDockerCompose(version, imagePath);
    
    // Build and run/push
    let fullImageName;
    if (mode === 'dev') {
      fullImageName = buildAndRun(version, imagePath);
    } else {
      fullImageName = buildAndPush(version, imagePath);
    }
    processedImages.push(fullImageName);
  }
  
  // Show images
  log('\n=== Images ===', 'cyan');
  exec('docker images registry.gitlab.com/tuanxx31/taikhoansieure --format "table {{.Repository}}\\t{{.Tag}}\\t{{.CreatedAt}}\\t{{.Size}}"');
  
  // Success message
  log('\n=== Complete! ===', 'green');
  log(`Version: ${version}`, 'green');
  
  if (mode === 'dev') {
    log('\nRunning containers:', 'yellow');
    processedImages.forEach(img => log(`  ${img}`, 'cyan'));
    
    log('\nURLs:', 'yellow');
    if (target === 'be-gx' || target === 'all') {
      log('  Backend:  http://localhost:1337/admin', 'cyan');
    }
    if (target === 'fe-gx' || target === 'all') {
      log('  Frontend: http://localhost:3999', 'cyan');
    }
    
    log('\nView logs:', 'yellow');
    selectedServices.forEach(s => {
      const name = getServiceName(s);
      log(`  docker-compose -f docker-compose.local.yaml logs -f ${name}`, 'cyan');
    });
  } else {
    log('\nPushed:', 'yellow');
    processedImages.forEach(img => log(`  ${img}`, 'cyan'));
    
    log('\nPull commands:', 'yellow');
    processedImages.forEach(img => log(`  docker pull ${img}`, 'cyan'));
  }
}

// Run
main();