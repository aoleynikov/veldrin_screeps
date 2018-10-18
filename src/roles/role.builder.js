var repairer_role = require('role.repairer');
var energy_behavior = require('behavior.get_energy');
var room_travel = require('behavior.room_travel');

var build = function (creep) {
    var construction_sites = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
    if (construction_sites.length == 0) return false;
    for (var i = 0; i < construction_sites.length; ++i) {
        var site = construction_sites[i]
        var build_result = creep.build(site);
        if (build_result == ERR_NOT_IN_RANGE) {
            creep.moveTo(site);
        } else if (build_result == ERR_NOT_ENOUGH_ENERGY) {
            energy_behavior.refill(creep);
        }
    }
    return true;
};

var work = function (creep) {
    var busy = this.build(creep);
    if (!busy) {
        repairer_role.perform(creep);
    }
};

module.exports = {
    perform: function (creep) {
        if (energy_behavior.perform(creep)) return;
        work(creep);
    }
}