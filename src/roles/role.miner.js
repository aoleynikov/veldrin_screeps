var containers = require('structure.container')

var strategy = {
    standing_on_container: function (creep) {
        var container = Game.getObjectById(creep.memory['container_id'])
        return creep.pos.x == container.pos.x && creep.pos.y == container.pos.y;
    },
    needs_to_move: function (creep) {
        return !this.standing_on_container(creep);
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
        if (room_travel.perform(creep)) return;
        if (creep.memory['container_id'] === undefined) {
            strategy.find_mining_position(creep)
        } else {
            var container = Game.getObjectById(creep.memory['container_id'])
            if (strategy.needs_to_move(creep)) {
                creep.moveTo(container.pos.x, container.pos.y);
            } else if (container.store[RESOURCE_ENERGY] < container.storeCapacity) {
                var source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                creep.harvest(source);
            }
        }
    }
}