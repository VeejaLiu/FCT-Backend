import express from 'express';
import { Logger } from '../../lib/logger';
import { bulkUpdatePlayer } from '../../general/player/bulk-update-player';
import { getAllPlayers } from '../../general/player/get-all-players';
import { getPlayerCount } from '../../general/player/get-player-count';
import { getAllPlayerTrends } from '../../general/player/get-all-player-trends';
import { verifyToken } from '../../lib/token/verifyToken';
import { verifySecretKey } from '../../lib/token/verifySecretKey';

const router = express.Router();

const logger = new Logger(__filename);

/**
 * Get all players
 */
router.get('', verifyToken, async (req: any, res) => {
    const { userId } = req.user;
    const result = await getAllPlayers({ userId });
    res.send(result);
});

/**
 * Get player count
 */
router.get('/count', verifyToken, async (req: any, res) => {
    const { userId } = req.user;
    const count = await getPlayerCount({ userId });
    res.send(count);
});

/**
 * Get player trends
 */
router.get('/trends', verifyToken, async (req: any, res) => {
    const { userId } = req.user;
    const result = await getAllPlayerTrends({ userId });
    res.send(result);
});

/**
 * Create or update players in bulk
 */
router.post('/bulk', verifySecretKey, async (req: any, res) => {
    res.send({
        message: 'Got the message',
    });
    const { userId } = req.user;
    await bulkUpdatePlayer({
        userId: userId,
        players: req.body,
    });
});

export default router;
