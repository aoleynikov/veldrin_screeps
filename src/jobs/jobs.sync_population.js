var population = require('population');

module.exports = {
  period: 100,
  execute: function () {
    Game.spawns['Main'].memory['population'] = population;
  }
}