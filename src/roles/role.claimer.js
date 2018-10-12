var room_travel = require('behavior.room_travel');

module.exports = {
    perform: function (creep) {
        var room_name = creep.memory['target'];

        // if we are not in the room
        if (room_travel.perform(creep)) return;

        // we are in the room
        var controller = creep.room.controller;
        var result = undefined;
        if (creep.room.name == 'W46S49') {
            result = creep.claimController(controller);
        } else {
            result = creep.reserveController(controller);
        }
        if (result == ERR_GCL_NOT_ENOUGH) {
            result = creep.reserveController(controller);
        }
        if (result == ERR_NOT_IN_RANGE) {
            result = creep.moveTo(controller, {reusePath: 50});
        }
    }
}