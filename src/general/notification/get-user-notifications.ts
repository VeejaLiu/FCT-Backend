import { UserNotificationModel } from '../../models/schema/UserNotificationDB';
import { Logger } from '../../lib/logger';
import { sequelize } from '../../models/db-config-mysql';
import { PLAYER_PRIMARY_POS_NAME } from '../player/get-all-players';

const logger = new Logger(__filename);

export async function getUserNotifications({
    userId,
    gameVersion,
    onlyUnread = false,
    page = 0,
    limit = 10,
}: {
    gameVersion: number;
    userId: any;
    onlyUnread: boolean;
    page: number;
    limit: number;
}) {
    try {
        const [results] = await sequelize.query(`
            SELECT un.*,
                   p.player_name,
                   p.preferredposition1
            FROM user_notification un RIGHT JOIN player as p
            ON un.player_id = p.player_id
            WHERE un.user_id = ${userId}
              AND un.game_version = ${gameVersion}
              AND p.user_id = ${userId}
              AND p.game_version = ${gameVersion}
              AND un.is_deleted = 0
              ${onlyUnread ? 'AND un.is_read = 0' : ''}
              AND p.is_archived = 0
            ORDER BY un.in_game_date DESC,
                un.id DESC
            LIMIT ${(page - 1) * limit}, ${limit}`);
        const where = {
            user_id: userId,
            game_version: gameVersion,
            is_deleted: 0,
        };
        if (onlyUnread) {
            where['is_read'] = 0;
        }
        const total = await UserNotificationModel.count({ where });

        return {
            total,
            items: results.map((result: any) => {
                return {
                    id: result.id,
                    user_id: result.user_id,
                    game_version: result.game_version,
                    in_game_date: result.in_game_date,
                    message_type: result.message_type,
                    message_subtype: result.message_subtype,
                    player_id: result.player_id,
                    player_position: PLAYER_PRIMARY_POS_NAME[result.preferredposition1],
                    player_name: result.player_name,
                    old_overall_rating: result.old_overall_rating,
                    overall_rating: result.overall_rating,
                    old_potential: result.old_potential,
                    potential: result.potential,
                    old_skillmoves: result.old_skillmoves,
                    skillmoves: result.skillmoves,
                    old_weakfoot: result.old_weakfoot,
                    weakfoot: result.weakfoot,
                    is_read: result.is_read,
                    create_time: result.create_time,
                };
            }),
        };
    } catch (error) {
        logger.error(error);
        return [];
    }
}
