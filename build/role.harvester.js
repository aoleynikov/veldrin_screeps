var room_wrapper = require('room_wrapper');

var get_energy = require('behavior.get_energy');

var strategy = {
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
    } else if (store == ERR_NOT_ENOUGH_ENERGY) {
      creep.memory['refill'] = true;
    }
  }
};
module.exports = {
  perform: function (creep) {
    if (creep.memory['refill']) {
      get_energy.perform(creep);
      return;
    }

    strategy.store(creep);
  }
};