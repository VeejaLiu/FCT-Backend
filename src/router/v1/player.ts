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
                birthdate: player.birthdate,
            });
        }
        res.send(result);
    } catch (e) {
        logger.error(`[API_LOGS][/player] ${e}`);
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
        const queryRes: any[] = await sequelize.query(
            `SELECT *
             FROM player
             WHERE player_id = ${playerID} limit 1`,
            {
                type: QueryTypes.SELECT,
            },
        );
        if (queryRes.length === 0) {
            // insert
            const result = await sequelize.query(
                `INSERT INTO player (player_id, overallrating,
                                     potential)
                 VALUES (${playerID}, ${overallrating},
                         ${potential})`,
                { type: QueryTypes.INSERT },
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
            const result = await sequelize.query(
                `UPDATE player
                 SET overallrating=${overallrating},
                     potential=${potential}
                 WHERE player_id = ${playerID}`,
                { type: QueryTypes.UPDATE },
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

        // logger.info(`[API_LOGS][/player/bulk] players=${JSON.stringify(players)}`);
        logger.info(`[API_LOGS][/player/bulk] players.length=${players.length}`);
        if (!players || players.length === 0) {
            return;
        }

        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            const {
                // -- player
                playerID,
                playerName,
                currentDate,
                // overallrating,
                overallrating,
                potential,
                // -- personal
                birthdate,
                nationality,
                height,
                weight,
                // -- player details
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
                // -- dribbling
                agility,
                balance,
                reactions,
                ballcontrol,
                dribbling,
                composure,
                // -- defending
                interceptions,
                headingaccuracy,
                defensiveawareness,
                standingtackle,
                slidingtackle,
                // -- physical
                jumping,
                stamina,
                strength,
                aggression,
                // -- goalkeeping
                gkdiving,
                gkhandling,
                gkkicking,
                gkpositioning,
                gkreflexes,
            } = player;

            // convert currentDate to age, currentDate is in format 'yyyy-mm-dd'
            const [year, month, day] = currentDate.split('-');
            const cDate = new DateUtils(year, month, day);

            // logger.info(
            //     `[API_LOGS][/player/bulk] [i=${i}]` +
            //         `playerID=${playerID}, ` +
            //         `playerName=${playerName}, ` +
            //         `currentDate=${currentDate}, ` +
            //         `overallrating=${overallrating}, ` +
            //         `potential=${potential}, ` +
            //         `birthdate=${birthdate}`,
            // );
            // query first
            const queryRes: any[] = await sequelize.query(
                `SELECT *
                 FROM player
                 WHERE player_id = ${playerID} limit 1`,
                { type: QueryTypes.SELECT },
            );
            if (queryRes.length === 0) {
                // insert
                const insertSQL = `
                    INSERT INTO player (
                                        player_id, player_name, overallrating, potential,
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
                                        slidingtackle, jumping, stamina, strength, aggression,
                                        gkdiving, gkhandling, gkkicking, gkpositioning, gkreflexes)
                    VALUES (${playerID}, '${playerName}', ${overallrating}, ${potential},
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
                            ${slidingtackle}, ${jumping}, ${stamina}, ${strength}, ${aggression},
                            ${gkdiving}, ${gkhandling}, ${gkkicking}, ${gkpositioning}, ${gkreflexes}
                           )`;
                const result = await sequelize.query(insertSQL, { type: QueryTypes.INSERT });
                // logger.info(`[API_LOGS][/player/bulk] Created new player: playerID=${playerID}`);
            } else {
                // update
                if (
                    parseInt(queryRes[0].overallrating) !== parseInt(overallrating) ||
                    parseInt(queryRes[0].potential) !== parseInt(potential)
                ) {
                    logger.info(
                        `[API_LOGS][/player/bulk] [i=${i}]` +
                            `[${playerID}][${playerName}] ` +
                            `overallRating=${queryRes[0].overallrating}->${overallrating}, ` +
                            `potential=${queryRes[0].potential}->${potential}`,
                    );
                }
                const updateSQL = `
                    UPDATE player
                    SET player_name='${playerName}',
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
                        aggression=${aggression},
                        gkdiving=${gkdiving},
                        gkhandling=${gkhandling},
                        gkkicking=${gkkicking},
                        gkpositioning=${gkpositioning},
                        gkreflexes=${gkreflexes}
                        WHERE player_id = ${playerID}`;
                const result = await sequelize.query(updateSQL, { type: QueryTypes.UPDATE });
                // logger.info(`[API_LOGS][/player/bulk] Updated player: playerID=${playerID}`);
            }
        }
    } catch (e) {
        logger.error(`[API_LOGS][/player/bulk] ${e}`);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
