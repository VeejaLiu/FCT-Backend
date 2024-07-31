const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('mydatabase.db');

// 从sql文件读入sql语句
const fs = require('fs');
const path = require('path');
const logger = require("../tools/logger");
const sqls = require("./database");

async function initDatabase() {
    try {
        db.serialize(() => {
            for (let sql of sqls) {
                db.run(sql);
            }
        });
    } catch (e) {
        logger.error(`Error initializing database: ${e}`);
    }
    logger.info('Database initialized');
}

async function closeDatabase() {
    db.close();
    logger.info('Database connection closed.');
}

module.exports = {
    initDatabase,
    closeDatabase
}