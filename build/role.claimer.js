var empire = require('empire');

module.exports = {
  perform: function (creep) {
    var rooms = empire.get_rooms();
    var controller = undefined;

    for (var i = 0; i < rooms.length; ++i) {
      if (!rooms[i].contoller.my) {
        controller = creep.room.controller;
        break;
      }
    }

    var result = creep.claim(controller);

    if (result == ERR_GCL_NOT_ENOUGH) {
      result = creep.reserveController(controller);
    }

    if (result == ERR_NOT_IN_RANGE) {
      creep.moveTo(new RoomPosition(controller.pos.x, controller.pos.y, controller.room.name));
    }
  }
};