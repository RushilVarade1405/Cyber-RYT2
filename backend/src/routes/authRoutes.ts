import { Router } from 'express';
import { loginUser, getProfile } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/login', loginUser);
router.get('/profile', protect, getProfile);

export default router;