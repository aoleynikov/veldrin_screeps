var get_room_energy = require('behavior.get_room_energy');

var room_travel = require('behavior.room_travel');

module.exports = {
  perform: function (creep) {
    if (creep.carry[RESOURCE_ENERGY] == 0) {
      this.refill(creep);
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