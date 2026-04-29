import { Router } from 'express';
import {
  createRegistration,
  getRegistrations,
  adminCreateRegistration,
  updateRegistration,
  deleteRegistration,
  exportRegistrations,
  resendConfirmation,
} from '../controllers/registrationController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// ── Public ──
router.post('/', createRegistration);

// ── Admin ──
router.get('/',              protect, getRegistrations);
router.post('/admin',        protect, adminCreateRegistration);
router.get('/export',        protect, exportRegistrations);
router.patch('/:id',         protect, updateRegistration);
router.delete('/:id',        protect, deleteRegistration);
router.post('/:id/resend',   protect, resendConfirmation);

export default router;
