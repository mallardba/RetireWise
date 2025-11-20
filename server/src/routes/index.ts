import { Router } from 'express';
import userRoutes from './user.routes.js';
import contributionRoutes from './contribution.routes.js';
import projectionRoutes from './projection.routes.js';
import { API_ROUTES } from '../constants/index.js';

const router = Router();

router.use(API_ROUTES.USER, userRoutes);
router.use(API_ROUTES.CONTRIBUTION, contributionRoutes);
router.use(API_ROUTES.PROJECTION, projectionRoutes);

export default router;
