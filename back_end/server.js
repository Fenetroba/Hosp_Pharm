import express from 'express';
import cors from 'cors';
import dbconnect from './config/db.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const PORT = process.env.PORT || 5000;

// ES Module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import User_RegisterRouter from './routes/userRoutes.js';
import User_LoginRouter from './routes/authRoutes.js';
import PrescriptionRouter from './routes/prescriptionRoutes.js';
import financeRouter from './routes/Financial.js';
import reportRouter from './routes/reportRoutes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.NODE_ENV === "production" ? false : "http://localhost:5173",
  methods: ["POST", "GET", "PATCH", "DELETE","PUT"],
  allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
  ],
  credentials: true
}));
 
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use('/api/user', User_RegisterRouter)
app.use('/api/auth', User_LoginRouter)
app.use('/api/prescription', PrescriptionRouter)
app.use('/api/payment',financeRouter)
app.use('/api/reports', reportRouter)

// Check if frontend build exists
const frontendBuildPath = path.join(__dirname, "../front_end/dist");
const indexHtmlPath = path.join(frontendBuildPath, "index.html");

console.log("Checking frontend build...");
console.log("Frontend build path:", frontendBuildPath);
console.log("Index.html path:", indexHtmlPath);

if (fs.existsSync(frontendBuildPath)) {
  console.log("Frontend build directory exists");
  if (fs.existsSync(indexHtmlPath)) {
    console.log("index.html found, serving frontend application");
    // Serve static files from the frontend build directory
    app.use(express.static(frontendBuildPath));

    // Handle all other routes by serving the index.html
    app.get("*", (req, res) => {
      res.sendFile(indexHtmlPath);
    });
  } else {
    console.log("index.html not found in build directory");
    console.log("Directory contents:", fs.readdirSync(frontendBuildPath));
    // API-only mode route handler
    app.get("*", (req, res) => {
      res.json({ 
        message: "API is running. Frontend build is incomplete - index.html not found.",
        status: "api-only"
      });
    });
  }
} else {
  console.log("Frontend build directory not found");
  // API-only mode route handler
  app.get("*", (req, res) => {
    res.json({ 
      message: "API is running. Frontend build not found.",
      status: "api-only"
    });
  });
}

app.listen(PORT, () => { 
  console.log(`Server is running on port ${PORT}`);
  dbconnect();
});  