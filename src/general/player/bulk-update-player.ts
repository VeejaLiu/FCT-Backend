import { DateUtils } from '../../utils/Date';
import { Logger } from '../../lib/logger';
import { PlayerModel } from '../../models/schema/PlayerDB';
import { PlayerStatusHistoryModel } from '../../models/schema/PlayerStatusHistoryDB';

const logger = new Logger(__filename);

export async function bulkUpdatePlayer({ userId, players }: { userId: string; players: any[] }) {
    try {
        logger.info(`[bulkUpdatePlayer][userId=${userId}] players.length=${players.length}`);
        if (!players || players.length === 0) {
            return;
        }

        // Query all existing players
        const existingPlayers = await PlayerModel.findAll({
            attributes: ['player_id'],
            where: { user_id: userId, is_archived: false },
            raw: true,
        });
        const existingPlayerIDs = existingPlayers.map((p) => p.player_id);
        const existingPlayerSet = new Set(existingPlayerIDs);

        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            let {
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

            // Some player names have single quotes, escape them, lime O'Connell
            playerName = playerName.replace(/'/g, "''");

            // remove playerID from existingPlayerSet
            if (existingPlayerSet.has(playerID)) {
                existingPlayerSet.delete(playerID);
            }

            // convert currentDate to age, currentDate is in format 'yyyy-mm-dd'
            const [y, m, d] = currentDate.split('-').map((v: string) => Number(v));
            const playerAge = Math.floor((new DateUtils(y, m, d).toGregorianDays() - birthdate) / 365.25);

            // logger.info(
            //     `[bulkUpdatePlayer] [i=${i}]` +
            //         `playerID=${playerID}, ` +
            //         `playerName=[${playerName}], ` +
            //         `currentDate=${currentDate}, ` +
            //         `overallrating=${overallrating}, ` +
            //         `potential=${potential}, ` +
            //         `birthdate=${birthdate}`,
            // );

            // query first
            const existingPlayer = await PlayerModel.findOne({
                where: { player_id: playerID, user_id: userId },
            });
            if (!existingPlayer) {
                // insert
                // const insertSQL = `
                //     INSERT INTO player (
                //                         user_id,
                //                         player_id, player_name, overallrating, potential,
                //                         birthdate, nationality, height, weight, age,
                //                         preferredfoot,
                //                         preferredposition1, preferredposition2,
                //                         preferredposition3, preferredposition4,
                //                         skillmoves, weakfootabilitytypecode, attackingworkrate, defensiveworkrate,
                //                         acceleration, sprintspeed,
                //                         positioning, finishing, shotpower, longshots, volleys, penalties,
                //                         vision, crossing, freekickaccuracy, shortpassing, longpassing, curve,
                //                         agility, balance, reactions, ballcontrol, dribbling, composure,
                //                         interceptions, headingaccuracy, defensiveawareness, standingtackle,
                //                         slidingtackle, jumping, stamina, strength, aggression,
                //                         gkdiving, gkhandling, gkkicking, gkpositioning, gkreflexes)
                //     VALUES (
                //             ${userId},
                //             ${playerID}, '${playerName}', ${overallrating}, ${potential},
                //             '${birthdate}', '${nationality}', ${height}, ${weight}, ${age},
                //             '${preferredfoot}',
                //             ${preferredposition1}, ${preferredposition2},
                //             ${preferredposition3}, ${preferredposition4},
                //             ${skillmoves}, ${weakfootabilitytypecode}, ${attackingworkrate}, ${defensiveworkrate},
                //             ${acceleration}, ${sprintspeed},
                //             ${positioning}, ${finishing}, ${shotpower}, ${longshots}, ${volleys}, ${penalties},
                //             ${vision}, ${crossing}, ${freekickaccuracy}, ${shortpassing}, ${longpassing}, ${curve},
                //             ${agility}, ${balance}, ${reactions}, ${ballcontrol}, ${dribbling}, ${composure},
                //             ${interceptions}, ${headingaccuracy}, ${defensiveawareness}, ${standingtackle},
                //             ${slidingtackle}, ${jumping}, ${stamina}, ${strength}, ${aggression},
                //             ${gkdiving}, ${gkhandling}, ${gkkicking}, ${gkpositioning}, ${gkreflexes}
                //            )`;
                // const result = await doRawInsert(insertSQL);
                const result = await PlayerModel.create({
                    // user id
                    user_id: userId,
                    // basic info
                    player_id: playerID,
                    player_name: playerName,
                    overallrating,
                    potential,
                    // personal info
                    birthdate,
                    nationality,
                    height,
                    weight,
                    age: playerAge,
                    // player details
                    preferredfoot,
                    preferredposition1,
                    preferredposition2,
                    preferredposition3,
                    preferredposition4,
                    skillmoves,
                    weakfootabilitytypecode,
                    attackingworkrate,
                    defensiveworkrate,
                    // pace
                    acceleration,
                    sprintspeed,
                    // attacking
                    positioning,
                    finishing,
                    shotpower,
                    longshots,
                    volleys,
                    penalties,
                    // passing
                    vision,
                    crossing,
                    freekickaccuracy,
                    shortpassing,
                    longpassing,
                    curve,
                    // dribbling
                    agility,
                    balance,
                    reactions,
                    ballcontrol,
                    dribbling,
                    composure,
                    // defending
                    interceptions,
                    headingaccuracy,
                    defensiveawareness,
                    standingtackle,
                    slidingtackle,
                    // physical
                    jumping,
                    stamina,
                    strength,
                    aggression,
                    // goalkeeping
                    gkdiving,
                    gkhandling,
                    gkkicking,
                    gkpositioning,
                    gkreflexes,
                });
                // logger.info(`[bulkUpdatePlayer] Created new player: playerID=${playerID}`);
            } else {
                if (
                    Number(existingPlayer.overallrating) !== Number(overallrating) &&
                    Number(existingPlayer.potential) !== Number(potential)
                ) {
                    logger.info(
                        `[bulkUpdatePlayer][userID=${userId}] playerID=${playerID}, playerName=${playerName}, overallrating=${existingPlayer.overallrating} -> ${overallrating}`,
                    );
                    logger.info(
                        `[bulkUpdatePlayer][userID=${userId}] playerID=${playerID}, playerName=${playerName}, potential=${existingPlayer.potential} -> ${potential}`,
                    );
                }
                // const updateSQL = `
                // UPDATE player
                // SET player_name='${playerName}',
                //     overallrating=${overallrating},
                //     potential=${potential},
                //     birthdate='${birthdate}',
                //     nationality='${nationality}',
                //     height=${height},
                //     weight=${weight},
                //     age=${age},
                //     preferredfoot='${preferredfoot}',
                //     preferredposition1=${preferredposition1},
                //     preferredposition2=${preferredposition2},
                //     preferredposition3=${preferredposition3},
                //     preferredposition4=${preferredposition4},
                //     skillmoves=${skillmoves},
                //     weakfootabilitytypecode=${weakfootabilitytypecode},
                //     attackingworkrate=${attackingworkrate},
                //     defensiveworkrate=${defensiveworkrate},
                //     acceleration=${acceleration},
                //     sprintspeed=${sprintspeed},
                //     positioning=${positioning},
                //     finishing=${finishing},
                //     shotpower=${shotpower},
                //     longshots=${longshots},
                //     volleys=${volleys},
                //     penalties=${penalties},
                //     vision=${vision},
                //     crossing=${crossing},
                //     freekickaccuracy=${freekickaccuracy},
                //     shortpassing=${shortpassing},
                //     longpassing=${longpassing},
                //     curve=${curve},
                //     agility=${agility},
                //     balance=${balance},
                //     reactions=${reactions},
                //     ballcontrol=${ballcontrol},
                //     dribbling=${dribbling},
                //     composure=${composure},
                //     interceptions=${interceptions},
                //     headingaccuracy=${headingaccuracy},
                //     defensiveawareness=${defensiveawareness},
                //     standingtackle=${standingtackle},
                //     slidingtackle=${slidingtackle},
                //     jumping=${jumping},
                //     stamina=${stamina},
                //     strength=${strength},
                //     aggression=${aggression},
                //     gkdiving=${gkdiving},
                //     gkhandling=${gkhandling},
                //     gkkicking=${gkkicking},
                //     gkpositioning=${gkpositioning},
                //     gkreflexes=${gkreflexes},
                //     is_archived=0
                // WHERE player_id = ${playerID}
                //   AND user_id = ${userId}`;
                // const result = await doRawUpdate(updateSQL);
                const result = await PlayerModel.update(
                    {
                        // basic info
                        player_name: playerName,
                        overallrating,
                        potential,
                        // personal info
                        birthdate,
                        nationality,
                        height,
                        weight,
                        age: playerAge,
                        // player details
                        preferredfoot,
                        preferredposition1,
                        preferredposition2,
                        preferredposition3,
                        preferredposition4,
                        skillmoves,
                        weakfootabilitytypecode,
                        attackingworkrate,
                        defensiveworkrate,
                        // pace
                        acceleration,
                        sprintspeed,
                        // attacking
                        positioning,
                        finishing,
                        shotpower,
                        longshots,
                        volleys,
                        penalties,
                        // passing
                        vision,
                        crossing,
                        freekickaccuracy,
                        shortpassing,
                        longpassing,
                        curve,
                        // dribbling
                        agility,
                        balance,
                        reactions,
                        ballcontrol,
                        dribbling,
                        composure,
                        // defending
                        interceptions,
                        headingaccuracy,
                        defensiveawareness,
                        standingtackle,
                        slidingtackle,
                        // physical
                        jumping,
                        stamina,
                        strength,
                        aggression,
                        // goalkeeping
                        gkdiving,
                        gkhandling,
                        gkkicking,
                        gkpositioning,
                        gkreflexes,
                        // meta info
                        is_archived: 0,
                    },
                    { where: { player_id: playerID, user_id: userId } },
                );
            }

            /*
             * Update player_status_history
             */
            // date format: '1991-1-1' -> '1991-01-01'
            const dateStr = `${y}-${m < 10 ? '0' : ''}${m}-${d < 10 ? '0' : ''}${d}`;
            // query by player_id and in_game_date
            const existingPSH = await PlayerStatusHistoryModel.findOne({
                where: { player_id: playerID, in_game_date: dateStr, user_id: userId },
            });
            if (!existingPSH) {
                await PlayerStatusHistoryModel.create({
                    player_id: playerID,
                    in_game_date: dateStr,
                    overallrating,
                    potential,
                    user_id: userId,
                });
            } else {
                logger.warn(
                    `[bulkUpdatePlayer][userId=${userId}] player_status_history already exists: playerID=${playerID}, date=${dateStr}`,
                );
                // update
                await PlayerStatusHistoryModel.update(
                    { overallrating, potential },
                    { where: { player_id: playerID, in_game_date: dateStr, user_id: userId } },
                );
            }
        }

        // archive players that are not in the new list
        if (existingPlayerSet.size > 0) {
            logger.info(
                `[bulkUpdatePlayer][userID=${userId}] Archive players: ${Array.from(existingPlayerSet).join(',')}`,
            );
            const archivePlayerIDs = Array.from(existingPlayerSet);
            await PlayerModel.update({ is_archived: 1 }, { where: { player_id: archivePlayerIDs, user_id: userId } });
        }
    } catch (e) {
        logger.error(`[bulkUpdatePlayer][userID=${userId}] error: ${e}`);
    }
}
