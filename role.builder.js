module.exports = {
    perform: function (creep) {
        build_targets = [];
        for (var site in Game.constructionSites) {
            if (site.room.id == creep.room.id) {
                build_targets.push(site);
            }
        }
        // for (var structure in Game.structures) {
        //     if (structure.room.id == creep.room.id && strcuture.hits < structure.hitsMax) {
        //         build_targets.push(site);
        //     }
        // }
        build_targets.push(creep.room.controller);

        for (var target in build_targets) {
            work = creep.upgradeController(target) || creep.build(target) || creep.repair(target);
            if (work == ERR_NOT_IN_RANGE) {
                creep.moveTo(target.pos.x, target.pos.y);
            }
        }
    }
}