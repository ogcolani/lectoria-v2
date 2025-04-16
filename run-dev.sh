
#!/bin/bash
# Simple script to ensure vite is available and run the development server
if ! command -v vite &> /dev/null; then
  echo "Vite not found, attempting to run through npx..."
  npx vite
else
  vite
fi
