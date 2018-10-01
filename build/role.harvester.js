var room_wrapper = require('room_wrapper');

var strategy = {
  harvest: function (creep) {
    var provider = room_wrapper.get_closest_energy_provider(creep.room, creep.pos);
    var work_result = undefined;

    if (provider.structureType == STRUCTURE_STORAGE) {
      work_result = creep.withdraw(provider, RESOURCE_ENERGY);
    } else {
      work_result = creep.harvest(provider);
    }

    if (work_result == ERR_NOT_IN_RANGE) {
      creep.moveTo(provider.pos.x, provider.pos.y);
    }
  },
  select_storage: function (room) {
    var storages = room_wrapper.get_energy_storages(room);

    for (var i = 0; i < storages.length; ++i) {
      if (storages[i].energy !== undefined) {
        if (storages[i].energy < storages[i].energyCapacity) {
          return storages[i];
        }
      } else {
        if (storages[i].store[RESOURCE_ENERGY] < storages[i].storeCapacity) {
          return storages[i];
        }
      }
    }
  },
  store: function (creep) {
    var storage = this.select_storage(creep.room);

    if (storage === undefined) {
      return;
    }

    store = creep.transfer(storage, RESOURCE_ENERGY);

    if (store == ERR_NOT_IN_RANGE) {
      creep.moveTo(storage.pos.x, storage.pos.y);
    }
  }
};
module.exports = {
  perform: function (creep) {
    if (creep.carry[RESOURCE_ENERGY] != creep.carryCapacity) {
      strategy.harvest(creep);
    } else {
      strategy.store(creep);
    }
  }
};