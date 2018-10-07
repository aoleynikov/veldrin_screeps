var population = {
  'W46S47': {
    upgrader: {
      count: 3,
      body: [WORK, MOVE, CARRY]
    },
    repairer: {
      count: 1,
      body: [WORK, MOVE, CARRY]
    }
  },
  'W46S48': {
    claimer: {
      count: 1,
      body: [CLAIM, CLAIM, MOVE, MOVE]
    },
    repairer: {
      count: 1,
      body: [WORK, MOVE, CARRY]
    },
    hauler: {
      count: 3,
      body: [MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY]
    }
  },
  'W47S47': {
    claimer: {
      count: 1,
      body: [CLAIM, CLAIM, MOVE, MOVE]
    },
    repairer: {
      count: 1,
      body: [WORK, MOVE, CARRY]
    }
  }
};
var controller = {
  count_creeps: function (room, role) {
    var result = 0;

    for (var creep_name in Game.creeps) {
      var creep = Game.creeps[creep_name];
      if (creep.memory['type'] != 'swarm') continue;

      if ((creep.room.name == room.name || creep.memory['target'] == room.name) && creep.memory['role'] == role) {
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
          refill: true
        }
      });
    } while (spawn_result == ERR_NAME_EXISTS);
  } // swarm is a set of very cheap creeps doing certain tasks.
  // most of creep code will still be handeled by role model,
  // but these creeps well be rebuilt instead of renewed

};
module.exports = {
  respawn: function () {
    for (var room_name in population) {
      var room = Game.rooms[room_name];

      for (var role in population[room.name]) {
        var actual = controller.count_creeps(room, role);

        if (actual < population[room.name][role].count) {
          controller.spawn(room_name, role, population[room_name][role].body);
        }
      }
    }
  }
};