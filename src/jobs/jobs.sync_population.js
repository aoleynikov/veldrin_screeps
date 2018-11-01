var population = require('population');

module.exports = {
  period: 5,
  execute: function () {
    Game.spawns['Main'].memory['population'] = population;
  }
}