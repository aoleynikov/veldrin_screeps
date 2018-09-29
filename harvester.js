var worker_assignment = require('worker_assignment')

var strategy = {
  harvest: function (creep) {
    var work_place = creep.memory['work_place']
    if (work_place === undefined) { // creep is not assigned, apparently
      work_place = worker_assignment.assign(creep);
    }
    var at_work_place = work_place.x == creep.pos.x &&
      work_place.y == creep.pos.y;

    if (!at_work_place) {
      creep.moveTo(work_place.x, work_place.y);
    }

    var source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
    creep.harvest(source);
  },
  select_storage: function (room) {
    return Game.spawns['Main'];
    var storages = [Game.spawns['Main']]
    for (var storage in storages) {
      if (storage.energy < storage.energyCapacity) {
        return storage;
      }
    }
  },
  store: function (creep) {
    var storage = this.select_storage(creep.room);
    store = creep.transfer(storage, RESOURCE_ENERGY);
    console.log(store, ERR_NOT_IN_RANGE);
    if (store == ERR_NOT_IN_RANGE) {
      console.log('moving...');
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