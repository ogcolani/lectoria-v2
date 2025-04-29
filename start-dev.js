
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
  
  // Always ensure vite is explicitly installed locally
  console.log('Ensuring Vite is available...');
  try {
    await runCommand('npm', ['install', '--save-dev', 'vite@latest', '@vitejs/plugin-react-swc@latest']);
    console.log('✅ Vite installed successfully');
  } catch (error) {
    console.error('❌ Failed to install Vite:', error.message);
    throw new Error('Failed to install Vite');
  }
}

// Find a working Vite executable
async function findWorkingVite() {
  console.log('Looking for Vite executable...');
  
  const isWindows = process.platform === 'win32';
  const localVitePath = path.join(__dirname, 'node_modules', '.bin', isWindows ? 'vite.cmd' : 'vite');
  
  if (fs.existsSync(localVitePath)) {
    console.log('✅ Found local Vite executable at:', localVitePath);
    return localVitePath;
  }
  
  const viteJsPath = path.join(__dirname, 'node_modules', 'vite', 'bin', 'vite.js');
  if (fs.existsSync(viteJsPath)) {
    console.log('✅ Found Vite.js script at:', viteJsPath);
    return viteJsPath;
  }
  
  // Try direct node_modules path as a last resort
  const viteIndexPath = path.join(__dirname, 'node_modules', 'vite', 'dist', 'node', 'cli.js');
  if (fs.existsSync(viteIndexPath)) {
    console.log('✅ Found Vite CLI script at:', viteIndexPath);
    return viteIndexPath;
  }
  
  throw new Error('Could not find a working Vite executable');
}

// Main function
async function main() {
  try {
    await ensureDependencies();
    const vitePath = await findWorkingVite();
    
    console.log('🚀 Starting Vite development server...');
    
    // Run vite with node for maximum compatibility
    await runCommand('node', [vitePath]);
  } catch (error) {
    console.error('❌ Failed to start development server:', error.message);
    console.log('\n🔍 TROUBLESHOOTING SUGGESTIONS:');
    console.log('1. Try running: npm install --save-dev vite @vitejs/plugin-react-swc');
    console.log('2. Then run: node ./node_modules/vite/bin/vite.js');
    console.log('3. If that fails, check Node.js version: node -v (should be 14.18+ or 16+)');
    console.log('4. Make sure you have a proper vite.config.ts or vite.config.js file\n');
    process.exit(1);
  }
}

// Run the main function
main();
