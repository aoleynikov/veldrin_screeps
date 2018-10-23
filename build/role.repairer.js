var upgrader_role = require('role.upgrader');

var energy_behavior = require('behavior.get_energy');

var move = require('behavior.move');

var repair = function (creep, struct) {
  var repair_result = creep.repair(struct);

  if (repair_result == ERR_NOT_ENOUGH_ENERGY) {
    energy_behavior.refill(creep);
    creep.memory['repairable_id'] = undefined;
  } else if (repair_result == ERR_NOT_IN_RANGE) {
    move.perform(creep, struct.pos);
  }

  if (struct.hits == struct.hitsMax) {
    creep.memory['repairable_id'] = undefined;
  }
};

var repair_my_sructures = function (creep) {
  var repairables = creep.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: s => s.hist < s.hitsMax
  });
  if (repairables.length == 0) return false;
  repair(creep, repairables[0]);
  return true;
};

var work = function (creep) {
  var busy = repair_my_sructures(creep);

  if (!busy) {
    upgrader_role.perform(creep);
  }
};

module.exports = {
  perform: function (creep) {
    if (energy_behavior.perform(creep)) return;
    work(creep);
  }
};