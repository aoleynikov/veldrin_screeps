var dispatcher = require('strategy_dispatcher');
var buildings_manager = require('buildings_manager');
var doctor = require('doctor');
var population = require('population');

module.exports.loop = function () {
  Game.spawns['Main'].memory['population'] = population;
  
  doctor.check();

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    var strategy = dispatcher.get_strategy(creep);
    strategy.perform(creep);

    if (creep.memory['role'] == 'maintenance') {
      Game.spawns['Main'].renewCreep(creep);
    }
  }

  buildings_manager.run(Game.spawns['Main'].room);
}