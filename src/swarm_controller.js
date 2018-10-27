var population = require('population');

var controller = {
  spawnCreep: function (spawn, template) {
    var logging = Game.time % 50 == 0;
    if (spawn.spawning) return;
    for (var i = 0; i < template.count; ++i) {
      var name = template.name_prefix + i;
      if (Game.creeps[name]) {
        if (logging) console.log('Already exists:', name);
        continue;
      }

      var spawnResult = spawn.spawnCreep(template.body, name, {
        memory: template.memory
      });
      if (spawnResult == ERR_NOT_ENOUGH_ENERGY) {
        if (logging) console.log('Not enough energy to spawn:', name);
        return;
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
      for (var spawn_name in Game.spawns) {
        var spawn = Game.spawns[spawn_name];
        controller.spawnCreep(spawn, template);
      }
    }
  }
}