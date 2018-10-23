var military = require('behavior.military');

var enemies_find = [FIND_HOSTILE_CREEPS, FIND_HOSTILE_STRUCTURES, FIND_HOSTILE_SPAWNS, FIND_HOSTILE_CONSTRUCTION_SITES]

var target_filter = (t) => t.structureType === undefined || t.structureType != STRUCTURE_CONTROLLER

module.exports = {
    perform: function (creep) {
        var enemies = [];
        var target = undefined;
        for (var find of enemies_find) {
            enemies = creep.room.find(find, {
                filter: target_filter
            });
            if (enemies.length > 0) {
                target = creep.pos.findClosestByRange(find, {
                    filter: target_filter
                });
                break;
            }
        }
        if (target === undefined) {
            military.perform(creep);
            return;
        }
        var attack_result = creep.attack(target);
        if (attack_result == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    }
}