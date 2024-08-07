import { Logger } from '../../lib/logger';
import { doRawQuery } from '../../models';

const logger = new Logger(__filename);

interface PlayerTrend {
    inGameDate: string;
    overallRating: number;
    potential: number;
}

interface PlayerTrendData {
    playerID: number;
    playerName: string;
    trends: PlayerTrend[];
}

export async function getAllPlayerTrends(): Promise<PlayerTrendData[]> {
    try {
        // query all players first
        const sql1 = 'SELECT player_id, player_name FROM player WHERE is_archived = 0';
        const players: {
            player_id: number;
            player_name: string;
        }[] = await doRawQuery(sql1);
        logger.info(`[getAllPlayerTrends] ${players?.length} players found`);
        if (!players || players.length === 0) {
            logger.info(`[getAllPlayerTrends] No players found`);
            return [];
        }

        // query all player trends
        const result = [];
        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            const sql2 = `
                SELECT player_id, in_game_date, overallrating, potential
                FROM player_status_history
                WHERE player_id = ${player.player_id}
                order by in_game_date desc
                limit 20`;
            const playerTrends: {
                player_id: number;
                in_game_date: string;
                overallrating: number;
                potential: number;
            }[] = await doRawQuery(sql2);
            const trends = playerTrends.map((trend) => {
                return {
                    inGameDate: trend.in_game_date,
                    overallRating: trend.overallrating,
                    potential: trend.potential,
                };
            });
            result.push({
                playerID: player.player_id,
                playerName: player.player_name,
                trends: trends,
            });
        }
        return result;
    } catch (e) {
        logger.error(`[getAllPlayerTrends] ${e.stack}`);
        return [];
    }
}
