import { Logger } from '../../lib/logger';
import { UserModel } from '../../models/schema/UserDB';

const logger = new Logger(__filename);

const USER_NOT_FOUND = {
    success: false,
    message: 'User not found',
};

const EMAIL_SAME_AS_OLD = {
    success: false,
    message: 'New email is the same as the old one',
};

const EMAIL_UPDATED = {
    success: true,
    message: 'Email updated',
};

const EMAIL_UPDATE_ERROR = {
    success: false,
    message: 'An error occurred while updating the email',
};

export async function changeUserEmail({ userId, newEmail }: { userId: number; newEmail: string }): Promise<{
    success: boolean;
    message: string;
}> {
    logger.info(`Attempting to change email for user ID: ${userId} to: ${newEmail}`);

    try {
        const user = await UserModel.findOne({ where: { id: userId } });
        if (!user) {
            logger.warn(`User not found for ID: ${userId}`);

            return USER_NOT_FOUND;
        }

        if (user.email === newEmail) {
            logger.info(`Email change attempt for user ID: ${userId} - New email is the same as the current email`);
            return EMAIL_SAME_AS_OLD;
        }

        logger.info(`Updating email for user ID: ${userId} from: ${user.email} to: ${newEmail}`);
        await user.update({
            email: newEmail,
            is_email_verified: false,
        });

        logger.info(`Email successfully updated for user ID: ${userId}`);
        return EMAIL_UPDATED;
    } catch (error) {
        logger.error(`Error updating email for user ID: ${userId} - ${error.message}`, error);
        return EMAIL_UPDATE_ERROR;
    }
}
