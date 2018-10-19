/* 
WARNING! If price of supporting the swarm per 300 ticks is more than energy 
income available to harvesters, the swarm doesn't function as intended.


If you have a storage, it provides an easy way to monitor the economy balance.
For RCL <= 3, don't get greedy.
*/
var population = {
  'W31S51': [{
      count: 2,
      role: 'upgrader',
      body: [WORK, MOVE, CARRY, MOVE, CARRY, MOVE, WORK],
      type: 'swarm'
    },
    {
      count: 2,
      role: 'repairer',
      body: [WORK, MOVE, CARRY, MOVE, CARRY, MOVE, WORK],
      type: 'swarm'
    },
    {
      count: 3,
      role: 'miner',
      body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE],
      type: 'swarm'
    },
    {
      count: 1,
      role: 'builder',
      body: [WORK, MOVE, CARRY, MOVE, CARRY, MOVE],
      type: 'swarm'
    },
    {
      count: 3,
      role: 'hauler',
      body: [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY],
      type: 'swarm',
      energy_room: 'W32S51'
    },
    {
      count: 3,
      role: 'hauler',
      body: [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY],
      type: 'swarm',
      energy_room: 'W31S52'
    },
    {
      count: 4,
      role: 'hauler',
      body: [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY],
      type: 'swarm',
      energy_room: 'W32S52'
    }
  ],
  'W32S51': [{
      count: 1,
      role: 'claimer',
      body: [CLAIM, CLAIM, MOVE, MOVE],
      type: 'swarm'
    },
    {
      count: 2,
      role: 'builder',
      body: [WORK, MOVE, CARRY, MOVE, CARRY, MOVE],
      type: 'swarm'
    },
    {
      count: 2,
      role: 'miner',
      body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE],
      type: 'swarm'
    }
  ],
  'W31S52': [{
      count: 1,
      role: 'claimer',
      body: [CLAIM, CLAIM, MOVE, MOVE],
      type: 'swarm'
    },
    {
      count: 2,
      role: 'builder',
      body: [WORK, MOVE, CARRY, MOVE, CARRY, MOVE],
      type: 'swarm'
    },
    {
      count: 3,
      role: 'miner',
      body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE],
      type: 'swarm'
    }
  ],
  'W32S52': [{
      count: 1,
      role: 'claimer',
      body: [CLAIM, CLAIM, MOVE, MOVE],
      type: 'swarm'
    },
    {
      count: 2,
      role: 'builder',
      body: [WORK, MOVE, CARRY, MOVE, CARRY, MOVE],
      type: 'swarm'
    },
    {
      count: 3,
      role: 'miner',
      body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE],
      type: 'swarm'
    }
  ]
};

var controller = {
  count_creeps: function (template, room_name) {
    var result = 0;
    for (var creep_name in Game.creeps) {
      var creep = Game.creeps[creep_name];
      if (creep.memory['type'] != 'swarm') continue;

      var role_match = creep.memory['role'] == template.role;
      var work_place_match = creep.memory['work_place'] == room_name;
      var energy_room_match = creep.memory['energy_room'] == template.energy_room;

      if (role_match && work_place_match && energy_room_match) {
        ++result;
      }

    }
    return result;
  },
  spawnCreep: function (room_name, template) {
    for (var spawn_name in Game.spawns) {
      var spawn = Game.spawns[spawn_name];
      if (spawn.spawning) continue;
      for (var i = 0; i < template.count; ++i) {
        var name = template.role + '_' + room_name + '_' + i;
        if (Game.creeps[name]) continue;
        var spawnResult = spawn.spawnCreep(template.body, name, {
          memory: {
            role: template.role,
            work_place: room_name,
            target: room_name,
            type: template.type,
            refill: true,
            energy_room: template.energy_room
          }
        });
        console.log('[SWARM] spawning', template.role, ' for ', room_name, ': result - ', spawnResult);
      }
    }
  }
}

// swarm is a set of very cheap creeps doing certain tasks.
// most of creep code will still be handeled by role model,
// but these creeps will be rebuilt instead of renewed
module.exports = {
  respawn: function () {
    for (var room_name in population) {
      for (var template of population[room_name]) {
        var actual = controller.count_creeps(template, room_name);
        if (actual < template.count) {
          controller.spawnCreep(room_name, template)
        }
      }
    }
  }
}