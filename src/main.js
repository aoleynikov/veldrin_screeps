var dispatcher = require('strategy_dispatcher')
var spawn_manager = require('spawn_manager')

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
}