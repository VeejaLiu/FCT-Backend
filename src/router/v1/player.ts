import express from 'express';
import { Logger } from '../../lib/logger';
import { sequelize } from '../../models/db-config';
import { QueryTypes } from 'sequelize';
import { bulkUpdatePlayer } from '../../general/player/bulk-update-player';
import { doRawInsert, doRawQuery } from '../../models';

const router = express.Router();

const logger = new Logger(__filename);

const PLAYER_PRIMARY_POS_NAME = {
    0: 'GK',
    1: 'SW',
    2: 'RWB',
    3: 'RB',
    4: 'RCB',
    5: 'CB',
    6: 'LCB',
    7: 'LB',
    8: 'LWB',
    9: 'RDM',
    10: 'CDM',
    11: 'LDM',
    12: 'RM',
    13: 'RCM',
    14: 'CM',
    15: 'LCM',
    16: 'LM',
    17: 'RAM',
    18: 'CAM',
    19: 'LAM',
    20: 'RF',
    21: 'CF',
    22: 'LF',
    23: 'RW',
    24: 'RS',
    25: 'ST',
    26: 'LS',
    27: 'LW',
};

const PLAYER_PRIMARY_POS_TYPE = {
    0: 'GK',
    1: 'DEF',
    2: 'DEF',
    3: 'DEF',
    4: 'DEF',
    5: 'DEF',
    6: 'DEF',
    7: 'DEF',
    8: 'DEF',
    9: 'MID',
    10: 'MID',
    11: 'MID',
    12: 'MID',
    13: 'MID',
    14: 'MID',
    15: 'MID',
    16: 'MID',
    17: 'MID',
    18: 'MID',
    19: 'MID',
    20: 'FOR',
    21: 'FOR',
    22: 'FOR',
    23: 'FOR',
    24: 'FOR',
    25: 'FOR',
    26: 'FOR',
    27: 'FOR',
};

/**
 * Get all players
 */
router.get('', async (req: any, res) => {
    try {
        const sqlRes: any[] = await sequelize.query('SELECT * FROM player', { type: QueryTypes.SELECT, raw: true });
        logger.info(`[API_LOGS][/player] ${sqlRes.length} players found`);

        const result = [];
        for (let i = 0; i < sqlRes.length; i++) {
            const player = sqlRes[i];
            const birthdate = player.birthdate;
            result.push({
                playerID: player.player_id,
                playerName: player.player_name,
                overallRating: player.overallrating,
                potential: player.potential,
                age: player.age,
                birthdate: player.birthdate,
                positionType: PLAYER_PRIMARY_POS_TYPE[player.preferredposition1],
                position1: PLAYER_PRIMARY_POS_NAME[player.preferredposition1],
                position2: PLAYER_PRIMARY_POS_NAME[player.preferredposition2],
                position3: PLAYER_PRIMARY_POS_NAME[player.preferredposition3],
                position4: PLAYER_PRIMARY_POS_NAME[player.preferredposition4],
            });
        }
        res.send(result);
    } catch (e) {
        logger.error(`[API_LOGS][/player] ${e}`);
        res.status(500).send('Internal Server Error');
    }
});

/**
 * Get player count
 */
router.get('/count', async (req: any, res) => {
    try {
        const sqlRes: any[] = await doRawQuery(`SELECT COUNT(*) as c FROM player where is_archived = 0`);
        const count = sqlRes[0].c;
        logger.info(`[API_LOGS][/player/count] ${count} unarchived players found`);
        res.send(count);
    } catch (e) {
        logger.error(`[API_LOGS][/player/count] ${e}`);
        res.status(500).send('Internal Server Error');
    }
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
    try {
        res.send({
            message: 'Got the message',
        });
        const players = req.body;
        logger.info(`[API_LOGS][/player/bulk] players.length=${players.length}`);
        if (!players || players.length === 0) {
            return;
        }
        await bulkUpdatePlayer(players);
        logger.info(`[API_LOGS][/player/bulk] Done`);
    } catch (e) {
        logger.error(`[API_LOGS][/player/bulk] ${e}`);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
