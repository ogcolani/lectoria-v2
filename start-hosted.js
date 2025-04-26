
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
  () => runCommand('npx vite'),
  () => runCommand('npm exec vite')
];

// Try each method until one succeeds
let success = false;
for (const method of methods) {
  console.log("Attempting to start Vite development server...");
  success = method();
  if (success) break;
}

if (!success) {
  console.error('Failed to start the development server using any method.');
  console.log('Try installing Vite globally with: npm install -g vite');
  console.log('Or try running the start-dev.js script with: node start-dev.js');
  process.exit(1);
}
