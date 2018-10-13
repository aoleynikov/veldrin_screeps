var population = {
  'W46S47': [
    {
      count: 2,
      role: 'upgrader',
      body: [WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY],
      type: 'swarm'
    },
    {
      count: 2,
      role: 'repairer',
      body: [WORK, WORK, MOVE, MOVE, CARRY, CARRY, WORK, WORK, MOVE, MOVE, CARRY, CARRY],
      type: 'swarm'
    },
    {
      count: 5,
      role: 'miner',
      body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE],
      type: 'swarm'
    },
    {
      count: 2,
      role: 'builder',
      body: [WORK, CARRY, MOVE, WORK, WORK, MOVE, MOVE, CARRY, CARRY],
      type: 'swarm'
    }
  ],
  'W46S48': [
    {
      count: 1,
      role: 'claimer',
      body: [CLAIM, CLAIM, MOVE, MOVE],
      type: 'swarm'
    },
    {
      count: 2,
      role: 'repairer',
      body: [WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY],
      type: 'swarm'
    },
    {
      count: 4,
      role: 'hauler',
      body: [MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
      type: 'swarm'
    },
    {
      count: 2,
      role: 'miner',
      body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE],
      type: 'swarm'
    },
    {
      count: 1,
      roler: 'builder',
      body: [WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY],
      type: 'swarm'
    }
  ],
  'W47S47': [
    {
      count: 1,
      roler: 'claimer',
      body: [CLAIM, CLAIM, MOVE, MOVE],
      type: 'swarm'
    },
    {
      count: 2,
      role: 'repairer',
      body: [WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY],
      type: 'swarm'
    },
    {
      count: 1,
      role: 'miner',
      body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE],
      type: 'swarm'
    },
    {
      count: 3,
      role: 'hauler',
      body: [MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
      type: 'swarm'
    },
    {
      count: 3,
      role: 'builder',
      body: [WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY],
      type: 'swarm'
    }
  ],
  'W46S49': [
    builder: {
      count: 2,
      roler: 'builder',
      body: [WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY],
      type: 'swarm'
    },
    {
      count: 4,
      role: 'harvester',
      body: [WORK, WORK, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE],
      type: 'regular'
    },
    {
      count: 2,
      role: 'repairer',
      body: [WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY],
      type: 'swarm'
    },
    {
      count: 1,
      role: 'upgrader',
      body: [WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY],
      type: 'swarm'
    },
    {
      count: 5,
      role: 'miner',
      body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE],
      type: 'swarm'
    },
    {
      count: 6,
      role: 'hauler',
      body: [MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY],
      type: 'swarm'
    }
  ]
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
    spawnCreep: function (room_name, template) {
        for(var spawn_name in Game.spawns) {
          var spawn = Game.spawns[spawn_name];
          if(spawn.spawning) continue;
          for (var i = 0; i < template.count; ++i) {
            var name = template.role + '_' + room_name + '_' + i;
            if (!Game.crpeeps[name]) continue;
            var result = spawn.spawnCreep(name, template.body, {memory: {
              role: template.role,
              work_place: room_name,
              target: room_name,
              type: template.type,
              refill: true
            }});
          }
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
            for (var template of population[room_name]) {
                var actual = controller.count_creeps(room_name, template.role);
                if (actual < template.count) {
                    controller.spawnCreep(room_name, role, template)
                }
            }
        }
    }
}