var tower_structure = require('structure.tower');
var swarm = require('swarm_controller');

module.exports = {
    run: function (room) {
        tower_structure.get(room).forEach(tower => {
            tower_structure.shoot_on_sight(tower);
        });

        var maintenance_creeps = Game.spawns['Main'].pos.findInRange(FIND_MY_CREEPS, 1, {
            filter: (c) => c.memory['role'] == 'maintenance'
        });
        if (maintenance_creeps.length == 0) {
            swarm.respawn();
        } else {
            Game.spawns['Main'].renewCreep(maintenance_creeps[0]);
        }
    }
}