var room_travel = require('behavior.room_travel');

module.exports = {
    perform: function (creep) {
        if (room_travel.perform(creep)) return;

        container = creep.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => {
                var look = _.filter(s.pos.lookFor(LOOK_CREEPS), c => c.memory['role'] == creep.memory['role']);
                if (look) return false;

                return s.findInRange(creep.memory['find'], 1) != null;
            }
        });

        if (creep.pos.x != container.pos.x || creep.pos.y != container.pos.y) {
            creep.moveTo(container);
            return;
        }

        creep.harvest(creep.pos.findClosestByRange(creep.memory['find']));
    }
}