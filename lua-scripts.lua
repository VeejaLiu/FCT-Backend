require 'imports/career_mode/helpers'
require 'imports/other/helpers'
local json = require("imports/external/json")

local attributeNameList = {
    "birthdate",
    "overallrating",
    "potential",
    "nationality",
    "height",
    "weight",
    "preferredfoot",
    "preferredposition1",
    "preferredposition2",
    "preferredposition3",
    "preferredposition4",
    "skillmoves",
    "weakfootabilitytypecode",
    "attackingworkrate",
    "defensiveworkrate",
    -- pace
    "acceleration",
    "sprintspeed",
    -- attacking
    "positioning",
    "finishing",
    "shotpower",
    "longshots",
    "volleys",
    "penalties",
    -- passing
    "vision",
    "crossing",
    "freekickaccuracy",
    "shortpassing",
    "longpassing",
    "curve",
    -- dribbling
    "agility",
    "balance",
    "reactions",
    "ballcontrol",
    "dribbling",
    "composure",
    -- defending
    "interceptions",
    "headingaccuracy",
    "defensiveawareness",
    "standingtackle",
    "slidingtackle",
    -- physical
    "jumping",
    "stamina",
    "strength",
    "aggression",
    -- goalkeeping
    "gkdiving",
    "gkhandling",
    "gkkicking",
    "gkpositioning",
    "gkreflexes",
    -- other
}

function GetUserSeniorTeamPlayerIDs()
    local result = {}
    local userTeamID = GetUserTeamID()
    Log(string.format("User Team ID: %d", userTeamID))

    -- From this table should be the quickest I guess
    local careerPlayerContractTable = LE.db:GetTable("career_playercontract")
    local current_record = careerPlayerContractTable:GetFirstRecord()
    local c = 1
    while current_record > 0 do
        local teamID = careerPlayerContractTable:GetRecordFieldValue(current_record, "teamid")
        if teamID == userTeamID then
            local playerID = careerPlayerContractTable:GetRecordFieldValue(current_record, "playerid")
            result[playerID] = true
            Log(string.format("%d: %d", c, playerID))
            c = c + 1
        end
        current_record = careerPlayerContractTable:GetNextValidRecord()
    end

    return result
end

-- Post to API
function postPlayers(jsonStr, dateStr)
    local command = 'curl -X POST -H "Content-Type: application/json"'

    -- Save to file, data from file
    local fileName = "fifa_career_dashboard_players-" .. dateStr .. ".json"
    local file = io.open(fileName, "w")
    file:write(jsonStr)
    file:close()
    command = command .. ' -d "@' .. fileName .. '"'

    -- -- data from string
    -- jsonStr = string.gsub(jsonStr, '"', '\\"')
    -- command = command .. ' -d "' .. jsonStr .. '"'

    -- Add URL
    command = command .. ' ' .. "http://localhost:8888/api/v1/player/bulk"

    Log('Command: ' .. command)

    -- Upload to API
    os.execute(command)

    -- delete file
    os.remove("fifa_career_dashboard_players.json")
end

function sendTeamPlayerAttr()
    local bIsInCM = IsInCM()
    if not bIsInCM then
        return
    end

    -- local saveUID = GetSaveUID()
    local currentDate = GetCurrentDate()
    local dateStr = string.format("%d-%d-%d", currentDate.year, currentDate.month, currentDate.day)
    Log(string.format("Current Date: %s", dateStr))

    local userTeamPlayerIDs = GetUserSeniorTeamPlayerIDs()
    local players_count = table_count(userTeamPlayerIDs)
    local updated_players = 0

    -- Get Players Table
    local players_table = LE.db:GetTable("players")
    local current_record = players_table:GetFirstRecord()

    local jsonStr = ""
    jsonStr = jsonStr .. "["
    -- now is [

    local playerID = 0
    while current_record > 0 do
        playerID = players_table:GetRecordFieldValue(current_record, "playerid")
        if userTeamPlayerIDs[playerID] then
            local currentPlayerJsonStr = ""

            currentPlayerJsonStr = currentPlayerJsonStr .. "{"
            -- now currentPlayerJsonStr is '{'

            -- add playerID
            currentPlayerJsonStr = currentPlayerJsonStr .. string.format('"playerID": %d', playerID)
            -- add playerName
            local playerName = GetPlayerName(playerID)
            currentPlayerJsonStr = currentPlayerJsonStr .. string.format(', "playerName": "%s"', playerName)
            -- add current date
            currentPlayerJsonStr = currentPlayerJsonStr .. string.format(', "currentDate": "%s"', dateStr)
            -- now currentPlayerJsonStr is {"playerID": playerID, "playerName": "playerName", "currentDate": "dateStr"

            -- get all attributes
            for i, attrName in ipairs(attributeNameList) do
                local attrValue = players_table:GetRecordFieldValue(current_record, attrName)
                currentPlayerJsonStr = currentPlayerJsonStr .. string.format(', "%s": "%s"', attrName, attrValue)
                -- now currentPlayerJsonStr is {"playerID": playerID, "playerName": "playerName", "currentDate": "dateStr", "attrName": "attrValue"
            end

            currentPlayerJsonStr = currentPlayerJsonStr .. "}"
            -- now currentPlayerJsonStr is {"playerID": playerID, "playerName": "playerName", "currentDate": "dateStr", "attrName": "attrValue"}

            updated_players = updated_players + 1
            jsonStr = jsonStr .. currentPlayerJsonStr
            -- now jsonStr is [{"playerID": playerID, "playerName": "playerName", "currentDate": "dateStr", "attrName": "attrValue"}
            if (updated_players < players_count) then
                jsonStr = jsonStr .. ","
                -- now jsonStr is [{...},
            end
        end
        if (updated_players == players_count) then
            jsonStr = jsonStr .. "]"
            -- now jsonStr is [{...}, ..., {...}]
            postPlayers(jsonStr, dateStr)
            return
        end
        current_record = players_table:GetNextValidRecord()
    end
end

function OnEvent(events_manager, event_id, event)
    if (
            event_id == ENUM_CM_EVENT_MSG_WEEK_PASSED
    ) then
        sendTeamPlayerAttr()
    end
end

--sendTeamPlayerAttr()
AddEventHandler("post__CareerModeEvent", OnEvent)
