var population = {
  'W46S47': {
    upgrader: {
      count: 2,
      body: [WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY],
      type: 'swarm'
    },
    repairer: {
      count: 2,
      body: [WORK, WORK, MOVE, MOVE, CARRY, CARRY, WORK, WORK, MOVE, MOVE, CARRY, CARRY],
      type: 'swarm'
    },
    miner: {
      count: 5,
      body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE],
      type: 'swarm'
    },
    builder: {
      count: 2,
      body: [WORK, CARRY, MOVE, WORK, WORK, MOVE, MOVE, CARRY, CARRY],
      type: 'swarm'
    }
  },
  'W46S48': {
    claimer: {
      count: 1,
      body: [CLAIM, CLAIM, MOVE, MOVE],
      type: 'swarm'
    },
    repairer: {
      count: 2,
      body: [WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY],
      type: 'swarm'
    },
    hauler: {
      count: 4,
      body: [MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
      type: 'swarm'
    },
    miner: {
      count: 2,
      body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE],
      type: 'swarm'
    },
    builder: {
      count: 1,
      body: [WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY],
      type: 'swarm'
    }
  },
  'W47S47': {
    claimer: {
      count: 1,
      body: [CLAIM, CLAIM, MOVE, MOVE],
      type: 'swarm'
    },
    repairer: {
      count: 2,
      body: [WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY],
      type: 'swarm'
    },
    miner: {
      count: 1,
      body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE],
      type: 'swarm'
    },
    hauler: {
      count: 3,
      body: [MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
      type: 'swarm'
    },
    builder: {
      count: 3,
      body: [WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY],
      type: 'swarm'
    }
  },
  'W46S49': {
    builder: {
      count: 2,
      body: [WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY],
      type: 'swarm'
    },
    harvester: {
      count: 4,
      body: [WORK, WORK, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE],
      type: 'regular'
    },
    repairer: {
      count: 2,
      body: [WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY],
      type: 'swarm'
    },
    upgrader: {
      count: 1,
      body: [WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY],
      type: 'swarm'
    },
    miner: {
      count: 5,
      body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE],
      type: 'swarm'
    },
    hauler: {
      count: 6,
      body: [MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY],
      type: 'swarm'
    }
  }
};

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
    spawn: function (room_name, role, body, type) {
        for (var spawn_name in Game.spawns) {
          var spawn = Game.spawns[spawn_name];
          if (spawn.spawning) continue;
          var try_count = 0;
          var name = '';
          var spawn_result = undefined;
          do {
              name = role + try_count;
              try_count += 1;
              for(var spawn_name in Game.spawns) {
                var spawn = Game.spawns[spawn_name];
                spawn_result = spawn.spawnCreep(body, name, {
                  memory: {
                      role: role,
                      target: room_name,
                      type: type,
                      refill: true,
                      work_place: room_name
                  }
                });
              }
          } while (spawn_result == ERR_NAME_EXISTS);
        }
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
                var template = population[room_name][role];
                if (actual < template.count) {
                    controller.spawn(room_name, role, template.body, template.type)
                }
            }
        }
    }
}