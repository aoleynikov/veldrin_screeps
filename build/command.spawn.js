var factories = require('factories');

var room_wrapper = require('room_wrapper');

module.exports = {
  execute: function () {
    if (Game.spawns['Main'].memory['spawn_command'] != undefined) {
      var role = Game.spawns['Main'].memory['spawn_command'];
      var bodyparts = factories[role];

      for (var creep in Game.creeps) {
        if (Game.creeps[creep].memory['role'] == role) {
          ++cnt;
        }
      }

      var name = undefined;
      var spawn_result = undefined;

      do {
        name = role + cnt;
        spawn_result = Game.spawns['Main'].spawnCreep(bodyparts, name);
        cnt++;
      } while (spawn_result == ERR_NAME_EXISTS);

      if (spawn_result == 0) {
        Game.spawns['Main'].memory['spawn_command'] = undefined;
        Game.creeps[name].memory = {
          'role': role
        };
      }
    }
  }
};