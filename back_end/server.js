import express from 'express';
import cors from 'cors';
import dbconnect from './config/db.js';
import dotenv from 'dotenv';
const PORT = process.env.PORT || 5000;
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

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

// Configure CORS based on environment
const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? ['https://your-production-domain.com'] // Add your production domain
  : ['http://localhost:5173'];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["POST", "GET", "PATCH", "DELETE", "PUT"],
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

app.use('/api/user', User_RegisterRouter)
app.use('/api/auth', User_LoginRouter)
app.use('/api/prescription', PrescriptionRouter)
app.use('/api/payment',financeRouter)
app.use('/api/reports', reportRouter)

// Define frontend build path
const frontendBuildPath = path.join(__dirname, "../../front_end/dist");
const indexHtmlPath = path.join(frontendBuildPath, "index.html");

console.log("Environment:", process.env.NODE_ENV || 'development');
console.log("Frontend build path:", frontendBuildPath);
console.log("Index.html path:", indexHtmlPath);

// Always try to serve frontend in production, fallback to API-only mode if not found
if (process.env.NODE_ENV === "production") {
  console.log("Running in production mode");
  
  if (fs.existsSync(frontendBuildPath) && fs.existsSync(indexHtmlPath)) {
    console.log("Serving frontend from:", frontendBuildPath);
    // Serve static files from the frontend build directory
    app.use(express.static(frontendBuildPath));

    // Handle all other routes by serving the index.html
    app.get("*", (req, res) => {
      res.sendFile(indexHtmlPath);
    });
  } else {
    console.log("Frontend build not found. Running in API-only mode.");
    app.get("*", (req, res) => {
      res.json({ 
        message: "API is running. Frontend build not found.",
        status: "api-only",
        environment: process.env.NODE_ENV
      });
    });
  }
} else {
  console.log("Running in development mode");
  app.get("/", (req, res) => {
    res.json({ 
      message: "API is running in development mode",
      status: "development"
    });
  });
}

app.listen(PORT, () => { 
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  dbconnect();
});  