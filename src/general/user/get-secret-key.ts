import { doRawQuery } from '../../models';

import { Logger } from '../../lib/logger';

const logger = new Logger(__filename);

export async function getSecretKey({ userId }: { userId: string }): Promise<{
    success: boolean;
    message: string;
    data?: any;
}> {
    try {
        const sql = `SELECT secret_key FROM user_secret_key WHERE id = ${userId}`;
        const queryRes = await doRawQuery(sql);
        if (queryRes.length <= 0 || !queryRes[0].secret_key) {
            return {
                success: false,
                message: 'Secret key not found',
            };
        }

        const secretKey = queryRes[0].secret_key;
        return {
            success: true,
            message: 'success',
            data: {
                secretKey: secretKey,
            },
        };
    } catch (e) {
        logger.error(`[getSecretKey] ${e.message}`);
        return {
            success: false,
            message: 'Something went wrong',
        };
    }
}
