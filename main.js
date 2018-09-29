var strategy_factory = require('strategy_factory')

module.exports.loop = function () {
  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    var strategy = strategy_factory.get_strategy(creep);
    strategy.peform(creep);
  }
}