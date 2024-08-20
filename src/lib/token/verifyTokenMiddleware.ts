import jwt from 'jsonwebtoken';
import { env } from '../../env';
import { Logger } from '../logger';
import { UserModel } from '../../models/schema/UserDB';

const JWT_SECRET = env.secret.jwt;

const logger = new Logger(__filename);

export async function verifyToken(token: string) {
    try {
        const result = jwt.verify(token, JWT_SECRET);
        return {
            success: true,
            data: result,
        };
    } catch (e) {
        logger.error(`[testVerifyToken] verify error: ${e}`);
        return {
            success: false,
            message: 'Token is not valid',
        };
    }
}

/**
 * Verify token
 *   - if token is valid, set req.user = { userId: id }
 *   - if token is invalid, set req.user = undefined and return 401
 * @param req
 * @param res
 * @param next
 */
export function verifyTokenMiddleware(req: any, res: any, next: any) {
    const token = req.headers.token;
    if (token) {
        jwt.verify(req.headers.token, JWT_SECRET, async function (err, decode) {
            if (err) {
                logger.error(`[verifyToken] verify error: ${err}`);
                req.user = undefined;
                return res.status(401).send({
                    success: false,
                    message: 'Token is not valid',
                });
            } else {
                const { id, iat, exp } = decode;

                if (Date.now() > exp * 1000) {
                    logger.error(`[verifyToken] token expired`);
                    req.user = undefined;
                    return res.status(401).send({
                        success: false,
                        message: 'Token expired',
                    });
                }

                // verify if the token matches database
                const user = await UserModel.getRawByID({ id });
                if (!user) {
                    logger.error(`[verifyToken] user[${id}] not found`);
                    req.user = undefined;
                    return res.status(401).send({
                        success: false,
                        message: 'Token is not valid',
                    });
                }

                if (user.token !== token) {
                    logger.error(`[verifyToken] token not match`);
                    req.user = undefined;
                    return res.status(401).send({
                        success: false,
                        message: 'Token expired',
                    });
                }

                req.user = { userId: id };
                next();
            }
        });
    } else {
        req.user = undefined;
        res.status(401).send({
            success: false,
            message: 'Missing token',
        });
    }
}
