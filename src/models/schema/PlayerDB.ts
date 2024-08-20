import Sequelize, { ModelAttributes, Model } from 'sequelize';
import { sequelize } from '../db-config-mysql';
import { Defaultconfig } from '../db-config-mysql';

/*
create table player
(
    id                      int auto_increment
        primary key,
    user_id                 int           not null,
    save_id                 int           null,
    player_id               int           null,
    player_name             text          null,
    birthdate               int           null,
    age                     int           null,
    overallrating           int           null,
    potential               int           null,
    nationality             text          null,
    height                  int           null,
    weight                  int           null,
    preferredfoot           text          null,
    preferredposition1      text          null,
    preferredposition2      text          null,
    preferredposition3      text          null,
    preferredposition4      text          null,
    skillmoves              int           null,
    weakfootabilitytypecode int           null,
    attackingworkrate       text          null,
    defensiveworkrate       text          null,
    acceleration            int           null,
    sprintspeed             int           null,
    positioning             int           null,
    finishing               int           null,
    shotpower               int           null,
    longshots               int           null,
    volleys                 int           null,
    penalties               int           null,
    vision                  int           null,
    crossing                int           null,
    freekickaccuracy        int           null,
    shortpassing            int           null,
    longpassing             int           null,
    curve                   int           null,
    agility                 int           null,
    balance                 int           null,
    reactions               int           null,
    ballcontrol             int           null,
    dribbling               int           null,
    composure               int           null,
    interceptions           int           null,
    headingaccuracy         int           null,
    defensiveawareness      int           null,
    standingtackle          int           null,
    slidingtackle           int           null,
    jumping                 int           null,
    stamina                 int           null,
    strength                int           null,
    aggression              int           null,
    gkdiving                int           null,
    gkhandling              int           null,
    gkkicking               int           null,
    gkpositioning           int           null,
    gkreflexes              int           null,
    is_archived             int default 0 null
);
 */
const PlayerSchema: ModelAttributes = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    save_id: {
        type: Sequelize.INTEGER,
    },
    player_id: {
        type: Sequelize.INTEGER,
    },
    player_name: {
        type: Sequelize.TEXT,
    },
    birthdate: {
        type: Sequelize.INTEGER,
    },
    age: {
        type: Sequelize.INTEGER,
    },
    overallrating: {
        type: Sequelize.INTEGER,
    },
    potential: {
        type: Sequelize.INTEGER,
    },
    nationality: {
        type: Sequelize.TEXT,
    },
    height: {
        type: Sequelize.INTEGER,
    },
    weight: {
        type: Sequelize.INTEGER,
    },
    preferredfoot: {
        type: Sequelize.TEXT,
    },
    preferredposition1: {
        type: Sequelize.TEXT,
    },
    preferredposition2: {
        type: Sequelize.TEXT,
    },
    preferredposition3: {
        type: Sequelize.TEXT,
    },
    preferredposition4: {
        type: Sequelize.TEXT,
    },
    skillmoves: {
        type: Sequelize.INTEGER,
    },
    weakfootabilitytypecode: {
        type: Sequelize.INTEGER,
    },
    attackingworkrate: {
        type: Sequelize.TEXT,
    },
    defensiveworkrate: {
        type: Sequelize.TEXT,
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
    is_archived: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
};

export class PlayerModel extends Model {
    public id!: number;
    public user_id!: number;
    public save_id!: number | null;
    public player_id!: number | null;
    public player_name!: string | null;
    public birthdate!: number | null;
    public age!: number | null;
    public overallrating!: number | null;
    public potential!: number | null;
    public nationality!: string | null;
    public height!: number | null;
    public weight!: number | null;
    public preferredfoot!: string | null;
    public preferredposition1!: string | null;
    public preferredposition2!: string | null;
    public preferredposition3!: string | null;
    public preferredposition4!: string | null;
    public skillmoves!: number | null;
    public weakfootabilitytypecode!: number | null;
    public attackingworkrate!: string | null;
    public defensiveworkrate!: string | null;
    public acceleration!: number | null;
    public sprintspeed!: number | null;
    public positioning!: number | null;
    public finishing!: number | null;
    public shotpower!: number | null;
    public longshots!: number | null;
    public volleys!: number | null;
    public penalties!: number | null;
    public vision!: number | null;
    public crossing!: number | null;
    public freekickaccuracy!: number | null;
    public shortpassing!: number | null;
    public longpassing!: number | null;
    public curve!: number | null;
    public agility!: number | null;
    public balance!: number | null;
    public reactions!: number | null;
    public ballcontrol!: number | null;
    public dribbling!: number | null;
    public composure!: number | null;
    public interceptions!: number | null;
    public headingaccuracy!: number | null;
    public defensiveawareness!: number | null;
    public standingtackle!: number | null;
    public slidingtackle!: number | null;
    public jumping!: number | null;
    public stamina!: number | null;
    public strength!: number | null;
    public aggression!: number | null;
    public gkdiving!: number | null;
    public gkhandling!: number | null;
    public gkkicking!: number | null;
    public gkpositioning!: number | null;
    public gkreflexes!: number | null;
    public is_archived!: number;
}

// Define the model with Sequelize
PlayerModel.init(PlayerSchema, {
    ...Defaultconfig,
    sequelize, // the sequelize instance
    tableName: 'player',
});
