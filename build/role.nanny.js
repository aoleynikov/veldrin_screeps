var towers = require('structure.tower');

var energy_behavior = require('behavior.get_energy');

var move = require('behavior.move');

var select_storage = function (creep) {
  var twrs = towers.get(creep.room);

  for (var tower of twrs) {
    if (tower.energy < tower.energyCapacity) {
      return tower;
    }
  }

  return creep.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: function (s) {
      return s.energy < s.energyCapacity && (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION);
    }
  });
};

var store = function (creep) {
  var storage = select_storage(creep);
  if (!storage) return;
  var work = creep.transfer(storage, RESOURCE_ENERGY);

  if (work == ERR_NOT_IN_RANGE) {
    move.perform(creep, storage.pos);
  } else if (work == ERR_NOT_ENOUGH_ENERGY) {
    energy_behavior.refill(creep);
  }
};

module.exports = {
  perform: function (creep) {
    if (energy_behavior.perform(creep)) return;
    store(creep);
  }
};