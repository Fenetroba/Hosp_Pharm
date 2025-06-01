#!/bin/bash

# Navigate to frontend directory
cd front_end

# Install frontend dependencies
npm install

# Build the frontend
npm run build

# Navigate back to root
cd ..

# Navigate to backend directory
cd back_end

# Install backend dependencies
npm install

# Start the server
npm start 