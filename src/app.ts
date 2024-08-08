import express, { ErrorRequestHandler } from 'express';
import index from './router';
import { Logger } from './lib/logger';
import { banner } from './lib/banner';
import { loadMonitor } from './loaders/loadMonitor';
import { loadWinston } from './loaders/winstonLoader';
import { env } from './env';
import { closeSequelize } from './models/db-config';
import { databaseUpgrade } from './models/database-upgrade';

async function Main() {
    // init database
    await databaseUpgrade().catch((e) => {
        console.error('Database upgrade failed:', e);
        process.exit();
    });

    const app = express();

    // 修复跨域问题
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
        next();
    });

    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true }));
    app.use('/api', index);

    loadMonitor(app);
    loadWinston();
    const log = new Logger(__filename);

    const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
        console.error(`[APP][Error] ${err.stack}`);
        res.status(500).send('Something broke!');
    };
    app.use(errorHandler);

    // 捕获未捕获的异常
    process.on('uncaughtException', (error) => {
        console.error('Uncaught Exception:', error);
    });

    // 捕获未处理的 Promise 拒绝
    process.on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    });

    // 关闭数据库连接
    process.on('SIGINT', async () => {
        console.log('Received SIGINT.');
        await closeSequelize();
        process.exit();
    });

    app.listen(env.app.port, () => {
        banner(log);
    });
}

Main().then(() => {
    console.log('Server started.');
});
