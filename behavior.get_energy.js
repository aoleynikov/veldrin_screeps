var room_wrapper = require('room_wrapper');

module.exports = {
    perform: function (creep) {
        var provider = room_wrapper.get_energy_provider(creep.room);
        if (provider === undefined) {
            return;
        }
        get_energy = creep.withdraw(provider, RESOURCE_ENERGY);
        if (get_energy == ERR_NOT_IN_RANGE) {
            creep.moveTo(provider.pos.x, provider.pos.y);
        }
    }
}