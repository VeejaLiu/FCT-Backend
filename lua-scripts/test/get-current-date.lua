require 'imports/career_mode/helpers'
require 'imports/other/helpers'
local json = require("imports/external/json")

local currentDate = GetCurrentDate()
print(currentDate.year)
print(currentDate.month)
print(currentDate.day)

local dateStr = string.format("%d-%d-%d", currentDate.year, currentDate.month, currentDate.day)
Log(string.format("Current Date: %s", dateStr))