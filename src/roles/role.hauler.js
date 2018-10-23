var energy_behavior = require('behavior.get_energy');
var storages = require('structure.storage');
var move = require('behavior.move');

var storeEnergy = function (creep) {
    var storage = storages.get(creep.room);
    if (storage.length == 0) return;
    var store = creep.transfer(storage[0], RESOURCE_ENERGY);
    if (store == ERR_NOT_IN_RANGE) {
        move.perform(creep, storage[0].pos);
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