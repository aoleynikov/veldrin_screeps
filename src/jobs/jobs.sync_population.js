var populaiotn = require('population');

module.exports = {
  period: 100,
  execute: function () {
    Game.spawns['Main'].memory['populaiton'] = population;
  }
}