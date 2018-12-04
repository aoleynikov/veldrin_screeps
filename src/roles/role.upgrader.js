var energy_behavior = require('behavior.get_resource');
var room_travel = require('behavior.room_travel');

var upgrade = (creep) => {
    var controller = creep.room.controller;
    var work = creep.upgradeController(controller);
    if (work == ERR_NOT_IN_RANGE) {
        creep.moveTo(controller);
    } else if (work == ERR_NOT_ENOUGH_ENERGY) {
        energy_behavior.refill(creep);
    }
}

module.exports = {
    perform: (creep) => {
        if (room_travel.perform(creep)) return;
        if (energy_behavior.perform(creep)) return;
        upgrade(creep);
    }
}