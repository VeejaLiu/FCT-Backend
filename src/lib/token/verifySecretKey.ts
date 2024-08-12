import { doRawQuery } from '../../models';

/**
 * Verify secret key
 *
 * @param req
 * @param res
 * @param next
 */
export async function verifySecretKey(req: any, res: any, next: any) {
    const secretKey = req.headers['secret-key'];
    if (!secretKey || secretKey.length === 0) {
        return res.status(401).json({ message: 'Missing secret key' });
    }

    // query from the database
    const qRes = await doRawQuery(`SELECT * FROM user_secret_key WHERE secret_key = '${secretKey}' limit 1`);
    if (qRes.length === 0) {
        return res.status(401).json({ message: 'Missing secret key' });
    }

    const userId = qRes[0].user_id;
    req.user = { userId };

    next();
}
