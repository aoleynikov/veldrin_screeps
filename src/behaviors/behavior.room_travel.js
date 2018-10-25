var border_run = require('behavior.border_run');

var run_direction = {
    FIND_EXIT_TOP: TOP,
    FIND_EXIT_BOTTOM: BOTTOM,
    FIND_EXIT_LEFT: LEFT,
    FIND_EXIT_RIGHT: RIGHT
};

module.exports = {
    perform: function (creep) {
        if (border_run.perform(creep)) return true;
        if (creep.memory['target'] === undefined) return false;
        if (creep.room.name != creep.memory['target']) {
            var route = Game.map.findRoute(creep.room.name, creep.memory['target']);
            var exit = creep.pos.findClosestByRange(route[0].exit);
            if (creep.pos.getRangeTo(exit) > 2) {
                creep.moveTo(exit);
            } else {
                creep.memory['run'] = route[0].exit;
                creep.memory['run_cd'] = 4;
            }

            return true;
        }
        return false;
    }
}