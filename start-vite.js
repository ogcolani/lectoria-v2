
#!/usr/bin/env node

// This script finds and runs Vite without modifying package.json
const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Vite development server...');

// Function to run a command and return its output
function runCommand(command) {
  try {
    return execSync(command, { stdio: 'pipe' }).toString().trim();
  } catch (error) {
    return null;
  }
}

// Function to check if a path exists
function pathExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (error) {
    return false;
  }
}

// Install vite without modifying package.json
console.log('📦 Ensuring Vite is installed...');
try {
  execSync('npm install --no-save vite@latest @vitejs/plugin-react-swc@latest', { stdio: 'inherit' });
  console.log('✅ Vite installation successful');
} catch (error) {
  console.warn('⚠️ Could not install Vite, attempting to continue with existing installation');
}

// Find Vite executable using different methods
console.log('🔍 Locating Vite executable...');

const possiblePaths = [
  path.join(__dirname, 'node_modules', '.bin', 'vite'),
  path.join(__dirname, 'node_modules', '.bin', 'vite.cmd'), // Windows
  path.join(__dirname, 'node_modules', 'vite', 'bin', 'vite.js'),
  path.join(__dirname, 'node_modules', 'vite', 'dist', 'node', 'cli.js')
];

let vitePath = null;
for (const potentialPath of possiblePaths) {
  if (pathExists(potentialPath)) {
    vitePath = potentialPath;
    console.log(`✅ Found Vite at: ${vitePath}`);
    break;
  }
}

if (!vitePath) {
  console.error('❌ Could not find Vite executable in node_modules');
  process.exit(1);
}

// Run Vite with appropriate command based on file type
console.log('🚀 Launching Vite development server...');

const isWindows = process.platform === 'win32';
const isJsFile = vitePath.endsWith('.js');

try {
  let childProcess;
  
  if (isJsFile) {
    childProcess = spawn('node', [vitePath], { stdio: 'inherit', shell: isWindows });
  } else {
    childProcess = spawn(vitePath, [], { stdio: 'inherit', shell: isWindows });
  }
  
  childProcess.on('error', (err) => {
    console.error('❌ Failed to start Vite:', err.message);
    console.log('\n🔧 Try running manually: node ./node_modules/vite/bin/vite.js\n');
    process.exit(1);
  });
  
  process.on('SIGINT', () => {
    childProcess.kill('SIGINT');
  });
  
  childProcess.on('exit', (code) => {
    process.exit(code);
  });
} catch (error) {
  console.error('❌ Failed to run Vite:', error.message);
  console.log('\nTROUBLESHOOTING:');
  console.log('1. Try running: node ./node_modules/vite/bin/vite.js');
  console.log('2. Check Node.js version: node -v (should be 14.18+ or 16+)');
  console.log('3. Make sure vite.config.ts is valid\n');
  process.exit(1);
}
