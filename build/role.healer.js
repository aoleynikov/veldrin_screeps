var military = require('behavior.military');

module.exports = {
  perform: function (creep) {
    var patient = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
      filter: c => {
        return c.hits < c.hitsMax;
      }
    });

    if (patient) {
      var heal_result = creep.heal(patient);

      if (heal_result == ERR_NOT_IN_RANGE) {
        creep.moveTo(patient);
      }
    } else {
      military.on_guard(creep);
    }
  }
};