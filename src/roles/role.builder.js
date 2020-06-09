var upgrader_role = require('role.upgrader');
var energy_behavior = require('behavior.get_resource');
var room_travel = require('behavior.room_travel');

const get_site = () => {
    var sites = Game.constructionSites;
    if (sites.length == 0) return undefined;
    for (var key in sites) {
        return Game.getObjectById(key);
    }
}

const build = function (creep, site) {
    let result = creep.build(site);
    if (repair_result == ERR_NOT_ENOUGH_ENERGY) {
        energy_behavior.refill(creep);
    } else if (repair_result == ERR_NOT_IN_RANGE) {
        creep.moveTo(site);
    }
};

const work = function (creep) {
    let site = get_site()
    if (!site) {
        if (creep.memory['fallback_room']) {
            creep.memory['target'] = creep.memory['fallback_room']
        } else {
            creep.memory['target'] = Game.spawns['Main'].room.name
        }
        upgrader_role.perform(creep);
        return
    }

    build(creep, site)
};

module.exports = {
    perform: (creep) => {
        if (room_travel.perform(creep)) return;
        if (energy_behavior.perform(creep)) return;
        work(creep);
    }
}