import express from 'express';
import cors from 'cors';
import dbconnect from './config/db.js';
import dotenv from 'dotenv';
const PORT = process.env.PORT || 5000;
import cookieParser from 'cookie-parser';



import User_RegisterRouter from './routes/userRoutes.js';
import User_LoginRouter from './routes/authRoutes.js';
import PrescriptionRouter from './routes/prescriptionRoutes.js';
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




app.listen(PORT, () => { 
  console.log(`Server is running on port ${PORT}`);
  dbconnect();


});  