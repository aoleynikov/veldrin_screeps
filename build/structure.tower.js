module.exports = {
    get: function (room) {
        return room.find(FIND_MY_STRUCTURES, {
            filter: {
                structureType: STRUCTURE_TOWER
            }
        });
    },
    shoot_on_sight: function (tower) {
        var enemies = tower.room.find(FIND_HOSTILE_CREEPS);
        for (var i = 0; i < enemies.length; ++i) {
            var attack_result = tower.attack(enemies[i]);
            if (attack_result == 0) {
                return;
            }
        }
    }
}