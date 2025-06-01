import express from 'express';
import { generateInventoryReport, generateSalesReport, generatePatientReport } from '../controllers/reportController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/inventory', authMiddleware, generateInventoryReport);
router.get('/sales', authMiddleware, generateSalesReport);
router.get('/patient', authMiddleware, generatePatientReport);

export default router; 