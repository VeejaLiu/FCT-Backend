import { UserNotificationModel } from '../../models/schema/UserNotificationDB';

export async function getUserNotifications({ userId, gameVersion }: { gameVersion: number; userId: any }) {
    const res = await UserNotificationModel.findAll({
        where: {
            user_id: userId,
            game_version: gameVersion,
            is_deleted: 0,
        },
        raw: true,
    });
    return res;
}
