var room_travel = require('behavior.room_travel');

module.exports = {
  perform: function (creep) {
    if (room_travel.perform(creep)) return;
    var route_home = Game.map.findRoute(creep.room.name, Game.spawns['Main'].room.name);
    var exception_exit = route_home.length > 0 ? route_home[0].exit : null;
    var exits = [FIND_EXIT_TOP, FIND_EXIT_RIGHT, FIND_EXIT_LEFT, FIND_EXIT_BOTTOM];
    var options = [];

    for (var exit of exits) {
      if (exit != exception_exit) {
        options.push(exit);
      }
    }
  }
};