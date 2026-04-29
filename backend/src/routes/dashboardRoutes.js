import { Router } from 'express';
import { getDashboardStats, getPublicStats, getCommittee } from '../controllers/dashboardController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/admin/stats', protect, getDashboardStats);
router.get('/public/stats', getPublicStats);
router.get('/committee', getCommittee);

export default router;
