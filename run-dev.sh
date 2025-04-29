
#!/bin/bash
# Script to ensure vite is available and run the development server

# Make the script exit if any command fails
set -e

echo "📦 Starting development server..."

# Check if project has node_modules folder
if [ ! -d "node_modules" ]; then
  echo "📥 Installing dependencies first..."
  npm install
fi

# Check if vite is installed in the project
if [ ! -f "node_modules/.bin/vite" ]; then
  echo "📥 Vite not found in node_modules, installing it locally..."
  npm install --save-dev vite@latest @vitejs/plugin-react-swc@latest
fi

# Function to try running vite with different methods
try_run_vite() {
  # Try direct path to vite executable
  if [ -f "node_modules/.bin/vite" ]; then
    echo "✅ Using local vite from node_modules..."
    node_modules/.bin/vite
    return $?
  fi
  
  # Try vite.js script
  if [ -f "node_modules/vite/bin/vite.js" ]; then
    echo "✅ Using vite.js script..."
    node node_modules/vite/bin/vite.js
    return $?
  fi
  
  # Try with npx
  if command -v npx &> /dev/null; then
    echo "✅ Using npx to run vite..."
    npx --no-install vite
    return $?
  fi
  
  # Try global vite
  if command -v vite &> /dev/null; then
    echo "✅ Using system vite..."
    vite
    return $?
  fi
  
  # Try with npm exec
  echo "✅ Using npm exec to run vite..."
  npm exec vite
  return $?
}

# Try to run vite
if ! try_run_vite; then
  echo "❌ Failed to start Vite development server"
  echo ""
  echo "🔍 TROUBLESHOOTING SUGGESTIONS:"
  echo "1. Try running: npm install --save-dev vite @vitejs/plugin-react-swc"
  echo "2. Then run: npx vite"
  echo "3. If that fails, check Node.js version: node -v (should be 14.18+ or 16+)"
  echo "4. Make sure you have a proper vite.config.ts or vite.config.js file"
  exit 1
fi
