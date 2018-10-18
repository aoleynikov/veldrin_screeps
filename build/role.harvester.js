var towers = require('structure.tower');
var energy_behavior = require('behavior.get_energy');
var room_travel = require('behavior.room_travel');

var select_storage =  function (creep) {
  var twrs = towers.get(creep.room);
  for(var tower of twrs) {
    if(tower.energy < tower.energyCapacity) {
      return tower;
    }
  }

  return creep.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: function(s) {
      return s.energy < s.energyCapacity &&
        (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION);
    }
  });
};

var store = function (creep) {
  var storage = select_storage(creep);
  if (!storage) return;
  store = creep.transfer(storage, RESOURCE_ENERGY);
  if (store == ERR_NOT_IN_RANGE) {
    creep.moveTo(storage);
  } else if (store == ERR_NOT_ENOUGH_ENERGY) {
    energy_behavior.refill(creep);
  }
};

module.exports = {
  perform: function (creep) {
    energy_behavior.perform(creep, store);
  }
}