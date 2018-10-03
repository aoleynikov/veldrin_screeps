var room_wrapper = require('room_wrapper');
var factories = require('factories')

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
                spawn.memory['replaced_name'] = creep.name;
                spawn.memory['replaced_role'] = creep.memory['role'];
                return;
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
        var construction_sites = spawn.room.find(FIND_MY_CONSTRUCTION_SITES)
        if (construction_sites.length > 0) return;
        var energy = room_wrapper.get_spawning_energy(spawn.room);
        if (spawn.memory['replaced_name'] === undefined) {
            manager.select_improved_creep(energy.max);
        }

        if (spawn.memory['replaced_name'] !== undefined) {
            var creep = Game.creeps[spawn.memory['replaced_name']];
            console.log('[UPGRADE] energy: ', spawn.room.energyAvailable, '/', energy.max);
            if (spawn.room.energyAvailable == energy.max && (creep === undefined || manager.creep_is_empty(creep))) {
                var factory = factories[spawn.memory['replaced_role']];
                var bodyparts = factory.bodyparts(spawn.room.energyAvailable)

                var spawn_result = spawn.spawnCreep(bodyparts, spawn.memory['replaced_name']);
                if (spawn_result == ERR_NAME_EXISTS) {
                    Game.creeps[spawn.memory['replaced_name']].suicide();
                    spawn_result = spawn.spawnCreep(bodyparts, spawn.memory['replaced_name']);
                }
                if (spawn_result == 0) {
                    spawn.memory['replaced_name'] = undefined;
                    spawn.memory['replaced_role'] = undefined;
                }
                console.log('upgrade spawn result: ', console.log(spawn_result));
            }
        }
    }
}