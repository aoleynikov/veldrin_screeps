var upgrader_role = require('role.upgrader');
var energy_behavior = require('behavior.get_resource');
var room_travel = require('behavior.room_travel');

var build = function (creep) {
    var sites = Game.constructionSites;
    if (sites.length == 0) return false;

    var site = undefined;

    for (var key in sites) {
        site = Game.getObjectById(key);
        break;
    }

    if (site === undefined) return false;

    var build_result = creep.build(site);
    if (build_result == ERR_NOT_IN_RANGE) {
        creep.moveTo(site, {reusePath: 50});
    } else if (build_result == ERR_NOT_ENOUGH_ENERGY) {
        energy_behavior.refill(creep);
    }
    return true;
};

var work = function (creep) {
    var busy = build(creep);
    if (!busy) {
        upgrader_role.perform(creep);
    }
};

module.exports = {
    perform: (creep) => {
        if (energy_behavior.perform(creep)) return;
        work(creep);
    }
}