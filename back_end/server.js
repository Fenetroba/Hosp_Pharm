import express from 'express';
import cors from 'cors';
import dbconnect from './config/db.js';
import dotenv from 'dotenv';
const PORT = process.env.PORT || 5000;
dotenv.config();
const app = express();
app.use(cors());  
app.use(express.json());


app.listen(PORT, () => { 
  console.log(`Server is running on port ${PORT}`);
  dbconnect();


});  