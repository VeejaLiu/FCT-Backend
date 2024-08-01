import express from 'express';

const router = express.Router();

router.use('/player', require('./player').default);

export default router;
