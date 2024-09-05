import Sequelize, { ModelAttributes, Model } from 'sequelize';
import { sequelize } from '../db-config-mysql';
import { Defaultconfig } from '../db-config-mysql';

/*
CREATE TABLE `player_stat_tracker` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `save_id` int DEFAULT NULL,
  `player_id` int DEFAULT NULL,
  `in_game_date` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `overallrating` int DEFAULT NULL,
  `potential` int DEFAULT NULL,
  `acceleration` int DEFAULT NULL,
  `sprintspeed` int DEFAULT NULL,
  `positioning` int DEFAULT NULL,
  `finishing` int DEFAULT NULL,
  `shotpower` int DEFAULT NULL,
  `longshots` int DEFAULT NULL,
  `volleys` int DEFAULT NULL,
  `penalties` int DEFAULT NULL,
  `vision` int DEFAULT NULL,
  `crossing` int DEFAULT NULL,
  `freekickaccuracy` int DEFAULT NULL,
  `shortpassing` int DEFAULT NULL,
  `longpassing` int DEFAULT NULL,
  `curve` int DEFAULT NULL,
  `agility` int DEFAULT NULL,
  `balance` int DEFAULT NULL,
  `reactions` int DEFAULT NULL,
  `ballcontrol` int DEFAULT NULL,
  `dribbling` int DEFAULT NULL,
  `composure` int DEFAULT NULL,
  `interceptions` int DEFAULT NULL,
  `headingaccuracy` int DEFAULT NULL,
  `defensiveawareness` int DEFAULT NULL,
  `standingtackle` int DEFAULT NULL,
  `slidingtackle` int DEFAULT NULL,
  `jumping` int DEFAULT NULL,
  `stamina` int DEFAULT NULL,
  `strength` int DEFAULT NULL,
  `aggression` int DEFAULT NULL,
  `gkdiving` int DEFAULT NULL,
  `gkhandling` int DEFAULT NULL,
  `gkkicking` int DEFAULT NULL,
  `gkpositioning` int DEFAULT NULL,
  `gkreflexes` int DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_player_id` (`player_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
 */
const PlayerStatTrackerSchema: ModelAttributes = {
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
        type: Sequelize.STRING,
    },
    overallrating: {
        type: Sequelize.INTEGER,
    },
    potential: {
        type: Sequelize.INTEGER,
    },
    acceleration: {
        type: Sequelize.INTEGER,
    },
    sprintspeed: {
        type: Sequelize.INTEGER,
    },
    positioning: {
        type: Sequelize.INTEGER,
    },
    finishing: {
        type: Sequelize.INTEGER,
    },
    shotpower: {
        type: Sequelize.INTEGER,
    },
    longshots: {
        type: Sequelize.INTEGER,
    },
    volleys: {
        type: Sequelize.INTEGER,
    },
    penalties: {
        type: Sequelize.INTEGER,
    },
    vision: {
        type: Sequelize.INTEGER,
    },
    crossing: {
        type: Sequelize.INTEGER,
    },
    freekickaccuracy: {
        type: Sequelize.INTEGER,
    },
    shortpassing: {
        type: Sequelize.INTEGER,
    },
    longpassing: {
        type: Sequelize.INTEGER,
    },
    curve: {
        type: Sequelize.INTEGER,
    },
    agility: {
        type: Sequelize.INTEGER,
    },
    balance: {
        type: Sequelize.INTEGER,
    },
    reactions: {
        type: Sequelize.INTEGER,
    },
    ballcontrol: {
        type: Sequelize.INTEGER,
    },
    dribbling: {
        type: Sequelize.INTEGER,
    },
    composure: {
        type: Sequelize.INTEGER,
    },
    interceptions: {
        type: Sequelize.INTEGER,
    },
    headingaccuracy: {
        type: Sequelize.INTEGER,
    },
    defensiveawareness: {
        type: Sequelize.INTEGER,
    },
    standingtackle: {
        type: Sequelize.INTEGER,
    },
    slidingtackle: {
        type: Sequelize.INTEGER,
    },
    jumping: {
        type: Sequelize.INTEGER,
    },
    stamina: {
        type: Sequelize.INTEGER,
    },
    strength: {
        type: Sequelize.INTEGER,
    },
    aggression: {
        type: Sequelize.INTEGER,
    },
    gkdiving: {
        type: Sequelize.INTEGER,
    },
    gkhandling: {
        type: Sequelize.INTEGER,
    },
    gkkicking: {
        type: Sequelize.INTEGER,
    },
    gkpositioning: {
        type: Sequelize.INTEGER,
    },
    gkreflexes: {
        type: Sequelize.INTEGER,
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

export class PlayerStatTrackerModel extends Model {
    public id!: number;
    public user_id!: number;
    public save_id!: number;
    public player_id!: number;
    public in_game_date!: string;
    public overallrating!: number;
    public potential!: number;
    public acceleration!: number;
    public sprintspeed!: number;
    public positioning!: number;
    public finishing!: number;
    public shotpower!: number;
    public longshots!: number;
    public volleys!: number;
    public penalties!: number;
    public vision!: number;
    public crossing!: number;
    public freekickaccuracy!: number;
    public shortpassing!: number;
    public longpassing!: number;
    public curve!: number;
    public agility!: number;
    public balance!: number;
    public reactions!: number;
    public ballcontrol!: number;
    public dribbling!: number;
    public composure!: number;
    public interceptions!: number;
    public headingaccuracy!: number;
    public defensiveawareness!: number;
    public standingtackle!: number;
    public slidingtackle!: number;
    public jumping!: number;
    public stamina!: number;
    public strength!: number;
    public aggression!: number;
    public gkdiving!: number;
    public gkhandling!: number;
    public gkkicking!: number;
    public gkpositioning!: number;
    public gkreflexes!: number;
    public is_deleted!: boolean;
    public create_time!: Date;
    public update_time!: Date;
}

PlayerStatTrackerModel.init(PlayerStatTrackerSchema, {
    ...Defaultconfig,
    sequelize,
    tableName: 'player_stat_tracker',
});
