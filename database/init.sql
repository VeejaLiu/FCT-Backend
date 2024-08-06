CREATE TABLE IF NOT EXISTS save
(
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    saveUID     TEXT, -- 存档的唯一标识，31 char long string
    name        TEXT,
    description TEXT,
    created_at  INTEGER,
    updated_at  INTEGER
);
CREATE TABLE IF NOT EXISTS player
(
    id                      INTEGER PRIMARY KEY AUTOINCREMENT,
    save_id                 INTEGER,
    player_id               INTEGER,
    player_name             TEXT,    -- 球员名字
    birthdate               INTEGER,
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
    aggression              INTEGER,  -- 侵略性
    -- Goalkeeping 守门
    gkdiving                INTEGER, -- 扑救
    gkhandling              INTEGER, -- 手控
    gkkicking               INTEGER, -- 踢球
    gkpositioning           INTEGER, -- 位置
    gkreflexes              INTEGER  -- 反应
);

create index IF NOT EXISTS idx_player_id
    on player (player_id);

create index IF NOT EXISTS idx_save_id
    on player (save_id);

CREATE TABLE IF NOT EXISTS player_status_history
(
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    save_id      INTEGER,
    player_id    INTEGER,
    in_game_date INTEGER,
    overall      INTEGER,
    potential    INTEGER
);

alter table player
    add age integer;
