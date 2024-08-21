import bcrypt from 'bcryptjs';
import { Logger } from '../../lib/logger';
import { refreshSecretKey } from './refresh-secret-key';
import { UserModel } from '../../models/schema/UserDB';
import { Op } from 'sequelize';

const logger = new Logger(__filename);

export async function registerUser({
    username,
    email,
    password,
}: {
    username: string;
    email: string;
    password: string;
}): Promise<{
    success: boolean;
    message: string;
    data?: any;
}> {
    try {
        if (!username || !email || !password) {
            return {
                success: false,
                message: 'Missing required fields',
            };
        }

        if (username.length < 1 || username.length > 16) {
            return {
                success: false,
                message: 'Username must be between 1 and 16 characters',
            };
        }

        const emailReg = /^[A-Za-z0-9]+([_.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
        if (!emailReg.test(email)) {
            return {
                success: false,
                message: 'Invalid email',
            };
        }

        if (password.length < 1 || password.length > 16) {
            return {
                success: false,
                message: 'Password must be between 1 and 16 characters',
            };
        }

        logger.info(`[/user/register] username: ${username}, email: ${email}`);

        /*
         * Check if user already exists
         */
        const existingUser = await UserModel.findOne({
            where: { [Op.or]: [{ username: username }, { email: email }] },
        });
        if (existingUser) {
            logger.info(`[/user/register] username or email duplicate`);
            return {
                success: false,
                message: 'Username or email already exists',
            };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        logger.info(`[/user/register] hashedPassword: ${hashedPassword}`);

        /*
         * Insert user
         */
        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: hashedPassword,
        });
        const userId = newUser.id;
        logger.info(`[/user/register] Register user success: ${userId}`);

        /*
         * Insert secret key
         */
        await refreshSecretKey({ userId: userId });

        return {
            success: true,
            message: 'success',
            data: {
                id: userId,
                username: username,
                email: email,
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
