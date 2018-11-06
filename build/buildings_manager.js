var tower_structure = require('structure.tower');

var swarm = require('swarm_controller');

module.exports = {
  run: function (spawn) {
    // Towers
    tower_structure.get(spawn.room).forEach(tower => {
      tower_structure.shoot_on_sight(tower);
    }); // Swarm + creeps renewal

    swarm.respawn(spawn); // Links

    if (!spawn.memory['links_from']) return;

    for (var from_id of spawn.memory['links_from']) {
      var link_from = Game.getObjectById(from_id);
      if (!link_from || link_from.energy < link_from.energyCapacity) continue;

      for (var to_id of spawn.memory['links_to']) {
        var link_to = Game.getObjectById(to_id);

        if (link_to.energy < link_to.energyCapacity) {
          link_from.transferEnergy(link_to);
        }
      }
    }
  }
};