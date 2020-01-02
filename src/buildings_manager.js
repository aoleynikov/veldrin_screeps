var swarm = require('swarm_controller');

var operate_links = (spawn) => {
    if (!spawn.memory['links_from']) return;
    for (var from_id of spawn.memory['links_from']) {
        var link_from = Game.getObjectById(from_id);
        if (!link_from || link_from.energy < link_from.energyCapacity) continue;
        for (var to_id of spawn.memory['links_to']) {
            var link_to = Game.getObjectById(to_id);
            if (link_to.energy < 650) {
                if (link_from.transferEnergy(link_to) == 0) {
                    return;
                }
            }
        }
    }
}

var operate_tower = (tower) => {
    var enemies = tower.room.find(FIND_HOSTILE_CREEPS);
    for (var enemy of enemies) {
        if (tower.attack(enemy) == 0) {
            return;
        }
    }

    var repairable_structures = tower.room.find(FIND_STRUCTURES, {
        filter: s => s.hits < s.hitsMax && 
                     s.structureType != STRUCTURE_RAMPART && 
                     s.structureType != STRUCTURE_WALL
    });
    for (var repairable of repairable_structures) {
        if (tower.repair(repairable) == 0) {
            return;
        }
    }

    var repairable_defences = tower.room.find(FIND_STRUCTURES, {
        filter: s => s.hits < s.hitsMax && 
                     (s.structureType == STRUCTURE_RAMPART || 
                     s.structureType == STRUCTURE_WALL)
    });
    if (repairable_defences.length == 0) return

    var target = repairable_defences[0]
    for (var repairable of repairable_defences) {
        if (1.0 * repairable.hits / repairable.hitsMax < 
            1.0 * target.hits / target.hitsMax) {
                target = repairable
        }
    }
    tower.repair(target)
}


module.exports = {
    run: function (spawn) {
        // Towers
        var towers = spawn.room.find(FIND_MY_STRUCTURES, {
            filter: {
                structureType: STRUCTURE_TOWER
            }
        });
        for (var tower of towers) {
            operate_tower(tower);
        }

        // Swarm + creeps renewal
        swarm.respawn(spawn)

        // Links
        operate_links(spawn);
    }
}