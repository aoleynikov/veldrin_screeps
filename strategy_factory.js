var harvester = require('harvester')
var maintenance = require('maintenance')

var NEARLY_DEAD = 120;

module.exports = {
  get_strategy: function (creep) {
    if (creep.ticksToLive <= NEARLY_DEAD) {
      return maintenance;
    }
    return harvester;
  }
}