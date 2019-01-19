var enemies_find = [FIND_HOSTILE_CREEPS, FIND_STRUCTURES, FIND_HOSTILE_SPAWNS, FIND_HOSTILE_CONSTRUCTION_SITES]

var target_filter = (t) => !t.owner || t.owner.name != 'Veldrin' &&
                           (t.structureType === undefined || 
                           t.structureType != STRUCTURE_CONTROLLER &&
                           t.structureType != STRUCTURE_KEEPER_LAIR &&
                           t.structureType != STRUCTURE_WALL &&
                           t.structureType != STRUCTURE_ROAD &&
                           t.structureType != STRUCTURE_CONTAINER)

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
        var closest_from_category = enemies_find((f) => {
            var target = creep.pos.findClosestByRange(find, {
                filter: target_filter
            })
            return {
                target: target,
                range: creep.pos.getRangeTo(target.pos)
            }
        })
        var min_dst = 100000;
        var result = undefined
        for (var enemy of closest_from_category) {
            var range = creep.pos.getRangeTo(enemy.pos)
            if (range < min_dst) {
                min_dst = range
                result = enemy
            }
        }
        return result
    }
}   
