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
  return 1
}

var haulers_count = (room_id, target_room_id) => {
  var room = Game.rooms[room_id]
  if (room.controller.my) {
    return 0
  }
  // findRoute -> exits
  // rooms = exits + 1
  var distance = Game.map.findRoute(room_id, target_room_id).length
  var sources_count = room.find(FIND_SOURCES_ACTIVE).length
  return sources_count * distance * 3
}

module.exports = function(room_name, room_id, metropolia_id) {
  var room_postfix = '_' + room_name + '_'
  return [
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
      count: 2,
      name_prefix: 'repairer' + room_postfix,
      body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
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
      body: [CLAIM, MOVE],
      memory: {
        target: room_id,
        role: 'claimer',
        type: 'swarm'
      }
    },
    {
      count: 2,
      name_prefix: 'builder_from' + room_postfix,
      body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
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
      body: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
      memory: {
        role: 'hauler',
        refill: true,
        type: 'swarm',
        energy_room: room_id,
        work_place: metropolia_id,
        resource: RESOURCE_ENERGY
      }
    }
  ]
}