import express from 'express';
import { verifyTokenMiddleware } from '../../lib/token/verifyTokenMiddleware';
import { body, query } from 'express-validator';
import { validateErrorCheck } from '../../lib/express-validator/express-validator-middleware';
import { getUserNotifications } from '../../general/notification/get-user-notifications';
import { markNotificationAsRead } from '../../general/notification/mark-notification-as-read';
import { markAllNotificationAsRead } from '../../general/notification/mark-all-notification-as-read';

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

/**
 * Mark notification as read
 */
router.post(
    '/mark-read',
    verifyTokenMiddleware,
    body('id').isInt().withMessage('Notification ID must be an integer'),
    validateErrorCheck,
    async (req: any, res) => {
        const { userId } = req.user;
        const { id } = req.body;
        const result = await markNotificationAsRead({
            userId: userId,
            id: id,
        });
        res.send(result);
    },
);

/**
 * Mark all notifications as read
 */
router.post('/mark-all-read', verifyTokenMiddleware, async (req: any, res) => {
    const { userId } = req.user;
    const result = await markAllNotificationAsRead({
        userId: userId,
    });
    res.send(result);
});
export default router;
