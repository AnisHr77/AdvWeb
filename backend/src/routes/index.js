import { Router } from 'express';

const router = Router();

// Health check
router.get('/health', (_req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// TODO: Add your routes here
// import userRoutes from './userRoutes.js';
// router.use('/users', userRoutes);

export default router;
