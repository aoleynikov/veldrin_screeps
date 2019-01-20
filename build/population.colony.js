var rooms = require('population.room');

var warriors_count = room_id => {
  var room = Game.rooms[room_id];
  if (!room) return 1;
  var enemies = room.find(FIND_HOSTILE_CREEPS);
  return enemies.length;
};

var healers_count = room_id => {
  var room = Game.rooms[room_id];
  if (!room) return 0;
  var damaged = room.find(FIND_MY_CREEPS, {
    filter: c => c.hits < c.hitsMax
  });
  return damaged.length == 0 ? 0 : 1;
};

module.exports = function (room_name, room_id, metropolia_name) {
  var metropolia_id = rooms.names[metropolia_name];
  var room_postfix = '_' + room_name + '_';
  return [{
    count: warriors_count(room_id),
    name_prefix: 'warrior' + room_postfix,
    body: [ATTACK, ATTACK, MOVE, MOVE],
    memory: {
      type: 'swarm',
      role: 'warrior',
      squad: room_name
    }
  }, {
    count: healers_count(room_id),
    name_prefix: 'healer' + room_postfix,
    body: [HEAL, MOVE],
    memory: {
      type: 'swarm',
      role: 'healer',
      squad: room_name
    }
  }, {
    count: 0,
    //rooms.miners_count(room_id),
    name_prefix: 'miner' + room_postfix,
    body: [WORK, WORK, WORK, WORK, WORK, MOVE],
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
    body: rooms.repairer_body(room_id),
    memory: {
      role: 'repairer',
      refill: true,
      type: 'swarm',
      work_place: room_id,
      energy_room: room_id
    }
  }, // {
  //   count: rooms.claimers_count(room_id),
  //   name_prefix: 'claimer' + room_postfix,
  //   body: [CLAIM, CLAIM, MOVE, MOVE],
  //   memory: {
  //     target: room_id,
  //     role: 'claimer',
  //     type: 'swarm'
  //   }
  // },
  {
    count: rooms.builders_count(),
    name_prefix: 'builder_from' + room_postfix,
    body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
    memory: {
      role: 'builder',
      refill: true,
      type: 'swarm',
      energy_room: room_id,
      sticky: true
    }
  }];
};