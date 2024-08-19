import Sequelize, { ModelAttributes, Model } from 'sequelize';
import { sequelize } from '../db-config-mysql';
import { Defaultconfig } from '../db-config-mysql';

/*
CREATE TABLE `user_secret_key` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `secret_key` text COLLATE utf8mb4_general_ci,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
 */
const UserSecretKeySchema: ModelAttributes = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
    },
    secret_key: {
        type: Sequelize.TEXT,
    },
    create_time: {
        type: Sequelize.DATE,
    },
    update_time: {
        type: Sequelize.DATE,
    },
};

class UserSecretKey extends Model {
    public id!: number;
    public user_id!: number;
    public secret_key!: string;
    public create_time!: Date;
    public update_time!: Date;
}

UserSecretKey.init(UserSecretKeySchema, {
    ...Defaultconfig,
    sequelize,
    tableName: 'user_secret_key',
});
