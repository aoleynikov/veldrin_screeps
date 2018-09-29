var worker_assignment = require('../worker_assignment')

var strategy = {
  harvest: function (creep) {
    var sources = room.find(FIND_SOURCES)
    for (var i = 0; i < sources.length; ++i) {
      if (creep.harvest(source[i]) == 0) return;
    }

    worker_assignment.init(creep.room);
    var work_place = worker_assignment.get_work_place(creep)
    if (!work_place.isEqualTo(work_place)) {
      creep.moveTo(work_place);
    }
  },
  select_storage: function () {
    var storages = [room.spawns]
    for (var i = 0; i < storages.length; ++i) {
      if (storages[i].energy < storages[i].energyCapacity) {
        return storages[i];
      }
    }
  },
  store: function (creep) {
    var storage = this.select_storage();
    if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(storage);
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