var miners_count = room_id => {
  return Game.rooms[room_id] === undefined ? 1 : Game.rooms[room_id].find(FIND_SOURCES_ACTIVE).length;
};

module.exports = function (room_name, room_id) {
  var room_postfix = '_' + room_name + '_';
  return [{
    count: miners_count(room_id),
    name_prefix: 'miner' + room_postfix,
    body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
    memory: {
      role: 'miner',
      target: room_id,
      type: 'swarm',
      find: FIND_SOURCES_ACTIVE,
      resource: RESOURCE_ENERGY
    }
  }, {
    count: 2,
    name_prefix: 'repairer' + room_postfix,
    body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
    memory: {
      role: 'repairer',
      refill: true,
      type: 'swarm',
      target: room_id
    }
  }];
};