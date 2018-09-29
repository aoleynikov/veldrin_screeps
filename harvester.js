var worker_assignment = require('worker_assignment')

var strategy = {
  harvest: function (creep) {
    var work_place = creep.memory['work_place']
    if (work_place === undefined) { // creep is not assigned, apparently
      work_place = worker_assignment.assign(creep);
    }
    var at_work_place = work_place.x == creep.pos.x &&
      work_place.y == creep.pos.y;

    console.log(at_work_place);
    if (!at_work_place) {
      creep.moveTo(work_place);
    }

    var sources = creep.room.find(FIND_SOURCES)
    for (var source in sources) {
      if (creep.harvest(source) == 0) return;
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