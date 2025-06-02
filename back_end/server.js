import express from 'express';
import cors from 'cors';
import dbconnect from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 5000;
import cookieParser from 'cookie-parser';

import User_RegisterRouter from './routes/userRoutes.js';
import User_LoginRouter from './routes/authRoutes.js';
import PrescriptionRouter from './routes/prescriptionRoutes.js';
import financeRouter from './routes/Financial.js';
import reportRouter from './routes/reportRoutes.js';

const app = express();

// Configure CORS based on environment
const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? ['https://hosp-pharm-2.onrender.com', 'https://hosp-pharm-2.com']
  : ['http://localhost:5173'];

console.log('Allowed Origins:', allowedOrigins);
console.log('Current Environment:', process.env.NODE_ENV);

app.use(cors({
  origin: function(origin, callback) {
    console.log('Request origin:', origin);
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked request from:', origin);
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

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'API is running',
    environment: process.env.NODE_ENV,
    port: PORT
  });
});

app.use('/api/user', User_RegisterRouter);
app.use('/api/auth', User_LoginRouter);
app.use('/api/prescription', PrescriptionRouter);
app.use('/api/payment', financeRouter);
app.use('/api/reports', reportRouter);

// Add a health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', environment: process.env.NODE_ENV });
});

app.listen(PORT, () => { 
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`API URL: http://localhost:${PORT}`);
  dbconnect();
});  