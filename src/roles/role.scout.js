var room_travel = require('behavior.room_travel');
var move = require('behavior.move');

var randomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
}

module.exports = {
  perform: function (creep) {
    if (room_travel.perform(creep)) return;

    var message = 'I bring light to this realm';
    var current = '';
    if (creep.room.controller !== undefined) {
      if (creep.room.controller.sign !== undefined) {
        current = creep.room.controller.sign.text;
      }
      if (current != message) {
        if (creep.signController(creep.room.controller, message) == ERR_NOT_IN_RANGE) {
          move.perform(creep, creep.room.controller.pos);
        }
        return;
      }
    }

    var route_home = Game.map.findRoute(creep.room.name, Game.spawns['Main'].room.name);
    var exception_exit = route_home.length > 0 ? route_home[0].exit : null;
    var exits = [FIND_EXIT_TOP, FIND_EXIT_RIGHT, FIND_EXIT_LEFT, FIND_EXIT_BOTTOM];

    var options = [];
    for (var exit of exits) {
      if (exit != exception_exit) {
        options.push(exit);
      }
    }

    var index = randomInt(options.length);
    creep.memory['target'] = Game.map.describeExits(creep.room.name)[options[index]];
  }
}