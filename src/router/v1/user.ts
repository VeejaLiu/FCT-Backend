import express from 'express';
import { Logger } from '../../lib/logger';
import { registerUser } from '../../general/user/register';
import { loginUser } from '../../general/user/login';
import { verifyToken } from '../../lib/token/verifyToken';
import { logoutUser } from '../../general/user/logout';
import { getSecretKey } from '../../general/user/get-secret-key';
import { refreshSecretKey } from '../../general/user/refresh-secret-key';

const router = express.Router();

const logger = new Logger(__filename);

/**
 * User registration
 */
router.post('/register', async (req: any, res: any) => {
    const { username, email, password } = req.body;
    const result = await registerUser({
        username: username,
        email: email,
        password: password,
    });
    res.status(200).send(result);
});

/**
 * User login
 */
router.post('/login', async (req: any, res: any) => {
    const { username, password } = req.body;
    const result = await loginUser({
        username: username,
        password: password,
    });
    res.status(200).send(result);
});

/**
 * Verify user token
 */
router.post('/verify-token', verifyToken, async (req: any, res: any) => {
    res.status(200).send({ success: true, message: 'Token is valid' });
});

/**
 * User logout
 */
router.post('/logout', verifyToken, async (req: any, res: any) => {
    const { userId } = req.user;
    const result = await logoutUser({
        userId: userId,
    });
    res.status(200).send(result);
});

/**
 * Get user's secret key
 */
router.get('/secret', verifyToken, async (req: any, res: any) => {
    const { userId } = req.user;
    const result = await getSecretKey({
        userId: userId,
    });
    res.status(200).send(result);
});

/**
 * Refresh user's secret key
 */
router.post('/secret/refresh', verifyToken, async (req: any, res: any) => {
    const { userId } = req.user;
    const result = await refreshSecretKey({
        userId: userId,
    });
    res.status(200).send(result);
});

export default router;
