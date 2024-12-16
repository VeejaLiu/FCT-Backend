import { Logger } from '../../lib/logger';
import { UserModel } from '../../models/schema/UserDB';
import bcrypt from 'bcryptjs';

const logger = new Logger(__filename);

export async function changePassword({
    userId,
    oldPassword,
    newPassword,
    confirmNewPassword,
}: {
    userId: number;
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}): Promise<{
    success: boolean;
    message: string;
}> {
    if (newPassword !== confirmNewPassword) {
        logger.info(`[changePassword] New password not matched`);
        return {
            success: false,
            message: 'New password not matched',
        };
    }

    const user = await UserModel.findOne({ where: { id: userId } });
    const isPasswordMatched = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatched) {
        logger.info(`[changePassword] Password not matched`);
        return {
            success: false,
            message: 'Old password not matched',
        };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await UserModel.update({ password: hashedPassword }, { where: { id: userId } });

    return {
        success: true,
        message: 'Password updated',
    };
}
