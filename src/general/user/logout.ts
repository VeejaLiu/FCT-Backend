import { doRawQuery, doRawUpdate } from '../../models';
import { Logger } from '../../lib/logger';

const logger = new Logger(__filename);

export async function logoutUser({ userId }: { userId: string }): Promise<{
    success: boolean;
    message: string;
    data?: any;
}> {
    try {
        if (!userId) {
            logger.info(`[logoutUser] Missing required fields`);
            return {
                success: false,
                message: 'Missing required fields',
            };
        }

        /*
         * Check if user already exists
         */
        const sql1 = `SELECT * FROM user WHERE id = ${userId}`;
        const queryRes = await doRawQuery(sql1);
        if (queryRes.length <= 0) {
            logger.info(`[logoutUser] User not found`);
            return {
                success: false,
                message: 'User not found or already logged out',
            };
        }

        /*
         * Revoking token
         */
        const saveTokenSql = `UPDATE user SET token = '', update_time = CURRENT_TIMESTAMP 
                              WHERE id = ${userId}`;
        await doRawUpdate(saveTokenSql);

        return {
            success: true,
            message: 'success',
        };
    } catch (e) {
        logger.error(`[logoutUser] ${e.message}`);
        return {
            success: false,
            message: 'Something went wrong',
        };
    }
}
