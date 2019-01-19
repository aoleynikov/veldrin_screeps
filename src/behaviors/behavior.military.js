var enemies_find = [FIND_HOSTILE_CREEPS, FIND_HOSTILE_STRUCTURES, FIND_HOSTILE_SPAWNS, FIND_HOSTILE_CONSTRUCTION_SITES]

var target_filter = (t) => t.structureType === undefined || 
                           t.structureType != STRUCTURE_CONTROLLER &&
                           t.structureType != STRUCTURE_KEEPER_LAIR

module.exports = {
    on_guard: function (creep) {
        var squad = creep.memory['squad'];
        var flag = Game.flags[squad] || Game.flags['Rax'];
        if (!flag.room || flag.room.name != creep.room.name) {
            creep.moveTo(flag);
            return true;
        }
        return false;
    },
    get_enemy: function(creep) {
        var target = undefined;
        for (var find of enemies_find) {
            var enemies = creep.room.find(find, {
                filter: target_filter
            });
            if (enemies.length > 0) {
                target = creep.pos.findClosestByRange(find, {
                    filter: target_filter
                });
                break;
            }
        }   
        return target
    }
}