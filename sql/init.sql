CREATE TABLE `player`
(
    `id`                      int NOT NULL AUTO_INCREMENT,
    `user_id`                 int NOT NULL,
    `save_id`                 int DEFAULT NULL,
    `player_id`               int DEFAULT NULL,
    `player_name`             text COLLATE utf8mb4_general_ci,
    `birthdate`               int DEFAULT NULL,
    `age`                     int DEFAULT NULL,
    `overallrating`           int DEFAULT NULL,
    `potential`               int DEFAULT NULL,
    `nationality`             text COLLATE utf8mb4_general_ci,
    `height`                  int DEFAULT NULL,
    `weight`                  int DEFAULT NULL,
    `preferredfoot`           text COLLATE utf8mb4_general_ci,
    `preferredposition1`      text COLLATE utf8mb4_general_ci,
    `preferredposition2`      text COLLATE utf8mb4_general_ci,
    `preferredposition3`      text COLLATE utf8mb4_general_ci,
    `preferredposition4`      text COLLATE utf8mb4_general_ci,
    `skillmoves`              int DEFAULT NULL,
    `weakfootabilitytypecode` int DEFAULT NULL,
    `attackingworkrate`       text COLLATE utf8mb4_general_ci,
    `defensiveworkrate`       text COLLATE utf8mb4_general_ci,
    `acceleration`            int DEFAULT NULL,
    `sprintspeed`             int DEFAULT NULL,
    `positioning`             int DEFAULT NULL,
    `finishing`               int DEFAULT NULL,
    `shotpower`               int DEFAULT NULL,
    `longshots`               int DEFAULT NULL,
    `volleys`                 int DEFAULT NULL,
    `penalties`               int DEFAULT NULL,
    `vision`                  int DEFAULT NULL,
    `crossing`                int DEFAULT NULL,
    `freekickaccuracy`        int DEFAULT NULL,
    `shortpassing`            int DEFAULT NULL,
    `longpassing`             int DEFAULT NULL,
    `curve`                   int DEFAULT NULL,
    `agility`                 int DEFAULT NULL,
    `balance`                 int DEFAULT NULL,
    `reactions`               int DEFAULT NULL,
    `ballcontrol`             int DEFAULT NULL,
    `dribbling`               int DEFAULT NULL,
    `composure`               int DEFAULT NULL,
    `interceptions`           int DEFAULT NULL,
    `headingaccuracy`         int DEFAULT NULL,
    `defensiveawareness`      int DEFAULT NULL,
    `standingtackle`          int DEFAULT NULL,
    `slidingtackle`           int DEFAULT NULL,
    `jumping`                 int DEFAULT NULL,
    `stamina`                 int DEFAULT NULL,
    `strength`                int DEFAULT NULL,
    `aggression`              int DEFAULT NULL,
    `gkdiving`                int DEFAULT NULL,
    `gkhandling`              int DEFAULT NULL,
    `gkkicking`               int DEFAULT NULL,
    `gkpositioning`           int DEFAULT NULL,
    `gkreflexes`              int DEFAULT NULL,
    `is_archived`             int DEFAULT '0',
    PRIMARY KEY (`id`),
    KEY `idx_user_id` (`user_id`),
    KEY `idx_player_id` (`player_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

CREATE TABLE `player_status_history`
(
    `id`            int NOT NULL AUTO_INCREMENT,
    `user_id`       int         DEFAULT NULL,
    `save_id`       int         DEFAULT NULL,
    `player_id`     int         DEFAULT NULL,
    `in_game_date`  varchar(20) DEFAULT NULL,
    `overallrating` int         DEFAULT NULL,
    `potential`     int         DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `idx_user_id` (`user_id`),
    KEY `idx_player_id` (`player_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

CREATE TABLE `user`
(
    `id`          int                                     NOT NULL AUTO_INCREMENT,
    `username`    text COLLATE utf8mb4_general_ci         NOT NULL,
    `email`       varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
    `password`    text COLLATE utf8mb4_general_ci         NOT NULL,
    `token`       text COLLATE utf8mb4_general_ci,
    `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
    `update_time` datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

CREATE TABLE `user_secret_key`
(
    `id`          int NOT NULL AUTO_INCREMENT,
    `user_id`     int      DEFAULT NULL,
    `secret_key`  text COLLATE utf8mb4_general_ci,
    `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
    `update_time` datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_user_id` (`user_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

alter table player_status_history
    add column is_deleted  tinyint(1) default 0,
    add column create_time datetime   default current_timestamp,
    add column update_time datetime   default current_timestamp on update current_timestamp;

alter table player
    add column is_deleted  tinyint(1) default 0,
    add column create_time datetime   default current_timestamp,
    add column update_time datetime   default current_timestamp on update current_timestamp;

alter table user
    add column is_deleted tinyint(1) default 0 after token;

alter table user_secret_key
    add column is_deleted tinyint(1) default 0 after secret_key;
