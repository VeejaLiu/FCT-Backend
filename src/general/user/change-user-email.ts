import { Logger } from '../../lib/logger';
import { UserModel } from '../../models/schema/UserDB';

const logger = new Logger(__filename);

export async function changeUserEmail({ userId, newEmail }: { userId: number; newEmail: string }): Promise<{
    success: boolean;
    message: string;
}> {
    const user = await UserModel.findOne({ where: { id: userId } });
    if (!user) {
        return {
            success: false,
            message: 'User not found',
        };
    }

    if (user.email === newEmail) {
        return {
            success: false,
            message: 'New email is the same as the old one',
        };
    }

    await UserModel.update(
        {
            email: newEmail,
            is_email_verified: false,
        },
        { where: { id: userId } },
    );

    return {
        success: true,
        message: 'Password updated',
    };
}
