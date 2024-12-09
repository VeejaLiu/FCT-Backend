import express from 'express';
import { verifyTokenMiddleware } from '../../lib/token/verifyTokenMiddleware';
import { query } from 'express-validator';
import { validateErrorCheck } from '../../lib/express-validator/express-validator-middleware';
import { getUserNotifications } from '../../general/notification/get-user-notifications';

const router = express.Router();

/**
 * Get all notifications
 */
router.get(
    '/',
    verifyTokenMiddleware,
    query('gameVersion')
        .isInt({ min: 24, max: 25 }) // only 24/25
        .withMessage('Game version must be 24 or 25'),
    validateErrorCheck,
    async (req: any, res) => {
        const { userId } = req.user;
        const { gameVersion } = req.query;
        const result = await getUserNotifications({
            userId: userId,
            gameVersion: parseInt(gameVersion),
        });
        res.send(result);
    },
);

export default router;
