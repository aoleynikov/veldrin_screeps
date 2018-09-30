var harvester = require('role.harvester')
var maintenance = require('role.maintenance')
var builder = require('role.builder')

var NEARLY_DEAD = 120;
var HEALTHY = 1300;

module.exports = {
  get_strategy: function (creep) {
    if (creep.ticksToLive <= NEARLY_DEAD && creep.memory['role'] != 'maintenance') {
      creep.memory['old_role'] = creep.memory['role'];
      creep.memory['role'] = 'maintenance';
      return maintenance;
    } else if (creep.ticksToLive >= HEALTHY && creep.memory['role'] == 'maintenance') {
      creep.memory['role'] = creep.memory['old_role'];
    }

    switch (creep.memory['role']) {
      case 'harvester':
        return harvester;
      case 'maintenance':
        return maintenance;
      case 'builder':
        return builder
    }

    return harvester;
  }
}