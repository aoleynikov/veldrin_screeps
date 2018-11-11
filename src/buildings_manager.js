var swarm = require('swarm_controller');

var operate_links = (spawn) => {
    if (!spawn.memory['links_from']) return;
    for(var from_id of spawn.memory['links_from']) {
        var link_from = Game.getObjectById(from_id);
        if (!link_from || link_from.energy < link_from.energyCapacity) continue;
        for(var to_id of spawn.memory['links_to']) {
            var link_to = Game.getObjectById(to_id);
            if (link_to.energy < link_to.energyCapacity / 2) {
                if (link_from.transferEnergy(link_to) == 0) {
                    return;
                }
            }
        }
    }
}

var operate_tower = (tower) => {
        var enemies = room.find(FIND_HOSTILE_CREEPS);
        for (var enemy of enemies) {
            if (tower.attack(enemy) == 0) {
                return;
            }
        }

        repairable_structures = room.find(FIND_STRUCTURES, { 
            filter: s => s.hits < s.hitsMax 
        });
        for (var repairable of repairable_structures) {
            if (tower.repair(repairable) == 0) {
                return;
            }
        }
    }
}

module.exports = {
    run: function (spawn) {
        // Towers
        var towers = spawn.room.find(FIND_MY_STRUCTURES, { filter: {structureType: STRUCTURE_TOWER}});
        for (var tower of towers) {
            operate_tower(tower);
        }

        // Swarm + creeps renewal
        swarm.respawn(spawn);

        // Links
        operate_links(spawn);
    }
}