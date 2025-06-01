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

app.use(cors({
  origin: "http://localhost:5173",
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

app.use('/api/user', User_RegisterRouter)
app.use('/api/auth', User_LoginRouter)
app.use('/api/prescription', PrescriptionRouter)
app.use('/api/payment',financeRouter)
app.use('/api/reports', reportRouter)

// Define frontend build path
const frontendBuildPath = path.join(__dirname, "../front_end/dist");
const indexHtmlPath = path.join(frontendBuildPath, "index.html");

console.log("Frontend build path:", frontendBuildPath);
console.log("Index.html path:", indexHtmlPath);

// Check if we're in production and the frontend build exists
if (process.env.NODE_ENV === "production") {
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
        status: "api-only"
      });
    });
  }
}

app.listen(PORT, () => { 
  console.log(`Server is running on port ${PORT}`);
  dbconnect();
});  