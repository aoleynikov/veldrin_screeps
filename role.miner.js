var containers = require('structure.container')

var strategy = {
    standing_on_container: function (creep) {
        return creep.pos.x == creep.memory['container'].pos.x &&
            creep.pos.y == creep.memory['container'].pos.y;
    },
    standing_near_source: function (creep) {
        creep.memory['source'] = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
        var range = creep.pos.getRangeTo(creep.memory['source'].pos);
        return range != 1;
    },
    needs_to_move: function (creep) {
        return this.standing_near_source(creep) && this.standing_on_container(creep);
    },
    find_mining_position: function (creep) {
        var ctrs = containers.get(creep.room);
        for (var i = 0; i < ctrs.length; ++i) {
            var position = ctrs[i].pos
            var look = creep.room.lookAt(position.x, position.y);
            var good = true;
            for (var j = 0; j < look.length; ++j) {
                if (look[j].type == 'creep') {
                    good = false;
                }
            }
            if (good) {
                creep.memory['container'] = ctrs[i];
                return;
            }
        }
    }
}

module.exports = {
    perform: function (creep) {
        if (creep.memory['container'] === undefined) {
            strategy.find_mining_position(creep)
        }
        if (strategy.needs_to_move(creep)) {
            creep.moveTo(creep.memory['container']);
        } else {
            creep.harvest(creep.memory['source']);
        }
    }
}