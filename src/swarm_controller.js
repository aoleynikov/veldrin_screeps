var population = {
    'W46S47': {
        upgrader: {
            count: 3,
            body: [WORK, MOVE, CARRY]
        },
        repairer: {
            count: 4,
            body: [WORK, WORK, MOVE, MOVE, CARRY, CARRY]
        },
        miner: {
            count: 5,
            body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE]
        },
        builder: {
            count: 3,
            body: [WORK, CARRY, MOVE]
        }
    },
    'W46S48': {
        claimer: {
            count: 1,
            body: [CLAIM, CLAIM, MOVE, MOVE]
        },
        repairer: {
            count: 3,
            body: [WORK, MOVE, CARRY]
        },
        hauler: {
            count: 4,
            body: [MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY]
        },
        miner: {
            count: 2,
            body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE]
        },
        builder: {
            count: 5,
            body: [WORK, MOVE, CARRY]
        }
    },
    'W47S47': {
        claimer: {
            count: 1,
            body: [CLAIM, CLAIM, MOVE, MOVE]
        },
        repairer: {
            count: 3,
            body: [WORK, MOVE, MOVE, CARRY]
        },
        miner: {
            count: 1,
            body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE]
        },
        hauler: {
            count: 3,
            body: [MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY]
        },
        builder: {
            count: 0,
            body: [WORK, MOVE, CARRY]
        }
    },
    'W46S49': {
        builder: {
            count: 3,
            body: [WORK, MOVE, CARRY]
        },
        repairer: {
            count: 3,
            body: [WORK, MOVE, CARRY]
        },
        claimer: {
            count: 1,
            body: [CLAIM, CLAIM, MOVE, MOVE]
        },
        miner: {
            count: 2,
            body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE]
        },
        hauler: {
            count: 3,
            body: [MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY]
        }
    }
}

var controller = {
    count_creeps: function (room_name, role) {
        var result = 0;
        for (var creep_name in Game.creeps) {
            var creep = Game.creeps[creep_name];
            if (creep.memory['type'] != 'swarm') continue;
            if ((creep.room.name == room_name ||
                    creep.memory['work_place'] == room_name ||
                    creep.memory['target'] == room_name) &&
                creep.memory['role'] == role) {
                ++result;
            }
        }
        return result;
    },
    spawn: function (room_name, role, body) {
        var try_count = 0;
        var spawn_result = undefined;
        do {
            var name = role + try_count;
            try_count += 1;
            spawn_result = Game.spawns['Main'].spawnCreep(body, name, {
                memory: {
                    role: role,
                    target: room_name,
                    type: 'swarm',
                    refill: true,
                    work_place: room_name,
                    container_id: undefined
                }
            });
        } while (spawn_result == ERR_NAME_EXISTS);
    }
}

// swarm is a set of very cheap creeps doing certain tasks.
// most of creep code will still be handeled by role model,
// but these creeps will be rebuilt instead of renewed
module.exports = {
    respawn: function () {
        for (var creep_name in Game.creeps) {
            var creep = Game.creeps[creep_name];
            if (creep.memory['role'] == 'maintenance') {
                return;
            }
        }

        for (var room_name in population) {
            var room = Game.rooms[room_name];
            for (var role in population[room_name]) {
                var actual = controller.count_creeps(room_name, role);
                if (actual < population[room_name][role].count) {
                    controller.spawn(room_name, role, population[room_name][role].body)
                }
            }
        }
    }
}