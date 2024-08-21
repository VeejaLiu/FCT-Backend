import { Logger } from '../../lib/logger';
import { PlayerModel } from '../../models/schema/PlayerDB';

const logger = new Logger(__filename);

export async function getPlayerCount({ userId }: { userId: string }): Promise<number> {
    try {
        const count = await PlayerModel.count({ where: { is_archived: 0, user_id: userId } });
        return count;
    } catch (e) {
        logger.error(`[getPlayerCount] error: ${e}`);
        return 0;
    }
}
