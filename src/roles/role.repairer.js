var energy_behavior = require('behavior.get_resource');
var room_travel = require('behavior.room_travel');


var repair = function (creep, struct) {
    var repair_result = creep.repair(struct);
    if (repair_result == ERR_NOT_ENOUGH_ENERGY) {
        energy_behavior.refill(creep);
        creep.memory['repairable_id'] = undefined;
    } else if (repair_result == ERR_NOT_IN_RANGE) {
        creep.moveTo(struct);
    }
}

var repair_my_sructures = function (creep) {
    var repairable = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: s => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL && s.id != '5bce880675d75b1bd06a2f22'
    });
    if (!repairable) return false;
    repair(creep, repairable);
    return true;
};

module.exports = {
    perform: function (creep) {
        if (energy_behavior.perform(creep)) return;
        if (room_travel.perform(creep)) return;
        repair_my_sructures(creep);
    }
}