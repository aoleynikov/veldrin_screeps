var containers = require('structure.container')

var strategy = {
    standing_on_container: function (creep) {
        var look = creep.room.lookAt(creep.pos.x, creep.pos.y);
        for (var i = 0; i < look.length; ++i) {
            if (look[i].type == 'creep' && look[i].creep.id == creep.id) {
                return true;
            }
        }
        return false;
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
                return position;
            }
        }
    }
}

module.exports = {
    perform: function (creep) {
        if (strategy.needs_to_move(creep)) {
            creep.moveTo(strategy.find_mining_position(creep));
        } else {
            creep.harvest(creep.memory['source']);
        }
    }
}