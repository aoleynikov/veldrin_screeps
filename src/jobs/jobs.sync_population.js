var population = require('population');

module.exports = {
  period: 20,
  execute: function () {
    Game.spawns['Main'].memory['population'] = population;
  }
}