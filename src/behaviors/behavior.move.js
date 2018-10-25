var impassable = (item) => {
    var obstacle = undefined;

    if (item.type == 'structure') {
        obstacle = item.structure.structureType;
    } else if (item.type == 'constructionSite') {
        obstacle = item.constructionSite.structureType;
    }

    if (obstacle !== undefined) {
        return obstacle == STRUCTURE_SPAWN ||
            obstacle == STRUCTURE_EXTENSION ||
            obstacle == STRUCTURE_TOWER ||
            obstacle == STRUCTURE_STORAGE;
    }
    return item.type == 'creep';
}

module.exports = {
    perform: function (creep, goal) {
        if (creep.pos.getRangeTo(goal) >= 4) {
            var path = PathFinder.search(creep.pos, goal);
            var next_step = path.path[0];
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