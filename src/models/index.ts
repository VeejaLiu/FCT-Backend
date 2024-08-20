import { Logger } from '../lib/logger';
import { sequelize } from './db-config-mysql';
import { QueryTypes } from 'sequelize';

const logger = new Logger(__filename);

export async function doRawQuery(query: string): Promise<any> {
    try {
        const res = await sequelize.query(query.replace(/\s+/g, ' '), {
            type: QueryTypes.SELECT,
            raw: true,
        });
        return res;
    } catch (e) {
        logger.error(`[doRawQuery] ${e}`);
        throw e;
    }
}

export async function doRawUpdate(query: string): Promise<any> {
    try {
        const res = await sequelize.query(query.replace(/\s+/g, ' '), {
            type: QueryTypes.UPDATE,
            raw: true,
        });
        return res;
    } catch (e) {
        logger.error(`[doRawUpdate] ${e}`);
        throw e;
    }
}

export async function doRawInsert(query: string): Promise<any> {
    try {
        const res = await sequelize.query(query.replace(/\s+/g, ' '), {
            type: QueryTypes.INSERT,
            raw: true,
        });
        return res;
    } catch (e) {
        logger.error(`[doRawInsert] ${e}`);
        throw e;
    }
}
