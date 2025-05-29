#!/bin/bash

# Build frontend
echo "Building frontend..."
cd front_end
npm install
npm run build

# Build backend
echo "Building backend..."
cd ../back_end
npm install

# Create production directory
echo "Creating production directory..."
cd ..
mkdir -p production
cp -r back_end/* production/
cp -r front_end/dist production/public

# Create production package.json
echo "Creating production package.json..."
cat > production/package.json << EOL
{
  "name": "hospital-pharmacy",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.18.3",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.2.0",
    "socket.io": "^4.7.4"
  }
}
EOL

echo "Deployment package is ready in the 'production' directory" 