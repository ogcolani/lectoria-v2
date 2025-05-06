
#!/usr/bin/env node

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

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

// Directly run vite from node_modules
console.log('🚀 Starting Vite server...');

const npxExists = runCommand('which npx', false);
if (npxExists) {
  console.log('✅ Using npx to run Vite');
  const child = spawn('npx', ['--no-install', 'vite'], { stdio: 'inherit' });
  
  child.on('error', (error) => {
    console.error('❌ Failed to start Vite:', error.message);
    tryAlternativeMethods();
  });
} else {
  tryAlternativeMethods();
}

function tryAlternativeMethods() {
  console.log('⚠️ Trying alternative methods to run Vite...');
  
  // Try various paths to find and run vite
  const vitePaths = [
    path.join(process.cwd(), 'node_modules', '.bin', 'vite'),
    path.join(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js'),
    path.join(process.cwd(), 'node_modules', 'vite', 'dist', 'node', 'cli.js')
  ];
  
  for (const vitePath of vitePaths) {
    if (fs.existsSync(vitePath)) {
      console.log(`✅ Found Vite at: ${vitePath}`);
      const isJsFile = vitePath.endsWith('.js');
      
      if (isJsFile) {
        console.log(`Running: node ${vitePath}`);
        const child = spawn('node', [vitePath], { stdio: 'inherit' });
        
        child.on('close', (code) => {
          if (code !== 0) {
            console.error(`❌ Process exited with code ${code}`);
          }
        });
        
        return;
      } else {
        console.log(`Running: ${vitePath}`);
        const child = spawn(vitePath, [], { stdio: 'inherit' });
        
        child.on('close', (code) => {
          if (code !== 0) {
            console.error(`❌ Process exited with code ${code}`);
          }
        });
        
        return;
      }
    }
  }
  
  console.error('❌ Could not find or run Vite using any method');
  console.log('\n🔧 TROUBLESHOOTING:');
  console.log('1. Try running: npm install vite @vitejs/plugin-react-swc --save-dev');
  console.log('2. Then run: node ./node_modules/vite/bin/vite.js');
  console.log('3. Or try: npx vite');
  process.exit(1);
}
