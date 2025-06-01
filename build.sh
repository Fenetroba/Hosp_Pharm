#!/bin/bash

# Exit on error
set -e

# Get the absolute path of the project root
PROJECT_ROOT=$(pwd)
echo "Project root: $PROJECT_ROOT"

# Frontend paths
FRONTEND_DIR="$PROJECT_ROOT/front_end"
FRONTEND_DIST="$FRONTEND_DIR/dist"

# Backend paths
BACKEND_DIR="$PROJECT_ROOT/back_end"
BACKEND_DIST="$BACKEND_DIR/dist"

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

echo "Frontend build completed successfully"

# Create backend dist directory if it doesn't exist
echo "Setting up backend..."
cd "$BACKEND_DIR"

# Install backend dependencies
echo "Installing backend dependencies..."
npm install

# Create the dist directory in the backend
echo "Creating backend dist directory..."
mkdir -p "$BACKEND_DIR/dist"

# Copy frontend build to backend dist
echo "Copying frontend build files to backend..."
cp -r "$FRONTEND_DIST"/* "$BACKEND_DIR/dist/"

# Verify the copy
if [ ! -f "$BACKEND_DIR/dist/index.html" ]; then
    echo "Error: Failed to copy frontend build to backend"
    exit 1
fi

echo "Build process completed successfully"
echo "Starting server..."

# Start the server
cd "$BACKEND_DIR"
npm start 