const HAULERS_COUNT = {
  1: 1,
  2: 2,
  3: 3,
  4: 3,
  5: 4,
  6: 4,
  7: 4,
  8: 5
};
module.exports = {
  names: {
    'Main': 'W38S27',
    'DragonKnight': 'W39S28'
  },
  haulers_count: (room_id, target_room_id) => {
    var room = Game.rooms[room_id];
    if (!room) return 0;
    if (!room.controller) return 0;

    if (room.controller.my) {
      return 0;
    }

    var distance = Game.map.findRoute(room_id, target_room_id).length;
    var sources_count = room.find(FIND_SOURCES_ACTIVE).length;
    return HAULERS_COUNT[sources_count * distance] || 1;
  },
  claimers_count: room_id => {
    var room = Game.rooms[room_id];
    if (!room) return 1;
    if (!room.controller) return 0;

    if (room.controller.my) {
      return 0;
    }

    if (!room.controller.reservation) return 1;

    if (room.controller.reservation.username == 'Veldrin' && room.controller.reservation.ticksToEnd > 3000) {
      return 0;
    }

    return 1;
  },
  miners_count: room_id => {
    var room = Game.rooms[room_id];
    if (!room) return 1;
    return Game.rooms[room_id].find(FIND_SOURCES).length;
  },
  builders_count: room_id => {
    var room = Game.rooms[room_id];
    if (!room) return 2;
    if (room && room.controller && room.controller.my) return 1;
    return room.find(FIND_SOURCES).length * 3;
  },
  repairer_body: room_id => {
    var room = Game.rooms[room_id];
    var dflt = [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
    if (!room) return dflt;
    var towers = room.find(FIND_MY_STRUCTURES, {
      filter: {
        structureType: STRUCTURE_TOWER
      }
    });
    if (towers.length == 0) return dflt;else return dflt;
  }
};