import Sequelize, { Model, ModelAttributes, Op } from 'sequelize';
import { Defaultconfig, sequelize } from '../db-config-mysql';
import { doRawQuery } from '../index';

/*
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `token` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `is_deleted` tinyint(1) DEFAULT '0',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
 */
const UserSchema: ModelAttributes = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: Sequelize.TEXT,
    },
    email: {
        type: Sequelize.STRING(255),
    },
    password: {
        type: Sequelize.TEXT,
    },
    token: {
        type: Sequelize.TEXT,
    },
    is_deleted: {
        type: Sequelize.BOOLEAN,
    },
    create_time: {
        type: Sequelize.DATE,
    },
    update_time: {
        type: Sequelize.DATE,
    },
};

export class UserModel extends Model {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public token!: string;
    public is_deleted!: boolean;
    public create_time!: Date;
    public update_time!: Date;

    public static async getRawByID({ id }: { id: number }) {
        const res = await UserModel.findOne({
            where: { id },
            raw: true,
        });
        if (!res) {
            throw new Error(`User not found with id: ${id}`);
        }
        return res;
    }

    public static async isUsernameOrEmailExist({
        username,
        email,
    }: {
        username: string;
        email: string;
    }): Promise<boolean> {
        const user = await doRawQuery(`
            select * from user
            where LOWER(username) = LOWER('${username}') or LOWER(email) = LOWER('${email}')
        `);
        return user.length > 0;
    }

    /**
     * Get daily new users count
     *
     * @param startDate - start date, format: 'YYYY-MM-DD'
     * @param endDate - end date, format: 'YYYY-MM-DD'
     *
     */
    static async getDailyNewUsersCount({
        startDate,
        endDate,
    }: {
        startDate: string;
        endDate: string;
    }): Promise<{ createDate: string; c: number }[]> {
        const result: { createDate: string; c: number }[] = await doRawQuery(
            `select count(*)                             as c,
                    DATE_FORMAT(create_time, '%Y-%m-%d') as createDate
             from user
             where DATE_FORMAT(create_time, '%Y-%m-%d') between '${startDate}' and '${endDate}'
             group by createDate
             order by createDate`,
        );
        return result;
    }
}

UserModel.init(UserSchema, {
    ...Defaultconfig,
    sequelize,
    tableName: 'user',
});
