var energy_behavior = require('behavior.get_resource');

module.exports = {
  perform: function (creep) {
    if (energy_behavior.perform(creep)) return;
    var storage = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
      filter: s => {
        return s.structureType == STRUCTURE_STORAGE && _.sum(s.store) < s.storeCapacity || creep.memory['resource'] == RESOURCE_ENERGY && s.structureType == STRUCTURE_LINK && s.energy < s.energyCapacity;
      }
    });

    if (creep.transfer(storage, creep.memory['resource']) == ERR_NOT_IN_RANGE) {
      creep.moveTo(storage);
    }

    if (creep.carry[creep.memory['resource']] == 0) {
      energy_behavior.refill(creep);
    }
  }
};