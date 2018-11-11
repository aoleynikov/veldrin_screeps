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

var operate_towers = (spawn) => {
    room = spawn.room;
    towers = room.find(FIND_MY_STRUCTURES, {
        filter: {
            structureType: STRUCTURE_TOWER
        }
    });

    for(var tower of towers) {
        var next_tower = false;
        var enemies = room.find(FIND_HOSTILE_CREEPS);
        for (var i = 0; i < enemies.length; ++i) {
            var attack_result = tower.attack(enemies[i]);
            if (attack_result == 0) {
                next_tower = true;
                break;
            }
        }
        if (next_tower) break;

        repairable_structures = room.find(FIND_STRUCTURES, {filter: s => {
            return s.hits < s.hitsMax;
        }});
        for (var repairable of repairable_structures) {
            if (tower.repair(repairable) == 0) {
                next_tower = true;
                break;
            }
        }
        if (next_tower) break;
    }
}

module.exports = {
    run: function (spawn) {
        // Towers
        operate_towers(spawn);

        // Swarm + creeps renewal
        swarm.respawn(spawn);

        // Links
        operate_links(spawn);
    }
}