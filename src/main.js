var dispatcher = require('strategy_dispatcher');
var buildings_manager = require('buildings_manager');
var doctor = require('doctor');
var population = require('population');
var swarm = require('swarm.population')

module.exports.loop = function () {
  console.log('==========================================================')

  if(Game.time % 20 == 0) {
    Game.spawns['Main'].memory['population'] = population;
  }
  
  doctor.check();

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    var strategy = dispatcher.get_strategy(creep);
    strategy.perform(creep);

    if (creep.memory['role'] == 'maintenance') {
      Game.spawns['Main'].renewCreep(creep);
    }
  }

  for(var spawn_name in Game.spawns) {
    var spawn = Game.spawns[spawn_name];
    buildings_manager.run(spawn);
  }

  console.log(swarm.creeps())
  Game.spawns['Main'].memory['swarm'] = swarm.creeps()
}