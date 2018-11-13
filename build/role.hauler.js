var energy_behavior = require('behavior.get_energy');

var storeEnergy = function (creep, storage) {
  var store = creep.transfer(storage, RESOURCE_ENERGY);

  if (store == ERR_NOT_IN_RANGE) {
    creep.moveTo(storage);
  } else if (store == 0 && creep.carry[RESOURCE_ENERGY] == 0) {
    energy_behavior.refill(creep);
  }
};

module.exports = {
  perform: function (creep) {
    if (energy_behavior.perform(creep)) return;

    storage = creep.pos.getClosestByRange(FIND_MY_STRUCTURE, {
      filter: s => {
        return s.structureType == STRUCTURE_STORAGE || s.structureType == STRUCTURE_LINK
      }
    });
    storeEnergy(creep, storage);
  }
};