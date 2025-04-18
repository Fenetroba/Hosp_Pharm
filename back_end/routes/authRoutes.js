import express from 'express';
import {  Login, logout } from '../controllers/authsController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();
// Register a new user

router.post('/login', Login);
router.post('/logout', logout);
router.get("/check-auth",authMiddleware, (req, res) => {
     const user = req.user;
     res.status(200).json({
       success: true,
       message: "Authenticated user!",
       user,
     });
   });
export default router;