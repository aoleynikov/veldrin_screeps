var energy_behavior = require('behavior.get_energy');

var storages = require('structure.storage');

var storeEnergy = function (creep, storage) {
  var store = creep.transfer(storage, RESOURCE_ENERGY);

  if (store == ERR_NOT_IN_RANGE) {
    creep.moveTo(storage);
  } else if (store == 0) {
    energy_behavior.refill(creep);
  }
};

module.exports = {
  perform: function (creep) {
    if (energy_behavior.perform(creep)) return;

    if (creep.carry[RESOURCE_ENERGY] == 0) {
      energy_behavior.refill(creep);
      return;
    }

    var link_id = creep.memory['link_id'];

    if (link_id) {
      var link = Game.getObjectById(link_id);

      if (link && link.energy < link.energyCapacity) {
        storeEnergy(creep, link);
        return;
      }
    }

    var storage = storages.get(creep.room);
    if (storage.length == 0) return;
    storeEnergy(creep, storage[0]);
  }
};