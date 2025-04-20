
#!/bin/bash
# Script to ensure vite is available and run the development server

# Make the script exit if any command fails
set -e

# Check if project has node_modules folder
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies first..."
  npm install
fi

# Try different ways to run vite
if [ -f "node_modules/.bin/vite" ]; then
  echo "Using local vite from node_modules..."
  node_modules/.bin/vite
elif command -v vite &> /dev/null; then
  echo "Using system vite..."
  vite
elif command -v npx &> /dev/null; then
  echo "Using npx to run vite..."
  npx vite
else
  echo "Using npm to run vite..."
  npm exec vite
fi
