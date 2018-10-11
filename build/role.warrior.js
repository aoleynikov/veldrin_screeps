var military = require('behavior.military');

var enemies_find = [FIND_HOSTILE_CREEPS, FIND_HOSTILE_STRUCTURES, FIND_HOSTILE_SPAWNS, FIND_HOSTILE_CONSTRUCTION_SITES]

module.exports = {
    perform: function (creep) {
        var enemies = [];
        for (var find of enemies_find) {
            enemies = creep.room.find(find);
            if (enemies.length > 0) break;
        }

        if (enemies.length == 0) {
            military.perform(creep);
            return;
        }
        var attack_result = creep.attack(enemies[0]);
        if (attack_result == ERR_NOT_IN_RANGE) {
            creep.moveTo(enemies[0]);
        }
    }
}