import express from 'express';
import { Logger } from '../../lib/logger';
import { bulkUpdatePlayer } from '../../general/player/bulk-update-player';
import { doRawInsert, doRawQuery } from '../../models';
import { getAllPlayers } from '../../general/player/get-all-players';
import { getPlayerCount } from '../../general/player/get-player-count';
import { getAllPlayerTrends } from '../../general/player/get-all-player-trends';

const router = express.Router();

const logger = new Logger(__filename);

/**
 * Get all players
 */
router.get('', async (req: any, res) => {
    const result = await getAllPlayers();
    res.send(result);
});

/**
 * Get player count
 */
router.get('/count', async (req: any, res) => {
    const count = await getPlayerCount();
    res.send(count);
});

/**
 * Get player trends
 */
router.get('/trends', async (req: any, res) => {
    const result = await getAllPlayerTrends();
    res.send(result);
});

/**
 * Create or update player
 */
router.post('/single/:playerID', async (req: any, res) => {
    try {
        const playerID = req.params.playerID;
        logger.info(`[API_LOGS][/player] req.body=${JSON.stringify(req.body)}`);
        const { saveUID, currentDate, overallrating, potential } = req.body;

        logger.info(
            `[API_LOGS][/player] playerID=${playerID}, saveUID=${saveUID}, currentDate=${currentDate}, overallrating=${overallrating}, potential=${potential}`,
        );

        if (!playerID || !overallrating || !potential) {
            res.status(400).send('Bad Request');
            return;
        }

        // query first
        const queryRes: any[] = await doRawQuery(`SELECT * FROM player WHERE player_id = ${playerID} limit 1`);
        if (queryRes.length === 0) {
            // insert
            const result = await doRawInsert(
                `INSERT INTO player (player_id, overallrating, potential)
                 VALUES (${playerID}, ${overallrating}, ${potential})`,
            );
            logger.info(
                `[API_LOGS][/player] Created new player: playerID=${playerID}, overallrating=${overallrating}, potential=${potential}`,
            );
            return res.send({
                playerID: playerID,
                message: 'Created successfully',
            });
        } else {
            // update
            const result = await doRawQuery(
                `UPDATE player
                 SET overallrating=${overallrating},
                     potential=${potential}
                 WHERE player_id = ${playerID}`,
            );
            if (
                parseInt(queryRes[0].overallrating) !== parseInt(overallrating) ||
                parseInt(queryRes[0].potential) !== parseInt(potential)
            ) {
                logger.info(
                    `[API_LOGS][/player] Updated player: playerID=${playerID}, overallrating=${queryRes[0].overallrating}->${overallrating}, potential=${queryRes[0].potential}->${potential}`,
                );
            }
            return res.send({
                playerID: playerID,
                message: 'Updated successfully',
            });
        }
    } catch (e) {
        logger.error(`[API_LOGS][/player] ${e}`);
        res.status(500).send('Internal Server Error');
    }
});

/**
 * Create or update players in bulk
 */
router.post('/bulk', async (req: any, res) => {
    res.send({
        message: 'Got the message',
    });
    await bulkUpdatePlayer(req.body);
});

export default router;
