
#!/bin/bash
# Script to ensure vite is available and run the development server

# Make the script exit if any command fails
set -e

# Check if vite command is directly available
if command -v vite &> /dev/null; then
  echo "Using system vite..."
  vite
# Check if npx is available to run vite
elif command -v npx &> /dev/null; then
  echo "Using npx to run vite..."
  npx vite
# As a last resort, try using npm to run vite
else
  echo "Using npm to run vite..."
  npm exec vite
fi
