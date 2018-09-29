var strategy_factory = require('strategy_factory')

module.exports.loop = function () {
  for (var i = 0; i < Game.creeps.length; ++i) {
    var creep = Game.creeps[i];
    var strategy = strategy_factory.get_strategy(creep);
    strategy.peform()
  }
}