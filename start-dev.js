
#!/usr/bin/env node

// Enhanced script for starting dev server with more robust vite detection
const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

console.log('📦 Starting development server...');

// Function to run a command and print output
function runCommand(command, args = []) {
  console.log(`Running: ${command} ${args.join(' ')}`);
  try {
    const result = spawn(command, args, { 
      stdio: 'inherit',
      shell: process.platform === 'win32' // Use shell on Windows
    });
    
    return new Promise((resolve, reject) => {
      result.on('close', (code) => {
        if (code === 0) {
          resolve(true);
        } else {
          reject(new Error(`Command failed with exit code ${code}`));
        }
      });
    });
  } catch (error) {
    console.error(`Failed to execute: ${command}`);
    console.error(error.message);
    return Promise.reject(error);
  }
}

// Check for node_modules
if (!fs.existsSync(path.join(__dirname, 'node_modules'))) {
  console.log('📥 Installing dependencies first...');
  try {
    execSync('npm install', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Failed to install dependencies.');
    process.exit(1);
  }
}

// Define possible vite locations
const vitePaths = [
  path.join(__dirname, 'node_modules', '.bin', 'vite'),
  path.join(__dirname, 'node_modules', 'vite', 'bin', 'vite.js'),
  'vite' // System path
];

// Find first working vite path
async function findWorkingVite() {
  // On Windows, add .cmd extension for the first path
  if (process.platform === 'win32') {
    vitePaths[0] = vitePaths[0] + '.cmd';
  }

  for (const vitePath of vitePaths) {
    try {
      if (vitePath === 'vite') {
        // Test if vite is globally available
        execSync('vite --version', { stdio: 'pipe' });
      } else {
        // Check if file exists
        if (!fs.existsSync(vitePath)) continue;
      }
      return vitePath;
    } catch (error) {
      continue;
    }
  }
  return null;
}

// Main execution
async function main() {
  try {
    const vitePath = await findWorkingVite();
    
    if (!vitePath) {
      console.error('❌ Could not find vite. Installing locally...');
      try {
        execSync('npm install --no-save vite@latest @vitejs/plugin-react-swc@latest', { stdio: 'inherit' });
        console.log('✅ Vite installed successfully.');
        // Try again with newly installed vite
        main();
        return;
      } catch (error) {
        console.error('❌ Failed to install vite.');
        console.error('Please try running one of these commands:');
        console.error('npm install --global vite');
        console.error('OR');
        console.error('npx vite');
        process.exit(1);
      }
    }
    
    console.log(`🚀 Starting vite using: ${vitePath}`);
    
    if (vitePath === 'vite') {
      await runCommand('vite');
    } else {
      await runCommand('node', [vitePath]);
    }
  } catch (error) {
    console.error('❌ Failed to start development server.');
    console.error(error.message);
    process.exit(1);
  }
}

main();
