import { UserNotificationModel } from '../../models/schema/UserNotificationDB';

export async function getUserNotifications({ userId, gameVersion }: { gameVersion: number; userId: any }) {
    const res = await UserNotificationModel.getAllNotifications({
        userId: userId,
        gameVersion: gameVersion,
    });
    return res;
}
