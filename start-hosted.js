
// JavaScript alternative to run-dev.sh for restricted environments
// This can be run with: node start-hosted.js

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to run a command and print output
function runCommand(command) {
  console.log(`Running: ${command}`);
  try {
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`Command failed: ${command}`);
    console.error(error.message);
    return false;
  }
}

console.log('📦 Starting development server...');

// Check for node_modules
if (!fs.existsSync(path.join(__dirname, 'node_modules'))) {
  console.log('📥 Installing dependencies first...');
  runCommand('npm install');
}

// Ensure vite is installed (critical for our app)
console.log('📥 Ensuring Vite is properly installed...');
if (!fs.existsSync(path.join(__dirname, 'node_modules', '.bin', 'vite')) && 
    !fs.existsSync(path.join(__dirname, 'node_modules', 'vite'))) {
  console.log('Installing vite package...');
  runCommand('npm install --save-dev vite@latest @vitejs/plugin-react-swc@latest');
}

// Ensure lucide-react is installed (critical for our app)
try {
  require.resolve('lucide-react');
  console.log('✅ lucide-react is already installed');
} catch (e) {
  console.log('📥 Installing lucide-react package...');
  runCommand('npm install --save lucide-react@latest');
}

// Try to run vite in different ways
const methods = [
  () => runCommand('node node_modules/.bin/vite'),
  () => runCommand('node node_modules/vite/bin/vite.js'),
  () => runCommand('npx --no-install vite'),
  () => runCommand('npm exec vite')
];

// Try each method until one succeeds
let success = false;
for (const method of methods) {
  console.log("🚀 Attempting to start Vite development server...");
  success = method();
  if (success) break;
}

if (!success) {
  console.error('❌ Failed to start the development server using any method.');
  console.log('\n🔍 TROUBLESHOOTING SUGGESTIONS:');
  console.log('1. Try running: npm install --save-dev vite @vitejs/plugin-react-swc');
  console.log('2. Then run: npx vite');
  console.log('3. If that fails, check Node.js version: node -v (should be 14.18+ or 16+)');
  console.log('4. Make sure you have a proper vite.config.ts or vite.config.js file\n');
  process.exit(1);
}
