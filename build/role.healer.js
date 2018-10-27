var room_travel = require('behavior.room_travel');

var military = require('behavior.military');

var move = require('behavior.move');

module.exports = {
  perform: function (creep) {
    var patient = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
      filter: c => {
        return c.hits < c.hitsMax;
      }
    });

    if (!patient) {
      var squad = creep.memory['squad'];
      var flag = Game.flags[squad] || Game.flags['Rax'];
      move.perform(creep, flag.pos);
    } else {
      var heal_result = creep.heal(patient);

      if (heal_result == ERR_NOT_IN_RANGE) {
        move.perform(creep, patient.pos);
      }
    }
  }
};