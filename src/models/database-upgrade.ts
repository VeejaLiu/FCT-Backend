import { doRawInsert, doRawQuery, doRawUpdate } from './index';

const sql = [
    {
        version: 0,
        sql: [
            `CREATE TABLE IF NOT EXISTS save
             (
                 id          INTEGER PRIMARY KEY AUTOINCREMENT,
                 saveUID     TEXT, -- 存档的唯一标识，31 char long string
                 name        TEXT,
                 description TEXT,
                 created_at  INTEGER,
                 updated_at  INTEGER
             )`,
            `CREATE TABLE IF NOT EXISTS player
             (
                 id                      INTEGER PRIMARY KEY AUTOINCREMENT,
                 save_id                 INTEGER,
                 player_id               INTEGER,
                 player_name             TEXT,    -- 球员名字
                 birthdate               INTEGER, -- 出生日期, 儒略日历
                 age                     INTEGER, -- 年龄
                 overallrating           INTEGER, -- 总评, Overall Rating
                 potential               INTEGER, -- 潜力, Potential

                 nationality             TEXT,    -- 国籍

                 height                  INTEGER, -- 身高
                 weight                  INTEGER, -- 体重

                 preferredfoot           TEXT,    -- 惯用脚

                 preferredposition1      TEXT,    -- 首选位置1
                 preferredposition2      TEXT,    -- 首选位置2
                 preferredposition3      TEXT,    -- 首选位置3
                 preferredposition4      TEXT,    -- 首选位置4

                 skillmoves              INTEGER, -- 花式技巧
                 weakfootabilitytypecode INTEGER, -- 弱脚能力类型代码

                 attackingworkrate       TEXT,    -- 进攻工作率
                 defensiveworkrate       TEXT,    -- 防守工作率

                 -- Pace 速度
                 acceleration            INTEGER, -- 加速度
                 sprintspeed             INTEGER, -- 冲刺速度
                 -- Attacking 进攻
                 positioning             INTEGER, -- 进攻位置
                 finishing               INTEGER, -- 射门
                 shotpower               INTEGER, -- 射门力量
                 longshots               INTEGER, -- 远射
                 volleys                 INTEGER, -- 凌空抽射
                 penalties               INTEGER, -- 点球
                 -- Passing 传球
                 vision                  INTEGER, -- 视野
                 crossing                INTEGER, -- 传中
                 freekickaccuracy        INTEGER, -- 任意球精准度
                 shortpassing            INTEGER, -- 短传
                 longpassing             INTEGER, -- 长传
                 curve                   INTEGER, -- 弧线
                 -- Dribbling 盘带
                 agility                 INTEGER, -- 敏捷
                 balance                 INTEGER, -- 平衡
                 reactions               INTEGER, -- 反应
                 ballcontrol             INTEGER, -- 控球
                 dribbling               INTEGER, -- 盘带
                 composure               INTEGER, -- 从容
                 -- Defending 防守
                 interceptions           INTEGER, -- 抢断
                 headingaccuracy         INTEGER, -- 头球精准度
                 defensiveawareness      INTEGER, -- 防守意识
                 standingtackle          INTEGER, -- 逼抢
                 slidingtackle           INTEGER, -- 铲球
                 -- Physical 体能
                 jumping                 INTEGER, -- 弹跳
                 stamina                 INTEGER, -- 体力
                 strength                INTEGER, -- 强壮
                 aggression              INTEGER, -- 侵略性
                 -- Goalkeeping 守门
                 gkdiving                INTEGER, -- 扑救
                 gkhandling              INTEGER, -- 手控
                 gkkicking               INTEGER, -- 踢球
                 gkpositioning           INTEGER, -- 位置
                 gkreflexes              INTEGER, -- 反应

                 is_archived             INTEGER DEFAULT 0
             )`,
            `create index IF NOT EXISTS idx_player_id
                on player (player_id)`,
            `create index IF NOT EXISTS idx_save_id
                on player (save_id)`,
            `CREATE TABLE IF NOT EXISTS player_status_history
             (
                 id           INTEGER PRIMARY KEY AUTOINCREMENT,
                 save_id      INTEGER,
                 player_id    INTEGER,
                 in_game_date INTEGER,
                 overall      INTEGER,
                 potential    INTEGER
             )`,
        ],
    },
];

export async function databaseUpgrade() {
    // Add new table - db_version
    console.log('[databaseUpgrade] Start database upgrade');
    await doRawUpdate(`CREATE TABLE IF NOT EXISTS db_version(version INTEGER PRIMARY KEY)`);
    console.log('[databaseUpgrade] version table initialized');

    let existingVersion = -1;

    // query to get current version
    console.log('[databaseUpgrade] Check current database version');
    const existingVersionRes: any[] = await doRawQuery('SELECT version FROM db_version limit 1');
    if (existingVersionRes.length > 0) {
        existingVersion = existingVersionRes[0]?.version;
        console.log(`[databaseUpgrade] Current database version: ${existingVersion}`);
    } else {
        console.log('[databaseUpgrade] No version found');
    }

    const maxVersion = sql[sql.length - 1].version;
    if (existingVersion === maxVersion) {
        console.log('[databaseUpgrade] Database is already up to date');
        return;
    }

    const startVersion = existingVersion + 1;
    console.log(`[databaseUpgrade] Will start upgrade from version ${startVersion}`);

    // Upgrade database
    for (let i = startVersion; i < sql.length; i++) {
        console.log(`[databaseUpgrade] start upgrade to version [${sql[i].version}]`);
        const version = sql[i].version;
        const queries = sql[i].sql;
        console.log(`[databaseUpgrade][${version}] Need to run ${queries.length} queries`);
        for (let j = 0; j < queries.length; j++) {
            console.log(`[databaseUpgrade][${version}] Running query ${j + 1}`);
            const query = queries[j];
            await doRawUpdate(query);
            console.log(`[databaseUpgrade][${version}] Query ${j + 1} completed`);
        }
        console.log(`[databaseUpgrade][${version}] upgrade completed`);

        await doRawInsert(`INSERT INTO db_version (version) VALUES (${version})`);
        console.log(`[databaseUpgrade][${version}] db_version updated to ${version}`);
    }

    console.log('[databaseUpgrade] All database change upgrade completed');
}
