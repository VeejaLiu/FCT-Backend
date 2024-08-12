import { v4 as uuidv4 } from 'uuid';
import { doRawInsert, doRawQuery } from '../../models';
import { Logger } from '../../lib/logger';

const logger = new Logger(__filename);

export async function refreshSecretKey({ userId }: { userId: string }): Promise<{
    success: boolean;
    message: string;
    data?: any;
}> {
    try {
        const newSecretKeyId = uuidv4();
        const newSecretKey = `fcd-${newSecretKeyId}`;

        // query first
        const sql1 = `SELECT * FROM user_secret_key WHERE user_id = ${userId}`;
        const existingUser = await doRawQuery(sql1);
        if (existingUser.length <= 0) {
            const sql = `INSERT INTO user_secret_key (user_id, secret_key) VALUES (${userId}, '${newSecretKey}')`;
            await doRawInsert(sql);
            logger.info(`[refreshSecretKey] Insert secret key success: ${newSecretKey}`);
        } else {
            const sql = `UPDATE user_secret_key SET secret_key = '${newSecretKey}' WHERE id = ${userId}`;
            await doRawQuery(sql);
            logger.info(`[refreshSecretKey] Update secret key success: ${newSecretKey}`);
        }

        return {
            success: true,
            message: 'success',
            data: {
                secretKey: newSecretKey,
            },
        };
    } catch (e) {
        logger.error(`[refreshSecretKey] ${e.message}`);
        return {
            success: false,
            message: 'Something went wrong',
        };
    }
}
