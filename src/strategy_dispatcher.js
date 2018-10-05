var harvester = require('role.harvester');
var maintenance = require('role.maintenance');
var builder = require('role.builder');
var miner = require('role.miner');
var repairer = require('role.repairer');
var upgrader = require('role.upgrader');
var warrior = require('role.warrior');
var claimer = require('role.claimer');

var roles = {
  'harvester': harvester,
  'maintenance': maintenance,
  'builder': builder,
  'miner': miner,
  'repairer': repairer,
  'upgrader': upgrader,
  'warrior': warrior,
  'claimer': claimer
};

module.exports = {
  get_strategy: function (creep) {
    strategy = roles[creep.memory['role']];
    return strategy || harvester;
  }
}