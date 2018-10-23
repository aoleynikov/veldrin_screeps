var population = require('population');

var controller = {
  count_creeps: function (template) {
    var result = 0;
    for (var creep_name in Game.creeps) {
      var creep = Game.creeps[creep_name];
      if (creep.memory['type'] != 'swarm') continue;

      var role_match = creep.memory['role'] == template.role;
      var work_place_match = creep.memory['work_place'] == template.memory['work_place'];
      var energy_room_match = creep.memory['energy_room'] == template.energy_room;

      if (role_match && work_place_match && energy_room_match) {
        ++result;
      }

    }
    return result;
  },
  spawnCreep: function (template) {
    for (var spawn_name in Game.spawns) {
      var spawn = Game.spawns[spawn_name];
      if (spawn.spawning) continue;

      var count = 0;
      Game.spawns['Main'].memory['population']['templates'].forEach(t => {
        if (t.role == template.role) {
          count += template.count;
        }
      });

      for (var i = 0; i < count; ++i) {
        var name = template.role + '_' + template.memory.work_place + '_' + i;
        if (Game.creeps[name]) continue;
        var spawnResult = spawn.spawnCreep(template.body, name, {
          memory: template.memory
        });
        return spawnResult == 0;
      }
    }
  }
}

// swarm is a set of very cheap creeps doing certain tasks.
// most of creep code will still be handeled by role model,
// but these creeps will be rebuilt instead of renewed
module.exports = {
  respawn: function () {
    for (var template of Game.spawns['Main'].memory['population']['templates']) {
      var actual = controller.count_creeps(template);
      if (actual < template.count) {
        if (controller.spawnCreep(template)) return;
      }
    }
  }
}