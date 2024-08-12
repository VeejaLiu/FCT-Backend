import express from 'express';
import { Logger } from '../../lib/logger';
import { doRawQuery } from '../../models';
import bcrypt from 'bcryptjs';
import { registerUser } from '../../general/user/register';
import { loginUser } from '../../general/user/login';

const router = express.Router();
const logger = new Logger(__filename);

/**
 * User registration
 */
router.post('/register', async (req: any, res: any) => {
    const { username, email, password } = req.body;
    const result = await registerUser({
        username: username,
        email: email,
        password: password,
    });
    res.status(200).send(result);
});

router.post('/login', async (req: any, res: any) => {
    const { username, password } = req.body;
    const result = await loginUser({
        username: username,
        password: password,
    });
    res.status(200).send(result);
});

export default router;
