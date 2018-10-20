var dispatcher = require('strategy_dispatcher');

var spawn_manager = require('upgrade_manager');

var buildings_manager = require('buildings_manager');

var doctor = require('doctor');

module.exports.loop = function () {
  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    var strategy = dispatcher.get_strategy(creep);
    strategy.perform(creep);

    if (creep.memory['role'] == 'maintenance') {
      Game.spawns['Main'].renewCreep(creep);
    }
  }

  spawn_manager.run();
  buildings_manager.run(Game.spawns['Main'].room);
  doctor.check();
};