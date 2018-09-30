var creep_strategy_factory = require('strategy_factory')

module.exports.loop = function () {
  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    var strategy = creep_strategy_factory.get_strategy(creep);
    strategy.perform(creep);

    if (creep.memory['role'] == 'maintenance') {
      Game.spawns['Main'].renewCreep(creep);
    }
  }
}