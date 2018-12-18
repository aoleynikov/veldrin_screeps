var energy_behavior = require('behavior.get_resource');
var room_travel = require('behavior.room_travel');


var repair = function (creep, struct) {
    var repair_result = creep.repair(struct);
    if (repair_result == ERR_NOT_ENOUGH_ENERGY) {
        energy_behavior.refill(creep);
    } else if (repair_result == ERR_NOT_IN_RANGE) {
        creep.moveTo(struct);
    }
}

var repair_my_sructures = function (creep) {
    var repairable = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: s => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
    });
    repair(creep, repairable);
};

module.exports = {
    perform: function (creep) {
        if (energy_behavior.perform(creep)) return;
        if (room_travel.perform(creep)) return;
        var tower = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}})
        if(tower) {
            var result = creep.transfer(tower, RESOURCE_ENERGY)
            if (result == ERR_NOT_IN_RANGE) {
                creep.moveTo(tower)
            }
            else if (result == ERR_NOT_ENOUGH_ENERGY) {
                energy_behavior.refill(creep)
            }
        }
        else {
            repair_my_sructures(creep);
        }
    }
}