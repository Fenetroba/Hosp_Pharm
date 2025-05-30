import express from 'express'
import { 
  register, 
  login, 
  getProfile, 
  updateProfile, 
  getAllUsers, 
  deleteUser,
  getDoctorsCount,
  getPharmacistsCount,
  getPatientsCount
} from '../controllers/UserController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

// Auth routes
router.post('/register', register)
router.post('/login', login)

// Protected routes
router.get('/profile', authMiddleware, getProfile)
router.put('/profile', authMiddleware, updateProfile)

// Admin routes
router.get('/all', authMiddleware, getAllUsers)
router.delete('/:id', authMiddleware, deleteUser)

// Statistics routes
router.get('/doctors/count', authMiddleware, getDoctorsCount)
router.get('/pharmacists/count', authMiddleware, getPharmacistsCount)
router.get('/patients/count', authMiddleware, getPatientsCount)

export default router