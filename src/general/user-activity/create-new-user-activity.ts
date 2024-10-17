import { Logger } from '../../lib/logger';
import { UserActivityModel } from '../../models/schema/UserActivityDB';

const logger = new Logger(__filename);

export async function createNewUserActivity({ userID }: { userID: string }): Promise<void> {
    try {
        await UserActivityModel.create({
            userId: userID,
            activity_time: new Date(),
        });
    } catch (e) {
        logger.error(`[createNewUserActivity] ${e}`);
    }
}
