var room_travel = require('behavior.room_travel');

module.exports = {
  perform: function (creep) {
    for (var name in Game.creeps) {
      var patient = Game.creeps[name];

      if (creep.room.name != patient.room.name) {
        creep.memory['target'];
        if (room_travel.perform(creep)) return;
      }

      if (patient.hits < patient.hitsMax) {
        if (creep.heal(patient) == ERR_NOT_IN_RANGE) {
          creep.moveTo(patient);
          return;
        }
      }
    }

    creep.moveTo(Game.flags['Rax']);
  }
};