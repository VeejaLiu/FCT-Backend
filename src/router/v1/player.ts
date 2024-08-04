import express from 'express';
import { Logger } from '../../lib/logger';
import { sequelize } from '../../models/db-config';
import { QueryTypes } from 'sequelize';

const router = express.Router();

const logger = new Logger(__filename);

/**
 * Get all players
 */
router.get('', async (req: any, res) => {
    try {
        const result = await sequelize.query('SELECT * FROM player', { type: QueryTypes.SELECT });
        logger.info(`[API_LOGS][/player] ${JSON.stringify(result)}`);
        res.send(result);
    } catch (e) {
        logger.error(`[API_LOGS][/player] ${e}`);
        res.status(500).send('Internal Server Error');
    }
});

/**
 * Create or update player
 */
router.post('/:playerId', async (req: any, res) => {
    try {
        const playerId = req.params.playerId;
        const { saveUID, currentDate, overallrating, potential } = req.body;

        logger.info(
            `[API_LOGS][/player] playerId=${playerId}, saveUID=${saveUID}, currentDate=${currentDate}, overallrating=${overallrating}, potential=${potential}`,
        );

        if (!playerId || !overallrating || !potential || !saveUID) {
            res.status(400).send('Bad Request');
            return;
        }

        // query first
        const queryRes: any[] = await sequelize.query(
            `SELECT *
             FROM player
             WHERE player_id = ${playerId}
               and save_id = ${saveUID}
             limit 1`,
            {
                type: QueryTypes.SELECT,
            },
        );
        if (queryRes.length === 0) {
            // insert
            const result = await sequelize.query(
                `INSERT INTO player (player_id, save_id, overallrating,
                                     potential)
                 VALUES (${playerId}, ${saveUID}, ${overallrating},
                         ${potential})`,
                { type: QueryTypes.INSERT },
            );
            logger.info(
                `[API_LOGS][/player] Created new player: playerId=${playerId}, overallrating=${overallrating}, potential=${potential}`,
            );
            return res.send({
                playerId: playerId,
                message: 'Created successfully',
            });
        } else {
            // update
            const result = await sequelize.query(
                `UPDATE player
                 SET overallrating=${overallrating},
                     potential=${potential}
                 WHERE player_id = ${playerId}
                   and save_id = ${saveUID}`,
                { type: QueryTypes.UPDATE },
            );
            logger.info(
                `[API_LOGS][/player] Updated player: playerid=${playerId}, overallrating=${overallrating}->${queryRes[0].overallrating}, potential=${potential}->${queryRes[0].potential}`,
            );
            return res.send({
                playerId: playerId,
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
        const players = req.body;

        logger.info(`[API_LOGS][/player/bulk] players=${JSON.stringify(players)}`);

        if (!players || players.length === 0) {
            res.status(400).send('Bad Request');
            return;
        }

        for (let player of players) {
            const {
                playerId,
                date,
                overallrating,
                potential,
                birthdate,
                nationality,
                height,
                weight,
                preferredfoot,
                preferredposition1,
                preferredposition2,
                preferredposition3,
                preferredposition4,
                skillmoves,
                weakfootabilitytypecode,
                attackingworkrate,
                defensiveworkrate,
                // -- pace
                acceleration,
                sprintspeed,
                // -- attacking
                positioning,
                finishing,
                shotpower,
                longshots,
                volleys,
                penalties,
                // -- passing
                vision,
                crossing,
                freekickaccuracy,
                shortpassing,
                longpassing,
                curve,
                agility,
                balance,
                reactions,
                ballcontrol,
                dribbling,
                composure,
                interceptions,
                headingaccuracy,
                defensiveawareness,
                standingtackle,
                slidingtackle,
                jumping,
                stamina,
                strength,
                aggression,
            } = player;
        }

        res.send({
            message: 'Created/Updated successfully',
        });
    } catch (e) {
        logger.error(`[API_LOGS][/player/bulk] ${e}`);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
