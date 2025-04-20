
// JavaScript alternative to run-dev.sh for restricted environments
// This can be run with: node start-hosted.js

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to run a command and print output
function runCommand(command) {
  console.log(`Running: ${command}`);
  try {
    const output = execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`Command failed: ${command}`);
    return false;
  }
}

// Check for node_modules
if (!fs.existsSync(path.join(__dirname, 'node_modules'))) {
  console.log('Installing dependencies first...');
  runCommand('npm install');
}

// Check for vite in node_modules
if (!fs.existsSync(path.join(__dirname, 'node_modules', '.bin', 'vite'))) {
  console.log('Vite not found in node_modules, installing it locally...');
  runCommand('npm install --no-save vite@latest @vitejs/plugin-react-swc@latest');
}

// Try to run vite in different ways
const methods = [
  () => runCommand('node_modules/.bin/vite'),
  () => runCommand('vite'),
  () => runCommand('npx vite'),
  () => runCommand('npm exec vite')
];

// Try each method until one succeeds
let success = false;
for (const method of methods) {
  success = method();
  if (success) break;
}

if (!success) {
  console.error('Failed to start the development server using any method.');
  console.log('Alternative: You can try modifying vite.config.ts to use a different port if there are port conflicts.');
}
