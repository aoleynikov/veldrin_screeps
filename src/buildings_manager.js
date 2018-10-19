var tower_structure = require('structure.tower');
var swarm = require('swarm_controller');

module.exports = {
    run: function (room) {
        var towers = tower_structure.get(room);
        for (var i = 0; i < towers.length; ++i) {
            tower_structure.shoot_on_sight(towers[i]);
        }

        var maintenance_creeps = Game.spawns['Main'].pos.findInRange(FIND_MY_CREEPS, 5, {
            filter: function (c) {
                return c.memory['role'] == 'maintenance';
            }
        });
        if (maintenance_creeps.length == 0) {
            swarm.respawn();
        } else {
            console.log('[SWARM] Swarm regeneration paused. Maintenance in progress.')
        }
    }
}