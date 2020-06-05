var dispatcher = require('strategy_dispatcher');

var buildings_manager = require('buildings_manager');

var doctor = require('doctor');

var swarm = require('swarm.population');

const setup = () => {
  let mainRoom = Game.spawns['Main'].room.name;
  let empire = Game.spawns['Main'].memory['empire'];

  if (empire === undefined || !(mainRoom in empire)) {
    empire = {};
    empire[mainRoom] = [];
    Game.spawns['Main'].memory['empire'] = empire;
  }

  try {
    //if (Game.time % 20 == 0) {
    Game.spawns['Main'].memory['population'] = swarm.creeps(empire); //}
  } catch (e) {
    console.log(e);
  }
};

module.exports.loop = function () {
  console.log('==========================================================');
  setup();
  doctor.check();

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    var strategy = dispatcher.get_strategy(creep);
    strategy.perform(creep);

    if (creep.memory['role'] == 'maintenance') {
      Game.spawns['Main'].renewCreep(creep);
    }
  }

  for (var spawn_name in Game.spawns) {
    var spawn = Game.spawns[spawn_name];
    buildings_manager.run(spawn);
  }
};