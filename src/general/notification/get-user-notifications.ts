import { UserNotificationModel } from '../../models/schema/UserNotificationDB';
import { Logger } from '../../lib/logger';

const logger = new Logger(__filename);

export async function getUserNotifications({ userId, gameVersion }: { gameVersion: number; userId: any }) {
    try {
        const res = await UserNotificationModel.getAllNotifications({
            userId: userId,
            gameVersion: gameVersion,
        });
        return res;
    } catch (error) {
        logger.error(error);
        return [];
    }
}
