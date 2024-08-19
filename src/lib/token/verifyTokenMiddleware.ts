import jwt from 'jsonwebtoken';
import { env } from '../../env';
import { doRawQuery } from '../../models';
import { Logger } from '../logger';

const JWT_SECRET = env.secret.jwt;

const logger = new Logger(__filename);

export function testVerifyToken(token: string) {
    const result = jwt.verify(token, JWT_SECRET);
    console.log(result);
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
                const databaseRes = await doRawQuery(`SELECT * FROM user WHERE id = ${id}`);
                if (databaseRes.length === 0) {
                    logger.error(`[verifyToken] user[${id}] not found`);
                    req.user = undefined;
                    return res.status(401).send({
                        success: false,
                        message: 'Token is not valid',
                    });
                }

                if (databaseRes[0].token !== token) {
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
