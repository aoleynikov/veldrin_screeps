var harvester = require('role.harvester');
var maintenance = require('role.maintenance');
var builder = require('role.builder');
var miner = require('role.miner');
var repairer = require('role.repairer');
var upgrader = require('role.upgrader');
var warrior = require('role.warrior')

roles = {
  'harvester': harvester,
  'maintenance': maintenance,
  'builder': builder,
  'miner': miner,
  'repairer': repairer,
  'upgrader': upgrader,
  'warrior': warrior
}

var NEARLY_DEAD = 120;

module.exports = {
  get_strategy: function (creep) {
    if (creep.ticksToLive <= NEARLY_DEAD && creep.memory['role'] != 'maintenance') {
      creep.memory['old_role'] = creep.memory['role'];
      creep.memory['role'] = 'maintenance';
      return maintenance;
    } else if (creep.ticksToLive >= CREEP_LIFE_TIME - 100 && creep.memory['role'] == 'maintenance') {
      creep.memory['role'] = creep.memory['old_role'];
    }

    strategy = roles[creep.memory['role']];
    return strategy || harvester;
  }
}