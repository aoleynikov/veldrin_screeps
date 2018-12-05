var energy_behavior = require('behavior.get_resource');
var room_travel = require('behavior.room_travel');

var select_storage = function (creep) {
  var result = creep.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: function (s) {
      return s.energy < s.energyCapacity &&
          (s.structureType == STRUCTURE_SPAWN ||
          s.structureType == STRUCTURE_EXTENSION);
    }
  });
  if (result) return result;
  return creep.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: function (s) {
      return s.energy < s.energyCapacity &&
        (s.structureType == STRUCTURE_TOWER);
    }
  });
};

var store = function (creep) {
  var storage = select_storage(creep);
  if (!storage) {
    if (creep.carry[RESOURCE_ENERGY] < creep.carryCapacity) {
      energy_behavior.refill(creep);
    } else {
      creep.moveTo(creep.pos.findClosestByRange(FIND_MY_SPAWNS));
    }
  }
  var work = creep.transfer(storage, RESOURCE_ENERGY);
  if (work == ERR_NOT_IN_RANGE) {
    creep.moveTo(storage, { visualizePathStyle: {
      fill: 'green',
      stroke: '#fff',
      lineStyle: 'dashed',
      strokeWidth: .15,
      opacity: .1
  }});
  } else if (work == ERR_NOT_ENOUGH_ENERGY) {
    energy_behavior.refill(creep);
  }
};

module.exports = {
  perform: function (creep) {
    if (room_travel.perform(creep)) return;
    if (energy_behavior.perform(creep)) return;
    store(creep);
  }
}