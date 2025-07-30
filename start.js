
#!/usr/bin/env node

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

console.log('🚀 Starting development server...');

// Function to run command and return output
function runCommand(command, showOutput = true) {
  const options = showOutput ? { stdio: 'inherit' } : { stdio: 'pipe' };
  try {
    return execSync(command, options);
  } catch (error) {
    if (showOutput) {
      console.error(`Failed to run command: ${command}`);
    }
    return null;
  }
}

// Check if node_modules exists
if (!fs.existsSync('node_modules')) {
  console.log('📦 Installing dependencies first...');
  runCommand('npm install');
}

// Make sure vite is installed locally
console.log('📦 Ensuring Vite is properly installed...');
runCommand('npm install --no-save vite@latest @vitejs/plugin-react-swc@latest');

// Function to start Vite directly
function startViteDirectly() {
  console.log('🚀 Starting Vite server directly...');
  
  // Try multiple paths to find vite
  const isWindows = os.platform() === 'win32';
  const viteExecutables = [
    path.join(process.cwd(), 'node_modules', '.bin', isWindows ? 'vite.cmd' : 'vite'),
    path.join(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js'),
    path.join(process.cwd(), 'node_modules', 'vite', 'dist', 'node', 'cli.js')
  ];
  
  for (const vitePath of viteExecutables) {
    if (fs.existsSync(vitePath)) {
      console.log(`✅ Found Vite at: ${vitePath}`);
      
      let child;
      if (vitePath.endsWith('.js')) {
        console.log(`Running: node "${vitePath}"`);
        child = spawn('node', [vitePath], { 
          stdio: 'inherit',
          cwd: process.cwd(),
          env: { ...process.env, NODE_ENV: 'development' }
        });
      } else {
        console.log(`Running: "${vitePath}"`);
        child = spawn(vitePath, [], { 
          stdio: 'inherit',
          cwd: process.cwd(),
          env: { ...process.env, NODE_ENV: 'development' }
        });
      }
      
      child.on('error', (error) => {
        console.error(`❌ Failed to start Vite with ${vitePath}:`, error.message);
        if (viteExecutables.indexOf(vitePath) < viteExecutables.length - 1) {
          console.log('⚠️ Trying next method...');
        }
      });
      
      child.on('close', (code) => {
        if (code !== 0) {
          console.error(`❌ Process exited with code ${code}`);
        }
      });
      
      return true;
    }
  }
  
  return false;
}

// Try to start with the most reliable method first
if (startViteDirectly()) {
  // Vite started successfully
} else {
  // Try npx as fallback
  console.log('⚠️ Trying npx as fallback...');
  try {
    const child = spawn('npx', ['vite'], { 
      stdio: 'inherit',
      cwd: process.cwd(),
      env: { ...process.env, NODE_ENV: 'development' }
    });
    
    child.on('error', (error) => {
      console.error('❌ Failed to start Vite with npx:', error.message);
      tryFinalFallback();
    });
  } catch (error) {
    tryFinalFallback();
  }
}

function tryFinalFallback() {
  console.error('❌ Could not find or run Vite using any method');
  console.log('\n🔧 TROUBLESHOOTING:');
  console.log('1. Try running: npm install vite @vitejs/plugin-react-swc --save-dev');
  console.log('2. Then run: node ./node_modules/vite/bin/vite.js');
  console.log('3. Or try: npx vite');
  process.exit(1);
}
