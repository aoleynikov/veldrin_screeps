var harvester = require('harvester')
var maintenance = require('maintenance')

var NEARLY_DEAD = 120;
var HEALTHY = 1000;

module.exports = {
  get_strategy: function (creep) {
    if (creep.ticksToLive <= NEARLY_DEAD) {
      creep.memory['old_role'] = creep.memory['role'];
      creep.memory['role'] = 'maintenance';
      return maintenance;
    } else if (creep.ticksToLive >= HEALTHY) {
      creep.memory['role'] = creep.memory['old_role'];
    }


    return harvester;
  }
}