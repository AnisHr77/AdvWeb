import { Router } from 'express';
import {
  getSessions,
  createSession,
  updateSession,
  deleteSession,
} from '../controllers/sessionController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// ── Public ──
router.get('/', getSessions);

// ── Admin ──
router.post('/',       protect, createSession);
router.patch('/:id',   protect, updateSession);
router.delete('/:id',  protect, deleteSession);

export default router;
