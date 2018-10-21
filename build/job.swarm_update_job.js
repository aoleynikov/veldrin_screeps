var container = require('structure.container');

module.exports = {
  execute: (role, count_func) => {
    var spawn = Game.spawns['Main'];

    for (var key in spawn.memory['population']) {
      var room = Game.rooms[key];
      if (!room) continue;
      var count = count_func(room);
      console.log('[SWARM] Setting ' + role + ' count to ' + count + ' for room ' + key);
      var room_swarm = spawn.memory['population'][key];
      spawn.memory['population'][key] = [];

      for (var t of room_swarm) {
        if (t.role != role) {
          spawn.memory['population'][key].push(t);
        }
      }

      if (count > 0) {
        spawn.memory['population'][key].push({
          count: count,
          role: role,
          body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE],
          type: 'swarm'
        });
      }
    }
  }
};