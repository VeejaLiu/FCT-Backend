import { Logger } from '../lib/logger';
import { sequelize } from './db-config';
import { QueryTypes } from 'sequelize';

const logger = new Logger(__filename);

export async function doRawQuery(query: string) {
    try {
        const res = await sequelize.query(query, {
            type: QueryTypes.SELECT,
            raw: true,
        });
        return res;
    } catch (e) {
        logger.error(`[doRawQuery] ${e}`);
    }
}

export async function doRawUpdate(query: string) {
    try {
        const res = await sequelize.query(query, {
            type: QueryTypes.UPDATE,
            raw: true,
        });
        return res;
    } catch (e) {
        logger.error(`[doRawUpdate] ${e}`);
    }
}

export async function doRawInsert(query: string) {
    try {
        const res = await sequelize.query(query, {
            type: QueryTypes.INSERT,
            raw: true,
        });
        return res;
    } catch (e) {
        logger.error(`[doRawInsert] ${e}`);
    }
}
