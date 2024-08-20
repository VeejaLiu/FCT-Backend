import Sequelize, { ModelAttributes, Model } from 'sequelize';
import { sequelize } from '../db-config-mysql';
import { Defaultconfig } from '../db-config-mysql';

/*
CREATE TABLE `player_status_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `save_id` int DEFAULT NULL,
  `player_id` int DEFAULT NULL,
  `in_game_date` int DEFAULT NULL,
  `overallrating` int DEFAULT NULL,
  `potential` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_player_id` (`player_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
 */
const PlayerStatusHistorySchema: ModelAttributes = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
    },
    save_id: {
        type: Sequelize.INTEGER,
    },
    player_id: {
        type: Sequelize.INTEGER,
    },
    in_game_date: {
        type: Sequelize.INTEGER,
    },
    overallrating: {
        type: Sequelize.INTEGER,
    },
    potential: {
        type: Sequelize.INTEGER,
    },
};

class PlayerStatusHistoryModel extends Model {
    public id!: number;
    public user_id!: number;
    public save_id!: number;
    public player_id!: number;
    public in_game_date!: number;
    public overallrating!: number;
    public potential!: number;
}

PlayerStatusHistoryModel.init(PlayerStatusHistorySchema, {
    ...Defaultconfig,
    sequelize,
    tableName: 'player_status_history',
});
