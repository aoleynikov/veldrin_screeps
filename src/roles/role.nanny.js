var towers = require('structure.tower');
var energy_behavior = require('behavior.get_energy');
var room_travel = reqiure('behavior.room_travel');

var select_storage = function (creep) {
  var tower = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, { filter: (s) => {
    return s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity;
  }});
  if (tower) return tower;
  
  return creep.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: function (s) {
      return s.energy < s.energyCapacity &&
        (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION);
    }
  });
};

var store = function (creep) {
  var storage = select_storage(creep);
  if (!storage) {
    if (creep.carry[RESOURCE_ENERGY] < creep.carryCapacity) {
      energy_behavior.refill(creep);
    } else {
      var flag = Game.flags['Nanny_base'];
      if (!flag) return;
      creep.moveTo(flag);
    }
  }
  var work = creep.transfer(storage, RESOURCE_ENERGY);
  if (work == ERR_NOT_IN_RANGE) {
    creep.moveTo(storage);
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