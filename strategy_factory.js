var harvester = require('role.harvester')
var maintenance = require('role.maintenance')
var builder = require('role.builder')

var NEARLY_DEAD = 120;

module.exports = {
  get_strategy: function (creep) {
    if (creep.ticksToLive <= NEARLY_DEAD && creep.memory['role'] != 'maintenance') {
      creep.memory['old_role'] = creep.memory['role'];
      creep.memory['role'] = 'maintenance';
      return maintenance;
    } else if (creep.ticksToLive >= CREEP_LIFE_TIME && creep.memory['role'] == 'maintenance') {
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