var tower_structure = require('structure.tower');

module.exports = {
  run: function (room) {
    var towers = tower_structure.get(room);

    for (var i = 0; i < towers.length; ++i) {
      tower_structure.shoot_on_sight(towers[i]);
    }

    if (Game.spawns['Main'].memory['claiming'] !== undefined && Game.creeps['claimer1'] == undefined) {
      if (room.energyAvailable == room.energyCapacityAvailable) {
        Game.spawns['Main'].spawnCreep([CLAIM, CLAIM, MOVE, MOVE], 'claimer1');
      }
    }
  }
};