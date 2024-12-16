import bcrypt from 'bcryptjs';
import { Logger } from '../../lib/logger';
import { refreshSecretKey } from './refresh-secret-key';
import { UserModel } from '../../models/schema/UserDB';
import { Op } from 'sequelize';
import AsyncLock from 'async-lock';

const logger = new Logger(__filename);
const lock = new AsyncLock();

export async function registerUserWithLock({
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
    return lock.acquire('registrationLock', async () => {
        return registerUser({ username, email, password });
    });
}

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
        logger.info(`[/user/register] username: ${username}, email: ${email}`);

        /*
         * Check if user already exists (case insensitive)
         */
        const existingUser = await UserModel.isUsernameOrEmailExist({
            username: username,
            email: email,
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
