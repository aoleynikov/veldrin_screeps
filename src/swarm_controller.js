var population = require('population');

var controller = {
  spawnCreep: function (spawn, template) {
    var logging = Game.time % 50 == 0;
    if (spawn.spawning) return true;
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
        if (spawn.room.energyAvailable == spawn.room.energyAvailableCapacity) {
          return false;
        }
        if (logging) console.log('Not enough energy to spawn:', name);
        return true;
      } else if (spawnResult == 0) {
        if (logging) console.log('SPAWNING:', name);
        return true;
      }
    }
    return false;
  }
}

// swarm is a set of very cheap creeps doing certain tasks.
// most of creep code will still be handeled by role model,
// but these creeps will be rebuilt instead of renewed
module.exports = {
  respawn: function (spawn) {
    var maintenance_creeps = spawn.pos.findInRange(FIND_MY_CREEPS, 1, {
        filter: (c) => c.memory['role'] == 'maintenance'
    });
    if (maintenance_creeps.length > 0) {
      spawn.renewCreep(maintenance_creeps[0])
    } else {
      for (var template of Game.spawns['Main'].memory['population']['templates']) {
        if (controller.spawnCreep(spawn, template)) return;
      }
    }
  }
}