var tower_structure = require('structure.tower')

module.exports = {
    run: function (room) {
        var towers = tower_structure.get(room);
        for (var i = 0; i < towers.length; ++i) {
            tower_structure.shoot_on_sight(towers[i]);
        }
    }
}