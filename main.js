const express = require('express');
const {initDatabase, closeDatabase} = require("./database/init-database");
const logger = require("./tools/logger");

async function main() {


    const app = express();
    const PORT = 3000;

    // 初始化数据库
    await initDatabase().then(() => {
        logger.info('Database initialized');
    }).catch((err) => {
        logger.error('Error initializing database:', err);
        process.exit(1);
    });

    // 中间件：解析 JSON 请求体
    app.use(express.json());

    // 初始化数据库

    // 关闭数据库连接
    process.on('SIGINT', async () => {
        logger.info('Received SIGINT.');
        await closeDatabase();
        process.exit();
    });

    // 启动服务器
    app.listen(PORT, () => {
        logger.info(`Server is running on http://localhost:${PORT}`);
    });
}

main().catch((err) => {
    logger.error('Error starting server:', err);
    process.exit(1);
});