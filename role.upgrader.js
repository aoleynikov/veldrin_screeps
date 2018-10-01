var get_energy_behavior = require('behavior.get_energy')

var upgrade = function (creep) {
    var controller = creep.room.controller;
    var work = creep.upgradeController(controller)
    if (work == ERR_NOT_IN_RANGE) {
        creep.moveTo(controller.pos.x, controller.pos.y);
    }
}

module.exports = {
    perform: function (creep) {
        if (creep.carry[RESOURCE_ENERGY] == 0) {
            get_energy_behavior.perform(creep);
            return;
        }
        upgrade(creep);
    }
}