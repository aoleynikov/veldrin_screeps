var get_room_energy = require('behavior.get_room_energy');

var room_travel = require('behavior.room_travel');

module.exports = {
  perform: function (creep) {
    if (creep.carry[RESOURCE_ENERGY] == 0) {
      this.refill(creep);
    }

    tombstones = creep.room.lookForAtArea(LOOK_TOMBSTONES, creep.pos.y - 1, creep.pos.x - 1, creep.pos.y + 1, creep.pos.x + 1, true);

    for (var stone of tombstones) {
      if (stone.store[RESOURCE_ENERGY] > 0) {
        creep.withdraw(RESOURCE_ENERGY, stone.structure);
      }
    }

    var room = undefined;

    if (creep.memory['refill']) {
      room = creep.memory['energy_room'] || creep.room.name;
      creep.memory['target'] = room;
      if (room_travel.perform(creep)) return true;
      if (get_room_energy.perform(creep)) return true;
    }

    room = creep.memory['work_place'] || creep.room.name;
    creep.memory['target'] = room;
    if (room_travel.perform(creep)) return true;
    return false;
  },
  refill: creep => creep.memory['refill'] = true
};