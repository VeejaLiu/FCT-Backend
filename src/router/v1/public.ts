import express from 'express';
import { query } from 'express-validator';
import { validateErrorCheck } from '../../lib/express-validator/express-validator-middleware';
import { getDailyNewUsersCount } from '../../general/public/get-daily-new-users-count';
import { getAllUsersCount } from '../../general/public/get-all-users-count';

const router = express.Router();

/**
 * Get daily new users count
 */
router.get(
    '/daily-new-users-count',
    query('pastDays').isInt({ min: 1, max: 90 }).withMessage('Past days must be between 1 and 90'),
    validateErrorCheck,
    async (req: any, res) => {
        const { pastDays } = req.query;
        const result = await getDailyNewUsersCount({
            pastDays: parseInt(pastDays),
        });
        return res.json(result);
    },
);

/**
 * Get all registered user count
 */
router.get('/users-count', async (req: any, res) => {
    const result: number = await getAllUsersCount();
    return res.json({ count: result });
});

export default router;
