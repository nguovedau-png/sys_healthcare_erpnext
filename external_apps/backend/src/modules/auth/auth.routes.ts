import { Router } from 'express';
import { AuthController } from './auth.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import passport from '../../config/passport';

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, fullName]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               fullName:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered
 *       400:
 *         description: Error
 */
router.post('/register', AuthController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               code:
 *                  type: string
 *                  description: 2FA Code if enabled
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */
router.post('/login', AuthController.login);

router.post('/refresh-token', AuthController.refreshToken);

// Social Login
router.get('/google', passport.authenticate('google', { session: false }));
router.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login?error=auth_failed' }),
    AuthController.socialCallback
);

router.get('/facebook', passport.authenticate('facebook', { session: false }));
router.get('/facebook/callback',
    passport.authenticate('facebook', { session: false, failureRedirect: '/login?error=auth_failed' }),
    AuthController.socialCallback
);

// TikTok (Scope might need adjustment based on app permissions)
router.get('/tiktok', passport.authenticate('tiktok', { session: false }));
router.get('/tiktok/callback',
    passport.authenticate('tiktok', { session: false, failureRedirect: '/login?error=auth_failed' }),
    AuthController.socialCallback
);

router.post('/2fa/setup', authenticate, AuthController.setup2FA);
router.post('/2fa/verify', authenticate, AuthController.verify2FA);

router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password', AuthController.resetPassword);
router.post('/change-password', authenticate, AuthController.changePassword);

router.post('/push-token', authenticate, AuthController.registerPushToken);

export default router;
