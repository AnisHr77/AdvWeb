import { Router } from 'express';
import {
  getSpeakers,
  createSpeaker,
  updateSpeaker,
  updateSpeakerStatus,
  deleteSpeaker,
} from '../controllers/speakerController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// ── Public ──
router.get('/', getSpeakers);

// ── Admin ──
router.post('/',              protect, createSpeaker);
router.patch('/:id',          protect, updateSpeaker);
router.patch('/:id/status',   protect, updateSpeakerStatus);
router.delete('/:id',         protect, deleteSpeaker);

export default router;
