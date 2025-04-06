import express from 'express';
import { getUser, Login, logout } from '../controllers/authsController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();
// Register a new user

router.post('/login', Login);
// router.get('/admin', authMiddleware, roleMiddleware('admin'));
 router.get('/user', authMiddleware, getUser);  
router.post('/logout', authMiddleware, logout);
export default router;