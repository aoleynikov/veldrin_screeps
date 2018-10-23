var upgrader_role = require('role.upgrader');

var energy_behavior = require('behavior.get_energy');

var containers = require('structure.container');

var roads = require('structure.road');

var move = require('behavior.move');

var find_repairable = function (room) {
  var repairable = room.find(FIND_MY_STRUCTURES);
  var conts = containers.get(room);

  for (var i = 0; i < conts.length; ++i) {
    repairable.push(conts[i]);
  }

  var rds = roads.get(room);

  for (var i = 0; i < rds.length; ++i) {
    repairable.push(rds[i]);
  }

  var max_hp_part = 1.0;
  var repairable_id = undefined;

  for (var i = 0; i < repairable.length; ++i) {
    var value = 1.0 * repairable[i].hits / repairable[i].hitsMax;

    if (value < max_hp_part) {
      max_hp_part = value;
      repairable_id = repairable[i].id;
    }
  }

  return repairable_id;
};

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
  if (creep.memory['repairable_id'] === undefined) {
    creep.memory['repairable_id'] = find_repairable(creep.room);
  }

  if (creep.memory['repairable_id'] === undefined) {
    return false;
  }

  var struct = Game.getObjectById(creep.memory['repairable_id']);
  if (!struct) return;
  repair(creep, struct);
  return true;
};

var repair_walls = function (creep) {
  var walls = creep.room.find(FIND_STRUCTURES, {
    filter: s => s.structureType == STRUCTURE_WALL && s.hits < s.hitsMax
  });

  if (walls.length == 0) {
    return false;
  }

  repair(creep, walls[0]);
};

var work = function (creep) {
  var busy = repair_my_sructures(creep) || repair_walls(creep);

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