import express from 'express';
import {
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
  createNotification,
  deleteNotification
} from '../controllers/NotificationController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes are protected with authMiddleware
router.use(authMiddleware);

// Get user's notifications
router.get('/', getUserNotifications);

// Get unread notification count
router.get('/unread-count', getUnreadCount);

// Mark a notification as read
router.patch('/:id/read', markAsRead);

// Mark all notifications as read
router.patch('/mark-all-read', markAllAsRead);

// Create a new notification
router.post('/', createNotification);

// Delete a notification
router.delete('/:id', deleteNotification);

export default router; 