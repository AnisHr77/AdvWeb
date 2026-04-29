import { Router } from 'express';
import authRoutes         from './authRoutes.js';
import registrationRoutes from './registrationRoutes.js';
import submissionRoutes   from './submissionRoutes.js';
import speakerRoutes      from './speakerRoutes.js';
import sessionRoutes      from './sessionRoutes.js';
import certificateRoutes  from './certificateRoutes.js';
import settingsRoutes     from './settingsRoutes.js';
import dashboardRoutes    from './dashboardRoutes.js';

const router = Router();

// Health check
router.get('/health', (_req, res) =>
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
);

// Auth
router.use('/auth',          authRoutes);

// Public resources
router.use('/registrations', registrationRoutes);
router.use('/submissions',   submissionRoutes);
router.use('/speakers',      speakerRoutes);
router.use('/sessions',      sessionRoutes);
router.use('/certificates',  certificateRoutes);

// Stats & committee (public + admin)
router.use('/',              dashboardRoutes);

// Admin-only resources (mounted under same paths, protected inside controllers)
router.use('/admin/registrations', registrationRoutes);
router.use('/admin/submissions',   submissionRoutes);
router.use('/admin/speakers',      speakerRoutes);
router.use('/admin/sessions',      sessionRoutes);
router.use('/admin/certificates',  certificateRoutes);
router.use('/admin/settings',      settingsRoutes);

export default router;
