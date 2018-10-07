var military = require('behavior.military');

module.exports = {
    perform: function (creep) {
        var enemies = creep.room.find(FIND_HOSTILE_CREEPS);
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