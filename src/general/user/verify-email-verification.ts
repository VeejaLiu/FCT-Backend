// 验证邮箱链接
import jwt from 'jsonwebtoken';
import { UserModel } from '../../models/schema/UserDB';
import { env } from '../../env';
import { VerificationPayload } from './send-email-verification';

export async function verifyEmailVerification({ token }: { token: string }): Promise<{
    success: boolean;
    userId?: number;
    error?: string;
}> {
    try {
        // 验证并解码 JWT token
        const decoded = jwt.verify(token, env.secret.jwt) as VerificationPayload;

        // 验证 token 类型
        if (decoded.type !== 'email_verification') {
            return {
                success: false,
                error: 'Invalid token type',
            };
        }

        // 验证 nonce（可选）
        // const isValidNonce = await validateNonce(decoded.nonce, decoded.userId);
        // if (!isValidNonce) {
        //     return {
        //         success: false,
        //         error: 'Token has already been used',
        //     };
        // }

        // 验证用户信息
        const user = await UserModel.getRawByID({ id: decoded.userId });
        if (!user) {
            return {
                success: false,
                error: 'User not found',
            };
        }

        // 验证邮箱是否匹配
        if (user.email !== decoded.email) {
            return {
                success: false,
                error: 'Email mismatch',
            };
        }

        // // 可选：删除已使用的 nonce
        // await removeNonce(decoded.nonce, decoded.userId);

        // 更新用户邮箱验证状态
        await UserModel.update(
            {
                is_email_verified: true,
            },
            { where: { id: decoded.userId } },
        );

        // 返回验证成功结果
        return {
            success: true,
            userId: decoded.userId,
        };
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return {
                success: false,
                error: 'Token has expired',
            };
        }
        return {
            success: false,
            error: 'Invalid token',
        };
    }
}
