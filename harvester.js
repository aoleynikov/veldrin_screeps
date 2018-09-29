var worker_assignment = require('worker_assignment')

var strategy = {
  harvest: function (creep) {
    var work_place = creep.memory['work_place']
    if (work_place === undefined) { // creep is not assigned, apparently
      work_place = worker_assignment.assign(creep);
    }

    console.log(work_place, creep.pos, !work_place.isEqualTo(creep.pos));
    if (!work_place.isEqualTo(creep.pos)) {
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