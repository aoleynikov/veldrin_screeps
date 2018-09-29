var worker_assignment = require('worker_assignment')

var strategy = {
  harvest: function (creep) {
    var sources = creep.room.find(FIND_SOURCES)
    for (var i = 0; i < sources.length; ++i) {
      if (creep.harvest(sources[i]) == 0) return;
    }

    var work_place = creep.memory['work_place']
    if (work_place === undefined) { // creep is not assigned, apparently
      work_place = worker_assignment.assign(creep);
    }
    console.log(creep.memory['work_place']);
    console.log(creep.pos);
    if (!work_place.isEqualTo(creep.pos)) {
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