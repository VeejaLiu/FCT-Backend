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
router.post('/single/:playerId', async (req: any, res) => {
    try {
        const playerId = req.params.playerId;
        logger.info(`[API_LOGS][/player] req.body=${JSON.stringify(req.body)}`);
        const { saveUID, currentDate, overallrating, potential } = req.body;

        logger.info(
            `[API_LOGS][/player] playerId=${playerId}, saveUID=${saveUID}, currentDate=${currentDate}, overallrating=${overallrating}, potential=${potential}`,
        );

        if (!playerId || !overallrating || !potential) {
            res.status(400).send('Bad Request');
            return;
        }

        // query first
        const queryRes: any[] = await sequelize.query(
            `SELECT *
             FROM player
             WHERE player_id = ${playerId} limit 1`,
            {
                type: QueryTypes.SELECT,
            },
        );
        if (queryRes.length === 0) {
            // insert
            const result = await sequelize.query(
                `INSERT INTO player (player_id, overallrating,
                                     potential)
                 VALUES (${playerId}, ${overallrating},
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
                 WHERE player_id = ${playerId}`,
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
        res.send({
            message: 'Got the message',
        });
        const players = req.body;

        // logger.info(`[API_LOGS][/player/bulk] players=${JSON.stringify(players)}`);
        logger.info(`[API_LOGS][/player/bulk] players.length=${players.length}`);
        if (!players || players.length === 0) {
            return;
        }

        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            const {
                playerid: playerId,
                playername,
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
            // logger.info(
            //     `[API_LOGS][/player/bulk] [i=${i}]` +
            //         `playerId=${playerId}, ` +
            //         `playername=${playername}, ` +
            //         `date=${date}, ` +
            //         `overallrating=${overallrating}, ` +
            //         `potential=${potential}, ` +
            //         `birthdate=${birthdate}`,
            // );
            // query first
            const queryRes: any[] = await sequelize.query(
                `SELECT *
                 FROM player
                 WHERE player_id = ${playerId} limit 1`,
                { type: QueryTypes.SELECT },
            );
            if (queryRes.length === 0) {
                // insert
                const result = await sequelize.query(
                    `
                        INSERT INTO player (player_id, player_name, overallrating, potential,
                                            birthdate, nationality, height, weight,
                                            preferredfoot,
                                            preferredposition1, preferredposition2,
                                            preferredposition3, preferredposition4,
                                            skillmoves, weakfootabilitytypecode, attackingworkrate, defensiveworkrate,
                                            acceleration, sprintspeed,
                                            positioning, finishing, shotpower, longshots, volleys, penalties,
                                            vision, crossing, freekickaccuracy, shortpassing, longpassing, curve,
                                            agility, balance, reactions, ballcontrol, dribbling, composure,
                                            interceptions, headingaccuracy, defensiveawareness, standingtackle,
                                            slidingtackle, jumping, stamina, strength, aggression)

                        VALUES (${playerId}, '${playername}', ${overallrating}, ${potential},
                                '${birthdate}', '${nationality}', ${height}, ${weight},
                                '${preferredfoot}',
                                ${preferredposition1}, ${preferredposition2},
                                ${preferredposition3}, ${preferredposition4},
                                ${skillmoves}, ${weakfootabilitytypecode}, ${attackingworkrate}, ${defensiveworkrate},
                                ${acceleration}, ${sprintspeed},
                                ${positioning}, ${finishing}, ${shotpower}, ${longshots}, ${volleys}, ${penalties},
                                ${vision}, ${crossing}, ${freekickaccuracy}, ${shortpassing}, ${longpassing}, ${curve},
                                ${agility}, ${balance}, ${reactions}, ${ballcontrol}, ${dribbling}, ${composure},
                                ${interceptions}, ${headingaccuracy}, ${defensiveawareness}, ${standingtackle},
                                ${slidingtackle}, ${jumping}, ${stamina}, ${strength}, ${aggression})`,
                    { type: QueryTypes.INSERT },
                );
                // logger.info(`[API_LOGS][/player/bulk] Created new player: playerId=${playerId}`);
            } else {
                // update
                if (+queryRes[0].overallrating !== +overallrating || +queryRes[0].potential !== +potential) {
                    logger.info(
                        `[API_LOGS][/player/bulk] [i=${i}]` +
                            `playerId=${playerId}, playerName=${playername}, ` +
                            `overallRating=${queryRes[0].overallrating}->${overallrating}, ` +
                            `potential=${queryRes[0].potential}->${potential}`,
                    );
                }
                const result = await sequelize.query(
                    `
                        UPDATE player
                        SET player_name='${playername}',
                            overallrating=${overallrating},
                            potential=${potential},
                            birthdate='${birthdate}',
                            nationality='${nationality}',
                            height=${height},
                            weight=${weight},
                            preferredfoot='${preferredfoot}',
                            preferredposition1=${preferredposition1},
                            preferredposition2=${preferredposition2},
                            preferredposition3=${preferredposition3},
                            preferredposition4=${preferredposition4},
                            skillmoves=${skillmoves},
                            weakfootabilitytypecode=${weakfootabilitytypecode},
                            attackingworkrate=${attackingworkrate},
                            defensiveworkrate=${defensiveworkrate},
                            acceleration=${acceleration},
                            sprintspeed=${sprintspeed},
                            positioning=${positioning},
                            finishing=${finishing},
                            shotpower=${shotpower},
                            longshots=${longshots},
                            volleys=${volleys},
                            penalties=${penalties},
                            vision=${vision},
                            crossing=${crossing},
                            freekickaccuracy=${freekickaccuracy},
                            shortpassing=${shortpassing},
                            longpassing=${longpassing},
                            curve=${curve},
                            agility=${agility},
                            balance=${balance},
                            reactions=${reactions},
                            ballcontrol=${ballcontrol},
                            dribbling=${dribbling},
                            composure=${composure},
                            interceptions=${interceptions},
                            headingaccuracy=${headingaccuracy},
                            defensiveawareness=${defensiveawareness},
                            standingtackle=${standingtackle},
                            slidingtackle=${slidingtackle},
                            jumping=${jumping},
                            stamina=${stamina},
                            strength=${strength},
                            aggression=${aggression}
                        WHERE player_id = ${playerId}`,
                    { type: QueryTypes.UPDATE },
                );
                // logger.info(`[API_LOGS][/player/bulk] Updated player: playerId=${playerId}`);
            }
        }
    } catch (e) {
        logger.error(`[API_LOGS][/player/bulk] ${e}`);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
