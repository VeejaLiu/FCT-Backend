import { Sequelize } from 'sequelize';
import { Logger } from '../lib/logger';

const logger = new Logger(__filename);

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'fifa-career.db',
});

export async function closeSequelize() {
    logger.info('Closing sequelize connection');
    await sequelize.close();
    logger.info('Sequelize connection closed');
}
