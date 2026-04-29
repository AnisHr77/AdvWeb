import { Router } from 'express';
import {
  createSubmission,
  saveDraft,
  trackSubmission,
  getSubmissions,
  getSubmissionById,
  updateSubmissionStatus,
  deleteSubmission,
} from '../controllers/submissionController.js';
import { protect } from '../middleware/auth.js';
import { uploadPaper } from '../middleware/upload.js';

const router = Router();

// ── Public ──
router.post('/',        uploadPaper.single('file'), createSubmission);
router.post('/draft',   uploadPaper.single('file'), saveDraft);
router.get('/track',    trackSubmission);

// ── Admin ──
router.get('/',              protect, getSubmissions);
router.get('/:id',           protect, getSubmissionById);
router.patch('/:id/status',  protect, updateSubmissionStatus);
router.delete('/:id',        protect, deleteSubmission);

export default router;
