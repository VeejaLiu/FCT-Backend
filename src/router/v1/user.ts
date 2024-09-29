import express from 'express';
import { Logger } from '../../lib/logger';
import { registerUser } from '../../general/user/register';
import { loginUser } from '../../general/user/login';
import { verifyTokenMiddleware } from '../../lib/token/verifyTokenMiddleware';
import { logoutUser } from '../../general/user/logout';
import { getSecretKey } from '../../general/user/get-secret-key';
import { refreshSecretKey } from '../../general/user/refresh-secret-key';
import { env } from '../../env';
import { getUserSetting } from '../../general/user/get-user-setting';
import { updateUserSetting } from '../../general/user/update-user-setting';

const router = express.Router();

const logger = new Logger(__filename);

/**
 * User registration
 */
router.post('/register', async (req: any, res: any) => {
    const { username, email, password, rc } = req.body;
    // if (env.app.env === 'production') {
    //     if (!rc || rc !== 'P7382Pq0XqFmwgIlBFkqyfDisKLK') {
    //         res.status(400).send({ success: false, message: 'Invalid registerSecret' });
    //         return;
    //     }
    // }
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
router.post('/verify-token', verifyTokenMiddleware, async (req: any, res: any) => {
    res.status(200).send({ success: true, message: 'Token is valid' });
});

/**
 * User logout
 */
router.post('/logout', verifyTokenMiddleware, async (req: any, res: any) => {
    const { userId } = req.user;
    const result = await logoutUser({
        userId: userId,
    });
    res.status(200).send(result);
});

/**
 * Get user's secret key
 */
router.get('/secret', verifyTokenMiddleware, async (req: any, res: any) => {
    const { userId } = req.user;
    const result = await getSecretKey({
        userId: userId,
    });
    res.status(200).send(result);
});

/**
 * Refresh user's secret key
 */
router.post('/secret/refresh', verifyTokenMiddleware, async (req: any, res: any) => {
    const { userId } = req.user;
    const result = await refreshSecretKey({
        userId: userId,
    });
    res.status(200).send(result);
});

/**
 * Get user setting
 */
router.get('/setting', verifyTokenMiddleware, async (req: any, res: any) => {
    const { userId } = req.user;
    const result = await getUserSetting({
        userId: userId,
    });
    res.status(200).send(result);
});

/**
 * Update user setting
 */
router.post('/setting', verifyTokenMiddleware, async (req: any, res: any) => {
    const { userId } = req.user;
    const { category, subItem, value } = req.body;
    const result = await updateUserSetting({
        userId: userId,
        category: category,
        subItem: subItem,
        value: value,
    });
    res.status(200).send(result);
});

export default router;
