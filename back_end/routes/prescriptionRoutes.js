import express from 'express'
import { CreatePrescription, DeletePrescription, fetch_byPatient_name, GetAllPrescriptions, UpdatePrescription } from '../controllers/prescriptionController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router =express.Router();

router.post('/create_prescription',authMiddleware,CreatePrescription) 
router.get('/all_prescription',authMiddleware,GetAllPrescriptions)
router.get('/single_prescription/:patientName',authMiddleware,fetch_byPatient_name)
router.patch('/update_prescription/:id',authMiddleware,UpdatePrescription)
router.delete('/delete_prescription/:id',authMiddleware,DeletePrescription)

export default router


