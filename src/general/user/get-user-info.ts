import { Logger } from '../../lib/logger';
import { UserModel } from '../../models/schema/UserDB';

const logger = new Logger(__filename);

export async function getUserInfo({ userId }: { userId: string }): Promise<{
    success: boolean;
    message: string;
    data?: {
        userID: number;
        username: string;
        email: string;
    };
}> {
    try {
        const user = await UserModel.findOne({ where: { id: userId } });

        return {
            success: true,
            message: 'success',
            data: {
                userID: user.id,
                username: user.username,
                email: user.email,
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
