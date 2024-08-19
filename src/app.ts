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

    // Fix CORS issue
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

    // Open websocket server
    const WebSocket = require('ws');
    const wss = new WebSocket.Server({ port: 8889 });
    wss.on('connection', (socket, request) => {
        const protocol = request.headers['sec-websocket-protocol'];
        if (protocol === 'your-user-token') {
            socket.send('Protocol accepted');
        } else {
            socket.close(1002, 'Protocol not supported');
        }
    });

    // Fix unhandled promise rejection
    process.on('uncaughtException', (error) => {
        console.error('Uncaught Exception:', error);
    });

    // Catch unhandled promise rejection
    process.on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    });

    // Close sequelize connection on SIGINT
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
