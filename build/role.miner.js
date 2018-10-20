var containers = require('structure.container');

var room_travel = require('behavior.room_travel');

var strategy = {
  find_container: function (creep) {
    var creepLook = creep.room.lookAt(creep.pos.x, creep.pos.y);

    for (var item of creepLook) {
      if (item.type == 'structure' && item.structure.structureType == STRUCTURE_CONTAINER) {
        return item.structure;
      }
    }

    for (var cont of containers.get(creep.room)) {
      var look = creep.room.lookAt(cont.pos.x, cont.pos.y);
      var good = true;

      for (var item of look) {
        if (item.type == 'creep' && item.creep.memory['role'] == 'miner' && item.creep.id != creep.id) {
          good = false;
          break;
        }
      }

      if (!good) continue;
      return cont;
    }
  }
};
module.exports = {
  perform: function (creep) {
    if (room_travel.perform(creep)) return;
    var container = strategy.find_container(creep);
    var source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
    if (!source || !container) return;

    if (creep.pos.x != container.pos.x || creep.pos.y != container.pos.y) {
      creep.moveTo(container);
    }

    if (container.store[RESOURCE_ENERGY] == container.storeCapacity) {
      return;
    }

    if (creep.harvest(source) != 0) {
      creep.moveTo(container);
    }
  }
};