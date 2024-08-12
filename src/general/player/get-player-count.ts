import { doRawQuery } from '../../models';
import { Logger } from '../../lib/logger';

const logger = new Logger(__filename);

export async function getPlayerCount({ userId }: { userId: string }): Promise<number> {
    try {
        const sql = `SELECT COUNT(*) as c FROM player where is_archived = 0 and user_id = ${userId}`;
        const sqlRes: any = await doRawQuery(sql);
        return sqlRes[0].c;
    } catch (e) {
        logger.error(`[getPlayerCount] error: ${e}`);
        return 0;
    }
}
