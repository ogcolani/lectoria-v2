
#!/usr/bin/env node

// Enhanced script for starting dev server with better error handling and Vite detection
const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

console.log('📦 Starting development server...');

// Function to run a command synchronously and return output
function runCommandSync(command, ignoreError = false) {
  try {
    return execSync(command, { stdio: 'pipe' }).toString().trim();
  } catch (error) {
    if (!ignoreError) console.error(`Failed to run command: ${command}`);
    return '';
  }
}

// Function to run a command as a promise
function runCommand(command, args = []) {
  console.log(`Running: ${command} ${args.join(' ')}`);
  
  const isWindows = process.platform === 'win32';
  const spawnOptions = {
    stdio: 'inherit',
    shell: isWindows // Use shell on Windows
  };

  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, spawnOptions);
    
    proc.on('close', (code) => {
      if (code === 0) {
        resolve(true);
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
    
    proc.on('error', (err) => {
      reject(new Error(`Failed to start command: ${err.message}`));
    });
  });
}

// Check and install dependencies if needed
async function ensureDependencies() {
  console.log('Checking dependencies...');
  
  if (!fs.existsSync(path.join(__dirname, 'node_modules'))) {
    console.log('📥 Installing dependencies...');
    await runCommand('npm', ['install']);
  }

  // Make sure lucide-react is installed (important for our app)
  try {
    require.resolve('lucide-react');
    console.log('✅ lucide-react is installed');
  } catch (e) {
    console.log('📥 Installing lucide-react...');
    await runCommand('npm', ['install', '--save', 'lucide-react@latest']);
  }
  
  // Always ensure vite is installed
  console.log('Ensuring Vite is available...');
  try {
    await runCommand('npm', ['install', '--no-save', 'vite@latest', '@vitejs/plugin-react-swc@latest']);
    console.log('✅ Vite installed successfully');
  } catch (error) {
    console.error('❌ Failed to install Vite:', error.message);
  }
}

// Find a working Vite executable
async function findWorkingVite() {
  console.log('Looking for Vite executable...');
  
  const isWindows = process.platform === 'win32';
  const localVitePath = path.join(__dirname, 'node_modules', '.bin', isWindows ? 'vite.cmd' : 'vite');
  
  if (fs.existsSync(localVitePath)) {
    console.log('✅ Found local Vite executable');
    return localVitePath;
  }
  
  // Try npx vite
  const npxResult = runCommandSync('npx vite --version', true);
  if (npxResult) {
    console.log('✅ Vite available via npx');
    return 'npx';
  }
  
  // Try global vite
  const globalResult = runCommandSync('vite --version', true);
  if (globalResult) {
    console.log('✅ Vite available globally');
    return 'vite';
  }
  
  // If we get here, we couldn't find a working vite
  console.log('❓ Could not find a working Vite executable. Will use node_modules path anyway.');
  return localVitePath;
}

// Main function
async function main() {
  try {
    await ensureDependencies();
    const vitePath = await findWorkingVite();
    
    console.log('🚀 Starting Vite development server...');
    
    if (vitePath === 'npx') {
      await runCommand('npx', ['vite']);
    } else if (vitePath === 'vite') {
      await runCommand('vite', []);
    } else {
      if (process.platform === 'win32') {
        await runCommand(vitePath, []);
      } else {
        await runCommand('node', [vitePath]);
      }
    }
  } catch (error) {
    console.error('❌ Failed to start development server:', error.message);
    console.log('\nTRY THIS: You can try running these commands manually:');
    console.log('  npm install vite @vitejs/plugin-react-swc lucide-react --no-save');
    console.log('  npx vite\n');
    process.exit(1);
  }
}

// Run the main function
main();
