// var population = require('population');

var progress_bar = (spawning) => {
  var bars = []
  var ratio = 1.0 * (spawning.needTime - spawning.remainingTime) / spawning.needTime
  var width = 25
  var dark = 1.0 * width * ratio
  var light = width - dark
  var i = 0
  for (i = 0; i < dark; ++i) {
    bars.push('X')
  }
  for (; i < width; ++i) {
    bars.push(' ')
  }
  return bars.join('')
}

var controller = {
  spawnCreep: function (spawn, template) {
    if (spawn.spawning) {
      spawn.memory['state'] = 'spawning ' + spawn.spawning.name + ' (' + progress_bar(spawn.spawning) + ')'
      return true
    }
    for (var i = 0; i < template.count; ++i) {
      var name = template.name_prefix + i
      if (Game.creeps[name]) continue

      var spawnResult = spawn.spawnCreep(template.body, name, {
        memory: template.memory
      })
      if (spawnResult == ERR_NOT_ENOUGH_ENERGY) {
        if (spawn.room.energyAvailable == spawn.room.energyAvailableCapacity) {
          return false
        }
        spawn.memory['state'] = 'charging ' + name
        return true
      } else if (spawnResult == 0) {
        spawn.memory['state'] = 'spawning ' + name
        return true
      }
    }
    return false
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
      spawn.memory['state'] = 'renewing'
    } else {
      var population = Game.spawns['Main'].memory['population'][spawn.room.name]
      for (var template of population) {
        if (controller.spawnCreep(spawn, template)) break;
        spawn.memory['state'] = 'idle'
      }
    }
  }
}