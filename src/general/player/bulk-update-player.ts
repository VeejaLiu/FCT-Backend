import { DateUtils } from '../../utils/Date';
import { Logger } from '../../lib/logger';
import { doRawInsert, doRawQuery, doRawUpdate } from '../../models';

const logger = new Logger(__filename);

export async function bulkUpdatePlayer(players: any[]) {
    try {
        logger.info(`[bulkUpdatePlayer] players.length=${players.length}`);
        if (!players || players.length === 0) {
            return;
        }

        // Query all existing players
        const querySQL1 = `SELECT player_id FROM player where is_archived = 0`;
        const existingPlayers: any = await doRawQuery(querySQL1);
        const existingPlayerIDs = existingPlayers.map((p: any) => p.player_id);
        const existingPlayerSet = new Set(existingPlayerIDs);

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

            // remove playerID from existingPlayerSet
            if (existingPlayerSet.has(playerID)) {
                existingPlayerSet.delete(playerID);
            }

            // convert currentDate to age, currentDate is in format 'yyyy-mm-dd'
            const [y, m, d] = currentDate.split('-').map((v: string) => Number(v));
            const age = Math.floor((new DateUtils(y, m, d).toGregorianDays() - birthdate) / 365.25);

            // logger.info(
            //     `[bulkUpdatePlayer] [i=${i}]` +
            //         `playerID=${playerID}, ` +
            //         `playerName=${playerName}, ` +
            //         `currentDate=${currentDate}, ` +
            //         `overallrating=${overallrating}, ` +
            //         `potential=${potential}, ` +
            //         `birthdate=${birthdate}`,
            // );

            // query first
            const querySQL = `SELECT * FROM player WHERE player_id = ${playerID} limit 1`;
            const queryRes: any[] = await doRawQuery(querySQL);
            if (queryRes.length === 0) {
                // insert
                const insertSQL = `
                    INSERT INTO player (
                                        player_id, player_name, overallrating, potential,
                                        birthdate, nationality, height, weight, age,
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
                            '${birthdate}', '${nationality}', ${height}, ${weight}, ${age},
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
                const result = await doRawInsert(insertSQL);
                // logger.info(`[bulkUpdatePlayer] Created new player: playerID=${playerID}`);
            } else {
                const updateSQL = `
                UPDATE player
                SET player_name='${playerName}',
                    overallrating=${overallrating},
                    potential=${potential},
                    birthdate='${birthdate}',
                    nationality='${nationality}',
                    height=${height},
                    weight=${weight},
                    age=${age},
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
                const result = await doRawUpdate(updateSQL);
                // logger.info(`[bulkUpdatePlayer] Updated player: playerID=${playerID}`);
            }

            /*
             * Update player_status_history
             */
            // date format: '1991-1-1' -> '1991-01-01'
            const dateStr = `${y}-${m < 10 ? '0' : ''}${m}-${d < 10 ? '0' : ''}${d}`;
            // query by player_id and in_game_date
            const queryStatusSQL = `
                SELECT * FROM player_status_history
                WHERE player_id = ${playerID} AND in_game_date = '${dateStr}'`;
            const queryStatusResult = await doRawQuery(queryStatusSQL);
            if (queryStatusResult.length > 0) {
                logger.warn(
                    `[bulkUpdatePlayer] player_status_history already exists: playerID=${playerID}, date=${dateStr}`,
                );
                // update
                const updateStatusSQL = `
                    UPDATE player_status_history
                    SET overallrating=${overallrating},
                        potential=${potential}
                    WHERE player_id = ${playerID} AND in_game_date = '${dateStr}'`;
                await doRawUpdate(updateStatusSQL);
            } else {
                const insertStatusSQL = `
                    INSERT INTO player_status_history (player_id, in_game_date, overallrating, potential)
                    VALUES (${playerID}, '${dateStr}', ${overallrating}, ${potential})`;
                await doRawInsert(insertStatusSQL);
            }
        }

        // archive players that are not in the new list
        if (existingPlayerSet.size > 0) {
            logger.info(`[bulkUpdatePlayer] Archive players: ${Array.from(existingPlayerSet).join(',')}`);
            const archivePlayerIDs = Array.from(existingPlayerSet);
            const archiveSQL = `UPDATE player SET is_archived = 1 WHERE player_id IN (${archivePlayerIDs.join(',')})`;
            await doRawUpdate(archiveSQL);
        }
    } catch (e) {
        logger.error(`[bulkUpdatePlayer] error: ${e}`);
    }
}
