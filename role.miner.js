var containers = require('structure.container')

var strategy = {
    standing_on_container: function (creep) {
        var container = Game.getObjectById(creep.memory['container_id'])
        return creep.pos.x == container.pos.x && creep.pos.y == container.pos.y;
    },
    standing_near_source: function (creep) {
        creep.memory['source'] = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
        var range = creep.pos.getRangeTo(creep.memory['source'].pos);
        return range != 1;
    },
    needs_to_move: function (creep) {
        return !this.standing_near_source(creep) || !this.standing_on_container(creep);
    },
    find_mining_position: function (creep) {
        var ctrs = containers.get(creep.room);
        for (var i = 0; i < ctrs.length; ++i) {
            var position = ctrs[i].pos
            var look = creep.room.lookAt(position.x, position.y);
            var good = true;
            for (var j = 0; j < look.length; ++j) {
                if (look[j].type == 'creep' && look[j].creep.id != creep.id) {
                    good = false;
                }
            }
            if (good) {
                creep.memory['container_id'] = ctrs[i].id;
                return;
            }
        }
    }
}

module.exports = {
    perform: function (creep) {
        if (creep.memory['container_id'] === undefined) {
            strategy.find_mining_position(creep)
        }
        if (strategy.needs_to_move(creep)) {
            var container = Game.getObjectById(creep.memory['container_id'])
            creep.moveTo(container);
        } else {
            creep.harvest(creep.memory['source']);
        }
    }
}