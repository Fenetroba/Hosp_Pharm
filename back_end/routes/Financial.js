import { CreateRelatedFinance, getDailyFinance } from "../controllers/Financial.js";
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.post('/finance', authMiddleware, CreateRelatedFinance);
router.get('/finance/daily/:date', authMiddleware, getDailyFinance);

export default router;