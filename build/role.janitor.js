var room_travel = require('behavior.room_travel');

module.exports = {
  perform: function (creep) {
    if (room_travel.perofrm(creep)) return;

    if (creep.carry[RESOURCE_ENERGY] == 0) {
      var container = creep.pos.findClosestByRange(FIND_STRUCTURE, {
        filter: s => {
          if (s.structureType != STRUCTURE_CONTAINER) return false;
          return s.store[RESOURCE_ENERGY] > 0 && _.sum(s.store) > s.store[RESOURCE_ENERGY];
        }
      });

      if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(container);
      }
    } else {
      var storage = creep.room.find(FIND_STRUCTURE, {
        filter: s => s.structureType == STRUCTURE_STORAGE
      });

      if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(storage);
      }
    }
  }
};