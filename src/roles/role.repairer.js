var upgrader_role = require('role.upgrader');
var get_energy_behavior = require('behavior.get_energy');
var room_wrapper = require('room_wrapper');
var room_travel = require('behavior.room_travel');

var repair = function (creep) {
    var repairable = room_wrapper.get_repairable_structures(creep.room);
    for (var i = 0; i < repairable.length; ++i) {
        var structure = repairable[i]
        if (structure.hits < structure.hitsMax) {
            var work = creep.repair(structure);
            if (work == ERR_NOT_IN_RANGE) {
                creep.moveTo(structure.pos.x, structure.pos.y);
            } else if (work == ERR_NOT_ENOUGH_ENERGY) {
                creep.memory['refill'] = true;
            }
            return true;
        }
    }
    return false;
}

module.exports = {
    perform: function (creep) {
        if (creep.memory['refill']) {
            get_energy_behavior.perform(creep);
            return;
        }
        if (room_travel.perform(creep)) return;
        var busy = repair(creep);
        if (!busy) {
            upgrader_role.perform(creep);
        }
    }
}