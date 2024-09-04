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
    playerID,
}: {
    userId: string;
    playerID: number;
}): Promise<PlayerDetail> {
    try {
        logger.info(`[getPlayerDetail] userId: ${userId}, playerID: ${playerID}`);
        if (!userId) {
            return null;
        }
        const players = await getAllPlayers({ userId });
        if (!playerID) {
            playerID = players[0].playerID;
        }
        const player = await PlayerModel.findOne({
            where: { user_id: userId, player_id: playerID },
            raw: true,
        });
        const playerTrends: {
            player_id: number;
            in_game_date: string;
            overallrating: number;
            potential: number;
        }[] = await PlayerStatusHistoryModel.findAll({
            attributes: ['player_id', 'in_game_date', 'overallrating', 'potential'],
            where: {
                player_id: playerID,
                user_id: userId,
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
