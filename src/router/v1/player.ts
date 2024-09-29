import express from 'express';
import { bulkUpdatePlayer } from '../../general/player/bulk-update-player';
import { getAllPlayers } from '../../general/player/get-all-players';
import { getPlayerCount } from '../../general/player/get-player-count';
import { getAllPlayerTrends } from '../../general/player/get-all-player-trends';
import { verifyTokenMiddleware } from '../../lib/token/verifyTokenMiddleware';
import { verifySecretKey } from '../../lib/token/verifySecretKey';
import { getPlayerDetail } from '../../general/player/get-player-detail';

const router = express.Router();

/**
 * Get all players
 */
router.get('', verifyTokenMiddleware, async (req: any, res) => {
    const { userId } = req.user;
    const { gameVersion } = req.query;
    const result = await getAllPlayers({
        userId: userId,
        gameVersion: parseInt(gameVersion),
    });
    res.send(result);
});

/**
 * Get player details by id
 */
router.get('/detail/:playerID', verifyTokenMiddleware, async (req: any, res) => {
    const { userId } = req.user;
    const { playerID } = req.params;
    const { gameVersion } = req.query;
    const result = await getPlayerDetail({
        userId,
        gameVersion: parseInt(gameVersion),
        playerID: parseInt(playerID),
    });
    res.send(result);
});

/**
 * Get player count
 */
router.get('/count', verifyTokenMiddleware, async (req: any, res) => {
    const { userId } = req.user;
    const { gameVersion } = req.query;
    const count = await getPlayerCount({
        userId: userId,
        gameVersion: parseInt(gameVersion),
    });
    res.send(count);
});

/**
 * Get player trends
 */
router.get('/trends', verifyTokenMiddleware, async (req: any, res) => {
    const { userId } = req.user;
    const { gameVersion } = req.query;
    const result = await getAllPlayerTrends({
        userId: userId,
        gameVersion: parseInt(gameVersion),
    });
    res.send(result);
});

/**
 * Create or update players in bulk
 */
router.post('/bulk', verifySecretKey, async (req: any, res) => {
    res.send({ message: 'Got the message' });
    const { userId } = req.user;
    const { gameVersion } = req.query;
    await bulkUpdatePlayer({
        userId: userId,
        gameVersion: parseInt(gameVersion),
        players: req.body,
    });
});

export default router;
