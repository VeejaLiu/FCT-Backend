import crypto from 'crypto';
import { UserModel } from '../../models/schema/UserDB';
import { sendVerificationLinkEmail } from '../../lib/resend/send-email';
import jwt from 'jsonwebtoken';
import { env } from '../../env';
import { Logger } from '../../lib/logger';

const logger = new Logger(__filename);

const VERIFICATION_EXPIRES_IN = '24h'; // Token 有效期
const BASE_URL = env.app.backend_url; // 后端地址

// 用于生成验证令牌的接口
export interface VerificationPayload {
    userId: number;
    email: string;
    username: string;
    nonce: string; // 随机字符串，防止重放攻击
    type: 'email_verification';
}

// 生成验证链接
export async function generateVerificationLink({
    userId,
    email,
    username,
}: {
    userId: number;
    email: string;
    username: string;
}): Promise<string> {
    // 生成随机 nonce
    const nonce = crypto.randomBytes(16).toString('hex');

    // 创建 payload
    const payload: VerificationPayload = {
        userId,
        email,
        username,
        nonce,
        type: 'email_verification',
    };

    // 生成 JWT token
    const token = jwt.sign(payload, env.secret.jwt, {
        expiresIn: VERIFICATION_EXPIRES_IN,
    });

    // 生成验证链接
    const verificationLink = `${BASE_URL}/v1/public/verify-email?token=${token}`;

    // // 可选：将 nonce 存储到数据库，用于防止重放攻击
    // await storeNonce(nonce, userId);

    return verificationLink;
}

export async function sendEmailVerification({ userId }: { userId: number }): Promise<void> {
    try {
        const user = await UserModel.getRawByID({ id: userId });
        if (!user || user.is_email_verified) {
            logger.error(`[sendEmailVerification] User not found or email already verified, userId: ${userId}`);
            return;
        }

        const email = user.email;
        const username = user.username;

        logger.info(`[sendEmailVerification] Sending email verification to ${email}, userId: ${userId}`);

        const verificationLink = await generateVerificationLink({
            userId,
            email,
            username,
        });
        logger.info(`[sendEmailVerification] Verification link: ${verificationLink}`);

        await sendVerificationLinkEmail({ email, username, verificationLink });
        logger.info(`[sendEmailVerification] Email sent successfully`);
    } catch (e) {
        console.error(`[sendEmailVerification] ${e.message}`);
    }
}
