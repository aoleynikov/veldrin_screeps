var dispatcher = require('strategy_dispatcher');
var spawn_manager = require('upgrade_manager');
var buildings_manager = require('buildings_manager');
var spawn_command = require('command.spawn');

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
  buildings_manager.run(Game.rooms['W46S47']);
  spawn_command.execute();
}