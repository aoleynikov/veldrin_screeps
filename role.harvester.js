var worker_assignment = require('worker_assignment')
var room_wrapper = require('room_wrapper')

var strategy = {
  harvest: function (creep) {
    var provider = room_wrapper.get_energy_provider(creep.room);
    if (provider !== undefined) {
      harvest_from_storage = creep.withdraw(provider, RESOURCE_ENERGY);
      if (harvest_from_storage == ERR_NOT_IN_RANGE) {
        creep.moveTo(provider);
        return;
      }
    }

    var work_place = creep.memory['work_place']
    if (work_place === undefined) { // creep is not assigned
      work_place = worker_assignment.assign(creep);
    }
    var at_work_place = work_place.x == creep.pos.x &&
      work_place.y == creep.pos.y;

    if (!at_work_place) {
      creep.moveTo(work_place.x, work_place.y);
      return;
    }

    var source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
    creep.harvest(source);
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
}

module.exports = {
  perform: function (creep) {
    if (creep.carry[RESOURCE_ENERGY] != creep.carryCapacity) {
      strategy.harvest(creep);
    } else {
      strategy.store(creep);
    }
  }
}