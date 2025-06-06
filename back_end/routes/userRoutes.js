import express from 'express'
import {deleteUser, register, searchUserByName, SeeAllUsers, updateUser,getByRole} from '../controllers/adminController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

// Register a new user
router.post('/register', register)
router.get('/all_users', SeeAllUsers)
router.get('/get_singl_user', searchUserByName)
router.get('/get_User_role', getByRole)
router.patch('/update_user/:id',authMiddleware, updateUser)
router.delete('/delete_user/:id', deleteUser)


export default router