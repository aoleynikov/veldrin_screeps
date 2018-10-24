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
        creep.moveTo(goal);
    }
}