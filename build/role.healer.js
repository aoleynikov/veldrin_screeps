var room_travel = require('behavior.room_travel');

var military = require('behavior.military');

var strategy = {
  find_patient: function (own) {
    for (var name in Game.creeps) {
      if (name == own) continue;
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
      patient = strategy.find_patient(creep.name);

      if (patient === undefined) {
        military.perform(creep);
        return;
      }

      creep.memory['patient'] = patient.name;
    }

    var patient = Game.creeps[creep.memory['patient']];

    if (patient !== undefined || patient.hits == patient.hitsMax) {
      creep.memory['patient'] = undefined;
      return;
    }

    if (creep.room.name != patient.room.name) {
      creep.memory['target'] = patient.room.name;
      if (room_travel.perform(creep)) return;
    }

    if (creep.heal(patient) == ERR_NOT_IN_RANGE) {
      creep.moveTo(patient);
    }
  }
};