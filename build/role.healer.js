var room_travel = require('behavior.room_travel');

var strategy = {
  find_patient: function () {
    for (var name in Game.creeps) {
      var creep = Game.creeps[name];

      if (creep.hits < creep.hitsMax) {
        return creep;
      }
    }
  }
};
module.exports = {
  perform: function (creep) {
    if (creep.memory['patient'] === undefined) {
      patient = strategy.find_patient();

      if (patient === undefined) {
        creep.moveTo(Game.flags['Rax']);
        return;
      }

      creep.memory['patient'] = patient.name;
    }

    var patient = Game.creeps[creep.memory['patient']];

    if (creep.room.name != patient.room.name) {
      creep.memory['target'] = patient.room.name;
      if (room_travel.perform(creep)) return;
    }

    if (creep.heal(patient) == ERR_NOT_IN_RANGE) {
      creep.moveTo(patient);
    }

    creep.moveTo(Game.flags['Rax']);
  }
};