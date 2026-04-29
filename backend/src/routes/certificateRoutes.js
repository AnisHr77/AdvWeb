import { Router } from 'express';
import {
  verifyCertificate,
  getCertificates,
  batchGenerateCertificates,
  downloadCertificate,
  deleteCertificate,
} from '../controllers/certificateController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// ── Public ──
router.get('/verify', verifyCertificate);

// ── Admin ──
router.get('/',             protect, getCertificates);
router.post('/batch',       protect, batchGenerateCertificates);
router.get('/:id/download', protect, downloadCertificate);
router.delete('/:id',       protect, deleteCertificate);

export default router;
