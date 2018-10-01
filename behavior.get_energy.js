var room_wrapper = require('room_wrapper');

module.exports = {
    perform: function (creep) {
        var provider = room_wrapper.get_closest_energy_provider(creep.room, creep.pos);
        if (provider === undefined) {
            return;
        }
        var work_result = undefined;
        if (provider.structureType == STRUCTURE_STORAGE) {
            work_result = creep.withdraw(provider, RESOURCE_ENERGY);
        } else {
            work_result = creep.harvest(provider);
        }
        if (work_result == ERR_NOT_IN_RANGE) {
            creep.moveTo(provider.pos.x, provider.pos.y);
        }
    }
}