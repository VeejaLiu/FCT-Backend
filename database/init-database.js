const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('mydatabase.db');

// 从sql文件读入sql语句
const fs = require('fs');
const path = require('path');
const logger = require("../tools/logger");
const sql = fs.readFileSync(path.join(__dirname, 'database.js')).toString();

async function initDatabase() {
    db.serialize(() => {
        db.run(sql);
    });
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