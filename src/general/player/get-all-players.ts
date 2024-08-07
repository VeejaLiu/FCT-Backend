import { sequelize } from '../../models/db-config';
import { QueryTypes } from 'sequelize';
import { Logger } from '../../lib/logger';

const logger = new Logger(__filename);

const PLAYER_PRIMARY_POS_NAME = {
    0: 'GK',
    1: 'SW',
    2: 'RWB',
    3: 'RB',
    4: 'RCB',
    5: 'CB',
    6: 'LCB',
    7: 'LB',
    8: 'LWB',
    9: 'RDM',
    10: 'CDM',
    11: 'LDM',
    12: 'RM',
    13: 'RCM',
    14: 'CM',
    15: 'LCM',
    16: 'LM',
    17: 'RAM',
    18: 'CAM',
    19: 'LAM',
    20: 'RF',
    21: 'CF',
    22: 'LF',
    23: 'RW',
    24: 'RS',
    25: 'ST',
    26: 'LS',
    27: 'LW',
};

const PLAYER_PRIMARY_POS_TYPE = {
    0: 'GK',
    1: 'DEF',
    2: 'DEF',
    3: 'DEF',
    4: 'DEF',
    5: 'DEF',
    6: 'DEF',
    7: 'DEF',
    8: 'DEF',
    9: 'MID',
    10: 'MID',
    11: 'MID',
    12: 'MID',
    13: 'MID',
    14: 'MID',
    15: 'MID',
    16: 'MID',
    17: 'MID',
    18: 'MID',
    19: 'MID',
    20: 'FOR',
    21: 'FOR',
    22: 'FOR',
    23: 'FOR',
    24: 'FOR',
    25: 'FOR',
    26: 'FOR',
    27: 'FOR',
};

export async function getAllPlayers() {
    const sqlRes: any[] = await sequelize.query('SELECT * FROM player', { type: QueryTypes.SELECT, raw: true });
    logger.info(`[API_LOGS][/player] ${sqlRes.length} players found`);

    const result = [];
    for (let i = 0; i < sqlRes.length; i++) {
        const player = sqlRes[i];
        const birthdate = player.birthdate;
        result.push({
            playerID: player.player_id,
            playerName: player.player_name,
            overallRating: player.overallrating,
            potential: player.potential,
            age: player.age,
            birthdate: player.birthdate,
            positionType: PLAYER_PRIMARY_POS_TYPE[player.preferredposition1],
            position1: PLAYER_PRIMARY_POS_NAME[player.preferredposition1],
            position2: PLAYER_PRIMARY_POS_NAME[player.preferredposition2],
            position3: PLAYER_PRIMARY_POS_NAME[player.preferredposition3],
            position4: PLAYER_PRIMARY_POS_NAME[player.preferredposition4],
        });
    }

    return result;
}
