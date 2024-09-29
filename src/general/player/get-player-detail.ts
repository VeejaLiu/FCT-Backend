import { PlayerModel } from '../../models/schema/PlayerDB';
import { PlayerStatusHistoryModel } from '../../models/schema/PlayerStatusHistoryDB';
import { Logger } from '../../lib/logger';
import { getAllPlayers, PlayerOverall } from './get-all-players';
import { PlayerTrend } from './get-all-player-trends';

const logger = new Logger(__filename);

interface PlayerDetail {
    allPlayer: PlayerOverall[];
    thisPlayer: PlayerModel;
    trends: PlayerTrend[];
}

export async function getPlayerDetail({
    userId,
    gameVersion,
    playerID,
}: {
    userId: string;
    gameVersion: number;
    playerID: number;
}): Promise<PlayerDetail> {
    try {
        logger.info(`[getPlayerDetail] userId: ${userId}, playerID: ${playerID}`);
        if (!userId) {
            return null;
        }

        const players = await getAllPlayers({ userId, gameVersion });
        if (!players || players.length === 0) {
            return null;
        }

        if (!playerID) {
            playerID = players[0].playerID;
        }
        let player = await PlayerModel.findOne({
            where: {
                user_id: userId,
                game_version: gameVersion,
                player_id: playerID,
            },
            raw: true,
        });
        if (!player) {
            playerID = players[0].playerID;
            player = await PlayerModel.findOne({
                where: {
                    user_id: userId,
                    game_version: gameVersion,
                    player_id: playerID,
                },
                raw: true,
            });
        }

        const playerTrends: {
            player_id: number;
            in_game_date: string;
            overallrating: number;
            potential: number;
        }[] = await PlayerStatusHistoryModel.findAll({
            attributes: ['player_id', 'in_game_date', 'overallrating', 'potential'],
            where: {
                user_id: userId,
                game_version: gameVersion,
                player_id: playerID,
            },
            order: [['in_game_date', 'DESC']],
            raw: true,
        });
        const trends = playerTrends
            .sort((a, b) => {
                return new Date(a.in_game_date).getTime() - new Date(b.in_game_date).getTime();
            })
            .map((trend) => {
                return {
                    inGameDate: trend.in_game_date,
                    overallRating: trend.overallrating,
                    potential: trend.potential,
                };
            });

        return {
            allPlayer: players,
            thisPlayer: player,
            trends: trends,
        };
    } catch (e) {
        logger.error(`[getPlayerDetail] ${e.message}`);
        return null;
    }
}
