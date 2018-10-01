var upgrader_role = require('role.upgrader');
var get_energy_behavior = require('behavior.get_energy');

var strategy = {
    build: function (creep) {
        var construction_sites = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
        for (var i = 0; i < construction_sites.length; ++i) {
            var site = construction_sites[i]
            var work = creep.build(site);
            if (work == ERR_NOT_IN_RANGE) {
                creep.moveTo(site.pos.x, site.pos.y);
            }
            return true;
        }
        return false;
    }
}

module.exports = {
    perform: function (creep) {
        if (creep.carry[RESOURCE_ENERGY] == 0) {
            get_energy_behavior.perform(creep);
            return;
        }
        var busy = strategy.build(creep);
        if (!busy) {
            upgrader_role.perform(creep);
        }
    }
}