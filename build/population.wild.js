var rooms = require('population.room');

module.exports = function (room_name, room_id, metropolia_name) {
  var metropolia_id = rooms.names[metropolia_name];
  var room_postfix = '_' + room_name + '_';
  return [{
    count: 4,
    name_prefix: 'warrior' + room_postfix,
    body: [ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK],
    memory: {
      type: 'swarm',
      role: 'warrior',
      squad: room_name
    }
  }, {
    count: 3,
    name_prefix: 'healer' + room_postfix,
    body: [HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    memory: {
      type: 'swarm',
      role: 'healer',
      squad: room_name
    }
  }, {
    count: rooms.miners_count(room_id),
    name_prefix: 'miner' + room_postfix,
    body: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: 'miner',
      target: room_id,
      type: 'swarm',
      find: FIND_SOURCES,
      resource: RESOURCE_ENERGY
    }
  }, {
    count: 1,
    name_prefix: 'repairer' + room_postfix,
    body: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: 'repairer',
      refill: true,
      type: 'swarm',
      work_place: room_id,
      energy_room: room_id
    }
  }, {
    count: rooms.builders_count(room_id),
    name_prefix: 'builder_from' + room_postfix,
    body: [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: 'builder',
      refill: true,
      type: 'swarm',
      energy_room: room_id
    }
  }, {
    count: rooms.haulers_count(room_id, metropolia_id),
    name_prefix: 'hauler_from' + room_postfix,
    body: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: 'hauler',
      refill: true,
      type: 'swarm',
      energy_room: room_id,
      work_place: metropolia_id,
      resource: RESOURCE_ENERGY
    }
  }];
};