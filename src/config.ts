const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  initAlivePercentage: Number(process.env.INITIAL_ALIVE_PERCENTAGE),
  gamePlanWidth: Number(process.env.GAME_PLAN_WIDTH),
  gamePlanHeight: Number(process.env.GAME_PLAN_HEIGHT),
}
