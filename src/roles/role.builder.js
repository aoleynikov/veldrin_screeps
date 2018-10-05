var upgrader_role = require('role.upgrader');
var get_energy_behavior = require('behavior.get_energy');
var empire = require('empire');

var strategy = {
    build: function (creep) {
        var construction_sites = empire.get_construction_sites();
        for (var i = 0; i < construction_sites.length; ++i) {
            var site = construction_sites[i]
            var work = creep.build(site);
            if (work == ERR_NOT_IN_RANGE) {
                creep.moveTo(site.pos.x, site.pos.y);
            } else if (work == ERR_NOT_ENOUGH_ENERGY) {
                creep.memory['refill'] = true;
            }
            return true;
        }
        return false;
    }
}

module.exports = {
    perform: function (creep) {
        if (creep.memory['refill']) {
            get_energy_behavior.perform(creep);
            return;
        }
        var busy = strategy.build(creep);
        if (!busy) {
            upgrader_role.perform(creep);
        }
    }
}