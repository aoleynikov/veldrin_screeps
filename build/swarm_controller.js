var population = {
  'W46S47': {
    upgrader: 3
  },
  'W46S48': {},
  'W47S47': {
    builder: 1
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
  spawn: function (room_name, role) {
    var try_count = 0;
    var spawn_result = undefined;

    do {
      var name = role + try_count;
      try_count += 1;
      spawn_result = Game.spawns['Main'].spawnCreep([MOVE, CARRY, WORK], name, {
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

        if (actual < population[room.name][role]) {
          controller.spawn(room_name, role);
        }
      }
    }
  }
};