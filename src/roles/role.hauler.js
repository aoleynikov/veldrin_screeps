var energy_behavior = require('behavior.get_energy');
var storages = require('structure.storage');

var storeEnergy = function (creep) {
    if (creep.carry[RESOURCE_ENERGY] == 0) {
        energy_behavior.refill(creep);
        return;
    }
    var storage = storages.get(creep.room);
    if (storage.length == 0) return;
    var store = creep.transfer(storage[0], RESOURCE_ENERGY);
    if (store == ERR_NOT_IN_RANGE) {
        creep.moveTo(storage[0]);
    } else if (store == 0) {
        energy_behavior.refill(creep);
    }
};

module.exports = {
    perform: function (creep) {
        if (energy_behavior.perform(creep)) return;
        storeEnergy(creep);
    }
}