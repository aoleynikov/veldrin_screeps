var dispatcher = require('strategy_dispatcher');
var upgrade_manager = require('upgrade_manager');
var buildings_manager = require('buildings_manager');
var doctor = require('doctor');
var population = require('population');
var jobs = require('jobs.executor');

module.exports.loop = function () {
  if (Game.spawns['Main'].memory['population'] === undefined) {
    Game.spawns['Main'].memory['population'] = population;
  }

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    var strategy = dispatcher.get_strategy(creep);
    strategy.perform(creep);

    if (creep.memory['role'] == 'maintenance') {
      Game.spawns['Main'].renewCreep(creep);
    }
  }

  //upgrade_manager.run();
  buildings_manager.run(Game.spawns['Main'].room);
  doctor.check();
  //jobs.run();
}