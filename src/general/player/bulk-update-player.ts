import { DateUtils } from '../../utils/Date';
import { Logger } from '../../lib/logger';
import { PlayerModel } from '../../models/schema/PlayerDB';
import { PlayerStatusHistoryModel } from '../../models/schema/PlayerStatusHistoryDB';
import { sendMessageToUser } from '../../lib/ws/websocket-server';
import { getUserSetting, NOTIFICATION_ITEMS } from '../user/get-user-setting';

const logger = new Logger(__filename);

async function sendPlayerUpdateNotification({
    userId,
    playerID,
    playerName,
    existingPlayer,
    overallrating,
    potential,
}: {
    existingPlayer: PlayerModel;
    overallrating: number;
    potential: number;
    userId: number;
    playerID: number;
    playerName: string;
}) {
    const userSettingRes = await getUserSetting({ userId });
    if (!userSettingRes.success) {
        return;
    }
    const userSetting = userSettingRes.data;

    if (!userSetting.enableNotification) {
        return;
    }

    if (
        (Number(existingPlayer.overallrating) !== Number(overallrating) ||
            Number(existingPlayer.potential) !== Number(potential)) &&
        userSetting.notificationItems.PlayerUpdate_Overall
    ) {
        logger.info(
            `[bulkUpdatePlayer][userID=${userId}] playerID=${playerID}, playerName=${playerName}, overallrating=${existingPlayer.overallrating} -> ${overallrating}`,
        );
        logger.info(
            `[bulkUpdatePlayer][userID=${userId}] playerID=${playerID}, playerName=${playerName}, potential=${existingPlayer.potential} -> ${potential}`,
        );
        sendMessageToUser({
            userId: userId,
            message: {
                type: NOTIFICATION_ITEMS.PlayerUpdate_Overall,
                payload: {
                    playerID: playerID,
                    playerName: playerName,
                    oldOverallrating: existingPlayer.overallrating,
                    overallrating: overallrating,
                    oldPotential: existingPlayer.potential,
                    potential: potential,
                },
            },
        });
    }
}

export async function bulkUpdatePlayer({ userId, players }: { userId: number; players: any[] }) {
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
        logger.info(`[bulkUpdatePlayer][userId=${userId}] existingPlayers.length=${existingPlayers.length}`);
        logger.info(`[bulkUpdatePlayer][userId=${userId}] new players count: ${players.length}`);
        logger.info(`[bulkUpdatePlayer][userId=${userId}] new players: ${players.map((p) => p.playerID).join(',')}`);

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
            playerName = playerName?.replace(/'/g, "''");

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
                await PlayerModel.create({
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
                sendPlayerUpdateNotification({
                    userId,
                    playerID,
                    playerName,
                    existingPlayer,
                    overallrating,
                    potential,
                });
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
