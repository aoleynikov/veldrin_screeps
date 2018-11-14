var energy_behavior = require('behavior.get_energy');

module.exports = {
    perform: function (creep) {
        if (energy_behavior.perform(creep)) return;

        var storage = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
            filter: s => {
                return s.structureType == STRUCTURE_STORAGE || s.structureType == STRUCTURE_LINK;
            }
        });
        if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(storage);
        }
        if (creep.carry[RESOURCE_ENERGY] == 0) {
            energy_behavior.refill(creep);
        }
    }
}