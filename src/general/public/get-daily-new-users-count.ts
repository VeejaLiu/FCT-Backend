import { UserModel } from '../../models/schema/UserDB';
import moment from 'moment-timezone';
import { Logger } from '../../lib/logger';

const logger = new Logger(__filename);

export async function getDailyNewUsersCount({ pastDays }: { pastDays: number }) {
    try {
        const endDate = moment().tz('UTC').startOf('day');
        const startDate = endDate.clone().subtract(pastDays - 1, 'days');

        const users: {
            date: string;
            count: number;
        }[] = await UserModel.getDailyNewUsersCount({
            startDate: startDate.format('YYYY-MM-DD'),
            endDate: endDate.format('YYYY-MM-DD'),
        });

        const result = [];
        for (let i = 0; i <= pastDays - 1; i++) {
            const date = endDate.clone().subtract(i, 'days').format('YYYY-MM-DD');
            const userCount = users.find((user: any) => user.date === date)?.count || 0;
            result.push({ date, count: userCount });
        }

        return result;
    } catch (e) {
        logger.error(`[getDailyNewUsersCount] e.message: ${e.message}`);
        logger.error(`[getDailyNewUsersCount] e.stack: ${e.stack}`);
    }
}
