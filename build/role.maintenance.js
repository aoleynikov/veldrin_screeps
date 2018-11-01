var room_travel = require('behavior.room_travel');

module.exports = {
  perform: function (creep) {
    if (room_travel.perform(creep)) return;
    var spawn = Game.spawns['Main'];
    var spawn_in_room = creep.pos.findClosestByRange(FIND_MY_SPAWNS);

    if (spawns_in_room) {
      spawn = spawn_in_room;
    }

    if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(spawn);
    }
  }
};