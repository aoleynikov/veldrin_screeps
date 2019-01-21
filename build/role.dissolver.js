var upgrader = require('role.upgrader');

var room_travel = require('behavior.room_travel');

module.exports = {
  perform: function (creep) {
    if (creep.memory['refill']) {
      if (creep.room.name != creep.memory['resource_room']) {
        creep.memory['target'] = creep.memory['resource_room'];
      }

      if (room_travel.perform(creep)) return;
      var building = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: s => {
          return s.structureType == STRUCTURE_WALL || s.owner.name != 'Veldrin';
        }
      });
      var work = creep.dismantle(building);

      if (work == ERR_NOT_IN_RANGE) {
        creep.moveTo(building);
      }

      if (creep.carry[RESOURCE_ENERGY] == creep.carryCapacity) {
        creep.memory['target'] = creep.memory['work_place'];
        creep.memory['refill'] = false;
      }
    } else {
      upgrader.perform(creep);
    }
  }
};