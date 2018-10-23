var impassable = (item) => {
    if (item.type == 'structure') {
        return item.structure.structureType == STRUCTURE_SPAWN ||
            item.structure.structureType == STRUCTURE_EXTENSION ||
            item.structure.structureType == STRUCTURE_TOWER ||
            item.structure.structureType == STRUCTURE_STORAGE;
    }
    return item.type == 'creep';
}

module.exports = {
    perform: function (creep, goal) {
        creep.memory['prev_position'] = creep.pos;
        if (creep.pos.getRangeTo(goal) >= 4) {
            var path = PathFinder.search(creep.pos, goal);
            var next_step = path.path[0];

            var prev = creep.memory['prev_position'];
            if (prev.isEqualTo(next_step)) {
                creep.moveTo(goal);
            }

            var look = creep.room.lookAt(next_step);
            for (var item of look) {
                if (impassable(item)) {
                    creep.moveTo(goal);
                    return;
                }
            }
            creep.moveByPath(path.path);
        } else {
            creep.moveTo(goal);
        }
    }
}