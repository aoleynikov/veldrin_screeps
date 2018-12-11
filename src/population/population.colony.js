var miners_count = (room_id) => {
  var room = Game.rooms[room_id]
  if (!room) return 1
  return Game.rooms[room_id].find(FIND_SOURCES_ACTIVE).length;
}

var claimers_count = (room_id) => {
  var room = Game.rooms[room_id]
  if (!room) return 1
  if (room.controller.my) {
    return 0
  }
  if (room.controller.reservation === undefined) return 1
  if (room.controller.reservation.username == 'Veldrin' && room.controller.reservation.ticksToEnd > 3000) {
    return 0
  }
  return 1
}

var haulers_count = (room_id, target_room_id) => {
  var room = Game.rooms[room_id]
  if (!room) return 0

  if (room.controller.my) {
    return 0
  }
  var distance = Game.map.findRoute(room_id, target_room_id).length
  var sources_count = room.find(FIND_SOURCES_ACTIVE).length
  return sources_count * distance
}

var healers_count = (room_id) => {
  var room = Game.rooms[room_id]
  if (!room) return 0

  var damaged = room.find(FIND_MY_CREEPS, { filter: c => c.hits < c.hitsMax })
  return damaged.length == 0 ? 0 : 1
}

module.exports = function(room_name, room_id, metropolia_id) {
  var room_postfix = '_' + room_name + '_'
  return [
    {
      count: 1,
      name_prefix: 'guard' + room_postfix,
      body: [TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
      memory: {
        type: 'swarm',
        role: 'warrior',
        squad: room_name
      }
    },
    {
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
    },
    {
      count: miners_count(room_id),
      name_prefix: 'repairer' + room_postfix,
      body: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
      memory: {
        role: 'repairer',
        refill: true,
        type: 'swarm',
        work_place: room_id,
        energy_room: room_id
      }
    },
    {
      count: claimers_count(room_id),
      name_prefix: 'claimer' + room_postfix,
      body: [CLAIM, CLAIM, MOVE, MOVE],
      memory: {
        target: room_id,
        role: 'claimer',
        type: 'swarm'
      }
    },
    {
      count: 1,
      name_prefix: 'builder_from' + room_postfix,
      body: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
      memory: {
        role: 'builder',
        refill: true,
        type: 'swarm',
        energy_room: room_id
      }
    },
    {
      count: haulers_count(room_id, metropolia_id),
      name_prefix: 'hauler_from' + room_postfix,
      body: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, 
             CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
             MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
      memory: {
        role: 'hauler',
        refill: true,
        type: 'swarm',
        energy_room: room_id,
        work_place: metropolia_id,
        resource: RESOURCE_ENERGY
      }
    },
    {
      count: healers_count(room_id),
      name_prefix: 'healer' + room_postfix,
      body: [HEAL, HEAL, MOVE, MOVE],
      memory: {
        type: 'swarm',
        role: 'healer',
        squad: room_name
      }
    }
  ]
}