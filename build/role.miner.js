var room_travel = require('behavior.room_travel');

module.exports = {
  perform: function (creep) {
    if (room_travel.perform(creep)) return;
    container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: s => {
        var creepOnTop = s.pos.lookFor(LOOK_CREEPS)[0];

        if (creepOnTop.id != creep.id) {
          return false;
        }

        return s.findInRange(creep.memory['find'], 1) != null;
      }
    });
    if (!container) return;

    if (creep.pos.x != container.pos.x || creep.pos.y != container.pos.y) {
      creep.moveTo(container);
      return;
    }

    creep.harvest(creep.pos.findClosestByRange(creep.memory['find']));
  }
};