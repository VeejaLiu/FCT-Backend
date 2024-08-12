import jwt from 'jsonwebtoken';
import { env } from '../../env';
import { doRawQuery } from '../../models';

const JWT_SECRET = env.secret.jwt;

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
export function verifyToken(req: any, res: any, next: any) {
    const token = req.headers.token;
    if (token) {
        jwt.verify(req.headers.token, JWT_SECRET, async function (err, decode) {
            if (err) {
                req.user = undefined;
                res.status(401).send({
                    success: false,
                    message: 'Token is not valid',
                });
            } else {
                const { id, iat, exp } = decode;

                if (Date.now() > exp * 1000) {
                    req.user = undefined;
                    res.status(401).send({
                        success: false,
                        message: 'Token expired',
                    });
                }

                // verify if the token matches database
                const databaseRes = await doRawQuery(`SELECT * FROM user WHERE id = ${id}`);
                if (databaseRes.length === 0) {
                    req.user = undefined;
                    res.status(401).send({
                        success: false,
                        message: 'Token is not valid',
                    });
                }

                if (databaseRes[0].token !== token) {
                    req.user = undefined;
                    res.status(401).send({
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
        res.status(401).send();
    }
}
