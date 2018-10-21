var population = require('population');

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
      var count = 0;
      population[room_name].forEach(t => {
        if (t.role == template.role) {
          count += template.count;
        }
      });

      for (var i = 0; i < count; ++i) {
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

        if (spawnResult == 0) {
          return true;
        }
      }
    }
  } // swarm is a set of very cheap creeps doing certain tasks.
  // most of creep code will still be handeled by role model,
  // but these creeps will be rebuilt instead of renewed

};
module.exports = {
  respawn: function () {
    for (var room_name in Game.spawns['Main'].memory['population']) {
      if (room_name == 'version') continue;

      for (var template of population[room_name]) {
        var actual = controller.count_creeps(template, room_name);

        if (actual < template.count) {
          if (controller.spawnCreep(room_name, template)) return;
        }
      }
    }
  }
};