var harvester_factory = require('factory.harvester');
var miner_factory = require('factory.miner');
var room_wrapper = require('room_wrapper');

var factories = {
    harvester: harvester_factory,
    miner: miner_factory
};

var manager = {
    can_improve: function (creep, maxEnergy) {
        var factory = factories[creep.memory['role']];
        return creep.body.length < factory.bodyparts(maxEnergy);
    },
    select_improved_creep: function (maxEnergy) {
        for (var name in Game.creeps) {
            var creep = Game.creeps[name];
            var spawn = Game.spawns['Main'];
            if (this.can_improve(creep, maxEnergy)) {
                if (this.creep_is_empty(creep)) {
                    spawn.memory['replaced_name'] = creep.name;
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
        var energy = room_wrapper.get_spawning_energy(spawn.room);
        var spawn = Game.spawns['Main'];
        if (spawn.memory['replaced_name'] === undefined) {
            manager.select_improved_creep(energy.max);
        }

        if (spawn.memory['replaced_name'] !== undefined) {
            if (energy.current == energy.max) {
                var factory = factories[creep.memory['role']];
                var bodyparts = factory.bodyparts(energy.current)
                creep.suicide();
                spawn.spawnCreep(bodyparts, spawn.memory['replaced_name']);
            }
        }
    }
}