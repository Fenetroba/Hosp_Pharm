#!/bin/bash

# Exit on error
set -e

echo "Starting build process..."

# Navigate to frontend directory
echo "Building frontend..."
cd front_end

# Install frontend dependencies
echo "Installing frontend dependencies..."
npm install

# Build the frontend
echo "Building frontend application..."
npm run build

# Verify the build
if [ ! -d "dist" ]; then
    echo "Error: Frontend build failed - dist directory not created"
    exit 1
fi

echo "Frontend build completed successfully"

# Navigate back to root
cd ..

# Navigate to backend directory
echo "Setting up backend..."
cd back_end

# Install backend dependencies
echo "Installing backend dependencies..."
npm install

# Create necessary directories if they don't exist
mkdir -p ../front_end/dist

# Copy frontend build to the correct location
echo "Copying frontend build files..."
cp -r ../front_end/dist/* ../front_end/dist/

echo "Build process completed successfully"
echo "Starting server..."

# Start the server
npm start 