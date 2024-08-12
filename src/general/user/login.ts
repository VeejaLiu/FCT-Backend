import { doRawInsert, doRawQuery, doRawUpdate } from '../../models';
import bcrypt from 'bcryptjs';
import { Logger } from '../../lib/logger';
import { signToken } from '../../lib/token/signToken';

const logger = new Logger(__filename);

export async function loginUser({ username, password }: { username: string; password: string }): Promise<{
    success: boolean;
    message: string;
    data?: any;
}> {
    try {
        if (!username || !password || username.length < 1 || password.length < 1) {
            logger.info(`[/user/login] Missing required fields`);
            return {
                success: false,
                message: 'Missing required fields',
            };
        }

        /*
         * Check if user already exists
         */
        const sql1 = `SELECT * FROM user WHERE username = '${username}' OR email = '${username}' LIMIT 1`;
        const queryRes = await doRawQuery(sql1);
        if (queryRes.length <= 0) {
            logger.info(`[/user/login] User not found`);
            return {
                success: false,
                message: 'User not found with this username or email',
            };
        }

        const user = queryRes[0];
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            logger.info(`[/user/login] Password not matched`);
            return {
                success: false,
                message: 'Password not matched',
            };
        }

        const userID = user.id;
        logger.info(`[/user/login] user[${userID}][${user.username}][${user.email}] logged in`);

        /*
         * Sign token
         */
        const token = signToken(userID);
        const saveTokenSql = `UPDATE user SET token = '${token}' WHERE id = ${userID}`;
        await doRawUpdate(saveTokenSql);

        return {
            success: true,
            message: 'success',
            data: {
                id: user.id,
                username: user.username,
                email: user.email,
                token: token,
                createTime: user.createTime,
                updateTime: user.updateTime,
            },
        };
    } catch (e) {
        logger.error(`[/user/register] ${e.message}`);
        return {
            success: false,
            message: 'Something went wrong',
        };
    }
}
