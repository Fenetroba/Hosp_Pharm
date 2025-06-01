#!/bin/bash

# Exit on error
set -e

# Get the absolute path of the project root
PROJECT_ROOT=$(pwd)
echo "Project root: $PROJECT_ROOT"

# Frontend paths
FRONTEND_DIR="$PROJECT_ROOT/front_end"
FRONTEND_DIST="$FRONTEND_DIR/dist"

echo "Starting build process..."

# Check if frontend directory exists
if [ ! -d "$FRONTEND_DIR" ]; then
    echo "Error: Frontend directory not found at $FRONTEND_DIR"
    exit 1
fi

# Navigate to frontend directory
echo "Building frontend..."
cd "$FRONTEND_DIR"

# Clean previous build if it exists
if [ -d "dist" ]; then
    echo "Cleaning previous build..."
    rm -rf dist
fi

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

if [ ! -f "dist/index.html" ]; then
    echo "Error: Frontend build failed - index.html not found"
    exit 1
fi

echo "Frontend build completed successfully"
echo "Build directory contents:"
ls -la dist/

# Navigate back to root
cd "$PROJECT_ROOT"

# Navigate to backend directory
echo "Setting up backend..."
cd "$PROJECT_ROOT/back_end"

# Install backend dependencies
echo "Installing backend dependencies..."
npm install

echo "Build process completed successfully"
echo "Starting server..."

# Start the server
npm start 