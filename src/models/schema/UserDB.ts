import Sequelize, { ModelAttributes, Model } from 'sequelize';
import { sequelize } from '../db-config-mysql';
import { Defaultconfig } from '../db-config-mysql';

/*
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` text COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` text COLLATE utf8mb4_general_ci NOT NULL,
  `token` text COLLATE utf8mb4_general_ci,
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
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    token: {
        type: Sequelize.TEXT,
    },
    create_time: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    update_time: {
        type: Sequelize.DATE,
        allowNull: false,
    },
};

class UserModel extends Model {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public token!: string;
    public create_time!: Date;
    public update_time!: Date;
}

UserModel.init(UserSchema, {
    ...Defaultconfig,
    sequelize,
    tableName: 'user',
});
