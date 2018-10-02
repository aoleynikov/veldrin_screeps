var harvester_factory = require('factory.harvester');

var miner_factory = require('factory.miner');

var builder_factory = require('factory.builder');

var upgrader_factory = require('factory.upgrader');

var repairer_factory = require('factory.repairer');

var room_wrapper = require('room_wrapper');

var factories = {
  harvester: harvester_factory,
  miner: miner_factory,
  builder: builder_factory,
  upgrader: upgrader_factory,
  repairer: repairer_factory
};
var manager = {
  can_improve: function (creep, maxEnergy) {
    var factory = factories[creep.memory['role']];

    if (factory === undefined) {
      return false;
    }

    return creep.body.length < factory.bodyparts(maxEnergy).length;
  },
  select_improved_creep: function (maxEnergy) {
    for (var name in Game.creeps) {
      var creep = Game.creeps[name];
      var spawn = Game.spawns['Main'];

      if (this.can_improve(creep, maxEnergy)) {
        if (this.creep_is_empty(creep)) {
          spawn.memory['replaced_name'] = creep.name;
          spawn.memory['replaced_role'] = creep.memory['role'];
          return;
        }
      }
    }
  },
  creep_is_empty: function (creep) {
    for (var k in creep.carry) {
      if (creep.carry[k] > 0) {
        return false;
      }
    }

    return true;
  }
};
module.exports = {
  run: function () {
    var spawn = Game.spawns['Main'];
    var energy = room_wrapper.get_spawning_energy(spawn.room);

    if (spawn.memory['replaced_name'] === undefined) {
      manager.select_improved_creep(energy.max);
    }

    if (spawn.memory['replaced_name'] !== undefined) {
      if (energy.current == energy.max) {
        var factory = factories[spawn.memory['replaced_role']];
        var bodyparts = factory.bodyparts(energy.current);
        Game.creeps[spawn.memory['replaced_name']].suicide();
        spawn.spawnCreep(bodyparts, spawn.memory['replaced_name']);
      }
    }
  }
};